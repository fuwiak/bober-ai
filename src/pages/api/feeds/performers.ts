import type { APIRoute } from "astro";
import { getServiceFeedXml } from "@/lib/services-feed";

export const prerender = false;

/** Live YML for Webmaster — always fresh date + required Рейтинг / Число отзывов. */
export const GET: APIRoute = () => {
  const xml = getServiceFeedXml();
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
