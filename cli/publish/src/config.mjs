import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.PUBLISH_SITE_URL ||
  "https://www.bober-ai.dev"
).replace(/\/$/, "");

export const MEDIUM_IMPORT_URL =
  process.env.MEDIUM_IMPORT_URL || "https://medium.com/me/import";

export const HABR_CREATE_URL =
  process.env.HABR_CREATE_URL || "https://habr.com/ru/articles/create/";

export const HABR_SANDBOX_URL =
  process.env.HABR_SANDBOX_URL || "https://habr.com/ru/sandbox/start/";

export function repoRoot() {
  if (process.env.PUBLISH_REPO) return path.resolve(process.env.PUBLISH_REPO);
  // cli/publish/src → repo root
  return path.resolve(__dirname, "../../..");
}

export function articlesDir(root = repoRoot()) {
  return path.join(root, "articles");
}

export function generatedDir(root = repoRoot()) {
  return path.join(root, "src/content/articles");
}

export function articleCanonicalUrl(slug) {
  return `${SITE_URL}/blog/${slug}`;
}
