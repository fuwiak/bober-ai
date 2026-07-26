import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { KASPERSKY_PAGE } from "@/lib/kaspersky-page";
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
              items={[{ name: "Kaspersky", path: "/kaspersky" }]}
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
              <Link href="/#contact" className="btn-primary">
                {ru ? "Запросить смету лицензий" : "Request a license quote"}
              </Link>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                Telegram
              </a>
              <Link href="/about#certificates" className="btn-secondary">
                {ru ? "Сертификаты" : "Certificates"}
              </Link>
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">
              {ru ? "Что продаём и внедряем" : "What we sell and deploy"}
            </h2>
            <p className="body-copy mt-3 max-w-2xl text-sm">
              {ru
                ? "Приоритеты по Wordstat: купить/лицензия KES, настройка Security Center, защита серверов 1С и терминалов, почта, Optimum/EDR, аудит ИБ."
                : "Wordstat priorities: buy/license KES, Security Center setup, 1C and terminal server protection, mail, Optimum/EDR, security audit."}
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
                defaultService={ru ? "Kaspersky — лицензии / внедрение" : "Kaspersky — licenses / deployment"}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
