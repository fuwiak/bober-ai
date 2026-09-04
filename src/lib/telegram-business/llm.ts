import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  SYSTEM_PROMPT,
  REMINDER_SYSTEM_PROMPT,
  MAX_CLARIFYING_QUESTIONS,
  antiEchoFallbackReply,
  buildUserPrompt,
  buildReminderUserPrompt,
  clarifyingLimitReply,
  countClarifyingQuestions,
  stripHandoff,
  stripRecurringBoilerplate,
} from "@/lib/telegram-business/prompt";
import { fallbackReply, loadKnowledge } from "@/lib/telegram-business/knowledge";
import { queryGraphKnowledge } from "@/lib/telegram-business/graph-knowledge";
import {
  ensureWebDisclaimer,
  knowledgeLikelyInsufficient,
  needsArchitectureContext,
  needsMarketResearch,
  sanitizePublicText,
  webDisclaimer,
} from "@/lib/telegram-business/research/sanitize";
import {
  formatSearxHitsForPrompt,
  searchSearxng,
} from "@/lib/telegram-business/research/searxng";
import { detectBookingIntent } from "@/lib/telegram-business/booking";
import { detectLangFromText } from "@/lib/telegram-business/reminders/schedule";
import {
  echoesRecentReplies,
  recentAssistantTexts,
} from "@/lib/telegram-business/db/store";
import type { StoredMessage } from "@/lib/telegram-business/db/schema";
import {
  isOpenRouterAuthBroken,
  markOpenRouterAuthBroken,
  openRouterApiKey,
  openRouterReady,
} from "@/lib/telegram-business/openrouter-auth";

export { isOpenRouterAuthBroken, openRouterReady } from "@/lib/telegram-business/openrouter-auth";

/** How many prior assistant turns to feed into anti-echo + prompt blacklist. */
const ANTI_ECHO_PRIOR_LIMIT = 8;
/** Cap knowledge dump after first reply — full dossier fuels repeated pitch. */
const KNOWLEDGE_WITH_HISTORY_CHARS = 4_500;

/** Client lang from thread user messages + current turn (same heuristic as reminders). */
function detectClientLang(
  message: string,
  history: StoredMessage[] = [],
): string {
  const userBlob = [
    ...history.filter((m) => m.role === "user").map((m) => m.text),
    message,
  ]
    .filter(Boolean)
    .join("\n");
  return detectLangFromText(userBlob || message, "ru");
}

const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

type ChatTurn = { role: "system" | "user" | "assistant"; content: string };

function modelName() {
  return (
    process.env.TELEGRAM_BUSINESS_LLM_MODEL?.trim() ||
    process.env.NEWS_AGENT_MODEL?.trim() ||
    "deepseek/deepseek-v4-flash-0731"
  );
}

async function chatOpenRouter(
  messages: ChatTurn[],
  opts?: { temperature?: number },
): Promise<string> {
  if (isOpenRouterAuthBroken()) {
    throw new Error("OPENROUTER_API_KEY rejected (circuit open)");
  }
  const apiKey = openRouterApiKey();
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
        temperature: opts?.temperature ?? 0.35,
        max_tokens: 700,
        messages,
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      if (res.status === 401 || res.status === 403) {
        markOpenRouterAuthBroken(`LLM ${res.status}: ${text}`);
      }
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
  booking: boolean;
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

async function gatherResearchContext(
  message: string,
): Promise<{ text: string; usedWeb: boolean }> {
  const parts: string[] = [];
  let usedWeb = false;
  try {
    const wantGraph =
      needsArchitectureContext(message) ||
      needsMarketResearch(message) ||
      knowledgeLikelyInsufficient(message);
    if (wantGraph) {
      const graph = await queryGraphKnowledge(message);
      if (graph.text) {
        parts.push(`[graph:${graph.source}]\n${graph.text}`);
      }
    }

    // Live chat: knowledge first; SearX when market research OR knowledge likely thin.
    const wantWeb =
      Boolean(process.env.SEARXNG_URL?.trim()) &&
      (needsMarketResearch(message) || knowledgeLikelyInsufficient(message));
    if (wantWeb) {
      const { hits, error } = await searchSearxng(message, { limit: 4 });
      if (error) {
        console.info("[telegram-business] searx", error);
      }
      const formatted = formatSearxHitsForPrompt(hits);
      if (formatted) {
        parts.push(
          `[web] UNVERIFIED public web hits (must disclose to client; not company guarantees):\n${formatted}`,
        );
        usedWeb = true;
      }
    }
  } catch (err) {
    console.error("[telegram-business] research context", err);
  }
  return {
    text: sanitizePublicText(parts.join("\n\n"), 2800),
    usedWeb,
  };
}

export async function generateBusinessReply(params: {
  message: string;
  customerName?: string;
  /** Recent messages including the current user turn (oldest → newest). */
  history?: StoredMessage[];
}): Promise<GenerateResult> {
  const fullKnowledge = await loadKnowledge();
  const history = params.history ?? [];
  const clientLang = detectClientLang(params.message, history);
  const clarifyingSoFar = countClarifyingQuestions(history);
  const wantsBooking = detectBookingIntent(params.message, false);
  const priorAssistants = recentAssistantTexts(history, ANTI_ECHO_PRIOR_LIMIT);
  // After first assistant turn, shrink knowledge dump — full dossier → repeated pitch.
  const knowledge =
    priorAssistants.length > 0
      ? fullKnowledge.slice(0, KNOWLEDGE_WITH_HISTORY_CHARS)
      : fullKnowledge;

  // Soft cap: after ~5 clarifying Qs without booking — stop grilling, hand off to Paweł.
  if (clarifyingSoFar >= MAX_CLARIFYING_QUESTIONS && !wantsBooking) {
    return {
      text: clarifyingLimitReply(clientLang),
      handoff: true,
      booking: false,
      source: "fallback",
    };
  }

  if (!openRouterReady()) {
    return {
      text: fallbackReply(params.message),
      handoff: false,
      booking: false,
      source: "fallback",
    };
  }

  try {
    // Drop current user turn — it is re-injected via buildUserPrompt.
    const prior = history.slice(0, -1);
    const turns = historyToTurns(prior);
    const research = await gatherResearchContext(params.message);
    const disclaimer = research.usedWeb ? webDisclaimer(clientLang) : undefined;

    const polish = (text: string) => {
      let t = stripRecurringBoilerplate(text, priorAssistants);
      if (research.usedWeb) t = ensureWebDisclaimer(t, clientLang);
      return t.trim() || text.trim();
    };

    const runOnce = async (antiEchoRetry: boolean) => {
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
            researchContext: research.text,
            usedWeb: research.usedWeb,
            webDisclaimerText: disclaimer,
            clarifyingQuestionsSoFar: clarifyingSoFar,
            recentAssistantReplies: priorAssistants,
            antiEchoRetry,
          }),
        },
      ];
      const raw = await chatOpenRouter(messages, {
        temperature: antiEchoRetry ? 0.55 : 0.35,
      });
      const stripped = stripHandoff(raw);
      let text = polish(stripped.text || fallbackReply(params.message));
      return {
        text,
        handoff: stripped.handoff,
        booking: stripped.booking,
        source: "llm" as const,
      };
    };

    let result = await runOnce(false);

    // Deterministic gate: reject paraphrased echo of last N assistant replies.
    if (priorAssistants.length && echoesRecentReplies(result.text, priorAssistants)) {
      console.info("[telegram-business] anti-echo: regenerating");
      result = await runOnce(true);
      if (echoesRecentReplies(result.text, priorAssistants)) {
        console.info("[telegram-business] anti-echo: fallback after retry");
        return {
          text: antiEchoFallbackReply(clientLang),
          handoff: false,
          booking: false,
          source: "fallback",
        };
      }
    }

    return result;
  } catch (err) {
    console.error("[telegram-business] LLM failed", err);
    return {
      text: fallbackReply(params.message),
      handoff: false,
      booking: false,
      source: "fallback",
    };
  }
}

function topicHintFromHistory(history: StoredMessage[]): string {
  const lines = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-10)
    .map((m) => `${m.role}: ${m.text.slice(0, 280)}`);
  return lines.join("\n") || "(нет истории)";
}

const REMINDER_FALLBACK: Record<string, string> = {
  ru: "По вашей теме: зафиксируйте 1 узкое место процесса (где теряете время/деньги) — на пилоте 2–4 недели обычно закрываем именно его. Если удобно — напишите систему (Bitrix/1С/другое).",
  pl: "W Waszym temacie: wypiszcie 1 wąskie gardło procesu (gdzie tracicie czas/pieniądze) — pilotaż 2–4 tyg. zwykle zamyka właśnie to. Napiszcie system (Bitrix/1C/inny), jeśli wygodnie.",
  en: "On your topic: name one process bottleneck (where you lose time/money) — a 2–4 week pilot usually closes that first. Reply with your stack (Bitrix/1C/other) if useful.",
};

const GENERIC_BOTTLENECK =
  /name one process bottleneck|узкое место процесса|wąskie gardło procesu/i;

/** Short concrete reminder/news advice from thread + knowledge (+ optional news hit). */
export async function generateReminderAdvice(params: {
  history: StoredMessage[];
  customerName?: string;
  lang: string;
  newsHint?: string;
  /** News tips: skip generic bottleneck fallback — caller should stay silent. */
  requireConcrete?: boolean;
}): Promise<{ text: string; source: "llm" | "fallback" }> {
  const knowledge = await loadKnowledge();
  const fallback =
    REMINDER_FALLBACK[params.lang] || REMINDER_FALLBACK.ru;

  if (!openRouterReady()) {
    if (params.requireConcrete) return { text: "", source: "fallback" };
    return { text: fallback, source: "fallback" };
  }

  try {
    const messages: ChatTurn[] = [
      { role: "system", content: REMINDER_SYSTEM_PROMPT },
      {
        role: "user",
        content: buildReminderUserPrompt({
          knowledge,
          customerName: params.customerName,
          lang: params.lang,
          topicHint: topicHintFromHistory(params.history),
          newsHint: params.newsHint,
        }),
      },
    ];
    const raw = await chatOpenRouter(messages);
    const text = raw
      .replace(/HANDOFF:\s*(yes|no)/gi, "")
      .replace(/BOOKING:\s*(yes|no)/gi, "")
      .trim()
      .slice(0, 900);

    if (!text) {
      if (params.requireConcrete) return { text: "", source: "fallback" };
      return { text: fallback, source: "fallback" };
    }

    // Reject preachy generic when news tip must stay concrete.
    if (params.requireConcrete && GENERIC_BOTTLENECK.test(text)) {
      return { text: "", source: "fallback" };
    }

    // Anti-echo vs recent assistant turns (incl. prior reminders/news).
    const priors = recentAssistantTexts(params.history, ANTI_ECHO_PRIOR_LIMIT);
    const cleaned = stripRecurringBoilerplate(text, priors);
    if (priors.length && echoesRecentReplies(cleaned || text, priors)) {
      console.info("[telegram-business] reminder anti-echo skip");
      if (params.requireConcrete) return { text: "", source: "fallback" };
      // Regular reminder: skip send rather than echo.
      return { text: "", source: "fallback" };
    }

    return { text: cleaned || text, source: "llm" };
  } catch (err) {
    // Auth circuit already logged once — skip per-customer spam.
    if (!isOpenRouterAuthBroken()) {
      console.error("[telegram-business] reminder LLM failed", err);
    }
    if (params.requireConcrete) return { text: "", source: "fallback" };
    return { text: fallback, source: "fallback" };
  }
}
