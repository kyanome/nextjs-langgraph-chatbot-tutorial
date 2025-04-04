import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../_lib/langgraph-server";

export async function POST(req: NextRequest) {
  try {
    const { message, threadId } = await req.json();
    if (!message) {
      return new NextResponse(
        JSON.stringify({ error: "Message is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!threadId) {
      return new NextResponse(
        JSON.stringify({ error: "Thread ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!process.env.LANGGRAPH_ASSISTANT_ID) {
      return new NextResponse(
        JSON.stringify({
          error: "LANGGRAPH_ASSISTANT_ID is not set",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    try {
      const serverClient = createServerClient();
      const assistantId = process.env.LANGGRAPH_ASSISTANT_ID;
      const stream = await serverClient.client.runs.stream(
        threadId,
        assistantId,
        {
          input: { messages: message },
          streamMode: "messages",
        }
      );
      const encoder = new TextEncoder();
      const customReadable = new ReadableStream({
        async start(controller) {
          try {
            // Forward each chunk from the graph to the client
            for await (const chunk of stream) {
              // Only send relevant chunks
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
              );
            }
          } catch (error) {
            console.error("Streaming error:", error);
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  error: "Streaming error occurred",
                })}\n\n`
              )
            );
          } finally {
            controller.close();
          }
        },
      });

      // Return the stream with appropriate headers
      return new Response(customReadable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
