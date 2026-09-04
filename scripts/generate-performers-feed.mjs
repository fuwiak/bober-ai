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
const amocrmOut = join(root, "public", "feeds", "amocrm.yml");

function generateWithTsx() {
  mkdirSync(dirname(bitrixOut), { recursive: true });
  mkdirSync(join(root, "public", "stock", "offers"), { recursive: true });
  const inline = `
    import { writeFileSync } from "node:fs";
    import { getServiceFeedXml, materializeFeedPictures, materializeMicrositePictures } from "./src/lib/services-feed.ts";
    import { getAmocrmFeedXml, getBitrixFeedXml, getPartnersFeedXml } from "./src/lib/microsite-feeds.ts";
    import { BITRIX_PACKAGES, BITRIX_WORDSTAT_SERVICES } from "./src/lib/bitrix-landing.ts";
    import { AMOCRM_PACKAGES } from "./src/lib/amocrm-landing.ts";
    import { resolveSeoRedirect } from "./src/lib/seo-redirects.ts";

    const root = ${JSON.stringify(root)};
    writeFileSync(${JSON.stringify(mainOut)}, getServiceFeedXml(), "utf8");
    writeFileSync(${JSON.stringify(bitrixOut)}, getBitrixFeedXml(), "utf8");
    writeFileSync(${JSON.stringify(partnersOut)}, getPartnersFeedXml(), "utf8");
    writeFileSync(${JSON.stringify(amocrmOut)}, getAmocrmFeedXml(), "utf8");

    for (const [label, xml] of [
      ["main", getServiceFeedXml()],
      ["bitrix", getBitrixFeedXml()],
      ["partners", getPartnersFeedXml()],
      ["amocrm", getAmocrmFeedXml()],
    ]) {
      if (xml.includes("bober-ai.dev")) {
        throw new Error(\`\${label} feed still contains bober-ai.dev — check PUBLIC_SITE_URL / domains.mjs\`);
      }
      if (!xml.includes("bober-systems.ru")) {
        throw new Error(\`\${label} feed missing bober-systems.ru\`);
      }
      const notes = [...xml.matchAll(new RegExp("<sales_notes>([^<]*)</sales_notes>", "g"))].map((m) => m[1]);
      const bad = notes.filter((n) => n.length > 50);
      if (bad.length) {
        throw new Error(\`\${label} feed: sales_notes >50 chars: \${bad.slice(0, 3).join(" | ")}\`);
      }
      const offerCount = (xml.match(/<offer[\\s>]/g) || []).length;
      const setCount = (xml.match(/<set[\\s>]/g) || []).length;
      if (label === "main") {
        if (offerCount < 25) {
          throw new Error(\`main feed: Yandex quality needs ≥25 offers/sets in search, got offers=\${offerCount}\`);
        }
        if (setCount < 25) {
          throw new Error(\`main feed: Yandex quality needs ≥25 sets, got \${setCount}\`);
        }
        const urls = [...xml.matchAll(/<url>([^<]+)<\\/url>/g)].map((m) => {
          try { return new URL(m[1]).pathname.replace(/\\/$/, "") || "/"; } catch { return ""; }
        }).filter(Boolean);
        const redirected = [...new Set(urls.filter((p) => resolveSeoRedirect(p)))];
        if (redirected.length) {
          throw new Error(\`main feed has 301 URLs (not in search): \${redirected.slice(0, 8).join(", ")}\`);
        }
      }
    }

    const n = materializeFeedPictures(root);

    const microsite = [
      ...BITRIX_WORDSTAT_SERVICES.map((s) => ({
        id: s.id,
        picture: "/stock/office-tower.jpg",
      })),
      ...BITRIX_PACKAGES.map((pkg) => ({
        id: pkg.id,
        picture: pkg.picture.endsWith(".svg") ? "/stock/team-collab.jpg" : pkg.picture,
      })),
      { id: "partners-presale", picture: "/stock/roadmap-sticky-notes.jpg" },
      { id: "partners-delivery", picture: "/stock/team-collab.jpg" },
      { id: "partners-ongoing", picture: "/stock/automation-code.jpg" },
      { id: "partners-bitrix-analytics", picture: "/stock/team-collab.jpg" },
      { id: "partners-kp-docs", picture: "/stock/automation-code.jpg" },
      ...AMOCRM_PACKAGES.map((pkg) => ({
        id: pkg.id,
        picture: pkg.picture.endsWith(".svg") ? "/stock/document-processing.jpg" : pkg.picture,
      })),
    ];
    materializeMicrositePictures(root, microsite);

    console.log("generate-performers-feed: wrote", ${JSON.stringify(mainOut)}, "offers=", n);
    console.log("generate-performers-feed: wrote", ${JSON.stringify(bitrixOut)});
    console.log("generate-performers-feed: wrote", ${JSON.stringify(partnersOut)});
    console.log("generate-performers-feed: wrote", ${JSON.stringify(amocrmOut)});
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
