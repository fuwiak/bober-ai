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
import type { SeoServiceContent } from "@/lib/seo-services-content";
import { getPortfolioItem, PROFILE } from "@/lib/profile";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  personJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { DIAGRAM_IMAGES, STOCK_IMAGES, TELEGRAM_URL, absoluteUrl } from "@/lib/site";

const SERVICE_IMAGES: Record<string, string> = {
  "business-process-automation": STOCK_IMAGES.automation,
  "sales-ai-agent": STOCK_IMAGES.sales,
  "ai-discovery-roadmap": STOCK_IMAGES.roadmap,
  "enterprise-ai-assistant": STOCK_IMAGES.team,
  "private-llm-gigachat": STOCK_IMAGES.security,
  "ai-automation": DIAGRAM_IMAGES.workflow,
  rag: DIAGRAM_IMAGES.architecture,
  "ai-agent": DIAGRAM_IMAGES.architecture,
  "document-processing": DIAGRAM_IMAGES.documents,
  "crm-integration": DIAGRAM_IMAGES.crm,
  "knowledge-base": DIAGRAM_IMAGES.architecture,
};

type ServiceSeoPageProps = {
  slug: string;
  content: SeoServiceContent;
  locale: string;
};

function isDiagramImage(src: string) {
  return src.endsWith(".svg") || src.endsWith(".png");
}

function resolveCoverImage(slug: string) {
  return SERVICE_IMAGES[slug] ?? STOCK_IMAGES.team;
}

export async function ServiceSeoPage({ slug, content, locale }: ServiceSeoPageProps) {
  const t = await getTranslations("landing");
  const servicePage = await getTranslations("servicePage");
  const prefix = locale === "en" ? "/en" : "";
  const pagePath = `${prefix}/services/${slug}`;
  const pageUrl = absoluteUrl(pagePath);
  const homeLabel = locale === "en" ? "Home" : "Главная";
  const servicesLabel = locale === "en" ? "Services" : "Услуги";
  const coverImage = resolveCoverImage(slug);
  const linkedService = getEnterpriseService(slug, locale);
  const caseStudies = (content.caseStudySlugs ?? [])
    .map((itemSlug) => getPortfolioItem(itemSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const breadcrumb = breadcrumbJsonLd([
    { name: homeLabel, url: absoluteUrl(prefix || "/") },
    { name: servicesLabel, url: absoluteUrl(`${prefix}/services`) },
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

  const faqSchema = content.faq.length ? faqJsonLd(content.faq) : null;

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
            <Link href="/services" className="text-link text-sm">
              {servicePage("back")}
            </Link>
            <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
              <Reveal className="max-w-4xl">
                <span className="section-label">{content.eyebrow}</span>
                <h1 className="display-md mt-4">{content.h1}</h1>
                <p className="body-copy mt-5 max-w-3xl text-lg">{content.subtitle}</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <ContactCta defaultService={content.h1} goal="service_seo_cta_click">
                    {servicePage("quote")}
                  </ContactCta>
                  <TrackedAnchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary" goal="telegram_click">
                    {servicePage("telegram")}
                  </TrackedAnchor>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-soft">
                  <Image
                    src={coverImage}
                    alt={content.h1}
                    fill
                    className="object-contain p-4"
                    sizes="360px"
                    unoptimized={isDiagramImage(coverImage)}
                    priority
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {content.intro.length ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-3xl">
              <Reveal>
                {content.intro.map((paragraph) => (
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

        {content.howWeSolve.length ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial">
              <Reveal>
                <h2 className="section-title">{content.howWeSolveTitle}</h2>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {content.howWeSolve.map((step, index) => (
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

        {content.architecture.length ? (
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-3xl">
              <Reveal>
                <h2 className="section-title">{content.architectureTitle}</h2>
                <ul className="mt-8 space-y-3">
                  {content.architecture.map((item) => (
                    <li key={item} className="body-copy text-base">
                      — {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ) : null}

        {content.roi.length ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial">
              <Reveal>
                <h2 className="section-title">{content.roiTitle}</h2>
                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  {content.roi.map((item) => (
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

        {linkedService ? (
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
              <Reveal>
                <span className="section-label">{t("common.service")}</span>
                <h2 className="section-title mt-4">{linkedService.title}</h2>
                <p className="body-copy mt-4 max-w-2xl text-base">{linkedService.about}</p>
              </Reveal>
              <aside className="feature-card-bordered">
                <p className="font-display text-2xl tracking-tight">{linkedService.salesNotes}</p>
                <p className="mt-2 text-sm text-muted">
                  {t("common.timeline")}: {linkedService.deliveryDays} {t("common.days")}
                </p>
              </aside>
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

        {content.faq.length ? (
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-3xl">
              <Reveal>
                <h2 className="section-title">{content.faqTitle}</h2>
                <dl className="mt-8 space-y-8">
                  {content.faq.map((item) => (
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

        {content.related.length ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial">
              <Reveal>
                <h2 className="section-title">{locale === "en" ? "Related services" : "Связанные услуги"}</h2>
                <Stagger className="mt-6">
                  {content.related.map((item) => (
                    <StaggerItem key={item.href}>
                      <Link href={item.href} className="text-link block py-2 text-base">
                        {item.label} →
                      </Link>
                    </StaggerItem>
                  ))}
                </Stagger>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section id="contact" className="section-band section--deep scroll-mt-16">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <span className="section-label">{t("common.contact")}</span>
              <h2 className="section-title mt-4">{servicePage("formTitle")}</h2>
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
