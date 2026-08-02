import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ALLOWED_HTTPS_HOSTS, CANONICAL_ORIGIN } from "./config/domains.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('astro').AstroConfig} */
export default defineConfig({
  site: CANONICAL_ORIGIN,
  // One URL variant: /about not /about/ (both 200 → SEO duplicate).
  trailingSlash: "never",
  // Hybrid: static prerender by default; API routes set prerender=false
  output: "static",
  adapter: node({ mode: "standalone" }),
  // Trust Caddy X-Forwarded-* so CSRF origin (https) matches Astro.url
  security: {
    checkOrigin: true,
    allowedDomains: ALLOWED_HTTPS_HOSTS.map((hostname) => ({
      hostname,
      protocol: "https",
    })),
  },
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.join(root, "src"),
      },
    },
  },
  redirects: {
    "/ru": "/",
    "/services/ai-bot-llm-rasa-n8n": "/services/enterprise-ai-assistant",
    "/services/llm-ai-consultation": "/services/ai-discovery-roadmap",
    "/services/ai-bot-gigachat-n8n-local": "/services/private-llm-gigachat",
    "/services/ml-data-consultation": "/services/ai-discovery-roadmap",
    "/services/telegram-discord-miniapp-bot": "/services/enterprise-ai-assistant",
    "/services/claude-business-automation": "/services/business-process-automation",
    "/services/ai-kp-agent": "/services/sales-ai-agent",
    "/en/services/ai-bot-llm-rasa-n8n": "/en/services/enterprise-ai-assistant",
    "/en/services/llm-ai-consultation": "/en/services/ai-discovery-roadmap",
    "/en/services/ai-bot-gigachat-n8n-local": "/en/services/private-llm-gigachat",
    "/en/services/ml-data-consultation": "/en/services/ai-discovery-roadmap",
    "/en/services/telegram-discord-miniapp-bot": "/en/services/enterprise-ai-assistant",
    "/en/services/claude-business-automation": "/en/services/business-process-automation",
    "/en/services/ai-kp-agent": "/en/services/sales-ai-agent",
    "/automation/business-processes": "/automation/processes",
    "/en/automation/business-processes": "/en/automation/processes",
    "/automation/crm": "/integrations/crm",
    "/en/automation/crm": "/en/integrations/crm",
    "/bitrix24": "/integrations/bitrix24",
    "/bitrix24/ai": "/integrations/bitrix24-ai",
    "/bitrix24/sales-automation": "/integrations/bitrix24-sales-automation",
    "/bitrix24/1c-integration": "/integrations/bitrix24-1c",
    "/amocrm": "/integrations/amocrm",
    "/amocrm/automation": "/integrations/amocrm-automation",
    "/solutions/commercial-proposals": "/automation/proposal-generation",
    "/solutions/corporate-knowledge-base": "/solutions/knowledge-base",
    "/services/private-ai": "/services/self-hosted-ai",
    "/cases/kwork-bitrix24": "/portfolio/bitrix24-kwork-crm",
    "/cases/document-processing-1c": "/portfolio/invoice-processing-pipeline",
    "/en/bitrix24": "/en/integrations/bitrix24",
    "/en/bitrix24/ai": "/en/integrations/bitrix24-ai",
    "/en/bitrix24/sales-automation": "/en/integrations/bitrix24-sales-automation",
    "/en/bitrix24/1c-integration": "/en/integrations/bitrix24-1c",
    "/en/amocrm": "/en/integrations/amocrm",
    "/en/amocrm/automation": "/en/integrations/amocrm-automation",
    "/en/solutions/commercial-proposals": "/en/automation/proposal-generation",
    "/en/solutions/corporate-knowledge-base": "/en/solutions/knowledge-base",
    "/en/services/private-ai": "/en/services/self-hosted-ai",
    "/en/cases/kwork-bitrix24": "/en/portfolio/bitrix24-kwork-crm",
    "/en/cases/document-processing-1c": "/en/portfolio/invoice-processing-pipeline",
  },
});
