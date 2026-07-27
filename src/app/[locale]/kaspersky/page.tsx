import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { KASPERSKY_PAGE, KASPERSKY_PRODUCTS } from "@/lib/kaspersky-page";
import { buildPageMetadata } from "@/lib/seo";
import { KASPERSKY_PARTNER_CERTIFICATES } from "@/lib/trust-partners";
import { TELEGRAM_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale !== "en";
  return buildPageMetadata({
    title: ru ? KASPERSKY_PAGE.metaTitleRu : KASPERSKY_PAGE.metaTitleEn,
    description: ru ? KASPERSKY_PAGE.metaDescRu : KASPERSKY_PAGE.metaDescEn,
    path: "/kaspersky",
    locale,
  });
}

export default async function KasperskyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ru = locale !== "en";
  const p = KASPERSKY_PAGE;

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <main>
        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Breadcrumbs
              locale={locale}
              items={[
                { name: "Secure AI", path: "/secure-ai" },
                { name: "Kaspersky", path: "/kaspersky" },
              ]}
            />
            <span className="badge-accent mt-2 inline-block text-[10px]">
              {ru ? p.statusRu : p.statusEn}
            </span>
            <h1 className="display-md mt-4">{ru ? p.h1Ru : p.h1En}</h1>
            <p className="mt-4 text-base leading-relaxed text-body">
              {ru ? p.subtitleRu : p.subtitleEn}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {p.badges.map((badge) => (
                <Image
                  key={badge.id}
                  src={badge.src}
                  alt={ru ? badge.altRu : badge.altEn}
                  width={Math.round(badge.width / 6)}
                  height={Math.round(badge.height / 6)}
                  className="h-12 w-auto"
                />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#ai-kaspersky" className="btn-primary">
                {ru ? "Линии AI × Kaspersky" : "AI × Kaspersky lines"}
              </Link>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                Telegram
              </a>
              <Link href="/secure-ai" className="btn-secondary">
                Bober Secure AI
              </Link>
              <Link href="/about#certificates" className="btn-secondary">
                {ru ? "Сертификаты" : "Certificates"}
              </Link>
            </div>
          </div>
        </section>

        <section id="ai-kaspersky" className="section-band border-b border-hairline scroll-mt-16">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? p.productsTitleRu : p.productsTitleEn}</h2>
            <p className="body-copy mt-3 max-w-2xl text-sm">
              {ru ? p.productsIntroRu : p.productsIntroEn}
            </p>
            <div className="mt-8 grid gap-4">
              {KASPERSKY_PRODUCTS.map((product) => (
                <article key={product.slug} className="feature-card">
                  <span className="text-[10px] uppercase tracking-wide text-muted">
                    {ru ? product.badgeRu : product.badgeEn}
                  </span>
                  <h3 className="mt-2 font-medium text-ink">
                    <Link href={`/kaspersky/${product.slug}`} className="hover:text-primary">
                      {ru ? product.titleRu : product.titleEn}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-body">
                    {ru ? product.summaryRu : product.summaryEn}
                  </p>
                  <Link
                    href={`/kaspersky/${product.slug}`}
                    className="link-more mt-4 inline-block"
                  >
                    {ru ? "Подробнее" : "Details"}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? p.matrixTitleRu : p.matrixTitleEn}</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-hairline text-muted">
                    <th className="py-2 pr-4 font-medium">Kaspersky</th>
                    <th className="py-2 font-medium">Bober AI Systems</th>
                  </tr>
                </thead>
                <tbody>
                  {(ru ? p.matrixRu : p.matrixEn).map((row) => (
                    <tr key={row.k} className="border-b border-hairline/60">
                      <td className="py-3 pr-4 text-body">{row.k}</td>
                      <td className="py-3 text-body">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">
              {ru ? "Лицензии и классические внедрения" : "Licenses and classic deployments"}
            </h2>
            <p className="body-copy mt-3 max-w-2xl text-sm">
              {ru
                ? "Wordstat-приоритеты: KES купить, настройка Security Center, серверы 1С/терминалы, почта, Optimum/EDR, аудит ИБ."
                : "Wordstat priorities: buy KES, Security Center setup, 1C/terminals, mail, Optimum/EDR, security audit."}
            </p>
            <div className="mt-8 grid gap-4">
              {p.offers.map((offer) => (
                <article key={offer.id} id={offer.id} className="feature-card scroll-mt-20">
                  <h3 className="font-medium text-ink">{ru ? offer.titleRu : offer.titleEn}</h3>
                  <p className="mt-2 text-sm text-body">{ru ? offer.blurbRu : offer.blurbEn}</p>
                  <p className="mt-3 text-xs text-muted">{offer.wordstatHint}</p>
                </article>
              ))}
            </div>
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

            <h2 className="section-title mt-12">{ru ? p.attachTitleRu : p.attachTitleEn}</h2>
            <ul className="mt-4 space-y-2 text-sm text-body">
              {(ru ? p.attachRu : p.attachEn).map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              <Link href="/services/secure-private-ai-cloud" className="text-link">
                {ru
                  ? "Пакет: защищенная AI-инфраструктура →"
                  : "Pack: Secure Private AI Cloud →"}
              </Link>
            </p>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? "Документы партнёра" : "Partner documents"}</h2>
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
            <p className="mt-6 text-xs leading-relaxed text-muted">
              {ru ? p.disclaimerRu : p.disclaimerEn}
            </p>
          </div>
        </section>

        <section id="contact" className="section-band">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">
              {ru ? "Смета лицензий и внедрения" : "License and deployment estimate"}
            </h2>
            <div className="feature-card-bordered mt-6">
              <ContactForm
                defaultService={
                  ru ? "Kaspersky — AI / лицензии / внедрение" : "Kaspersky — AI / licenses / deploy"
                }
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
