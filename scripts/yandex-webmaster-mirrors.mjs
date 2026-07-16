#!/usr/bin/env node

/**
 * Статус зеркал bober-ai.dev в Яндекс Вебмастере + подсказка по «Переезду сайта».
 *
 *   railway run node scripts/yandex-webmaster-mirrors.mjs
 */

import {
  apiRequest,
  getConfig,
  getHosts,
  getUserId,
  pickHost,
} from "./lib/yandex-webmaster.mjs";

const PREFERRED = "https://www.bober-ai.dev";

async function main() {
  const config = getConfig({ hostUrl: PREFERRED });
  if (!config.token) {
    console.error("Нужен YANDEX_WEBMASTER_OAUTH_TOKEN (railway run …)");
    process.exit(1);
  }

  const userId = await getUserId(config.token);
  const hosts = await getHosts(config.token, userId);
  const related = hosts.filter((h) => String(h.host_id || "").includes("bober-ai"));

  console.log("Яндекс Вебмастер — зеркала bober-ai.dev\n");

  let preferredIsMain = false;
  let otherMain = null;

  for (const h of related) {
    const { body } = await apiRequest(
      config.token,
      `/user/${userId}/hosts/${encodeURIComponent(h.host_id)}`,
    );
    const ascii = body.ascii_host_url || h.ascii_host_url;
    const main = body.main_mirror?.ascii_host_url || null;
    const isPreferred = String(ascii || "").includes("www.bober-ai.dev") && String(ascii || "").startsWith("https");
    const role = main ? `неглавный → главный ${main}` : "главный (или ещё не сгруппирован)";
    if (isPreferred && !main) preferredIsMain = true;
    if (isPreferred && main) otherMain = main;
    console.log(`  ${ascii}`);
    console.log(`    host_id: ${body.host_id}`);
    console.log(`    verified: ${body.verified}`);
    console.log(`    роль: ${role}`);
    console.log("");
  }

  const picked = pickHost(hosts, PREFERRED);
  console.log(`pickHost(${PREFERRED}) → ${picked?.host_id || "—"}\n`);

  if (preferredIsMain) {
    console.log("✓ https://www.bober-ai.dev выглядит главным в API Вебмастера.");
    console.log("  Если в UI всё ещё баннер «неглавный адрес» — откройте главный из баннера");
    console.log("  и оставьте статистику/диагностику там, либо подождите склейки зеркал.");
  } else {
    console.log("! Нужно сделать www главным через UI Вебмастера:");
    console.log(`  1. Откройте ГЛАВНЫЙ адрес${otherMain ? ` (${otherMain})` : " (без www)"}`);
    console.log("  2. Индексирование → Переезд сайта");
    console.log("  3. Включите «Добавить WWW» → Сохранить");
    console.log("  4. Убедитесь, что с bober-ai.dev идёт HTTP 301 на www (не 308)");
    console.log("  https://webmaster.yandex.ru/site/indexing/mirrors/");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
