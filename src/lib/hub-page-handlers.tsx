import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SeoHubPage } from "@/components/SeoHubPage";
import { getHub } from "@/lib/seo-catalog/hubs";
import { buildPageMetadata } from "@/lib/seo";
import type { CatalogCategory } from "@/lib/seo-catalog/types";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function createHubPageHandlers(category: CatalogCategory) {
  async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const hub = getHub(category);
    if (!hub) return {};
    const copy = hub[locale === "en" ? "en" : "ru"];
    return buildPageMetadata({
      title: copy.metaTitle,
      description: copy.metaDescription,
      path: `/${category}`,
      locale,
    });
  }

  async function HubRoutePage({ params }: PageProps) {
    const { locale } = await params;
    setRequestLocale(locale);
    const hub = getHub(category);
    if (!hub) notFound();
    return <SeoHubPage hub={hub} locale={locale} />;
  }

  return { generateMetadata, default: HubRoutePage };
}
