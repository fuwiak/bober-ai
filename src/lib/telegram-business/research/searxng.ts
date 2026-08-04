/**
 * SearXNG JSON search for Telegram bot research.
 * Set SEARXNG_URL (e.g. https://searxng-xxx.up.railway.app).
 */

import { sanitizePublicText } from "@/lib/telegram-business/research/sanitize";

export type SearxHit = {
  title: string;
  url: string;
  content: string;
};

function searxBase(): string | null {
  const raw = process.env.SEARXNG_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}

export async function searchSearxng(
  query: string,
  opts?: { limit?: number; language?: string },
): Promise<{ hits: SearxHit[]; error?: string }> {
  const base = searxBase();
  if (!base) return { hits: [], error: "SEARXNG_URL missing" };

  const limit = Math.min(8, Math.max(1, opts?.limit ?? 5));
  const url = new URL(`${base}/search`);
  url.searchParams.set("q", query.slice(0, 240));
  url.searchParams.set("format", "json");
  url.searchParams.set("language", opts?.language || "ru-RU");
  url.searchParams.set("categories", "general,news");

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12_000);
  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: ctrl.signal,
    });
    if (!res.ok) {
      return { hits: [], error: `searx HTTP ${res.status}` };
    }
    const json = (await res.json()) as {
      results?: { title?: string; url?: string; content?: string }[];
    };
    const hits: SearxHit[] = (json.results || [])
      .slice(0, limit)
      .map((r) => ({
        title: sanitizePublicText(String(r.title || ""), 200),
        url: String(r.url || "").slice(0, 500),
        content: sanitizePublicText(String(r.content || ""), 400),
      }))
      .filter((h) => h.url.startsWith("http") && h.title);
    return { hits };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { hits: [], error: msg.slice(0, 160) };
  } finally {
    clearTimeout(timer);
  }
}

export function formatSearxHitsForPrompt(hits: SearxHit[], maxChars = 1600): string {
  if (!hits.length) return "";
  const lines = hits.map(
    (h, i) => `${i + 1}. ${h.title}\n   ${h.url}\n   ${h.content}`,
  );
  return sanitizePublicText(lines.join("\n"), maxChars);
}
