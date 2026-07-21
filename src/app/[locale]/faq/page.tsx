import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ClaudeSection } from "@/components/ClaudeSection";
import { FaqSection } from "@/components/FaqSection";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.faq" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/faq",
    locale,
  });
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const pageUrl = absoluteUrl(locale === "en" ? "/en/faq" : "/faq");

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <Breadcrumbs locale={locale} items={[{ name: "FAQ", path: "/faq" }]} />
            </Reveal>
          </div>
        </section>

        <FaqSection
          id="faq"
          label={t("faq.label")}
          title={t("faq.title")}
          subtitle={t("faq.subtitle")}
          items={t.raw("faq.items") as { q: string; a: string }[]}
          pageUrl={pageUrl}
          className="section--deep"
        />

        <ClaudeSection
          label={t("claude.label")}
          title={t("claude.title")}
          subtitle={t("claude.subtitle")}
          popularLabel={t("claude.popularLabel")}
          terms={t.raw("claude.terms") as string[]}
          glossaryLink={t("claude.glossaryLink")}
          cta={t("claude.cta")}
        />

        <SectionCtaBand
          title={t("sectionCta.title")}
          duration={t("sectionCta.duration")}
          commitment={t("sectionCta.commitment")}
          format={t("sectionCta.format")}
          cta={t("sectionCta.cta")}
          className="section--panel"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
