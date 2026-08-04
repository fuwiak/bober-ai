/** Bot API root. Override when host cannot reach api.telegram.org (e.g. Selectel RU). */
export function telegramApiBase(): string {
  return (
    process.env.TELEGRAM_API_BASE?.trim().replace(/\/$/, "") ||
    "https://api.telegram.org"
  );
}

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
  const url = `${telegramApiBase()}/bot${token}/${method}`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    const cause =
      err instanceof Error
        ? (err as Error & { cause?: unknown }).cause
        : undefined;
    const detail =
      cause instanceof Error
        ? cause.message
        : cause
          ? String(cause)
          : err instanceof Error
            ? err.message
            : String(err);
    throw new Error(
      `Telegram ${method} unreachable (${telegramApiBase()}): ${detail}. ` +
        `If host blocks api.telegram.org, set webhook to Railway EU or TELEGRAM_API_BASE proxy.`,
    );
  }
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

export async function sendDirectMessage(params: {
  token: string;
  chatId: number | string;
  text: string;
  replyToMessageId?: number;
}) {
  return callTelegram(params.token, "sendMessage", {
    chat_id: params.chatId,
    text: params.text.slice(0, 4000),
    disable_web_page_preview: true,
    ...(params.replyToMessageId
      ? { reply_parameters: { message_id: params.replyToMessageId } }
      : {}),
  });
}

export type InlineKeyboard = {
  inline_keyboard: { text: string; callback_data: string }[][];
};

/** DM or Business message with optional inline keyboard. */
export async function sendMessageWithKeyboard(params: {
  token: string;
  chatId: number | string;
  text: string;
  businessConnectionId?: string | null;
  replyMarkup?: InlineKeyboard;
}) {
  return callTelegram(params.token, "sendMessage", {
    chat_id: params.chatId,
    text: params.text.slice(0, 4000),
    disable_web_page_preview: true,
    ...(params.businessConnectionId
      ? { business_connection_id: params.businessConnectionId }
      : {}),
    ...(params.replyMarkup ? { reply_markup: params.replyMarkup } : {}),
  });
}

export async function answerCallbackQuery(params: {
  token: string;
  callbackQueryId: string;
  text?: string;
  showAlert?: boolean;
}) {
  return callTelegram(params.token, "answerCallbackQuery", {
    callback_query_id: params.callbackQueryId,
    ...(params.text ? { text: params.text.slice(0, 200) } : {}),
    ...(params.showAlert ? { show_alert: true } : {}),
  });
}

export async function sendDirectChatAction(params: {
  token: string;
  chatId: number | string;
}) {
  try {
    await callTelegram(params.token, "sendChatAction", {
      chat_id: params.chatId,
      action: "typing",
    });
  } catch {
    /* optional */
  }
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
  const chatId =
    process.env.CONTACT_TELEGRAM_CHAT_ID?.trim() ||
    process.env.TELEGRAM_OWNER_CHAT_ID?.trim();
  if (!chatId) {
    console.warn(
      "[telegram-business] notifyOwner skipped: set CONTACT_TELEGRAM_CHAT_ID or TELEGRAM_OWNER_CHAT_ID",
    );
    return;
  }
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
