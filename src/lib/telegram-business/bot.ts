import { Bot, type Context } from "grammy";
import { telegramApiBase } from "@/lib/telegram-business/api";
import { handleBusinessConnection, replyAboutBober } from "@/lib/telegram-business/engine";

export type BusinessBot = Bot;

let botSingleton: BusinessBot | null = null;

export function createBusinessBot(token: string): BusinessBot {
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
    // Skip if this update also carried as business (shouldn't for DM)
    await replyAboutBober({
      token,
      ctx,
      msg,
      mode: "direct",
    });
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
