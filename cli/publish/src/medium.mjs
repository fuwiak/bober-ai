import fs from "node:fs";
import path from "node:path";
import { ensureExportDir, loadArticle } from "./article.mjs";
import { articleCanonicalUrl, MEDIUM_IMPORT_URL } from "./config.mjs";
import { stripDuplicateTitle } from "./markdown.mjs";
import { copyToClipboard, openUrl } from "./open.mjs";

/**
 * Medium-friendly markdown: title + body + canonical footer.
 * REST API / integration tokens are NOT used (deprecated / no new tokens).
 */
export function buildMediumMarkdown(article) {
  const body = stripDuplicateTitle(article.body, article.title);
  const canonical = articleCanonicalUrl(article.slug);
  const tags =
    article.tags.length > 0
      ? `\n\n<!-- tags: ${article.tags.join(", ")} -->\n`
      : "\n";

  return `# ${article.title}

${body.trim()}
${tags}
---

*Originally published at [${canonical}](${canonical}).*
`;
}

export function exportMedium(slug, root) {
  const article = loadArticle(slug, root);
  const md = buildMediumMarkdown(article);
  const dir = ensureExportDir(slug, root);
  const out = path.join(dir, "medium.md");
  fs.writeFileSync(out, md, "utf8");
  const canonical = articleCanonicalUrl(slug);
  console.log(`medium export: ${path.relative(root, out)}`);
  console.log(`canonical URL: ${canonical}`);
  console.log("");
  console.log("Рекомендуемый путь: Import a story (не API).");
  console.log(`  1) Задеплойте страницу: ${canonical}`);
  console.log(`  2) npm run publish -- open-medium-import ${slug}`);
  console.log("  3) Вставьте URL → Import → правки → Publish");
  console.log("");
  console.log("Fallback: вставьте текст из medium.md вручную в New story.");
  return { out, md, canonical };
}

export async function openMediumImport(slug, root, { copy = true } = {}) {
  const article = loadArticle(slug, root);
  const canonical = articleCanonicalUrl(slug);
  console.log("Medium Import a story");
  console.log("─────────────────────");
  console.log(`URL статьи:  ${canonical}`);
  console.log(`Import UI:   ${MEDIUM_IMPORT_URL}`);
  console.log("");
  console.log("Шаги:");
  console.log("  1. Убедитесь, что страница на bober-ai.dev уже задеплоена.");
  console.log("  2. В Medium: profile → Stories → Import a story");
  console.log("     (или откроется вкладка Import UI).");
  console.log("  3. Вставьте URL выше → Import.");
  console.log("  4. Проверьте code blocks / картинки, затем Publish.");
  console.log("  Canonical выставится на исходный URL автоматически.");
  console.log("");
  console.log("Limits: официального CLI/REST для новых токенов нет.");
  console.log("Playwright-автоматизация — только как last resort (fragile).");

  if (copy) {
    const ok = await copyToClipboard(canonical);
    console.log(ok ? "✓ URL скопирован в буфер" : "• скопируйте URL вручную");
  }

  await openUrl(MEDIUM_IMPORT_URL);
  // Also open the published page for convenience in a second tab attempt
  await openUrl(canonical);
  return { canonical, importUrl: MEDIUM_IMPORT_URL, title: article.title };
}
