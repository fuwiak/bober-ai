import fs from "node:fs";
import path from "node:path";
import { articlesDir } from "./config.mjs";

/**
 * Minimal YAML-ish frontmatter parser (enough for our article convention).
 * Supports: string, number, bare words, [a, b], "quoted".
 */
export function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, "");
  if (!text.startsWith("---")) {
    return { meta: {}, body: text.trim() };
  }
  const end = text.indexOf("\n---", 3);
  if (end === -1) {
    return { meta: {}, body: text.trim() };
  }
  const fm = text.slice(3, end).trim();
  const body = text.slice(end + 4).replace(/^\r?\n/, "");
  const meta = {};
  for (const line of fm.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      meta[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      continue;
    }
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    meta[key] = val;
  }
  return { meta, body: body.trim() };
}

export function listArticleSlugs(root) {
  const dir = articlesDir(root);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith(".") && !d.name.startsWith("_"))
    .map((d) => d.name)
    .filter((slug) => fs.existsSync(path.join(dir, slug, "article.md")))
    .sort();
}

export function loadArticle(slug, root) {
  const file = path.join(articlesDir(root), slug, "article.md");
  if (!fs.existsSync(file)) {
    throw new Error(`нет articles/${slug}/article.md`);
  }
  const raw = fs.readFileSync(file, "utf8");
  const { meta, body } = parseFrontmatter(raw);
  const resolvedSlug = String(meta.slug || slug).trim();
  if (resolvedSlug !== slug) {
    console.warn(
      `warn: frontmatter slug="${resolvedSlug}" ≠ папка "${slug}" — используем имя папки`,
    );
  }
  const tags = Array.isArray(meta.tags)
    ? meta.tags
    : String(meta.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

  return {
    slug,
    title: String(meta.title || slug),
    description: String(meta.description || ""),
    publishedAt: String(meta.publishedAt || new Date().toISOString().slice(0, 10)),
    readingTime: String(meta.readingTime || "5 мин"),
    tags,
    coverImage: String(meta.coverImage || "/stock/automation-code.jpg"),
    locale: String(meta.locale || "ru"),
    status: String(meta.status || "draft"),
    body,
    sourcePath: file,
  };
}

export function ensureExportDir(slug, root) {
  const dir = path.join(articlesDir(root), slug, ".export");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}
