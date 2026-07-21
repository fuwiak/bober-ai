import type { Metadata } from "next";
import {
  CLOUD_RU_PARTNERS_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GITHUB_URL,
  HERO_STOCK_IMAGE,
  LINKEDIN_URL,
  SELECTEL_PARTNER_PROGRAM_URL,
  SITE_COUNTRY,
  SITE_GEO,
  SITE_NAME,
  SITE_REGION,
  SITE_URL,
  TELEGRAM_URL,
  YANDEX_BUSINESS_URL,
  YANDEX_CLOUD_PARTNERS_URL,
  YANDEX_MAPS_URL,
  YANDEX_USLUGI_URL,
  absoluteUrl,
} from "@/lib/site";
import { LEGAL_ENTITY } from "@/lib/legal";
import { PROFILE } from "@/lib/profile";

/** Default share / snippet image (not favicon — Yandex/social need a real preview). */
export const DEFAULT_OG_IMAGE = HERO_STOCK_IMAGE;

type PageSeoInput = {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  locale: string;
  /** Open Graph type for Metrika content analytics / social previews */
  ogType?: "website" | "article";
  image?: string;
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

/** Absolute URL for a locale path (`/services` → …/services or …/en/services). */
export function localizedAbsolute(path: string, locale: string): string {
  const [pathname, hash] = path.split("#");
  const base = pathname?.startsWith("/") ? pathname : `/${pathname || ""}`;
  const url =
    locale === "en"
      ? absoluteUrl(base === "/" ? "/en" : `/en${base}`)
      : absoluteUrl(base || "/");
  return hash ? `${url}#${hash}` : url;
}

export function buildPageMetadata({
  title,
  description,
  keywords,
  path,
  locale,
  ogType = "website",
  image = DEFAULT_OG_IMAGE,
  article,
}: PageSeoInput): Metadata {
  const canonicalPath = localePath(path, locale);
  const ruPath = path.replace(/^\/en(?=\/|$)/, "") || "/";
  const enPath = path.startsWith("/en") ? path : `/en${path === "/" ? "" : path}`;
  const ogImageUrl = absoluteUrl(image);

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
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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
      images: [ogImageUrl],
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

/** Home + section crumbs → BreadcrumbList JSON-LD (Yandex навигационная цепочка). */
export function pageBreadcrumbJsonLd(
  locale: string,
  crumbs: { name: string; path: string }[],
) {
  const home = {
    name: locale === "en" ? "Home" : "Главная",
    url: localizedAbsolute("/", locale),
  };
  return breadcrumbJsonLd([
    home,
    ...crumbs.map((c) => ({
      name: c.name,
      url: localizedAbsolute(c.path, locale),
    })),
  ]);
}

/** Main sections for Yandex sitelinks / SiteNavigationElement signals. */
export function siteNavigationItems(locale: string) {
  const isEn = locale === "en";
  return [
    { name: isEn ? "Automation" : "Автоматизация", path: "/automation" },
    { name: isEn ? "Services" : "Услуги", path: "/services" },
    { name: isEn ? "Portfolio" : "Портфолио", path: "/portfolio" },
    { name: isEn ? "Pricing" : "Цены", path: "/pricing" },
    { name: isEn ? "Blog" : "Блог", path: "/blog" },
    { name: isEn ? "Partners" : "Партнёрам", path: "/partners" },
    { name: isEn ? "FAQ" : "FAQ", path: "/faq" },
    { name: isEn ? "Guides" : "Гайды", path: "/guides" },
    { name: isEn ? "Contact" : "Контакты", path: "/#contact" },
  ].map((item) => ({
    name: item.name,
    url: localizedAbsolute(item.path, locale),
  }));
}

/** Standalone SiteNavigationElement list — сигнал для быстрых ссылок в выдаче. */
export function siteNavigationJsonLd(locale: string) {
  const nav = siteNavigationItems(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "en" ? "Site sections" : "Разделы сайта",
    numberOfItems: nav.length,
    itemListElement: nav.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function websiteJsonLd(locale: string) {
  const nav = siteNavigationItems(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: locale === "en" ? "en-US" : "ru-RU",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "ContactAction",
      target: `${SITE_URL}/#contact`,
      name: locale === "en" ? "Request a quote" : "Обсудить проект",
    },
    hasPart: nav.map((item) => ({
      "@type": "WebPage",
      name: item.name,
      url: item.url,
    })),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: nav.map((item, index) => ({
        "@type": "SiteNavigationElement",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
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
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
    },
  };
}

export function aggregateRatingJsonLd() {
  return {
    "@type": "AggregateRating",
    ratingValue: PROFILE.rating,
    reviewCount: PROFILE.reviewsCount,
    bestRating: 5,
    worstRating: 1,
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
    aggregateRating: aggregateRatingJsonLd(),
    areaServed: input.locale === "en" ? "Worldwide" : "Russia",
  };
}

export function organizationJsonLd(locale: string) {
  const isEn = locale === "en";
  const sameAs = [
    LINKEDIN_URL,
    GITHUB_URL,
    YANDEX_USLUGI_URL,
    YANDEX_MAPS_URL,
    YANDEX_CLOUD_PARTNERS_URL,
    SELECTEL_PARTNER_PROGRAM_URL,
    CLOUD_RU_PARTNERS_URL,
    TELEGRAM_URL,
    ...(YANDEX_BUSINESS_URL ? [YANDEX_BUSINESS_URL] : []),
  ];

  return {
    // LocalBusiness + ProfessionalService — региональность и сниппеты Яндекса.
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_ENTITY.name,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/favicon-120x120.png"),
      width: 120,
      height: 120,
    },
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    taxID: LEGAL_ENTITY.inn,
    identifier: [
      { "@type": "PropertyValue", name: "INN", value: LEGAL_ENTITY.inn },
      { "@type": "PropertyValue", name: "OGRNIP", value: LEGAL_ENTITY.ogrnip },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Перервинский б-р, д. 3, кв. 57",
      addressLocality: SITE_REGION,
      addressRegion: SITE_REGION,
      postalCode: "109451",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_GEO.latitude,
      longitude: SITE_GEO.longitude,
    },
    hasMap: YANDEX_MAPS_URL,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        availableLanguage: ["Russian", "English", "Polish"],
        areaServed: isEn ? "Worldwide" : "RU",
        url: `${SITE_URL}/#contact`,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: CONTACT_PHONE,
        url: TELEGRAM_URL,
        availableLanguage: ["Russian", "English"],
      },
    ],
    areaServed: isEn
      ? { "@type": "Country", name: "Worldwide" }
      : [
          { "@type": "City", name: SITE_REGION },
          { "@type": "Country", name: SITE_COUNTRY },
        ],
    priceRange: "₽₽₽",
    aggregateRating: aggregateRatingJsonLd(),
    knowsAbout: isEn
      ? [
          "Business process automation",
          "CRM integration",
          "AI agents",
          "Private LLM",
          "Document processing",
          "n8n automation",
        ]
      : [
          "Автоматизация бизнес-процессов",
          "Интеграция CRM",
          "AI-агенты",
          "Приватный LLM",
          "Обработка документов",
          "Автоматизация на n8n",
        ],
    sameAs,
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
      "@id": `${SITE_URL}/#organization`,
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
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon-120x120.png"),
      },
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
