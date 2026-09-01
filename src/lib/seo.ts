import {
  BITRIX_PARTNER_URL,
  CLOUD_RU_PARTNERS_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GITHUB_URL,
  LINKEDIN_URL,
  OG_IMAGE,
  SELECTEL_PARTNER_PROGRAM_URL,
  SITE_NAME,
  SITE_URL,
  TELEGRAM_URL,
  YANDEX_BUSINESS_URL,
  YANDEX_CLOUD_PARTNERS_URL,
  YANDEX_MAPS_URL,
  YANDEX_USLUGI_URL,
  absoluteUrl,
} from "@/lib/site";
import { FEED_RATING, FEED_REVIEWS_COUNT } from "@/lib/feed-rating";
import { LEGAL_ENTITY } from "@/lib/legal";
import { PROFILE } from "@/lib/profile";
import { marketOf, type Locale } from "@/lib/markets";
import { localizePath, stripLocalePrefix } from "@/lib/i18n";

/** Default share / snippet image (not favicon — Yandex/social need a real preview). */
export const DEFAULT_OG_IMAGE = OG_IMAGE;

type PageSeoInput = {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  locale: Locale | string;
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

/** Framework-agnostic page metadata (was Next.js Metadata). */
export type PageMetadata = {
  title: string | { absolute: string };
  description: string;
  keywords?: string[];
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  openGraph?: Record<string, unknown>;
  twitter?: Record<string, unknown>;
  robots?: Record<string, unknown> | string;
  [key: string]: unknown;
};

function asLocale(locale: string): Locale {
  if (locale === "kz" || locale === "uz" || locale === "ru") return locale;
  return "ru";
}

function localePath(path: string, locale: string): string {
  return localizePath(stripLocalePrefix(path), asLocale(locale));
}

/** Absolute URL for a locale path (`/services` → …/services or …/kz/services). */
export function localizedAbsolute(path: string, locale: string): string {
  const [pathname, hash] = path.split("#");
  const base = pathname?.startsWith("/") ? pathname : `/${pathname || ""}`;
  const localized = localizePath(base || "/", asLocale(locale));
  const url = absoluteUrl(localized);
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
}: PageSeoInput): PageMetadata {
  const loc = asLocale(locale);
  const market = marketOf(loc);
  const bare = stripLocalePrefix(path);
  const canonicalPath = localePath(bare, loc);
  const ogImageUrl = absoluteUrl(image);

  const languages: Record<string, string> = {};
  const hreflangLocales =
    bare === "/" || bare === "/pricing" ? (["ru", "kz"] as const) : (["ru"] as const);
  for (const l of hreflangLocales) {
    const m = marketOf(l);
    languages[m.hreflang] = absoluteUrl(localizePath(bare, l));
  }
  languages["x-default"] = absoluteUrl(localizePath(bare, "ru"));

  const resolvedTitle =
    /bober ai/i.test(title) || title.includes(SITE_NAME)
      ? { absolute: title }
      : title;

  return {
    title: resolvedTitle,
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages,
    },
    openGraph: {
      type: ogType,
      locale: market.ogLocale,
      alternateLocale: (bare === "/" || bare === "/pricing" ? (["ru","kz"] as Locale[]).filter((l) => l !== loc) : (["ru"] as Locale[]).filter((l) => l !== loc)).map((l) => marketOf(l).ogLocale),
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
      site: SITE_NAME,
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
  const loc = asLocale(locale);
  const home = {
    name: loc === "uz" ? "Bosh sahifa" : "Главная",
    url: localizedAbsolute("/", loc),
  };
  return breadcrumbJsonLd([
    home,
    ...crumbs.map((c) => ({
      name: c.name,
      url: localizedAbsolute(c.path, loc),
    })),
  ]);
}

/** Main sections for Yandex sitelinks / SiteNavigationElement signals. */
export function siteNavigationItems(locale: string) {
  const loc = asLocale(locale);
  const uz = loc === "uz";
  return [
    { name: uz ? "Avtomatlashtirish" : "Автоматизация", path: "/automation" },
    { name: uz ? "Xizmatlar" : "Услуги", path: "/services" },
    { name: uz ? "Portfolio" : "Портфолио", path: "/portfolio" },
    { name: uz ? "Kompaniya haqida" : "О компании", path: "/about" },
    { name: uz ? "Narxlar" : "Цены", path: "/pricing" },
    { name: uz ? "Blog" : "Блог", path: "/blog" },
    { name: uz ? "Hamkorlarga" : "Партнёрам", path: "/partners" },
    { name: "FAQ", path: "/faq" },
    { name: uz ? "Qoʻllanmalar" : "Гайды", path: "/guides" },
    { name: uz ? "Aloqa" : "Контакты", path: "/#contact" },
  ].map((item) => ({
    name: item.name,
    url: localizedAbsolute(item.path, loc),
  }));
}

/** Standalone SiteNavigationElement list — сигнал для быстрых ссылок в выдаче. */
export function siteNavigationJsonLd(locale: string) {
  const loc = asLocale(locale);
  const nav = siteNavigationItems(loc);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: loc === "uz" ? "Sayt boʻlimlari" : "Разделы сайта",
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
  const loc = asLocale(locale);
  const market = marketOf(loc);
  const nav = siteNavigationItems(loc);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: market.htmlLang === "uz" ? "uz-UZ" : market.ogLocale.replace("_", "-"),
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "ContactAction",
      target: localizedAbsolute("/#contact", loc),
      name: loc === "uz" ? "Loyihani muhokama qilish" : "Обсудить проект",
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
  const loc = asLocale(input.locale);
  const market = marketOf(loc);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: market.htmlLang === "uz" ? "uz-UZ" : market.ogLocale.replace("_", "-"),
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
    },
  };
}

/**
 * AggregateRating for Organization — only when there is a real public rating.
 * Rating 0 in JSON-LD looks like spam to Yandex; omit until FEED_RATING > 0.
 */
export function aggregateRatingJsonLd():
  | {
      "@type": "AggregateRating";
      ratingValue: number;
      reviewCount: number;
      bestRating: number;
      worstRating: number;
    }
  | undefined {
  const ratingValue = Number(FEED_RATING);
  const reviewCount = Number(FEED_REVIEWS_COUNT);
  if (!Number.isFinite(ratingValue) || !Number.isFinite(reviewCount)) return undefined;
  if (ratingValue <= 0 || reviewCount <= 0) return undefined;
  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  locale: string;
  /** Visible «from» price — helps Yandex Services / Alice extract commercial facts. */
  price?: number;
  priceCurrency?: string;
  priceLabel?: string;
}) {
  const loc = asLocale(input.locale);
  const market = marketOf(loc);
  const provider = organizationJsonLd(loc);
  const currency = input.priceCurrency ?? market.currency;
  const offers =
    typeof input.price === "number" && Number.isFinite(input.price) && input.price > 0
      ? {
          "@type": "Offer",
          url: input.url,
          price: input.price,
          priceCurrency: currency,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: input.price,
            priceCurrency: currency,
            valueAddedTaxIncluded: true,
          },
          availability: "https://schema.org/InStock",
          ...(input.priceLabel ? { name: input.priceLabel } : {}),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider,
    areaServed: market.areaServed,
    ...(offers ? { offers } : {}),
  };
}

export function organizationJsonLd(locale: string) {
  const loc = asLocale(locale);
  const market = marketOf(loc);
  const isUz = loc === "uz";
  const sameAs = [
    LINKEDIN_URL,
    GITHUB_URL,
    YANDEX_USLUGI_URL,
    YANDEX_MAPS_URL,
    YANDEX_CLOUD_PARTNERS_URL,
    SELECTEL_PARTNER_PROGRAM_URL,
    CLOUD_RU_PARTNERS_URL,
    BITRIX_PARTNER_URL,
    TELEGRAM_URL,
    ...(YANDEX_BUSINESS_URL ? [YANDEX_BUSINESS_URL] : []),
  ];

  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: LEGAL_ENTITY.streetAddress,
    addressLocality: LEGAL_ENTITY.addressLocality,
    addressRegion: LEGAL_ENTITY.addressLocality,
    postalCode: LEGAL_ENTITY.postalCode,
    addressCountry: LEGAL_ENTITY.addressCountry,
  };

  return {
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
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
    address: [LEGAL_ENTITY.address, postalAddress],
    taxID: LEGAL_ENTITY.inn,
    identifier: [
      { "@type": "PropertyValue", name: "INN", value: LEGAL_ENTITY.inn },
      { "@type": "PropertyValue", name: "OGRNIP", value: LEGAL_ENTITY.ogrnip },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: market.geo.latitude,
      longitude: market.geo.longitude,
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
        availableLanguage: isUz
          ? ["Uzbek", "Russian"]
          : loc === "kz"
            ? ["Russian", "Kazakh"]
            : ["Russian", "Polish"],
        areaServed: market.areaServedCode,
        url: `${SITE_URL}/#contact`,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: CONTACT_PHONE,
        url: TELEGRAM_URL,
        availableLanguage: isUz ? ["Uzbek", "Russian"] : ["Russian"],
      },
    ],
    areaServed: [
      { "@type": "City", name: market.region },
      { "@type": "Country", name: market.country },
    ],
    priceRange: market.priceRange,
    memberOf: {
      "@type": "Organization",
      name: "Партнёрская программа 1С-Битрикс",
      url: BITRIX_PARTNER_URL,
    },
    ...((): Record<string, unknown> => {
      const rating = aggregateRatingJsonLd();
      return rating ? { aggregateRating: rating } : {};
    })(),
    knowsAbout: isUz
      ? [
          "Biznes jarayonlarini avtomatlashtirish",
          "CRM integratsiyasi",
          "AI agentlar",
          "Private LLM",
          "Hujjatlarni qayta ishlash",
          "n8n avtomatlashtirish",
        ]
      : [
          "Автоматизация бизнес-процессов",
          "Интеграция CRM",
          "Интеграция Битрикс24",
          "Интегратор Битрикс24",
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
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: input.name,
    jobTitle: input.jobTitle,
    description: input.description,
    image: absoluteUrl(input.image),
    url: input.url,
    ...(input.sameAs && input.sameAs.length > 0 ? { sameAs: input.sameAs } : {}),
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
