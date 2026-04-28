import type { Metadata } from "next";
import App from "@/App";
import { CONTACT_EMAIL, ORGANIZATION_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL, TELEGRAM_URL, YOUTUBE_SHORTS_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kinetic AI — внедрение корпоративного ИИ и облачной инфраструктуры",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: ORGANIZATION_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.png"),
    email: CONTACT_EMAIL,
    sameAs: [TELEGRAM_URL, YOUTUBE_SHORTS_URL],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT_EMAIL,
        availableLanguage: ["ru", "en"],
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ru-RU",
    description: SITE_DESCRIPTION,
  };

  const navigationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "SiteNavigationElement", position: 1, name: "Услуги", url: absoluteUrl("/#services") },
      { "@type": "SiteNavigationElement", position: 2, name: "Кейсы", url: absoluteUrl("/#cases") },
      { "@type": "SiteNavigationElement", position: 3, name: "Мероприятия", url: absoluteUrl("/events") },
      { "@type": "SiteNavigationElement", position: 4, name: "ИИ подборка новостей", url: absoluteUrl("/news") },
      { "@type": "SiteNavigationElement", position: 5, name: "Блог", url: absoluteUrl("/blog") },
      { "@type": "SiteNavigationElement", position: 6, name: "Карьера", url: absoluteUrl("/career") },
      { "@type": "SiteNavigationElement", position: 7, name: "Академия Yandex", url: absoluteUrl("/academy") },
      { "@type": "SiteNavigationElement", position: 8, name: "Контакт", url: absoluteUrl("/#contact") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationJsonLd) }}
      />
      <App />
    </>
  );
}
