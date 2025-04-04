"use client";

import { useEffect, useRef, useState } from "react";
import { client } from "../_lib/langgraph-client";
import { Message, SSEEvent } from "../_types/chat";

export function useChat() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "こんにちは、どのようにお手伝いできますか？",
    },
  ]);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const initThread = async () => {
      if (threadId) return;
      try {
        const thread = await client.createThread();
        setThreadId(thread.thread_id);
      } catch (error) {
        console.error(error);
      }
    };
    initThread();
  }, [threadId]);

  const sendMessage = async (message: string) => {
    if (!threadId) return;

    // 進行中のリクエストをキャンセル
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // メッセージを追加
    setMessages((prev) => [
      ...prev,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setIsLoading(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          threadId,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error("リクエストに失敗しました");
      }

      const reader = response.body?.getReader();
      if (!reader)
        throw new Error("レスポンスからリーダーを取得できませんでした");

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkStr = decoder.decode(value);
        const lines = chunkStr.split("\n").filter(Boolean);

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const sseString = line.slice("data: ".length);
          let sseEvent: SSEEvent;

          try {
            sseEvent = JSON.parse(sseString);
          } catch (error) {
            console.error("SSEイベントの解析エラー:", error);
            continue;
          }

          const { event, data } = sseEvent;

          // ストリーミング応答処理
          if (event === "messages/partial") {
            if (Array.isArray(data)) {
              const lastObj = data[data.length - 1];

              if (lastObj.type === "ai") {
                const partialContent = lastObj.content ?? "";

                // UIの即時更新のため、同期的に処理
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const assistantIndex = newMessages.length - 1;

                  if (
                    assistantIndex >= 0 &&
                    newMessages[assistantIndex].role === "assistant"
                  ) {
                    newMessages[assistantIndex] = {
                      ...newMessages[assistantIndex],
                      content: partialContent,
                    };
                  }

                  return newMessages;
                });
              }
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("リクエストがキャンセルされました");
      } else {
        console.error("エラー:", error);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "こんにちは、どのようにお手伝いできますか？",
      },
    ]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    resetChat,
  };
}
