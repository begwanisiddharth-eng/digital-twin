"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Message = { role: "user" | "assistant"; content: string };

export const OPEN_CHAT_EVENT = "open-digital-twin";

const SUGGESTIONS = [
  "What was his role on the BNY Mellon program?",
  "What AI/ML experience does he have?",
  "Which CRM platforms is he certified in?",
  "Is he open to remote roles?",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm Siddharth's digital twin. Ask me anything about his professional background — roles, client projects, skills, education or availability.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, error]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const history = [...messages, { role: "user" as const, content: question }];
    setMessages(history);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only; don't send it to the model.
        body: JSON.stringify({ messages: history.slice(1) }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };
      if (!res.ok || !data.reply) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply! },
      ]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="digital-twin-panel"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-accent-dark px-5 py-3.5 font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-accent sm:bottom-6 sm:right-6"
      >
        {open ? (
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path
              d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span>{open ? "Close chat" : "Ask my digital twin"}</span>
      </button>

      {open && (
        <div
          id="digital-twin-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="digital-twin-title"
          onKeyDown={(e) => e.key === "Escape" && close()}
          className="fixed inset-x-3 bottom-24 top-28 z-40 flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/25 sm:inset-x-auto sm:right-6 sm:top-auto sm:h-[min(640px,calc(100vh-8rem))] sm:w-[400px]"
        >
          <header className="flex items-start justify-between gap-3 bg-accent-dark px-5 py-4 text-white">
            <div>
              <h2 id="digital-twin-title" className="font-serif text-lg font-semibold">
                Siddharth&apos;s digital twin
              </h2>
              <p className="text-sm text-white/75">
                Answers only from his resume
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="rounded-md p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-4 overflow-y-auto bg-background px-4 py-5"
            aria-live="polite"
            aria-busy={loading}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <p
                  className={
                    m.role === "user"
                      ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-accent-dark px-4 py-2.5 text-[0.97rem] leading-relaxed text-white"
                      : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-2.5 text-[0.97rem] leading-relaxed text-ink"
                  }
                >
                  <span className="sr-only">
                    {m.role === "user" ? "You: " : "Digital twin: "}
                  </span>
                  {m.content}
                </p>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <p className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3">
                  <span className="sr-only">Digital twin is typing…</span>
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      aria-hidden
                      className="h-2 w-2 animate-bounce rounded-full bg-accent"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </p>
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[0.95rem] text-red-800"
              >
                {error}
              </p>
            )}

            {showSuggestions && (
              <div>
                <p className="mb-2 text-sm font-medium text-muted">Try asking:</p>
                <ul className="flex flex-col items-start gap-2">
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 text-left text-sm font-medium text-accent-dark hover:border-accent"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-line bg-surface p-3">
            <div className="flex items-end gap-2">
              <label htmlFor="digital-twin-input" className="sr-only">
                Your question
              </label>
              <textarea
                ref={inputRef}
                id="digital-twin-input"
                rows={1}
                maxLength={1000}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask about his experience…"
                className="max-h-32 min-h-[2.75rem] flex-1 resize-none rounded-xl border border-line bg-background px-3.5 py-2.5 text-[0.97rem] text-ink placeholder:text-muted/80 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-11 rounded-xl bg-accent-dark px-4 font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </div>
            <p className="mt-2 px-1 text-xs text-muted">
              AI-generated answers based solely on Siddharth&apos;s resume.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
