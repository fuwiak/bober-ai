import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactForm } from "@/components/ContactForm";
import { ContactCta } from "@/components/ContactCta";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { getEnterpriseService } from "@/lib/enterprise-services";
import { getLandingExtended } from "@/lib/landing-extended";
import type { LandingPageDef } from "@/lib/landing-pages";
import {
  getCatalogLandingContent,
  getCatalogLandingExtended,
  isCatalogContentKey,
} from "@/lib/seo-catalog";
import { PROFILE, getPortfolioItem } from "@/lib/profile";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  personJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { TELEGRAM_URL, absoluteUrl } from "@/lib/site";

type LandingContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  problemsTitle: string;
  problems: string[];
  deliverablesTitle: string;
  deliverables: string[];
  relatedTitle: string;
  related: { href: string; label: string }[];
  faq?: { q: string; a: string }[];
};

const CATEGORY_LABELS: Record<string, { ru: string; en: string }> = {
  automation: { ru: "Автоматизация", en: "Automation" },
  integrations: { ru: "Интеграции", en: "Integrations" },
  solutions: { ru: "Решения", en: "Solutions" },
  ai: { ru: "AI", en: "AI" },
  industries: { ru: "Отрасли", en: "Industries" },
};

type SeoLandingPageProps = {
  page: LandingPageDef;
  locale: string;
};

function isDiagramImage(src: string) {
  return src.endsWith(".svg") || src.endsWith(".png");
}

export async function SeoLandingPage({ page, locale }: SeoLandingPageProps) {
  const loc = locale === "en" ? "en" : "ru";
  const t = await getTranslations("landing");
  const fromCatalog = page.fromCatalog || isCatalogContentKey(page.contentKey);
  let content: LandingContent;
  let extended = getLandingExtended(page.contentKey, loc);

  if (fromCatalog) {
    const catalogContent = getCatalogLandingContent(page.contentKey, loc);
    if (!catalogContent) {
      throw new Error(`Missing catalog content for ${page.contentKey}`);
    }
    content = catalogContent;
    extended = getCatalogLandingExtended(page.contentKey, loc) ?? extended;
  } else {
    content = t.raw(`pages.${page.contentKey}`) as LandingContent;
  }

  const service = getEnterpriseService(page.serviceSlug, locale);
  const prefix = locale === "en" ? "/en" : "";
  const pagePath = `${prefix}/${page.category}/${page.slug}`;
  const pageUrl = absoluteUrl(pagePath);
  const homeLabel = locale === "en" ? "Home" : "Главная";
  const categoryLabel = CATEGORY_LABELS[page.category]?.[loc] ?? page.category;
  const faqItems = extended?.faq ?? content.faq ?? [];

  const breadcrumb = breadcrumbJsonLd([
    { name: homeLabel, url: absoluteUrl(prefix || "/") },
    { name: categoryLabel, url: absoluteUrl(`${prefix}/${page.category}`) },
    { name: content.h1, url: pageUrl },
  ]);

  const webPage = webPageJsonLd({
    name: content.h1,
    description: content.metaDescription,
    url: pageUrl,
    locale,
  });

  const serviceSchema = serviceJsonLd({
    name: content.h1,
    description: content.metaDescription,
    url: pageUrl,
    locale,
  });

  const organization = {
    "@context": "https://schema.org",
    ...organizationJsonLd(locale),
  };

  const person = personJsonLd({
    name: PROFILE.name,
    jobTitle: PROFILE.roles[0],
    description: PROFILE.focus,
    image: PROFILE.heroImage,
    url: TELEGRAM_URL,
  });

  const faqSchema = faqItems.length ? faqJsonLd(faqItems) : null;
  const caseStudies = (page.caseStudySlugs ?? [])
    .map((slug) => getPortfolioItem(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="page-shell min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Link href="/" className="link-back">
              {t("common.backHome")}
            </Link>
            <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
              <Reveal className="max-w-4xl">
                <span className="section-label">{content.eyebrow}</span>
                <h1 className="display-md mt-4">{content.h1}</h1>
                <p className="body-copy mt-5 max-w-3xl text-lg">{content.subtitle}</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <ContactCta defaultService={content.h1} goal="audit_cta_click">
                    {t("common.cta")}
                  </ContactCta>
                  <TrackedAnchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary" goal="telegram_click">
                    {t("common.telegram")}
                  </TrackedAnchor>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-soft">
                  <Image
                    src={page.coverImage}
                    alt={content.h1}
                    fill
                    className="object-contain p-4"
                    sizes="360px"
                    unoptimized={isDiagramImage(page.coverImage)}
                    priority
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {extended?.intro?.length ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-3xl">
              <Reveal>
                {extended.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="body-copy mt-4 text-base first:mt-0">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>
          </section>
        ) : null}

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <h2 className="section-title">{content.problemsTitle}</h2>
              <ul className="mt-8 space-y-4">
                {content.problems.map((item) => (
                  <li key={item} className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-title">{content.deliverablesTitle}</h2>
              <ul className="mt-8 space-y-4">
                {content.deliverables.map((item) => (
                  <li key={item} className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {extended?.howWeSolve?.length ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial">
              <Reveal>
                <h2 className="section-title">{extended.howWeSolveTitle}</h2>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {extended.howWeSolve.map((step, index) => (
                    <article key={step.title} className="feature-card">
                      <span className="font-display text-3xl text-primary/40">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="card-title mt-3">{step.title}</h3>
                      <p className="body-copy mt-3 text-base">{step.text}</p>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        {extended?.roi?.length ? (
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial">
              <Reveal>
                <h2 className="section-title">{extended.roiTitle}</h2>
                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  {extended.roi.map((item) => (
                    <div key={item.label} className="feature-card-bordered text-center">
                      <p className="font-display text-3xl tracking-tight text-ink">{item.value}</p>
                      <p className="body-copy mt-2 text-sm">{item.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        {service ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
              <Reveal>
                <span className="section-label">{t("common.service")}</span>
                <h2 className="section-title mt-4">{service.title}</h2>
                <p className="body-copy mt-4 max-w-2xl text-base">{service.about}</p>
                <Link href={`/services/${service.slug}`} className="link-more mt-6">
                  {t("common.serviceDetails")}
                </Link>
              </Reveal>
              <aside className="feature-card-bordered">
                <p className="font-display text-2xl tracking-tight">{service.salesNotes}</p>
                <p className="mt-2 text-sm text-muted">
                  {t("common.timeline")}: {service.deliveryDays} {t("common.days")}
                </p>
              </aside>
            </div>
          </section>
        ) : null}

        {extended?.caseStudy ? (
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-3xl">
              <Reveal>
                <span className="section-label">{t("common.featuredCase")}</span>
                <h2 className="section-title mt-4">{extended.caseStudy.title}</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  <article className="feature-card">
                    <p className="meta-label">{t("common.problemLabel")}</p>
                    <p className="body-copy mt-3 text-base">{extended.caseStudy.problem}</p>
                  </article>
                  <article className="feature-card">
                    <p className="meta-label">{t("common.solutionLabel")}</p>
                    <p className="body-copy mt-3 text-base">{extended.caseStudy.solution}</p>
                  </article>
                  <article className="feature-card">
                    <p className="meta-label">{t("common.resultLabel")}</p>
                    <p className="body-copy mt-3 text-base">{extended.caseStudy.result}</p>
                  </article>
                </div>
                {extended.caseStudy.href ? (
                  <Link href={extended.caseStudy.href} className="link-more mt-6">
                    {t("common.viewCaseStudy")}
                  </Link>
                ) : null}
              </Reveal>
            </div>
          </section>
        ) : null}

        {caseStudies.length > 0 ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial">
              <Reveal>
                <h2 className="section-title">{t("common.caseStudiesTitle")}</h2>
                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  {caseStudies.map((item) => (
                    <CaseStudyCard key={item.slug} item={item} viewLabel={t("common.viewCaseStudy")} />
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        {faqItems.length ? (
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-3xl">
              <Reveal>
                <h2 className="section-title">{extended?.faqTitle ?? t("common.faqTitle")}</h2>
                <dl className="mt-8 space-y-8">
                  {faqItems.map((item) => (
                    <div key={item.q}>
                      <dt className="font-display text-xl tracking-tight">{item.q}</dt>
                      <dd className="body-copy mt-3 text-base">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">{content.relatedTitle}</h2>
              <Stagger className="mt-6">
                {content.related.map((item) => (
                  <StaggerItem key={item.href}>
                    <Link href={item.href} className="link-more py-2">
                      {item.label}
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section-band section--deep scroll-mt-16">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <span className="section-label">{t("common.contact")}</span>
              <h2 className="section-title mt-4">{t("common.formTitle")}</h2>
              <p className="body-copy mt-4 max-w-xl text-base">{t("common.formSubtitle")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm defaultService={content.h1} />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
