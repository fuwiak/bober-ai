#!/usr/bin/env node
/**
 * Отправить URL на переобход в Яндекс Вебмастере.
 *
 *   yaga webmaster recrawl https://www.bober-ai.dev/services
 *   yaga webmaster recrawl --quota
 */

import {
  getRecrawlQuota,
  resolveHostContext,
  submitRecrawl,
} from "./lib/yandex-webmaster.mjs";

async function main() {
  const args = process.argv.slice(2).filter((a) => a !== "--");
  const quotaOnly = args.includes("--quota") || args[0] === "quota";
  const urls = args.filter((a) => a !== "--quota" && a !== "quota");

  const { config, userId, host, hostId } = await resolveHostContext();
  const hostUrl = host.unicode_host_url || host.ascii_host_url || config.hostUrl;
  console.log(`Хост: ${hostUrl} (${hostId})\n`);

  const quota = await getRecrawlQuota(config.token, userId, hostId);
  console.log(
    `Квота: осталось ${quota.quota_remainder ?? quota.daily_quota_remainder ?? "?"} · суточная ${quota.daily_quota ?? "?"}`,
  );

  if (quotaOnly) {
    process.exit(0);
  }

  if (!urls.length) {
    console.error(`
Usage:
  yaga webmaster recrawl <url> [<url>…]
  yaga webmaster recrawl --quota
`);
    process.exit(2);
  }

  for (const url of urls) {
    try {
      const result = await submitRecrawl(config.token, userId, hostId, url);
      console.log(
        `✓ ${url} → task_id=${result.task_id} · квота осталась ${result.quota_remainder}`,
      );
    } catch (error) {
      console.error(`✗ ${url}: ${error.message}`);
      process.exitCode = 1;
    }
  }
}

main().catch((error) => {
  console.error(`Ошибка: ${error.message}`);
  process.exit(1);
});
