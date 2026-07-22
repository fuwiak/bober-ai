import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  ArchitecturePlainSection,
  AuditSampleSection,
  DeliverablesSection,
  PreLaunchChecklistSection,
  SimpleListSection,
} from "@/components/ExpertiseEvidence";
import { MicroConversionsSection } from "@/components/MicroConversionsSection";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { AnimatedServiceCard } from "@/components/motion/AnimatedServiceCard";
import { ImplementationCard, type ImplementationArea } from "@/components/motion/ImplementationCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { routing } from "@/i18n/routing";
import { getEnterpriseServicesListing } from "@/lib/enterprise-services";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/services",
    locale,
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const implementationAreas = t.raw("services.implementationAreas") as ImplementationArea[];
  const services = getEnterpriseServicesListing(locale);
  const audienceItems = t.raw("audiences.items") as { title: string; text: string }[];
  const oneWindowItems = t.raw("oneWindow.items") as { q: string; a: string }[];
  const whereAiItems = t.raw("whereAiNotNeeded.items") as string[];
  const exclusionItems = t.raw("exclusions.items") as string[];
  const deliverablesBefore = t.raw("deliverables.before") as string[];
  const deliverablesAfter = t.raw("deliverables.after") as string[];
  const auditCards = t.raw("auditSample.cards") as { title: string; text: string }[];
  const auditHeaders = t.raw("auditSample.tableHeaders") as string[];
  const auditRows = t.raw("auditSample.tableRows") as string[][];
  const preLaunchItems = t.raw("preLaunch.items") as string[];
  const architectureSteps = t.raw("architecturePlain.steps") as string[];
  const timelineItems = t.raw("timeline.items") as { period: string; text: string }[];
  const resultItems = t.raw("results.items") as { stat: string; label: string }[];

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <Breadcrumbs
                locale={locale}
                items={[{ name: locale === "en" ? "Services" : "Услуги", path: "/services" }]}
              />
              <span className="section-label mt-2 block">{t("sections.solutions")}</span>
              <h1 className="section-title mt-4">{t("services.title")}</h1>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("services.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-10">
              {implementationAreas.map((area, index) => (
                <ImplementationCard key={area.title} index={index} {...area} ctaLabel={t("services.discussCta")} />
              ))}
            </Stagger>
          </div>
        </section>

        <MicroConversionsSection
          label={t("microConversions.label")}
          title={t("microConversions.title")}
          subtitle={t("microConversions.subtitle")}
          items={t.raw("microConversions.items") as { title: string; description: string; cta: string; service: string }[]}
        />

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("servicePage.listTitle")}</span>
              <h2 className="section-title mt-4">{t("servicePage.listTitle")}</h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((offer) => (
                <AnimatedServiceCard
                  key={offer.id}
                  title={offer.title}
                  description={offer.description}
                  salesNotes={offer.salesNotes}
                  deliveryDays={offer.deliveryDays}
                  slug={offer.slug}
                  image={offer.serviceImage}
                  detailsLabel={t("services.details")}
                  quoteLabel={t("services.quote")}
                  daysLabel={t("services.days")}
                />
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("oneWindow.label")}</span>
              <h2 className="section-title mt-4">{t("oneWindow.title")}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("oneWindow.subtitle")}</p>
            </Reveal>
            <Stagger className="comparison-grid mt-10">
              {oneWindowItems.map((item) => (
                <StaggerItem key={item.q}>
                  <article className="comparison-card">
                    <h3 className="card-title text-xl">{item.q}</h3>
                    <p className="body-copy mt-4 text-base">{item.a}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.audience")}</span>
              <h2 className="section-title mt-4">{t("audiences.title")}</h2>
            </Reveal>
            <Stagger className="comparison-grid mt-10">
              {audienceItems.map((item) => (
                <StaggerItem key={item.title}>
                  <article className="comparison-card">
                    <h3 className="card-title text-xl">{item.title}</h3>
                    <p className="body-copy mt-4 text-base">{item.text}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <SimpleListSection
          label={t("whereAiNotNeeded.label")}
          title={t("whereAiNotNeeded.title")}
          subtitle={t("whereAiNotNeeded.subtitle")}
          items={whereAiItems}
          tone="deep"
        />

        <SimpleListSection
          label={t("exclusions.label")}
          title={t("exclusions.title")}
          items={exclusionItems}
          tone="panel"
        />

        <DeliverablesSection
          label={t("deliverables.label")}
          title={t("deliverables.title")}
          subtitle={t("deliverables.subtitle")}
          beforeTitle={t("deliverables.beforeTitle")}
          afterTitle={t("deliverables.afterTitle")}
          before={deliverablesBefore}
          after={deliverablesAfter}
        />

        <AuditSampleSection
          label={t("auditSample.label")}
          title={t("auditSample.title")}
          subtitle={t("auditSample.subtitle")}
          demoNote={t("auditSample.demoNote")}
          cards={auditCards}
          tableTitle={t("auditSample.tableTitle")}
          tableHeaders={auditHeaders}
          tableRows={auditRows}
        />

        <PreLaunchChecklistSection
          label={t("preLaunch.label")}
          title={t("preLaunch.title")}
          subtitle={t("preLaunch.subtitle")}
          acceptanceNote={t("preLaunch.acceptanceNote")}
          items={preLaunchItems}
        />

        <ArchitecturePlainSection
          label={t("architecturePlain.label")}
          title={t("architecturePlain.title")}
          subtitle={t("architecturePlain.subtitle")}
          note={t("architecturePlain.note")}
          steps={architectureSteps}
        />

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("results.label")}</span>
              <h2 className="section-title mt-4">{t("results.title")}</h2>
            </Reveal>
            <Reveal delay={0.05} className="mt-10">
              <div className="trust-specs">
                {resultItems.map((item) => (
                  <div key={item.label} className="spec-cell">
                    <span className="spec-value">{item.stat}</span>
                    <span className="spec-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="mt-6">
              <p className="body-copy max-w-2xl text-sm text-muted">{t("results.note")}</p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("timeline.label")}</span>
              <h2 className="section-title mt-4">{t("timeline.title")}</h2>
            </Reveal>
            <Stagger className="mt-10">
              {timelineItems.map((item) => (
                <StaggerItem key={item.period}>
                  <article className="editorial-row">
                    <span className="editorial-row__index">{item.period}</span>
                    <p className="body-copy text-base">{item.text}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-6">
              <p className="body-copy max-w-2xl text-sm text-muted">{t("timeline.note")}</p>
            </Reveal>
          </div>
        </section>

        <SectionCtaBand
          title={t("sectionCta.title")}
          duration={t("sectionCta.duration")}
          commitment={t("sectionCta.commitment")}
          format={t("sectionCta.format")}
          cta={t("sectionCta.cta")}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
