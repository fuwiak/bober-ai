import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BlogIndexView, getBlogIndexMeta } from "@/components/BlogIndexView";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale === "en" ? "en" : "ru";
  const meta = getBlogIndexMeta(loc);

  return buildPageMetadata({
    title: `${meta.title} | ${SITE_NAME}`,
    description: meta.description,
    keywords: meta.keywords,
    path: "/blog",
    locale,
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: AppLocale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === "en" ? "en" : "ru";

  return <BlogIndexView locale={loc} />;
}
