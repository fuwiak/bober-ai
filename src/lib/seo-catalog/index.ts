import { buildLanding } from "@/lib/seo-catalog/build-content";
import { CATALOG_LANDING_SPECS } from "@/lib/seo-catalog/landing-specs";
import { CATALOG_LANDING_SPECS_EXTRA } from "@/lib/seo-catalog/landing-specs-extra";
import { INTENT_ARTICLE_SPECS } from "@/lib/seo-catalog/blog-specs";
import { SEO_HUBS } from "@/lib/seo-catalog/hubs";
import type {
  BuiltLanding,
  CatalogCategory,
  CatalogLandingContent,
  IntentArticleSpec,
} from "@/lib/seo-catalog/types";
import type { LandingExtendedContent } from "@/lib/landing-extended";

const ALL_SPECS = [...CATALOG_LANDING_SPECS, ...CATALOG_LANDING_SPECS_EXTRA];

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
  locale: "ru" | "en",
): CatalogLandingContent | null {
  const item = BY_CONTENT_KEY.get(contentKey);
  return item ? item.content[locale] : null;
}

export function getCatalogLandingExtended(
  contentKey: string,
  locale: "ru" | "en",
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
  return INTENT_ARTICLE_SPECS.find((item) => item.slug === slug);
}

export function getAllIntentArticles() {
  return INTENT_ARTICLE_SPECS;
}

export function getSeoCatalogStats() {
  return {
    catalogLandings: CATALOG_LANDING_DEFS.length,
    hubs: SEO_HUBS.length,
    intentArticles: INTENT_ARTICLE_SPECS.length,
    totalNewUrlsRu:
      CATALOG_LANDING_DEFS.length + SEO_HUBS.length + INTENT_ARTICLE_SPECS.length,
  };
}
