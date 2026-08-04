#!/usr/bin/env node

/**
 * Telegram Business chatbot setup for Bober AI Systems.
 *
 * 1) Create bot via @BotFather → copy token
 * 2) Put TELEGRAM_BUSINESS_BOT_TOKEN (+ optional OPENROUTER_API_KEY) in .env / VDS
 * 3) Deploy site so /api/telegram/business is live
 * 4) Run: npm run telegram:business:setup
 * 5) In Telegram app: Settings → Telegram Business → Chatbots → add @YourBot
 *    Access: new private chats only (recommended)
 *    Rights: read messages + reply
 *
 *   npm run telegram:business:setup
 *   npm run telegram:business:setup -- --delete-webhook
 *   npm run telegram:business:setup -- --url=https://www.bober-systems.ru/api/telegram/business
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";

function loadEnvFile() {
  const path = resolve(process.cwd(), ".env");
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    if (!key || process.env[key] != null) continue;
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvFile();

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--") && !a.includes("=")));
function readFlag(name, fallback) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  return fallback;
}

function fail(msg) {
  console.error(`\nОшибка: ${msg}`);
  process.exit(1);
}

function token() {
  return (
    process.env.TELEGRAM_BUSINESS_BOT_TOKEN?.trim() ||
    process.env.CONTACT_TELEGRAM_BOT_TOKEN?.trim() ||
    process.env.TELEGRAM_BOT_KEY?.trim() ||
    ""
  );
}

async function api(tok, method, body) {
  const res = await fetch(`https://api.telegram.org/bot${tok}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!json.ok) fail(`${method}: ${json.description || res.status}`);
  return json.result;
}

async function main() {
  const tok = token();
  if (!tok) {
    fail(
      "Нет TELEGRAM_BUSINESS_BOT_TOKEN. Создай бота у @BotFather и добавь токен в .env / на VDS.",
    );
  }

  const me = await api(tok, "getMe");
  console.log(`Bot: @${me.username} (${me.first_name}) id=${me.id}`);

  if (flags.has("--delete-webhook")) {
    await api(tok, "deleteWebhook", { drop_pending_updates: true });
    console.log("Webhook удалён.");
    return;
  }

  const site =
    readFlag("--url", "").replace(/\/$/, "") ||
    `${(process.env.PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.bober-systems.ru").replace(/\/$/, "")}/api/telegram/business`;

  let secret = process.env.TELEGRAM_BUSINESS_WEBHOOK_SECRET?.trim();
  if (!secret) {
    secret = randomBytes(24).toString("hex");
    console.log(`\nСгенерирован TELEGRAM_BUSINESS_WEBHOOK_SECRET (сохрани на VDS):\n  ${secret}\n`);
  }

  await api(tok, "setWebhook", {
    url: site,
    secret_token: secret,
    allowed_updates: [
      "business_connection",
      "business_message",
      "edited_business_message",
      "deleted_business_messages",
    ],
    drop_pending_updates: true,
  });

  const info = await api(tok, "getWebhookInfo");
  console.log("\nWebhook:");
  console.log(`  url: ${info.url}`);
  console.log(`  pending: ${info.pending_update_count}`);
  if (info.last_error_message) console.log(`  last error: ${info.last_error_message}`);

  console.log(`
══ Как подключить к личному аккаунту ══

1. Telegram (свежая версия) → Настройки → Telegram Business → Чат-боты / Chat Automation
   (иногда: Настройки → Изменить профиль → Chat Automation)
2. Добавь бота: @${me.username}
3. Доступ: только новые личные чаты (на старт)
4. Права: читать сообщения + отвечать
5. Сохрани

Клиент пишет тебе лично (@pstasinski) — бот отвечает от твоего имени.
Сложные лиды → HANDOFF в CONTACT_TELEGRAM_CHAT_ID.

Env на VDS:
  TELEGRAM_BUSINESS_BOT_TOKEN=...
  TELEGRAM_BUSINESS_WEBHOOK_SECRET=${secret}
  OPENROUTER_API_KEY=...          # иначе keyword-fallback без LLM
  CONTACT_TELEGRAM_CHAT_ID=...    # уведомления owner/handoff
  TELEGRAM_BUSINESS_LLM_MODEL=deepseek/deepseek-v4-flash-0731   # опционально

Проверка: GET ${site}
`);
}

main().catch((err) => fail(err.message));
