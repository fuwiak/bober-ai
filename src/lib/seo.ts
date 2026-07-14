import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type PageSeoInput = {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  locale: string;
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
      type: "website",
      locale: locale === "en" ? "en_US" : "ru_RU",
      alternateLocale: locale === "en" ? ["ru_RU"] : ["en_US"],
      url: absoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      title,
      description,
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
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
    },
    areaServed: input.locale === "en" ? "Worldwide" : "Russia",
  };
}
