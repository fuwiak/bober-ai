import type { Metadata } from "next";
import NextLink from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactCta } from "@/components/ContactCta";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ComparisonSection } from "@/components/ComparisonSection";
import { PackagesShowcase } from "@/components/PackagesShowcase";
import { RoiCalculatorSection } from "@/components/RoiCalculatorSection";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { LEGAL_ROUTES } from "@/lib/legal";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pricing" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/pricing",
    locale,
  });
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
  const budgetReasons = t.raw("budgetGate.reasons") as string[];

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <Breadcrumbs
                locale={locale}
                items={[{ name: locale === "en" ? "Pricing" : "Цены", path: "/pricing" }]}
              />
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

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <span className="section-label">{t("budgetGate.label")}</span>
              <h2 className="section-title mt-4">{t("budgetGate.title")}</h2>
              <p className="meta-label mt-6">{t("budgetGate.whyLabel")}</p>
            </Reveal>
            <ul className="mt-4 space-y-3">
              {budgetReasons.map((item) => (
                <Reveal key={item} delay={0.05}>
                  <li className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.1} className="mt-6">
              <p className="body-copy text-sm text-muted">{t("budgetGate.note")}</p>
              <ContactCta className="mt-6" goal="budget_gate_cta_click">
                {t("budgetGate.cta")}
              </ContactCta>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <span className="section-label">{locale === "en" ? "Price list" : "Прайс-лист"}</span>
              <h2 className="section-title mt-4">
                {locale === "en" ? "Service prices" : "Цены на услуги"}
              </h2>
              <p className="body-copy mt-4 max-w-2xl text-base">
                {locale === "en"
                  ? "Starting prices. Final quote is fixed in the estimate before work starts. Payment by bank transfer under contract."
                  : "Цены «от». Итоговая стоимость фиксируется в смете до старта работ. Оплата — безналичный расчёт по договору / счёту."}
              </p>
            </Reveal>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-hairline text-muted">
                    <th className="py-3 pr-4 font-medium">{locale === "en" ? "Service" : "Услуга"}</th>
                    <th className="py-3 pr-4 font-medium">{locale === "en" ? "Price" : "Цена"}</th>
                    <th className="py-3 font-medium">{locale === "en" ? "Term" : "Срок"}</th>
                  </tr>
                </thead>
                <tbody>
                  {packageItems.map((item) => (
                    <tr key={item.name} className="border-b border-hairline">
                      <td className="py-3 pr-4 text-ink">{item.name}</td>
                      <td className="py-3 pr-4 text-ink">{item.price}</td>
                      <td className="py-3 text-body">{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="body-copy mt-6 text-sm text-muted">
              {locale === "en" ? (
                <>
                  Full catalog: <Link href="/services" className="text-link">Services</Link>
                  {" · "}
                  <NextLink href={LEGAL_ROUTES.terms} className="text-link">
                    Service terms
                  </NextLink>
                </>
              ) : (
                <>
                  Полный каталог: <Link href="/services" className="text-link">Услуги</Link>
                  {" · "}
                  <NextLink href={LEGAL_ROUTES.terms} className="text-link">
                    Условия оказания услуг
                  </NextLink>
                </>
              )}
            </p>
          </div>
        </section>

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

        <ComparisonSection
          label={t("problemSolution.label")}
          title={t("problemSolution.title")}
          subtitle={t("problemSolution.subtitle")}
          items={t.raw("problemSolution.items") as { title: string; problem: string; solution: string }[]}
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
