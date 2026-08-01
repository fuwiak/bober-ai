#!/usr/bin/env node
/**
 * Upload Yandex Business price list (XLSX or YML) via Sprav UI (Playwright).
 * Partner API cannot manage price lists — UI only.
 *
 * Auth: reuses .yandex-uslugi-auth.json (same Yandex Passport) or --auth=path.
 *
 * Usage:
 *   node scripts/yandex-business-price-upload.mjs
 *   node scripts/yandex-business-price-upload.mjs --file=data/yandex-business-price-list.xlsx
 *   node scripts/yandex-business-price-upload.mjs --file=public/feeds/yandex-business-price.yml --headed
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DEFAULT_AUTH = resolve(ROOT, ".yandex-uslugi-auth.json");
const DEFAULT_COMPANY = 113092981562;
const META = JSON.parse(
  readFileSync(resolve(ROOT, "data/yandex-business-price-list.json"), "utf8"),
);

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

async function main() {
  const companyId = Number(flag("--company", META.companyId || DEFAULT_COMPANY));
  const fileRel = flag("--file", META.outputs?.xlsx || "data/yandex-business-price-list.xlsx");
  const filePath = resolve(ROOT, fileRel);
  const authPath = resolve(ROOT, flag("--auth", DEFAULT_AUTH));
  const headed = flags.has("--headed");
  const dry = flags.has("--dry-run");

  if (!existsSync(filePath)) fail(`файл не найден: ${filePath}`);
  if (!existsSync(authPath)) {
    fail(
      `нет auth ${authPath}. Сначала: npm run yandex:uslugi:login (тот же Passport для Sprav)`,
    );
  }

  const ext = extname(filePath).toLowerCase();
  if (![".xlsx", ".xls", ".yml", ".yaml", ".xml"].includes(ext)) {
    fail("нужен .xlsx / .xls / .yml");
  }

  const url =
    flag("--url", "") ||
    `https://yandex.ru/sprav/${companyId}/p/edit/price-lists/`;

  log(`Файл: ${filePath}`);
  log(`UI:   ${url}`);
  if (dry) {
    log("(dry-run)");
    return;
  }

  const browser = await chromium.launch({
    headless: !headed,
    channel: process.env.YANDEX_USLUGI_CHROME_CHANNEL || undefined,
  });

  try {
    const context = await browser.newContext({
      storageState: authPath,
      locale: "ru-RU",
      viewport: { width: 1400, height: 900 },
    });
    const page = await context.newPage();

    log("Открываю прайс-лист…");
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(2500);

    const captcha = await page
      .locator("text=/робот|робат|SmartCaptcha|подтвердите/i")
      .first()
      .isVisible()
      .catch(() => false);
    if (captcha) {
      fail(
        "SmartCaptcha. Запустите с --headed, пройдите капчу, затем повторите. Или загрузите XLSX вручную в UI.",
      );
    }

    // Need login?
    if (page.url().includes("passport.yandex") || page.url().includes("auth")) {
      fail("Сессия истекла. npm run yandex:uslugi:login");
    }

    // Try open upload dialog
    const uploadTriggers = [
      page.getByRole("button", { name: /Загрузить XLS\/YML|Загрузить|XLS|YML/i }),
      page.getByText(/Загрузить XLS\/YML/i),
      page.getByText(/Загрузить файл/i),
      page.locator('button:has-text("Загрузить")'),
      page.locator('[data-testid*="upload"], [class*="upload"]').first(),
    ];

    let opened = false;
    for (const loc of uploadTriggers) {
      try {
        if (await loc.first().isVisible({ timeout: 1500 })) {
          await loc.first().click({ timeout: 5000 });
          opened = true;
          log("Кликнул кнопку загрузки");
          break;
        }
      } catch {
        /* try next */
      }
    }

    // Prefer file input (may already be on page or in modal)
    const input = page.locator('input[type="file"]').first();
    const inputVisible = await input.count();
    if (!inputVisible) {
      // Tab XLS vs YML
      if (ext === ".yml" || ext === ".yaml" || ext === ".xml") {
        const ymlTab = page.getByText(/^YML$/i).first();
        if (await ymlTab.isVisible().catch(() => false)) {
          await ymlTab.click();
          await page.waitForTimeout(500);
        }
      } else {
        const xlsTab = page.getByText(/^XLS$/i).first();
        if (await xlsTab.isVisible().catch(() => false)) {
          await xlsTab.click();
          await page.waitForTimeout(500);
        }
      }
    }

    const fileInput = page.locator('input[type="file"]').first();
    if ((await fileInput.count()) === 0) {
      // Dump helpful snapshot for manual finish
      await page.screenshot({
        path: resolve(ROOT, "data/yandex-business-price-upload-debug.png"),
        fullPage: true,
      });
      fail(
        `Не найден input[type=file]. Скрин: data/yandex-business-price-upload-debug.png\n` +
          `Загрузите вручную: ${url}\nФайл: ${filePath}`,
      );
    }

    log("Загружаю файл…");
    await fileInput.setInputFiles(filePath);
    await page.waitForTimeout(2000);

    // Confirm / submit if needed
    const confirm = page.getByRole("button", {
      name: /Загрузить|Сохранить|Отправить|Готово|Применить/i,
    });
    if (await confirm.first().isVisible().catch(() => false)) {
      await confirm.first().click().catch(() => {});
      log("Подтвердил загрузку");
    }

    await page.waitForTimeout(4000);
    await page.screenshot({
      path: resolve(ROOT, "data/yandex-business-price-upload-result.png"),
      fullPage: true,
    });
    await context.storageState({ path: authPath }).catch(() => {});

    log("Готово (проверьте кабинет — обработка XLS/YML до ~1 часа).");
    log(`Скрин: data/yandex-business-price-upload-result.png`);
    log(`UI: ${url}`);
  } finally {
    await browser.close().catch(() => {});
  }
}

main().catch((err) => fail(err.message || String(err)));
