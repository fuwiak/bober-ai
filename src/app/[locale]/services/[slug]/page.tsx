import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SeoServicePage } from "@/components/SeoServicePage";
import { getEnterpriseService } from "@/lib/enterprise-services";
import { getAllServiceSlugs, getSeoServiceContent } from "@/lib/seo-services-content";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["ru", "en"]) {
    for (const slug of getAllServiceSlugs(locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = locale === "en" ? "en" : "ru";
  const content = getSeoServiceContent(slug, loc);
  const offer = getEnterpriseService(slug, locale);
  const prefix = locale === "en" ? "/en" : "";

  if (content) {
    return buildPageMetadata({
      title: content.metaTitle,
      description: content.metaDescription,
      path: `${prefix}/services/${slug}`,
      locale,
    });
  }

  if (!offer) return {};
  return buildPageMetadata({
    title: offer.title,
    description: offer.description,
    path: `${prefix}/services/${offer.slug}`,
    locale,
  });
}

export default async function ServiceOfferPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc = locale === "en" ? "en" : "ru";
  const content = getSeoServiceContent(slug, loc);
  const offer = getEnterpriseService(slug, locale);

  if (!content && !offer) notFound();
  if (content) return <SeoServicePage slug={slug} locale={locale} content={content} />;
  notFound();
}
