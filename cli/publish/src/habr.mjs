import fs from "node:fs";
import path from "node:path";
import { ensureExportDir, loadArticle } from "./article.mjs";
import {
  articleCanonicalUrl,
  HABR_CREATE_URL,
  HABR_SANDBOX_URL,
} from "./config.mjs";
import { stripDuplicateTitle } from "./markdown.mjs";
import { copyToClipboard, openUrl } from "./open.mjs";

/**
 * Habr Flavored Markdown export.
 * Public Habr API is closed — no token-based publish path.
 * Hub tags are left as a checklist comment for the editor UI.
 */
export function buildHabrMarkdown(article) {
  const body = stripDuplicateTitle(article.body, article.title);
  const canonical = articleCanonicalUrl(article.slug);
  const hubsHint =
    article.tags.length > 0
      ? article.tags.map((t) => `#${t.replace(/\s+/g, "_")}`).join(" ")
      : "";

  return `# ${article.title}

${body.trim()}

---

*Оригинал: [${canonical}](${canonical})*

<!--
Habr checklist:
- Включите Markdown-режим в настройках редактора (HFM).
- Заголовок уже в H1 — при вставке в UI можно убрать дубль.
- Хабы / теги (черновик): ${hubsHint || "(укажите вручную)"}
- Превью → отправить / опубликовать.
- Публичного API публикации нет (habr.com/docs/help/api — closed).
-->
`;
}

export function exportHabr(slug, root) {
  const article = loadArticle(slug, root);
  const md = buildHabrMarkdown(article);
  const dir = ensureExportDir(slug, root);
  const out = path.join(dir, "habr.md");
  fs.writeFileSync(out, md, "utf8");
  console.log(`habr export: ${path.relative(root, out)}`);
  console.log(`canonical:   ${articleCanonicalUrl(slug)}`);
  console.log("");
  console.log("Дальше:");
  console.log("  npm run publish -- habr open-draft     # обычный редактор");
  console.log("  npm run publish -- habr open-sandbox   # песочница");
  console.log("  Вставьте содержимое habr.md (буфер копируется командой open-*).");
  return { out, md, canonical: articleCanonicalUrl(slug) };
}

export async function openHabrDraft(slug, root, { sandbox = false } = {}) {
  const article = loadArticle(slug, root);
  const md = buildHabrMarkdown(article);
  const url = sandbox ? HABR_SANDBOX_URL : HABR_CREATE_URL;
  const copied = await copyToClipboard(md);

  console.log(sandbox ? "Habr · Песочница" : "Habr · Новый черновик");
  console.log("─────────────────────");
  console.log(`Editor: ${url}`);
  console.log(`Canonical: ${articleCanonicalUrl(slug)}`);
  console.log("");
  console.log("Шаги:");
  console.log("  1. Войдите в аккаунт Habr в браузере.");
  console.log("  2. В настройках редактора включите Markdown (HFM).");
  console.log(
    copied
      ? "  3. Вставьте из буфера (Cmd/Ctrl+V) — habr.md уже скопирован."
      : "  3. Откройте articles/<slug>/.export/habr.md и вставьте вручную.",
  );
  console.log("  4. Выберите хабы, превью, опубликуйте / в песочницу.");
  console.log("");
  console.log("API: публичный publish API закрыт — токены в CLI не требуются.");

  await openUrl(url);
  return { url, copied };
}

/**
 * Optional Playwright path — gated, documented as fragile.
 * Does NOT auto-login or submit; only opens pages if playwright is installed.
 */
export async function tryPlaywrightOpen(urls) {
  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    throw new Error(
      "Playwright не установлен. Это optional last resort.\n" +
        "  npm i -D playwright && npx playwright install chromium\n" +
        "Предпочтительнее: open-medium-import / habr open-draft без автоматизации.",
    );
  }
  console.warn(
    "warn: Playwright automation is fragile (UI/DOM changes, login walls).",
  );
  const browser = await playwright.chromium.launch({ headless: false });
  const page = await browser.newPage();
  for (const u of urls) {
    await page.goto(u, { waitUntil: "domcontentloaded" });
  }
  console.log("Браузер оставлен открытым — завершите вручную, затем закройте.");
  // Don't close — user finishes flow. Detach by not awaiting forever:
  // Keep process alive briefly so window doesn't die immediately on some setups.
  await new Promise((r) => setTimeout(r, 1500));
  return { browser };
}
