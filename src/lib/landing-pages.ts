export type LandingCategory = "automation" | "integrations" | "solutions" | "ai";

export type LandingPageDef = {
  category: LandingCategory;
  slug: string;
  contentKey: string;
  serviceSlug: string;
};

export const LANDING_PAGES: LandingPageDef[] = [
  {
    category: "automation",
    slug: "processes",
    contentKey: "processes",
    serviceSlug: "business-process-automation",
  },
  {
    category: "integrations",
    slug: "crm",
    contentKey: "crm",
    serviceSlug: "business-process-automation",
  },
  {
    category: "ai",
    slug: "corporate",
    contentKey: "corporate",
    serviceSlug: "enterprise-ai-assistant",
  },
  {
    category: "automation",
    slug: "documents",
    contentKey: "documents",
    serviceSlug: "business-process-automation",
  },
  {
    category: "automation",
    slug: "sales",
    contentKey: "sales",
    serviceSlug: "sales-ai-agent",
  },
  {
    category: "integrations",
    slug: "amocrm",
    contentKey: "amocrm",
    serviceSlug: "business-process-automation",
  },
  {
    category: "integrations",
    slug: "bitrix24",
    contentKey: "bitrix24",
    serviceSlug: "business-process-automation",
  },
  {
    category: "solutions",
    slug: "knowledge-base",
    contentKey: "knowledgeBase",
    serviceSlug: "enterprise-ai-assistant",
  },
  {
    category: "solutions",
    slug: "assistant",
    contentKey: "assistant",
    serviceSlug: "enterprise-ai-assistant",
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
