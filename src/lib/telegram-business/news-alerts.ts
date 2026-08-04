/**
 * Instant news/tips from RSS (and optional SearXNG) matched to client thread topics.
 * Dedup per customer+URL; rate-limit per day; same Like/Stop buttons as reminders.
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
  "для",
  "есть",
  "нужно",
  "можно",
  "просто",
  "очень",
  "также",
]);

function maxAlertsPerDay(): number {
  const n = Number(process.env.TELEGRAM_NEWS_ALERTS_PER_DAY || "2");
  return Number.isFinite(n) && n > 0 ? Math.min(5, Math.floor(n)) : 2;
}

function extractTopics(texts: string[]): string[] {
  const blob = texts.join("\n").toLowerCase();
  const tokens = blob
    .split(/[^\p{L}\p{N}+]+/u)
    .filter((t) => t.length >= 4 && !TOPIC_STOP.has(t));
  const freq = new Map<string, number>();
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
  // Boost known product domains
  const boosts = [
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
  ];
  for (const b of boosts) {
    if (blob.includes(b)) freq.set(b, (freq.get(b) || 0) + 5);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([t]) => t);
}

function scoreItem(item: RssItem, topics: string[]): number {
  if (!topics.length) return 0;
  const hay = `${item.title} ${item.summary}`.toLowerCase();
  let score = 0;
  for (const t of topics) {
    if (hay.includes(t)) score += t.length >= 6 ? 2 : 1;
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

async function enrichWithSearx(
  topics: string[],
): Promise<RssItem | null> {
  if (process.env.TELEGRAM_NEWS_SEARX !== "1") return null;
  if (!topics.length) return null;
  const q = `${topics.slice(0, 4).join(" ")} бизнес Россия`;
  const { hits } = await searchSearxng(q, { limit: 3, language: "ru-RU" });
  const hit = hits[0];
  if (!hit) return null;
  return {
    id: hit.url,
    title: hit.title,
    link: hit.url,
    summary: hit.content,
    publishedAt: new Date(),
    source: "searxng",
  };
}

/**
 * Match fresh RSS (optional SearX) to reminder-eligible clients and send tips.
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
      const topics = extractTopics(userTexts);
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

      if (!best) {
        const sx = await enrichWithSearx(topics);
        if (sx && !(await hasNewsBeenSent(customer.id, sx.link))) {
          best = { item: sx, score: 2 };
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

      const advice = await generateReminderAdvice({
        history,
        customerName:
          [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
          undefined,
        lang,
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
