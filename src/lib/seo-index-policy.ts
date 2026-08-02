/**
 * SEO index policy: consolidate cannibalizing commercial URLs.
 * Secondary pages stay live (UX / old links) but noindex + canonical → primary.
 */
import { CATALOG_LANDING_SPECS_EXTRA } from "@/lib/seo-catalog/landing-specs-extra";

export type SeoIndexRule = {
  /** When true, emit noindex,nofollow. */
  noIndex: boolean;
  /** Preferred bare path for rel=canonical (no locale prefix). */
  canonicalPath: string;
};

/** Explicit secondary → primary map (bare paths). */
const EXPLICIT: Record<string, SeoIndexRule> = {
  // CRM / Bitrix cluster → /bitrix (+ AI contour stays on dedicated sales loop)
  "/integrations/bitrix24": { noIndex: true, canonicalPath: "/bitrix" },
  "/integrations/bitrix24-ai": { noIndex: true, canonicalPath: "/services/ai-sales-loop" },
  "/integrations/bitrix24-sales-automation": { noIndex: true, canonicalPath: "/bitrix" },
  "/integrations/crm": { noIndex: true, canonicalPath: "/services/crm-integration" },
  "/integrations/crm-automation": { noIndex: true, canonicalPath: "/services/crm-integration" },
  "/integrations/ai-for-crm": { noIndex: true, canonicalPath: "/services/ai-sales-loop" },
  "/services/corporate-ai-agent-1c-crm": { noIndex: true, canonicalPath: "/services/ai-sales-loop" },

  // RAG / knowledge cluster → /services/rag
  "/services/rag-search": { noIndex: true, canonicalPath: "/services/rag" },
  "/solutions/rag-search": { noIndex: true, canonicalPath: "/services/rag" },
  "/services/knowledge-base": { noIndex: true, canonicalPath: "/services/rag" },
  "/solutions/knowledge-base": { noIndex: true, canonicalPath: "/services/rag" },
  "/solutions/knowledge-chatbot": { noIndex: true, canonicalPath: "/services/rag" },
  "/services/enterprise-ai-assistant": { noIndex: true, canonicalPath: "/services/rag" },
  "/solutions/assistant": { noIndex: true, canonicalPath: "/services/rag" },

  // Private AI cluster → /secure-ai
  "/services/self-hosted-ai": { noIndex: true, canonicalPath: "/secure-ai" },
  "/services/private-llm-gigachat": { noIndex: true, canonicalPath: "/secure-ai" },
  "/services/corporate-neural-net": { noIndex: true, canonicalPath: "/secure-ai" },
  "/services/secure-private-ai-cloud": { noIndex: true, canonicalPath: "/secure-ai" },
  "/ai/corporate-neural-net": { noIndex: true, canonicalPath: "/secure-ai" },
  "/ai/private-llm": { noIndex: true, canonicalPath: "/secure-ai" },
  "/ai/corporate": { noIndex: true, canonicalPath: "/secure-ai" },

  // Agents / sales cluster → AI sales loop or automation pillar
  "/services/ai-agent": { noIndex: true, canonicalPath: "/services/ai-sales-loop" },
  "/services/sales-ai-agent": { noIndex: true, canonicalPath: "/services/ai-sales-loop" },
  "/services/ai-automation": { noIndex: true, canonicalPath: "/automation" },
  "/ai/ai-agents": { noIndex: true, canonicalPath: "/services/ai-sales-loop" },

  // Tech stack as equal product lines → expert / automation pillar
  "/services/langgraph": { noIndex: true, canonicalPath: "/automation" },
  "/services/mcp": { noIndex: true, canonicalPath: "/automation" },
  "/services/n8n": { noIndex: true, canonicalPath: "/automation" },
  "/services/open-webui": { noIndex: true, canonicalPath: "/automation" },
};

const EXTRA_AUTOMATION_PATHS = new Set(
  CATALOG_LANDING_SPECS_EXTRA.filter((s) => s.category === "automation").map(
    (s) => `/automation/${s.slug}`,
  ),
);

const EXTRA_OTHER_PATHS = new Set(
  CATALOG_LANDING_SPECS_EXTRA.filter((s) => s.category !== "automation").map(
    (s) => `/${s.category}/${s.slug}`,
  ),
);

/** Thin Wordstat scenario landings → category hub. */
function extraRule(barePath: string): SeoIndexRule | null {
  if (EXTRA_AUTOMATION_PATHS.has(barePath)) {
    return { noIndex: true, canonicalPath: "/automation" };
  }
  if (EXTRA_OTHER_PATHS.has(barePath)) {
    const category = barePath.split("/")[1];
    const hub =
      category === "integrations"
        ? "/services/crm-integration"
        : category === "solutions"
          ? "/services/rag"
          : category === "ai"
            ? "/secure-ai"
            : "/automation";
    return { noIndex: true, canonicalPath: hub };
  }
  return null;
}

/** Resolve index/canonical policy for a bare (no locale) path. */
export function getSeoIndexPolicy(barePath: string): SeoIndexRule | null {
  const path = barePath === "/" ? "/" : barePath.replace(/\/$/, "") || "/";
  if (EXPLICIT[path]) return EXPLICIT[path];
  return extraRule(path);
}

/** True when path must stay out of sitemaps. */
export function isSeoNoIndexPath(barePath: string): boolean {
  return Boolean(getSeoIndexPolicy(barePath)?.noIndex);
}
