import { buildSystemPrompt } from "@/lib/chat-prompt";

const OPENROUTER_URL =
  process.env.OPENROUTER_API_URL ??
  "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

const MAX_MESSAGES = 12; // conversation turns forwarded to the model
const MAX_CHARS = 1000; // per message

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
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
        temperature: 0.2,
        max_tokens: 1500,
        reasoning: { exclude: true },
      }),
      signal: AbortSignal.timeout(60_000),
    });
  } catch (err) {
    console.error("OpenRouter request failed", err);
    return errorResponse(
      "The assistant is unreachable right now. Please try again shortly.",
      502,
    );
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error(`OpenRouter error ${upstream.status}: ${detail}`);
    const message =
      upstream.status === 429
        ? "The assistant is receiving a lot of questions right now. Please try again in a minute."
        : "The assistant couldn't answer right now. Please try again shortly.";
    return errorResponse(message, 502);
  }

  const data = (await upstream.json().catch(() => null)) as {
    choices?: { message?: { content?: string | null } }[];
  } | null;
  const reply = data?.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    console.error("OpenRouter returned no content", JSON.stringify(data));
    return errorResponse(
      "The assistant didn't return an answer. Please try rephrasing your question.",
      502,
    );
  }

  return Response.json({ reply });
}
