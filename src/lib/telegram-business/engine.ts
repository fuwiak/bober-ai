import { generateBusinessReply } from "@/lib/telegram-business/llm";
import {
  type BusinessConnection,
  type TgMessage,
  type TgUpdate,
  getBusinessConnection,
  notifyOwner,
  sendBusinessMessage,
  sendChatAction,
  sendDirectChatAction,
  sendDirectMessage,
} from "@/lib/telegram-business/api";

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

async function resolveOwnerId(
  token: string,
  businessConnectionId: string,
): Promise<number | null> {
  const cached = connections.get(businessConnectionId);
  if (cached) return cached.ownerId;
  try {
    const conn = await getBusinessConnection(token, businessConnectionId);
    rememberConnection(conn);
    return conn.user.id;
  } catch (err) {
    console.error("[telegram-business] getBusinessConnection", err);
    return null;
  }
}

function displayName(msg: TgMessage): string | undefined {
  const u = msg.from;
  if (!u) return undefined;
  return [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username;
}

async function replyAboutBober(params: {
  token: string;
  msg: TgMessage;
  mode: "direct" | "business";
  businessConnectionId?: string;
}) {
  const text = (params.msg.text || params.msg.caption || "").trim();
  if (!text) return { ok: true, handled: "non_text" as const };

  if (text.startsWith("/start")) {
    const hello = [
      "Здравствуйте! Я ассистент Bober AI Systems.",
      "Могу рассказать про услуги: документы→1С, Битрикс24, КП, речевая аналитика, Meeting-to-CRM.",
      "Напишите задачу одной фразой — или вопрос про цены / сроки.",
      "Сайт: https://www.bober-systems.ru/",
    ].join("\n");
    if (params.mode === "business" && params.businessConnectionId) {
      await sendBusinessMessage({
        token: params.token,
        chatId: params.msg.chat.id,
        businessConnectionId: params.businessConnectionId,
        text: hello,
        replyToMessageId: params.msg.message_id,
      });
    } else {
      await sendDirectMessage({
        token: params.token,
        chatId: params.msg.chat.id,
        text: hello,
        replyToMessageId: params.msg.message_id,
      });
    }
    return { ok: true, handled: "start" as const };
  }

  if (text.startsWith("/")) {
    return { ok: true, handled: "command_skip" as const };
  }

  if (params.mode === "business" && params.businessConnectionId) {
    await sendChatAction({
      token: params.token,
      chatId: params.msg.chat.id,
      businessConnectionId: params.businessConnectionId,
    });
  } else {
    await sendDirectChatAction({
      token: params.token,
      chatId: params.msg.chat.id,
    });
  }

  const reply = await generateBusinessReply({
    message: text,
    customerName: displayName(params.msg),
  });

  if (params.mode === "business" && params.businessConnectionId) {
    await sendBusinessMessage({
      token: params.token,
      chatId: params.msg.chat.id,
      businessConnectionId: params.businessConnectionId,
      text: reply.text,
      replyToMessageId: params.msg.message_id,
    });
  } else {
    await sendDirectMessage({
      token: params.token,
      chatId: params.msg.chat.id,
      text: reply.text,
      replyToMessageId: params.msg.message_id,
    });
  }

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
  }

  return {
    ok: true,
    handled: params.mode === "business" ? ("business_message" as const) : ("direct_message" as const),
    source: reply.source,
    handoff: reply.handoff,
  };
}

export async function handleUpdate(token: string, update: TgUpdate) {
  if (update.business_connection) {
    rememberConnection(update.business_connection);
    if (update.business_connection.is_enabled) {
      await notifyOwner({
        token,
        text: `✅ Telegram Business bot подключён (connection ${update.business_connection.id}).`,
      }).catch(() => undefined);
    } else {
      await notifyOwner({
        token,
        text: `⛔ Telegram Business bot отключён (connection ${update.business_connection.id}).`,
      }).catch(() => undefined);
    }
    return { ok: true, handled: "business_connection" };
  }

  const businessMsg = update.business_message || update.edited_business_message;
  if (businessMsg) {
    const businessConnectionId = businessMsg.business_connection_id;
    if (!businessConnectionId) {
      return { ok: true, handled: "no_business_connection_id" };
    }

    const ownerId = await resolveOwnerId(token, businessConnectionId);
    if (ownerId != null && businessMsg.from?.id === ownerId) {
      return { ok: true, handled: "owner_message_skip" };
    }

    return replyAboutBober({
      token,
      msg: businessMsg,
      mode: "business",
      businessConnectionId,
    });
  }

  // Direct DM to @BoberSystemsAssistant_bot (testing / public bot chat)
  const direct = update.message;
  if (direct?.chat?.type === "private") {
    return replyAboutBober({
      token,
      msg: direct,
      mode: "direct",
    });
  }

  return { ok: true, handled: "ignored" };
}
