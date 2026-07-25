#!/usr/bin/env node

/**
 * Одна мини-кампания · максимальный buy/call intent.
 * Статус: AWAITING_CONFIRMATION — не запускать без явного OK.
 *
 *   npm run yandex:direct:mini-hot
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const plan = JSON.parse(readFileSync(resolve("data/direct-mini-hot-campaign.json"), "utf8"));

function log(m) {
  console.log(m);
}

log(`══ ${plan.campaign.name} ══`);
log(`Статус: ${plan.status}  (${plan.doNotLaunchUntil})\n`);
log(`Сеть:     ${plan.campaign.network}`);
log(`Бюджет:   ${plan.campaign.dailyBudgetRub} ₽/день (нед. cap ~${plan.campaign.weeklyCapRub} ₽)`);
log(`Почему не RTG сейчас: ${plan.campaign.whyNotRtgYet}\n`);

log("Цели оптимизации:");
for (const g of plan.audienceIntent.optimizeGoals) log(`  ✓ ${g}`);
log("Не оптимизировать:");
for (const g of plan.audienceIntent.doNotOptimizeOn) log(`  ✗ ${g}`);

log("\nГруппы / фразы:");
for (const g of plan.adGroups) {
  log(`\n  [${g.name}] → ${g.landing}`);
  for (const p of g.phrases) log(`    «${p.text}»  (~${p.count}/мес)`);
  for (const a of g.ads) {
    log(`    Объявление: ${a.title} | ${a.title2}`);
    log(`      ${a.text}`);
  }
}

log("\nМинус (обязательно):");
log(`  ${plan.minus.extraMust.join(", ")}`);
log(`  + файлы: ${plan.minus.files.join(", ")}`);

log("\nФаза 2 (когда Audience ≥100 ID):");
log(`  ${plan.phase2WhenAudienceReady.campaign} · ${plan.phase2WhenAudienceReady.budgetRub} ₽/день`);
log(`  INCLUDE: ${plan.phase2WhenAudienceReady.includeSegments.map((s) => s.name).join(", ")}`);

log("\nЧеклист запуска:");
for (const step of plan.launchChecklist) log(`  ${step}`);

log("\nCSV импорт: data/direct-mini-hot-phrases.csv");
log("Полный бриф: data/direct-mini-hot-campaign.json");
log("\n→ Чтобы запустить: напишите «ок, запускай» — тогда создадим в Директе (нужен Direct OAuth).");
