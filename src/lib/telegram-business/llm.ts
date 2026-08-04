import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SYSTEM_PROMPT, buildUserPrompt, stripHandoff } from "@/lib/telegram-business/prompt";
import { fallbackReply, loadKnowledge } from "@/lib/telegram-business/knowledge";
import type { StoredMessage } from "@/lib/telegram-business/db/schema";

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

type ChatTurn = { role: "system" | "user" | "assistant"; content: string };

function modelName() {
  return (
    process.env.TELEGRAM_BUSINESS_LLM_MODEL?.trim() ||
    process.env.NEWS_AGENT_MODEL?.trim() ||
    "deepseek/deepseek-v4-flash-0731"
  );
}

async function chatOpenRouter(messages: ChatTurn[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) throw new Error("OPENROUTER_API_KEY missing");

  const endpoint =
    process.env.TELEGRAM_BUSINESS_LLM_ENDPOINT?.trim() || OPENROUTER_ENDPOINT;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 45_000);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.PUBLIC_SITE_URL || SITE_URL,
        "X-Title": `${SITE_NAME} Telegram Business`,
      },
      body: JSON.stringify({
        model: modelName(),
        temperature: 0.3,
        max_tokens: 700,
        messages,
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`LLM ${res.status}: ${text.slice(0, 240)}`);
    }
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error("empty LLM content");
    return content;
  } finally {
    clearTimeout(timer);
  }
}

export type GenerateResult = {
  text: string;
  handoff: boolean;
  source: "llm" | "fallback";
};

function historyToTurns(history: StoredMessage[]): ChatTurn[] {
  const turns: ChatTurn[] = [];
  for (const m of history) {
    if (m.role === "system") continue;
    if (m.role !== "user" && m.role !== "assistant") continue;
    const content = m.text.trim();
    if (!content) continue;
    turns.push({ role: m.role, content });
  }
  return turns;
}

export async function generateBusinessReply(params: {
  message: string;
  customerName?: string;
  /** Recent messages including the current user turn (oldest → newest). */
  history?: StoredMessage[];
}): Promise<GenerateResult> {
  const knowledge = await loadKnowledge();

  if (!process.env.OPENROUTER_API_KEY?.trim()) {
    return { text: fallbackReply(params.message), handoff: false, source: "fallback" };
  }

  try {
    const history = params.history ?? [];
    const prior = history.slice(0, -1); // drop current user msg — re-add via buildUserPrompt
    const turns = historyToTurns(prior);

    const messages: ChatTurn[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...turns,
      {
        role: "user",
        content: buildUserPrompt({
          knowledge,
          customerName: params.customerName,
          message: params.message,
          hasHistory: turns.length > 0,
        }),
      },
    ];

    const raw = await chatOpenRouter(messages);
    const { text, handoff } = stripHandoff(raw);
    return {
      text: text || fallbackReply(params.message),
      handoff,
      source: "llm",
    };
  } catch (err) {
    console.error("[telegram-business] LLM failed", err);
    return { text: fallbackReply(params.message), handoff: false, source: "fallback" };
  }
}
