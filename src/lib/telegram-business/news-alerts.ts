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
} from "@/lib/telegram-business/db/store";
import { generateReminderAdvice } from "@/lib/telegram-business/llm";
import {
  businessBotToken,
  sendMessageWithKeyboard,
} from "@/lib/telegram-business/api";
import {
  detectLangFromText,
  reminderButtonLabels,
  reminderCallbackData,
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
  const hay = `${item.title} ${item.summary}`.toLowerCase();
  let score = 0;
  for (const t of topics) {
    if (!hay.includes(t)) continue;
    score += t.length >= 6 ? 2 : 1;
    // Title hits matter more than summary-only
    if (item.title.toLowerCase().includes(t)) score += 1;
  }
  // Prefer fresher items slightly when dated
  if (item.publishedAt) {
    const ageH = (Date.now() - item.publishedAt.getTime()) / 3600_000;
    if (ageH <= 24) score += 1;
  }
  return score;
}

function tipPrefix(lang: string, item: RssItem): string {
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
): Promise<RssItem | null> {
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
      // Accept weak title match from focused query (min 1)
      const effective = Math.max(score, hit.title ? 1 : 0);
      if (!best || effective > best.score) {
        best = { item, score: effective };
      }
    }
  }

  return best && best.score >= 1 ? best.item : null;
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
      const assistantTexts = history
        .filter((m) => m.role === "assistant")
        .map((m) => m.text)
        .slice(-4);
      if (userTexts.length === 0) {
        skipped += 1;
        continue;
      }
      // Prefer client words; light boost from recent bot replies (product terms).
      const topics = extractTopics([...userTexts, ...assistantTexts]);
      if (!topics.length) {
        skipped += 1;
        continue;
      }

      let best: { item: RssItem; score: number } | null = null;
      for (const item of items) {
        const score = scoreItem(item, topics);
        if (score < 2) continue;
        if (await hasNewsBeenSent(customer.id, item.link)) continue;
        if (!best || score > best.score) best = { item, score };
      }

      // Prefer strong RSS match; if weak/none — query SearX for this client's topics.
      if (!best || best.score < 3) {
        const sx = await enrichWithSearx(topics, searxBudget);
        if (sx && !(await hasNewsBeenSent(customer.id, sx.link))) {
          const sxScore = Math.max(scoreItem(sx, topics), 2);
          if (!best || sxScore > best.score) {
            best = { item: sx, score: sxScore };
          }
        }
      }

      if (!best) {
        skipped += 1;
        continue;
      }
      matched += 1;

      const lang =
        customer.preferredLang ||
        detectLangFromText(userTexts.join("\n"), "ru");

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
      });

      const text = sanitizePublicText(
        `${tipPrefix(lang, best.item)}${advice.text}`.slice(0, 3500),
        3500,
      );

      const labels = reminderButtonLabels(lang);
      const keyboard = {
        inline_keyboard: [
          [
            {
              text: labels.like,
              callback_data: reminderCallbackData("like", customer.id),
            },
          ],
          [
            {
              text: labels.stop,
              callback_data: reminderCallbackData("stop", customer.id),
            },
          ],
        ],
      };

      await sendMessageWithKeyboard({
        token,
        chatId: conversation.chatId,
        businessConnectionId: conversation.businessConnectionId,
        text,
        replyMarkup: keyboard,
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
