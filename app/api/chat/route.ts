import { buildSystemPrompt } from "@/lib/chat-prompt";

const GROQ_URL =
  process.env.GROQ_API_URL ?? "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

const MAX_MESSAGES = 12; // conversation turns forwarded to the model
const MAX_CHARS = 1000; // per message
const MAX_ATTEMPTS = 4;
const TOTAL_BUDGET_MS = 75_000; // across all attempts
const MAX_BACKOFF_MS = 30_000;

type ChatMessage = { role: "user" | "assistant"; content: string };

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const m = value as Record<string, unknown>;
  return (
    (m.role === "user" || m.role === "assistant") &&
    typeof m.content === "string" &&
    m.content.trim().length > 0
  );
}

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY is not set");
    return errorResponse(
      "The chat assistant is not configured yet. Please try again later.",
      500,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request body.", 400);
  }

  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0 || !raw.every(isChatMessage)) {
    return errorResponse("Invalid messages.", 400);
  }

  const messages = raw.slice(-MAX_MESSAGES).map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_CHARS),
  }));
  if (messages[messages.length - 1].role !== "user") {
    return errorResponse("The last message must come from the user.", 400);
  }

  const payload = JSON.stringify({
    model: MODEL,
    messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
    temperature: 0.2,
    max_tokens: 1500,
  });

  // Exponential backoff with jitter, honoring Groq's `retry-after` on 429s,
  // retrying transient failures (429 / 5xx / network errors) within a budget.
  const deadline = Date.now() + TOTAL_BUDGET_MS;
  let lastFailure: Failure = "unreachable";
  let retryAfterMs: number | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = await callGroq(apiKey, payload, deadline);
    if ("reply" in result) return Response.json({ reply: result.reply });

    lastFailure = result.failure;
    retryAfterMs = result.retryAfterMs;
    if (lastFailure === "config") break;

    const backoff = retryAfterMs ?? Math.min(1000 * 2 ** (attempt - 1), MAX_BACKOFF_MS);
    const jittered = backoff + Math.random() * 1000;
    if (attempt === MAX_ATTEMPTS || Date.now() + jittered + 5000 > deadline) break;
    await new Promise((r) => setTimeout(r, jittered));
  }

  return errorResponse(FAILURE_MESSAGES[lastFailure], 502);
}

type Failure = "busy" | "unreachable" | "empty" | "config";

const FAILURE_MESSAGES: Record<Failure, string> = {
  busy: "The assistant is receiving a lot of questions right now. Please try again in a minute.",
  unreachable: "The assistant is unreachable right now. Please try again shortly.",
  empty: "The assistant didn't return an answer. Please try asking again.",
  config: "The chat assistant is not configured correctly. Please try again later.",
};

async function callGroq(
  apiKey: string,
  payload: string,
  deadline: number,
): Promise<{ reply: string } | { failure: Failure; retryAfterMs: number | null }> {
  let upstream: Response;
  try {
    upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: payload,
      signal: AbortSignal.timeout(Math.max(1000, deadline - Date.now())),
    });
  } catch (err) {
    console.error("Groq request failed", err);
    return { failure: "unreachable", retryAfterMs: null };
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error(`Groq error ${upstream.status}: ${detail}`);
    if ([400, 401, 403, 404].includes(upstream.status)) {
      return { failure: "config", retryAfterMs: null };
    }
    const retryAfterMs = parseRetryAfter(upstream.headers.get("retry-after"));
    return {
      failure: upstream.status === 429 ? "busy" : "unreachable",
      retryAfterMs,
    };
  }

  const data = (await upstream.json().catch(() => null)) as {
    choices?: { message?: { content?: string | null } }[];
  } | null;

  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    console.error("Groq returned no content", JSON.stringify(data));
    return { failure: "empty", retryAfterMs: null };
  }
  return { reply };
}

function parseRetryAfter(header: string | null): number | null {
  const seconds = Number(header);
  return Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : null;
}
