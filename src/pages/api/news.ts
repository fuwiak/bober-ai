import type { APIRoute } from "astro";
import { getCachedDigest, kickoffRefresh, startNewsScheduler } from "@/lib/news-scheduler";

export const prerender = false;

/** Live news digest JSON for /news auto-refresh (Next NewsAutoRefresh parity). */
export const GET: APIRoute = async () => {
  startNewsScheduler();
  kickoffRefresh();
  try {
    const digest = await getCachedDigest();
    return new Response(JSON.stringify(digest), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "news_unavailable";
    return new Response(JSON.stringify({ ok: false, error: message, items: [], generatedAt: null }), {
      status: 503,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }
};
