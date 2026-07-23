import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ContactCta } from "@/components/ContactCta";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { getPortfolioItem, PORTFOLIO_LISTING_SLUGS } from "@/lib/profile";
import type { HubDef } from "@/lib/seo-catalog/types";
import { webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type SeoHubPageProps = {
  hub: HubDef;
  locale: string;
};

const AUTOMATION_CASES = [...PORTFOLIO_LISTING_SLUGS];

const AUTOMATION_COPY = {
  ru: {
    catalog: "Автоматизация для бизнеса",
    primaryCta: "Обсудить автоматизацию",
    secondaryCta: "Смотреть кейсы",
    heroNote: "Аудит от 150 000 ₽ · внедрение от 400 000 ₽",
    introLabel: "С чего начинаем",
    introTitle: "Автоматизируем не отдел целиком, а конкретный процесс с понятной экономикой",
    introText:
      "Сначала фиксируем, сколько времени, ошибок и денег теряется сейчас. Затем проектируем один сквозной контур — от события в CRM, почте или форме до готового документа, задачи или ответа клиенту.",
    stats: [
      { value: "45 → 2 мин", label: "подготовка коммерческого предложения" },
      { value: "+32%", label: "конверсия из предложения в заказ" },
      { value: "−50%", label: "повторные обращения на первой линии" },
    ],
    solutionsLabel: "SEO-кластеры",
    solutionsTitle: "Восемь кластеров под отдельные поисковые фразы",
    solutionsText:
      "Pillar «Автоматизация бизнес-процессов» ведёт в кластеры: КП, документооборот, AI для Bitrix24 / amoCRM / 1С, корпоративный RAG, распознавание документов и AI для отдела продаж — без пересечения head-термов.",
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
    contactLabel: "Следующий шаг",
    contactTitle: "Разберём один процесс и оценим потенциал",
    contactText: "Опишите, что команда делает вручную, какие системы участвуют и сколько операций проходит за месяц. Вернёмся с уточняющими вопросами и форматом старта.",
  },
  en: {
    catalog: "Business automation",
    primaryCta: "Discuss automation",
    secondaryCta: "View case studies",
    heroNote: "Audit from €1,500 · implementation from €5,000",
    introLabel: "Where we start",
    introTitle: "We automate a measurable process, not an entire department at once",
    introText:
      "First we establish the current cost in time, errors and money. Then we design one end-to-end flow — from an event in CRM, email or a form to a finished document, task or customer response.",
    stats: [
      { value: "45 → 2 min", label: "to prepare a commercial proposal" },
      { value: "+32%", label: "quote-to-order conversion" },
      { value: "−50%", label: "repeat first-line requests" },
    ],
    solutionsLabel: "SEO clusters",
    solutionsTitle: "Eight clusters for distinct search phrases",
    solutionsText:
      "The “Business process automation” pillar links to clusters: proposals, documents, AI for Bitrix24 / amoCRM / 1C, corporate RAG, document recognition and AI for sales — without overlapping head terms.",
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
    contactLabel: "Next step",
    contactTitle: "Let’s assess one process and its potential",
    contactText: "Tell us what the team does manually, which systems are involved and the monthly operation volume. We will return with focused questions and a recommended starting format.",
  },
};

function AutomationHubPage({ hub, locale }: SeoHubPageProps) {
  const loc = locale === "en" ? "en" : "ru";
  const copy = hub[loc];
  const pageCopy = AUTOMATION_COPY[loc];
  const prefix = loc === "en" ? "/en" : "";
  const pageUrl = absoluteUrl(`${prefix}/automation`);
  const caseStudies = AUTOMATION_CASES.map(getPortfolioItem).filter(
    (item): item is NonNullable<typeof item> => Boolean(item),
  );
  const webPage = webPageJsonLd({ name: copy.h1, description: copy.metaDescription, url: pageUrl, locale });

  return (
    <div className="page-shell min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Breadcrumbs locale={locale} items={[{ name: pageCopy.catalog, path: "/automation" }]} />
            <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <Reveal>
                <span className="section-label">{pageCopy.catalog}</span>
                <h1 className="display-md mt-4 text-balance">{copy.h1}</h1>
                <p className="body-copy mt-5 max-w-2xl text-lg">{copy.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <ContactCta defaultService={pageCopy.catalog}>{pageCopy.primaryCta}</ContactCta>
                  <Link href="/portfolio" className="btn-secondary">{pageCopy.secondaryCta}</Link>
                </div>
                <p className="meta-label mt-6">{pageCopy.heroNote}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-soft">
                  <Image src={hub.coverImage} alt={copy.h1} fill className="object-cover" sizes="(max-width:1024px) 100vw, 40vw" priority />
                  <div className="absolute inset-x-4 bottom-4 border border-white/15 bg-black/75 p-4 text-white backdrop-blur-sm">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">workflow</p>
                    <p className="mt-2 text-sm">Trigger → rules → AI → CRM / ERP → monitoring</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <span className="section-label">{pageCopy.introLabel}</span>
              <h2 className="section-title mt-4">{pageCopy.introTitle}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="body-copy text-lg">{pageCopy.introText}</p>
              <div className="mt-8 grid grid-cols-1 border-y border-hairline sm:grid-cols-3">
                {pageCopy.stats.map((stat) => (
                  <div key={stat.label} className="px-0 py-6 sm:border-l sm:px-5 sm:first:border-l-0">
                    <p className="font-display text-3xl tracking-tight text-accent">{stat.value}</p>
                    <p className="body-copy mt-2 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{pageCopy.solutionsLabel}</span>
              <h2 className="section-title mt-4">{pageCopy.solutionsTitle}</h2>
              <p className="body-copy mt-4 max-w-2xl text-base">{pageCopy.solutionsText}</p>
            </Reveal>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hub.children.map((child, index) => (
                <StaggerItem key={child.href}>
                  <Link href={child.href} className="feature-card-bordered group block h-full">
                    <span className="meta-label">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="card-title mt-5 text-2xl">{loc === "en" ? child.labelEn : child.labelRu}</h3>
                    <p className="body-copy mt-3 text-base">{loc === "en" ? child.blurbEn : child.blurbRu}</p>
                    <span className="link-more mt-6">{loc === "en" ? "Explore" : "Подробнее"}</span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{pageCopy.fitLabel}</span>
              <h2 className="section-title mt-4">{pageCopy.fitTitle}</h2>
            </Reveal>
            <div className="mt-10 grid gap-x-10 lg:grid-cols-2">
              {pageCopy.fitItems.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.04}>
                  <article className="editorial-row">
                    <span className="editorial-row__index">{String(index + 1).padStart(2, "0")}</span>
                    <div><h3 className="card-title text-xl">{item.title}</h3><p className="body-copy mt-3 text-base">{item.text}</p></div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{pageCopy.processLabel}</span>
              <h2 className="section-title mt-4">{pageCopy.processTitle}</h2>
            </Reveal>
            <div className="mt-10">
              {pageCopy.process.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.04}>
                  <article className="process-row">
                    <span className="editorial-row__index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="grid gap-3 md:grid-cols-[0.7fr_1.3fr]"><h3 className="card-title text-xl">{step.title}</h3><p className="body-copy text-base">{step.text}</p></div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <span className="section-label">{pageCopy.stackLabel}</span>
              <h2 className="section-title mt-4">{pageCopy.stackTitle}</h2>
              <p className="body-copy mt-4 text-base">{pageCopy.stackText}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid grid-cols-2 border-l border-t border-hairline sm:grid-cols-4">
                {pageCopy.stack.map((name) => (
                  <div key={name} className="flex min-h-24 items-center justify-center border-b border-r border-hairline p-4 text-center font-display text-lg">{name}</div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{pageCopy.casesLabel}</span>
              <h2 className="section-title mt-4">{pageCopy.casesTitle}</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {caseStudies.map((item) => <CaseStudyCard key={item.slug} item={item} viewLabel={pageCopy.caseLink} />)}
            </div>
          </div>
        </section>

        <section id="contact" className="section-band section--panel scroll-mt-16">
          <div className="container-editorial grid gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="section-label">{pageCopy.contactLabel}</span>
              <h2 className="section-title mt-4">{pageCopy.contactTitle}</h2>
              <p className="body-copy mt-4 max-w-xl text-base">{pageCopy.contactText}</p>
            </Reveal>
            <Reveal delay={0.08}><ContactForm defaultService={pageCopy.catalog} /></Reveal>
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
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
              <p className="mt-4 max-w-2xl text-lg text-muted">{copy.subtitle}</p>
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
