"use client";

import { OPEN_CHAT_EVENT } from "@/components/chat-widget";

export function OpenChatButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
      className={className}
    >
      Ask my digital twin
    </button>
  );
}
