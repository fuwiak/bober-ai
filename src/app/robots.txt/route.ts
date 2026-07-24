import { SITE_URL } from "@/lib/site";
import { yandexCleanParamLine } from "@/lib/yandex-clean-params";

export const dynamic = "force-static";

/**
 * Custom robots.txt so we can emit Yandex `Clean-param` (not supported by
 * MetadataRoute.Robots). Replaces app/robots.ts — needed for standalone deploy
 * where postbuild-static.mjs never runs.
 *
 * Визитка: кормим всех поисковых и AI-ботов. Явные Allow для GPT/Claude/…
 * (некоторые краулеры игнорируют только `User-agent: *`).
 */
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google / Apple / Meta / Amazon
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "meta-externalagent",
  "FacebookBot",
  "Amazonbot",
  // Другие AI answer engines
  "Bytespider",
  "CCBot",
  "Diffbot",
  "cohere-ai",
  "AI2Bot",
  "YouBot",
  "DuckAssistBot",
  "MistralAI-User",
  // Российские поисковые/AI-боты (Yandex покрыт отдельной секцией ниже)
  "YandexAdditional",
  "YandexAdditionalBot",
  "PetalBot",
];

export function GET() {
  const host = new URL(SITE_URL).host;
  const aiBlocks = AI_CRAWLERS.flatMap((ua) => [
    `User-agent: ${ua}`,
    "Allow: /",
    "",
  ]);

  const body = [
    "# Bober AI — open for search engines and AI assistants (визитка).",
    "# Disallow only private API and a legacy static mirror page.",
    "User-Agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /partners/ru.html",
    "",
    ...aiBlocks,
    `Host: ${host}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `# LLM summary: ${SITE_URL}/llms.txt`,
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
