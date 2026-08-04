export const prerender = false;

import type { APIRoute } from "astro";
import { businessBotToken, webhookSecret, type TgUpdate } from "@/lib/telegram-business/api";
import { handleUpdate } from "@/lib/telegram-business/engine";

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const GET: APIRoute = async () => {
  const token = businessBotToken();
  return json({
    ok: true,
    service: "telegram-business",
    configured: Boolean(token),
    llm: Boolean(process.env.OPENROUTER_API_KEY?.trim()),
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

  let update: TgUpdate;
  try {
    update = (await request.json()) as TgUpdate;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  try {
    const result = await handleUpdate(token, update);
    return json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[telegram-business] webhook", message);
    // Always 200 to Telegram after accept — avoid retry storms on logic errors
    return json({ ok: false, error: message }, 200);
  }
};
