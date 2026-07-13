import { getTranslations, getLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { PartnerProgramBanner } from "@/components/PartnerProgramBanner";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { HeroSection } from "@/components/motion/HeroSection";
import { ImplementationCard, type ImplementationArea } from "@/components/motion/ImplementationCard";
import { PackageCard, type PackageItem } from "@/components/motion/PackageCard";
import { PartnerSectionHeader, PartnerSteps } from "@/components/motion/PartnerSteps";
import { ProjectsCasesShowcase } from "@/components/motion/ProjectsCasesShowcase";
import { ReviewCard } from "@/components/motion/ReviewCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { LEGAL_ROUTES } from "@/lib/legal";
import { AVITO_REVIEWS, KWORK_REVIEWS, PORTFOLIO, PROFILE, REVIEWS } from "@/lib/profile";
import {
  AVITO_REVIEWS_COUNT,
  AVITO_URL,
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
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <PartnerProgramBanner />
      <main>
        <HeroSection
          location={t("hero.location")}
          onlineLabel={t("common.online")}
          siteName={SITE_NAME}
          title={t("hero.title")}
          roles={t.raw("hero.roles") as string[]}
          nameLine={t("hero.nameLine")}
          focus={t("hero.focus")}
          trustLine={t("hero.trustLine", {
            rating: PROFILE.rating.toFixed(1),
            reviewCount: String(PROFILE.reviewsCount),
            years: String(PROFILE.experienceYears),
          })}
          partnersLine={t("hero.partnersLine")}
          responseNote={t("hero.responseNote")}
          ctaPrimary={t("hero.ctaPrimary")}
          ctaSecondary={t("hero.ctaSecondary")}
          ctaTelegram={t("hero.ctaTelegram")}
          legalNote={t("hero.legalNote")}
          legalLink={t("hero.legalLink")}
          legalHref={LEGAL_ROUTES.privacyPolicy}
          email={CONTACT_EMAIL}
          phone={CONTACT_PHONE}
          telegramUrl={TELEGRAM_URL}
          avatar={PROFILE.avatar}
          avatarAlt={PROFILE.name}
        />

        <section className="section-band border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">01</span>
              <h2 className="display-sm mt-3">{t("audiences.title")}</h2>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
              {(t.raw("audiences.items") as { title: string; text: string }[]).map((item) => (
                <StaggerItem key={item.title}>
                  <article className="feature-card h-full">
                    <h3 className="font-medium text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{item.text}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-band border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">02</span>
              <h2 className="display-sm mt-3">{t("trust.title")}</h2>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(t.raw("trust.stats") as { value: string; label: string }[]).map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="feature-card text-center">
                    <p className="font-display text-3xl tracking-tight text-accent-green">{stat.value}</p>
                    <p className="mt-2 text-sm text-body">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted">
              {(t.raw("trust.logos") as string[]).map((logo) => (
                <span key={logo} className="badge-pill">
                  {logo}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="packages" className="section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">03</span>
              <h2 className="display-sm mt-3">{t("packages.title")}</h2>
              <p className="mt-3 max-w-2xl text-sm text-body">{t("packages.subtitle")}</p>
            </Reveal>
            <Stagger className="package-grid mt-10" stagger={0.07}>
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

        <section id="services" className="section-band scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">04</span>
              <h2 className="display-sm mt-3">{t("services.title")}</h2>
              <p className="mt-3 max-w-2xl text-sm text-body">{t("services.subtitle")}</p>
            </Reveal>
            <Stagger className="implementation-grid mt-10" stagger={0.07}>
              {implementationAreas.map((area, index) => (
                <ImplementationCard key={area.title} index={index} {...area} ctaLabel={t("services.discussCta")} />
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-8">
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-link">
                {t("nav.servicesPage")}
                <span className="button-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>

        <section id="process" className="section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">05</span>
              <h2 className="display-sm mt-3">{t("process.title")}</h2>
              <p className="mt-3 max-w-2xl text-sm text-body">{t("process.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {(t.raw("process.steps") as { title: string; text: string }[]).map((step, index) => (
                <StaggerItem key={step.title}>
                  <article className="feature-card h-full">
                    <span className="font-mono text-xs tracking-widest text-accent-green">
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

        <section className="section-band border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <h2 className="display-sm">{t("security.title")}</h2>
            </Reveal>
            <ul className="mt-6 max-w-3xl space-y-3 text-sm leading-relaxed text-body">
              {(t.raw("security.items") as string[]).map((item) => (
                <Reveal key={item} delay={0.05}>
                  <li className="flex gap-2">
                    <span className="text-accent-green">✓</span>
                    <span>{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="partners" className="section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <PartnerSectionHeader
              badge={t("partners.badge")}
              title={t("partners.title")}
              subtitle={t("partners.subtitle")}
              description={t("partners.description")}
            />
            <PartnerSteps steps={t.raw("partners.steps") as { title: string; text: string }[]} />
            <Reveal delay={0.1} className="mt-6">
              <ul className="space-y-2 text-sm text-body">
                {(t.raw("partners.models") as string[]).map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-6">
              <div>
                <p className="font-display text-4xl text-accent-green">{t("partners.commission")}</p>
                <p className="text-sm text-muted">{t("partners.commissionNote")}</p>
              </div>
              <Link href="/partners" className="btn-primary">
                {t("partners.cta")}
              </Link>
            </Reveal>
          </div>
        </section>

        <section id="portfolio" className="section-band scroll-mt-16 border-b border-hairline-soft">
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

        <section id="about" className="section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">06</span>
              <h2 className="display-sm mt-3">{t("about.title")}</h2>
              <p className="mt-5 max-w-3xl whitespace-pre-line text-base leading-relaxed text-body">{t("about.text")}</p>
              <a href="#contact" className="btn-primary mt-6">
                {t("about.cta")}
              </a>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
              <StaggerItem>
                <div className="feature-card h-full">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">{t("about.education")}</p>
                  <p className="mt-2 text-sm text-body">{t("about.educationValue")}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="feature-card h-full">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">{t("about.schedule")}</p>
                  <p className="mt-2 text-sm text-body">{t("about.scheduleValue")}</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="feature-card h-full">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">{t("about.collaboration")}</p>
                  <p className="mt-2 text-sm text-body">{t("about.collaborationSummary")}</p>
                  <p className="mt-2 text-xs text-muted">{t("about.collaborationDetail")}</p>
                </div>
              </StaggerItem>
            </Stagger>
            <Reveal delay={0.1} className="mt-10">
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

        <section id="reviews" className="section-band scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <h2 className="display-sm">{t("reviews.yandexTitle")}</h2>
              <p className="mt-2 text-sm text-muted">
                {t("reviews.yandexMeta", { rating: PROFILE.rating, count: PROFILE.reviewsCount })}{" "}
                <a href={YANDEX_USLUGI_URL} target="_blank" rel="noreferrer" className="text-link">
                  Yandex
                </a>
              </p>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {REVIEWS.slice(0, 4).map((review) => (
                <ReviewCard
                  key={review.id}
                  author={review.author}
                  text={review.text}
                  date={review.date}
                  source="Yandex"
                />
              ))}
            </Stagger>
          </div>
        </section>

        <section id="reviews-avito" className="section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <Reveal>
              <h2 className="display-sm">{t("reviews.avitoTitle")}</h2>
              <p className="mt-2 text-sm text-muted">
                {t("reviews.avitoMeta", { count: AVITO_REVIEWS_COUNT })}{" "}
                <a href={AVITO_URL} target="_blank" rel="noreferrer" className="text-link">
                  Avito
                </a>
              </p>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {AVITO_REVIEWS.slice(0, 4).map((review) => (
                <ReviewCard
                  key={review.id}
                  author={review.author}
                  text={review.text}
                  date={review.date}
                  source="Avito"
                />
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-band border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <h2 className="display-sm">{t("reviews.kworkTitle")}</h2>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {KWORK_REVIEWS.slice(0, 4).map((review) => (
                <ReviewCard
                  key={review.id}
                  author={review.author}
                  text={review.text}
                  project={review.project}
                  source="Kwork"
                />
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-band">
          <div className="container-editorial">
            <Reveal>
              <div className="callout-accent">
                <span className="section-label">CTA</span>
                <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t("cta.title")}</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-body">{t("cta.subtitle")}</p>
                <div className="mt-6 flex flex-wrap gap-3">
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

        <section id="contact" className="section-band scroll-mt-16 border-t border-hairline-soft">
          <div className="container-editorial grid gap-10 md:grid-cols-2">
            <Reveal>
              <span className="section-label">Contact</span>
              <h2 className="display-sm mt-3">{t("contact.title")}</h2>
              <p className="mt-4 text-sm leading-relaxed text-body">{t("contact.subtitle")}</p>
              <div className="mt-6 space-y-2 text-sm">
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
              <div className="feature-card-bordered">
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
