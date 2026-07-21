import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ContactCta } from "@/components/ContactCta";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import {
  ArchitecturePlainSection,
  AuditSampleSection,
  BeforeAfterDemoSection,
  DeliverablesSection,
  PreLaunchChecklistSection,
  SimpleListSection,
} from "@/components/ExpertiseEvidence";
import { HomeHubSection } from "@/components/HomeHubSection";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { PartnerProgramBanner } from "@/components/PartnerProgramBanner";
import { PackagesShowcase } from "@/components/PackagesShowcase";
import { ComparisonSection } from "@/components/ComparisonSection";
import { FaqSection } from "@/components/FaqSection";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { HeroSection } from "@/components/motion/HeroSection";
import { TrustStrip } from "@/components/motion/TrustStrip";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FOUNDER_IMAGE,
  OFFICE_STOCK_IMAGES,
  TELEGRAM_URL,
  WHATSAPP_URL,
} from "@/lib/site";

export default async function HomePage() {
  const t = await getTranslations();
  const trustStats = t.raw("trust.stats") as { value: string; label: string }[];
  const problemItems = t.raw("problemsWeSolve.items") as string[];
  const oneWindowItems = t.raw("oneWindow.items") as { q: string; a: string }[];
  const audienceItems = t.raw("audiences.items") as { title: string; text: string }[];
  const budgetReasons = t.raw("budgetGate.reasons") as string[];
  const processSteps = t.raw("process.steps") as { title: string; text: string }[];
  const resultItems = t.raw("results.items") as { stat: string; label: string }[];
  const problemSolutionItems = t.raw("problemSolution.items") as { title: string; problem: string; solution: string }[];
  const packageItems = t.raw("packages.items") as {
    name: string;
    price: string;
    duration: string;
    forWhom: string;
    result: string;
    featured?: boolean;
    detailsHref?: string;
  }[];
  const whyTrustItems = t.raw("whyTrust.items") as string[];
  const timelineItems = t.raw("timeline.items") as { period: string; text: string }[];
  const faqItems = (t.raw("faq.items") as { q: string; a: string }[]).slice(0, 6);
  const deliverablesBefore = t.raw("deliverables.before") as string[];
  const deliverablesAfter = t.raw("deliverables.after") as string[];
  const beforeSteps = t.raw("beforeAfterDemo.beforeSteps") as { label: string; status: string }[];
  const afterSteps = t.raw("beforeAfterDemo.afterSteps") as { label: string; status: string }[];
  const auditCards = t.raw("auditSample.cards") as { title: string; text: string }[];
  const auditHeaders = t.raw("auditSample.tableHeaders") as string[];
  const auditRows = t.raw("auditSample.tableRows") as string[][];
  const preLaunchItems = t.raw("preLaunch.items") as string[];
  const architectureSteps = t.raw("architecturePlain.steps") as string[];
  const whereAiItems = t.raw("whereAiNotNeeded.items") as string[];
  const exclusionItems = t.raw("exclusions.items") as string[];
  const demoFlow = t.raw("beforeAfterDemo.flow") as string[];

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <PartnerProgramBanner />
      <main>
        <HeroSection
          eyebrow={t("hero.eyebrow")}
          titleLine1={t("hero.titleLine1")}
          titleLine2={t("hero.titleLine2") || undefined}
          titleStyle={t("hero.titleLine2") ? "headline" : "sentence"}
          valueProposition={t("hero.valueProposition")}
          differentiator={t("hero.differentiator")}
          specialization={t("hero.specialization")}
          ctaPrimary={t("hero.ctaPrimary")}
          ctaSecondary={t("hero.ctaSecondary")}
          ctaSecondaryHref="/portfolio"
          trustItems={t.raw("hero.trustItems") as string[]}
          heroImage={FOUNDER_IMAGE}
          heroImageAlt={t("hero.heroImageAlt")}
          accentImages={[
            { src: OFFICE_STOCK_IMAGES.tower },
            { src: OFFICE_STOCK_IMAGES.facade },
          ]}
        />

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <TrustStrip stats={trustStats} />
          </div>
        </section>

        <section className="prestige-gallery border-b border-hairline" aria-label={t("hero.officeGalleryLabel")}>
          <div className="prestige-gallery__grid">
            <Reveal className="prestige-gallery__main">
              <EditorialImageFrame variant="hero" className="prestige-gallery__frame">
                <Image
                  src={OFFICE_STOCK_IMAGES.interior}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </EditorialImageFrame>
            </Reveal>
            <Reveal delay={0.06} className="prestige-gallery__side">
              <EditorialImageFrame variant="card" className="prestige-gallery__frame">
                <Image
                  src={OFFICE_STOCK_IMAGES.tower}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </EditorialImageFrame>
            </Reveal>
            <Reveal delay={0.12} className="prestige-gallery__side">
              <EditorialImageFrame variant="card" className="prestige-gallery__frame">
                <Image
                  src={OFFICE_STOCK_IMAGES.facade}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </EditorialImageFrame>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.problems")}</span>
              <h2 className="section-title mt-4">{t("problemsWeSolve.title")}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("problemsWeSolve.subtitle")}</p>
            </Reveal>
            <ul className="mt-8 max-w-3xl space-y-3">
              {problemItems.map((item) => (
                <Reveal key={item} delay={0.05}>
                  <li className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.1} className="mt-6">
              <p className="body-copy max-w-2xl text-sm text-muted">{t("problemsWeSolve.solutionsIntro")}</p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.whyUs")}</span>
              <h2 className="section-title mt-4">{t("whyUs.title")}</h2>
              <p className="body-copy mt-4 max-w-3xl text-base">{t("whyUs.text")}</p>
            </Reveal>
            <ul className="mt-8 max-w-3xl space-y-3">
              {(t.raw("whyUs.benefits") as string[]).map((item) => (
                <Reveal key={item} delay={0.05}>
                  <li className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <SimpleListSection
          label={t("whereAiNotNeeded.label")}
          title={t("whereAiNotNeeded.title")}
          subtitle={t("whereAiNotNeeded.subtitle")}
          items={whereAiItems}
          tone="panel"
        />

        <section className="section-band section--panel border-b border-hairline">
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

        <section className="section-band section--deep border-b border-hairline">
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
          label={t("exclusions.label")}
          title={t("exclusions.title")}
          items={exclusionItems}
          tone="panel"
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
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.process")}</span>
              <h2 className="section-title mt-4">{t("process.title")}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("process.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-10">
              {processSteps.map((step, index) => (
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

        <DeliverablesSection
          label={t("deliverables.label")}
          title={t("deliverables.title")}
          subtitle={t("deliverables.subtitle")}
          beforeTitle={t("deliverables.beforeTitle")}
          afterTitle={t("deliverables.afterTitle")}
          before={deliverablesBefore}
          after={deliverablesAfter}
        />

        <BeforeAfterDemoSection
          label={t("beforeAfterDemo.label")}
          title={t("beforeAfterDemo.title")}
          subtitle={t("beforeAfterDemo.subtitle")}
          demoNote={t("beforeAfterDemo.demoNote")}
          beforeLabel={t("beforeAfterDemo.beforeLabel")}
          afterLabel={t("beforeAfterDemo.afterLabel")}
          beforeMetric={t("beforeAfterDemo.beforeMetric")}
          afterMetric={t("beforeAfterDemo.afterMetric")}
          beforeSteps={beforeSteps}
          afterSteps={afterSteps}
          flow={demoFlow}
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

        <ComparisonSection
          label={t("problemSolution.label")}
          title={t("problemSolution.title")}
          subtitle={t("problemSolution.subtitle")}
          items={problemSolutionItems}
        />

        <PackagesShowcase
          label={t("sections.engagement")}
          title={t("packages.title")}
          subtitle={t("packages.subtitle")}
          items={packageItems}
          featuredLabel={t("packages.featuredLabel")}
          detailsLabel={t("packages.detailsLabel")}
          cta={t("packages.cta")}
          urgency={`${t("packages.urgency")} ${t("packages.auditNote")}`}
        />

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("whyTrust.label")}</span>
              <h2 className="section-title mt-4">{t("whyTrust.title")}</h2>
            </Reveal>
            <ul className="mt-8 max-w-3xl space-y-3">
              {whyTrustItems.map((item) => (
                <Reveal key={item} delay={0.05}>
                  <li className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
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

        <HomeHubSection
          label={t("homeHub.label")}
          title={t("homeHub.title")}
          linkLabel={t("common.readMore")}
          items={t.raw("homeHub.items") as { href: string; title: string; description: string }[]}
        />

        <FaqSection
          label={t("faq.label")}
          title={t("faq.title")}
          subtitle={t("faq.subtitle")}
          items={faqItems}
          className="section--deep"
        />

        <SectionCtaBand
          title={t("sectionCta.title")}
          duration={t("sectionCta.duration")}
          commitment={t("sectionCta.commitment")}
          format={t("sectionCta.format")}
          cta={t("sectionCta.cta")}
          urgency={t("sectionCta.urgency")}
        />

        <section id="contact" className="section-band section--panel scroll-mt-16 border-t border-hairline pb-24 md:pb-16">
          <div className="container-editorial max-w-2xl">
            <Reveal>
              <div className="text-center">
                <span className="section-label">{t("sections.contact")}</span>
                <h2 className="section-title mt-4">{t("contact.title")}</h2>
                <p className="body-copy mt-4 text-base">{t("contact.subtitle")}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <TrackedAnchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary" goal="telegram_click">
                    Telegram
                  </TrackedAnchor>
                  <TrackedAnchor href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-secondary" goal="modal_whatsapp_click">
                    WhatsApp
                  </TrackedAnchor>
                  <TrackedAnchor href={`mailto:${CONTACT_EMAIL}`} className="btn-secondary" goal="email_click">
                    Email
                  </TrackedAnchor>
                  <TrackedAnchor href={`tel:${CONTACT_PHONE}`} className="btn-secondary" goal="phone_click">
                    {CONTACT_PHONE}
                  </TrackedAnchor>
                </div>
              </div>
              <div className="mt-10 text-left">
                <DiagnosticForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
