/**
 * Per-URL last-modified dates from git history of the source files behind a route.
 *
 * Shared by generate-sitemap.mjs (<lastmod>) and inject-page-dates.mjs
 * (schema.org dateModified) so both report the same date for the same URL.
 * Build mtime is only a fallback: every dist file is fresh on every build.
 */
import { spawnSync } from "node:child_process";
import { accessSync, constants } from "node:fs";
import { stat } from "node:fs/promises";
import { join, relative } from "node:path";

/** Map URL → source files whose git dates drive lastmod (not dist build mtime). */
export function sourceFilesForPath(path) {
  const files = [];
  const pageIndex = join(process.cwd(), "src/pages", path === "/" ? "index.astro" : `${path.slice(1)}/index.astro`);
  const pageFile = join(process.cwd(), "src/pages", `${path.slice(1)}.astro`);
  for (const f of [pageIndex, pageFile]) {
    try {
      accessSync(f, constants.R_OK);
      files.push(f);
    } catch {
      /* missing */
    }
  }
  if (path.startsWith("/services/")) {
    files.push(
      join(process.cwd(), "src/lib/seo-services-content.ts"),
      join(process.cwd(), "src/lib/enterprise-services.ts"),
    );
  } else if (
    path.startsWith("/automation/") ||
    path.startsWith("/integrations/") ||
    path.startsWith("/solutions/") ||
    path.startsWith("/industries/") ||
    path.startsWith("/ai/")
  ) {
    files.push(
      join(process.cwd(), "src/lib/seo-catalog/landing-specs.ts"),
      join(process.cwd(), "src/lib/seo-catalog/landing-specs-intent.ts"),
      join(process.cwd(), "src/lib/seo-catalog/landing-specs-priority.ts"),
      join(process.cwd(), "src/lib/landing-pages.ts"),
    );
  } else if (path === "/automation") {
    files.push(join(process.cwd(), "src/lib/automation-page.ts"));
  } else if (path === "/bitrix") {
    files.push(join(process.cwd(), "src/lib/bitrix-landing.ts"));
  } else if (path === "/kaspersky") {
    files.push(join(process.cwd(), "src/lib/kaspersky-page.ts"));
  } else if (path === "/" || path === "/pricing" || path === "/about") {
    files.push(join(process.cwd(), "src/content/ru.ts"));
  } else if (path.startsWith("/portfolio/")) {
    files.push(join(process.cwd(), "src/lib/profile.ts"));
  } else if (path.startsWith("/blog/")) {
    files.push(join(process.cwd(), "src/lib/blog-posts.ts"));
  }
  return files;
}

export function gitLastmod(files) {
  let best = null;
  for (const file of files) {
    const rel = relative(process.cwd(), file);
    const r = spawnSync("git", ["log", "-1", "--format=%cs", "--", rel], {
      encoding: "utf8",
      cwd: process.cwd(),
    });
    const d = (r.stdout || "").trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d) && (!best || d > best)) best = d;
  }
  return best;
}

export async function lastmodForPath(path, distFile) {
  const fromGit = gitLastmod(sourceFilesForPath(path));
  if (fromGit) return fromGit;
  try {
    return (await stat(distFile)).mtime.toISOString().slice(0, 10);
  } catch {
    return null;
  }
}
