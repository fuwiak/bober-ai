import { generateBusinessReply } from "@/lib/telegram-business/llm";
import {
  type BusinessConnection,
  type TgMessage,
  type TgUpdate,
  getBusinessConnection,
  notifyOwner,
  sendBusinessMessage,
  sendChatAction,
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

  const msg = update.business_message || update.edited_business_message;
  if (!msg) {
    if (update.message?.text?.startsWith("/start")) {
      return { ok: true, handled: "bot_start_ignored" };
    }
    return { ok: true, handled: "ignored" };
  }

  const businessConnectionId = msg.business_connection_id;
  if (!businessConnectionId) {
    return { ok: true, handled: "no_business_connection_id" };
  }

  const text = (msg.text || msg.caption || "").trim();
  if (!text) {
    return { ok: true, handled: "non_text" };
  }

  const ownerId = await resolveOwnerId(token, businessConnectionId);
  if (ownerId != null && msg.from?.id === ownerId) {
    return { ok: true, handled: "owner_message_skip" };
  }

  if (text.startsWith("/")) {
    return { ok: true, handled: "command_skip" };
  }

  await sendChatAction({
    token,
    chatId: msg.chat.id,
    businessConnectionId,
  });

  const reply = await generateBusinessReply({
    message: text,
    customerName: displayName(msg),
  });

  await sendBusinessMessage({
    token,
    chatId: msg.chat.id,
    businessConnectionId,
    text: reply.text,
    replyToMessageId: msg.message_id,
  });

  if (reply.handoff) {
    const who =
      displayName(msg) ||
      (msg.from?.username ? `@${msg.from.username}` : `id:${msg.from?.id || "?"}`);
    await notifyOwner({
      token,
      text: [
        "🔔 Handoff · Telegram Business",
        `Клиент: ${who}`,
        `Сообщение: ${text.slice(0, 500)}`,
        `Ответ бота: ${reply.text.slice(0, 500)}`,
        `(source=${reply.source})`,
      ].join("\n"),
    }).catch((err) => console.error("[telegram-business] handoff notify", err));
  }

  return {
    ok: true,
    handled: "business_message",
    source: reply.source,
    handoff: reply.handoff,
  };
}
