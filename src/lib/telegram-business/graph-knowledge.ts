/**
 * Public product/architecture knowledge for Telegram bot.
 *
 * Railway has NO graphify CLI and usually NO full graphify-out/.
 * We ship a sanitized snapshot at data/telegram-public-knowledge.md
 * (and optionally query live `graphify` when the binary exists locally).
 *
 * Never inject secrets / .env / private IPs / other clients' PII.
 */

import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { sanitizePublicText } from "@/lib/telegram-business/research/sanitize";

const GRAPHIFY_TIMEOUT_MS = 8_000;
const SNAPSHOT_MAX = 6_000;

let snapshotCache: { at: number; text: string } | null = null;

async function loadPackagedSnapshot(): Promise<string> {
  const now = Date.now();
  if (snapshotCache && now - snapshotCache.at < 10 * 60_000) {
    return snapshotCache.text;
  }
  const candidates = [
    join(process.cwd(), "data/telegram-public-knowledge.md"),
    join(process.cwd(), "dist/client/../data/telegram-public-knowledge.md"),
    join(process.cwd(), "public/telegram-public-knowledge.md"),
  ];
  for (const path of candidates) {
    try {
      const raw = await readFile(path, "utf8");
      const text = sanitizePublicText(raw, SNAPSHOT_MAX);
      snapshotCache = { at: now, text };
      return text;
    } catch {
      /* try next */
    }
  }
  snapshotCache = { at: now, text: "" };
  return "";
}

function scoreChunk(chunk: string, terms: string[]): number {
  const lower = chunk.toLowerCase();
  let score = 0;
  for (const t of terms) {
    if (t.length < 3) continue;
    if (lower.includes(t)) score += 1;
  }
  return score;
}

/** Keyword search over packaged snapshot (Railway-safe). */
export async function searchPackagedKnowledge(
  query: string,
  maxChars = 2200,
): Promise<string> {
  const snap = await loadPackagedSnapshot();
  if (!snap) return "";
  const terms = query
    .toLowerCase()
    .split(/[^\p{L}\p{N}+]+/u)
    .filter((t) => t.length >= 3)
    .slice(0, 12);
  if (!terms.length) return sanitizePublicText(snap.slice(0, maxChars), maxChars);

  const chunks = snap.split(/\n(?=## )/);
  const ranked = chunks
    .map((c) => ({ c, s: scoreChunk(c, terms) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);

  if (!ranked.length) {
    return sanitizePublicText(snap.slice(0, Math.min(1200, maxChars)), maxChars);
  }
  let out = "";
  for (const { c } of ranked) {
    if (out.length >= maxChars) break;
    out += (out ? "\n\n" : "") + c.trim();
  }
  return sanitizePublicText(out, maxChars);
}

function runGraphifyCli(args: string[]): Promise<string | null> {
  return new Promise((resolve) => {
    const child = spawn("graphify", args, {
      cwd: process.cwd(),
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      resolve(null);
    }, GRAPHIFY_TIMEOUT_MS);
    child.stdout.on("data", (b) => {
      stdout += String(b);
    });
    child.stderr.on("data", (b) => {
      stderr += String(b);
    });
    child.on("error", () => {
      clearTimeout(timer);
      resolve(null);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code !== 0 && !stdout.trim()) {
        resolve(null);
        return;
      }
      resolve(stdout || stderr);
    });
  });
}

/**
 * Prefer live graphify CLI when available (dev); else packaged snapshot.
 * Output always sanitized — whitelist public product/architecture facts only.
 */
export async function queryGraphKnowledge(question: string): Promise<{
  text: string;
  source: "graphify-cli" | "packaged" | "none";
}> {
  const live = await runGraphifyCli([
    "query",
    question.slice(0, 200),
    "--budget",
    "800",
  ]);
  if (live && live.trim().length > 40) {
    // Drop node dump noise; keep readable lines
    const cleaned = live
      .split("\n")
      .filter((line) => {
        const l = line.toLowerCase();
        if (l.includes("password") || l.includes("token") || l.includes(".env")) {
          return false;
        }
        if (l.includes("community=") && l.includes("htmx")) return false;
        return true;
      })
      .join("\n");
    const text = sanitizePublicText(cleaned, 2200);
    if (text.length > 80) return { text, source: "graphify-cli" };
  }

  const packaged = await searchPackagedKnowledge(question, 2200);
  if (packaged) return { text: packaged, source: "packaged" };
  return { text: "", source: "none" };
}
