#!/usr/bin/env node

/**
 * Микро-Direct: план Search (high intent) + ретаргетинг.
 * Фразы проверены Wordstat — см. data/micro-direct-plan.json
 *
 *   npm run yandex:direct:micro
 *   npm run yandex:direct:micro -- --status
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const planPath = resolve("data/micro-direct-plan.json");
const csvPath = resolve("data/direct-micro-campaign-search.csv");

function log(msg) {
  console.log(msg);
}

function main() {
  const plan = JSON.parse(readFileSync(planPath, "utf8"));
  const csv = readFileSync(csvPath, "utf8").trim().split(/\n/).slice(1);

  log("Микро-Direct · Wordstat-validated\n");
  log(`Бюджет: Search ${plan.dailyBudgetRub.search} ₽/день + RTG ${plan.dailyBudgetRub.retargeting} ₽/день (cap ${plan.dailyBudgetRub.totalCap})`);
  log(`CSV: ${csvPath}`);
  log(`Minus: data/direct-minus.txt + data/direct-micro-minus.txt\n`);

  log("══ Вердикты по вашим фразам ══");
  for (const row of plan.wordstat.userPhrases) {
    log(`  ${row.verdict.padEnd(14)}  ${row.phrase}`);
    log(`                 ${row.evidence}`);
  }

  log("\n══ Не брать в Search (широко / шум) ══");
  for (const row of plan.wordstat.rejectedBroad) {
    log(`  skip  ${row.count}  ${row.phrase} — ${row.why}`);
  }

  log("\n══ Кампания 1 · Search only ══");
  log(`  ${plan.campaign1Search.name}`);
  log(`  Сеть: ${plan.campaign1Search.network}`);
  log(`  Цели оптимизации: ${plan.campaign1Search.optimizeGoals.join(", ")}`);
  log(`  НЕ оптимизировать: ${plan.campaign1Search.doNotOptimizeOn.join(", ")}`);
  log("  Фразы:");
  for (const line of csv) {
    const parts = line.split(",");
    // group,match,phrase,count,intent,landing,note — phrase may be quoted
    const m = line.match(/^([^,]+),([^,]+),"?([^"]+)"?,(\d+),([^,]+),([^,]+),(.+)$/);
    if (!m) continue;
    log(`    ${m[4].padStart(4)}  [${m[1]}]  «${m[3]}» → ${m[6]}`);
  }

  log("\n══ Кампания 2 · Retargeting ══");
  log(`  ${plan.campaign2Retargeting.name}`);
  log(`  Сеть: ${plan.campaign2Retargeting.network}`);
  for (const s of plan.campaign2Retargeting.segments) {
    log(`    • ${s.id}: ${s.metrika}`);
  }
  log("  UI:");
  for (const step of plan.campaign2Retargeting.ui) log(`    → ${step}`);

  if (args.includes("--status")) {
    log("\n══ Direct API status ══");
    log("  Запуск: npm run yandex:direct:campaigns -- status");
    log("  Создание ЕПК (не то же, что Search+RTG): npm run yandex:direct:campaigns -- create-unified --dry-run --budget-rub=800");
    log("  Группы/ключи Search и Audience RTG — в UI Директа по CSV выше.");
  }

  log("\nГотово. Импорт фраз: data/direct-micro-campaign-search.csv");
}

main();
