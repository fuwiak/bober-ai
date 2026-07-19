import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import {
  getCatalogLandingContent,
  isCatalogContentKey,
} from "@/lib/seo-catalog";
import {
  LANDING_PAGES,
  getLandingPage,
  type LandingCategory,
} from "@/lib/landing-pages";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function createLandingPageHandlers(category: LandingCategory) {
  async function generateStaticParams() {
    const params: { locale: string; slug: string }[] = [];
    for (const locale of ["ru", "en"]) {
      for (const page of LANDING_PAGES.filter((item) => item.category === category)) {
        params.push({ locale, slug: page.slug });
      }
    }
    return params;
  }

  async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const page = getLandingPage(category, slug);
    if (!page) return {};

    const loc = locale === "en" ? "en" : "ru";
    if (page.fromCatalog || isCatalogContentKey(page.contentKey)) {
      const content = getCatalogLandingContent(page.contentKey, loc);
      if (!content) return {};
      return buildPageMetadata({
        title: content.metaTitle,
        description: content.metaDescription,
        keywords: content.metaKeywords,
        path: `/${category}/${slug}`,
        locale,
      });
    }

    const t = await getTranslations({ locale, namespace: "landing" });
    const content = t.raw(`pages.${page.contentKey}`) as {
      metaTitle: string;
      metaDescription: string;
      metaKeywords?: string[];
    };

    return buildPageMetadata({
      title: content.metaTitle,
      description: content.metaDescription,
      keywords: content.metaKeywords,
      path: `/${category}/${slug}`,
      locale,
    });
  }

  async function LandingRoutePage({ params }: PageProps) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const page = getLandingPage(category, slug);
    if (!page) notFound();

    return <SeoLandingPage page={page} locale={locale} />;
  }

  return { generateStaticParams, generateMetadata, default: LandingRoutePage };
}
