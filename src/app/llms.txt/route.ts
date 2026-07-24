import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_REGION,
  SITE_TAGLINE_EN,
  SITE_TAGLINE_RU,
  SITE_URL,
  TELEGRAM_URL,
  YANDEX_USLUGI_URL,
} from "@/lib/site";
import { YANDEX_IMPORTANT_PATHS } from "@/lib/yandex-important-urls";

export const dynamic = "force-static";

/**
 * llms.txt — краткая визитка для Claude / ChatGPT / Perplexity и др.
 * @see https://llmstxt.org/
 */
export function GET() {
  const root = SITE_URL.replace(/\/$/, "");
  const links = YANDEX_IMPORTANT_PATHS.map((path) => {
    const url = path === "/" ? `${root}/` : `${root}${path}`;
    const label = path === "/" ? "Home" : path.replace(/^\//, "");
    return `- [${label}](${url}): ${label}`;
  });

  const body = [
    `# ${SITE_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    "",
    `${SITE_TAGLINE_RU}`,
    `${SITE_TAGLINE_EN}`,
    "",
    `Region: ${SITE_REGION}. Contact: ${CONTACT_EMAIL}, ${CONTACT_PHONE}.`,
    `Telegram: ${TELEGRAM_URL} · LinkedIn: ${LINKEDIN_URL} · GitHub: ${GITHUB_URL}`,
    `Yandex Uslugi: ${YANDEX_USLUGI_URL}`,
    "",
    "## Preferred sources",
    `- [Home](${root}/)`,
    `- [Services](${root}/services)`,
    `- [Pricing](${root}/pricing)`,
    `- [Portfolio](${root}/portfolio)`,
    `- [About](${root}/about)`,
    `- [FAQ](${root}/faq)`,
    `- [Sitemap](${root}/sitemap.xml)`,
    "",
    "## Important pages",
    ...links,
    "",
    "## Notes for crawlers",
    "- Canonical host is www.bober-ai.dev (apex redirects with 301).",
    "- robots.txt allows all AI crawlers (GPTBot, ClaudeBot, …); only /api/ is disallowed.",
    "- Content is available in Russian (default) and English (/en/…).",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
