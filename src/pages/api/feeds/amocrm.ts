import type { APIRoute } from "astro";
import { getAmocrmFeedXml } from "@/lib/microsite-feeds";

export const prerender = false;

/** Live amoCRM YML — runtime AMOCRM_SITE_URL / CONTACT_EMAIL. */
export const GET: APIRoute = () => {
  const xml = getAmocrmFeedXml();
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
