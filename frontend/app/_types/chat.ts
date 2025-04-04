export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface SSEEvent {
  event: string;
  data: any;
}

export interface ChatAPIResponse {
  type: "ai" | "human";
  content: string;
}
