import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { ContactCta } from "@/components/ContactCta";
import { TrackedAnchor } from "@/components/TrackedAnchor";
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
  ABOUT_STOCK_IMAGE,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  GITHUB_URL,
  HERO_STOCK_IMAGE,
  LINKEDIN_URL,
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
  const trustStats = t.raw("trust.stats") as { value: string; label: string }[];
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
          heroImage={HERO_STOCK_IMAGE}
          heroImageAlt={t("hero.heroImageAlt")}
        />

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <TrustStrip stats={trustStats} />
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <span className="section-label">{t("sections.problems")}</span>
              <h2 className="section-title mt-4">{t("problemsWeSolve.title")}</h2>
              <p className="body-copy mt-4 text-base">{t("problemsWeSolve.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-10">
              {(t.raw("problemsWeSolve.items") as string[]).map((item) => (
                <StaggerItem key={item}>
                  <p className="body-copy text-base">— {item}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-10">
              <p className="body-copy text-base font-medium">{t("problemsWeSolve.solutionsIntro")}</p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <span className="section-label">{t("sections.philosophy")}</span>
              <h2 className="section-title mt-4">{t("philosophy.title")}</h2>
              <p className="body-copy mt-4 text-base">{t("philosophy.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-10">
              {(t.raw("philosophy.items") as string[]).map((item) => (
                <StaggerItem key={item}>
                  <p className="body-copy text-base">— {item}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-8">
              <p className="body-copy text-base font-medium">{t("philosophy.closing")}</p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.audience")}</span>
              <h2 className="section-title mt-4">{t("audiences.title")}</h2>
            </Reveal>
            <Stagger className="mt-12">
              {(t.raw("audiences.items") as { title: string; text: string }[]).map((item, index) => (
                <StaggerItem key={item.title}>
                  <article className="audience-row">
                    <span className="editorial-row__index">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="card-title">{item.title}</h3>
                      <p className="body-copy mt-4 max-w-2xl text-base">{item.text}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="packages" className="section-band section--deep scroll-mt-16 border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.engagement")}</span>
              <h2 className="section-title mt-4">{t("packages.title")}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("packages.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-12">
              {packages.map((pkg, index) => (
                <PackageCard
                  key={pkg.name}
                  index={index}
                  {...pkg}
                  ctaLabel={t("packages.cta")}
                  featuredLabel={t("packages.featuredLabel")}
                  detailsLabel={t("packages.detailsLabel")}
                />
              ))}
            </Stagger>
          </div>
        </section>

        <section id="services" className="section-band section--panel scroll-mt-16 border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.solutions")}</span>
              <h2 className="section-title mt-4">{t("services.title")}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("services.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-12">
              {implementationAreas.map((area, index) => (
                <ImplementationCard key={area.title} index={index} {...area} ctaLabel={t("services.discussCta")} />
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-10">
              <Link href="/services" className="text-link text-[11px] uppercase tracking-[0.16em]">
                {t("nav.servicesPage")} →
              </Link>
            </Reveal>
          </div>
        </section>

        <section id="portfolio" className="section-band section--deep scroll-mt-16 border-b border-hairline">
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
              sectionLabel={t("sections.portfolio")}
            />
          </div>
        </section>

        <section id="process" className="section-band section--panel scroll-mt-16 border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.process")}</span>
              <h2 className="section-title mt-4">{t("process.title")}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("process.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-12">
              {(t.raw("process.steps") as { title: string; text: string }[]).map((step, index) => (
                <StaggerItem key={step.title}>
                  <article className="process-row">
                    <span className="editorial-row__index">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="card-title">{step.title}</h3>
                      <p className="body-copy mt-4 max-w-2xl text-base">{step.text}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">{t("security.title")}</h2>
            </Reveal>
            <ul className="mt-10 max-w-3xl space-y-4">
              {(t.raw("security.items") as string[]).map((item) => (
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

        <section id="partners" className="section-band section--panel scroll-mt-16 border-b border-hairline">
          <div className="container-editorial">
            <PartnerSectionHeader
              badge={t("partners.badge")}
              title={t("partners.title")}
              subtitle={t("partners.subtitle")}
              description={t("partners.description")}
            />
            <PartnerSteps steps={t.raw("partners.steps") as { title: string; text: string }[]} />
            <Reveal delay={0.1} className="mt-10">
              <ul className="space-y-2 text-base text-body">
                {(t.raw("partners.models") as string[]).map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15} className="mt-12">
              <Link href="/partners" className="btn-primary">
                {t("partners.cta")}
              </Link>
            </Reveal>
          </div>
        </section>

        <section id="about" className="section-band section--deep scroll-mt-16 border-b border-hairline">
          <div className="container-editorial grid gap-16 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
            <Reveal>
              <EditorialImageFrame variant="card" className="aspect-[4/3] w-full max-w-md bg-surface-soft">
                <Image
                  src={ABOUT_STOCK_IMAGE}
                  alt={t("about.imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
              </EditorialImageFrame>
            </Reveal>
            <div>
              <Reveal>
              <span className="section-label">{t("sections.about")}</span>
                <h2 className="section-title mt-4">{t("about.title")}</h2>
                <p className="meta-label mt-6">{t("about.tagline")}</p>
                <p className="body-copy mt-6 max-w-3xl whitespace-pre-line text-base">{t("about.text")}</p>
                <ContactCta className="mt-10">{t("about.cta")}</ContactCta>
              </Reveal>
              <Stagger className="mt-12 border-t border-hairline">
                <StaggerItem>
                  <div className="audience-row">
                    <span className="editorial-row__index">01</span>
                    <div>
                      <p className="meta-label">{t("about.approach")}</p>
                      <p className="body-copy mt-2 text-base">{t("about.approachValue")}</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="audience-row">
                    <span className="editorial-row__index">02</span>
                    <div>
                      <p className="meta-label">{t("about.schedule")}</p>
                      <p className="body-copy mt-2 text-base">{t("about.scheduleValue")}</p>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="audience-row">
                    <span className="editorial-row__index">03</span>
                    <div>
                      <p className="meta-label">{t("about.collaboration")}</p>
                      <p className="body-copy mt-2 text-base">{t("about.collaborationSummary")}</p>
                      <p className="mt-2 text-base text-muted">{t("about.collaborationDetail")}</p>
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>
              <Reveal delay={0.1} className="mt-12">
                <h3 className="meta-label">{t("about.skillsTitle")}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
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

        <div className="border-b border-hairline py-12">
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
          videoAriaLabel={t("media.videoAriaLabel")}
          articleAriaLabel={t("media.articleAriaLabel")}
          footerNote={t("media.footerNote")}
          footerLinkLabel={t("media.footerLinkLabel")}
        />

        <section className="cta-band">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("sections.cta")}</span>
              <h2 className="section-title mt-4">{t("cta.title")}</h2>
              <p className="body-copy mt-4 max-w-xl text-base">{t("cta.subtitle")}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <ContactCta>{t("cta.primary")}</ContactCta>
                <TrackedAnchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary" goal="telegram_click">
                  {t("cta.secondary")}
                </TrackedAnchor>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section-band section--panel scroll-mt-16 border-t border-hairline">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <span className="section-label">{t("sections.contact")}</span>
              <h2 className="section-title mt-4">{t("contact.title")}</h2>
              <p className="body-copy mt-5 text-base">{t("contact.subtitle")}</p>
              <div className="mt-10 space-y-3 text-base">
                <p>
                  <span className="meta-label">{t("contact.email")}</span>
                  <br />
                  <TrackedAnchor href={`mailto:${CONTACT_EMAIL}`} className="text-link" goal="email_click">
                    {CONTACT_EMAIL}
                  </TrackedAnchor>
                </p>
                <p>
                  <span className="meta-label">{t("contact.telegram")}</span>
                  <br />
                  <TrackedAnchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="text-link" goal="telegram_click">
                    @pstasinski
                  </TrackedAnchor>
                </p>
                <p>
                  <span className="meta-label">{t("contact.linkedin")}</span>
                  <br />
                  <a href={LINKEDIN_URL} target="_blank" rel="me noreferrer" className="text-link">
                    linkedin.com/in/fuwiak
                  </a>
                </p>
                <p>
                  <span className="meta-label">{t("contact.github")}</span>
                  <br />
                  <a href={GITHUB_URL} target="_blank" rel="me noreferrer" className="text-link">
                    github.com/fuwiak
                  </a>
                </p>
                <p>
                  <span className="meta-label">{t("contact.phone")}</span>
                  <br />
                  <TrackedAnchor href={`tel:${CONTACT_PHONE}`} className="text-link" goal="phone_click">
                    {CONTACT_PHONE}
                  </TrackedAnchor>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
