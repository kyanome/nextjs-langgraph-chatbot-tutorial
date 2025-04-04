import { END, START, StateGraph } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { StateAnnotation } from "./state.js";
import { HumanMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

async function chatbot(state: typeof StateAnnotation.State) {
  const answer = await model.invoke(state.messages);
  return { messages: answer };
}

const builder = new StateGraph(StateAnnotation)
  .addNode("chatbot", chatbot)
  .addEdge(START, "chatbot")
  .addEdge("chatbot", END);

export const graph = builder.compile().withConfig({ runName: "chatbot" });
