import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HomePage from "@/components/HomePage";
import { routing } from "@/i18n/routing";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FREELANCE_URL,
  ORGANIZATION_NAME,
  SITE_NAME,
  SITE_URL,
  TELEGRAM_URL,
  absoluteUrl,
} from "@/lib/site";
import { PROFILE } from "@/lib/profile";
import { getEnterpriseServices } from "@/lib/enterprise-services";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const languages: Record<string, string> = {
    ru: absoluteUrl("/"),
    en: absoluteUrl("/en"),
  };

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: {
      canonical: locale === "en" ? absoluteUrl("/en") : absoluteUrl("/"),
      languages,
    },
    openGraph: {
      locale: locale === "en" ? "en_US" : "ru_RU",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const services = getEnterpriseServices(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: "AI architect",
    url: SITE_URL,
    image: absoluteUrl(PROFILE.avatar),
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    sameAs: [TELEGRAM_URL, FREELANCE_URL],
    worksFor: { "@type": "Organization", name: ORGANIZATION_NAME },
  };

  const offersJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((offer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: offer.title,
        price: offer.price,
        priceCurrency: locale === "en" ? "EUR" : "RUB",
        url: absoluteUrl(`/${locale === "en" ? "en/" : ""}services/${offer.slug}`),
      },
    })),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: locale === "en" ? "en-US" : "ru-RU",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <HomePage />
    </>
  );
}
