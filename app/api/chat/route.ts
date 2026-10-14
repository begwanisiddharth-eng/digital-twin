import { buildSystemPrompt } from "@/lib/chat-prompt";

const OPENROUTER_URL =
  process.env.OPENROUTER_API_URL ??
  "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

const MAX_MESSAGES = 12; // conversation turns forwarded to the model
const MAX_CHARS = 1000; // per message
const MAX_ATTEMPTS = 4;
const TOTAL_BUDGET_MS = 75_000; // across all attempts

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
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("OPENROUTER_API_KEY is not set");
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

  const origin = request.headers.get("origin") ?? "http://localhost:3000";
  const payload = JSON.stringify({
    model: MODEL,
    messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
    temperature: 0.2,
    max_tokens: 1500,
    reasoning: { exclude: true },
  });

  // The free model is frequently "temporarily overloaded" (often reported
  // inside a 200 response), so transient failures are retried with backoff.
  const deadline = Date.now() + TOTAL_BUDGET_MS;
  let lastFailure: Failure = "unreachable";

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = await callOpenRouter(apiKey, origin, payload, deadline);
    if ("reply" in result) return Response.json({ reply: result.reply });

    lastFailure = result.failure;
    if (lastFailure === "config") break;

    const backoff = 1000 * 2 ** (attempt - 1);
    if (attempt === MAX_ATTEMPTS || Date.now() + backoff + 5000 > deadline) break;
    await new Promise((r) => setTimeout(r, backoff));
  }

  return errorResponse(FAILURE_MESSAGES[lastFailure], 502);
}

type Failure = "busy" | "unreachable" | "empty" | "config";

const FAILURE_MESSAGES: Record<Failure, string> = {
  busy: "The AI model is very busy right now (it runs on a free tier). Please try again in a minute.",
  unreachable: "The assistant is unreachable right now. Please try again shortly.",
  empty: "The assistant didn't return an answer. Please try asking again.",
  config: "The chat assistant is not configured correctly. Please try again later.",
};

async function callOpenRouter(
  apiKey: string,
  origin: string,
  payload: string,
  deadline: number,
): Promise<{ reply: string } | { failure: Failure }> {
  let upstream: Response;
  try {
    upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": origin,
        "X-Title": "Siddharth Begwani - Digital Twin",
      },
      body: payload,
      signal: AbortSignal.timeout(Math.max(1000, deadline - Date.now())),
    });
  } catch (err) {
    console.error("OpenRouter request failed", err);
    return { failure: "unreachable" };
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error(`OpenRouter error ${upstream.status}: ${detail}`);
    if ([400, 401, 402, 403, 404].includes(upstream.status)) return { failure: "config" };
    return { failure: upstream.status === 429 ? "busy" : "unreachable" };
  }

  const data = (await upstream.json().catch(() => null)) as {
    choices?: { message?: { content?: string | null } }[];
    error?: { message?: string; code?: number };
  } | null;

  if (data?.error) {
    console.error("OpenRouter returned an error", JSON.stringify(data.error));
    return { failure: "busy" };
  }

  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    console.error("OpenRouter returned no content", JSON.stringify(data));
    return { failure: "empty" };
  }
  return { reply };
}
