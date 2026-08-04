/**
 * Client-tailored news/tips: poll RSS + SearXNG, match to each client's
 * conversation topics, send short tip+advice (dedup, daily cap, reminders_enabled).
 */

import {
  appendMessage,
  countNewsAlertsToday,
  getRecentMessages,
  hasNewsBeenSent,
  HISTORY_LIMIT,
  listReminderEligibleCustomers,
  markNewsSent,
  normalizeForCompare,
  recentAssistantTexts,
} from "@/lib/telegram-business/db/store";
import { generateReminderAdvice } from "@/lib/telegram-business/llm";
import {
  businessBotToken,
  sendMessageWithKeyboard,
} from "@/lib/telegram-business/api";
import {
  buildReminderKeyboard,
  resolveClientLang,
} from "@/lib/telegram-business/reminders/schedule";
import {
  fetchAllRssItems,
  filterFreshItems,
  type RssItem,
} from "@/lib/telegram-business/research/rss";
import { searchSearxng } from "@/lib/telegram-business/research/searxng";
import { sanitizePublicText } from "@/lib/telegram-business/research/sanitize";

export type NewsTickResult = {
  ok: boolean;
  scanned: number;
  matched: number;
  sent: number;
  skipped: number;
  errors: string[];
};

const TOPIC_STOP = new Set([
  "это",
  "как",
  "что",
  "для",
  "или",
  "the",
  "and",
  "for",
  "with",
  "есть",
  "нужно",
  "можно",
  "просто",
  "очень",
  "также",
  "будет",
  "который",
  "которая",
  "которые",
  "please",
  "hello",
  "привет",
  "спасибо",
  "добрый",
  "день",
]);

const DOMAIN_BOOSTS = [
  "bitrix",
  "битрикс",
  "1с",
  "1c",
  "ocr",
  "crm",
  "whatsapp",
  "telegram",
  "речев",
  "meeting",
  "chatgpt",
  "ассистент",
  "интеграц",
  "152",
  "импортозамещ",
  "вордстат",
  "wordstat",
  "яндекс",
  "автоматиз",
  "пилот",
];

/** Max SearX queries per news tick (all clients combined). */
const SEARX_TICK_BUDGET = 12;

/**
 * Min relevance to send a tip. Weak single-token / summary-only matches stay silent.
 * Title must hit ≥1 real client topic; total score usually needs ≥4.
 */
export const MIN_NEWS_SCORE = 4;

function maxAlertsPerDay(): number {
  const n = Number(process.env.TELEGRAM_NEWS_ALERTS_PER_DAY || "2");
  return Number.isFinite(n) && n > 0 ? Math.min(5, Math.floor(n)) : 2;
}

/**
 * SearX for news tips: ON by default when SEARXNG_URL is set.
 * Explicit TELEGRAM_NEWS_SEARX=0|false|off disables; =1 forces on.
 */
export function isNewsSearxEnabled(): boolean {
  const flag = (process.env.TELEGRAM_NEWS_SEARX || "").trim().toLowerCase();
  if (flag === "0" || flag === "false" || flag === "off" || flag === "no") {
    return false;
  }
  if (flag === "1" || flag === "true" || flag === "on" || flag === "yes") {
    return true;
  }
  return Boolean(process.env.SEARXNG_URL?.trim());
}

export function extractTopics(texts: string[]): string[] {
  const blob = texts.join("\n").toLowerCase();
  const tokens = blob
    .split(/[^\p{L}\p{N}+]+/u)
    .filter((t) => t.length >= 4 && !TOPIC_STOP.has(t));
  const freq = new Map<string, number>();
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
  for (const b of DOMAIN_BOOSTS) {
    if (blob.includes(b)) freq.set(b, (freq.get(b) || 0) + 5);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([t]) => t);
}

export function scoreItem(item: RssItem, topics: string[]): number {
  if (!topics.length) return 0;
  const title = item.title.toLowerCase();
  const hay = `${title} ${item.summary}`.toLowerCase();
  let score = 0;
  let hits = 0;
  let titleHits = 0;
  for (const t of topics) {
    if (!hay.includes(t)) continue;
    hits += 1;
    score += t.length >= 6 ? 2 : 1;
    if (title.includes(t)) {
      titleHits += 1;
      score += 2;
    }
  }
  // Summary-only / zero title overlap → reject (stops random Habr dumps).
  if (titleHits === 0) return 0;
  // Single short-token title hit is weak unless score already strong.
  if (hits === 1 && score < MIN_NEWS_SCORE) return score;
  if (item.publishedAt) {
    const ageH = (Date.now() - item.publishedAt.getTime()) / 3600_000;
    if (ageH <= 24) score += 1;
  }
  return score;
}

/** Localized tip header — always match conversation language, never force EN. */
export function tipPrefix(lang: string, item: RssItem): string {
  const cite = sanitizePublicText(`${item.title}\n${item.link}`, 320);
  if (lang === "pl") {
    return `Krótka aktualność pod Wasz temat:\n${cite}\n\n`;
  }
  if (lang === "en") {
    return `Quick tip from a fresh source for your topic:\n${cite}\n\n`;
  }
  return `Короткий сигнал по вашей теме:\n${cite}\n\n`;
}

function buildSearxQueries(topics: string[]): string[] {
  const top = topics.slice(0, 6);
  if (!top.length) return [];
  const q1 = `${top.slice(0, 3).join(" ")} бизнес Россия`;
  const q2 =
    top.length > 3
      ? `${top.slice(3, 6).join(" ")} интеграция CRM`
      : `${top[0]} новости автоматизация`;
  return [q1, q2].filter((q, i, arr) => arr.indexOf(q) === i);
}

type SearxBudget = { used: number; max: number };

async function enrichWithSearx(
  topics: string[],
  budget: SearxBudget,
): Promise<{ item: RssItem; score: number } | null> {
  if (!isNewsSearxEnabled()) return null;
  if (!topics.length) return null;
  if (budget.used >= budget.max) return null;

  const queries = buildSearxQueries(topics);
  let best: { item: RssItem; score: number } | null = null;

  for (const q of queries) {
    if (budget.used >= budget.max) break;
    budget.used += 1;
    const { hits } = await searchSearxng(q, { limit: 4, language: "ru-RU" });
    for (const hit of hits) {
      const item: RssItem = {
        id: hit.url,
        title: hit.title,
        link: hit.url,
        summary: hit.content,
        publishedAt: new Date(),
        source: "searxng",
      };
      const score = scoreItem(item, topics);
      if (score < MIN_NEWS_SCORE) continue;
      if (!best || score > best.score) {
        best = { item, score };
      }
    }
  }

  return best;
}

/**
 * Match fresh RSS (+ SearX when available) to reminder-eligible clients and send tips.
 */
export async function runNewsAlertTick(limitCustomers = 15): Promise<NewsTickResult> {
  if (process.env.TELEGRAM_NEWS_ALERTS_DISABLED === "1") {
    return { ok: true, scanned: 0, matched: 0, sent: 0, skipped: 0, errors: [] };
  }

  const token = businessBotToken();
  if (!token) {
    return {
      ok: false,
      scanned: 0,
      matched: 0,
      sent: 0,
      skipped: 0,
      errors: ["TELEGRAM_BUSINESS_BOT_TOKEN missing"],
    };
  }

  const errors: string[] = [];
  let sent = 0;
  let skipped = 0;
  let matched = 0;
  const searxBudget: SearxBudget = { used: 0, max: SEARX_TICK_BUDGET };

  let items: RssItem[] = [];
  try {
    items = filterFreshItems(await fetchAllRssItems(), 72);
  } catch (err) {
    errors.push(err instanceof Error ? err.message : String(err));
  }

  const customers = await listReminderEligibleCustomers(limitCustomers);
  const dailyCap = maxAlertsPerDay();

  for (const { customer, conversation } of customers) {
    if (!customer.remindersEnabled) {
      skipped += 1;
      continue;
    }

    try {
      const todayCount = await countNewsAlertsToday(customer.id);
      if (todayCount >= dailyCap) {
        skipped += 1;
        continue;
      }

      const history = await getRecentMessages(conversation.id, HISTORY_LIMIT);
      const userTexts = history.filter((m) => m.role === "user").map((m) => m.text);
      if (userTexts.length === 0) {
        skipped += 1;
        continue;
      }
      // Topics from CLIENT messages only — bot product jargon was matching random Habr.
      const topics = extractTopics(userTexts);
      if (!topics.length) {
        skipped += 1;
        continue;
      }

      // Title already mentioned in recent bot tips — skip (URL store + soft text dedupe).
      const recentNorm = recentAssistantTexts(history, 8).map((t) =>
        normalizeForCompare(t),
      );

      let best: { item: RssItem; score: number } | null = null;
      for (const item of items) {
        const score = scoreItem(item, topics);
        if (score < MIN_NEWS_SCORE) continue;
        if (await hasNewsBeenSent(customer.id, item.link)) continue;
        const titleNorm = normalizeForCompare(item.title);
        const titleKey = titleNorm.slice(0, Math.min(72, titleNorm.length));
        if (
          titleKey.length >= 12 &&
          recentNorm.some((t) => t.includes(titleKey) || t.includes(item.link.toLowerCase()))
        ) {
          continue;
        }
        if (!best || score > best.score) best = { item, score };
      }

      // Prefer strong RSS; SearX only when nothing passed the bar — no fake score inflation.
      if (!best) {
        const sx = await enrichWithSearx(topics, searxBudget);
        if (
          sx &&
          sx.score >= MIN_NEWS_SCORE &&
          !(await hasNewsBeenSent(customer.id, sx.item.link))
        ) {
          best = { item: sx.item, score: sx.score };
        }
      }

      if (!best || best.score < MIN_NEWS_SCORE) {
        skipped += 1;
        continue;
      }
      matched += 1;

      // History wins over stale preferredLang (e.g. one EN paste locked "en").
      const lang = resolveClientLang(userTexts, customer.preferredLang);

      const newsHint = sanitizePublicText(
        `${best.item.title}\n${best.item.summary}\n${best.item.link}`,
        500,
      );

      const advice = await generateReminderAdvice({
        history,
        customerName:
          [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
          undefined,
        lang,
        newsHint,
        requireConcrete: true,
      });

      // Better silence than generic «name one bottleneck» preach.
      if (advice.source === "fallback" || !advice.text.trim()) {
        skipped += 1;
        continue;
      }

      const text = sanitizePublicText(
        `${tipPrefix(lang, best.item)}${advice.text}`.slice(0, 3500),
        3500,
      );

      await sendMessageWithKeyboard({
        token,
        chatId: conversation.chatId,
        businessConnectionId: conversation.businessConnectionId,
        text,
        replyMarkup: buildReminderKeyboard(lang, customer.id),
      });

      await appendMessage({
        conversationId: conversation.id,
        role: "assistant",
        text: `[news-alert] ${text}`,
      });
      await markNewsSent({
        customerId: customer.id,
        articleUrl: best.item.link,
        articleTitle: best.item.title,
      });
      sent += 1;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[telegram-news] send failed", {
        customerId: customer.id,
        error: msg,
      });
      errors.push(`customer=${customer.id}: ${msg.slice(0, 160)}`);
      skipped += 1;
    }
  }

  return {
    ok: errors.length === 0,
    scanned: customers.length,
    matched,
    sent,
    skipped,
    errors,
  };
}
