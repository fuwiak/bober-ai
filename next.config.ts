import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bober-ai.dev" }],
        destination: "https://www.bober-ai.dev/:path*",
        permanent: true,
      },
      { source: "/services/ai-bot-llm-rasa-n8n", destination: "/services/enterprise-ai-assistant", permanent: true },
      { source: "/services/llm-ai-consultation", destination: "/services/ai-discovery-roadmap", permanent: true },
      { source: "/services/ai-bot-gigachat-n8n-local", destination: "/services/private-llm-gigachat", permanent: true },
      { source: "/services/claude-business-automation", destination: "/services/business-process-automation", permanent: true },
      { source: "/services/ai-kp-agent", destination: "/services/sales-ai-agent", permanent: true },
      { source: "/en/services/ai-bot-llm-rasa-n8n", destination: "/en/services/enterprise-ai-assistant", permanent: true },
      { source: "/en/services/llm-ai-consultation", destination: "/en/services/ai-discovery-roadmap", permanent: true },
      { source: "/en/services/ai-bot-gigachat-n8n-local", destination: "/en/services/private-llm-gigachat", permanent: true },
      { source: "/en/services/claude-business-automation", destination: "/en/services/business-process-automation", permanent: true },
      { source: "/en/services/ai-kp-agent", destination: "/en/services/sales-ai-agent", permanent: true },
    ];
  },
  async headers() {
    return [
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
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

