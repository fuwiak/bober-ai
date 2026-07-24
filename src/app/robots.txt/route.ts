import { SITE_URL } from "@/lib/site";
import { yandexCleanParamLine } from "@/lib/yandex-clean-params";

export const dynamic = "force-static";

/**
 * Custom robots.txt so we can emit Yandex `Clean-param` (not supported by
 * MetadataRoute.Robots). Replaces app/robots.ts — needed for standalone deploy
 * where postbuild-static.mjs never runs.
 */
export function GET() {
  const host = new URL(SITE_URL).host;
  const body = [
    "User-Agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /partners/ru.html",
    "",
    `Host: ${host}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
    "# Ignore tracking GET params (Yandex Clean-param; Webmaster UI has no API)",
    "User-agent: Yandex",
    yandexCleanParamLine(),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
