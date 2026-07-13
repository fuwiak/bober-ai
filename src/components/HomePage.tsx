import Image from "next/image";
import NextLink from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { PartnerProgramBanner } from "@/components/PartnerProgramBanner";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { AnimatedServiceCard } from "@/components/motion/AnimatedServiceCard";
import { PortfolioShowcase } from "@/components/motion/PortfolioShowcase";
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
import { getEnterpriseServices } from "@/lib/enterprise-services";

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const services = getEnterpriseServices(locale);
  const skills = t.raw("about.skills") as string[];

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <PartnerProgramBanner />
      <main>
        <section className="section-band border-b border-hairline-soft">
          <div className="container-editorial grid gap-10 md:grid-cols-2 md:items-center">
            <Reveal>
              <div>
              <p className="text-sm text-muted">
                {t("hero.location")} · <span className="text-success">{t("common.online")}</span>
              </p>
              <p className="mt-2 font-display text-xl tracking-tight text-ink md:text-2xl">{SITE_NAME}</p>
              <h1 className="display-lg mt-1">{t("hero.title")}</h1>
              <div className="mt-3 flex flex-wrap gap-2">
                {(t.raw("hero.roles") as string[]).map((role) => (
                  <span key={role} className="badge-pill text-xs">
                    {role}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted">{t("hero.nameLine")}</p>
              <p className="mt-3 text-sm leading-relaxed text-body">{t("hero.focus")}</p>
              <p className="mt-5 text-sm text-muted">
                {t("hero.trustLine", {
                  rating: PROFILE.rating.toFixed(1),
                  reviewCount: String(PROFILE.reviewsCount),
                  years: String(PROFILE.experienceYears),
                })}
              </p>
              <p className="mt-2 text-sm font-medium text-ink">{t("hero.partnersLine")}</p>
              <p className="mt-2 text-xs text-muted">{t("hero.responseNote")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="btn-primary">
                  {t("hero.ctaPrimary")}
                </a>
                <a href="#portfolio" className="btn-secondary">
                  {t("hero.ctaSecondary")}
                </a>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                  {t("hero.ctaTelegram")}
                </a>
              </div>
              <p className="mt-4 text-sm text-muted">
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-link font-medium">
                  {CONTACT_EMAIL}
                </a>
                {" · "}
                <a href={`tel:${CONTACT_PHONE}`} className="text-link">
                  {CONTACT_PHONE}
                </a>
              </p>
              <p className="mt-5 text-xs leading-relaxed text-muted-soft">
                {t("hero.legalNote")}{" "}
                <NextLink href={LEGAL_ROUTES.privacyPolicy} className="text-link">
                  {t("hero.legalLink")}
                </NextLink>
              </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex justify-center md:justify-end">
              <div className="relative h-48 w-48 overflow-hidden rounded-lg border border-hairline md:h-64 md:w-64">
                <Image src={PROFILE.avatar} alt={PROFILE.name} fill sizes="256px" className="object-cover" priority />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <Reveal>
              <h2 className="display-sm">{t("audiences.title")}</h2>
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
              <h2 className="display-sm">{t("trust.title")}</h2>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(t.raw("trust.stats") as { value: string; label: string }[]).map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="feature-card text-center">
                    <p className="font-display text-3xl tracking-tight text-primary">{stat.value}</p>
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
              <h2 className="display-sm">{t("packages.title")}</h2>
              <p className="mt-3 max-w-2xl text-sm text-body">{t("packages.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
              {(t.raw("packages.items") as {
                name: string;
                price: string;
                duration: string;
                forWhom: string;
                includes: string[];
                featured?: boolean;
              }[]).map((pkg) => (
                <StaggerItem key={pkg.name}>
                  <article
                    className={`feature-card-bordered flex h-full flex-col p-6 ${pkg.featured ? "ring-2 ring-primary/30" : ""}`}
                  >
                  {pkg.featured ? <span className="badge-accent mb-3 w-fit text-[10px]">{t("packages.featuredLabel")}</span> : null}
                  <h3 className="font-display text-xl tracking-tight text-ink">{pkg.name}</h3>
                  <p className="mt-2 font-display text-2xl text-primary">{pkg.price}</p>
                  <p className="mt-1 text-xs text-muted">{pkg.duration}</p>
                  <p className="mt-4 text-sm text-body">{pkg.forWhom}</p>
                  <ul className="mt-4 flex-1 space-y-2 text-sm text-body">
                    {pkg.includes.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn-primary mt-6 w-full text-center text-sm">
                    {t("packages.cta")}
                  </a>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section id="services" className="section-band scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <Reveal>
              <h2 className="display-sm">{t("services.title")}</h2>
              <p className="mt-3 max-w-2xl text-sm text-body">{t("services.subtitle")}</p>
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
            <div className="mt-6">
              <Link href="/services" className="text-link text-sm">
                {t("nav.servicesPage")} →
              </Link>
            </div>
          </div>
        </section>

        <section id="process" className="section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <h2 className="display-sm">{t("process.title")}</h2>
            <p className="mt-3 max-w-2xl text-sm text-body">{t("process.subtitle")}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {(t.raw("process.steps") as { title: string; text: string }[]).map((step, index) => (
                <article key={step.title} className="feature-card">
                  <span className="font-display text-3xl tracking-tight text-primary/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline-soft">
          <div className="container-editorial">
            <h2 className="display-sm">{t("security.title")}</h2>
            <ul className="mt-6 max-w-3xl space-y-3 text-sm leading-relaxed text-body">
              {(t.raw("security.items") as string[]).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="partners" className="section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <span className="badge-accent text-[10px]">{t("partners.badge")}</span>
            <h2 className="display-sm mt-4">{t("partners.title")}</h2>
            <p className="mt-2 text-base font-medium text-ink">{t("partners.subtitle")}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-body">{t("partners.description")}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {(t.raw("partners.steps") as { title: string; text: string }[]).map((step, index) => (
                <article key={step.title} className="feature-card">
                  <span className="font-display text-3xl tracking-tight text-primary/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-body">{step.text}</p>
                </article>
              ))}
            </div>
            <ul className="mt-6 space-y-2 text-sm text-body">
              {(t.raw("partners.models") as string[]).map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div>
                <p className="font-display text-4xl text-primary">{t("partners.commission")}</p>
                <p className="text-sm text-muted">{t("partners.commissionNote")}</p>
              </div>
              <Link href="/partners" className="btn-primary">
                {t("partners.cta")}
              </Link>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section-band scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <PortfolioShowcase
              items={PORTFOLIO}
              title={t("portfolio.title")}
              subtitle={t("portfolio.subtitle")}
              detailsLabel={t("portfolio.details")}
              allLabel={locale === "en" ? "All" : "Все"}
            />
          </div>
        </section>

        <section id="about" className="section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <h2 className="display-sm">{t("about.title")}</h2>
            <p className="mt-5 max-w-3xl whitespace-pre-line text-base leading-relaxed text-body">{t("about.text")}</p>
            <a href="#contact" className="btn-primary mt-6">
              {t("about.cta")}
            </a>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="feature-card">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">{t("about.education")}</p>
                <p className="mt-2 text-sm text-body">{t("about.educationValue")}</p>
              </div>
              <div className="feature-card">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">{t("about.schedule")}</p>
                <p className="mt-2 text-sm text-body">{t("about.scheduleValue")}</p>
              </div>
              <div className="feature-card">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">{t("about.collaboration")}</p>
                <p className="mt-2 text-sm text-body">{t("about.collaborationSummary")}</p>
                <p className="mt-2 text-xs text-muted">{t("about.collaborationDetail")}</p>
              </div>
            </div>
            <h3 className="mt-10 text-xs font-medium uppercase tracking-widest text-muted">{t("about.skillsTitle")}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="badge-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="section-band scroll-mt-16 border-b border-hairline-soft">
          <div className="container-editorial">
            <h2 className="display-sm">{t("reviews.yandexTitle")}</h2>
            <p className="mt-2 text-sm text-muted">
              {t("reviews.yandexMeta", { rating: PROFILE.rating, count: PROFILE.reviewsCount })}{" "}
              <a href={YANDEX_USLUGI_URL} target="_blank" rel="noreferrer" className="text-link">
                Yandex
              </a>
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {REVIEWS.slice(0, 4).map((review) => (
                <article key={review.id} className="feature-card-bordered p-6">
                  <p className="font-medium text-ink">{review.author}</p>
                  <p className="mt-1 text-accent text-sm">★★★★★</p>
                  <p className="mt-3 text-sm leading-relaxed text-body">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews-avito" className="section-band scroll-mt-16 border-b border-hairline-soft bg-surface-soft">
          <div className="container-editorial">
            <h2 className="display-sm">{t("reviews.avitoTitle")}</h2>
            <p className="mt-2 text-sm text-muted">
              {t("reviews.avitoMeta", { count: AVITO_REVIEWS_COUNT })}{" "}
              <a href={AVITO_URL} target="_blank" rel="noreferrer" className="text-link">
                Avito
              </a>
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {AVITO_REVIEWS.slice(0, 4).map((review) => (
                <article key={review.id} className="feature-card-bordered p-6">
                  <p className="font-medium text-ink">{review.author}</p>
                  <p className="mt-1 text-accent text-sm">★★★★★</p>
                  <p className="mt-3 text-sm leading-relaxed text-body">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline-soft">
          <div className="container-editorial">
            <h2 className="display-sm">{t("reviews.kworkTitle")}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {KWORK_REVIEWS.slice(0, 4).map((review) => (
                <article key={review.id} className="feature-card-bordered p-6">
                  <p className="text-xs text-link">{review.project}</p>
                  <p className="mt-2 font-medium text-ink">{review.author}</p>
                  <p className="mt-3 text-sm leading-relaxed text-body">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band">
          <div className="container-editorial">
            <div className="callout-accent">
              <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t("cta.title")}</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-primary/90">{t("cta.subtitle")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="btn-inverted">
                  {t("cta.primary")}
                </a>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary-on-dark">
                  {t("cta.secondary")}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-band scroll-mt-16 border-t border-hairline-soft">
          <div className="container-editorial grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="display-sm">{t("contact.title")}</h2>
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
            </div>
            <div className="feature-card-bordered">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
