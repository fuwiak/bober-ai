import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactCta } from "@/components/ContactCta";
import { ContactForm } from "@/components/ContactForm";
import { PerformerRating } from "@/components/PerformerRating";
import { SecureAiChecklist } from "@/components/SecureAiChecklist";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import { ReviewsShowcase } from "@/components/motion/ReviewsShowcase";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getEnterpriseReviews } from "@/lib/enterprise-reviews";
import { getEnterpriseService } from "@/lib/enterprise-services";
import { PROFILE } from "@/lib/profile";
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

const HERO_IMAGE = "/stock/cyber-padlock.jpg";

const PROCESS_TITLES = {
  ru: ["Аудит контура", "Выбор линии", "Внедрение", "Мониторинг"],
  en: ["Contour audit", "Pick a line", "Deployment", "Monitoring"],
} as const;

const ROI = {
  ru: [
    { value: "5 линий", label: "LLM/RAG, DevOps, SOC, Gateway, почта" },
    { value: "25 пунктов", label: "экспресс-чеклист готовности AI" },
    { value: "от 28 дн.", label: "пакет Secure Private AI Cloud" },
  ],
  en: [
    { value: "5 lines", label: "LLM/RAG, DevOps, SOC, Gateway, mail" },
    { value: "25 checks", label: "express AI readiness checklist" },
    { value: "from 28 days", label: "Secure Private AI Cloud pack" },
  ],
} as const;

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
  const t = await getTranslations("servicePage");
  const ru = locale !== "en";
  const isEn = !ru;
  const p = SECURE_AI_PAGE;
  const products = getSecureAiProductLinks();
  const pack = getEnterpriseService("secure-private-ai-cloud", ru ? "ru" : "en");
  const reviews = getEnterpriseReviews();
  const pageUrl = localizedAbsolute("/secure-ai", locale);
  const h1 = ru ? p.h1Ru : p.h1En;
  const subtitle = ru ? p.subtitleRu : p.subtitleEn;
  const processSteps = ru ? p.processRu : p.processEn;
  const processTitles = ru ? PROCESS_TITLES.ru : PROCESS_TITLES.en;
  const roi = ru ? ROI.ru : ROI.en;

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

  const related = [
    { href: p.packHref, label: ru ? p.packLabelRu : p.packLabelEn },
    { href: p.kasperskyHref, label: ru ? p.kasperskyLabelRu : p.kasperskyLabelEn },
    { href: "/ai-kubernetes", label: "AI on Kubernetes" },
    { href: "/services/rag", label: ru ? "Корпоративный RAG" : "Corporate RAG" },
  ];

  return (
    <div className="page-shell min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Breadcrumbs locale={locale} items={[{ name: "Secure AI", path: "/secure-ai" }]} />
            <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
              <Reveal className="max-w-4xl">
                <span className="section-label">
                  {p.lineRu} · {ru ? p.parentRu : p.parentEn}
                </span>
                <h1 className="display-md mt-4">{h1}</h1>
                <p className="mt-3 text-sm text-muted">
                  {ru ? "Исполнитель" : "Performer"}:{" "}
                  <span className="font-medium text-ink">{PROFILE.name}</span>
                </p>
                <PerformerRating locale={locale} className="mt-3" />
                <p className="body-copy mt-5 max-w-3xl text-lg">{subtitle}</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <ContactCta defaultService={h1} goal="audit_cta_click">
                    {ru ? "Получить экспресс-разбор архитектуры" : "Get an express architecture review"}
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
                  <ContactCta variant="secondary" defaultService={h1} goal="service_estimate_cta_click">
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
                  <ContactCta className="mt-6 w-full" defaultService={h1} goal="audit_cta_click">
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
                {ru
                  ? "Проверьте, готов ли ваш AI-сервис к работе с корпоративными данными — до запуска LLM, RAG или агента."
                  : "Check whether your AI service is ready for corporate data — before launching an LLM, RAG or agent."}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <h2 className="section-title">{ru ? p.mainBrandTitleRu : p.mainBrandTitleEn}</h2>
              <ul className="mt-8 space-y-4">
                {(ru ? p.mainBrandRu : p.mainBrandEn).map((item) => (
                  <li key={item} className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-title">{ru ? p.lineTitleRu : p.lineTitleEn}</h2>
              <ul className="mt-8 space-y-4">
                {(ru ? p.lineScopeRu : p.lineScopeEn).map((item) => (
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
              <h2 className="section-title">{ru ? "Продуктовые линии" : "Product lines"}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">
                {ru
                  ? "Коммерческие подстраницы на хабе Kaspersky — техническая интеграция LLM/RAG с продуктами безопасности."
                  : "Commercial subpages on the Kaspersky hub — LLM/RAG wired to security products."}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {products.map((product) => (
                <Reveal key={product.slug}>
                  <article className="feature-card h-full">
                    <span className="meta-label">{ru ? product.badgeRu : product.badgeEn}</span>
                    <h3 className="card-title mt-3">
                      <Link href={product.href} className="hover:text-primary">
                        {ru ? product.titleRu : product.titleEn}
                      </Link>
                    </h3>
                    <p className="body-copy mt-3 text-base">
                      {ru ? product.summaryRu : product.summaryEn}
                    </p>
                    <Link href={product.href} className="link-more mt-4">
                      {ru ? "Подробнее" : "Details"}
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">{ru ? "Эффект линии" : "Line impact"}</h2>
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

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <span className="section-label">{ru ? "Экспресс-самопроверка" : "Express self-check"}</span>
              <h2 className="section-title mt-4">
                {ru
                  ? "Готов ли ваш AI-сервис к работе с корпоративными данными?"
                  : "Is your AI service ready to handle corporate data?"}
              </h2>
              <p className="body-copy mt-4 max-w-2xl text-base">
                {ru
                  ? "25 вопросов, которые нужно проверить до запуска корпоративного LLM, RAG или AI-агента."
                  : "25 questions to check before launching a corporate LLM, RAG or AI agent."}
              </p>
              <div className="mt-8">
                <SecureAiChecklist locale={locale} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <h2 className="section-title">{ru ? p.trustTitleRu : p.trustTitleEn}</h2>
              <p className="body-copy mt-3 max-w-2xl text-base">
                {ru ? p.trustIntroRu : p.trustIntroEn}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {KASPERSKY_PARTNER_CERTIFICATES.map((cert) => (
                  <a
                    key={cert.id}
                    href={cert.pdfSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="feature-card block transition hover:border-primary/40"
                  >
                    <div className="bg-white p-3">
                      <Image
                        src={cert.previewSrc}
                        alt={ru ? cert.altRu : cert.altEn}
                        width={400}
                        height={283}
                        className="w-full rounded-sm"
                      />
                    </div>
                    <span className="mt-2 inline-block text-xs text-link">PDF</span>
                  </a>
                ))}
              </div>
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

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <h2 className="section-title">{ru ? "Частые вопросы" : "FAQ"}</h2>
              <dl className="mt-8 space-y-8">
                {(ru ? p.faqRu : p.faqEn).map((item) => (
                  <div key={item.q}>
                    <dt className="font-display text-xl tracking-tight">{item.q}</dt>
                    <dd className="body-copy mt-3 text-base">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

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
              <h2 className="section-title mt-4">{t("formTitle")}</h2>
              <p className="body-copy mt-4 max-w-xl text-base">{subtitle}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm defaultService="Bober Secure AI" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
