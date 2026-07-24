#!/usr/bin/env node
/**
 * «Самостоятельные проверки» Яндекс Вебмастера (21 пункт).
 *
 *   yaga webmaster selfcheck
 *   npm run webmaster:selfcheck
 */

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const MARK = { done: "✓", partial: "~", manual: "!", na: "·" };

function loadChecks() {
  const result = spawnSync(
    "npx",
    [
      "--yes",
      "tsx",
      "-e",
      `import { YANDEX_SELF_CHECKS, selfCheckSummary } from "./src/lib/yandex-self-checks.ts";
       console.log(JSON.stringify({ items: YANDEX_SELF_CHECKS, summary: selfCheckSummary() }));`,
    ],
    { cwd: root, encoding: "utf8", env: process.env },
  );
  if (result.status !== 0 || !result.stdout.trim()) {
    throw new Error(result.stderr || "Не удалось загрузить yandex-self-checks.ts");
  }
  const line = result.stdout.trim().split("\n").filter(Boolean).pop();
  return JSON.parse(line);
}

function loadQueryGroups() {
  try {
    const raw = readFileSync(join(root, "data/yandex-target-queries.json"), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function main() {
  const { items, summary } = loadChecks();
  const queries = loadQueryGroups();

  console.log("Яндекс Вебмастер · Самостоятельные проверки (21)\n");
  console.log(
    `Итого: ✓ done=${summary.done}  ~ partial=${summary.partial}  ! manual=${summary.manual}  · n/a=${summary.na}\n`,
  );

  for (const [i, item] of items.entries()) {
    const mark = MARK[item.status] || "?";
    console.log(`${String(i + 1).padStart(2)}. ${mark} ${item.title}`);
    if (item.evidence) console.log(`      ${item.evidence}`);
    if (item.action) console.log(`      → ${item.action}`);
  }

  if (queries?.groups?.length) {
    console.log("\n══ Целевые запросы (группы → посадочные) ══");
    for (const g of queries.groups) {
      console.log(`\n${g.title}`);
      console.log(`  запросы: ${g.queries.slice(0, 4).join(" · ")}${g.queries.length > 4 ? "…" : ""}`);
      console.log(`  лендинги: ${g.landings.join(" · ")}`);
    }
    console.log(`\nФайл: data/yandex-target-queries.json`);
  }

  console.log(`
══ Что осталось вручную ══
  ! Уведомления Вебмастера (Настройки → Уведомления)
  ~ Рост страниц в поиске (сейчас ~36 / sitemap ~421) — IndexNow + boost
  ~ Обогащённые ответы — фид SERVICES уже в API; оферту смотреть в UI
  ! Деплой: убрать AggregateRating=0 с прода (PerformerRating + seo.ts уже в коде)
`);
}

main();
