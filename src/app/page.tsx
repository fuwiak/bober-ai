import type { Metadata } from "next";
import App from "@/App";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  DEFAULT_KEYWORDS,
  FREELANCE_URL,
  ORGANIZATION_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_REGION,
  SITE_URL,
  TELEGRAM_URL,
  absoluteUrl,
} from "@/lib/site";
import { PROFILE } from "@/lib/profile";
import { serviceFeedOffers } from "@/lib/services-feed";

export const metadata: Metadata = {
  title: PROFILE.title,
  description: SITE_DESCRIPTION,
  keywords: [...DEFAULT_KEYWORDS, "фриланс", "ИИ-бот", "автоматизация", "разработка под ключ"],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.roles.join(", "),
    url: SITE_URL,
    image: absoluteUrl(PROFILE.avatar),
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.city,
      addressCountry: "RU",
    },
    sameAs: [TELEGRAM_URL, FREELANCE_URL],
    worksFor: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
    },
  };

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: serviceFeedOffers.map((offer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: offer.title,
        price: offer.price,
        priceCurrency: "RUB",
        url: absoluteUrl(`/services/${offer.slug}`),
      },
    })),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ru-RU",
    description: SITE_DESCRIPTION,
    areaServed: SITE_REGION,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <App />
    </>
  );
}
