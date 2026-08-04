/**
 * Resolve SeoServiceContent for category landings (automation / integrations / ai / …).
 * Prefer seo-catalog specs (Wordstat-aligned H1/meta/FAQ), then curated CONTENT_RU, then core i18n.
 */
import { loadMessages, type Locale } from "@/lib/i18n";
import type { LandingPageDef } from "@/lib/landing-pages";
import { getLandingExtended } from "@/lib/landing-extended";
import {
  getCatalogLandingContent,
  getCatalogLandingExtended,
  isCatalogContentKey,
} from "@/lib/seo-catalog";
import {
  getSeoServiceContent,
  type SeoServiceContent,
} from "@/lib/seo-services-content";

const HUB_LABEL: Record<
  LandingPageDef["category"],
  { ru: string; uz: string }
> = {
  automation: { ru: "Автоматизация", uz: "Avtomatlashtirish" },
  integrations: { ru: "Интеграции", uz: "Integratsiyalar" },
  solutions: { ru: "Решения", uz: "Yechimlar" },
  ai: { ru: "ИИ", uz: "AI" },
  industries: { ru: "Отрасли", uz: "Tarmoqlar" },
};

type CatalogLocale = "ru" | "kz" | "uz";

function asCatalogLocale(locale: Locale): CatalogLocale {
  if (locale === "uz" || locale === "kz") return locale;
  return "ru";
}

function contentLocale(locale: Locale): "ru" | "uz" {
  return locale === "uz" ? "uz" : "ru";
}

function fromParts(
  input: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1: string;
    subtitle: string;
    problemsTitle: string;
    problems: string[];
    deliverablesTitle: string;
    deliverables: string[];
    related: { href: string; label: string }[];
    intro: string[];
    howWeSolveTitle: string;
    howWeSolve: { title: string; text: string }[];
    roiTitle: string;
    roi: { value: string; label: string }[];
    faqTitle: string;
    faq: { q: string; a: string }[];
    caseStudySlugs?: string[];
  },
  architectureTitle: string,
): SeoServiceContent {
  return {
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    eyebrow: input.eyebrow,
    h1: input.h1,
    subtitle: input.subtitle,
    problemsTitle: input.problemsTitle,
    problems: input.problems,
    deliverablesTitle: input.deliverablesTitle,
    deliverables: input.deliverables,
    intro: input.intro,
    howWeSolveTitle: input.howWeSolveTitle,
    howWeSolve: input.howWeSolve,
    architectureTitle,
    architecture: [],
    roiTitle: input.roiTitle,
    roi: input.roi,
    faqTitle: input.faqTitle,
    faq: input.faq,
    related: input.related,
    caseStudySlugs: input.caseStudySlugs,
  };
}

function fromCatalog(
  page: LandingPageDef,
  locale: Locale,
): SeoServiceContent | null {
  const loc = asCatalogLocale(locale);
  if (!(page.fromCatalog || isCatalogContentKey(page.contentKey))) return null;

  const content = getCatalogLandingContent(page.contentKey, loc);
  if (!content) return null;

  const extended =
    getCatalogLandingExtended(page.contentKey, loc) ??
    getLandingExtended(page.contentKey, loc);

  const uz = loc === "uz";
  return fromParts(
    {
      metaTitle: content.metaTitle,
      metaDescription: content.metaDescription,
      eyebrow: content.eyebrow,
      h1: content.h1,
      subtitle: content.subtitle,
      problemsTitle: content.problemsTitle,
      problems: content.problems,
      deliverablesTitle: content.deliverablesTitle,
      deliverables: content.deliverables,
      related: content.related,
      intro: extended?.intro ?? [],
      howWeSolveTitle:
        extended?.howWeSolveTitle ?? (uz ? "Qanday yechamiz" : "Как мы решаем задачу"),
      howWeSolve: extended?.howWeSolve ?? [],
      roiTitle: extended?.roiTitle ?? (uz ? "Tipik effekt" : "Типичный эффект"),
      roi: extended?.roi ?? [],
      faqTitle: extended?.faqTitle ?? (uz ? "Koʻp soʻraladigan savollar" : "Частые вопросы"),
      faq: extended?.faq ?? content.faq ?? [],
      caseStudySlugs: page.caseStudySlugs,
    },
    uz ? "Tipik arxitektura" : "Типовая архитектура",
  );
}

function fromCore(page: LandingPageDef, locale: Locale): SeoServiceContent | null {
  if (page.fromCatalog || isCatalogContentKey(page.contentKey)) return null;

  const messages = loadMessages(locale);
  const pages = (
    messages as { landing?: { pages?: Record<string, {
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      h1: string;
      subtitle: string;
      problemsTitle: string;
      problems: string[];
      deliverablesTitle: string;
      deliverables: string[];
      related: { href: string; label: string }[];
      faq?: { q: string; a: string }[];
    }> } }
  ).landing?.pages;
  const content = pages?.[page.contentKey];
  if (!content) return null;

  const extended = getLandingExtended(page.contentKey, asCatalogLocale(locale));
  const uz = locale === "uz";

  return fromParts(
    {
      metaTitle: content.metaTitle,
      metaDescription: content.metaDescription,
      eyebrow: content.eyebrow,
      h1: content.h1,
      subtitle: content.subtitle,
      problemsTitle: content.problemsTitle,
      problems: content.problems,
      deliverablesTitle: content.deliverablesTitle,
      deliverables: content.deliverables,
      related: content.related,
      intro: extended?.intro ?? [],
      howWeSolveTitle:
        extended?.howWeSolveTitle ?? (uz ? "Qanday yechamiz" : "Как мы решаем задачу"),
      howWeSolve: extended?.howWeSolve ?? [],
      roiTitle: extended?.roiTitle ?? (uz ? "Tipik effekt" : "Типичный эффект"),
      roi: extended?.roi ?? [],
      faqTitle: extended?.faqTitle ?? (uz ? "Koʻp soʻraladigan savollar" : "Частые вопросы"),
      faq: extended?.faq ?? content.faq ?? [],
      caseStudySlugs: page.caseStudySlugs,
    },
    uz ? "Tipik arxitektura" : "Типовая архитектура",
  );
}

/**
 * Catalog (Wordstat) first, then curated SeoServiceContent by slug, then core landing copy.
 * Merge curated architecture/roi onto catalog when both exist (richer body, commercial surface from catalog).
 */
export function getLandingSeoServiceContent(
  page: LandingPageDef,
  locale: Locale,
): SeoServiceContent | null {
  const catalog = fromCatalog(page, locale);
  const curated = getSeoServiceContent(page.slug, contentLocale(locale));
  const core = fromCore(page, locale);

  if (catalog && curated) {
    return {
      ...curated,
      metaTitle: catalog.metaTitle,
      metaDescription: catalog.metaDescription,
      eyebrow: catalog.eyebrow,
      h1: catalog.h1,
      subtitle: catalog.subtitle,
      problemsTitle: catalog.problemsTitle,
      problems: catalog.problems.length ? catalog.problems : curated.problems,
      deliverablesTitle: catalog.deliverablesTitle,
      deliverables: catalog.deliverables.length
        ? catalog.deliverables
        : curated.deliverables,
      intro: catalog.intro.length ? catalog.intro : curated.intro,
      howWeSolveTitle: catalog.howWeSolve.length
        ? catalog.howWeSolveTitle
        : curated.howWeSolveTitle,
      howWeSolve: catalog.howWeSolve.length ? catalog.howWeSolve : curated.howWeSolve,
      faqTitle: catalog.faq.length ? catalog.faqTitle : curated.faqTitle,
      faq: catalog.faq.length ? catalog.faq : curated.faq,
      related: catalog.related.length ? catalog.related : curated.related,
      caseStudySlugs: catalog.caseStudySlugs ?? curated.caseStudySlugs,
    };
  }

  return catalog ?? curated ?? core;
}

export function getLandingKeywords(
  page: LandingPageDef,
  locale: Locale,
): string[] {
  const loc = asCatalogLocale(locale);
  if (page.fromCatalog || isCatalogContentKey(page.contentKey)) {
    const content = getCatalogLandingContent(page.contentKey, loc);
    if (content?.metaKeywords?.length) return content.metaKeywords;
  }

  if (!page.fromCatalog && !isCatalogContentKey(page.contentKey)) {
    const messages = loadMessages(locale);
    const pages = (
      messages as { landing?: { pages?: Record<string, { metaKeywords?: string[] }> } }
    ).landing?.pages;
    const kw = pages?.[page.contentKey]?.metaKeywords;
    if (kw?.length) return kw;
  }

  return [];
}

export function landingHubLabel(
  category: LandingPageDef["category"],
  locale: Locale,
): string {
  const labels = HUB_LABEL[category];
  return locale === "uz" ? labels.uz : labels.ru;
}

/** Prefer feed-path commercial offer for known money pages (e.g. rag-search → rag). */
export function landingOfferSlug(page: LandingPageDef): string {
  if (page.slug === "rag-search") return "rag";
  return page.serviceSlug;
}
