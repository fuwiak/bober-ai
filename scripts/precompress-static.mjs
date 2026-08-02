#!/usr/bin/env node
/**
 * Precompress static dist/client files so Caddy can serve .gz/.br without
 * on-the-fly encode (lower TTFB on large HTML).
 */
import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import { createGzip, createBrotliCompress, constants as zlibConstants } from "node:zlib";
import { pipeline } from "node:stream/promises";

const ROOT = join(process.cwd(), "dist", "client");
const COMPRESS_EXT = new Set([".html", ".css", ".js", ".mjs", ".xml", ".svg", ".json", ".txt", ".webmanifest"]);
const MIN_BYTES = 1024;

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      await walk(full, out);
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

async function compressFile(src, dest, factory) {
  await pipeline(createReadStream(src), factory(), createWriteStream(dest));
  const [a, b] = await Promise.all([stat(src), stat(dest)]);
  // Keep only if meaningfully smaller.
  if (b.size >= a.size * 0.95) {
    await unlink(dest).catch(() => {});
    return false;
  }
  return true;
}

if (!existsSync(ROOT)) {
  console.warn("[precompress] dist/client missing — skip");
  process.exit(0);
}

const files = await walk(ROOT);
let gz = 0;
let br = 0;
for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!COMPRESS_EXT.has(ext)) continue;
  if (file.endsWith(".gz") || file.endsWith(".br")) continue;
  const size = (await stat(file)).size;
  if (size < MIN_BYTES) continue;

  const gzPath = `${file}.gz`;
  const brPath = `${file}.br`;
  if (await compressFile(file, gzPath, () => createGzip({ level: 9 }))) gz += 1;
  if (
    await compressFile(file, brPath, () =>
      createBrotliCompress({
        params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 5 },
      }),
    )
  ) {
    br += 1;
  }
}

console.log(`[precompress] gz=${gz} br=${br} under ${ROOT}`);
