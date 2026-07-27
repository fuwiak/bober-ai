import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactCta } from "@/components/ContactCta";
import { PerformerRating } from "@/components/PerformerRating";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import { ReviewsShowcase } from "@/components/motion/ReviewsShowcase";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { getEnterpriseReviews } from "@/lib/enterprise-reviews";
import { getPortfolioItem, PORTFOLIO_LISTING_SLUGS, PROFILE } from "@/lib/profile";
import type { HubDef } from "@/lib/seo-catalog/types";
import { organizationJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, TELEGRAM_URL } from "@/lib/site";

type SeoHubPageProps = {
  hub: HubDef;
  locale: string;
};

const AUTOMATION_CASES = [...PORTFOLIO_LISTING_SLUGS];

const AUTOMATION_COPY = {
  ru: {
    catalog: "Автоматизация для бизнеса",
    primaryCta: "Получить оценку",
    secondaryCta: "Смотреть кейсы",
    heroNote: "Аудит от 150 000 ₽ · пилот от 300 000 ₽ · внедрение от 500 000 ₽",
    introLabel: "С чего начинаем",
    introTitle: "Автоматизируем не отдел целиком, а конкретный процесс с понятной экономикой",
    introText:
      "Сначала фиксируем, сколько времени, ошибок и денег теряется сейчас. Затем проектируем один сквозной контур — от события в CRM, почте или форме до готового документа, задачи или ответа клиенту.",
    stats: [
      { value: "45 → 2 мин", label: "подготовка коммерческого предложения" },
      { value: "+32%", label: "конверсия из предложения в заказ" },
      { value: "−50%", label: "повторные обращения на первой линии" },
    ],
    solutionsLabel: "Направления",
    solutionsTitle: "Восемь сценариев автоматизации",
    solutionsText:
      "КП, документооборот, AI для Bitrix24 / amoCRM / 1С, корпоративный поиск, распознавание документов и AI для отдела продаж — каждый сценарий со своей задачей и понятным результатом.",
    fitLabel: "Точки роста",
    fitTitle: "Когда автоматизация уже окупится",
    fitItems: [
      { title: "Данные переносят вручную", text: "Сотрудники копируют заявки, статусы и реквизиты между CRM, 1С, почтой и таблицами." },
      { title: "Документы собирают по шаблону", text: "КП, отчёты, договоры и ответы создаются из одних и тех же данных, но каждый раз вручную." },
      { title: "Заявки зависят от памяти", text: "Лиды и внутренние запросы теряются без маршрутизации, напоминаний и контроля SLA." },
      { title: "Знания живут в чатах", text: "Сотрудники ищут регламенты по коллегам, а поддержка снова отвечает на типовые вопросы." },
    ],
    processLabel: "Внедрение",
    processTitle: "От карты процесса до production",
    process: [
      { title: "Диагностика", text: "Разбираем процесс, системы, объём операций и текущие потери." },
      { title: "ROI и архитектура", text: "Считаем эффект, выбираем workflow, интеграции и AI только для подходящих шагов." },
      { title: "Пилот на одном контуре", text: "Собираем рабочий сценарий, проверяем на реальных данных и исключениях." },
      { title: "Запуск и передача", text: "Добавляем мониторинг, документацию, права доступа и обучаем команду." },
    ],
    stackLabel: "Интеграции",
    stackTitle: "Работаем с вашим текущим контуром",
    stackText: "Не заставляем менять весь стек. Связываем системы через API, webhooks и управляемые workflow.",
    stack: ["amoCRM", "Bitrix24", "1С", "n8n", "Telegram", "Yandex Cloud", "GigaChat", "Claude"],
    casesLabel: "Результаты",
    casesTitle: "Автоматизация на реальных проектах",
    caseLink: "Подробнее о проекте",
    contactLabel: "Контакт",
    contactTitle: "Или оставьте заявку",
    contactText: "Опишите, что команда делает вручную, какие системы участвуют и сколько операций проходит за месяц. Вернёмся с уточняющими вопросами и форматом старта.",
    priceLabel: "от 300 000 ₽",
    priceNote: "пилот · фиксированная смета · удалённо",
    timelineLabel: "Срок: 21 дн.",
    deliverablesTitle: "Что вы получаете",
    deliverables: [
      "Карта одного процесса с потерями и ROI",
      "Сквозной контур: событие → AI → CRM / документ",
      "Интеграции с текущим стеком без замены платформы",
      "Пилот на реальных данных и передача команде",
    ],
    architectureTitle: "Типовой контур",
    architecture: [
      "Trigger: CRM, почта, форма, мессенджер",
      "Rules + AI: квалификация, извлечение, генерация",
      "CRM / ERP / 1С: запись фактов и задач",
      "Документы: КП, договоры, счета",
      "Monitoring: SLA, ошибки, повторные обращения",
    ],
    relatedTitle: "Связанные услуги",
    related: [
      { href: "/services/ai-sales-loop", label: "AI-контур отдела продаж" },
      { href: "/services/rag", label: "Корпоративный RAG" },
      { href: "/services/business-process-automation", label: "Автоматизация бизнес-процессов" },
      { href: "/secure-ai", label: "Bober Secure AI" },
    ],
  },
  en: {
    catalog: "Business automation",
    primaryCta: "Get an estimate",
    secondaryCta: "View case studies",
    heroNote: "Audit from €1,500 · pilot from €3,000 · implementation from €5,000",
    introLabel: "Where we start",
    introTitle: "We automate a measurable process, not an entire department at once",
    introText:
      "First we establish the current cost in time, errors and money. Then we design one end-to-end flow — from an event in CRM, email or a form to a finished document, task or customer response.",
    stats: [
      { value: "45 → 2 min", label: "to prepare a commercial proposal" },
      { value: "+32%", label: "quote-to-order conversion" },
      { value: "−50%", label: "repeat first-line requests" },
    ],
    solutionsLabel: "Directions",
    solutionsTitle: "Eight automation scenarios",
    solutionsText:
      "Proposals, documents, AI for Bitrix24 / amoCRM / 1C, corporate search, document recognition and AI for sales — each scenario has a clear job and outcome.",
    fitLabel: "Growth points",
    fitTitle: "When automation can already pay back",
    fitItems: [
      { title: "Data is copied by hand", text: "Teams move requests, statuses and details between CRM, 1C, email and spreadsheets." },
      { title: "Documents follow a template", text: "Proposals, reports, contracts and replies use the same data but are rebuilt manually." },
      { title: "Requests rely on memory", text: "Leads and internal requests get lost without routing, reminders and SLA control." },
      { title: "Knowledge lives in chats", text: "Staff ask colleagues for policies while support answers the same questions again." },
    ],
    processLabel: "Delivery",
    processTitle: "From process map to production",
    process: [
      { title: "Discovery", text: "We map the process, systems, operation volume and current losses." },
      { title: "ROI and architecture", text: "We model impact and select workflow, integrations and AI only where it fits." },
      { title: "One-flow pilot", text: "We build a working scenario and test it on real data and exceptions." },
      { title: "Launch and handover", text: "We add monitoring, documentation, access control and train the team." },
    ],
    stackLabel: "Integrations",
    stackTitle: "Built around your current stack",
    stackText: "No forced platform replacement. We connect systems through APIs, webhooks and managed workflows.",
    stack: ["amoCRM", "Bitrix24", "1C", "n8n", "Telegram", "Yandex Cloud", "GigaChat", "Claude"],
    casesLabel: "Outcomes",
    casesTitle: "Automation in real projects",
    caseLink: "View case study",
    contactLabel: "Contact",
    contactTitle: "Or leave a request",
    contactText: "Tell us what the team does manually, which systems are involved and the monthly operation volume. We will return with focused questions and a recommended starting format.",
    priceLabel: "from €3,000",
    priceNote: "pilot · fixed estimate · remote",
    timelineLabel: "Timeline: 21 days",
    deliverablesTitle: "What you get",
    deliverables: [
      "One-process map with losses and ROI",
      "End-to-end flow: event → AI → CRM / document",
      "Integrations with the current stack — no forced replacement",
      "Pilot on real data and team handover",
    ],
    architectureTitle: "Typical contour",
    architecture: [
      "Trigger: CRM, email, form, messenger",
      "Rules + AI: qualification, extraction, generation",
      "CRM / ERP / 1C: facts and tasks written back",
      "Documents: proposals, contracts, invoices",
      "Monitoring: SLA, errors, repeat requests",
    ],
    relatedTitle: "Related services",
    related: [
      { href: "/services/ai-sales-loop", label: "AI sales loop" },
      { href: "/services/rag", label: "Corporate RAG" },
      { href: "/services/business-process-automation", label: "Business process automation" },
      { href: "/secure-ai", label: "Bober Secure AI" },
    ],
  },
};

function AutomationHubPage({ hub, locale }: SeoHubPageProps) {
  const loc = locale === "en" ? "en" : "ru";
  const isEn = loc === "en";
  const copy = hub[loc];
  const pageCopy = AUTOMATION_COPY[loc];
  const prefix = loc === "en" ? "/en" : "";
  const pageUrl = absoluteUrl(`${prefix}/automation`);
  const reviews = getEnterpriseReviews();
  const caseStudies = AUTOMATION_CASES.map((slug) => getPortfolioItem(slug, locale)).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );
  const webPage = webPageJsonLd({ name: copy.h1, description: copy.metaDescription, url: pageUrl, locale });
  const organization = {
    "@context": "https://schema.org",
    ...organizationJsonLd(locale),
  };

  return (
    <div className="page-shell min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Breadcrumbs locale={locale} items={[{ name: pageCopy.catalog, path: "/automation" }]} />
            <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
              <Reveal className="max-w-4xl">
                <span className="section-label">{pageCopy.catalog}</span>
                <h1 className="display-md mt-4">{copy.h1}</h1>
                <p className="mt-3 text-sm text-muted">
                  {isEn ? "Performer" : "Исполнитель"}:{" "}
                  <span className="font-medium text-ink">{PROFILE.name}</span>
                </p>
                <PerformerRating locale={locale} className="mt-3" />
                <p className="body-copy mt-5 max-w-3xl text-lg">{copy.subtitle}</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <ContactCta defaultService={pageCopy.catalog} goal="audit_cta_click">
                    {pageCopy.primaryCta}
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
                    defaultService={pageCopy.catalog}
                    goal="service_estimate_cta_click"
                  >
                    {pageCopy.secondaryCta}
                  </ContactCta>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <aside className="feature-card-bordered">
                  <p className="font-display text-2xl tracking-tight">{pageCopy.priceLabel}</p>
                  <p className="mt-2 text-sm text-muted">{pageCopy.timelineLabel}</p>
                  <p className="mt-3 text-sm text-muted">{pageCopy.priceNote}</p>
                  <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-soft">
                    <Image
                      src={hub.coverImage}
                      alt={copy.h1}
                      fill
                      className="object-cover"
                      sizes="360px"
                      priority
                    />
                  </div>
                  <ContactCta className="mt-6 w-full" defaultService={pageCopy.catalog} goal="audit_cta_click">
                    {pageCopy.primaryCta}
                  </ContactCta>
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              {copy.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="body-copy mt-4 text-base first:mt-0">
                  {paragraph}
                </p>
              ))}
              <p className="body-copy mt-4 text-base">{pageCopy.introText}</p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial grid gap-16 lg:grid-cols-2">
            <Reveal>
              <h2 className="section-title">{pageCopy.fitTitle}</h2>
              <ul className="mt-8 space-y-4">
                {pageCopy.fitItems.map((item) => (
                  <li key={item.title} className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>
                      <span className="font-medium text-ink">{item.title}</span>
                      <span className="mt-1 block text-muted">{item.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="section-title">{pageCopy.deliverablesTitle}</h2>
              <ul className="mt-8 space-y-4">
                {pageCopy.deliverables.map((item) => (
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
              <h2 className="section-title">{pageCopy.processTitle}</h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {pageCopy.process.map((step, index) => (
                  <article key={step.title} className="feature-card">
                    <span className="font-display text-3xl text-primary/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="card-title mt-3">{step.title}</h3>
                    <p className="body-copy mt-3 text-base">{step.text}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <h2 className="section-title">{pageCopy.architectureTitle}</h2>
              <ul className="mt-8 space-y-4">
                {pageCopy.architecture.map((item) => (
                  <li key={item} className="body-copy flex gap-4 text-base">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="body-copy mt-8 text-base">{pageCopy.stackText}</p>
              <p className="meta-label mt-4">{pageCopy.stack.join(" · ")}</p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">
                {isEn ? "Typical effect" : "Типичный эффект"}
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {pageCopy.stats.map((item) => (
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
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">{pageCopy.solutionsTitle}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{pageCopy.solutionsText}</p>
            </Reveal>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hub.children.map((child, index) => (
                <StaggerItem key={child.href}>
                  <Link href={child.href} className="feature-card group block h-full">
                    <span className="meta-label">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="card-title mt-3">
                      {loc === "en" ? child.labelEn : child.labelRu}
                    </h3>
                    <p className="body-copy mt-3 text-base">
                      {loc === "en" ? child.blurbEn : child.blurbRu}
                    </p>
                    <span className="link-more mt-4">{loc === "en" ? "Details" : "Подробнее"}</span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {caseStudies.length > 0 ? (
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial">
              <Reveal>
                <h2 className="section-title">{pageCopy.casesTitle}</h2>
                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  {caseStudies.map((item) => (
                    <CaseStudyCard key={item.slug} item={item} viewLabel={pageCopy.caseLink} />
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

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <h2 className="section-title">{pageCopy.relatedTitle}</h2>
              <Stagger className="mt-6">
                {pageCopy.related.map((item) => (
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
              <span className="section-label">{pageCopy.contactLabel}</span>
              <h2 className="section-title mt-4">{pageCopy.contactTitle}</h2>
              <p className="body-copy mt-4 max-w-xl text-base">{pageCopy.contactText}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm defaultService={pageCopy.catalog} />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function SeoHubPage({ hub, locale }: SeoHubPageProps) {
  if (hub.category === "automation") {
    return <AutomationHubPage hub={hub} locale={locale} />;
  }
  const loc = locale === "en" ? "en" : "ru";
  const copy = hub[loc];
  const prefix = locale === "en" ? "/en" : "";
  const pagePath = `${prefix}/${hub.category}`;
  const pageUrl = absoluteUrl(pagePath);

  const webPage = webPageJsonLd({
    name: copy.h1,
    description: copy.metaDescription,
    url: pageUrl,
    locale,
  });
  const organization = {
    "@context": "https://schema.org",
    ...organizationJsonLd(locale),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <SiteHeader />
      <main>
        <section className="section-band border-b border-hairline">
          <div className="container-editorial grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <Breadcrumbs
                locale={locale}
                items={[{ name: copy.h1, path: `/${hub.category}` }]}
              />
              <p className="eyebrow mt-2">{loc === "en" ? "Catalog" : "Каталог"}</p>
              <h1 className="mt-3 display-title text-balance">{copy.h1}</h1>
              <PerformerRating locale={locale} className="mt-4" />
              <p className="mt-4 max-w-2xl text-lg text-muted">{copy.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ContactCta defaultService={copy.h1}>
                  {loc === "en" ? "Get an estimate" : "Получить оценку"}
                </ContactCta>
              </div>
            </Reveal>
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-hairline bg-panel">
                <Image
                  src={hub.coverImage}
                  alt={copy.h1}
                  fill
                  className={hub.coverImage.endsWith(".svg") ? "object-contain p-4" : "object-cover"}
                  sizes="(max-width:1024px) 100vw, 40vw"
                  priority
                  unoptimized={hub.coverImage.endsWith(".svg")}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl space-y-4">
            {copy.intro.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial">
            <h2 className="font-display text-2xl">{loc === "en" ? "Browse solutions" : "Разделы"}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hub.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block border border-hairline bg-panel p-5 transition hover:border-ink/30"
                >
                  <h3 className="font-medium text-ink">{loc === "en" ? child.labelEn : child.labelRu}</h3>
                  <p className="mt-2 text-sm text-muted">{loc === "en" ? child.blurbEn : child.blurbRu}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band">
          <div className="container-editorial max-w-2xl">
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
