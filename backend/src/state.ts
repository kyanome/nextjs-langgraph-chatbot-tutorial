import { Annotation, messagesStateReducer } from "@langchain/langgraph";

export const StateAnnotation = Annotation.Root({
  messages: Annotation({
    default: () => [],
    reducer: messagesStateReducer,
  }),
});
