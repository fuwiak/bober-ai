import fs from "node:fs";
import path from "node:path";
import { ensureExportDir, listArticleSlugs, loadArticle } from "./article.mjs";
import { articleCanonicalUrl, generatedDir, SITE_URL } from "./config.mjs";
import { markdownToHtml, stripDuplicateTitle } from "./markdown.mjs";

function tsString(s) {
  return JSON.stringify(s ?? "");
}

function tsArray(arr) {
  return `[${(arr || []).map((x) => tsString(x)).join(", ")}]`;
}

function escapeTemplateLiteral(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

export function buildBlogPostObject(article) {
  const body = stripDuplicateTitle(article.body, article.title);
  const contentHtml = markdownToHtml(body);
  const canonical = articleCanonicalUrl(article.slug);
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime,
    tags: article.tags,
    coverImage: article.coverImage.startsWith("http")
      ? article.coverImage
      : article.coverImage.startsWith("/")
        ? `${SITE_URL}${article.coverImage}`
        : article.coverImage,
    originalUrl: canonical,
    contentHtml,
  };
}

function renderGeneratedModule(post) {
  return `/**
 * Автогенерация из articles/${post.slug}/article.md
 * \`npm run publish -- site ${post.slug}\`
 * Не редактировать вручную.
 */
export const post = {
  slug: ${tsString(post.slug)},
  title: ${tsString(post.title)},
  description: ${tsString(post.description)},
  publishedAt: ${tsString(post.publishedAt)},
  readingTime: ${tsString(post.readingTime)},
  tags: ${tsArray(post.tags)},
  coverImage: ${tsString(post.coverImage)},
  originalUrl: ${tsString(post.originalUrl)},
  contentHtml: \`
${escapeTemplateLiteral(post.contentHtml)}
    \`,
};
`;
}

function renderIndex(slugs) {
  const imports = slugs
    .map((s, i) => `import { post as p${i} } from "./${s}.generated";`)
    .join("\n");
  const arr = slugs.map((_, i) => `p${i}`).join(", ");
  return `/**
 * Автогенерация: \`npm run publish -- site --all\`
 * Не редактировать вручную — правьте articles/<slug>/article.md
 */
${imports ? `${imports}\n` : ""}
export const GENERATED_BLOG_POSTS = [${arr}];
`;
}

export function publishSite(slug, root, { dryRun = false } = {}) {
  const article = loadArticle(slug, root);
  if (article.status !== "published" && article.status !== "draft") {
    console.warn(`warn: status=${article.status} — генерируем всё равно`);
  }
  const post = buildBlogPostObject(article);
  const exportDir = ensureExportDir(slug, root);
  const htmlPath = path.join(exportDir, "site.html");
  const modulePath = path.join(generatedDir(root), `${slug}.generated.ts`);

  const htmlDoc = `<!doctype html>
<html lang="${article.locale}">
<head>
  <meta charset="utf-8" />
  <title>${escapeAttr(post.title)}</title>
  <meta name="description" content="${escapeAttr(post.description)}" />
  <link rel="canonical" href="${post.originalUrl}" />
</head>
<body>
  <article>
    <h1>${escapeAttr(post.title)}</h1>
${post.contentHtml}
  </article>
</body>
</html>
`;

  if (dryRun) {
    console.log(`[dry-run] would write ${htmlPath}`);
    console.log(`[dry-run] would write ${modulePath}`);
    return { post, htmlPath, modulePath };
  }

  fs.writeFileSync(htmlPath, htmlDoc, "utf8");
  fs.mkdirSync(generatedDir(root), { recursive: true });
  fs.writeFileSync(modulePath, renderGeneratedModule(post), "utf8");
  rebuildIndex(root, { includeDrafts: false });

  console.log(`site: ${post.originalUrl}`);
  console.log(`  wrote ${path.relative(root, htmlPath)}`);
  console.log(`  wrote ${path.relative(root, modulePath)}`);
  if (article.status !== "published") {
    console.log(
      `  note: status=${article.status} — в index.generated попадают только status: published`,
    );
  }
  return { post, htmlPath, modulePath };
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/**
 * Rebuild index.generated.ts from on-disk *.generated.ts modules
 * whose source article is status: published (unless includeDrafts).
 */
export function rebuildIndex(root, { includeDrafts = false } = {}) {
  const genDir = generatedDir(root);
  fs.mkdirSync(genDir, { recursive: true });
  const slugs = listArticleSlugs(root).filter((slug) => {
    const mod = path.join(genDir, `${slug}.generated.ts`);
    if (!fs.existsSync(mod)) return false;
    try {
      const a = loadArticle(slug, root);
      return includeDrafts || a.status === "published";
    } catch {
      return false;
    }
  });
  const indexPath = path.join(genDir, "index.generated.ts");
  fs.writeFileSync(indexPath, renderIndex(slugs), "utf8");
  console.log(
    `index: ${path.relative(root, indexPath)} (${slugs.length} published)`,
  );
  return slugs;
}

export function publishSiteAll(root, opts) {
  const slugs = listArticleSlugs(root);
  for (const slug of slugs) {
    publishSite(slug, root, opts);
  }
  return slugs;
}
