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
import { AI_KUBERNETES_PAGE } from "@/lib/ai-kubernetes-page";
import { getEnterpriseReviews } from "@/lib/enterprise-reviews";
import { getEnterpriseService } from "@/lib/enterprise-services";
import { PROFILE } from "@/lib/profile";
import {
  buildPageMetadata,
  faqJsonLd,
  localizedAbsolute,
  pageBreadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { TELEGRAM_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const HERO_IMAGE = "/stock/private-llm.jpg";

const PROCESS_TITLES = {
  ru: ["Аудит контура", "Архитектура", "Контейнеризация", "Передача"],
  en: ["Contour audit", "Architecture", "Containerization", "Handover"],
} as const;

const ARCHITECTURE = {
  ru: [
    "Kubernetes / OpenShift / DeckHouse + GPU-ноды",
    "Namespace, сеть, RBAC и секреты под LLM/RAG",
    "Инференс, оркестрация агентов, журналирование",
    "Мониторинг нагрузки модели и стоимость GPU",
    "Опционально: подготовка к Kaspersky Container Security",
  ],
  en: [
    "Kubernetes / OpenShift / DeckHouse + GPU nodes",
    "Namespaces, network, RBAC and secrets for LLM/RAG",
    "Inference, agent orchestration, logging",
    "Model-load monitoring and GPU cost control",
    "Optional: prep for Kaspersky Container Security",
  ],
} as const;

const ROI = {
  ru: [
    { value: "5 услуг", label: "от аудита K8s до Agent Runtime" },
    { value: "on-prem", label: "закрытый контур без внешних API" },
    { value: "от 28 дн.", label: "пакет Secure Private AI Cloud" },
  ],
  en: [
    { value: "5 services", label: "from K8s audit to Agent Runtime" },
    { value: "on-prem", label: "closed contour without external APIs" },
    { value: "from 28 days", label: "Secure Private AI Cloud pack" },
  ],
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale !== "en";
  const p = AI_KUBERNETES_PAGE;
  return buildPageMetadata({
    title: ru ? p.metaTitleRu : p.metaTitleEn,
    description: ru ? p.metaDescRu : p.metaDescEn,
    keywords: ru ? [...p.metaKeywordsRu] : [...p.metaKeywordsEn],
    path: "/ai-kubernetes",
    locale,
  });
}

export default async function AiKubernetesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicePage");
  const ru = locale !== "en";
  const isEn = !ru;
  const p = AI_KUBERNETES_PAGE;
  const pack = getEnterpriseService("secure-private-ai-cloud", ru ? "ru" : "en");
  const reviews = getEnterpriseReviews();
  const pageUrl = localizedAbsolute("/ai-kubernetes", locale);
  const h1 = ru ? p.h1Ru : p.h1En;
  const subtitle = ru ? p.subtitleRu : p.subtitleEn;
  const processSteps = ru ? p.processRu : p.processEn;
  const processTitles = ru ? PROCESS_TITLES.ru : PROCESS_TITLES.en;
  const architecture = ru ? ARCHITECTURE.ru : ARCHITECTURE.en;
  const roi = ru ? ROI.ru : ROI.en;
  const services = ru ? p.servicesRu : p.servicesEn;
  const defaultService = "Bober AI on Kubernetes";

  const breadcrumbs = pageBreadcrumbJsonLd(locale, [
    { name: "AI on Kubernetes", path: "/ai-kubernetes" },
  ]);
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
    { href: p.secureAiHref, label: ru ? p.secureAiLabelRu : p.secureAiLabelEn },
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
            <Breadcrumbs
              locale={locale}
              items={[{ name: "AI on Kubernetes", path: "/ai-kubernetes" }]}
            />
            <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
              <Reveal className="max-w-4xl">
                <span className="section-label">
                  {p.lineRu} · {ru ? "линия Bober AI Systems" : "line of Bober AI Systems"}
                </span>
                <h1 className="display-md mt-4">{h1}</h1>
                <p className="mt-3 text-sm text-muted">
                  {ru ? "Исполнитель" : "Performer"}:{" "}
                  <span className="font-medium text-ink">{PROFILE.name}</span>
                </p>
                <PerformerRating locale={locale} className="mt-3" />
                <p className="body-copy mt-5 max-w-3xl text-lg">{subtitle}</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <ContactCta defaultService={defaultService} goal="audit_cta_click">
                    {ru ? "Обсудить архитектуру" : "Discuss the architecture"}
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
                {ru
                  ? "Прототип в ноутбуке — не production. Переносим LLM, RAG и агентов в Kubernetes с контролем доступа, журналами и готовностью к ИБ."
                  : "A laptop prototype is not production. We move LLM, RAG and agents onto Kubernetes with access control, logs and security readiness."}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <h2 className="section-title">{ru ? p.problemsTitleRu : p.problemsTitleEn}</h2>
              <ul className="mt-8 space-y-4">
                {(ru ? p.problemsRu : p.problemsEn).map((item) => (
                  <li key={item} className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-title">{ru ? p.servicesTitleRu : p.servicesTitleEn}</h2>
              <ul className="mt-8 space-y-4">
                {services.map((service) => (
                  <li key={service.title} className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>
                      {"href" in service && service.href ? (
                        <Link href={service.href} className="font-medium text-ink hover:text-primary">
                          {service.title}
                        </Link>
                      ) : (
                        <span className="font-medium text-ink">{service.title}</span>
                      )}
                      <span className="mt-1 block text-muted">{service.summary}</span>
                    </span>
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
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <h2 className="section-title">
                {ru ? "Типовая архитектура" : "Typical architecture"}
              </h2>
              <ul className="mt-8 space-y-4">
                {architecture.map((item) => (
                  <li key={item} className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="card-title mt-12">
                {ru ? p.kasperskyNoteTitleRu : p.kasperskyNoteTitleEn}
              </h3>
              <p className="body-copy mt-3 text-base">
                {ru ? p.kasperskyNoteRu : p.kasperskyNoteEn}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">{ru ? "Эффект" : "Impact"}</h2>
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

        {pack ? (
          <section className="section-band section--deep border-b border-hairline">
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
                        <td className="py-3 text-muted">{pack.salesNotes}</td>
                      </tr>
                      <tr className="border-b border-hairline">
                        <th scope="row" className="py-3 pr-6 font-medium text-ink">
                          {t("timeline")}
                        </th>
                        <td className="py-3 text-muted">
                          {pack.deliveryDays} {t("days")}
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
                        <td className="py-3 text-muted">{pack.about}</td>
                      </tr>
                    </tbody>
                  </table>
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
              <ContactForm defaultService={defaultService} />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
