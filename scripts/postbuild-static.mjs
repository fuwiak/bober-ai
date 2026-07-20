import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

/**
 * next-intl без middleware кладёт default locale в /ru/*.
 * Для localePrefix: as-needed копируем /ru → корень (не перезаписывая bare-роуты).
 */
const out = "out";

/** Tracking params ignored by Yandex (Webmaster GET-params / Clean-param). No public API for Webmaster UI. */
const YANDEX_CLEAN_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid",
  "fbclid",
  "gclid",
  "_openstat",
];

function mergeMissing(src, dest) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const name of readdirSync(src)) {
    const from = join(src, name);
    const to = join(dest, name);
    if (statSync(from).isDirectory()) {
      mergeMissing(from, to);
    } else if (!existsSync(to)) {
      copyFileSync(from, to);
    }
  }
}

function ensureYandexCleanParams() {
  const robotsPath = join(out, "robots.txt");
  if (!existsSync(robotsPath)) return;
  let text = readFileSync(robotsPath, "utf8");
  if (/Clean-param:/i.test(text)) return;
  const block = [
    "",
    "# Ignore tracking GET params (Yandex Clean-param; Webmaster UI has no API)",
    "User-agent: Yandex",
    `Clean-param: ${YANDEX_CLEAN_PARAMS.join("&")}`,
    "",
  ].join("\n");
  writeFileSync(robotsPath, `${text.trimEnd()}\n${block}`);
  console.log("postbuild-static: robots.txt Clean-param for Yandex");
}

function ensureSecurityTxt() {
  const src = join("public", ".well-known", "security.txt");
  const destDir = join(out, ".well-known");
  const dest = join(destDir, "security.txt");
  if (!existsSync(src)) return;
  mkdirSync(destDir, { recursive: true });
  if (!existsSync(dest)) {
    copyFileSync(src, dest);
    console.log("postbuild-static: copied .well-known/security.txt");
  }
}

function regeneratePerformersFeed() {
  const result = spawnSync(process.execPath, [join("scripts", "generate-performers-feed.mjs")], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: process.env,
  });
  if (result.status !== 0) {
    console.warn("postbuild-static: performers-feed regenerate failed:", result.stderr || result.stdout);
    return;
  }
  const feedSrc = join("public", "performers-feed.yml");
  const feedDest = join(out, "performers-feed.yml");
  if (existsSync(feedSrc)) {
    copyFileSync(feedSrc, feedDest);
    console.log("postbuild-static: performers-feed.yml → out/");
  }
}

if (!existsSync(join(out, "ru.html"))) {
  console.error("postbuild-static: out/ru.html not found — skip");
  process.exit(0);
}

copyFileSync(join(out, "ru.html"), join(out, "index.html"));
if (existsSync(join(out, "ru.txt"))) {
  copyFileSync(join(out, "ru.txt"), join(out, "index.txt"));
}
mergeMissing(join(out, "ru"), out);
ensureYandexCleanParams();
ensureSecurityTxt();
regeneratePerformersFeed();
console.log("postbuild-static: index.html + /ru → root (missing only)");
