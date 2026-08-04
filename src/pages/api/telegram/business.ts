export const prerender = false;

import type { APIRoute } from "astro";
import { businessBotToken, webhookSecret } from "@/lib/telegram-business/api";
import { getBusinessBot } from "@/lib/telegram-business/bot";
import { dbHealth } from "@/lib/telegram-business/db/store";
import { dbBackendLabel } from "@/lib/telegram-business/db/client";
import { ensureReminderScheduler } from "@/lib/telegram-business/reminders/tick";

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const GET: APIRoute = async () => {
  ensureReminderScheduler();
  const token = businessBotToken();
  const db = await dbHealth();
  return json({
    ok: true,
    service: "telegram-business",
    framework: "grammy",
    configured: Boolean(token),
    llm: Boolean(process.env.OPENROUTER_API_KEY?.trim()),
    db: db.backend,
    dbOk: db.ok,
    reminders: "in-process + /api/telegram/reminders/tick",
    apiBase: process.env.TELEGRAM_API_BASE?.trim() || "https://api.telegram.org",
    hint: "POST Telegram updates here. Setup: npm run telegram:business:setup",
  });
};

export const POST: APIRoute = async ({ request }) => {
  const token = businessBotToken();
  if (!token) {
    return json({ ok: false, error: "TELEGRAM_BUSINESS_BOT_TOKEN not set" }, 503);
  }

  const secret = webhookSecret();
  if (secret) {
    const header = request.headers.get("x-telegram-bot-api-secret-token");
    if (header !== secret) {
      return json({ ok: false, error: "unauthorized" }, 401);
    }
  }

  let update: unknown;
  try {
    update = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  try {
    const bot = getBusinessBot(token);
    // Manual feed keeps Astro adapter thin; Grammy handles Business + DM.
    // Await full handler (LLM up to ~45s) — Railway webhook timeout is generous.
    await bot.handleUpdate(update as Parameters<typeof bot.handleUpdate>[0]);
    return json({ ok: true, framework: "grammy", db: dbBackendLabel() });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[telegram-business] webhook", message);
    // Always 200 to Telegram after accept — avoid retry storms on logic errors
    return json({ ok: false, error: message }, 200);
  }
};
