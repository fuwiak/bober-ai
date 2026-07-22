#!/usr/bin/env node
/**
 * Regenerates Yandex YML feeds:
 * - public/performers-feed.yml (www)
 * - public/feeds/bitrix.yml (bitrix.bober-ai.dev)
 * - public/feeds/partners.yml (partners.bober-ai.dev)
 * Runs at build (postbuild) so Webmaster feeds stay in sync.
 */

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mainOut = join(root, "public", "performers-feed.yml");
const bitrixOut = join(root, "public", "feeds", "bitrix.yml");
const partnersOut = join(root, "public", "feeds", "partners.yml");

function generateWithTsx() {
  mkdirSync(dirname(bitrixOut), { recursive: true });
  const inline = `
    import { writeFileSync } from "node:fs";
    import { getServiceFeedXml } from "./src/lib/services-feed.ts";
    import { getBitrixFeedXml, getPartnersFeedXml } from "./src/lib/microsite-feeds.ts";
    writeFileSync(${JSON.stringify(mainOut)}, getServiceFeedXml(), "utf8");
    writeFileSync(${JSON.stringify(bitrixOut)}, getBitrixFeedXml(), "utf8");
    writeFileSync(${JSON.stringify(partnersOut)}, getPartnersFeedXml(), "utf8");
    console.log("generate-performers-feed: wrote", ${JSON.stringify(mainOut)});
    console.log("generate-performers-feed: wrote", ${JSON.stringify(bitrixOut)});
    console.log("generate-performers-feed: wrote", ${JSON.stringify(partnersOut)});
  `;
  const result = spawnSync(
    "npx",
    ["--yes", "tsx", "-e", inline],
    { cwd: root, encoding: "utf8", env: process.env },
  );
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout || "tsx failed");
    process.exit(result.status || 1);
  }
  if (result.stdout) process.stdout.write(result.stdout);
}

generateWithTsx();
