#!/usr/bin/env node
/**
 * Regenerates Yandex YML feeds + unique 320×320 offer pictures under public/stock/offers/.
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
  mkdirSync(join(root, "public", "stock", "offers"), { recursive: true });
  const inline = `
    import { writeFileSync } from "node:fs";
    import { getServiceFeedXml, materializeFeedPictures, materializeMicrositePictures } from "./src/lib/services-feed.ts";
    import { getBitrixFeedXml, getPartnersFeedXml } from "./src/lib/microsite-feeds.ts";
    import { BITRIX_PACKAGES } from "./src/lib/bitrix-landing.ts";

    const root = ${JSON.stringify(root)};
    writeFileSync(${JSON.stringify(mainOut)}, getServiceFeedXml(), "utf8");
    writeFileSync(${JSON.stringify(bitrixOut)}, getBitrixFeedXml(), "utf8");
    writeFileSync(${JSON.stringify(partnersOut)}, getPartnersFeedXml(), "utf8");
    const n = materializeFeedPictures(root);

    const microsite = [
      ...BITRIX_PACKAGES.map((pkg) => ({
        id: pkg.id,
        picture: pkg.picture.endsWith(".svg") ? "/stock/team-collab.jpg" : pkg.picture,
      })),
      { id: "partners-presale", picture: "/stock/roadmap-sticky-notes.jpg" },
      { id: "partners-delivery", picture: "/stock/team-collab.jpg" },
      { id: "partners-ongoing", picture: "/stock/automation-code.jpg" },
      { id: "partners-bitrix-analytics", picture: "/stock/team-collab.jpg" },
      { id: "partners-kp-docs", picture: "/stock/automation-code.jpg" },
    ];
    materializeMicrositePictures(root, microsite);

    console.log("generate-performers-feed: wrote", ${JSON.stringify(mainOut)}, "offers=", n);
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
