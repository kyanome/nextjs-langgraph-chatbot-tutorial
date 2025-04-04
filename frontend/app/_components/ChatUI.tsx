"use client";

import { Message } from "../_types/chat";
import { ChatMessage } from "./ChatMessage";
import { MessageForm } from "./MesssageForm";

interface ChatUIProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export function ChatUI({ messages, isLoading, onSendMessage }: ChatUIProps) {
  return (
    <div className="flex flex-col h-full">
      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {isLoading && (
            <div className="flex justify-start items-center mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 self-start mt-0.5">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-emerald-500">
                    <span className="sr-only">アシスタント</span>
                  </div>
                </div>
                <div className="flex space-x-2 px-3 py-2 rounded-lg bg-gray-100">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 入力エリア */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <MessageForm onSubmit={onSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
