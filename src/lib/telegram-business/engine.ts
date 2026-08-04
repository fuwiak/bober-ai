import type { Context } from "grammy";
import type { Message } from "@grammyjs/types";
import { generateBusinessReply } from "@/lib/telegram-business/llm";
import {
  type BusinessConnection,
  notifyOwner,
  sendChatAction,
} from "@/lib/telegram-business/api";
import {
  detectBookingIntent,
  ensureBookingConfirmInReply,
  extractPreferredTime,
} from "@/lib/telegram-business/booking";
import { onConversationEvent } from "@/lib/telegram-business/crm-bridge";
import {
  appendMessage,
  createBooking,
  getCustomerById,
  getOrCreateConversation,
  getRecentMessages,
  HISTORY_LIMIT,
  likeReminder,
  optOutReminders,
  upsertCustomer,
} from "@/lib/telegram-business/db/store";
import type { StoredCustomer } from "@/lib/telegram-business/db/schema";
import {
  isFirstContact,
  withLegalDocsGreeting,
} from "@/lib/telegram-business/legal-greeting";
import { detectLangFromText } from "@/lib/telegram-business/reminders/schedule";
import { ensureReminderScheduler } from "@/lib/telegram-business/reminders/tick";

/** In-memory map connection_id → owner user id (survives warm process). */
const connections = new Map<string, { ownerId: number; enabled: boolean }>();

export function rememberConnection(conn: BusinessConnection) {
  connections.set(conn.id, {
    ownerId: conn.user.id,
    enabled: Boolean(conn.is_enabled),
  });
  console.info("[telegram-business] connection", {
    id: conn.id,
    ownerId: conn.user.id,
    enabled: conn.is_enabled,
    can_reply: conn.can_reply,
  });
}

function displayName(msg: Message): string | undefined {
  const u = msg.from;
  if (!u) return undefined;
  return [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username;
}

function whoLabel(msg: Message): string {
  return (
    displayName(msg) ||
    (msg.from?.username
      ? `@${msg.from.username}`
      : `id:${msg.from?.id || "?"}`)
  );
}

async function persistCustomer(
  msg: Message,
  preferredLang?: string | null,
): Promise<StoredCustomer | null> {
  if (!msg.from) return null;
  try {
    return await upsertCustomer({
      telegramUserId: msg.from.id,
      firstName: msg.from.first_name,
      lastName: msg.from.last_name,
      username: msg.from.username,
      preferredLang,
    });
  } catch (err) {
    console.error("[telegram-business] upsertCustomer", err);
    return null;
  }
}

/** Telegram typing expires ~5s — refresh every ~3s (DM + Business). */
const TYPING_REFRESH_MS = 3_000;

/**
 * Free Bot API 🎉 party-popper effect (private 1:1).
 * Default OFF — opt-in via TELEGRAM_CELEBRATION=1.
 * @see https://gist.github.com/wiz0u/2a6d40c8f635687be363d72251a264da
 */
export const CELEBRATION_EFFECT_ID =
  process.env.TELEGRAM_CELEBRATION_EFFECT_ID?.trim() || "5046509860389126442";

/** Default OFF. Set TELEGRAM_CELEBRATION=1 to attach party-popper on bot replies. */
export function celebrationEnabled(): boolean {
  return process.env.TELEGRAM_CELEBRATION === "1";
}

function replyOpts(replyToMessageId: number): {
  reply_parameters: { message_id: number };
  link_preview_options: { is_disabled: true };
  message_effect_id?: string;
} {
  return {
    reply_parameters: { message_id: replyToMessageId },
    link_preview_options: { is_disabled: true },
    ...(celebrationEnabled()
      ? { message_effect_id: CELEBRATION_EFFECT_ID }
      : {}),
  };
}

export type TypingPulseOpts = {
  token?: string;
  chatId?: number | string;
  businessConnectionId?: string;
};

async function pulseTyping(
  ctx: Context,
  opts?: TypingPulseOpts,
): Promise<void> {
  try {
    await ctx.replyWithChatAction("typing");
  } catch {
    /* optional — network blips should not kill the reply path */
  }
  // Belt-and-suspenders for Business: explicit business_connection_id.
  if (opts?.token && opts.chatId != null) {
    await sendChatAction({
      token: opts.token,
      chatId: opts.chatId,
      businessConnectionId: opts.businessConnectionId,
    });
  }
}

/**
 * Keep the “typing…” / hand animation alive until `work` settles.
 * Call ASAP on inbound message (before DB/LLM). Grammy + raw sendChatAction.
 */
export async function withTypingKeepAlive<T>(
  ctx: Context,
  work: () => Promise<T>,
  opts?: TypingPulseOpts,
): Promise<T> {
  await pulseTyping(ctx, opts);
  const timer = setInterval(() => {
    void pulseTyping(ctx, opts);
  }, TYPING_REFRESH_MS);
  try {
    return await work();
  } finally {
    clearInterval(timer);
  }
}

export async function handleBusinessConnection(
  token: string,
  conn: {
    id: string;
    user: { id: number; first_name?: string; last_name?: string; username?: string };
    user_chat_id: number;
    is_enabled: boolean;
    can_reply?: boolean;
    rights?: { can_reply?: boolean };
  },
) {
  const normalized: BusinessConnection = {
    id: conn.id,
    user: conn.user,
    user_chat_id: conn.user_chat_id,
    is_enabled: conn.is_enabled,
    can_reply: conn.can_reply ?? conn.rights?.can_reply,
  };
  rememberConnection(normalized);

  await onConversationEvent({
    type: "business_connection",
    meta: { id: conn.id, enabled: conn.is_enabled },
  });

  if (conn.is_enabled) {
    await notifyOwner({
      token,
      text: `✅ Telegram Business bot подключён (connection ${conn.id}).`,
    }).catch(() => undefined);
  } else {
    await notifyOwner({
      token,
      text: `⛔ Telegram Business bot отключён (connection ${conn.id}).`,
    }).catch(() => undefined);
  }
  return { ok: true, handled: "business_connection" as const };
}

export async function replyAboutBober(params: {
  token: string;
  ctx: Context;
  msg: Message;
  mode: "direct" | "business";
  businessConnectionId?: string;
  /** When true, caller already runs withTypingKeepAlive. */
  skipTyping?: boolean;
}) {
  ensureReminderScheduler();

  const text = (params.msg.text || params.msg.caption || "").trim();
  if (!text) return { ok: true, handled: "non_text" as const };

  const run = async () => {
    const lang = detectLangFromText(text, "ru");
    const customer = await persistCustomer(params.msg, lang);
    const conversation = await getOrCreateConversation({
      chatId: params.msg.chat.id,
      mode: params.mode,
      businessConnectionId: params.businessConnectionId,
      peerUserId: params.msg.from?.id ?? null,
    });

    if (text.startsWith("/start")) {
      const hello = withLegalDocsGreeting(
        [
          "Здравствуйте! Я ассистент Павла (Bober AI Systems).",
          "Напишите, какую задачу хотите закрыть — уточню и предложу следующий шаг.",
        ].join("\n"),
      );

      await appendMessage({
        conversationId: conversation.id,
        role: "user",
        text,
        telegramMessageId: params.msg.message_id,
      });

      await params.ctx.reply(hello, replyOpts(params.msg.message_id));

      const out = await appendMessage({
        conversationId: conversation.id,
        role: "assistant",
        text: hello,
      });

      await onConversationEvent({
        type: "start",
        conversation,
        message: out,
        customer,
      });

      return { ok: true, handled: "start" as const };
    }

    if (text.startsWith("/")) {
      return { ok: true, handled: "command_skip" as const };
    }

    await appendMessage({
      conversationId: conversation.id,
      role: "user",
      text,
      telegramMessageId: params.msg.message_id,
    });

    await onConversationEvent({
      type: "message_in",
      conversation,
      customer,
      meta: { textPreview: text.slice(0, 120) },
    });

    const history = await getRecentMessages(conversation.id, HISTORY_LIMIT);
    const needsLegalDocs = isFirstContact(history);

    let reply;
    try {
      let generated = await generateBusinessReply({
        message: text,
        customerName: displayName(params.msg),
        history,
      });

      const wantsBooking = detectBookingIntent(text, generated.booking);
      if (wantsBooking) {
        generated = {
          ...generated,
          booking: true,
          text: ensureBookingConfirmInReply(generated.text, lang),
        };
      }

      // First contact without /start — attach legal docs once.
      if (needsLegalDocs) {
        generated = {
          ...generated,
          text: withLegalDocsGreeting(generated.text),
        };
      }

      await params.ctx.reply(
        generated.text.slice(0, 4000),
        replyOpts(params.msg.message_id),
      );
      reply = generated;
    } catch (err) {
      console.error("[telegram-business] reply failed", err);
      throw err;
    }

    const out = await appendMessage({
      conversationId: conversation.id,
      role: "assistant",
      text: reply.text,
    });

    await onConversationEvent({
      type: "message_out",
      conversation,
      message: out,
      customer,
    });

    if (reply.booking) {
      const preferredTime = extractPreferredTime(text);
      let bookingId: number | undefined;
      try {
        const booking = await createBooking({
          customerId: customer?.id ?? null,
          conversationId: conversation.id,
          telegramUserId: params.msg.from?.id ?? null,
          rawText: text,
          preferredTime,
        });
        bookingId = booking.id;
      } catch (err) {
        console.error("[telegram-business] createBooking", err);
      }

      const who = whoLabel(params.msg);
      const uname = params.msg.from?.username
        ? `@${params.msg.from.username}`
        : "—";
      await notifyOwner({
        token: params.token,
        text: [
          `📅 Заявка на созвон · Telegram (${params.mode})`,
          `Клиент: ${who}`,
          `Username: ${uname}`,
          `TG id: ${params.msg.from?.id ?? "?"}`,
          preferredTime ? `Время (из текста): ${preferredTime}` : null,
          bookingId ? `booking #${bookingId}` : null,
          `Сообщение: ${text.slice(0, 800)}`,
          `Ответ бота: ${reply.text.slice(0, 400)}`,
          `Чат: https://t.me/${params.msg.from?.username || ""}`.replace(
            /https:\/\/t\.me\/$/,
            `(chat_id=${params.msg.chat.id})`,
          ),
        ]
          .filter(Boolean)
          .join("\n"),
      }).catch((err) =>
        console.error("[telegram-business] booking notify", err),
      );

      await onConversationEvent({
        type: "booking_requested",
        conversation,
        message: out,
        customer,
        meta: {
          bookingId,
          preferredTime,
          source: reply.source,
        },
      });
    }

    if (reply.handoff) {
      const who = whoLabel(params.msg);
      await notifyOwner({
        token: params.token,
        text: [
          `🔔 Handoff · Telegram (${params.mode})`,
          `Клиент: ${who}`,
          `Сообщение: ${text.slice(0, 500)}`,
          `Ответ бота: ${reply.text.slice(0, 500)}`,
          `(source=${reply.source})`,
        ].join("\n"),
      }).catch((err) =>
        console.error("[telegram-business] handoff notify", err),
      );

      await onConversationEvent({
        type: "handoff",
        conversation,
        message: out,
        customer,
        meta: { source: reply.source },
      });
    }

    return {
      ok: true,
      handled:
        params.mode === "business"
          ? ("business_message" as const)
          : ("direct_message" as const),
      source: reply.source,
      handoff: reply.handoff,
      booking: reply.booking,
    };
  };

  if (params.skipTyping) return run();
  return withTypingKeepAlive(params.ctx, run, {
    token: params.token,
    chatId: params.msg.chat.id,
    businessConnectionId: params.businessConnectionId,
  });
}

export async function handleReminderCallback(params: {
  token: string;
  customerId: number;
  action: "like" | "stop";
  fromUserId?: number;
}): Promise<{ toast: string; alert: boolean }> {
  ensureReminderScheduler();

  const existing = await getCustomerById(params.customerId);
  if (!existing) {
    return { toast: "OK", alert: false };
  }
  if (
    params.fromUserId &&
    existing.telegramUserId !== params.fromUserId
  ) {
    return { toast: "OK", alert: false };
  }

  if (params.action === "like") {
    const cust = await likeReminder(params.customerId);
    const lang = cust?.preferredLang || existing.preferredLang || "ru";
    const toast =
      lang === "pl"
        ? "Dzięki — zapisane."
        : lang === "en"
          ? "Thanks — saved."
          : "Спасибо — учли.";
    console.info("[telegram-reminders] like", { customerId: params.customerId });
    return { toast, alert: false };
  }

  const cust = await optOutReminders(params.customerId);
  const lang = cust?.preferredLang || existing.preferredLang || "ru";
  const toast =
    lang === "pl"
      ? "Powiadomienia wyłączone."
      : lang === "en"
        ? "Reminders disabled."
        : "Уведомления отключены.";
  console.info("[telegram-reminders] opt-out", { customerId: params.customerId });
  return { toast, alert: false };
}
