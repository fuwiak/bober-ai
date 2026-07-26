#!/usr/bin/env node
/**
 * Яндекс Услуги (кабинет исполнителя) — автоматизация через Playwright.
 *
 * Публичного API кабинета нет. Скрипт:
 * 1) login  — ручной вход, сохранение cookies
 * 2) sniff  — лог POST /api/* при ручном «Добавить услугу» (чтобы позже дергать HTTP)
 * 3) add    — заполнение формы «Новая услуга» из JSON (DOM)
 * 4) update — правка существующих услуг (описание / название) по match
 * 5) list   — открыть специализацию и вывести названия услуг со страницы
 *
 * Не обходит SmartCaptcha. Не коммитьте .yandex-uslugi-auth.json.
 *
 * Usage:
 *   node scripts/yandex-uslugi.mjs login
 *   node scripts/yandex-uslugi.mjs sniff --spec=187ddab3-5a27-4a55-8240-dd1baca3b87f
 *   node scripts/yandex-uslugi.mjs add --file=data/uslugi-services.example.json
 *   node scripts/yandex-uslugi.mjs update --file=data/uslugi-services-update.json
 *   node scripts/yandex-uslugi.mjs list --spec=187ddab3-5a27-4a55-8240-dd1baca3b87f
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const AUTH_PATH = resolve(ROOT, ".yandex-uslugi-auth.json");
const SNIFF_DIR = resolve(ROOT, "data/uslugi-sniff");
const BASE = "https://uslugi.yandex.ru";

/** Split glued flags like `--file=path.json--spec=uuid` into separate argv tokens. */
function expandGluedArgv(raw) {
  const out = [];
  for (const token of raw) {
    if (!token.startsWith("--") || !token.includes("=")) {
      out.push(token);
      continue;
    }
    // e.g. --file=data/x.json--spec=uuid  or  --file=data/x.json --spec=uuid already ok
    const parts = token.split(/(?=--[a-zA-Z][\w-]*=)/);
    if (parts.length > 1 && parts.every((p) => p.startsWith("--"))) {
      out.push(...parts.filter(Boolean));
    } else {
      out.push(token);
    }
  }
  return out;
}

const args = expandGluedArgv(process.argv.slice(2));
const command = args[0] || "help";
const flags = new Set(args.filter((a) => a.startsWith("--") && !a.includes("=")));

function flag(name, fallback) {
  const hit = args.find((a) => a.startsWith(`${name}=`));
  if (hit) {
    let val = hit.slice(name.length + 1);
    // Extra safety: if value still contains a glued next flag
    const glued = val.match(/^(.*?)(--[a-zA-Z][\w-]*=.*)$/);
    if (glued) val = glued[1];
    return val;
  }
  const i = args.indexOf(name);
  if (i >= 0 && args[i + 1] && !args[i + 1].startsWith("--")) return args[i + 1];
  return fallback;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fail(msg) {
  console.error(`\nОшибка: ${msg}`);
  process.exit(1);
}

function log(msg) {
  console.log(msg);
}

function specializationUrl(specId) {
  const id = specId || fail("нужен --spec=<uuid>");
  return `${BASE}/cab/specialization?id=${encodeURIComponent(id)}`;
}

function loadJson(path) {
  const abs = resolve(ROOT, path);
  if (!existsSync(abs)) fail(`файл не найден: ${abs}`);
  return JSON.parse(readFileSync(abs, "utf8"));
}

async function launchBrowser(headed = true) {
  return chromium.launch({
    headless: !headed,
    channel: process.env.YANDEX_USLUGI_CHROME_CHANNEL || undefined,
  });
}

async function newContext(browser, { withAuth = false } = {}) {
  if (withAuth) {
    if (!existsSync(AUTH_PATH)) {
      fail(`нет сессии. Сначала: node scripts/yandex-uslugi.mjs login`);
    }
    return browser.newContext({
      storageState: AUTH_PATH,
      locale: "ru-RU",
      viewport: { width: 1440, height: 900 },
    });
  }
  return browser.newContext({
    locale: "ru-RU",
    viewport: { width: 1440, height: 900 },
  });
}

async function cmdLogin() {
  log("Откроется браузер. Войдите в Яндекс Услуги (кабинет исполнителя).");
  log("После загрузки кабинета нажмите Enter в этом терминале.\n");

  const browser = await launchBrowser(true);
  const context = await newContext(browser, { withAuth: false });
  const page = await context.newPage();
  await page.goto(`${BASE}/cab`, { waitUntil: "domcontentloaded", timeout: 120_000 });

  await new Promise((resolveWait) => {
    process.stdin.resume();
    process.stdin.once("data", () => resolveWait());
  });

  await context.storageState({ path: AUTH_PATH });
  await browser.close();
  log(`\nСессия сохранена: ${AUTH_PATH}`);
  log("Добавьте файл в .gitignore (уже должен быть). Не коммитьте cookies.");
}

function attachSniffer(page, outDir) {
  mkdirSync(outDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const logPath = resolve(outDir, `api-${stamp}.jsonl`);
  const entries = [];

  page.on("request", async (req) => {
    const url = req.url();
    if (!url.includes("uslugi.yandex.ru")) return;
    const method = req.method();
    if (method !== "POST" && method !== "PUT" && method !== "PATCH") return;
    if (!/\/api\//i.test(url) && !/clck|safeclick/i.test(url)) {
      // still capture likely mutation endpoints
      if (!/service|specializ|worker|profile|cab/i.test(url)) return;
    }

    let body = null;
    try {
      body = req.postData();
    } catch {
      body = null;
    }

    const entry = {
      at: new Date().toISOString(),
      method,
      url,
      headers: req.headers(),
      bodyPreview: body ? body.slice(0, 8000) : null,
    };
    entries.push(entry);
    writeFileSync(logPath, entries.map((e) => JSON.stringify(e)).join("\n") + "\n");
    log(`[sniff] ${method} ${url}`);
  });

  return logPath;
}

async function cmdSniff() {
  const spec = flag("--spec");
  const browser = await launchBrowser(true);
  const context = await newContext(browser, { withAuth: true });
  const page = await context.newPage();
  const logPath = attachSniffer(page, SNIFF_DIR);

  log(`Открываю специализацию. Добавьте услугу вручную — лог POST пишется в:`);
  log(`  ${logPath}`);
  log("Закройте браузер или Ctrl+C, когда закончите.\n");

  await page.goto(specializationUrl(spec), {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });

  await page.waitForEvent("close", { timeout: 0 }).catch(() => {});
  // keep alive until user closes window
  await new Promise((r) => {
    const t = setInterval(() => {
      if (!page.isClosed()) return;
      clearInterval(t);
      r();
    }, 1000);
    process.on("SIGINT", () => {
      clearInterval(t);
      r();
    });
  });

  await browser.close();
  log(`\nSniff сохранён: ${logPath}`);
  log("Найдите URL с service / specialization — его можно вызвать с CSRF из window.__CSRF_TOKEN__.");
}

async function openAddServiceModal(page) {
  const addBtn = page.locator("button.SpecializationEditor-AddCustomService");
  await addBtn.waitFor({ state: "visible", timeout: 60_000 });
  await addBtn.click();

  const modal = page.locator(".Modal.Modal_visible .ServiceForm, .YdoModal .ServiceForm");
  await modal.waitFor({ state: "visible", timeout: 30_000 });
  return modal;
}

async function isCheckboxOn(btn) {
  return btn.evaluate((el) => {
    const aria = el.getAttribute("aria-pressed") || el.getAttribute("aria-checked");
    if (aria === "true") return true;
    if (aria === "false") return false;
    const c = el.className || "";
    // Не путать Button2_theme_checkbox с состоянием *_checked
    return /(?:^|\s)Button2_checked(?:\s|$)/.test(c) || /(?:^|\s)\S+_checked(?:\s|$)/.test(c);
  });
}

async function setPriceFields(page, modal, service) {
  if (service.byAgreement) {
    log("  цена: по договорённости");
    const agree = modal.locator(".ServiceForm-PriceCheckbox").filter({ hasText: "договорённости" });
    await agree.locator("button").click({ timeout: 8_000 });
    return;
  }
  if (service.price == null) {
    log("  цена: пропуск (нет price)");
    return;
  }

  log(`  цена: сумма ${service.price}`);
  const price = modal.locator('input[name="price"]');
  await price.waitFor({ state: "visible", timeout: 15_000 });
  await price.click({ timeout: 8_000 });
  await price.fill(String(service.price));
  await price.blur();

  if (service.isMinimalPrice !== false) {
    log("  цена: чекбокс «от»");
    const from = modal.locator(".ServiceForm-PriceCheckbox").filter({ hasText: /^от$/ });
    const btn = from.locator("button").first();
    if ((await btn.count().catch(() => 0)) > 0) {
      for (let attempt = 0; attempt < 3; attempt++) {
        const on = await isCheckboxOn(btn).catch(() => false);
        if (on) break;
        await btn.click({ timeout: 5_000 }).catch(() => {});
        await sleep(300);
      }
    } else {
      log("  цена: чекбокс «от» не найден — пропуск");
    }
  }

  if (!service.priceMeasure && !service.priceMeasureLabel) return;

  const measureMap = {
    service: "за услугу",
    hour: "за час",
    lesson: "за занятие",
    day: "за день",
    month: "за месяц",
    piece: "за штуку",
  };
  const label = measureMap[service.priceMeasure] || service.priceMeasureLabel;
  if (!label) return;

  const current = modal.locator(
    ".ServiceForm-PriceMeasureItem .select2__button .Button2-Text, .ServiceForm-PriceMeasureItem button.select2__button .Button2-Text",
  );
  const curText = ((await current.first().textContent({ timeout: 5_000 }).catch(() => "")) || "")
    .replace(/\s+/g, " ")
    .trim();
  // Не сравнивать через includes("") — пустой curText всегда «совпадает»
  if (curText && (curText === label || curText.includes(label) || label.includes(curText))) {
    log(`  цена: единица уже «${curText}»`);
    return;
  }

  log(`  цена: единица «${curText || "?"}» → «${label}»`);
  try {
    const selectBtn = modal.locator(
      ".ServiceForm-PriceMeasureItem button.select2__button, .ServiceForm-PriceMeasureItem .select2__button",
    );
    await selectBtn.first().click({ timeout: 8_000 });
    const option = page.locator(".select2__popup .menu__item, .Popup2 .menu__item").filter({ hasText: label });
    await option.first().click({ timeout: 8_000 });
    await sleep(200);
  } catch (err) {
    log(`  цена: единица — пропуск (${err.message?.split("\n")[0] || err})`);
    await page.keyboard.press("Escape").catch(() => {});
    await sleep(200);
  }
}

async function clearExistingPhotos(modal) {
  // Крестик `.ImagesManager-RemoveButton` на превью (в т.ч. отклонённых)
  for (let round = 0; round < 8; round++) {
    const remove = modal.locator(".ImagesManager-RemoveButton").first();
    if ((await remove.count()) === 0) break;
    await remove.click({ timeout: 3000, force: true }).catch(() => {});
    await new Promise((r) => setTimeout(r, 400));
  }
}

async function uploadPhotos(modal, service, { onlyIfEmpty = false } = {}) {
  if (service.clearPhotos) {
    log("  фото: удаление существующих");
    await clearExistingPhotos(modal);
  }

  const photos = []
    .concat(service.photos || [])
    .concat(service.photo ? [service.photo] : []);
  if (!photos.length) return;
  if (flags.has("--skip-photos")) {
    log("  фото: пропуск (--skip-photos)");
    return;
  }

  if (onlyIfEmpty && !service.clearPhotos) {
    const existing = modal.locator(
      ".ImagesManager-Preview img, .ImagesManager-Thumb img, img.ImagesManager-Thumb",
    );
    // Не считать иконку-заглушку в кнопке загрузки
    const n = await existing.count();
    let real = 0;
    for (let i = 0; i < n; i++) {
      const src = (await existing.nth(i).getAttribute("src").catch(() => "")) || "";
      if (src && !/data:image\/svg|placeholder|uploader/i.test(src)) real += 1;
    }
    if (real > 0) {
      log("  фото уже есть — пропуск");
      return;
    }
  }

  const paths = photos.map((p) => {
    const abs = resolve(ROOT, p);
    if (!existsSync(abs)) fail(`фото не найдено: ${abs}`);
    return abs;
  });

  log(`  фото: загрузка ${paths.map((p) => p.split("/").pop()).join(", ")}`);
  const input = modal.locator('.ImageUploader input[type="file"], .ImagesManager input[type="file"]').first();
  await input.waitFor({ state: "attached", timeout: 10_000 });
  try {
    await input.setInputFiles(paths);
  } catch (err) {
    log(`  фото: setInputFiles ошибка — ${err.message || err}`);
    return;
  }

  const preview = modal.locator(
    ".ImagesManager-Preview img, .ImagesManager-Thumb img, .ImagesManager-Image img[src*='http'], .ImagesManager-Image img[src*='blob']",
  );
  try {
    await preview.first().waitFor({ state: "visible", timeout: 20_000 });
    // дождаться окончания лоадера, если он есть
    const loader = modal.locator(".ImagesManager-Loader");
    if ((await loader.count()) > 0) {
      await loader.first().waitFor({ state: "hidden", timeout: 20_000 }).catch(() => {});
    }
    log("  фото: OK");
  } catch {
    log("  фото: превью не появилось за 20с — продолжаем без ожидания");
  }
  await new Promise((r) => setTimeout(r, 400));
}

function resolveDescription(service) {
  const direct = String(service.description || "").trim();
  if (direct) return direct;
  const includes = Array.isArray(service.includes) ? service.includes.filter(Boolean) : [];
  if (includes.length) {
    return `${service.name || "Услуга"}. ${includes.join(". ")}.`;
  }
  return "";
}

async function readDescriptionValue(modal) {
  return modal.evaluate((root) => {
    const ta =
      root.querySelector('textarea[name="description"]') ||
      root.querySelector("textarea.ServiceForm-Description") ||
      root.querySelector(".ServiceForm textarea") ||
      root.querySelector('textarea[placeholder*="пис"]');
    if (ta) return String(ta.value || "").trim();
    const editable =
      root.querySelector('[contenteditable="true"][name="description"]') ||
      root.querySelector(".ServiceForm [contenteditable='true']");
    if (editable) return String(editable.innerText || editable.textContent || "").trim();
    return "";
  });
}

async function fillDescription(page, modal, text) {
  const wanted = String(text || "").trim();
  if (!wanted) fail("описание пустое — добавьте description (или includes[]) в JSON");

  const candidates = [
    'textarea[name="description"]',
    "textarea.ServiceForm-Description",
    ".ServiceForm-Description textarea",
    ".ServiceForm textarea",
    'textarea[placeholder*="пис"]',
    '[contenteditable="true"][name="description"]',
    ".ServiceForm [contenteditable='true']",
  ];

  let lastErr = null;
  for (let attempt = 1; attempt <= 4; attempt++) {
    log(`  поле: описание (попытка ${attempt}/4, ${wanted.length} симв.)`);
    try {
      let target = null;
      for (const sel of candidates) {
        const loc = modal.locator(sel).first();
        if ((await loc.count()) === 0) continue;
        const visible = await loc.isVisible().catch(() => false);
        if (visible || sel.includes("textarea")) {
          target = loc;
          break;
        }
      }
      if (!target) {
        throw new Error("не найден textarea/contenteditable описания");
      }

      await target.scrollIntoViewIfNeeded().catch(() => {});
      await sleep(150);
      await target.click({ timeout: 8_000 });
      await sleep(100);

      const tag = await target.evaluate((el) => el.tagName.toLowerCase()).catch(() => "");
      if (tag === "textarea" || tag === "input") {
        await target.fill("");
        await target.fill(wanted);
      } else {
        // contenteditable: fill() часто не триггерит React — через keyboard
        await page.keyboard.press(process.platform === "darwin" ? "Meta+A" : "Control+A");
        await page.keyboard.press("Backspace");
        await page.keyboard.type(wanted, { delay: 0 });
      }

      // Триггер input/change на случай React-controlled
      await target
        .evaluate((el, value) => {
          if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
            el.value = value;
            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
          }
        }, wanted)
        .catch(() => {});

      await sleep(250);
      const got = await readDescriptionValue(modal);
      if (got && (got === wanted || got.includes(wanted.slice(0, 40)) || wanted.includes(got.slice(0, 40)))) {
        log(`  описание: OK (${got.length} симв.)`);
        return;
      }
      lastErr = new Error(`после заполнения в поле «${(got || "").slice(0, 60)}»`);
      log(`  описание: не подтвердилось — повтор`);
    } catch (err) {
      lastErr = err;
      log(`  описание: ошибка — ${err.message?.split("\n")[0] || err}`);
      await page.keyboard.press("Escape").catch(() => {});
      await sleep(400);
    }
  }
  fail(`не удалось заполнить описание. ${lastErr?.message || ""}`);
}

async function fillServiceForm(page, modal, service) {
  log("  поле: название");
  const nameInput = modal.locator('input[name="name"]');
  await nameInput.waitFor({ state: "visible", timeout: 15_000 });
  await nameInput.fill(String(service.name || ""));

  log("  поле: цена");
  await setPriceFields(page, modal, service);

  const description = resolveDescription(service);
  await fillDescription(page, modal, description);

  log("  поле: фотографии");
  await uploadPhotos(modal, service);
  log("  форма заполнена");
}

async function submitServiceForm(modal) {
  const submit = modal.locator("button.ServiceForm-Submit");
  await submit.waitFor({ state: "visible", timeout: 15_000 });
  for (let i = 0; i < 25; i++) {
    if (!(await submit.isDisabled())) break;
    await new Promise((r) => setTimeout(r, 400));
  }
  if (await submit.isDisabled()) {
    const errs = await modal
      .locator(".Field-Error, .Form-Error, .Text_color_error, [class*='Error']:not(script)")
      .allTextContents()
      .catch(() => []);
    fail(`кнопка «Сохранить» неактивна. ${errs.filter(Boolean).join(" | ") || "проверьте поля формы"}`);
  }
  await submit.click();
  await modal.waitFor({ state: "hidden", timeout: 60_000 }).catch(() => {});
}

async function dismissPromo(page) {
  await page
    .locator(".UserServices-ServiceListPromo a, .tooltip a")
    .filter({ hasText: "Понятно" })
    .first()
    .click({ timeout: 3000 })
    .catch(() => {});
}

async function openSpecializationPage(page, spec) {
  await page.goto(specializationUrl(spec), {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  await page
    .locator("button.SpecializationEditor-AddCustomService")
    .waitFor({ state: "visible", timeout: 60_000 });
  await dismissPromo(page);
}

async function cmdAdd() {
  const file = flag("--file", "data/uslugi-services.example.json");
  const dry = flags.has("--dry-run");
  const data = loadJson(file);
  const spec = flag("--spec", data.specializationId);
  const services = data.services || [];
  if (!services.length) fail("в JSON нет services[]");
  // Default: new browser per service (stable). --reuse-session / --fast = one browser (much faster).
  const reuseSession = flags.has("--reuse-session") || flags.has("--fast");
  const headed = !flags.has("--headless");

  log(`Специализация: ${spec}${reuseSession ? " (reuse-session)" : ""}`);
  if (dry) {
    for (const [i, service] of services.entries()) {
      log(`\n[${i + 1}/${services.length}] ${service.name}`);
      log("  (dry-run — пропуск)");
    }
    return;
  }

  let browser = null;
  let context = null;
  let page = null;

  async function ensurePage(forceNew = false) {
    if (!forceNew && page && !page.isClosed()) return page;
    if (browser) {
      await context?.storageState({ path: AUTH_PATH }).catch(() => {});
      await browser.close().catch(() => {});
    }
    browser = await launchBrowser(headed);
    context = await newContext(browser, { withAuth: true });
    page = await context.newPage();
    if (flags.has("--sniff")) {
      const logPath = attachSniffer(page, SNIFF_DIR);
      log(`Sniff: ${logPath}`);
    }
    await openSpecializationPage(page, spec);
    return page;
  }

  try {
    for (const [i, service] of services.entries()) {
      log(`\n[${i + 1}/${services.length}] ${service.name}`);
      // Новый браузер на каждую услугу (или reuse + перезагрузка страницы)
      const p = await ensurePage(!reuseSession || i === 0);
      try {
        const modal = await openAddServiceModal(p);
        await fillServiceForm(p, modal, service);
        await submitServiceForm(modal);
        // Short settle; --fast cuts further. Full browser relaunch (default) is the real cost.
        await sleep(flags.has("--fast") ? 250 : 600);
        log("  OK (форма отправлена)");
      } catch (err) {
        log(`  ошибка: ${err.message?.split("\n")[0] || err}`);
        if (reuseSession && i + 1 < services.length) {
          log("  перезапуск браузера и продолжение…");
          await ensurePage(true);
          continue;
        }
        throw err;
      }
      if (reuseSession && i + 1 < services.length) {
        await openSpecializationPage(p, spec).catch(async () => {
          await ensurePage(true);
        });
      }
    }
  } finally {
    if (context) await context.storageState({ path: AUTH_PATH }).catch(() => {});
    if (browser) await browser.close().catch(() => {});
  }
  log("\nГотово. Проверьте услуги в кабинете / на публичной странице.");
}

async function waitForEnter(prompt = "Enter — закрыть браузер…") {
  log(prompt);
  await new Promise((resolveWait) => {
    process.stdin.resume();
    process.stdin.once("data", () => resolveWait());
  });
}

function normalizeTitle(s) {
  return String(s || "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/^[Cc](?=[а-яёА-ЯЁ])/u, "С")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

async function findServiceCard(page, matchTitle) {
  const cards = page.locator(".UserService");
  const n = await cards.count();
  const needle = normalizeTitle(matchTitle);
  for (let i = 0; i < n; i++) {
    const card = cards.nth(i);
    const title = await card.locator(".UserService-ServiceText .Text_weight_bold").first().textContent();
    const norm = normalizeTitle(title);
    if (norm === needle || norm.includes(needle) || needle.includes(norm)) {
      return card;
    }
  }
  return null;
}

async function openEditServiceModal(page, matchTitle) {
  const target = await findServiceCard(page, matchTitle);
  if (!target) fail(`услуга не найдена на странице: ${matchTitle}`);
  await target.locator("a.UserService-EditLink").click();
  const modal = page.locator(".Modal.Modal_visible .ServiceForm, .YdoModal .ServiceForm");
  await modal.waitFor({ state: "visible", timeout: 30_000 });
  return modal;
}

async function fillUpdateForm(page, modal, service) {
  if (service.name) {
    log("  поле: название");
    const nameInput = modal.locator('input[name="name"]');
    await nameInput.fill(String(service.name));
  }
  if (service.price != null || service.byAgreement || service.priceMeasure) {
    log("  поле: цена");
    await setPriceFields(page, modal, service);
  }
  const description = resolveDescription(service);
  if (description) {
    await fillDescription(page, modal, description);
  }
  log("  поле: фотографии");
  await uploadPhotos(modal, service, {
    onlyIfEmpty: !service.forcePhoto && !service.clearPhotos,
  });
}

async function cmdUpdate() {
  const file = flag("--file", "data/uslugi-services-update.json");
  const dry = flags.has("--dry-run");
  const data = loadJson(file);
  const spec = flag("--spec", data.specializationId);
  const services = data.services || [];
  if (!services.length) fail("в JSON нет services[]");

  const browser = await launchBrowser(!flags.has("--headless"));
  const context = await newContext(browser, { withAuth: true });
  const page = await context.newPage();

  log(`Специализация: ${spec}`);
  await page.goto(specializationUrl(spec), {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  await page.locator(".UserService, button.SpecializationEditor-AddCustomService").first().waitFor({
    state: "visible",
    timeout: 60_000,
  });

  await page
    .locator(".UserServices-ServiceListPromo a, .tooltip a")
    .filter({ hasText: "Понятно" })
    .first()
    .click({ timeout: 3000 })
    .catch(() => {});

  for (const [i, service] of services.entries()) {
    const match = service.match || service.name;
    log(`\n[${i + 1}/${services.length}] ${match}`);
    if (dry) {
      log("  (dry-run — пропуск)");
      continue;
    }
    const modal = await openEditServiceModal(page, match);
    await fillUpdateForm(page, modal, service);
    await submitServiceForm(modal);
    await page.waitForTimeout(1200);
    log("  OK (обновлено)");
  }

  await context.storageState({ path: AUTH_PATH });
  await browser.close();
  log("\nГотово. Проверьте услуги в кабинете.");
}

async function cmdRemove() {
  const file = flag("--file");
  const dry = flags.has("--dry-run");
  let titles = [];
  if (file) {
    const data = loadJson(file);
    titles = (data.remove || data.services || []).map((x) => (typeof x === "string" ? x : x.match || x.name));
  } else {
    const raw = flag("--match");
    if (!raw) fail("нужен --file=JSON (remove[]) или --match=название");
    titles = [raw];
  }
  const spec = flag("--spec", file ? loadJson(file).specializationId : undefined);

  const browser = await launchBrowser(!flags.has("--headless"));
  const context = await newContext(browser, { withAuth: true });
  const page = await context.newPage();

  log(`Специализация: ${spec}`);
  await page.goto(specializationUrl(spec), {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  await page.locator(".UserService").first().waitFor({ state: "visible", timeout: 60_000 });

  for (const [i, title] of titles.entries()) {
    log(`\n[${i + 1}/${titles.length}] удалить: ${title}`);
    if (dry) {
      log("  (dry-run — пропуск)");
      continue;
    }
    const card = await findServiceCard(page, title);
    if (!card) {
      log("  не найдена — пропуск");
      continue;
    }
    page.once("dialog", (d) => d.accept().catch(() => {}));
    await card.locator("a.UserService-RemoveLink").click();
    const confirm = page
      .locator(".Modal.Modal_visible button, .YdoModal button, .Confirm button")
      .filter({ hasText: /Удалить|Да|Подтверд/i });
    await confirm.first().click({ timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(1500);
    log("  OK");
  }

  await context.storageState({ path: AUTH_PATH });
  await browser.close();
  log("\nГотово.");
}

async function cmdList() {
  const spec = flag("--spec");
  const keep = flags.has("--keep");
  // По умолчанию headless: иначе окно мелькает и сразу закрывается — кажется, что «сайт упал».
  const headed = keep || flags.has("--headed");
  const browser = await launchBrowser(headed && !flags.has("--headless"));
  const context = await newContext(browser, { withAuth: true });
  const page = await context.newPage();
  await page.goto(specializationUrl(spec), {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  await page
    .locator(".UserService-ServiceText .Text_weight_bold, .SpecializationEditor-AddCustomService")
    .first()
    .waitFor({ state: "visible", timeout: 60_000 })
    .catch(() => {});

  const names = await page.locator(".UserService-ServiceText .Text_weight_bold").allTextContents();
  const prices = await page.locator(".UserService-ServiceInfo .Text_weight_bold").allTextContents();

  log(`Услуг на странице: ${names.length}\n`);
  names.forEach((name, i) => {
    log(`- ${name.trim()} | ${prices[i]?.trim() || "?"}`);
  });

  if (keep) await waitForEnter();
  await browser.close();
}

function help() {
  console.log(`
Яндекс Услуги — кабинет (Playwright)

Команды:
  login              Войти и сохранить cookies → .yandex-uslugi-auth.json
  sniff --spec=UUID  Логировать POST /api при ручном добавлении услуги
  add --file=JSON    Добавить услуги из JSON через DOM-форму
  update --file=JSON Обновить название/описание/цену/фото (match)
  remove --file=JSON Удалить услуги (remove[] или --match=название)
  list --spec=UUID   Список названий услуг на странице специализации

Флаги:
  --spec=UUID        ID специализации (cab/specialization?id=…)
  --file=path        JSON с specializationId + services[]
  --match=title      Название для remove
  --dry-run          Только показать, не кликать
  --headless         Без окна (add/update/remove)
  --headed           С окном (list по умолчанию headless)
  --reuse-session    Один браузер на все услуги (быстрее)
  --fast             = reuse-session + короткие паузы
  --skip-photos      Не загружать фото (ещё быстрее)
  --keep             Не закрывать браузер сразу (list / удобно смотреть)
  --skip-photos      Не загружать фото (если зависает на «Описание и фотографии»)
  --reuse-session    add: один браузер на все услуги (по умолчанию — новый на каждую)
  --sniff            При add писать Network в data/uslugi-sniff/

Склеенные флаги ок: --file=data/x.json--spec=UUID (пробел не обязателен).
Порядок полей add: название → цена → описание → фото → сохранить.

Пример JSON: data/uslugi-services.example.json

После sniff можно заменить DOM на прямой fetch с CSRF (window.__CSRF_TOKEN__).
Публичного API кабинета нет; для поиска используйте Webmaster SERVICES (npm run webmaster:feed:*).
`);
}

async function main() {
  switch (command) {
    case "login":
      await cmdLogin();
      break;
    case "sniff":
      await cmdSniff();
      break;
    case "add":
      await cmdAdd();
      break;
    case "update":
      await cmdUpdate();
      break;
    case "remove":
      await cmdRemove();
      break;
    case "list":
      await cmdList();
      break;
    case "help":
    case "--help":
    case "-h":
      help();
      break;
    default:
      fail(`неизвестная команда: ${command}\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
