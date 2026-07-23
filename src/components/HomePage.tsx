import { getLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { ContactCta } from "@/components/ContactCta";
import { BeforeAfterDemoSection } from "@/components/ExpertiseEvidence";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PackagesShowcase } from "@/components/PackagesShowcase";
import { FaqSection } from "@/components/FaqSection";
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

/**
 * Compact homepage (~30% shorter): hero → proof → before/after (merged pains) →
 * cases → packages → FAQ → contact. Dropped repeating budget/problems/why/trust/hub/CTA bands.
 */
export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const trustStats = t.raw("trust.stats") as { value: string; label: string }[];
  const trustBenefits = t.raw("trust.benefits") as { title: string; text: string }[];
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
  const faqItems = (t.raw("faq.items") as { q: string; a: string }[]).slice(0, 4);
  const beforeSteps = t.raw("beforeAfterDemo.beforeSteps") as { label: string; status: string }[];
  const afterSteps = t.raw("beforeAfterDemo.afterSteps") as { label: string; status: string }[];
  const demoFlow = t.raw("beforeAfterDemo.flow") as string[];
  const caseStudies = getPortfolioListing(locale).slice(0, 3);

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <HeroSection
          eyebrow={t("hero.eyebrow")}
          titleLine1={t("hero.titleLine1")}
          titleLine2={t("hero.titleLine2") || undefined}
          titleStyle={t("hero.titleLine2") ? "headline" : "sentence"}
          valueProposition={t("hero.valueProposition")}
          differentiator={t("hero.differentiator")}
          specialization={t("hero.specialization")}
          ctaPrimary={t("cta.primary")}
          ctaSecondary={t("hero.ctaSecondary")}
          ctaSecondaryHref="/#cases"
          trustItems={t.raw("hero.trustItems") as string[]}
          heroImage={FOUNDER_IMAGE}
          heroImageAlt={t("hero.heroImageAlt")}
        />

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <TrustStrip stats={trustStats} benefits={trustBenefits} />
          </div>
        </section>

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

        <section id="cases" className="section-band section--panel scroll-mt-16 border-b border-hairline">
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
                    discussLabel={t("cta.primary")}
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

        <PackagesShowcase
          label={t("sections.engagement")}
          title={t("packages.title")}
          subtitle={t("packages.subtitle")}
          items={packageItems}
          featuredLabel={t("packages.featuredLabel")}
          detailsLabel={t("packages.detailsLabel")}
          cta={t("cta.primary")}
          moreHref="/pricing"
          moreLabel={t("homeLanding.packagesMore")}
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

        <section id="contact" className="section-band section--panel scroll-mt-16 border-t border-hairline pb-24 md:pb-16">
          <div className="container-editorial max-w-2xl">
            <Reveal>
              <div className="text-center">
                <span className="section-label">{t("sections.contact")}</span>
                <h2 className="section-title mt-4">{t("contact.title")}</h2>
                <p className="body-copy mt-4 text-base">{t("contact.subtitle")}</p>
                <p className="body-copy mt-3 text-sm text-muted">{t("contact.afterSubmit")}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <ContactCta>{t("cta.primary")}</ContactCta>
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
