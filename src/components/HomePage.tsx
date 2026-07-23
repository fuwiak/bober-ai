import { getLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { ContactCta } from "@/components/ContactCta";
import { BeforeAfterDemoSection } from "@/components/ExpertiseEvidence";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { HomeHubSection } from "@/components/HomeHubSection";
import { LeadMagnetsSection } from "@/components/LeadMagnetsSection";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { PartnerProgramBanner } from "@/components/PartnerProgramBanner";
import { PackagesShowcase } from "@/components/PackagesShowcase";
import { FaqSection } from "@/components/FaqSection";
import { RoiCalculatorSection } from "@/components/RoiCalculatorSection";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { HeroSection } from "@/components/motion/HeroSection";
import { TrustStrip } from "@/components/motion/TrustStrip";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Link } from "@/i18n/navigation";
import { getPortfolioListing } from "@/lib/profile";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FOUNDER_IMAGE,
  TELEGRAM_URL,
  WHATSAPP_URL,
} from "@/lib/site";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const trustStats = t.raw("trust.stats") as { value: string; label: string }[];
  const trustBenefits = t.raw("trust.benefits") as { title: string; text: string }[];
  const budgetStats = t.raw("trust.budgetStats") as { value: string; label: string }[];
  const problemItems = t.raw("problemsWeSolve.items") as string[];
  const packageItems = (
    t.raw("packages.items") as {
      name: string;
      price: string;
      duration: string;
      forWhom: string;
      result: string;
      featured?: boolean;
      detailsHref?: string;
    }[]
  ).slice(0, 3);
  const whyTrustItems = (t.raw("whyTrust.items") as string[]).slice(0, 5);
  const faqItems = (t.raw("faq.items") as { q: string; a: string }[]).slice(0, 6);
  const beforeSteps = t.raw("beforeAfterDemo.beforeSteps") as { label: string; status: string }[];
  const afterSteps = t.raw("beforeAfterDemo.afterSteps") as { label: string; status: string }[];
  const demoFlow = t.raw("beforeAfterDemo.flow") as string[];
  const depthItems = t.raw("homeLanding.depthItems") as {
    href: string;
    title: string;
    description: string;
  }[];
  const leadMagnetItems = t.raw("leadMagnets.items") as {
    id: string;
    title: string;
    description: string;
    cta: string;
    href?: string;
    service?: string;
  }[];
  const caseStudies = getPortfolioListing(locale);

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
          ctaSecondaryHref="/#cases"
          trustItems={t.raw("hero.trustItems") as string[]}
          heroImage={FOUNDER_IMAGE}
          heroImageAlt={t("hero.heroImageAlt")}
          founderName={t("hero.nameLine")}
          founderRole={t("hero.founderBadge")}
          founderTeamLine={t("hero.teamLine")}
        />

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <TrustStrip stats={trustStats} benefits={trustBenefits} />
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("homeLanding.budgetLabel")}</span>
              <h2 className="section-title mt-4">{t("homeLanding.budgetTitle")}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("homeLanding.budgetNote")}</p>
            </Reveal>
            <div className="trust-specs mt-8">
              {budgetStats.map((stat) => (
                <div key={stat.label} className="spec-cell">
                  <span className="spec-value">{stat.value}</span>
                  <span className="spec-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <Reveal delay={0.1} className="mt-8">
              <ContactCta goal="home_budget_cta_click">{t("homeLanding.budgetCta")}</ContactCta>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
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
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
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

        <section id="cases" className="section-band section--deep scroll-mt-16 border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("homeLanding.casesLabel")}</span>
              <h2 className="section-title mt-4">{t("homeLanding.casesTitle")}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("homeLanding.casesSubtitle")}</p>
            </Reveal>
            <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
              {caseStudies.map((item) => (
                <StaggerItem key={item.slug}>
                  <CaseStudyCard
                    item={item}
                    viewLabel={t("common.viewCaseStudy")}
                    beforeLabel={t("homeLanding.caseBeforeLabel")}
                    afterLabel={t("homeLanding.caseAfterLabel")}
                    discussLabel={t("homeLanding.caseDiscussCta")}
                  />
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-8">
              <Link href="/portfolio" className="link-more">
                {t("homeLanding.casesCta")}
              </Link>
            </Reveal>
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
        />

        <LeadMagnetsSection
          label={t("leadMagnets.label")}
          title={t("leadMagnets.title")}
          subtitle={t("leadMagnets.subtitle")}
          items={leadMagnetItems}
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

        <PackagesShowcase
          label={t("sections.engagement")}
          title={t("packages.title")}
          subtitle={t("packages.subtitle")}
          items={packageItems}
          featuredLabel={t("packages.featuredLabel")}
          detailsLabel={t("packages.detailsLabel")}
          cta={t("packages.cta")}
          urgency={`${t("packages.urgency")} ${t("packages.auditNote")}`}
          moreHref="/pricing"
          moreLabel={t("homeLanding.packagesMore")}
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
            <Reveal delay={0.1} className="mt-6">
              <Link href="/media" className="link-more">
                {t("homeLanding.whyTrustMore")}
              </Link>
            </Reveal>
          </div>
        </section>

        <HomeHubSection
          label={t("homeLanding.depthLabel")}
          title={t("homeLanding.depthTitle")}
          subtitle={t("homeLanding.depthSubtitle")}
          linkLabel={t("common.readMore")}
          items={depthItems}
        />

        <FaqSection
          label={t("faq.label")}
          title={t("faq.title")}
          subtitle={t("faq.subtitle")}
          items={faqItems}
          moreHref="/faq"
          moreLabel={t("homeLanding.faqMore")}
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
                <p className="body-copy mt-3 text-sm text-muted">{t("contact.afterSubmit")}</p>
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
                <ContactForm qualify />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
