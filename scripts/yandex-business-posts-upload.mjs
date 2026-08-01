#!/usr/bin/env node
/**
 * Upload publications (Публикации) to Yandex Business Sprav via UI.
 * Docs: https://yandex.ru/support/business-priority/ru/manage/publications
 *
 * Usage:
 *   node scripts/yandex-business-posts-upload.mjs
 *   node scripts/yandex-business-posts-upload.mjs --limit=2 --headed
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const AUTH = resolve(ROOT, ".yandex-uslugi-auth.json");
const META_PATH = resolve(ROOT, "data/yandex-business-posts.json");

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--") && !a.includes("=")));

function flag(name, fallback) {
  const hit = args.find((a) => a.startsWith(`${name}=`));
  if (hit) return hit.slice(name.length + 1);
  const i = args.indexOf(name);
  if (i >= 0 && args[i + 1] && !args[i + 1].startsWith("--")) return args[i + 1];
  return fallback;
}

function fail(msg) {
  console.error(`\nОшибка: ${msg}`);
  process.exit(1);
}

function log(msg) {
  console.log(msg);
}

async function createPost(page, post) {
  const textarea = page
    .locator('textarea[placeholder*="Расскажите"], textarea.ya-business-ui-textarea__control')
    .first();
  await textarea.waitFor({ state: "visible", timeout: 15000 });
  await textarea.click();
  await textarea.fill("");
  await textarea.fill(post.text);

  if (post.photos?.length) {
    const input = page.locator("#postPhoto, input[type=file][accept*=image]").first();
    const abs = post.photos.map((p) => resolve(ROOT, p));
    for (const f of abs) {
      if (!existsSync(f)) fail(`фото не найдено: ${f}`);
    }
    await input.setInputFiles(abs.slice(0, 4));
    await page.waitForTimeout(2000);
  }

  const submit = page.locator(".PostAddForm-Submit, button:has-text(\"Создать\")").first();
  await page.waitForTimeout(500);
  if (!(await submit.isEnabled())) {
    fail(`кнопка «Создать» disabled для ${post.id}`);
  }
  await submit.click();
  await page.waitForTimeout(4000);

  // Success heuristics
  const body = await page.locator("body").innerText();
  if (/ошибк|отклон|не удалось/i.test(body) && /публикац/i.test(body)) {
    log(`  warn: возможная ошибка в UI — проверьте кабинет (${post.id})`);
  }
}

async function main() {
  if (!existsSync(AUTH)) fail("нет auth — npm run yandex:uslugi:login");
  const meta = JSON.parse(readFileSync(META_PATH, "utf8"));
  const companyId = Number(flag("--company", meta.companyId || 113092981562));
  const limit = Number(flag("--limit", meta.posts?.length || 4));
  const posts = (meta.posts || []).slice(0, limit);
  const headed = flags.has("--headed");
  const dry = flags.has("--dry-run");
  const url = `https://yandex.ru/sprav/${companyId}/p/edit/posts/`;

  log(`UI: ${url}`);
  log(`Posts: ${posts.length}`);
  if (dry) {
    for (const p of posts) log(`- ${p.id}: ${p.text.slice(0, 60)}…`);
    return;
  }

  const browser = await chromium.launch({
    headless: !headed,
    channel: process.env.YANDEX_USLUGI_CHROME_CHANNEL || undefined,
  });

  try {
    const context = await browser.newContext({
      storageState: AUTH,
      locale: "ru-RU",
      viewport: { width: 1440, height: 1100 },
    });
    const page = await context.newPage();

    for (const [i, post] of posts.entries()) {
      log(`\n[${i + 1}/${posts.length}] ${post.id}`);
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
      await page.waitForTimeout(2000);

      if (/робот|SmartCaptcha/i.test(await page.locator("body").innerText())) {
        fail("SmartCaptcha — повторите с --headed");
      }

      await createPost(page, post);
      log("  OK (отправлено на модерацию)");
      await page.waitForTimeout(1500);
    }

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: resolve(ROOT, "data/yandex-business-posts-result.png"),
      fullPage: true,
    });
    await context.storageState({ path: AUTH }).catch(() => {});
    log("\nГотово. Модерация публикаций — до 7 дней.");
    log(`Скрин: data/yandex-business-posts-result.png`);
  } finally {
    await browser.close().catch(() => {});
  }
}

main().catch((e) => fail(e.message || String(e)));
