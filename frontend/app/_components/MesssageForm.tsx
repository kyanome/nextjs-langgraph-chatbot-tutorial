"use client";
import { FormEvent, useState } from "react";

interface MessageFormProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

export function MessageForm({ onSubmit, isLoading }: MessageFormProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    onSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none min-h-[50px] max-h-[200px]"
            rows={1}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          {!isLoading && (
            <button
              type="submit"
              className="absolute bottom-[10px] right-2 rounded-md p-1.5 text-gray-500 hover:bg-blue-100 hover:text-blue-600 disabled:opacity-40 transition-colors"
              disabled={!message.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-xs text-center text-gray-500">
        Enterキーで送信、Shift+Enterで改行
      </p>
    </form>
  );
}
