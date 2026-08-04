const API = "https://api.telegram.org";

export function businessBotToken(): string | null {
  return (
    process.env.TELEGRAM_BUSINESS_BOT_TOKEN?.trim() ||
    process.env.CONTACT_TELEGRAM_BOT_TOKEN?.trim() ||
    process.env.TELEGRAM_BOT_KEY?.trim() ||
    null
  );
}

export function webhookSecret(): string | null {
  return process.env.TELEGRAM_BUSINESS_WEBHOOK_SECRET?.trim() || null;
}

async function callTelegram(token: string, method: string, body: Record<string, unknown>) {
  const res = await fetch(`${API}/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    description?: string;
    result?: unknown;
  };
  if (!res.ok || json.ok === false) {
    throw new Error(json.description || `Telegram ${method} HTTP ${res.status}`);
  }
  return json.result;
}

export async function sendBusinessMessage(params: {
  token: string;
  chatId: number | string;
  businessConnectionId: string;
  text: string;
  replyToMessageId?: number;
}) {
  return callTelegram(params.token, "sendMessage", {
    chat_id: params.chatId,
    business_connection_id: params.businessConnectionId,
    text: params.text.slice(0, 4000),
    disable_web_page_preview: true,
    ...(params.replyToMessageId
      ? { reply_parameters: { message_id: params.replyToMessageId } }
      : {}),
  });
}

export async function notifyOwner(params: {
  token: string;
  text: string;
}) {
  const chatId = process.env.CONTACT_TELEGRAM_CHAT_ID?.trim();
  if (!chatId) return;
  return callTelegram(params.token, "sendMessage", {
    chat_id: chatId,
    text: params.text.slice(0, 3900),
    disable_web_page_preview: true,
  });
}

export async function getBusinessConnection(token: string, businessConnectionId: string) {
  return callTelegram(token, "getBusinessConnection", {
    business_connection_id: businessConnectionId,
  }) as Promise<BusinessConnection>;
}

export async function sendChatAction(params: {
  token: string;
  chatId: number | string;
  businessConnectionId: string;
}) {
  try {
    await callTelegram(params.token, "sendChatAction", {
      chat_id: params.chatId,
      business_connection_id: params.businessConnectionId,
      action: "typing",
    });
  } catch {
    /* optional */
  }
}

export type TgUser = {
  id: number;
  is_bot?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
};

export type TgMessage = {
  message_id: number;
  date: number;
  chat: { id: number; type: string };
  from?: TgUser;
  text?: string;
  caption?: string;
  business_connection_id?: string;
};

export type BusinessConnection = {
  id: string;
  user: TgUser;
  user_chat_id: number;
  is_enabled: boolean;
  can_reply?: boolean;
};

export type TgUpdate = {
  update_id: number;
  business_connection?: BusinessConnection;
  business_message?: TgMessage;
  edited_business_message?: TgMessage;
  message?: TgMessage;
};
