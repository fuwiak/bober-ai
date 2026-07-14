import { DIAGRAM_IMAGES, PORTFOLIO_IMAGES, STOCK_IMAGES } from "@/lib/site";

export type LandingCategory = "automation" | "integrations" | "solutions" | "ai";

export type LandingPageDef = {
  category: LandingCategory;
  slug: string;
  contentKey: string;
  serviceSlug: string;
  coverImage: string;
  caseStudySlugs?: string[];
};

export const LANDING_PAGES: LandingPageDef[] = [
  {
    category: "automation",
    slug: "processes",
    contentKey: "processes",
    serviceSlug: "business-process-automation",
    coverImage: DIAGRAM_IMAGES.workflow,
    caseStudySlugs: ["elia-suite", "yandex-telemost-agent"],
  },
  {
    category: "integrations",
    slug: "crm",
    contentKey: "crm",
    serviceSlug: "business-process-automation",
    coverImage: DIAGRAM_IMAGES.crm,
    caseStudySlugs: ["crm-telegram-sheets", "lead-generation"],
  },
  {
    category: "ai",
    slug: "corporate",
    contentKey: "corporate",
    serviceSlug: "enterprise-ai-assistant",
    coverImage: DIAGRAM_IMAGES.architecture,
    caseStudySlugs: ["kaspersky-ai-assistant", "yandex-telemost-agent"],
  },
  {
    category: "automation",
    slug: "documents",
    contentKey: "documents",
    serviceSlug: "business-process-automation",
    coverImage: DIAGRAM_IMAGES.documents,
    caseStudySlugs: ["kp-llm-automation"],
  },
  {
    category: "automation",
    slug: "sales",
    contentKey: "sales",
    serviceSlug: "sales-ai-agent",
    coverImage: DIAGRAM_IMAGES.sales,
    caseStudySlugs: ["kp-llm-automation", "lead-generation"],
  },
  {
    category: "integrations",
    slug: "amocrm",
    contentKey: "amocrm",
    serviceSlug: "business-process-automation",
    coverImage: PORTFOLIO_IMAGES.leads,
    caseStudySlugs: ["lead-generation", "crm-telegram-sheets"],
  },
  {
    category: "integrations",
    slug: "bitrix24",
    contentKey: "bitrix24",
    serviceSlug: "business-process-automation",
    coverImage: PORTFOLIO_IMAGES.elia,
    caseStudySlugs: ["elia-suite", "yandex-telemost-agent"],
  },
  {
    category: "integrations",
    slug: "1c",
    contentKey: "onec",
    serviceSlug: "business-process-automation",
    coverImage: DIAGRAM_IMAGES.erp,
    caseStudySlugs: ["crm-1c-sync", "bitrix24-erp-sync"],
  },
  {
    category: "solutions",
    slug: "knowledge-base",
    contentKey: "knowledgeBase",
    serviceSlug: "enterprise-ai-assistant",
    coverImage: DIAGRAM_IMAGES.architecture,
    caseStudySlugs: ["kaspersky-ai-assistant"],
  },
  {
    category: "solutions",
    slug: "assistant",
    contentKey: "assistant",
    serviceSlug: "enterprise-ai-assistant",
    coverImage: PORTFOLIO_IMAGES.telemost,
    caseStudySlugs: ["kaspersky-ai-assistant", "yandex-telemost-agent"],
  },
];

export function getLandingPage(category: string, slug: string) {
  return LANDING_PAGES.find((page) => page.category === category && page.slug === slug);
}

export function landingPath(page: LandingPageDef) {
  return `/${page.category}/${page.slug}`;
}

export function getAllLandingParams() {
  const params: { locale: string; category: string; slug: string }[] = [];
  for (const locale of ["ru", "en"]) {
    for (const page of LANDING_PAGES) {
      params.push({ locale, category: page.category, slug: page.slug });
    }
  }
  return params;
}
