import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { ContactCta } from "@/components/ContactCta";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { getEnterpriseService } from "@/lib/enterprise-services";
import type { LandingPageDef } from "@/lib/landing-pages";
import { breadcrumbJsonLd, serviceJsonLd, webPageJsonLd } from "@/lib/seo";
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
};

const CATEGORY_LABELS: Record<string, { ru: string; en: string }> = {
  automation: { ru: "Автоматизация", en: "Automation" },
  integrations: { ru: "Интеграции", en: "Integrations" },
  solutions: { ru: "Решения", en: "Solutions" },
  ai: { ru: "AI", en: "AI" },
};

type SeoLandingPageProps = {
  page: LandingPageDef;
  locale: string;
};

export async function SeoLandingPage({ page, locale }: SeoLandingPageProps) {
  const t = await getTranslations("landing");
  const content = t.raw(`pages.${page.contentKey}`) as LandingContent;
  const service = getEnterpriseService(page.serviceSlug, locale);
  const prefix = locale === "en" ? "/en" : "";
  const pagePath = `${prefix}/${page.category}/${page.slug}`;
  const pageUrl = absoluteUrl(pagePath);
  const homeLabel = locale === "en" ? "Home" : "Главная";
  const categoryLabel = CATEGORY_LABELS[page.category][locale === "en" ? "en" : "ru"];

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

  return (
    <div className="page-shell min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Link href="/" className="text-link text-sm">
              {t("common.backHome")}
            </Link>
            <Reveal className="mt-8 max-w-4xl">
              <span className="section-label">{content.eyebrow}</span>
              <h1 className="display-md mt-4">{content.h1}</h1>
              <p className="body-copy mt-5 max-w-3xl text-lg">{content.subtitle}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <ContactCta defaultService={content.h1}>{t("common.cta")}</ContactCta>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                  {t("common.telegram")}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
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

        {service ? (
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
              <Reveal>
                <span className="section-label">{t("common.service")}</span>
                <h2 className="section-title mt-4">{service.title}</h2>
                <p className="body-copy mt-4 max-w-2xl text-base">{service.about}</p>
                <Link href={`/services/${service.slug}`} className="text-link mt-6 inline-block text-[11px] uppercase tracking-[0.16em]">
                  {t("common.serviceDetails")} →
                </Link>
              </Reveal>
              <aside className="feature-card-bordered">
                <p className="font-display text-2xl tracking-tight">{service.salesNotes}</p>
                <p className="mt-2 text-sm text-muted">
                  {t("common.timeline")}: {service.deliveryDays} {t("common.days")}
                </p>
                <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-lg bg-surface-soft">
                  <Image src={service.serviceImage} alt={service.title} fill className="object-cover" sizes="320px" />
                </div>
              </aside>
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
                    <Link href={item.href} className="text-link block py-2 text-base">
                      {item.label} →
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
