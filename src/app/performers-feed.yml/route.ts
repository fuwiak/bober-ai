import { getServiceFeedXml } from "@/lib/services-feed";

export function GET() {
  return new Response(getServiceFeedXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
