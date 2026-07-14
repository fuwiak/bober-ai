import { getTranslations, getLocale } from "next-intl/server";
import { ContactCta } from "@/components/ContactCta";
import { ClaudeSection } from "@/components/ClaudeSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { FaqSection } from "@/components/FaqSection";
import { MicroConversionsSection } from "@/components/MicroConversionsSection";
import { PackagesShowcase } from "@/components/PackagesShowcase";
import { RoiCalculatorSection } from "@/components/RoiCalculatorSection";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import Image from "next/image";
import { PartnerProgramBanner } from "@/components/PartnerProgramBanner";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { HeroSection } from "@/components/motion/HeroSection";
import { ImplementationCard, type ImplementationArea } from "@/components/motion/ImplementationCard";
import { MediaSection } from "@/components/motion/MediaSection";
import { ProjectsCasesShowcase } from "@/components/motion/ProjectsCasesShowcase";
import { ReviewsShowcase } from "@/components/motion/ReviewsShowcase";
import { TrustStrip } from "@/components/motion/TrustStrip";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { getEnterpriseReviews } from "@/lib/enterprise-reviews";
import { getMediaItems } from "@/lib/media";
import { PORTFOLIO, PROFILE } from "@/lib/profile";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FOUNDER_IMAGE,
  TELEGRAM_URL,
  WHATSAPP_URL,
  YANDEX_USLUGI_URL,
} from "@/lib/site";

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const implementationAreas = t.raw("services.implementationAreas") as ImplementationArea[];
  const mediaItems = getMediaItems(locale);
  const enterpriseReviews = getEnterpriseReviews();
  const trustStats = t.raw("trust.stats") as { value: string; label: string }[];
  const packageItems = t.raw("packages.items") as {
    name: string;
    price: string;
    duration: string;
    forWhom: string;
    result: string;
    featured?: boolean;
    detailsHref?: string;
  }[];
  const homepageCaseSlugs = [
    "kaspersky-ai-assistant",
    "elia-suite",
    "lead-generation",
    "kp-llm-automation",
    "yandex-telemost-agent",
  ] as const;
  const homepageCases = homepageCaseSlugs
    .map((slug) => PORTFOLIO.find((item) => item.slug === slug))
    .filter((item): item is (typeof PORTFOLIO)[number] => Boolean(item));

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
          trustItems={t.raw("hero.trustItems") as string[]}
          heroImage={FOUNDER_IMAGE}
          heroImageAlt={t("hero.heroImageAlt")}
        />

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <TrustStrip stats={trustStats} />
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

        <MicroConversionsSection
          label={t("microConversions.label")}
          title={t("microConversions.title")}
          subtitle={t("microConversions.subtitle")}
          items={t.raw("microConversions.items") as { title: string; description: string; cta: string; service: string }[]}
        />

        <section id="services" className="section-band section--deep scroll-mt-16 border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.solutions")}</span>
              <h2 className="section-title mt-4">{t("services.title")}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("services.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-10">
              {implementationAreas.map((area, index) => (
                <ImplementationCard key={area.title} index={index} {...area} ctaLabel={t("services.discussCta")} />
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-8">
              <Link href="/services" className="text-link text-[11px] uppercase tracking-[0.16em]">
                {t("nav.servicesPage")} →
              </Link>
            </Reveal>
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

        <section id="portfolio" className="section-band section--panel scroll-mt-16 border-b border-hairline">
          <div className="container-editorial">
            <ProjectsCasesShowcase
              items={homepageCases}
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
            <Reveal delay={0.1} className="mt-8">
              <Link href="/portfolio" className="text-link text-[11px] uppercase tracking-[0.16em]">
                {t("portfolio.allCases")} →
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

        <section id="process" className="section-band section--deep scroll-mt-16 border-b border-hairline">
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

        <section id="about" className="section-band section--panel scroll-mt-16 border-b border-hairline">
          <div className="container-editorial grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
            <Reveal>
              <EditorialImageFrame variant="card" className="aspect-[4/3] w-full max-w-sm bg-surface-soft">
                <Image
                  src={FOUNDER_IMAGE}
                  alt={t("about.imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover"
                  loading="lazy"
                />
              </EditorialImageFrame>
            </Reveal>
            <div>
              <Reveal>
                <span className="section-label">{t("sections.about")}</span>
                <h2 className="section-title mt-4">{t("about.title")}</h2>
                <p className="meta-label mt-4">{t("about.tagline")}</p>
                <p className="body-copy mt-4 max-w-3xl whitespace-pre-line text-base">{t("about.text")}</p>
                <p className="meta-label mt-6">{t("about.techStackTitle")}: {t("about.techStack")}</p>
                <ContactCta className="mt-8">{t("about.cta")}</ContactCta>
              </Reveal>
            </div>
          </div>
        </section>

        <ReviewsShowcase
          title={t("reviews.title")}
          subtitle={t("reviews.subtitle")}
          reviews={enterpriseReviews}
          sectionLabel={t("sections.verified")}
        />

        <div className="border-b border-hairline py-8">
          <div className="container-editorial text-center">
            <a href={YANDEX_USLUGI_URL} target="_blank" rel="noreferrer" className="text-link text-[11px] uppercase tracking-[0.16em]">
              {t("reviews.yandexMeta", { rating: PROFILE.rating, count: PROFILE.reviewsCount })} · Yandex
            </a>
          </div>
        </div>

        <MediaSection
          items={mediaItems}
          locale={locale}
          label={t("media.label")}
          title={t("media.title")}
          subtitle={t("media.subtitle")}
          videoCta={t("media.videoCta")}
          articleCta={t("media.articleCta")}
          asSeenIn={t("media.asSeenIn")}
          videoAriaLabel={t("media.videoAriaLabel")}
          articleAriaLabel={t("media.articleAriaLabel")}
          footerNote={t("media.footerNote")}
          footerLinkLabel={t("media.footerLinkLabel")}
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

        <FaqSection
          id="faq"
          label={t("faq.label")}
          title={t("faq.title")}
          subtitle={t("faq.subtitle")}
          items={t.raw("faq.items") as { q: string; a: string }[]}
        />

        <section className="cta-band">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.cta")}</span>
              <h2 className="section-title mt-4">{t("cta.title")}</h2>
              <p className="body-copy mt-4 max-w-xl text-base">{t("cta.subtitle")}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ContactCta>{t("cta.primary")}</ContactCta>
                <TrackedAnchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary" goal="telegram_click">
                  {t("cta.secondary")}
                </TrackedAnchor>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section-band section--panel scroll-mt-16 border-t border-hairline pb-24 md:pb-16">
          <div className="container-editorial max-w-2xl text-center">
            <Reveal>
              <span className="section-label">{t("sections.contact")}</span>
              <h2 className="section-title mt-4">{t("contact.title")}</h2>
              <p className="body-copy mt-4 text-base">{t("contact.subtitle")}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ContactCta>{t("nav.consultCta")}</ContactCta>
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
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
