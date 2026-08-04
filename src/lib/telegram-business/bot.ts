import { Bot, type Context } from "grammy";
import {
  answerCallbackQuery,
  telegramApiBase,
} from "@/lib/telegram-business/api";
import {
  celebrateInboundMessage,
  handleBusinessConnection,
  handleReminderCallback,
  replyAboutBober,
  withTypingKeepAlive,
} from "@/lib/telegram-business/engine";
import { parseReminderCallback } from "@/lib/telegram-business/reminders/schedule";
import { ensureReminderScheduler } from "@/lib/telegram-business/reminders/tick";

export type BusinessBot = Bot;

let botSingleton: BusinessBot | null = null;
let botInitPromise: Promise<BusinessBot> | null = null;

export function createBusinessBot(token: string): BusinessBot {
  ensureReminderScheduler();

  const bot = new Bot(token, {
    client: {
      apiRoot: telegramApiBase(),
    },
  });

  bot.on("business_connection", async (ctx) => {
    await handleBusinessConnection(token, ctx.businessConnection);
  });

  bot.on(["business_message", "edited_business_message"], async (ctx) => {
    const msg = ctx.businessMessage ?? ctx.editedBusinessMessage;
    if (!msg) return;
    const businessConnectionId = msg.business_connection_id;
    if (!businessConnectionId) return;
    const isEdit = Boolean(ctx.editedBusinessMessage);

    // Typing keep-alive from first byte — before getBusinessConnection / DB / LLM.
    await withTypingKeepAlive(
      ctx,
      async () => {
        try {
          const conn = await ctx.getBusinessConnection();
          if (ctx.from?.id === conn.user.id) {
            return; // owner message — skip
          }
        } catch (err) {
          console.error("[telegram-business] getBusinessConnection", err);
        }

        // Celebration only on new inbound (not edits) — 🎉 reaction, no text spam.
        if (!isEdit) {
          await celebrateInboundMessage(ctx);
        }

        await replyAboutBober({
          token,
          ctx,
          msg,
          mode: "business",
          businessConnectionId,
          skipTyping: true,
        });
      },
      { token, chatId: msg.chat.id, businessConnectionId },
    );
  });

  bot.on("message", async (ctx) => {
    const msg = ctx.message;
    if (!msg || msg.chat.type !== "private") return;
    // Typing keep-alive ASAP — before replyAboutBober DB/LLM
    await withTypingKeepAlive(
      ctx,
      async () => {
        await celebrateInboundMessage(ctx);
        await replyAboutBober({
          token,
          ctx,
          msg,
          mode: "direct",
          skipTyping: true,
        });
      },
      { token, chatId: msg.chat.id },
    );
  });

  bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;
    const parsed = parseReminderCallback(data);
    if (!parsed) {
      await ctx.answerCallbackQuery().catch(() => undefined);
      return;
    }

    const result = await handleReminderCallback({
      token,
      customerId: parsed.customerId,
      action: parsed.action,
      fromUserId: ctx.from?.id,
    });

    try {
      await answerCallbackQuery({
        token,
        callbackQueryId: ctx.callbackQuery.id,
        text: result.toast,
        showAlert: result.alert,
      });
    } catch (err) {
      console.error("[telegram-business] answerCallbackQuery", err);
    }
  });

  bot.catch((err) => {
    console.error("[telegram-business] bot error", err.error ?? err);
  });

  return bot;
}

/** Grammy requires init() before handleUpdate in webhook mode. */
export async function getBusinessBot(token: string): Promise<BusinessBot> {
  if (botSingleton && botInitPromise) {
    return botInitPromise;
  }
  botSingleton = createBusinessBot(token);
  botInitPromise = botSingleton
    .init()
    .then(() => botSingleton!)
    .catch((err) => {
      botSingleton = null;
      botInitPromise = null;
      throw err;
    });
  return botInitPromise;
}

export type ReplyCtx = Context;
