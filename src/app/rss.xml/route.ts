import { FRESH_RSS_PATH, getFreshRssXml } from "@/lib/fresh-rss";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

/** Yandex Webmaster «Свежее и актуальное» — RSS 2.0 + yandex:full-text. */
export async function GET() {
  const xml = getFreshRssXml();
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Content-Type-Options": "nosniff",
      "X-Feed-Path": FRESH_RSS_PATH,
    },
  });
}
