import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { IntentArticlePage } from "@/components/IntentArticlePage";
import { getAllIntentArticles, getIntentArticle } from "@/lib/seo-catalog";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["ru", "en"]) {
    for (const article of getAllIntentArticles()) {
      params.push({ locale, slug: article.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getIntentArticle(slug);
  if (!article) return {};
  const copy = article[locale === "en" ? "en" : "ru"];
  return buildPageMetadata({
    title: `${copy.title} | Bober AI`,
    description: copy.description,
    keywords: article.keywords,
    path: `/blog/${slug}`,
    locale,
  });
}

export default async function IntentBlogArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getIntentArticle(slug);
  if (!article) notFound();
  return <IntentArticlePage article={article} locale={locale} />;
}
