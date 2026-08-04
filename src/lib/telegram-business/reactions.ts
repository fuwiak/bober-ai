import type { Context } from "grammy";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/** Labels for inbound tone → Telegram reaction (or skip). */
export type ReactionLabel = "joke" | "neutral" | "troll" | "thanks" | "other";

/**
 * Bot API allowed reactions (no 😂/😆) — map tone → one emoji.
 * joke→🤣 · troll→👎 · thanks→👍 · neutral/other→skip
 */
const EMOJI_BY_LABEL: Record<ReactionLabel, string | null> = {
  joke: "🤣",
  neutral: null,
  troll: "👎",
  thanks: "👍",
  other: null,
};

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const LLM_TIMEOUT_MS = 2_500;
const LLM_MAX_TOKENS = 8;

/** Default ON. Set TELEGRAM_SMART_REACTIONS=0 to disable. */
export function smartReactionsEnabled(): boolean {
  return process.env.TELEGRAM_SMART_REACTIONS !== "0";
}

function llmClassifyEnabled(): boolean {
  return process.env.TELEGRAM_SMART_REACTIONS_LLM !== "0";
}

function modelName(): string {
  return (
    process.env.TELEGRAM_REACTION_LLM_MODEL?.trim() ||
    process.env.TELEGRAM_BUSINESS_LLM_MODEL?.trim() ||
    process.env.NEWS_AGENT_MODEL?.trim() ||
    "deepseek/deepseek-v4-flash-0731"
  );
}

const JOKE_RE =
  /(?:\b(?:lol+|lmao+|rofl+|kek+)\b|а?ха+х+|хе+х+|хи+х+|лол+|кек+|прикол|шутк|анекдот|смешн|рофл|😂|🤣|😆|😅)/iu;

const THANKS_RE =
  /(?:\b(?:thanks|thank\s*you|thx|ty)\b|спасиб|благодар|мерси|признателен)/iu;

const TROLL_RE =
  /(?:\b(?:fuck\s*you|idiot|moron|kill\s*yourself|kys|shut\s*up)\b|иди\s*нахуй|пошёл\s*нахуй|пошел\s*нахуй|хуйло|пидор|пидар|еблан|ёблан|мудак|дебил|даун\b|туп(?:ой|ая|ые)\s*(?:бот|ии)|бот\s*туп|скам|развод(?:ила)?|наеб|отсос|соси\b)/iu;

const SPAM_RE =
  /(?:(.)\1{7,})|(?:https?:\/\/\S+){3,}|(?:бесплатн\w*\s+(?:крипт|nft|токен)|100%\s*(?:profit|доход)|срочно\s*перевед)/iu;

/** Clear business / product Q — never react, skip LLM. */
const BUSINESS_Q_RE =
  /(?:\b(?:crm|bitrix|битрикс|интеграц|автоматиз|воркфлоу|workflow|seo|api|цена|стоимост|прайс|тариф|demo|демо|пилот|mvp|запис|консультац|встреч|созвон|оплат|счёт|счет|договор|нда|nda)\b|сколько\s+стоит|как\s+работает|что\s+умее)/iu;

function normalizeLabel(raw: string): ReactionLabel {
  const t = raw.trim().toLowerCase().replace(/[^a-z]/g, "");
  if (t === "joke" || t === "funny" || t === "humor") return "joke";
  if (t === "troll" || t === "toxic" || t === "spam" || t === "bad")
    return "troll";
  if (t === "thanks" || t === "thank" || t === "grateful") return "thanks";
  if (t === "other") return "other";
  return "neutral";
}

/**
 * Fast heuristic. Returns null when unclear (caller may LLM).
 * Clear business Q → neutral (no LLM).
 */
export function classifyReactionHeuristic(
  text: string,
): ReactionLabel | null {
  const t = text.trim();
  if (!t) return "neutral";

  if (TROLL_RE.test(t) || SPAM_RE.test(t)) return "troll";
  if (THANKS_RE.test(t) && t.length < 160) return "thanks";
  if (JOKE_RE.test(t) && !BUSINESS_Q_RE.test(t)) return "joke";
  if (BUSINESS_Q_RE.test(t)) return "neutral";

  // Short warm-only messages without business terms.
  if (THANKS_RE.test(t)) return "thanks";

  return null;
}

async function classifyReactionLlm(text: string): Promise<ReactionLabel> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) return "neutral";

  const endpoint =
    process.env.TELEGRAM_BUSINESS_LLM_ENDPOINT?.trim() || OPENROUTER_ENDPOINT;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), LLM_TIMEOUT_MS);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.PUBLIC_SITE_URL || SITE_URL,
        "X-Title": `${SITE_NAME} Telegram Reactions`,
      },
      body: JSON.stringify({
        model: modelName(),
        temperature: 0,
        max_tokens: LLM_MAX_TOKENS,
        messages: [
          {
            role: "system",
            content:
              "Classify user chat tone. Reply with ONE word only: joke|neutral|troll|thanks|other. joke=humor/laughing. troll=toxic/insult/spam/bad-faith/off-topic abuse. thanks=gratitude. neutral=normal business question. other=unclear. Prefer neutral when unsure.",
          },
          { role: "user", content: text.slice(0, 400) },
        ],
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) return "neutral";
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return normalizeLabel(content);
  } catch {
    return "neutral";
  } finally {
    clearTimeout(timer);
  }
}

export async function classifyInboundReaction(
  text: string,
): Promise<ReactionLabel> {
  const heuristic = classifyReactionHeuristic(text);
  if (heuristic !== null) return heuristic;

  if (!llmClassifyEnabled()) return "neutral";
  return classifyReactionLlm(text);
}

export function emojiForReactionLabel(label: ReactionLabel): string | null {
  return EMOJI_BY_LABEL[label] ?? null;
}

/**
 * Classify + setMessageReaction. Soft-fail. Call fire-and-forget so reply stays fast.
 */
export async function reactToInboundMessage(
  ctx: Context,
  text: string | undefined,
): Promise<void> {
  if (!smartReactionsEnabled()) return;
  const body = text?.trim();
  if (!body || body.startsWith("/")) return;

  try {
    const label = await classifyInboundReaction(body);
    const emoji = emojiForReactionLabel(label);
    if (!emoji) return;
    await ctx.react(emoji as Parameters<Context["react"]>[0]);
    console.info("[telegram-business] reaction", { label, emoji });
  } catch {
    /* optional — Business / limited chats may reject */
  }
}
