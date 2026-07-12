import { getServiceFeedXml } from "@/lib/services-feed";

export function GET() {
  return new Response(getServiceFeedXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
