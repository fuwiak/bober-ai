/**
 * Public RSS feeds for RU business / Bitrix / 1C / AI / regulation topics.
 * Override with TELEGRAM_RSS_FEEDS=url1,url2
 */

import { sanitizePublicText } from "@/lib/telegram-business/research/sanitize";

export type RssItem = {
  id: string;
  title: string;
  link: string;
  summary: string;
  publishedAt: Date | null;
  source: string;
};

const DEFAULT_FEEDS = [
  "https://habr.com/ru/rss/hub/artificial_intelligence/all/?fl=ru",
  "https://habr.com/ru/rss/hub/1c_company/all/?fl=ru",
  "https://habr.com/ru/rss/hub/crm/all/?fl=ru",
  "https://www.cnews.ru/inc/rss/news.xml",
  "https://www.bitrix24.ru/about/news/rss/",
];

export function configuredRssFeeds(): string[] {
  const raw = process.env.TELEGRAM_RSS_FEEDS?.trim();
  if (raw) {
    return raw
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter((s) => s.startsWith("http"));
  }
  return DEFAULT_FEEDS;
}

function decodeXml(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, name: string): string {
  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i");
  const m = block.match(re);
  return m ? decodeXml(m[1]) : "";
}

function parseItems(xml: string, source: string): RssItem[] {
  const chunks = xml.split(/<item[\s>]/i).slice(1);
  const out: RssItem[] = [];
  for (const chunk of chunks.slice(0, 25)) {
    const title = tag(chunk, "title");
    const link = tag(chunk, "link") || tag(chunk, "guid");
    if (!title || !link.startsWith("http")) continue;
    const summary = tag(chunk, "description") || tag(chunk, "summary");
    const pub = tag(chunk, "pubDate") || tag(chunk, "published");
    const publishedAt = pub ? new Date(pub) : null;
    out.push({
      id: link,
      title: sanitizePublicText(title, 240),
      link: link.slice(0, 500),
      summary: sanitizePublicText(summary, 500),
      publishedAt:
        publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt : null,
      source,
    });
  }
  return out;
}

export async function fetchRssFeed(feedUrl: string): Promise<RssItem[]> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12_000);
  try {
    const res = await fetch(feedUrl, {
      signal: ctrl.signal,
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "User-Agent": "BoberTelegramBot/1.0 (+https://www.bober-systems.ru)",
      },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseItems(xml, feedUrl);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchAllRssItems(): Promise<RssItem[]> {
  const feeds = configuredRssFeeds();
  const batches = await Promise.all(feeds.map((f) => fetchRssFeed(f)));
  const seen = new Set<string>();
  const all: RssItem[] = [];
  for (const items of batches) {
    for (const item of items) {
      if (seen.has(item.link)) continue;
      seen.add(item.link);
      all.push(item);
    }
  }
  all.sort((a, b) => {
    const ta = a.publishedAt?.getTime() ?? 0;
    const tb = b.publishedAt?.getTime() ?? 0;
    return tb - ta;
  });
  return all;
}

/** Fresh = last N hours (default 48). */
export function filterFreshItems(items: RssItem[], maxAgeHours = 48): RssItem[] {
  const cutoff = Date.now() - maxAgeHours * 3600_000;
  return items.filter((i) => {
    if (!i.publishedAt) return true; // keep undated, ranked later by match
    return i.publishedAt.getTime() >= cutoff;
  });
}
