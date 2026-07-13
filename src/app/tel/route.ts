import { CONTACT_PHONE } from "@/lib/site";

export function GET() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: `tel:${CONTACT_PHONE}`,
      "Cache-Control": "no-store",
    },
  });
}
