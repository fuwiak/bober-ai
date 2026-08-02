#!/usr/bin/env node

/**
 * Print Direct offer campaign drafts — NO API spend.
 *
 *   npm run yandex:direct:offer-drafts
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const plan = JSON.parse(readFileSync(resolve("data/direct-offer-campaigns.json"), "utf8"));

function log(m) {
  console.log(m);
}

log(`══ Direct offer drafts ══`);
log(`Статус: ${plan.status}`);
log(`Не запускать пока: ${plan.doNotLaunchUntil}\n`);
log(
  `Ёмкость: ${plan.goalCapacity.clientsPerMonth} клиентов/мес · ticket ${plan.goalCapacity.ticketRub} · pipeline ${plan.goalCapacity.pipelineTargetRub}`,
);
log(
  `Бюджет/день: docs ${plan.dailyBudgetRub.documents1c} + bitrix ${plan.dailyBudgetRub.bitrix24} + kp ${plan.dailyBudgetRub.proposalsSales} + rtg ${plan.dailyBudgetRub.remarketing} = ${plan.dailyBudgetRub.totalCap} ₽\n`,
);

log("Правила:");
log(`  Сеть: ${plan.rules.network}`);
log(`  Автотаргетинг: ${plan.rules.autotargeting}`);
log(`  Авторекомендации: ${plan.rules.autoRecommendations}`);
log(`  Оптимизация: ${plan.rules.optimizeGoals.join(", ")}`);
log(`  Не оптимизировать: ${plan.rules.doNotOptimizeOn.join(", ")}`);
log(`  Минус: ${plan.rules.extraMinus.join(", ")}`);
log(`  + файлы: ${plan.rules.minusFiles.join(", ")}\n`);

for (const c of plan.campaigns) {
  log(`── ${c.name} · ${c.dailyBudgetRub} ₽/день`);
  log(`   Landing: ${c.landing}`);
  if (c.altLanding) log(`   Alt:     ${c.altLanding}`);
  for (const p of c.phrases) {
    const vol = p.count != null ? ` (~${p.count})` : "";
    log(`   «${p.text}»${vol}`);
  }
  for (const a of c.ads) {
    log(`   Ad: ${a.title} | ${a.title2}`);
    log(`       ${a.text}`);
  }
  log("");
}

log(`Remarketing: ${plan.remarketing.name} · ${plan.remarketing.dailyBudgetRub} ₽ — ${plan.remarketing.when}`);
log(`Deferred: ${plan.deferredTest.name} — ${plan.deferredTest.note}\n`);

log("Еженедельно:");
for (const step of plan.weeklyOps) log(`  • ${step}`);

log("\nПолный бриф: data/direct-offer-campaigns.json");
log("Создать ЕПК в API (отдельно, с --dry-run): npm run yandex:direct:campaigns -- create-unified --dry-run");
log("→ Spend только после явного «ок, запускай».");
