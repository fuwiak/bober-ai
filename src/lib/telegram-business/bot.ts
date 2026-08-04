import { Bot, type Context } from "grammy";
import {
  answerCallbackQuery,
  telegramApiBase,
} from "@/lib/telegram-business/api";
import {
  handleBusinessConnection,
  handleReminderCallback,
  replyAboutBober,
} from "@/lib/telegram-business/engine";
import { parseReminderCallback } from "@/lib/telegram-business/reminders/schedule";
import { ensureReminderScheduler } from "@/lib/telegram-business/reminders/tick";

export type BusinessBot = Bot;

let botSingleton: BusinessBot | null = null;

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

    try {
      const conn = await ctx.getBusinessConnection();
      if (ctx.from?.id === conn.user.id) {
        return; // owner message — skip
      }
    } catch (err) {
      console.error("[telegram-business] getBusinessConnection", err);
    }

    await replyAboutBober({
      token,
      ctx,
      msg,
      mode: "business",
      businessConnectionId,
    });
  });

  bot.on("message", async (ctx) => {
    const msg = ctx.message;
    if (!msg || msg.chat.type !== "private") return;
    await replyAboutBober({
      token,
      ctx,
      msg,
      mode: "direct",
    });
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

export function getBusinessBot(token: string): BusinessBot {
  if (!botSingleton) {
    botSingleton = createBusinessBot(token);
  }
  return botSingleton;
}

export type ReplyCtx = Context;
