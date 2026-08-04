export const prerender = false;

import type { APIRoute } from "astro";
import { webhookSecret } from "@/lib/telegram-business/api";
import { runReminderTick } from "@/lib/telegram-business/reminders/tick";
import { runNewsAlertTick } from "@/lib/telegram-business/news-alerts";
import { dbBackendLabel } from "@/lib/telegram-business/db/client";

/**
 * Reminder + news-alert cron endpoint.
 *
 * How it runs:
 * 1) In-process setInterval (~15 min) when Astro node stays warm on Railway
 *    (armed on first webhook / bot create) — reminders + RSS news tips.
 * 2) External/GitHub cron POST here every hour as backup.
 * 3) Manual: curl -X POST -H "Authorization: Bearer $SECRET" .../tick
 *
 * Reminders: every 3 days, random 20:00–22:00 Europe/Moscow.
 * News tips: match fresh RSS to thread topics (dedup + daily cap).
 * Auth: TELEGRAM_REMINDER_CRON_SECRET or TELEGRAM_BUSINESS_WEBHOOK_SECRET.
 */
function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function authorized(request: Request): boolean {
  const cronSecret =
    process.env.TELEGRAM_REMINDER_CRON_SECRET?.trim() ||
    webhookSecret() ||
    "";
  if (!cronSecret) return false;

  const auth = request.headers.get("authorization") || "";
  const bearer = auth.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  const header = request.headers.get("x-cron-secret")?.trim();
  const url = new URL(request.url);
  const q = url.searchParams.get("secret")?.trim();
  return [bearer, header, q].some((v) => v && v === cronSecret);
}

export const GET: APIRoute = async ({ request }) => {
  if (!authorized(request)) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }
  return json({
    ok: true,
    service: "telegram-reminders",
    db: dbBackendLabel(),
    tz: "Europe/Moscow",
    cadence: "every 3 days, random 20:00–22:00 MSK",
    hint: "POST to run a tick",
  });
};

export const POST: APIRoute = async ({ request }) => {
  if (!authorized(request)) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }

  const limitRaw = Number(
    new URL(request.url).searchParams.get("limit") || "20",
  );
  const limit =
    Number.isFinite(limitRaw) && limitRaw > 0
      ? Math.min(50, Math.floor(limitRaw))
      : 20;

  try {
    const result = await runReminderTick(limit);
    const news = await runNewsAlertTick(Math.min(15, limit));
    return json({
      ...result,
      news,
      db: dbBackendLabel(),
      tz: "Europe/Moscow",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[telegram-reminders] tick route", message);
    return json({ ok: false, error: message }, 500);
  }
};
