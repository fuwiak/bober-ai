#!/usr/bin/env node

/**
 * Статус зеркал в Яндекс Вебмастере + подсказка по «Переезду сайта».
 * Primary = config/domains.mjs CANONICAL_ORIGIN (www).
 *
 *   railway run node scripts/yandex-webmaster-mirrors.mjs
 */

import {
  APEX_ORIGIN,
  CANONICAL_APEX,
  CANONICAL_HOST,
  CANONICAL_ORIGIN,
} from "../config/domains.mjs";
import {
  apiRequest,
  getConfig,
  getHosts,
  getUserId,
  pickHost,
} from "./lib/yandex-webmaster.mjs";

const PREFERRED = CANONICAL_ORIGIN;

async function main() {
  const config = getConfig({ hostUrl: PREFERRED });
  if (!config.token) {
    console.error("Нужен YANDEX_WEBMASTER_OAUTH_TOKEN (railway run …)");
    process.exit(1);
  }

  const userId = await getUserId(config.token);
  const hosts = await getHosts(config.token, userId);
  const related = hosts.filter((h) => {
    const id = String(h.host_id || "");
    return id.includes(CANONICAL_APEX);
  });

  console.log(`Яндекс Вебмастер — зеркала (${CANONICAL_APEX} primary)\n`);

  let preferredIsMain = false;
  let otherMain = null;

  for (const h of related) {
    const { body } = await apiRequest(
      config.token,
      `/user/${userId}/hosts/${encodeURIComponent(h.host_id)}`,
    );
    const ascii = body.ascii_host_url || h.ascii_host_url;
    const main = body.main_mirror?.ascii_host_url || null;
    const isPreferred =
      String(ascii || "").includes(CANONICAL_HOST) && String(ascii || "").startsWith("https");
    const role = main ? `неглавный → главный ${main}` : "главный (или ещё не сгруппирован)";
    if (isPreferred && !main) preferredIsMain = true;
    if (isPreferred && main) otherMain = main;
    console.log(`  ${ascii}`);
    console.log(`    host_id: ${body.host_id}`);
    console.log(`    verified: ${body.verified}`);
    console.log(`    роль: ${role}`);
    console.log("");
  }

  const pickedWww = pickHost(hosts, PREFERRED);
  const pickedApex = pickHost(hosts, APEX_ORIGIN);
  console.log(`pickHost(${PREFERRED}) → ${pickedWww?.host_id || "—"}`);
  console.log(`pickHost(${APEX_ORIGIN}) → ${pickedApex?.host_id || "—"}\n`);

  const hasApex = related.some((h) => {
    const id = String(h.host_id || "");
    return id.includes(`:${CANONICAL_APEX}:`) && !id.includes(":www.");
  });
  if (!hasApex) {
    console.log(`! Apex ${APEX_ORIGIN} ещё не добавлен/не подтверждён в Вебмастере.`);
    console.log(`  1. Добавьте сайт ${APEX_ORIGIN} в Вебмастер и подтвердите права`);
    console.log("  2. Затем: Индексирование → Переезд сайта → выберите www как главное зеркало");
    console.log("");
  }

  if (preferredIsMain) {
    console.log(`✓ ${PREFERRED}/ выглядит главным в API Вебмастера.`);
    console.log("  Если в UI всё ещё баннер «неглавный адрес» — откройте главный из баннера");
    console.log("  и оставьте статистику/диагностику там, либо подождите склейки зеркал.");
  } else if (otherMain) {
    console.log(`! ${PREFERRED} сейчас неглавный → ${otherMain}`);
    console.log("  В Вебмастере: Переезд сайта / главное зеркало → выберите www.");
  } else {
    console.log("? Статус главного зеркала для www пока неясен — проверьте UI Вебмастера.");
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
