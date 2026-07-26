import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getEnterpriseService } from "@/lib/enterprise-services";
import { getSecureAiProductLinks, SECURE_AI_PAGE } from "@/lib/secure-ai-page";
import {
  buildPageMetadata,
  faqJsonLd,
  localizedAbsolute,
  pageBreadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { TELEGRAM_URL } from "@/lib/site";
import { KASPERSKY_PARTNER_CERTIFICATES } from "@/lib/trust-partners";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale !== "en";
  const p = SECURE_AI_PAGE;
  return buildPageMetadata({
    title: ru ? p.metaTitleRu : p.metaTitleEn,
    description: ru ? p.metaDescRu : p.metaDescEn,
    path: "/secure-ai",
    locale,
  });
}

export default async function SecureAiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ru = locale !== "en";
  const p = SECURE_AI_PAGE;
  const products = getSecureAiProductLinks();
  const pack = getEnterpriseService("secure-private-ai-cloud", ru ? "ru" : "en");
  const pageUrl = localizedAbsolute("/secure-ai", locale);

  const breadcrumbs = pageBreadcrumbJsonLd(locale, [{ name: "Secure AI", path: "/secure-ai" }]);
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

  return (
    <div className="min-h-screen bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <SiteHeader />
      <main>
        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Breadcrumbs
              locale={locale}
              items={[{ name: "Secure AI", path: "/secure-ai" }]}
            />
            <span className="badge-accent mt-2 inline-block text-[10px]">
              {p.lineRu} · {ru ? p.parentRu : p.parentEn}
            </span>
            <h1 className="display-md mt-4">{ru ? p.h1Ru : p.h1En}</h1>
            <p className="mt-4 text-base leading-relaxed text-body">
              {ru ? p.subtitleRu : p.subtitleEn}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#contact" className="btn-primary">
                {ru ? "Обсудить Secure AI" : "Discuss Secure AI"}
              </Link>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                Telegram
              </a>
              <Link href={p.kasperskyHref} className="btn-secondary">
                Kaspersky
              </Link>
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="section-title text-xl">
                {ru ? p.mainBrandTitleRu : p.mainBrandTitleEn}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-body">
                {(ru ? p.mainBrandRu : p.mainBrandEn).map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="section-title text-xl">
                {ru ? p.lineTitleRu : p.lineTitleEn}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-body">
                {(ru ? p.lineScopeRu : p.lineScopeEn).map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">
              {ru ? "Продуктовые линии" : "Product lines"}
            </h2>
            <p className="body-copy mt-3 max-w-2xl text-sm">
              {ru
                ? "Коммерческие подстраницы на хабе Kaspersky — техническая интеграция LLM/RAG с продуктами безопасности."
                : "Commercial subpages on the Kaspersky hub — LLM/RAG wired to security products."}
            </p>
            <div className="mt-8 grid gap-4">
              {products.map((product) => (
                <article key={product.slug} className="feature-card">
                  <span className="text-[10px] uppercase tracking-wide text-muted">
                    {ru ? product.badgeRu : product.badgeEn}
                  </span>
                  <h3 className="mt-2 font-medium text-ink">
                    <Link href={product.href} className="hover:text-primary">
                      {ru ? product.titleRu : product.titleEn}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-body">
                    {ru ? product.summaryRu : product.summaryEn}
                  </p>
                  <Link href={product.href} className="link-more mt-4 inline-block">
                    {ru ? "Подробнее" : "Details"}
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm">
              <Link href={p.packHref} className="text-link">
                {ru ? p.packLabelRu : p.packLabelEn} →
              </Link>
              {pack && (
                <span className="text-muted">
                  {" "}
                  ({pack.salesNotes} · {pack.deliveryDays} {ru ? "дней" : "days"})
                </span>
              )}
              <span className="text-muted"> · </span>
              <Link href={p.kasperskyHref} className="text-link">
                {ru ? p.kasperskyLabelRu : p.kasperskyLabelEn} →
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
            <h2 className="section-title">{ru ? p.trustTitleRu : p.trustTitleEn}</h2>
            <p className="body-copy mt-3 max-w-2xl text-sm">
              {ru ? p.trustIntroRu : p.trustIntroEn}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {KASPERSKY_PARTNER_CERTIFICATES.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.pdfSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="feature-card block transition hover:border-primary/40"
                >
                  <Image
                    src={cert.previewSrc}
                    alt={ru ? cert.altRu : cert.altEn}
                    width={400}
                    height={283}
                    className="w-full rounded-sm"
                  />
                  <span className="mt-2 inline-block text-xs text-link">PDF</span>
                </a>
              ))}
            </div>
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
              <ContactForm
                defaultService={ru ? "Bober Secure AI" : "Bober Secure AI"}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
