import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactForm } from "@/components/ContactForm";
import { ContactCta } from "@/components/ContactCta";
import { PerformerRating } from "@/components/PerformerRating";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import { ReviewsShowcase } from "@/components/motion/ReviewsShowcase";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { getEnterpriseService } from "@/lib/enterprise-services";
import { getEnterpriseReviews } from "@/lib/enterprise-reviews";
import { PROFILE, getPortfolioItem } from "@/lib/profile";
import type { SeoServiceContent } from "@/lib/seo-services-content";
import {
  faqJsonLd,
  organizationJsonLd,
  personJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { GITHUB_URL, LINKEDIN_URL, TELEGRAM_URL, absoluteUrl } from "@/lib/site";

type SeoServicePageProps = {
  slug: string;
  locale: string;
  content: SeoServiceContent;
  /** Canonical path segment, e.g. `/claude` instead of `/services/{slug}`. */
  pagePath?: string;
  breadcrumbItems?: { name: string; path: string }[];
  /** Enterprise service lookup slug when different from page slug. */
  serviceSlug?: string;
};

export async function SeoServicePage({
  slug,
  locale,
  content,
  pagePath,
  breadcrumbItems,
  serviceSlug,
}: SeoServicePageProps) {
  const t = await getTranslations("servicePage");
  const lookupSlug = serviceSlug ?? slug;
  const service = getEnterpriseService(lookupSlug, locale);
  const prefix = locale === "en" ? "/en" : "";
  const resolvedPath = pagePath ?? `/services/${slug}`;
  const pageUrl = absoluteUrl(`${prefix}${resolvedPath}`);
  const servicesLabel = locale === "en" ? "Services" : "Услуги";
  const isEn = locale === "en";
  const reviews = getEnterpriseReviews();

  const breadcrumbs =
    breadcrumbItems ??
    [
      { name: servicesLabel, path: "/services" },
      { name: content.h1, path: resolvedPath },
    ];

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
    price: service?.price,
    priceCurrency: isEn ? "EUR" : "RUB",
    priceLabel: service?.salesNotes,
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
    sameAs: [LINKEDIN_URL, GITHUB_URL, TELEGRAM_URL],
  });

  const faqSchema = content.faq.length ? faqJsonLd(content.faq, pageUrl) : null;
  const caseStudies = (content.caseStudySlugs ?? [])
    .map((caseSlug) => getPortfolioItem(caseSlug, locale))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="page-shell min-h-screen">
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
            <Breadcrumbs
              locale={locale}
              items={breadcrumbs}
            />
            <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
              <Reveal className="max-w-4xl">
                <span className="section-label">{content.eyebrow}</span>
                <h1 className="display-md mt-4">{content.h1}</h1>
                <p className="mt-3 text-sm text-muted">
                  {locale === "en" ? "Performer" : "Исполнитель"}:{" "}
                  <span className="font-medium text-ink">{PROFILE.name}</span>
                </p>
                {/* Visible rating must match YML Рейтинг / Число отзывов for Webmaster moderation. */}
                <PerformerRating locale={locale} className="mt-3" />
                <p className="body-copy mt-5 max-w-3xl text-lg">{content.subtitle}</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <ContactCta defaultService={content.h1} goal="audit_cta_click">
                    {t("quote")}
                  </ContactCta>
                  <TrackedAnchor href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary" goal="telegram_click">
                    {t("telegram")}
                  </TrackedAnchor>
                  <ContactCta variant="secondary" defaultService={content.h1} goal="service_estimate_cta_click">
                    {locale === "en" ? "Get an estimate" : "Получить оценку"}
                  </ContactCta>
                </div>
              </Reveal>
              {service ? (
                <Reveal delay={0.08}>
                  <aside className="feature-card-bordered">
                    <p className="font-display text-2xl tracking-tight">{service.salesNotes}</p>
                    <p className="mt-2 text-sm text-muted">
                      {t("timeline")}: {service.deliveryDays} {t("days")}
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      {isEn ? "Fixed estimate · remote" : "Фиксированная смета · удалённо"}
                    </p>
                    <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-soft">
                      <Image
                        src={service.serviceImage}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="360px"
                        priority
                      />
                    </div>
                    <ContactCta className="mt-6 w-full" defaultService={content.h1} goal="audit_cta_click">
                      {t("quote")}
                    </ContactCta>
                  </aside>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>

        {content.intro.length ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-3xl">
              <Reveal>
                {content.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="body-copy mt-4 text-base first:mt-0">
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
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <ul className="mt-8 space-y-4">
                  {content.architecture.map((item) => (
                    <li key={item} className="body-copy flex gap-4 text-base">
                      <span className="meta-label shrink-0">—</span>
                      <span>{item}</span>
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

        {service ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-3xl">
              <Reveal>
                <h2 className="section-title">
                  {isEn ? "Price and conditions" : "Цена и условия"}
                </h2>
                <div className="mt-8 overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <caption className="sr-only">
                      {isEn ? "Commercial terms for this service" : "Коммерческие условия услуги"}
                    </caption>
                    <tbody>
                      <tr className="border-b border-hairline">
                        <th scope="row" className="py-3 pr-6 font-medium text-ink">
                          {isEn ? "Price" : "Цена"}
                        </th>
                        <td className="py-3 text-muted">{service.salesNotes}</td>
                      </tr>
                      <tr className="border-b border-hairline">
                        <th scope="row" className="py-3 pr-6 font-medium text-ink">
                          {t("timeline")}
                        </th>
                        <td className="py-3 text-muted">
                          {service.deliveryDays} {t("days")}
                        </td>
                      </tr>
                      <tr className="border-b border-hairline">
                        <th scope="row" className="py-3 pr-6 font-medium text-ink">
                          {isEn ? "Format" : "Формат"}
                        </th>
                        <td className="py-3 text-muted">
                          {isEn ? "Fixed estimate · remote delivery" : "Фиксированная смета · удалённо"}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="py-3 pr-6 font-medium text-ink">
                          {isEn ? "Scope" : "Состав"}
                        </th>
                        <td className="py-3 text-muted">{service.about}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        {caseStudies.length > 0 ? (
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial">
              <Reveal>
                <h2 className="section-title">{locale === "en" ? "Related case studies" : "Связанные кейсы"}</h2>
                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  {caseStudies.map((item) => (
                    <CaseStudyCard
                      key={item.slug}
                      item={item}
                      viewLabel={locale === "en" ? "View case study" : "Подробнее о проекте"}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        {reviews.length ? (
          <ReviewsShowcase
            sectionLabel={isEn ? "Trust" : "Доверие"}
            title={isEn ? "Reviews from Yandex" : "Отзывы на Яндексе"}
            subtitle={
              isEn
                ? "Public feedback from Yandex Services — same performer profile as the feed."
                : "Публичные отзывы с Яндекс Услуг — тот же профиль исполнителя, что в фиде."
            }
            reviews={reviews}
          />
        ) : null}

        {content.faq.length ? (
          <section className="section-band section--panel border-b border-hairline">
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
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial">
              <Reveal>
                <h2 className="section-title">{locale === "en" ? "Related services" : "Связанные услуги"}</h2>
                <Stagger className="mt-6">
                  {content.related.map((item) => {
                    const isExternal =
                      item.href.startsWith("http://") || item.href.startsWith("https://");
                    return (
                      <StaggerItem key={item.href}>
                        {isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="link-more py-2"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link href={item.href} className="link-more py-2">
                            {item.label}
                          </Link>
                        )}
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section id="contact" className="section-band section--panel scroll-mt-16">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <span className="section-label">{locale === "en" ? "Contact" : "Контакт"}</span>
              <h2 className="section-title mt-4">{t("formTitle")}</h2>
              <p className="body-copy mt-4 max-w-xl text-base">{content.subtitle}</p>
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
