/**
 * Permanent SEO redirects (301). Shared by middleware and Caddy generator.
 * Prefer 301 over 200+cross-canonical for duplicates (Yandex «Неканоническая»).
 */

/** Exact path → target path (bare, no locale). */
export const SEO_EXACT_REDIRECTS: Record<string, string> = {
  // CRM / Bitrix cluster → /bitrix or sales loop
  "/integrations/bitrix24": "/bitrix",
  "/integrations/bitrix24-ai": "/services/ai-sales-loop",
  "/integrations/bitrix24-sales-automation": "/bitrix",
  "/integrations/crm": "/services/crm-integration",
  "/integrations/crm-automation": "/services/crm-integration",
  "/integrations/ai-for-crm": "/services/ai-sales-loop",
  "/services/corporate-ai-agent-1c-crm": "/services/ai-sales-loop",

  // RAG / knowledge → /services/rag
  "/services/rag-search": "/services/rag",
  "/solutions/rag-search": "/services/rag",
  "/services/knowledge-base": "/services/rag",
  "/solutions/knowledge-base": "/services/rag",
  "/solutions/knowledge-chatbot": "/services/rag",
  "/services/enterprise-ai-assistant": "/services/rag",
  "/solutions/assistant": "/services/rag",

  // Private AI → /secure-ai
  "/services/self-hosted-ai": "/secure-ai",
  "/services/private-llm-gigachat": "/secure-ai",
  "/services/corporate-neural-net": "/secure-ai",
  "/services/secure-private-ai-cloud": "/secure-ai",
  "/ai/corporate-neural-net": "/secure-ai",
  "/ai/private-llm": "/secure-ai",
  "/ai/corporate": "/secure-ai",

  // Agents / tech stack → sales loop or automation hub
  "/services/ai-agent": "/services/ai-sales-loop",
  "/services/sales-ai-agent": "/services/ai-sales-loop",
  "/services/ai-automation": "/automation",
  "/ai/ai-agents": "/services/ai-sales-loop",
  "/services/langgraph": "/automation",
  "/services/mcp": "/automation",
  "/services/n8n": "/automation",
  "/services/open-webui": "/automation",

  // Ghost contact
  "/contact": "/#contact",

  // Legal aliases (Telegram / marketing) → canonical documents
  "/legal/terms": "/terms",
  "/legal/privacy": "/privacy-policy",
  "/legal/consent": "/consent",
};

/** Thin Wordstat automation extras → /automation hub. */
export const SEO_AUTOMATION_EXTRA_REDIRECTS = [
  "order-processing",
  "payment-control",
  "inventory-requests",
  "meeting-notes",
  "email-triage",
  "contract-registry",
  "access-requests",
  "partner-leads",
  "field-reports",
  "quality-checklists",
  "whatsapp-crm",
  "avito-leads",
  "google-sheets-sync",
  "yandex-metrica-crm",
  "telephony-crm",
  "messengers-hub",
  "employee-assistant",
  "manager-copilot",
  "document-qa",
  "onboarding-bot",
] as const;

export function resolveSeoRedirect(pathname: string): string | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  // /uz and /uz/* → RU equivalent (duplicate RU body).
  if (path === "/uz") return "/";
  if (path.startsWith("/uz/")) {
    const rest = path.slice(3);
    return rest || "/";
  }

  // Legacy EN → RU.
  if (path === "/en") return "/";
  if (path.startsWith("/en/")) {
    const rest = path.slice(3);
    return rest || "/";
  }

  // Legacy /ru mirror.
  if (path === "/ru") return "/";
  if (path.startsWith("/ru/")) {
    const rest = path.slice(3);
    return rest || "/";
  }

  // KZ portfolio soft-404s → RU case studies when slug mirrors.
  if (path.startsWith("/kz/portfolio/")) {
    const slug = path.slice("/kz/portfolio/".length);
    if (slug && !slug.includes("/")) return `/portfolio/${slug}`;
  }

  if (SEO_EXACT_REDIRECTS[path]) return SEO_EXACT_REDIRECTS[path];

  const auto = path.match(/^\/automation\/([^/]+)$/);
  if (auto && (SEO_AUTOMATION_EXTRA_REDIRECTS as readonly string[]).includes(auto[1])) {
    return "/automation";
  }

  return null;
}

/** Paths that must not appear in sitemap (redirect sources + order forms). */
export function isSitemapExcludedPath(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (path === "/uz" || path.startsWith("/uz/")) return true;
  if (path === "/en" || path.startsWith("/en/")) return true;
  if (path === "/ru" || path.startsWith("/ru/")) return true;
  if (path === "/order" || path.startsWith("/order/")) return true;
  if (path.startsWith("/api/")) return true;
  if (path.includes("/cases/")) return true;
  if (resolveSeoRedirect(path)) return true;
  // KZ: only hub + pricing until deeper localization.
  if (path.startsWith("/kz/") && path !== "/kz/pricing") return true;
  return false;
}
