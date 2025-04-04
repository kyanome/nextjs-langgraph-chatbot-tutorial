import { Message } from "../_types/chat";
import { Bot } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={`flex w-full ${
        isAssistant ? "justify-start" : "justify-end"
      } mb-4`}
    >
      <div
        className={`flex items-start gap-3 max-w-[80%] ${
          isAssistant ? "" : "flex-row-reverse"
        }`}
      >
        {/* アイコン */}
        <div className="flex-shrink-0 self-start mt-0.5">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              isAssistant ? "bg-emerald-500" : "bg-blue-500"
            }`}
          >
            {isAssistant ? (
              <Bot className="h-4 w-4 text-white" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-4 h-4"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 5a3 3 0 110 6 3 3 0 010-6zm0 13a8.001 8.001 0 01-6.4-3.2c.038-1.597 4.267-2.45 6.4-2.45s6.362.853 6.4 2.45A8.001 8.001 0 0112 20z" />
              </svg>
            )}
          </div>
        </div>

        {/* メッセージ */}
        <div
          className={`flex flex-col py-2 px-3 rounded-lg ${
            isAssistant ? "bg-gray-100 text-gray-800" : "bg-blue-500 text-white"
          }`}
        >
          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
