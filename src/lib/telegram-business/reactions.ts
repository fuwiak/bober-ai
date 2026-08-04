import type { Context } from "grammy";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  getOrCreateConversation,
  getRecentMessages,
} from "@/lib/telegram-business/db/store";
import type { MessageRole } from "@/lib/telegram-business/db/schema";

/** Labels for inbound tone → Telegram reaction (or skip). */
export type ReactionLabel = "joke" | "neutral" | "troll" | "thanks" | "other";

export type ReactionHistoryTurn = {
  role: MessageRole;
  text: string;
};

/**
 * Bot API allowed reactions (no 😂/😆) — map tone → one emoji.
 * joke→🤣 · troll→😡 · thanks→👍 · neutral/other→skip
 */
const EMOJI_BY_LABEL: Record<ReactionLabel, string | null> = {
  joke: "🤣",
  neutral: null,
  troll: "😡",
  thanks: "👍",
  other: null,
};

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
/** Async fire-and-forget — slightly higher than reply-critical path. */
const LLM_TIMEOUT_MS = 3_500;
const LLM_MAX_TOKENS = 8;
/** Sliding window of recent user+assistant turns for tone context. */
const CONTEXT_WINDOW = 10;

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

/** Clear business / product Q — never react (heuristic soft fallback). */
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
 * Soft heuristic fallback when LLM unavailable/timeout/fail.
 * Returns null when unclear → treat as neutral (no reaction).
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

  if (THANKS_RE.test(t)) return "thanks";

  return null;
}

function formatContextWindow(
  history: ReactionHistoryTurn[],
  currentText: string,
): string {
  const turns = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-CONTEXT_WINDOW)
    .map((m) => ({
      role: m.role as "user" | "assistant",
      text: m.text.trim().slice(0, 280),
    }))
    .filter((m) => m.text);

  const last = turns[turns.length - 1];
  const current = currentText.trim().slice(0, 280);
  if (
    !last ||
    last.role !== "user" ||
    last.text.toLowerCase() !== current.toLowerCase()
  ) {
    turns.push({ role: "user", text: current });
  }

  // Cap total lines at CONTEXT_WINDOW after ensuring current is last.
  const window = turns.slice(-CONTEXT_WINDOW);
  return window
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
    .join("\n");
}

/**
 * LLM primary classifier. Returns null on missing key / HTTP fail / timeout
 * so caller can soft-fallback to heuristics.
 */
async function classifyReactionLlm(
  text: string,
  history: ReactionHistoryTurn[],
): Promise<ReactionLabel | null> {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) return null;

  const endpoint =
    process.env.TELEGRAM_BUSINESS_LLM_ENDPOINT?.trim() || OPENROUTER_ENDPOINT;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), LLM_TIMEOUT_MS);
  const transcript = formatContextWindow(history, text);

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
              "Classify the LATEST user message tone using the conversation context below. Reply with ONE word only: joke|neutral|troll|thanks|other. joke=humor/banter/laughing (even if keywords alone are weak — use prior turns). troll=toxic/insult/spam/bad-faith. thanks=gratitude. neutral=normal business/product question. other=unclear. Prefer neutral when unsure. Do not react to ordinary sales Q&A.",
          },
          {
            role: "user",
            content: `Conversation (oldest→newest):\n${transcript}\n\nLabel the latest User turn only.`,
          },
        ],
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    if (!content.trim()) return null;
    return normalizeLabel(content);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** LLM primary (with history); heuristics only if LLM off/fail/timeout. */
export async function classifyInboundReaction(
  text: string,
  history: ReactionHistoryTurn[] = [],
): Promise<ReactionLabel> {
  if (llmClassifyEnabled()) {
    const llm = await classifyReactionLlm(text, history);
    if (llm !== null) return llm;
  }

  return classifyReactionHeuristic(text) ?? "neutral";
}

export function emojiForReactionLabel(label: ReactionLabel): string | null {
  return EMOJI_BY_LABEL[label] ?? null;
}

export type ReactInboundOpts = {
  chatId?: number;
  mode?: "direct" | "business";
  businessConnectionId?: string;
  /** Preloaded turns; if omitted, load from DB when chatId+mode given. */
  history?: ReactionHistoryTurn[];
};

/**
 * Classify + setMessageReaction. Soft-fail. Call fire-and-forget so reply stays fast.
 * Loads a sliding window of recent messages for LLM tone context when possible.
 */
export async function reactToInboundMessage(
  ctx: Context,
  text: string | undefined,
  opts?: ReactInboundOpts,
): Promise<void> {
  if (!smartReactionsEnabled()) return;
  const body = text?.trim();
  if (!body || body.startsWith("/")) return;

  try {
    let history = opts?.history ?? [];
    if (
      history.length === 0 &&
      opts?.chatId != null &&
      opts.mode
    ) {
      try {
        const conversation = await getOrCreateConversation({
          chatId: opts.chatId,
          mode: opts.mode,
          businessConnectionId: opts.businessConnectionId,
          peerUserId: ctx.from?.id ?? null,
        });
        const recent = await getRecentMessages(
          conversation.id,
          CONTEXT_WINDOW,
        );
        history = recent.map((m) => ({ role: m.role, text: m.text }));
      } catch {
        /* history optional — classify with current text only */
      }
    }

    const label = await classifyInboundReaction(body, history);
    const emoji = emojiForReactionLabel(label);
    if (!emoji) return;
    await ctx.react(emoji as Parameters<Context["react"]>[0]);
    console.info("[telegram-business] reaction", { label, emoji });
  } catch {
    /* optional — Business / limited chats may reject */
  }
}
