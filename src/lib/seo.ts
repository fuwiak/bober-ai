import type { Metadata } from "next";
import {
  CLOUD_RU_PARTNERS_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GITHUB_URL,
  HERO_STOCK_IMAGE,
  LINKEDIN_URL,
  SELECTEL_PARTNER_PROGRAM_URL,
  SITE_NAME,
  SITE_URL,
  TELEGRAM_URL,
  YANDEX_CLOUD_PARTNERS_URL,
  YANDEX_USLUGI_URL,
  absoluteUrl,
} from "@/lib/site";

type PageSeoInput = {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  locale: string;
  /** Open Graph type for Metrika content analytics / social previews */
  ogType?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  };
};

function localePath(path: string, locale: string): string {
  if (locale === "en") {
    return path === "/" ? "/en" : path.startsWith("/en") ? path : `/en${path}`;
  }
  return path.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function buildPageMetadata({
  title,
  description,
  keywords,
  path,
  locale,
  ogType = "website",
  article,
}: PageSeoInput): Metadata {
  const canonicalPath = localePath(path, locale);
  const ruPath = path.replace(/^\/en(?=\/|$)/, "") || "/";
  const enPath = path.startsWith("/en") ? path : `/en${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        ru: absoluteUrl(ruPath),
        en: absoluteUrl(enPath),
        "x-default": absoluteUrl(ruPath),
      },
    },
    openGraph: {
      type: ogType,
      locale: locale === "en" ? "en_US" : "ru_RU",
      alternateLocale: locale === "en" ? ["ru_RU"] : ["en_US"],
      url: absoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      title,
      description,
      ...(ogType === "article" && article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
            section: article.section,
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function webPageJsonLd(input: {
  name: string;
  description: string;
  url: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.locale === "en" ? "en-US" : "ru-RU",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
    },
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: organizationJsonLd(input.locale),
    areaServed: input.locale === "en" ? "Worldwide" : "Russia",
  };
}

export function organizationJsonLd(locale: string) {
  return {
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(HERO_STOCK_IMAGE),
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    areaServed: { "@type": "Country", name: locale === "en" ? "Worldwide" : "Russia" },
    priceRange: "₽₽₽",
    sameAs: [
      LINKEDIN_URL,
      GITHUB_URL,
      YANDEX_USLUGI_URL,
      YANDEX_CLOUD_PARTNERS_URL,
      SELECTEL_PARTNER_PROGRAM_URL,
      CLOUD_RU_PARTNERS_URL,
      TELEGRAM_URL,
    ],
  };
}

export function personJsonLd(input: {
  name: string;
  jobTitle: string;
  description: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    description: input.description,
    image: absoluteUrl(input.image),
    url: input.url,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function faqJsonLd(items: { q: string; a: string }[], pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": `${pageUrl}#faq`, url: `${pageUrl}#faq` } : {}),
    mainEntity: items.map((item, index) => ({
      "@type": "Question",
      ...(pageUrl ? { "@id": `${pageUrl}#faq-${index + 1}` } : {}),
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/**
 * Article JSON-LD for Yandex Metrika content analytics.
 * Required: @id, headline, text (>500 chars for full stats).
 * Prefer url/@id with a #fragment that matches an element id on the page.
 */
export function articleJsonLd(input: {
  type?: "Article" | "BlogPosting" | "NewsArticle";
  url: string;
  fragmentId?: string;
  headline: string;
  text: string;
  description?: string;
  authorName: string;
  datePublished?: string;
  dateModified?: string;
  about?: string[];
  image?: string;
  inLanguage?: string;
}) {
  const fragment = input.fragmentId ?? "article";
  const contentUrl = `${input.url}#${fragment}`;

  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "Article",
    "@id": contentUrl,
    headline: input.headline,
    text: input.text,
    url: contentUrl,
    ...(input.description ? { description: input.description } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.inLanguage ? { inLanguage: input.inLanguage } : {}),
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
    ...(input.about?.length
      ? {
          about: input.about.map((name) => ({
            "@type": "Thing",
            name,
          })),
        }
      : {}),
  };
}
