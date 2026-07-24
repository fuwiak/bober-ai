#!/usr/bin/env node
/**
 * Regenerates Yandex YML feeds + unique offer pictures under public/stock/offers/.
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
    import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
    import { dirname, join } from "node:path";
    import { getServiceFeedXml, materializeFeedPictures } from "./src/lib/services-feed.ts";
    import { getBitrixFeedXml, getPartnersFeedXml } from "./src/lib/microsite-feeds.ts";
    import { BITRIX_PACKAGES } from "./src/lib/bitrix-landing.ts";

    const root = ${JSON.stringify(root)};
    writeFileSync(${JSON.stringify(mainOut)}, getServiceFeedXml(), "utf8");
    writeFileSync(${JSON.stringify(bitrixOut)}, getBitrixFeedXml(), "utf8");
    writeFileSync(${JSON.stringify(partnersOut)}, getPartnersFeedXml(), "utf8");
    const n = materializeFeedPictures(root);

    function copyOfferPic(id, picturePath) {
      const ext = picturePath.includes(".") ? picturePath.split(".").pop().toLowerCase() : "jpg";
      const src = join(root, "public", picturePath.replace(/^\\//, ""));
      const dest = join(root, "public", "stock", "offers", "ms-" + id + "." + ext);
      mkdirSync(dirname(dest), { recursive: true });
      if (!existsSync(src)) throw new Error("missing " + src);
      copyFileSync(src, dest);
    }

    for (const pkg of BITRIX_PACKAGES) copyOfferPic(pkg.id, pkg.picture);

    const partners = [
      ["partners-presale", "/stock/roadmap-sticky-notes.jpg"],
      ["partners-delivery", "/stock/team-collab.jpg"],
      ["partners-ongoing", "/stock/automation-code.jpg"],
      ["partners-bitrix-analytics", "/diagrams/crm-integration.svg"],
      ["partners-kp-docs", "/diagrams/document-flow.svg"],
    ];
    for (const [id, pic] of partners) copyOfferPic(id, pic);

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
