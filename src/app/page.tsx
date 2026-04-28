import type { Metadata } from "next";
import App from "@/App";
import { CONTACT_EMAIL, DEFAULT_KEYWORDS, ORGANIZATION_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_REGION, SITE_URL, TELEGRAM_URL, YOUTUBE_SHORTS_URL, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Внедрение корпоративного ИИ и облачной инфраструктуры",
  description:
    "Внедрение корпоративного ИИ, облачных LLM, AI-автоматизации и DevOps-решений на базе Yandex Cloud и Selectel для бизнеса в России.",
  keywords: [...DEFAULT_KEYWORDS, "внедрение ИИ", "AI для бизнеса", "Yandex Cloud партнер", "Selectel партнер"],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
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
    areaServed: SITE_REGION,
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

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Внедрение корпоративного ИИ, AI-инфраструктуры, облачных LLM, чат-ботов и автоматизации процессов для B2B.",
    areaServed: SITE_REGION,
    serviceType: [
      "Корпоративный ИИ",
      "AI-инфраструктура",
      "Автоматизация процессов",
      "Облачные LLM",
      "DevOps и облачная инфраструктура",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <App />
    </>
  );
}
