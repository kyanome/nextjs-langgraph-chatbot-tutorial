"use client";

import { Suspense } from "react";
import { useChat } from "./_hooks/useChat";
import { ChatUI } from "./_components/ChatUI";

export default function Home() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-hidden bg-gray-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        }
      >
        <ChatUI
          messages={messages}
          isLoading={isLoading}
          onSendMessage={sendMessage}
        />
      </Suspense>
    </div>
  );
}
