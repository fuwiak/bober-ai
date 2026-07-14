import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuidePageView } from "@/components/GuidePageView";
import { GUIDES, getGuide } from "@/lib/guides";
import { getGuideContent } from "@/lib/guides-content";
import { buildPageMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const guide of GUIDES) {
      params.push({ locale, slug: guide.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const content = getGuideContent(guide.contentKey, locale === "en" ? "en" : "ru");
  if (!content) return {};

  return buildPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: `/guides/${slug}`,
    locale,
  });
}

export default async function GuideRoutePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = getGuide(slug);
  if (!guide) notFound();

  const content = getGuideContent(guide.contentKey, locale === "en" ? "en" : "ru");
  if (!content) notFound();

  const t = await getTranslations("guides");

  return (
    <GuidePageView
      guide={guide}
      content={content}
      locale={locale}
      ctaLabel={t("cta")}
      telegramLabel={t("telegram")}
    />
  );
}
