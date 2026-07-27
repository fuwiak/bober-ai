import type { Metadata } from "next";
import Image from "next/image";
import { BareIntlShell } from "@/components/BareIntlShell";
import { ContactForm } from "@/components/ContactForm";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import {
  BITRIX_CASE_KWORK,
  BITRIX_LANDING_KEYWORDS,
  BITRIX_LAYER_POSITIONING,
  BITRIX_MCP,
  BITRIX_PACKAGES,
  BITRIX_PARTNER_PROGRAM,
  BITRIX_SALES_LOOP,
  BITRIX_SERVICES_SUMMARY,
  BITRIX_WORDSTAT_SERVICES,
} from "@/lib/bitrix-landing";
import { LEGAL_ENTITY, LEGAL_ROUTES, formatLegalRequisitesLine } from "@/lib/legal";
import { webPageJsonLd } from "@/lib/seo";
import {
  BITRIX_SITE_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  OFFICE_STOCK_IMAGES,
  PORTFOLIO_IMAGES,
  SITE_URL,
  STOCK_IMAGES,
  TELEGRAM_URL,
  WHATSAPP_URL,
} from "@/lib/site";

/**
 * Served at bitrix.bober-ai.dev (see deploy/Caddyfile[.railway]) —
 * Bitrix24 implementation + custom AI for sales, analytics, automation.
 */
const LANDING_URL = `${BITRIX_SITE_URL.replace(/\/$/, "")}/`;
const LANDING_NAME = "Bober AI Systems — Битрикс24";
const PRIVACY_URL = `${SITE_URL.replace(/\/$/, "")}${LEGAL_ROUTES.privacyPolicy}`;
const TERMS_URL = `${SITE_URL.replace(/\/$/, "")}${LEGAL_ROUTES.terms}`;

export const metadata: Metadata = {
  title: "Настройка Bitrix24 — автоматизация документов, AI и интеграция с 1С",
  description:
    "Настройка Bitrix24, автоматизация документов, автоматизация Bitrix24, интеграция Bitrix24 с 1С, Bitrix24 AI, генерация коммерческого предложения, внедрение AI-ассистента, разработка RAG-систем. Москва и удалённо.",
  keywords: [...BITRIX_LANDING_KEYWORDS],
  alternates: { canonical: LANDING_URL },
  robots: { index: true, follow: true },
  verification: { yandex: "b5643e127be991c8" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: LANDING_URL,
    siteName: LANDING_NAME,
    title: "Настройка Bitrix24 — автоматизация документов и AI",
    description:
      "Настройка Bitrix24, автоматизация документов, Bitrix24 AI, интеграция Bitrix24 с 1С, телефония, КП и RAG. От 18 000 ₽.",
    images: [{ url: "/stock/office-tower.jpg", width: 1200, height: 630 }],
  },
};

const SYSTEMS_STRIP = ["Битрикс24", "1С", "МойСклад", "Диадок", "Телефония"];

const BUSINESS_PAINS = [
  "Менеджеры не заполняют карточки — руководитель смотрит на пустые поля",
  "Отчёты собираются вручную из CRM, Excel и 1С",
  "Лиды остаются без follow-up, пока менеджер занят другим клиентом",
  "Цены и остатки копируются из 1С в КП вручную",
  "Звонки и переписка не анализируются — только прослушиваются выборочно",
  "Документы теряются между почтой, диском и CRM",
];

const IMPLEMENTATION_SCENARIOS = [
  {
    title: "Анализ воронки и контроль сделок",
    problem: "Руководитель не видит, на каком этапе ломается конверсия, пока не соберёт отчёт сам.",
    outcome:
      "AI собирает сделки, задачи, комментарии и звонки, показывает проблемные этапы и готовит задачи менеджерам.",
    systems: "Битрикс24 · телефония · задачи · права доступа",
  },
  {
    title: "Автозаполнение CRM и задачи",
    problem: "После звонка или письма карточка остаётся пустой — данные живут в головах и чатах.",
    outcome:
      "Система заполняет поля, фиксирует следующий шаг и ставит задачу ответственному без ручного копипаста.",
    systems: "Битрикс24 · почта · мессенджеры · REST API",
  },
  {
    title: "Скоринг и follow-up лидов",
    problem: "Горячие и холодные лиды идут в одну очередь — часть сделок остывает без касания.",
    outcome:
      "AI оценивает вероятность сделки, предлагает следующий лучший шаг и поднимает просроченные follow-up.",
    systems: "Битрикс24 · amoCRM · история коммуникаций",
  },
  {
    title: "КП и документы через REST",
    problem: "Менеджер вручную сверяет каталог, цены, остатки и собирает DOCX между CRM и 1С.",
    outcome:
      "Запрос распознаётся, цены и остатки подтягиваются из учёта, документ прикрепляется к сделке — человек подтверждает отправку.",
    systems: "Битрикс24 · 1С · МойСклад · OCR · DOCX/PDF",
  },
];

type CaseStudy = {
  label: string;
  title: string;
  lead: string;
  steps: string[];
  result: string;
  systems: string;
  metric?: string;
  metricNote?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
};

const CASES: CaseStudy[] = [
  {
    label: BITRIX_CASE_KWORK.label,
    title: BITRIX_CASE_KWORK.title,
    lead: BITRIX_CASE_KWORK.lead,
    steps: [...BITRIX_CASE_KWORK.steps],
    result: BITRIX_CASE_KWORK.result,
    systems: BITRIX_CASE_KWORK.systems,
    metric: BITRIX_CASE_KWORK.metric,
    metricNote: BITRIX_CASE_KWORK.metricNote,
    image: BITRIX_CASE_KWORK.image,
    imageAlt: BITRIX_CASE_KWORK.imageAlt,
    imageCaption: BITRIX_CASE_KWORK.imageCaption,
  },
  {
    label: "Кейс · AI-чат владельца",
    title: "«Почему упала конверсия отдела продаж за неделю?»",
    lead: "Владелец задаёт вопрос в чат — система отвечает по фактическим данным CRM, а не по ощущениям менеджеров.",
    steps: [
      "Собирает сделки, задачи, комментарии и статусы за период",
      "Подтягивает звонки и саммари разговоров",
      "Сверяет план/факт по этапам воронки",
      "Выделяет проблемные этапы, менеджеров и причины просадок",
      "Формирует вывод и список действий — без ручной сборки Excel",
    ],
    result:
      "Руководитель получает причины и точки вмешательства за минуты, а не после еженедельного совещания с отчётами.",
    systems: "Битрикс24 · задачи · телефония · права доступа",
  },
  {
    label: "Кейс · Авто-КП · OfferKP",
    title: "PDF клиента → цены и остатки → готовое КП в CRM",
    lead: "Реализованный контур генерации коммерческих предложений: типовое КП за 2–5 минут вместо ~45.",
    steps: [
      "Распознаёт позиции из PDF или Excel",
      "Сверяет артикулы, цены и остатки с каталогом / 1С / МойСклад",
      "Отмечает точное совпадение, аналог или отсутствие позиции",
      "Собирает DOCX/PDF с НДС, условиями и тарифами",
      "Записывает документ в сделку Битрикс24",
    ],
    result:
      "Цены и SKU только из каталога — модель не выдумывает позиции. Менеджер проверяет готовый документ, а не собирает его с нуля.",
    systems: "Битрикс24 · 1С / МойСклад · MySQL · OCR · DOCX/PDF",
    metric: "45 мин → 2–5 мин на типовое КП",
    metricNote: "По данным пилотного процесса заказчика",
    image: PORTFOLIO_IMAGES.kpLlm,
  },
  {
    label: "Кейс · Kinetic AI · цветы",
    title: "МойСклад + история продаж → рекомендации для роста повторных покупок",
    lead: "Не чат-бот «для галочки», а рабочий контур сегментации и повторных продаж на данных заказов.",
    steps: [
      "Синхронизирует клиентов и заказы из МойСклад и каналов продаж",
      "Строит историю покупок, средний чек и давность последнего заказа",
      "Сегментирует постоянных, корпоративных и премиальных клиентов",
      "Готовит группы для маркетинга и рекомендации менеджеру",
      "Может встраиваться в Битрикс24 как основной рабочий интерфейс",
    ],
    result:
      "Менеджер видит, кому и с каким поводом писать дальше — вместо разрозненного списка заказчиков без контекста.",
    systems: "kinetic-ai.ru · МойСклад · AI-сегментация · Telegram · WhatsApp · маркетплейсы",
  },
];

const HOW_IT_WORKS = [
  {
    title: "Облако или коробочная версия",
    text: "Работаем с Битрикс24 в облаке и on-premise. Точка входа — REST API, вебхуки и права приложения.",
  },
  {
    title: "Где живут данные",
    text: "CRM, 1С, МойСклад, телефония и документы остаются в ваших системах. AI-слой читает только согласованные источники.",
  },
  {
    title: "Права приложения",
    text: "Минимально необходимые scopes: сделки, контакты, задачи, диск, комментарии — без «доступа ко всему порталу».",
  },
  {
    title: "Модели и контур",
    text: "Модели могут работать в Yandex Cloud, Selectel или локально. NDA и свой контур — стандарт для B2B.",
  },
  {
    title: "Подтверждение человеком",
    text: "Критичные действия — отправка КП, проведение документа, массовые сообщения — только после одобрения сотрудника.",
  },
  {
    title: "Журналы и передача",
    text: "Логи действий, критерии приёмки, код и документация передаются вашей команде — без вендор-лока.",
  },
];

const PILOT_POINTS = [
  "Срок: 2–4 недели",
  "Бюджет: от 300 000 ₽",
  "Объём: 1 процесс, 1 CRM, до 2 интеграций",
  "Результат: рабочий сценарий, документация и расчёт эффекта",
];

const COLLAB_STEPS = [
  { title: "Разбираем процесс", text: "Где теряется время, какие системы в контуре, что считать успехом пилота." },
  { title: "Фиксируем границы", text: "Сценарий, интеграции, смета и критерии приёмки — до старта разработки." },
  { title: "Запускаем пилот", text: "Проверяем на реальных сделках и исключениях, измеряем эффект." },
  { title: "Масштабируем", text: "Промышленное внедрение от 500 000 ₽ — расширения, мониторинг, передача команде." },
];

const PARTNER_CHECKLIST = [
  {
    title: "Партнёр 1С-Битрикс",
    text: `${BITRIX_PARTNER_PROGRAM.line}. Внедряем портал и AI-слой как участник официальной партнёрской программы.`,
  },
  {
    title: "Своя CRM на Битрикс24",
    text: "Внутренние продажи и проекты ведём в Битрикс24 — внедряем то, чем пользуемся сами в повседневной работе.",
  },
  {
    title: "Пакеты внедрения",
    text: "Шесть пакетов Битрикс24 + AI: внедрение, AI-автоматизация, AI-аналитика, интеграции, MCP для BitrixGPT и локальный LLM.",
  },
  {
    title: "Лицензии и основная ценность",
    text: "Можем помочь с процессом покупки лицензий Битрикс24. Основная ценность — внедрение, AI-автоматизация и сопровождение по подписке, а не перепродажа «коробки».",
  },
];

export default function BitrixLandingPage() {
  const webPage = webPageJsonLd({
    name: "Внедрение Битрикс24 с AI — автоматизация и аналитика под ключ",
    description:
      "Внедрение Битрикс24 с AI, AI-автоматизация и AI-аналитика Битрикс24, интеграция Битрикс24 и AI для продаж, Битрикс24 + локальный LLM. Пилот от 300 000 ₽.",
    url: LANDING_URL,
    locale: "ru",
  });

  return (
    <BareIntlShell>
      <div className="page-shell min-h-screen">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />

        <header className="border-b border-hairline">
          <div className="container-editorial flex items-center justify-between py-6">
            <div>
              <span className="font-display text-lg tracking-tight text-ink">Bober AI Systems</span>
              <span className="meta-label ml-3 text-muted">Битрикс24</span>
            </div>
            <TrackedAnchor
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              goal="bitrix_telegram_click"
            >
              Telegram
            </TrackedAnchor>
          </div>
        </header>

        <main>
          {/* 1. Hero */}
          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <p className="hero-label">Bober AI Systems · Битрикс24</p>
                <h1 className="section-title mt-6 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]">
                  Настройка Bitrix24 — автоматизация документов и AI
                </h1>
                <p className="body-copy mt-5 max-w-2xl text-lg">
                  {BITRIX_LAYER_POSITIONING.headline}: 1С, телефония, документы, КП и собственная бизнес-логика.
                </p>
                <p className="mt-4 max-w-2xl font-display text-base text-muted">
                  Не конкурируем с BitrixGPT — продаём слой внедрения поверх него.{" "}
                  {BITRIX_PARTNER_PROGRAM.line}.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <TrackedAnchor href="#contact" className="btn-primary" goal="bitrix_cta_click">
                    Получить оценку внедрения
                  </TrackedAnchor>
                  <TrackedAnchor href="#packages" className="btn-secondary" goal="bitrix_packages_click">
                    Смотреть пакеты
                  </TrackedAnchor>
                </div>
                <p className="meta-label mt-6 text-muted">
                  Пилот от 300 000 ₽ · 2–4 недели · облако или коробочная версия · партнёр 1С-Битрикс ID{" "}
                  {BITRIX_PARTNER_PROGRAM.id}
                </p>
              </Reveal>

              <Reveal delay={0.12} className="landing-hero-media">
                <EditorialImageFrame variant="hero" className="absolute inset-0">
                  <Image
                    src={OFFICE_STOCK_IMAGES.interior}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 960px"
                    className="object-cover"
                  />
                </EditorialImageFrame>
              </Reveal>
            </div>
          </section>

          {/* 2. Systems strip */}
          <section className="section-band section--deep border-b border-hairline" aria-label="Системы">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <p className="meta-label text-muted">Работаем с контуром, который уже есть</p>
                <div className="bitrix-systems-strip mt-5" role="list">
                  {SYSTEMS_STRIP.map((name) => (
                    <span key={name} className="bitrix-systems-strip__item" role="listitem">
                      {name}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* 3. Business problems */}
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Боли</span>
                <h2 className="section-title mt-4 max-w-2xl">Что сейчас происходит без автоматизации</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Битрикс24 установлен, но процессы живут вокруг него — в Excel, почте, 1С и головах менеджеров.
                </p>
              </Reveal>
              <ul className="mt-8 max-w-3xl space-y-3">
                {BUSINESS_PAINS.map((item) => (
                  <Reveal key={item} delay={0.04}>
                    <li className="body-copy flex gap-4 text-base">
                      <span className="meta-label shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>

          {/* 4. Implementation scenarios */}
          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Сценарии внедрения</span>
                <h2 className="section-title mt-4 max-w-2xl">Четыре готовых бизнес-сценария</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Не список фич, а процессы, которые можно запустить в пилоте на вашей CRM.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {IMPLEMENTATION_SCENARIOS.map((item) => (
                  <div key={item.title} className="border border-hairline bg-surface-card p-6">
                    <h3 className="card-title text-lg">{item.title}</h3>
                    <p className="body-copy mt-3 text-sm text-muted">{item.problem}</p>
                    <p className="body-copy mt-4 text-sm text-body-strong">{item.outcome}</p>
                    <p className="meta-label mt-4 text-muted-soft">{item.systems}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4.1. Layer above BitrixGPT */}
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Позиционирование</span>
                <h2 className="section-title mt-4 max-w-3xl">{BITRIX_LAYER_POSITIONING.headline}</h2>
                <p className="body-copy mt-4 max-w-2xl">{BITRIX_LAYER_POSITIONING.lead}</p>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="border border-hairline bg-surface-card p-6">
                  <h3 className="font-display text-base text-ink">Что закрывает нативный агент CRM</h3>
                  <ul className="mt-4 space-y-3">
                    {BITRIX_LAYER_POSITIONING.nativeLimits.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-hairline bg-surface-card p-6">
                  <h3 className="font-display text-base text-ink">Где ценность Bober AI</h3>
                  <ul className="mt-4 space-y-3">
                    {BITRIX_LAYER_POSITIONING.ourLayer.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-body">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 4.2. AI sales loop — strong product example */}
          <section id="sales-loop" className="section-band scroll-mt-16 border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Сильный пример</span>
                <h2 className="section-title mt-4 max-w-2xl">{BITRIX_SALES_LOOP.title}</h2>
                <p className="body-copy mt-4 max-w-2xl">{BITRIX_SALES_LOOP.lead}</p>
              </Reveal>
              <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {BITRIX_SALES_LOOP.steps.map((step, index) => (
                  <li key={step} className="border border-hairline bg-surface-card p-5">
                    <span className="meta-label text-muted-soft">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-2 font-display text-base text-ink">{step}</p>
                  </li>
                ))}
              </ol>
              <ul className="mt-8 flex flex-wrap gap-2">
                {BITRIX_SALES_LOOP.scenarios.map((item) => (
                  <li
                    key={item}
                    className="border border-hairline bg-surface-card px-3 py-2 text-sm text-body"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="body-copy mt-6 max-w-2xl text-sm text-body-strong">{BITRIX_SALES_LOOP.why}</p>
              <div className="mt-8">
                <TrackedAnchor href="#contact" className="btn-primary" goal="bitrix_cta_click">
                  Получить карту AI-автоматизации отдела продаж
                </TrackedAnchor>
              </div>
            </div>
          </section>

          {/* 4.3. MCP Hub + external AI */}
          <section id="mcp-hub" className="section-band section--panel scroll-mt-16 border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">MCP</span>
                <h2 className="section-title mt-4 max-w-3xl">{BITRIX_MCP.title}</h2>
                <p className="body-copy mt-4 max-w-2xl">{BITRIX_MCP.lead}</p>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="border border-hairline bg-surface-card p-6">
                  <h3 className="card-title text-lg">{BITRIX_MCP.inbound.title}</h3>
                  <p className="body-copy mt-3 text-sm">{BITRIX_MCP.inbound.text}</p>
                  <ul className="mt-4 space-y-2">
                    {BITRIX_MCP.inbound.points.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-body">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-hairline bg-surface-card p-6">
                  <h3 className="card-title text-lg">{BITRIX_MCP.outbound.title}</h3>
                  <p className="body-copy mt-3 text-sm">{BITRIX_MCP.outbound.text}</p>
                  <ul className="mt-4 space-y-2">
                    {BITRIX_MCP.outbound.points.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-body">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="body-copy mt-6 max-w-2xl text-sm text-body-strong">{BITRIX_MCP.offer}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedAnchor href="#contact" className="btn-primary" goal="bitrix_cta_click">
                  Оценить внедрение MCP
                </TrackedAnchor>
                <TrackedAnchor href="#mcp" className="btn-secondary" goal="bitrix_packages_click">
                  Смотреть пакет MCP
                </TrackedAnchor>
              </div>
            </div>
          </section>

          {/* 4.4. Wordstat services — exact query titles */}
          <section id="uslugi-wordstat" className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Услуги · Яндекс</span>
                <h2 className="section-title mt-4 max-w-2xl">Услуги по поисковым запросам</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Точные названия, как в Wordstat и кабинете Яндекс Услуг — так вас находят по этим фразам.
                </p>
              </Reveal>
              <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
                {BITRIX_WORDSTAT_SERVICES.map((item) => (
                  <li
                    key={item.id}
                    id={item.slug}
                    className="scroll-mt-20 py-5 sm:flex sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <div className="min-w-0">
                      <h3 className="font-display text-lg text-body-strong">{item.title}</h3>
                      <p className="body-copy mt-2 text-sm">{item.description}</p>
                    </div>
                    <p className="meta-label mt-3 shrink-0 text-muted sm:mt-0">{item.priceLabel}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                <TrackedAnchor href="#contact" className="btn-secondary" goal="bitrix_wordstat_cta">
                  Запросить оценку по услуге
                </TrackedAnchor>
              </p>
            </div>
          </section>

          {/* 4.5. Packages */}
          <section id="packages" className="section-band scroll-mt-16 border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Пакеты внедрения</span>
                <h2 className="section-title mt-4 max-w-2xl">Пакеты под ключ — Битрикс24 + AI</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Можно взять один пакет или всю цепочку. Цены — за внедрение и разработку; процент от лицензий
                  Битрикс24 не указываем.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {BITRIX_PACKAGES.map((item) => (
                  <div
                    key={item.id}
                    id={item.slug}
                    className="scroll-mt-20 border border-hairline bg-surface-card p-6"
                  >
                    <h3 className="card-title text-lg">{item.title}</h3>
                    <p className="meta-label mt-2 text-muted">{item.keywords.join(" · ")}</p>
                    <p className="body-copy mt-3 text-sm">{item.description}</p>
                    <p className="body-copy mt-3 text-sm text-body-strong">
                      <span className="meta-label text-muted">Клиент получает: </span>
                      {item.gets}
                    </p>
                    <p className="meta-label mt-4 text-muted">{item.priceLabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4.6. Partner checklist */}
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Подход</span>
                <h2 className="section-title mt-4 max-w-2xl">Как закрываем внедрение Битрикс24</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  {BITRIX_PARTNER_PROGRAM.line}. Короткие ориентиры для заказчика — без выдуманных сертификатов и
                  значков.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {PARTNER_CHECKLIST.map((item) => (
                  <div key={item.title} className="border border-hairline bg-surface-card p-5">
                    <h3 className="font-display text-base text-ink">{item.title}</h3>
                    <p className="body-copy mt-2 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Case studies */}
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Кейсы</span>
                <h2 className="section-title mt-4 max-w-2xl">Как это выглядит на реальных процессах</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Живые сценарии: кастомная воронка Kwork → Bitrix24, чат владельца по CRM, авто-КП и повторные
                  продажи на данных склада.
                </p>
              </Reveal>

              <div className="mt-10 space-y-8">
                {CASES.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.04}>
                    <article className="border border-hairline bg-canvas p-6 md:p-8">
                      <span className="meta-label text-accent">{item.label}</span>
                      <h3 className="card-title mt-3 text-xl md:text-2xl">{item.title}</h3>
                      <p className="body-copy mt-3 max-w-2xl text-sm md:text-base">{item.lead}</p>

                      {item.metric ? (
                        <p className="mt-4 font-display text-lg text-ink">
                          {item.metric}
                          {item.metricNote ? (
                            <span className="ml-2 text-sm font-normal text-muted">· {item.metricNote}</span>
                          ) : null}
                        </p>
                      ) : null}

                      {item.image ? (
                        <figure className="mt-6 max-w-xl">
                          <div className="relative aspect-[16/9] overflow-hidden border border-hairline">
                            <Image
                              src={item.image}
                              alt={item.imageAlt ?? item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 560px"
                              className="object-cover object-top"
                            />
                          </div>
                          {item.imageCaption ? (
                            <figcaption className="mt-3 text-sm text-muted">{item.imageCaption}</figcaption>
                          ) : null}
                        </figure>
                      ) : null}

                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {item.steps.map((step) => (
                          <li key={step} className="flex items-start gap-3 text-sm text-body">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {step}
                          </li>
                        ))}
                      </ul>

                      <p className="body-copy mt-6 border-t border-hairline pt-5 text-sm text-body-strong">
                        {item.result}
                      </p>
                      <p className="mt-3 text-sm text-muted">{item.systems}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 6. How it works + architecture & security */}
          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <div className="grid items-end gap-8 md:grid-cols-[1.1fr_0.9fr]">
                <Reveal>
                  <span className="section-label">Архитектура и безопасность</span>
                  <h2 className="section-title mt-4 max-w-2xl">Как устроена интеграция</h2>
                  <p className="body-copy mt-4 max-w-2xl">
                    AI — слой над вашим контуром, а не доступ «ко всему порталу». Данные остаются в CRM, 1С и
                    вашем облаке.
                  </p>
                </Reveal>
                <Reveal delay={0.08} className="landing-split-media">
                  <EditorialImageFrame variant="card" className="absolute inset-0">
                    <Image
                      src={STOCK_IMAGES.security}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </EditorialImageFrame>
                </Reveal>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {HOW_IT_WORKS.map((item) => (
                  <div key={item.title} className="border border-hairline bg-surface-card p-5">
                    <h3 className="font-display text-base text-ink">{item.title}</h3>
                    <p className="body-copy mt-2 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Pilot */}
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Пилот</span>
                <h2 className="section-title mt-4 max-w-2xl">Пилот за 2–4 недели</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Один процесс в вашей CRM — с измеримым эффектом до промышленного масштабирования.
                </p>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {PILOT_POINTS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="body-copy mt-6 text-sm text-muted">
                Промышленное внедрение — от 500 000 ₽. Аудит процессов — от 150 000 ₽, если нужна карта до пилота.
              </p>
              <div className="mt-8">
                <TrackedAnchor href="#contact" className="btn-primary" goal="bitrix_cta_click">
                  Получить оценку внедрения
                </TrackedAnchor>
              </div>
            </div>
          </section>

          {/* 8. Collaboration */}
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Сотрудничество</span>
                <h2 className="section-title mt-4 max-w-2xl">Как работаем</h2>
              </Reveal>
              <ol className="mt-8 grid gap-5 sm:grid-cols-2">
                {COLLAB_STEPS.map((step, index) => (
                  <li key={step.title} className="border border-hairline bg-surface-card p-5">
                    <span className="meta-label text-muted-soft">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="card-title mt-2 text-lg">{step.title}</h3>
                    <p className="body-copy mt-2 text-sm">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 8.5. Legal / trust */}
          <section id="legal" className="section-band scroll-mt-16 border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Исполнитель</span>
                <h2 className="section-title mt-4 max-w-2xl">Реквизиты и контакты</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Публичные данные исполнителя — те же, что в договоре и политике конфиденциальности.
                </p>
              </Reveal>
              <div className="mt-8 border border-hairline bg-surface-card p-6 md:p-8">
                <dl className="grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="meta-label text-muted">Исполнитель</dt>
                    <dd className="mt-1 text-body-strong">{LEGAL_ENTITY.name}</dd>
                  </div>
                  <div>
                    <dt className="meta-label text-muted">Реквизиты</dt>
                    <dd className="mt-1 text-body">{formatLegalRequisitesLine()}</dd>
                  </div>
                  <div>
                    <dt className="meta-label text-muted">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${LEGAL_ENTITY.email}`} className="text-body-strong hover:text-ink">
                        {LEGAL_ENTITY.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="meta-label text-muted">Телефон</dt>
                    <dd className="mt-1">
                      <a href={`tel:${LEGAL_ENTITY.phone}`} className="text-body-strong hover:text-ink">
                        {LEGAL_ENTITY.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="meta-label text-muted">Адрес</dt>
                    <dd className="mt-1 text-body">{LEGAL_ENTITY.address}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="meta-label text-muted">Партнёрская программа</dt>
                    <dd className="mt-1 text-body-strong">{BITRIX_PARTNER_PROGRAM.line}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="meta-label text-muted">Услуги</dt>
                    <dd className="mt-1 text-body">{BITRIX_SERVICES_SUMMARY}</dd>
                  </div>
                </dl>
                <p className="mt-6 border-t border-hairline pt-5 text-sm text-muted">
                  <a href={PRIVACY_URL} className="text-body-strong hover:text-ink">
                    Политика конфиденциальности
                  </a>
                  <span className="mx-2 text-muted-soft">·</span>
                  <a href={TERMS_URL} className="text-body-strong hover:text-ink">
                    Условия оказания услуг
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* 9. Form */}
          <section id="contact" className="section-band scroll-mt-16 pb-24 md:pb-16">
            <div className="container-editorial max-w-2xl">
              <Reveal>
                <div className="text-center">
                  <span className="section-label">Контакт</span>
                  <h2 className="section-title mt-4">Получите оценку внедрения Битрикс24</h2>
                  <p className="body-copy mt-4">
                    Опишите CRM, 1С / МойСклад и процесс, который хотите закрыть первым. Вернёмся с архитектурой
                    и оценкой — обычно в течение суток.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <TrackedAnchor
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                      goal="bitrix_telegram_click"
                    >
                      Telegram
                    </TrackedAnchor>
                    <TrackedAnchor
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                      goal="bitrix_whatsapp_click"
                    >
                      WhatsApp
                    </TrackedAnchor>
                    <TrackedAnchor href={`mailto:${CONTACT_EMAIL}`} className="btn-secondary" goal="bitrix_email_click">
                      Email
                    </TrackedAnchor>
                    <TrackedAnchor href={`tel:${CONTACT_PHONE}`} className="btn-secondary" goal="bitrix_phone_click">
                      {CONTACT_PHONE}
                    </TrackedAnchor>
                  </div>
                </div>
                <div className="mt-10 text-left">
                  <ContactForm defaultService="Битрикс24 / внедрение и AI" trackingPrefix="bitrix" />
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="border-t border-hairline py-10">
          <div className="container-editorial text-sm text-muted-soft">
            <p>
              <span className="text-muted">{LEGAL_ENTITY.name}</span> · {formatLegalRequisitesLine()}
            </p>
            <p className="mt-2">{LEGAL_ENTITY.address}</p>
            <p className="mt-2 text-muted">{BITRIX_PARTNER_PROGRAM.line}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <span>© {new Date().getFullYear()} Bober AI Systems</span>
              <div className="flex flex-wrap gap-4">
                <a href={TERMS_URL} className="text-muted-soft hover:text-muted">
                  Условия
                </a>
                <a href={PRIVACY_URL} className="text-muted-soft hover:text-muted">
                  Политика конфиденциальности
                </a>
                <a href={`mailto:${LEGAL_ENTITY.email}`} className="text-muted-soft hover:text-muted">
                  {LEGAL_ENTITY.email}
                </a>
                <a href="https://www.bober-ai.dev" className="text-muted-soft hover:text-muted">
                  bober-ai.dev
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BareIntlShell>
  );
}
