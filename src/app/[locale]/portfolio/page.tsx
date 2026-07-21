import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { ProjectsCasesShowcase } from "@/components/motion/ProjectsCasesShowcase";
import { Reveal } from "@/components/motion/Reveal";
import { routing } from "@/i18n/routing";
import { getPortfolioListing } from "@/lib/profile";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.portfolio" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/portfolio",
    locale,
  });
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <Breadcrumbs
                locale={locale}
                items={[{ name: locale === "en" ? "Portfolio" : "Портфолио", path: "/portfolio" }]}
              />
            </Reveal>
            <ProjectsCasesShowcase
              items={getPortfolioListing()}
              title={t("portfolio.title")}
              subtitle={t("portfolio.subtitle")}
              detailsLabel={t("portfolio.details")}
              allLabel={locale === "en" ? "All" : "Все"}
              problemLabel={t("portfolio.problemLabel")}
              solutionLabel={t("portfolio.solutionLabel")}
              resultLabel={t("portfolio.resultLabel")}
              metricLabel={t("portfolio.metricLabel")}
              stackLabel={t("portfolio.stackLabel")}
              categoriesLabel={t("portfolio.categoriesLabel")}
              sectionLabel={t("sections.portfolio")}
              roleLabel={locale === "en" ? "Role" : "Роль"}
              scopeLabel={locale === "en" ? "Scope" : "Объём"}
              durationLabel={locale === "en" ? "Duration" : "Срок"}
              architectureLabel={locale === "en" ? "Architecture" : "Архитектура"}
            />
          </div>
        </section>

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
