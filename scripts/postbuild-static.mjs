import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * next-intl без middleware кладёт default locale в /ru/*.
 * Для localePrefix: as-needed копируем /ru → корень (не перезаписывая bare-роуты).
 */
const out = "out";

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

if (!existsSync(join(out, "ru.html"))) {
  console.error("postbuild-static: out/ru.html not found — skip");
  process.exit(0);
}

copyFileSync(join(out, "ru.html"), join(out, "index.html"));
if (existsSync(join(out, "ru.txt"))) {
  copyFileSync(join(out, "ru.txt"), join(out, "index.txt"));
}
mergeMissing(join(out, "ru"), out);
console.log("postbuild-static: index.html + /ru → root (missing only)");
