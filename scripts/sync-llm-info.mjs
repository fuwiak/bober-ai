#!/usr/bin/env node
/**
 * Sync public LLM / GEO info files from src/lib/llm-info.ts
 *
 *   node --experimental-strip-types scripts/sync-llm-info.mjs
 *   npm run info:sync
 *
 * Writes: public/info.md, public/info.txt, public/llms.txt, public/llm.txt
 */
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const mod = await import(pathToFileURL(join(ROOT, "src/lib/llm-info.ts")).href);
const { LLM_INFO_MARKDOWN, LLMS_TXT, LLM_INFO_UPDATED_AT } = mod;

const publicDir = join(ROOT, "public");
const dossier = LLM_INFO_MARKDOWN.trimEnd() + "\n";
const index = LLMS_TXT.trimEnd() + "\n";

await writeFile(join(publicDir, "info.md"), dossier, "utf8");
await writeFile(join(publicDir, "info.txt"), dossier, "utf8");
await writeFile(join(publicDir, "llms.txt"), index, "utf8");
await writeFile(join(publicDir, "llm.txt"), index, "utf8");

console.log(`Synced LLM info → public/{info.md,info.txt,llms.txt,llm.txt} (${LLM_INFO_UPDATED_AT})`);
