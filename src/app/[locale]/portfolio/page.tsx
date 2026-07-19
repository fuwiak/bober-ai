import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { ProjectsCasesShowcase } from "@/components/motion/ProjectsCasesShowcase";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { PORTFOLIO } from "@/lib/profile";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.portfolio" });
  const path = locale === "en" ? "/en/portfolio" : "/portfolio";
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: absoluteUrl(path) },
  };
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
              <Link href="/" className="link-back">
                {locale === "en" ? "Home" : "На главную"}
              </Link>
            </Reveal>
            <ProjectsCasesShowcase
              items={PORTFOLIO}
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
            />
          </div>
        </section>

        <SectionCtaBand
          title={t("sectionCta.title")}
          duration={t("sectionCta.duration")}
          commitment={t("sectionCta.commitment")}
          format={t("sectionCta.format")}
          cta={t("sectionCta.cta")}
          urgency={t("sectionCta.urgency")}
          className="section--panel"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
