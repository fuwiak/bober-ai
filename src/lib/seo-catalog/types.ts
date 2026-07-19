import type { LandingCategory } from "@/lib/landing-pages";
import type { LandingExtendedContent } from "@/lib/landing-extended";

export type CatalogCategory = LandingCategory | "industries";

export type LocaleCopy = {
  h1: string;
  subtitle: string;
  problems: string[];
  deliverables: string[];
  intro: string[];
  faq: { q: string; a: string }[];
};

export type LandingSpec = {
  category: CatalogCategory;
  slug: string;
  /** Unique content key — used in catalog maps */
  contentKey: string;
  cluster: string;
  serviceSlug: string;
  coverImage: string;
  keywords: string[];
  related: { href: string; labelRu: string; labelEn: string }[];
  caseStudySlugs?: string[];
  ru: LocaleCopy;
  en: LocaleCopy;
};

export type CatalogLandingContent = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string[];
  eyebrow: string;
  h1: string;
  subtitle: string;
  problemsTitle: string;
  problems: string[];
  deliverablesTitle: string;
  deliverables: string[];
  relatedTitle: string;
  related: { href: string; label: string }[];
  faq?: { q: string; a: string }[];
};

export type BuiltLanding = {
  def: {
    category: CatalogCategory;
    slug: string;
    contentKey: string;
    serviceSlug: string;
    coverImage: string;
    caseStudySlugs?: string[];
  };
  content: { ru: CatalogLandingContent; en: CatalogLandingContent };
  extended: { ru: LandingExtendedContent; en: LandingExtendedContent };
};

export type IntentArticleSpec = {
  slug: string;
  cluster: string;
  keywords: string[];
  related: { href: string; labelRu: string; labelEn: string }[];
  publishedAt: string;
  ru: {
    title: string;
    description: string;
    h1: string;
    sections: { title: string; paragraphs: string[] }[];
  };
  en: {
    title: string;
    description: string;
    h1: string;
    sections: { title: string; paragraphs: string[] }[];
  };
};

export type HubDef = {
  category: CatalogCategory;
  contentKey: string;
  coverImage: string;
  children: { href: string; labelRu: string; labelEn: string; blurbRu: string; blurbEn: string }[];
  ru: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    subtitle: string;
    intro: string[];
  };
  en: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    subtitle: string;
    intro: string[];
  };
};
