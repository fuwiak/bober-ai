import {
  appendMessage,
  getRecentMessages,
  HISTORY_LIMIT,
  listDueReminders,
  markReminderSent,
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
import { runNewsAlertTick } from "@/lib/telegram-business/news-alerts";

export type TickResult = {
  ok: boolean;
  checked: number;
  sent: number;
  skipped: number;
  errors: string[];
};

/**
 * Process due reminders (opted-in customers with next_reminder_at <= now).
 * Safe to call from cron / in-process interval / GitHub Action.
 */
export async function runReminderTick(limit = 20): Promise<TickResult> {
  const token = businessBotToken();
  if (!token) {
    return {
      ok: false,
      checked: 0,
      sent: 0,
      skipped: 0,
      errors: ["TELEGRAM_BUSINESS_BOT_TOKEN missing"],
    };
  }

  const due = await listDueReminders(limit);
  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const { customer, conversation } of due) {
    if (!customer.remindersEnabled) {
      skipped += 1;
      continue;
    }

    try {
      const history = await getRecentMessages(conversation.id, HISTORY_LIMIT);
      const userBlob = history
        .filter((m) => m.role === "user")
        .map((m) => m.text)
        .join("\n");
      const lang =
        customer.preferredLang ||
        detectLangFromText(userBlob, "ru");

      const advice = await generateReminderAdvice({
        history,
        customerName:
          [customer.firstName, customer.lastName].filter(Boolean).join(" ") ||
          undefined,
        lang,
      });

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
        text: advice.text,
        replyMarkup: keyboard,
      });

      await appendMessage({
        conversationId: conversation.id,
        role: "assistant",
        text: `[reminder] ${advice.text}`,
      });
      await markReminderSent(customer.id);
      sent += 1;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[telegram-reminders] send failed", {
        customerId: customer.id,
        error: msg,
      });
      errors.push(`customer=${customer.id}: ${msg.slice(0, 160)}`);
      try {
        await markReminderSent(customer.id);
      } catch {
        /* ignore */
      }
      skipped += 1;
    }
  }

  return {
    ok: errors.length === 0,
    checked: due.length,
    sent,
    skipped,
    errors,
  };
}

let intervalHandle: ReturnType<typeof setInterval> | null = null;

/** In-process fallback when Astro node stays warm on Railway (~15 min). */
export function ensureReminderScheduler(): void {
  if (intervalHandle) return;
  if (process.env.TELEGRAM_REMINDERS_DISABLED === "1") return;

  const ms = Number(process.env.TELEGRAM_REMINDER_TICK_MS || String(15 * 60_000));
  const interval = Number.isFinite(ms) && ms >= 60_000 ? ms : 15 * 60_000;

  const tick = () => {
    void runReminderTick()
      .then((r) => {
        if (r.checked > 0 || r.errors.length) {
          console.info("[telegram-reminders] tick", r);
        }
      })
      .catch((err) => {
        console.error("[telegram-reminders] tick failed", err);
      });

    void runNewsAlertTick()
      .then((r) => {
        if (r.sent > 0 || r.matched > 0 || r.errors.length) {
          console.info("[telegram-news] tick", r);
        }
      })
      .catch((err) => {
        console.error("[telegram-news] tick failed", err);
      });
  };

  intervalHandle = setInterval(tick, interval);
  setTimeout(tick, 45_000);
  console.info("[telegram-reminders] in-process scheduler armed", {
    intervalMs: interval,
    tz: "Europe/Moscow",
    newsAlerts: process.env.TELEGRAM_NEWS_ALERTS_DISABLED !== "1",
  });
}
