import { buildLanding } from "@/lib/seo-catalog/build-content";
import { CATALOG_LANDING_SPECS } from "@/lib/seo-catalog/landing-specs";
import { CATALOG_LANDING_SPECS_EXTRA } from "@/lib/seo-catalog/landing-specs-extra";
import { CATALOG_LANDING_SPECS_INTENT } from "@/lib/seo-catalog/landing-specs-intent";
import { CATALOG_LANDING_SPECS_CRM_WORDSTAT } from "@/lib/seo-catalog/landing-specs-crm-wordstat";
import { CATALOG_LANDING_SPECS_AMOCRM_WORDSTAT } from "@/lib/seo-catalog/landing-specs-amocrm-wordstat";
import { CATALOG_LANDING_SPECS_CRM_SETUP } from "@/lib/seo-catalog/landing-specs-crm-setup";
import { CATALOG_LANDING_SPECS_HIGH_DEMAND } from "@/lib/seo-catalog/landing-specs-high-demand";
import { CATALOG_LANDING_SPECS_PRIORITY } from "@/lib/seo-catalog/landing-specs-priority";
import { INTENT_ARTICLE_SPECS } from "@/lib/seo-catalog/blog-specs";
import { SEO_HUBS } from "@/lib/seo-catalog/hubs";
import { SPECIALIST_ARTICLE_SPECS } from "@/lib/seo-catalog/specialist-blog-specs";
import type {
  BuiltLanding,
  CatalogCategory,
  CatalogLandingContent,
  IntentArticleSpec,
} from "@/lib/seo-catalog/types";
import type { LandingExtendedContent } from "@/lib/landing-extended";

const ALL_SPECS = [
  ...CATALOG_LANDING_SPECS,
  ...CATALOG_LANDING_SPECS_EXTRA,
  ...CATALOG_LANDING_SPECS_INTENT,
  ...CATALOG_LANDING_SPECS_CRM_WORDSTAT,
  ...CATALOG_LANDING_SPECS_AMOCRM_WORDSTAT,
  ...CATALOG_LANDING_SPECS_CRM_SETUP,
  ...CATALOG_LANDING_SPECS_HIGH_DEMAND,
  ...CATALOG_LANDING_SPECS_PRIORITY,
];
const ALL_ARTICLES = [...SPECIALIST_ARTICLE_SPECS, ...INTENT_ARTICLE_SPECS];

const BUILT: BuiltLanding[] = ALL_SPECS.map(buildLanding);

const BY_CONTENT_KEY = new Map(BUILT.map((item) => [item.def.contentKey, item]));
const BY_PATH = new Map(
  BUILT.map((item) => [`${item.def.category}/${item.def.slug}`, item]),
);

export const CATALOG_LANDING_DEFS = BUILT.map((item) => item.def);

export function isCatalogContentKey(contentKey: string) {
  return BY_CONTENT_KEY.has(contentKey);
}

export function getCatalogLandingContent(
  contentKey: string,
  locale: "ru" | "kz" | "uz",
): CatalogLandingContent | null {
  const item = BY_CONTENT_KEY.get(contentKey);
  return item ? item.content[locale] : null;
}

export function getCatalogLandingExtended(
  contentKey: string,
  locale: "ru" | "kz" | "uz",
): LandingExtendedContent | null {
  const item = BY_CONTENT_KEY.get(contentKey);
  return item ? item.extended[locale] : null;
}

export function getCatalogByPath(category: string, slug: string) {
  return BY_PATH.get(`${category}/${slug}`) ?? null;
}

export function getCatalogLandingsByCategory(category: CatalogCategory) {
  return CATALOG_LANDING_DEFS.filter((item) => item.category === category);
}

export function getIntentArticle(slug: string): IntentArticleSpec | undefined {
  return ALL_ARTICLES.find((item) => item.slug === slug);
}

export function getAllIntentArticles() {
  return ALL_ARTICLES;
}

export function getSeoCatalogStats() {
  return {
    catalogLandings: CATALOG_LANDING_DEFS.length,
    hubs: SEO_HUBS.length,
    intentArticles: ALL_ARTICLES.length,
    totalNewUrlsRu:
      CATALOG_LANDING_DEFS.length + SEO_HUBS.length + ALL_ARTICLES.length,
  };
}
