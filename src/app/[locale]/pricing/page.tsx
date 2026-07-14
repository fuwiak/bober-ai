import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ComparisonSection } from "@/components/ComparisonSection";
import { PackagesShowcase } from "@/components/PackagesShowcase";
import { RoiCalculatorSection } from "@/components/RoiCalculatorSection";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pricing" });
  const path = locale === "en" ? "/en/pricing" : "/pricing";
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: absoluteUrl(path) },
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const packageItems = t.raw("packages.items") as {
    name: string;
    price: string;
    duration: string;
    forWhom: string;
    result: string;
    featured?: boolean;
    detailsHref?: string;
  }[];

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <Link href="/" className="text-link text-sm">
                ← {locale === "en" ? "Home" : "На главную"}
              </Link>
            </Reveal>
          </div>
        </section>

        <PackagesShowcase
          label={t("sections.engagement")}
          title={t("packages.title")}
          subtitle={t("packages.subtitle")}
          items={packageItems}
          featuredLabel={t("packages.featuredLabel")}
          detailsLabel={t("packages.detailsLabel")}
          cta={t("packages.cta")}
          urgency={t("packages.urgency")}
        />

        <RoiCalculatorSection
          label={t("roiCalculator.label")}
          title={t("roiCalculator.title")}
          subtitle={t("roiCalculator.subtitle")}
          employeesLabel={t("roiCalculator.employeesLabel")}
          hoursLabel={t("roiCalculator.hoursLabel")}
          salaryLabel={t("roiCalculator.salaryLabel")}
          savingsLabel={t("roiCalculator.savingsLabel")}
          resultLabel={t("roiCalculator.resultLabel")}
          resultNote={t("roiCalculator.resultNote")}
          cta={t("roiCalculator.cta")}
        />

        <ComparisonSection
          label={t("comparison.label")}
          title={t("comparison.title")}
          subtitle={t("comparison.subtitle")}
          items={t.raw("comparison.items") as { title: string; problem: string; solution: string }[]}
        />

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.process")}</span>
              <h2 className="section-title mt-4">{t("process.title")}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("process.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-10">
              {(t.raw("process.steps") as { title: string; text: string }[]).map((step, index) => (
                <StaggerItem key={step.title}>
                  <article className="process-row">
                    <span className="editorial-row__index">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="card-title">{step.title}</h3>
                      <p className="body-copy mt-3 max-w-2xl text-base">{step.text}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <SectionCtaBand
          title={t("sectionCta.title")}
          duration={t("sectionCta.duration")}
          commitment={t("sectionCta.commitment")}
          format={t("sectionCta.format")}
          cta={t("sectionCta.cta")}
          urgency={t("sectionCta.urgency")}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
