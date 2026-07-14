import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HomePage from "@/components/HomePage";
import { routing } from "@/i18n/routing";
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
import { getEnterpriseServices } from "@/lib/enterprise-services";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    path: "/",
    locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  const services = getEnterpriseServices(locale);

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

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(HERO_STOCK_IMAGE),
    telephone: CONTACT_PHONE,
    email: CONTACT_EMAIL,
    areaServed: { "@type": "Country", name: "Russia" },
    priceRange: "₽₽₽",
    description: t("description"),
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

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: locale === "en" ? "en-US" : "ru-RU",
    potentialAction: {
      "@type": "ContactAction",
      target: `${SITE_URL}/#contact`,
      name: locale === "en" ? "Request a quote" : "Обсудить проект",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <HomePage />
    </>
  );
}
