import { getServiceFeedXml } from "@/lib/services-feed";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Live YML for Webmaster — always fresh date + required Рейтинг / Число отзывов. */
export async function GET() {
  const xml = getServiceFeedXml();
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
