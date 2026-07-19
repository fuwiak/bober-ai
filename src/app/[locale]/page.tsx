import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HomePage from "@/components/HomePage";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";
import { getEnterpriseServices } from "@/lib/enterprise-services";
import {
  buildPageMetadata,
  organizationJsonLd as orgSchema,
  websiteJsonLd as siteSchema,
} from "@/lib/seo";

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
    ...orgSchema(locale),
    description: t("description"),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema(locale)) }} />
      <HomePage />
    </>
  );
}
