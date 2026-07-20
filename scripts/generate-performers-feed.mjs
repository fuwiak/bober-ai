#!/usr/bin/env node
/**
 * Regenerates public/performers-feed.yml from src/lib/services-feed.ts.
 * Runs at build (postbuild) so the Yandex performers feed stays in sync.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "performers-feed.yml");

function generateWithTsx() {
  const inline = `
    import { writeFileSync } from "node:fs";
    import { getServiceFeedXml } from "./src/lib/services-feed.ts";
    writeFileSync(${JSON.stringify(outPath)}, getServiceFeedXml(), "utf8");
    console.log("generate-performers-feed: wrote", ${JSON.stringify(outPath)});
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
