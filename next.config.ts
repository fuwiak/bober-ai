import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  async rewrites() {
    // Always serve generated YML (not a stale static snapshot) for Webmaster moderation.
    return [{ source: "/performers-feed.yml", destination: "/api/feeds/performers" }];
  },
  async redirects() {
    return [
      {
        // Explicit 301 (not Next default 308) — Яндекс учитывает 301/302 при выборе главного зеркала.
        source: "/:path*",
        has: [{ type: "host", value: "bober-ai.dev" }],
        destination: "https://www.bober-ai.dev/:path*",
        statusCode: 301,
      },
      { source: "/services/ai-bot-llm-rasa-n8n", destination: "/services/enterprise-ai-assistant", permanent: true },
      { source: "/services/llm-ai-consultation", destination: "/services/ai-discovery-roadmap", permanent: true },
      { source: "/services/ai-bot-gigachat-n8n-local", destination: "/services/private-llm-gigachat", permanent: true },
      { source: "/services/ml-data-consultation", destination: "/services/ai-discovery-roadmap", permanent: true },
      { source: "/services/telegram-discord-miniapp-bot", destination: "/services/enterprise-ai-assistant", permanent: true },
      { source: "/services/claude-business-automation", destination: "/services/business-process-automation", permanent: true },
      { source: "/services/ai-kp-agent", destination: "/services/sales-ai-agent", permanent: true },
      { source: "/en/services/ai-bot-llm-rasa-n8n", destination: "/en/services/enterprise-ai-assistant", permanent: true },
      { source: "/en/services/llm-ai-consultation", destination: "/en/services/ai-discovery-roadmap", permanent: true },
      { source: "/en/services/ai-bot-gigachat-n8n-local", destination: "/en/services/private-llm-gigachat", permanent: true },
      { source: "/en/services/ml-data-consultation", destination: "/en/services/ai-discovery-roadmap", permanent: true },
      { source: "/en/services/telegram-discord-miniapp-bot", destination: "/en/services/enterprise-ai-assistant", permanent: true },
      { source: "/en/services/claude-business-automation", destination: "/en/services/business-process-automation", permanent: true },
      { source: "/en/services/ai-kp-agent", destination: "/en/services/sales-ai-agent", permanent: true },
      { source: "/automation/business-processes", destination: "/automation/processes", permanent: true },
      { source: "/en/automation/business-processes", destination: "/en/automation/processes", permanent: true },
      { source: "/automation/crm", destination: "/integrations/crm", permanent: true },
      { source: "/en/automation/crm", destination: "/en/integrations/crm", permanent: true },
      { source: "/ru", destination: "/", permanent: true },
      { source: "/ru/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];
    const html = [
      {
        key: "Cache-Control",
        value: "public, max-age=0, must-revalidate",
      },
    ];

    // Next path-to-regexp rejects optional tokens like `woff2?` / `jpe?g` — list each ext.
    const assetSources = [
      "/:path*.js",
      "/:path*.css",
      "/:path*.woff",
      "/:path*.woff2",
      "/:path*.ttf",
      "/:path*.otf",
      "/:path*.eot",
      "/:path*.png",
      "/:path*.jpg",
      "/:path*.jpeg",
      "/:path*.gif",
      "/:path*.webp",
      "/:path*.avif",
      "/:path*.svg",
      "/:path*.ico",
    ];

    // Yandex Webmaster accepts application/xml|text/xml for YML feeds — not text/yaml.
    const ymlFeed = [
      { key: "Content-Type", value: "application/xml; charset=utf-8" },
      ...html,
    ];

    return [
      {
        source: "/_next/static/:path*",
        headers: immutable,
      },
      ...assetSources.map((source) => ({ source, headers: immutable })),
      {
        source: "/hero/:path*",
        headers: immutable,
      },
      {
        source: "/stock/:path*",
        headers: immutable,
      },
      {
        source: "/diagrams/:path*",
        headers: immutable,
      },
      {
        source: "/yandex/:path*",
        headers: immutable,
      },
      {
        source: "/performers-feed.yml",
        headers: ymlFeed,
      },
      {
        source: "/feeds/:path*.yml",
        headers: ymlFeed,
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
      {
        source: "/partners/ru.html",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
          ...html,
        ],
      },
      {
        source: "/:path*",
        headers: html,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
