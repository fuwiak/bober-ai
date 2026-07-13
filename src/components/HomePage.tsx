import { getTranslations, getLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { PartnerProgramBanner } from "@/components/PartnerProgramBanner";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { HeroSection } from "@/components/motion/HeroSection";
import { ImplementationCard, type ImplementationArea } from "@/components/motion/ImplementationCard";
import { PackageCard, type PackageItem } from "@/components/motion/PackageCard";
import { MediaSection } from "@/components/motion/MediaSection";
import { PartnerSectionHeader, PartnerSteps } from "@/components/motion/PartnerSteps";
import { ProjectsCasesShowcase } from "@/components/motion/ProjectsCasesShowcase";
import { ReviewsShowcase } from "@/components/motion/ReviewsShowcase";
import { TrustStrip } from "@/components/motion/TrustStrip";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { getEnterpriseReviews } from "@/lib/enterprise-reviews";
import { getMediaItems } from "@/lib/media";
import { PORTFOLIO, PROFILE } from "@/lib/profile";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_NAME,
  TELEGRAM_URL,
  YANDEX_USLUGI_URL,
} from "@/lib/site";

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const skills = t.raw("about.skills") as string[];
  const implementationAreas = t.raw("services.implementationAreas") as ImplementationArea[];
  const packages = t.raw("packages.items") as PackageItem[];
  const mediaItems = getMediaItems(locale);
  const enterpriseReviews = getEnterpriseReviews();
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
          titleLine2={t("hero.titleLine2")}
          valueProposition={t("hero.valueProposition")}
          specialization={t("hero.specialization")}
          ctaPrimary={t("hero.ctaPrimary")}
          ctaSecondary={t("hero.ctaSecondary")}
          trustItems={t.raw("hero.trustItems") as string[]}
          portraitName={PROFILE.name}
          portraitRole={t("hero.portraitRole")}
          onlineLabel={t("common.online")}
          avatar={PROFILE.avatar}
          avatarAlt={PROFILE.name}
        />

        <section className="section-band section--elevated border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">01 · Audience</span>
              <h2 className="display-sm mt-3">{t("audiences.title")}</h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
              {(t.raw("audiences.items") as { title: string; text: string }[]).map((item) => (
                <StaggerItem key={item.title}>
                  <article className="luxury-card h-full p-7">
                    <h3 className="font-medium text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-body">{item.text}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">02 · Trust</span>
              <h2 className="display-sm mt-3">{t("trust.title")}</h2>
            </Reveal>
            <div className="mt-10">
              <TrustStrip
                items={t.raw("trust.strip") as string[]}
                logos={t.raw("trust.logos") as string[]}
              />
            </div>
          </div>
        </section>

        <section id="packages" className="section-band section--panel scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">03 · Engagement</span>
              <h2 className="display-sm mt-3">{t("packages.title")}</h2>
              <p className="mt-4 max-w-2xl text-sm text-body">{t("packages.subtitle")}</p>
            </Reveal>
            <Stagger className="package-grid mt-12">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.name}
                  {...pkg}
                  ctaLabel={t("packages.cta")}
                  featuredLabel={t("packages.featuredLabel")}
                  detailsLabel={t("packages.detailsLabel")}
                />
              ))}
            </Stagger>
          </div>
        </section>

        <section id="services" className="section-band section--deep scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">04 · Solutions</span>
              <h2 className="display-sm mt-3">{t("services.title")}</h2>
              <p className="mt-4 max-w-2xl text-sm text-body">{t("services.subtitle")}</p>
            </Reveal>
            <Stagger className="solutions-grid mt-12">
              {implementationAreas.map((area, index) => (
                <ImplementationCard key={area.title} index={index} {...area} ctaLabel={t("services.discussCta")} />
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-10">
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-link">
                {t("nav.servicesPage")}
                <span className="button-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>

        <section id="process" className="section-band section--elevated scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">05 · Process</span>
              <h2 className="display-sm mt-3">{t("process.title")}</h2>
              <p className="mt-4 max-w-2xl text-sm text-body">{t("process.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {(t.raw("process.steps") as { title: string; text: string }[]).map((step, index) => (
                <StaggerItem key={step.title}>
                  <article className="luxury-card h-full p-6">
                    <span className="font-mono text-xs tracking-widest text-accent-primary-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{step.text}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <h2 className="display-sm">{t("security.title")}</h2>
            </Reveal>
            <ul className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-body">
              {(t.raw("security.items") as string[]).map((item) => (
                <Reveal key={item} delay={0.05}>
                  <li className="flex gap-3">
                    <span className="text-accent-primary-light">✓</span>
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="partners" className="section-band section--panel scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <PartnerSectionHeader
              badge={t("partners.badge")}
              title={t("partners.title")}
              subtitle={t("partners.subtitle")}
              description={t("partners.description")}
            />
            <PartnerSteps steps={t.raw("partners.steps") as { title: string; text: string }[]} />
            <Reveal delay={0.1} className="mt-8">
              <ul className="space-y-2 text-sm text-body">
                {(t.raw("partners.models") as string[]).map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-6">
              <div>
                <p className="font-display text-4xl text-accent-warm">{t("partners.commission")}</p>
                <p className="text-sm text-muted">{t("partners.commissionNote")}</p>
              </div>
              <Link href="/partners" className="btn-primary">
                {t("partners.cta")}
              </Link>
            </Reveal>
          </div>
        </section>

        <section id="portfolio" className="section-band section--deep scroll-mt-16 border-b border-hairline-soft">
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
              categoriesLabel={t("portfolio.categoriesLabel")}
            />
          </div>
        </section>

        <section id="about" className="section-band section--elevated scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">06 · About</span>
              <h2 className="display-sm mt-3">{t("about.title")}</h2>
              <p className="mt-6 max-w-3xl whitespace-pre-line text-base leading-relaxed text-body">{t("about.text")}</p>
              <a href="#contact" className="btn-primary mt-8">
                {t("about.cta")}
              </a>
            </Reveal>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-3">
              <StaggerItem>
                <div className="luxury-card h-full p-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">{t("about.education")}</p>
                  <p className="mt-2 text-sm text-body">{t("about.educationValue")}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="luxury-card h-full p-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">{t("about.schedule")}</p>
                  <p className="mt-2 text-sm text-body">{t("about.scheduleValue")}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="luxury-card h-full p-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">{t("about.collaboration")}</p>
                  <p className="mt-2 text-sm text-body">{t("about.collaborationSummary")}</p>
                  <p className="mt-2 text-xs text-muted">{t("about.collaborationDetail")}</p>
                </div>
              </StaggerItem>
            </Stagger>
            <Reveal delay={0.1} className="mt-12">
              <h3 className="text-xs font-medium uppercase tracking-widest text-muted">{t("about.skillsTitle")}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <ReviewsShowcase
          title={t("reviews.title")}
          subtitle={t("reviews.subtitle")}
          reviews={enterpriseReviews}
        />

        <div className="section-band section--deep border-b border-hairline-soft py-8">
          <div className="container-editorial text-center">
            <a href={YANDEX_USLUGI_URL} target="_blank" rel="noreferrer" className="text-sm text-link">
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
          videoAriaLabel={t("media.videoAriaLabel")}
          articleAriaLabel={t("media.articleAriaLabel")}
          footerNote={t("media.footerNote")}
          footerLinkLabel={t("media.footerLinkLabel")}
          footerLinkHref="#contact"
        />

        <section className="section-band section--deep">
          <div className="container-editorial">
            <Reveal>
              <div className="callout-accent light-sweep">
                <span className="section-label">Engagement</span>
                <h2 className="font-display text-2xl tracking-tight md:text-4xl">{t("cta.title")}</h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-body">{t("cta.subtitle")}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="btn-primary">
                    {t("cta.primary")}
                  </a>
                  <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                    {t("cta.secondary")}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section-band section--elevated scroll-mt-16 border-t border-hairline-soft">
          <div className="container-editorial grid gap-12 md:grid-cols-2">
            <Reveal>
              <span className="section-label">Contact</span>
              <h2 className="display-sm mt-3">{t("contact.title")}</h2>
              <p className="mt-5 text-sm leading-relaxed text-body">{t("contact.subtitle")}</p>
              <div className="mt-8 space-y-2 text-sm">
                <p>
                  <span className="text-muted">{t("contact.email")}: </span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-link font-medium">
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p>
                  <span className="text-muted">{t("contact.telegram")}: </span>
                  <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="text-link font-medium">
                    @pstasinski
                  </a>
                </p>
                <p>
                  <span className="text-muted">{t("contact.phone")}: </span>
                  <a href={`tel:${CONTACT_PHONE}`} className="text-link">
                    {CONTACT_PHONE}
                  </a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="luxury-card p-6 md:p-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
