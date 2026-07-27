import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { CLAUDE_PAGE } from "@/lib/claude-page";
import {
  buildPageMetadata,
  faqJsonLd,
  localizedAbsolute,
  pageBreadcrumbJsonLd,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { TELEGRAM_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale !== "en";
  const p = CLAUDE_PAGE;
  return buildPageMetadata({
    title: ru ? p.metaTitleRu : p.metaTitleEn,
    description: ru ? p.metaDescRu : p.metaDescEn,
    keywords: ru ? [...p.metaKeywordsRu] : [...p.metaKeywordsEn],
    path: "/claude",
    locale,
  });
}

export default async function ClaudePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ru = locale !== "en";
  const p = CLAUDE_PAGE;
  const pageUrl = localizedAbsolute("/claude", locale);
  const crumbName = ru ? "Claude AI для МСБ" : "Claude AI for SMB";

  const breadcrumbs = pageBreadcrumbJsonLd(locale, [{ name: crumbName, path: "/claude" }]);
  const webPage = webPageJsonLd({
    name: ru ? p.metaTitleRu : p.metaTitleEn,
    description: ru ? p.metaDescRu : p.metaDescEn,
    url: pageUrl,
    locale,
  });
  const faq = faqJsonLd(
    (ru ? p.faqRu : p.faqEn).map((item) => ({ q: item.q, a: item.a })),
    pageUrl,
  );
  const service = serviceJsonLd({
    name: ru ? "Внедрение Claude AI для МСБ" : "Claude AI deployment for SMB",
    description: ru ? p.metaDescRu : p.metaDescEn,
    url: pageUrl,
    locale,
  });

  return (
    <div className="min-h-screen bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <SiteHeader />
      <main>
        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Breadcrumbs locale={locale} items={[{ name: crumbName, path: "/claude" }]} />
            <span className="badge-accent mt-2 inline-block text-[10px]">
              {ru ? p.lineRu : p.lineEn} · Anthropic
            </span>
            <h1 className="display-md mt-4">{ru ? p.h1Ru : p.h1En}</h1>
            <p className="mt-4 text-base leading-relaxed text-body">
              {ru ? p.subtitleRu : p.subtitleEn}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#contact" className="btn-primary">
                {ru ? "Обсудить внедрение Claude" : "Discuss Claude deployment"}
              </Link>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                Telegram
              </a>
              <Link href={p.glossaryHref} className="btn-secondary">
                {ru ? p.glossaryLabelRu : p.glossaryLabelEn}
              </Link>
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline" aria-labelledby="geo-title">
          <div className="container-editorial max-w-3xl">
            <h2 id="geo-title" className="section-title">
              {ru ? p.geoTitleRu : p.geoTitleEn}
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-body">
              {(ru ? p.geoFactsRu : p.geoFactsEn).map((fact) => (
                <li key={fact} className="feature-card">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <p className="meta-label">{ru ? p.popularLabelRu : p.popularLabelEn}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.terms.map((term) => (
                <li key={term}>
                  <span className="skill-chip">{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? p.problemsTitleRu : p.problemsTitleEn}</h2>
            <ul className="mt-6 grid gap-3 text-sm text-body sm:grid-cols-2">
              {(ru ? p.problemsRu : p.problemsEn).map((item) => (
                <li key={item} className="feature-card">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? p.servicesTitleRu : p.servicesTitleEn}</h2>
            <div className="mt-8 grid gap-4">
              {(ru ? p.servicesRu : p.servicesEn).map((serviceItem) => (
                <article key={serviceItem.title} className="feature-card">
                  <h3 className="font-medium text-ink">{serviceItem.title}</h3>
                  <p className="mt-2 text-sm text-body">{serviceItem.summary}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm">
              <Link href={p.servicesHref} className="text-link">
                {ru ? p.servicesLabelRu : p.servicesLabelEn} →
              </Link>
              <span className="text-muted"> · </span>
              <Link href={p.faqHref} className="text-link">
                {ru ? p.faqLabelRu : p.faqLabelEn} →
              </Link>
            </p>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? p.processTitleRu : p.processTitleEn}</h2>
            <ol className="mt-6 space-y-3 text-sm text-body">
              {(ru ? p.processRu : p.processEn).map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="font-display text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? "Частые вопросы" : "FAQ"}</h2>
            <div className="mt-6 space-y-6">
              {(ru ? p.faqRu : p.faqEn).map((item) => (
                <div key={item.q}>
                  <h3 className="font-medium text-ink">{item.q}</h3>
                  <p className="mt-2 text-sm text-body">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-band">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? "Запрос" : "Request"}</h2>
            <div className="feature-card-bordered mt-6">
              <ContactForm defaultService={ru ? "Claude AI для МСБ" : "Claude AI for SMB"} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
