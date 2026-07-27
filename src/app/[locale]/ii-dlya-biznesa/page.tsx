import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SeoServicePage } from "@/components/SeoServicePage";
import { routing } from "@/i18n/routing";
import { getIiDlyaBiznesaSeoContent, II_DLYA_BIZNESA_PAGE } from "@/lib/ii-dlya-biznesa-page";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale !== "en";
  const p = II_DLYA_BIZNESA_PAGE;
  return buildPageMetadata({
    title: ru ? p.metaTitleRu : p.metaTitleEn,
    description: ru ? p.metaDescRu : p.metaDescEn,
    keywords: ru ? [...p.metaKeywordsRu] : [...p.metaKeywordsEn],
    path: "/ii-dlya-biznesa",
    locale,
  });
}

export default async function IiDlyaBiznesaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === "en" ? "en" : "ru";
  const content = getIiDlyaBiznesaSeoContent(loc);
  const crumbName = loc === "ru" ? "ИИ для бизнеса" : "AI for business";

  return (
    <SeoServicePage
      slug="ii-dlya-biznesa"
      serviceSlug="ii-dlya-biznesa"
      locale={locale}
      content={content}
      pagePath="/ii-dlya-biznesa"
      breadcrumbItems={[{ name: crumbName, path: "/ii-dlya-biznesa" }]}
    />
  );
}
