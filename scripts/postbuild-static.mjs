import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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
console.log("postbuild-static: index.html + /ru → root (missing only)");
