import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactCta } from "@/components/ContactCta";
import { ContactForm } from "@/components/ContactForm";
import { PerformerRating } from "@/components/PerformerRating";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import { ReviewsShowcase } from "@/components/motion/ReviewsShowcase";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getEnterpriseReviews } from "@/lib/enterprise-reviews";
import { getEnterpriseService } from "@/lib/enterprise-services";
import { KASPERSKY_PAGE, KASPERSKY_PRODUCTS } from "@/lib/kaspersky-page";
import { PROFILE } from "@/lib/profile";
import { buildPageMetadata } from "@/lib/seo";
import { TELEGRAM_URL } from "@/lib/site";
import { KASPERSKY_PARTNER_CERTIFICATES } from "@/lib/trust-partners";

type Props = { params: Promise<{ locale: string }> };

const HERO_IMAGE = "/stock/cyber-padlock.jpg";

const PROCESS_TITLES = {
  ru: ["Выбор линии", "Аудит и смета", "Внедрение", "Сопровождение"],
  en: ["Pick a line", "Audit & quote", "Deployment", "Support"],
} as const;

const ROI = {
  ru: [
    { value: "5 линий", label: "AI × Kaspersky с зонами ответственности" },
    { value: "B2B / B2C", label: "Registered Partner через дистрибуцию" },
    { value: "от 28 дн.", label: "пакет Secure Private AI Cloud" },
  ],
  en: [
    { value: "5 lines", label: "AI × Kaspersky with clear ownership" },
    { value: "B2B / B2C", label: "Registered Partner via distribution" },
    { value: "from 28 days", label: "Secure Private AI Cloud pack" },
  ],
} as const;

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
  const t = await getTranslations("servicePage");
  const ru = locale !== "en";
  const isEn = !ru;
  const p = KASPERSKY_PAGE;
  const pack = getEnterpriseService("secure-private-ai-cloud", ru ? "ru" : "en");
  const reviews = getEnterpriseReviews();
  const h1 = ru ? p.h1Ru : p.h1En;
  const subtitle = ru ? p.subtitleRu : p.subtitleEn;
  const processSteps = ru ? p.processRu : p.processEn;
  const processTitles = ru ? PROCESS_TITLES.ru : PROCESS_TITLES.en;
  const roi = ru ? ROI.ru : ROI.en;
  const defaultService = ru
    ? "Kaspersky — AI / лицензии / внедрение"
    : "Kaspersky — AI / licenses / deploy";

  const related = [
    { href: "/secure-ai", label: "Bober Secure AI" },
    { href: "/services/secure-private-ai-cloud", label: ru ? "Secure Private AI Cloud" : "Secure Private AI Cloud" },
    { href: "/ai-kubernetes", label: "AI on Kubernetes" },
    { href: "/services/rag", label: ru ? "Корпоративный RAG" : "Corporate RAG" },
  ];

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Breadcrumbs
              locale={locale}
              items={[
                { name: "Secure AI", path: "/secure-ai" },
                { name: "Kaspersky", path: "/kaspersky" },
              ]}
            />
            <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
              <Reveal className="max-w-4xl">
                <span className="section-label">{ru ? p.statusRu : p.statusEn}</span>
                <h1 className="display-md mt-4">{h1}</h1>
                <p className="mt-3 text-sm text-muted">
                  {ru ? "Исполнитель" : "Performer"}:{" "}
                  <span className="font-medium text-ink">{PROFILE.name}</span>
                </p>
                <PerformerRating locale={locale} className="mt-3" />
                <p className="body-copy mt-5 max-w-3xl text-lg">{subtitle}</p>
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
                <div className="mt-10 flex flex-wrap gap-4">
                  <ContactCta defaultService={defaultService} goal="audit_cta_click">
                    {ru ? "Линии AI × Kaspersky" : "AI × Kaspersky lines"}
                  </ContactCta>
                  <TrackedAnchor
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    goal="telegram_click"
                  >
                    Telegram
                  </TrackedAnchor>
                  <ContactCta
                    variant="secondary"
                    defaultService={defaultService}
                    goal="service_estimate_cta_click"
                  >
                    {ru ? "Получить оценку" : "Get an estimate"}
                  </ContactCta>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <aside className="feature-card-bordered">
                  <p className="font-display text-2xl tracking-tight">
                    {pack?.salesNotes ?? (ru ? "от 800 000 ₽" : "from €8,000")}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {t("timeline")}: {pack?.deliveryDays ?? 28} {t("days")}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    {isEn ? "Fixed estimate · remote" : "Фиксированная смета · удалённо"}
                  </p>
                  <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-soft">
                    <Image
                      src={HERO_IMAGE}
                      alt={h1}
                      fill
                      className="object-cover"
                      sizes="360px"
                      priority
                    />
                  </div>
                  <ContactCta className="mt-6 w-full" defaultService={defaultService} goal="audit_cta_click">
                    {t("quote")}
                  </ContactCta>
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <p className="body-copy text-base">
                {ru ? p.productsIntroRu : p.productsIntroEn}
              </p>
            </Reveal>
          </div>
        </section>

        <section id="ai-kaspersky" className="section-band section--deep border-b border-hairline scroll-mt-16">
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">{ru ? p.productsTitleRu : p.productsTitleEn}</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {KASPERSKY_PRODUCTS.map((product) => (
                <Reveal key={product.slug}>
                  <article className="feature-card h-full">
                    <span className="meta-label">{ru ? product.badgeRu : product.badgeEn}</span>
                    <h3 className="card-title mt-3">
                      <Link href={`/kaspersky/${product.slug}`} className="hover:text-primary">
                        {ru ? product.titleRu : product.titleEn}
                      </Link>
                    </h3>
                    <p className="body-copy mt-3 text-base">
                      {ru ? product.summaryRu : product.summaryEn}
                    </p>
                    <Link href={`/kaspersky/${product.slug}`} className="link-more mt-4">
                      {ru ? "Подробнее" : "Details"}
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <h2 className="section-title">{ru ? p.matrixTitleRu : p.matrixTitleEn}</h2>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <caption className="sr-only">
                    {ru ? "Зоны ответственности Kaspersky и Bober AI Systems" : "Kaspersky vs Bober AI Systems ownership"}
                  </caption>
                  <thead>
                    <tr className="border-b border-hairline">
                      <th scope="col" className="py-3 pr-6 font-medium text-ink">
                        Kaspersky
                      </th>
                      <th scope="col" className="py-3 font-medium text-ink">
                        Bober AI Systems
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(ru ? p.matrixRu : p.matrixEn).map((row) => (
                      <tr key={row.k} className="border-b border-hairline">
                        <td className="py-3 pr-6 text-muted">{row.k}</td>
                        <td className="py-3 text-muted">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <h2 className="section-title">
                {ru ? "Лицензии и классические внедрения" : "Licenses and classic deployments"}
              </h2>
              <ul className="mt-8 space-y-4">
                {p.offers.map((offer) => (
                  <li key={offer.id} id={offer.id} className="body-copy scroll-mt-20 text-base">
                    <span className="font-medium text-ink">{ru ? offer.titleRu : offer.titleEn}</span>
                    <span className="mt-1 block text-muted">{ru ? offer.blurbRu : offer.blurbEn}</span>
                    <span className="mt-1 block text-xs text-muted">{offer.wordstatHint}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-title">{ru ? p.attachTitleRu : p.attachTitleEn}</h2>
              <ul className="mt-8 space-y-4">
                {(ru ? p.attachRu : p.attachEn).map((item) => (
                  <li key={item} className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">{ru ? p.processTitleRu : p.processTitleEn}</h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((step, index) => (
                  <article key={step} className="feature-card">
                    <span className="font-display text-3xl text-primary/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="card-title mt-3">{processTitles[index]}</h3>
                    <p className="body-copy mt-3 text-base">{step}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">{ru ? "Эффект связки" : "Bundle impact"}</h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {roi.map((item) => (
                  <div key={item.label} className="feature-card-bordered text-center">
                    <p className="font-display text-3xl tracking-tight text-ink">{item.value}</p>
                    <p className="body-copy mt-2 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <h2 className="section-title">{ru ? "Документы партнёра" : "Partner documents"}</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
            </Reveal>
          </div>
        </section>

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

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">{ru ? "Связанные услуги" : "Related services"}</h2>
              <Stagger className="mt-6">
                {related.map((item) => (
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

        <section id="contact" className="section-band section--panel scroll-mt-16">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <span className="section-label">{ru ? "Контакт" : "Contact"}</span>
              <h2 className="section-title mt-4">
                {ru ? "Смета лицензий и внедрения" : "License and deployment estimate"}
              </h2>
              <p className="body-copy mt-4 max-w-xl text-base">{subtitle}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm defaultService={defaultService} />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
