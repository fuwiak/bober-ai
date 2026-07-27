import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SeoServicePage } from "@/components/SeoServicePage";
import { routing } from "@/i18n/routing";
import { CLAUDE_PAGE, getClaudeSeoContent } from "@/lib/claude-page";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale !== "en";
  const p = CLAUDE_PAGE;
  return buildPageMetadata({
    title: ru ? p.metaTitleRu : p.metaTitleEn,
    description: ru ? p.metaDescRu : p.metaDescEn,
    keywords: ru ? [...p.metaKeywordsRu] : [...p.metaKeywordsEn],
    path: "/claude",
    locale,
  });
}

export default async function ClaudePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === "en" ? "en" : "ru";
  const content = getClaudeSeoContent(loc);
  const crumbName = loc === "ru" ? "Claude AI для МСБ" : "Claude AI for SMB";

  return (
    <SeoServicePage
      slug="claude-smb"
      serviceSlug="claude-smb"
      locale={locale}
      content={content}
      pagePath="/claude"
      breadcrumbItems={[{ name: crumbName, path: "/claude" }]}
    />
  );
}
