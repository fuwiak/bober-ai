import type { Context } from "grammy";
import type { Message } from "@grammyjs/types";
import { generateBusinessReply } from "@/lib/telegram-business/llm";
import {
  type BusinessConnection,
  notifyOwner,
} from "@/lib/telegram-business/api";
import { onConversationEvent } from "@/lib/telegram-business/crm-bridge";
import {
  appendMessage,
  getOrCreateConversation,
  getRecentMessages,
  HISTORY_LIMIT,
  isNearDuplicate,
  upsertCustomer,
} from "@/lib/telegram-business/db/store";
import type { StoredCustomer } from "@/lib/telegram-business/db/schema";

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

async function persistCustomer(msg: Message): Promise<StoredCustomer | null> {
  if (!msg.from) return null;
  try {
    return await upsertCustomer({
      telegramUserId: msg.from.id,
      firstName: msg.from.first_name,
      lastName: msg.from.last_name,
      username: msg.from.username,
    });
  } catch (err) {
    console.error("[telegram-business] upsertCustomer", err);
    return null;
  }
}

/** Telegram typing expires ~5s — refresh every 4s (DM + Business via ctx). */
const TYPING_REFRESH_MS = 4_000;

async function sendTyping(ctx: Context): Promise<void> {
  try {
    await ctx.replyWithChatAction("typing");
  } catch {
    /* optional — network blips should not kill the reply path */
  }
}

/**
 * Keep the “typing…” / hand animation alive until `work` settles.
 * Grammy attaches business_connection_id when present on the update.
 */
async function withTypingKeepAlive<T>(
  ctx: Context,
  work: () => Promise<T>,
): Promise<T> {
  await sendTyping(ctx);
  const timer = setInterval(() => {
    void sendTyping(ctx);
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
}) {
  const text = (params.msg.text || params.msg.caption || "").trim();
  if (!text) return { ok: true, handled: "non_text" as const };

  const customer = await persistCustomer(params.msg);
  const conversation = await getOrCreateConversation({
    chatId: params.msg.chat.id,
    mode: params.mode,
    businessConnectionId: params.businessConnectionId,
    peerUserId: params.msg.from?.id ?? null,
  });

  if (text.startsWith("/start")) {
    const hello = [
      "Здравствуйте! Я ассистент Bober AI Systems.",
      "Могу рассказать про услуги: документы→1С, Битрикс24, КП, речевая аналитика, Meeting-to-CRM.",
      "Напишите задачу одной фразой — или вопрос про цены / сроки.",
      "Сайт: https://www.bober-systems.ru/",
    ].join("\n");

    await appendMessage({
      conversationId: conversation.id,
      role: "user",
      text,
      telegramMessageId: params.msg.message_id,
    });

    await withTypingKeepAlive(params.ctx, async () => {
      await params.ctx.reply(hello, {
        reply_parameters: { message_id: params.msg.message_id },
        link_preview_options: { is_disabled: true },
      });
    });

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

  // History already includes the user message we just saved — pass prior+current
  const history = await getRecentMessages(conversation.id, HISTORY_LIMIT);
  const priorAssistant = [...history]
    .reverse()
    .find((m) => m.role === "assistant")?.text;

  let reply;
  try {
    reply = await withTypingKeepAlive(params.ctx, async () => {
      let generated = await generateBusinessReply({
        message: text,
        customerName: displayName(params.msg),
        history,
      });

      if (isNearDuplicate(generated.text, priorAssistant)) {
        const shorter =
          generated.text.length > 280
            ? `${generated.text.slice(0, 260).trim()}…\n\nУточните, пожалуйста, что важнее сейчас — или предложу созвон.`
            : `${generated.text}\n\nЕсли нужно — уточню другой аспект или предложу короткий созвон.`;
        generated = { ...generated, text: shorter };
      }

      await params.ctx.reply(generated.text.slice(0, 4000), {
        reply_parameters: { message_id: params.msg.message_id },
        link_preview_options: { is_disabled: true },
      });
      return generated;
    });
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

  if (reply.handoff) {
    const who =
      displayName(params.msg) ||
      (params.msg.from?.username
        ? `@${params.msg.from.username}`
        : `id:${params.msg.from?.id || "?"}`);
    await notifyOwner({
      token: params.token,
      text: [
        `🔔 Handoff · Telegram (${params.mode})`,
        `Клиент: ${who}`,
        `Сообщение: ${text.slice(0, 500)}`,
        `Ответ бота: ${reply.text.slice(0, 500)}`,
        `(source=${reply.source})`,
      ].join("\n"),
    }).catch((err) => console.error("[telegram-business] handoff notify", err));

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
  };
}
