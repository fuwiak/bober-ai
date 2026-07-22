import type { Metadata } from "next";
import Image from "next/image";
import { BareIntlShell } from "@/components/BareIntlShell";
import { ContactForm } from "@/components/ContactForm";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import { webPageJsonLd } from "@/lib/seo";
import { OFFICE_STOCK_IMAGES, PARTNERS_SITE_URL, STOCK_IMAGES, TELEGRAM_URL } from "@/lib/site";
import { TRUST_PARTNERS } from "@/lib/trust-partners";

/**
 * Served at partners.bober-ai.dev (see deploy/Caddyfile[.railway]) — a separate
 * white-label / subcontracting offer for agencies, not linked from the main nav.
 */
const PARTNERS_URL = `${PARTNERS_SITE_URL.replace(/\/$/, "")}/`;
const PARTNERS_NAME = "Bober AI Systems — Partner Program";

/** Cloud / tech partners with public program pages — no invented badges. */
const CLOUD_PARTNERS = TRUST_PARTNERS.filter((p) => Boolean(p.href));

export const metadata: Metadata = {
  title: "AI-разработка в ваши услуги без найма команды — Partner Program",
  description:
    "White-label AI-разработка для агентств, software house и интеграторов: закрываем архитектуру, backend, LLM и deployment под вашим брендом. Вы сохраняете клиента, управление и маржу.",
  keywords: [
    "white label ai разработка",
    "субподряд ai разработка",
    "партнёрская программа для агентств",
    "аутсорс ai для software house",
    "технический партнёр ии",
  ],
  alternates: { canonical: PARTNERS_URL },
  robots: { index: true, follow: true },
  verification: { yandex: "b5643e127be991c8" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: PARTNERS_URL,
    siteName: PARTNERS_NAME,
    title: "AI-разработка в ваши услуги без найма команды",
    description:
      "Закрываем архитектуру, backend, LLM, интеграции и deployment под вашим брендом. Вы сохраняете клиента, управление проектом и свою маржу.",
    images: [{ url: "/stock/office-tower.jpg", width: 1200, height: 630 }],
  },
};

const AUDIENCE = [
  "Digital-агентства",
  "Software house",
  "Интеграторы Bitrix24 и 1С",
  "Консалтинговые компании",
  "Фрилансеры с крупными проектами",
  "Зарубежные агентства без своей AI-команды",
];

const CLIENT_OFFERS = [
  {
    title: "AI-аналитика для Битрикс24",
    text: "Вопросы о продажах, задачах и звонках на естественном языке — внутри CRM клиента.",
  },
  {
    title: "Автоматизация КП и документов",
    text: "OCR, договоры, счета, спецификации и генерация коммерческих предложений из каталога.",
  },
  {
    title: "AI-оператор первой линии",
    text: "Квалификация обращений, ответы по базе знаний, эскалация сложных кейсов менеджеру.",
  },
  {
    title: "Анализ звонков и контроль менеджеров",
    text: "Транскрипция, scoring диалогов, соблюдение скрипта и сигналы для руководителя.",
  },
  {
    title: "Корпоративная база знаний",
    text: "RAG по регламентам и внутренним документам со ссылками на источники.",
  },
  {
    title: "Интеграция CRM с 1С и МойСклад",
    text: "Синхронизация заказов, остатков, клиентов и документов между контурами учёта.",
  },
  {
    title: "Реактивация старых лидов",
    text: "Voice- и messaging-сценарии возврата в воронку с записью результата в CRM.",
  },
  {
    title: "Локальный AI в защищённом контуре",
    text: "On-premise или выделенный контур клиента — без передачи данных во внешние сервисы без согласия.",
  },
];

const ECONOMICS_HEADERS = ["Модель", "Контакт с клиентом", "Оффер", "Delivery", "Биллинг"];

const ECONOMICS_ROWS = [
  ["Silent subcontractor", "Только партнёр", "Под брендом партнёра", "Bober AI", "Партнёр / wholesale"],
  ["Technical partner", "Совместные встречи", "Партнёр", "Совместно", "Fixed / hourly"],
  ["Delivery team", "По договорённости", "Партнёр", "Bober AI", "Проект"],
  ["Expert on demand", "Партнёр", "Партнёр", "Консалтинг", "Почасовая"],
];

const WORKFLOW = [
  { title: "Бриф", text: "Партнёр передаёт задачу и контекст клиента." },
  { title: "Архитектура и себестоимость", text: "Собираем решение и wholesale-оценку — базу для вашей маржи." },
  { title: "Оффер под вашим брендом", text: "Помогаем с КП и материалами; партнёр презентует клиенту." },
  { title: "Delivery", text: "Реализуем архитектуру, backend, LLM, интеграции и deployment." },
  { title: "Сдача и маржа", text: "Документация и доступы — вам; клиент и контракт остаются у партнёра." },
];

const PACKAGES = [
  {
    title: "Presale support",
    items: ["Анализ брифа", "Архитектура", "Оценка себестоимости", "Участие в технической встрече"],
  },
  {
    title: "Project delivery",
    items: ["Разработка", "Интеграции", "Тестирование", "Deployment", "Документация"],
  },
  {
    title: "Ongoing AI team",
    items: ["Ежемесячный пул часов", "Несколько проектов", "Приоритетная поддержка", "Быстрые оценки"],
  },
];

const SCOPE = [
  "Discovery и анализ требований",
  "Архитектура решения",
  "Backend и интеграции",
  "RAG, AI-агенты, voice AI, OCR",
  "Развёртывание в облаке или on-premise",
  "DevOps и мониторинг",
  "Техническая документация под вашим брендом",
  "Техподдержка на согласованных встречах",
];

const PARTNER_CASE = {
  title: "Интегратор CRM закрыл запрос на AI-аналитику",
  lead: "Клиент интегратора Битрикс24 попросил AI-аналитику по продажам и звонкам. У партнёра была сильная экспертиза в CRM, но не было своей LLM/backend-команды.",
  partner: [
    "Отношения и договор с клиентом",
    "Контекст процессов и настройка Bitrix24",
    "Оффер и коммерческое сопровождение",
    "Обучение пользователей",
  ],
  boberAi: [
    "Архитектура и слой данных",
    "LLM-интеграция и RAG-запросы",
    "Backend, доступы, deployment",
    "Документация и материалы под брендом партнёра",
  ],
  result:
    "Партнёр продал более крупный проект, сохранил клиента и маржу; Bober AI остался silent subcontractor.",
};

const FLOWER_WHITELABEL_BUILT = [
  "Синхронизация клиентов и заказов",
  "Единая клиентская база",
  "AI-сегментация покупателей",
  "Аналитика среднего чека и повторных заказов",
  "Сценарии реактивации",
  "Интеграция с Битрикс24, amoCRM или интерфейсом партнёра",
];

export default function WhiteLabelPage() {
  const webPage = webPageJsonLd({
    name: "AI-разработка в ваши услуги без найма команды — Partner Program",
    description:
      "White-label AI-разработка для агентств и интеграторов: больше проектов, быстрее офферы, маржа у партнёра. NDA и non-circumvention.",
    url: PARTNERS_URL,
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
              <span className="meta-label ml-3 text-muted">Partner Program</span>
            </div>
            <TrackedAnchor
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              goal="partner_telegram_click"
            >
              Telegram
            </TrackedAnchor>
          </div>
        </header>

        <main>
          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <p className="hero-label">Bober AI Systems · Partner Program</p>
                <h1 className="section-title mt-6 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]">
                  Добавьте AI-разработку в свои услуги без найма собственной команды
                </h1>
                <p className="body-copy mt-5 max-w-2xl text-lg">
                  Закрываем архитектуру, backend, LLM, интеграции и deployment под вашим брендом. Вы сохраняете
                  клиента, управление проектом и свою маржу.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <TrackedAnchor href="#contact" className="btn-primary" goal="partner_cta_click">
                    Обсудить партнёрство
                  </TrackedAnchor>
                  <TrackedAnchor
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    goal="partner_telegram_click"
                  >
                    Написать в Telegram
                  </TrackedAnchor>
                </div>
              </Reveal>

              <Reveal delay={0.12} className="landing-hero-media">
                <EditorialImageFrame variant="hero" className="absolute inset-0">
                  <Image
                    src={OFFICE_STOCK_IMAGES.tower}
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

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Для кого</span>
                <h2 className="section-title mt-4 max-w-2xl">С кем работаем в этом формате</h2>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {AUDIENCE.map((item) => (
                  <li
                    key={item}
                    className="border border-hairline bg-surface-card px-5 py-4 text-sm text-body"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="prestige-gallery border-b border-hairline" aria-label="Офис и атмосфера партнёрства">
            <div className="prestige-gallery__grid">
              <Reveal className="prestige-gallery__main">
                <EditorialImageFrame variant="hero" className="prestige-gallery__frame">
                  <Image
                    src={STOCK_IMAGES.team}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </EditorialImageFrame>
              </Reveal>
              <Reveal delay={0.06} className="prestige-gallery__side">
                <EditorialImageFrame variant="card" className="prestige-gallery__frame">
                  <Image
                    src={OFFICE_STOCK_IMAGES.interior}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </EditorialImageFrame>
              </Reveal>
              <Reveal delay={0.12} className="prestige-gallery__side">
                <EditorialImageFrame variant="card" className="prestige-gallery__frame">
                  <Image
                    src={OFFICE_STOCK_IMAGES.facade}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </EditorialImageFrame>
              </Reveal>
            </div>
          </section>

          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <div className="trust-specs">
                  <div className="spec-cell">
                    <span className="spec-value">Крупнее сделки</span>
                    <span className="spec-label">AI в вашем каталоге услуг</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-value">Быстрее офферы</span>
                    <span className="spec-label">архитектура и смета под бриф</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-value">Маржа у вас</span>
                    <span className="spec-label">wholesale + ваш наценка</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-value">White-label</span>
                    <span className="spec-label">silent или technical</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Каталог для клиента</span>
                <h2 className="section-title mt-4 max-w-2xl">Что вы сможете предложить своим клиентам</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Упаковываем RAG, агентов, voice и OCR в продаваемые продукты — под вашим брендом и в вашей
                  смете.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {CLIENT_OFFERS.map((item) => (
                  <Reveal key={item.title}>
                    <div className="home-hub-card">
                      <h3 className="card-title text-lg">{item.title}</h3>
                      <p className="body-copy mt-2 text-sm">{item.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Экономика партнёрства</span>
                <h2 className="section-title mt-4 max-w-2xl">Кто продаёт, кто делает, кто выставляет счёт</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Партнёр ставит цену для клиента и добавляет свою маржу. Мы даём wholesale-оценку технической
                  реализации. Presale и account — на стороне партнёра; инвойс клиенту — обычно тоже. Клиентский
                  пилот на рынке — от 300&nbsp;000&nbsp;₽; партнёрская цена обсуждается по проекту.
                </p>
              </Reveal>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-hairline-strong text-left">
                      {ECONOMICS_HEADERS.map((header) => (
                        <th key={header} className="py-3 pr-4 font-display font-medium text-muted">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ECONOMICS_ROWS.map((row) => (
                      <tr key={row[0]} className="border-b border-hairline">
                        {row.map((cell, index) => (
                          <td
                            key={`${row[0]}-${ECONOMICS_HEADERS[index]}`}
                            className={`py-4 pr-4 ${index === 0 ? "text-body-strong" : "text-body"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Гарантии</span>
                <h2 className="section-title mt-4 max-w-2xl">Ваш клиент остаётся вашим</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  NDA и non-circumvention — по запросу до старта. Материалы, демо и документация — под вашим
                  брендом. Коммуникация с конечным клиентом — только через согласованный канал. Публичные кейсы
                  и упоминания — только с вашего согласия.
                </p>
              </Reveal>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <div className="grid items-center gap-10 md:grid-cols-2">
                <Reveal>
                  <span className="section-label">Кейс партнёра</span>
                  <h2 className="section-title mt-4 max-w-2xl">{PARTNER_CASE.title}</h2>
                  <p className="body-copy mt-4">{PARTNER_CASE.lead}</p>
                </Reveal>
                <Reveal delay={0.08} className="landing-split-media">
                  <EditorialImageFrame variant="card" className="absolute inset-0">
                    <Image
                      src={STOCK_IMAGES.sales}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </EditorialImageFrame>
                </Reveal>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-hairline bg-surface-card p-5">
                  <span className="meta-label text-muted-soft">Партнёр</span>
                  <ul className="mt-3 space-y-2">
                    {PARTNER_CASE.partner.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-body">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-soft" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-hairline bg-surface-card p-5">
                  <span className="meta-label text-muted-soft">Bober AI</span>
                  <ul className="mt-3 space-y-2">
                    {PARTNER_CASE.boberAi.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-body">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-sm text-body-strong">{PARTNER_CASE.result}</p>
              <p className="mt-2 text-sm text-muted">Анонимный кейс · white-label delivery</p>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Реализованный проект</span>
                <h2 className="section-title mt-4 max-w-2xl">
                  White-label: AI-сегментация и повторные продажи на МойСклад
                </h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Партнёр вёл клиента на МойСклад, сайте и в мессенджерах. Мы подключились как техническая
                  AI-команда: архитектура, backend, сегментация и рекомендации — под брендом партнёра.
                </p>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {FLOWER_WHITELABEL_BUILT.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="body-copy mt-6 text-sm text-body-strong">
                Партнёр продал систему роста повторных продаж без собственной AI-команды.
              </p>
              <p className="mt-3 text-sm text-muted">kinetic-ai.ru · МойСклад · AI-сегментация</p>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Как устроена работа</span>
                <h2 className="section-title mt-4 max-w-2xl">От брифа до сдачи</h2>
              </Reveal>
              <div className="mt-8 grid gap-4">
                {WORKFLOW.map((step, index) => (
                  <div key={step.title} className="flex gap-5 border-b border-hairline pb-4">
                    <span className="font-display text-2xl text-muted-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="card-title text-lg">{step.title}</h3>
                      <p className="body-copy mt-1 text-sm">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Пакеты участия</span>
                <h2 className="section-title mt-4 max-w-2xl">Три формата под разные проекты</h2>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {PACKAGES.map((pkg) => (
                  <div key={pkg.title} className="home-hub-card">
                    <h3 className="card-title text-lg">{pkg.title}</h3>
                    <ul className="mt-3 space-y-2">
                      {pkg.items.map((item) => (
                        <li key={item} className="text-sm text-body">
                          — {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Технический периметр</span>
                <h2 className="section-title mt-4 max-w-2xl">Что закрываем под вашим проектом</h2>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {SCOPE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Облако и инфраструктура</span>
                <h2 className="section-title mt-4 max-w-2xl">С кем уже работаем по инфраструктуре</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Партнёр Yandex Cloud · партнёрская программа Selectel · технологический партнёр Cloud.ru.
                  Деплой у клиента или в вашем контуре — без смены лица перед конечным заказчиком.
                </p>
              </Reveal>
              <div className="mt-8 flex flex-wrap gap-4" aria-label="Облачные и технологические партнёры">
                {CLOUD_PARTNERS.map((partner) => (
                  <a
                    key={partner.id}
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer"
                    className="trust-logo trust-logo--linked"
                  >
                    <div
                      className={`trust-logo__mark${partner.markTone === "dark" ? " trust-logo__mark--dark" : ""}`}
                    >
                      <Image
                        src={partner.logoSrc}
                        alt=""
                        width={partner.logoWidth}
                        height={partner.logoHeight}
                        className="trust-logo__icon"
                        aria-hidden
                      />
                    </div>
                    <span className="trust-logo__name">{partner.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="section-band">
            <div className="container-editorial max-w-2xl">
              <Reveal>
                <span className="section-label">Контакт</span>
                <h2 className="section-title mt-4">Обсудим партнёрство</h2>
                <p className="body-copy mt-4">
                  Пришлите бриф или тип сотрудничества — вернёмся с wholesale-оценкой и распределением ролей в
                  течение суток.
                </p>
              </Reveal>
              <div className="mt-8">
                <ContactForm defaultService="Партнёрство / White-label" trackingPrefix="partner" />
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-hairline py-10">
          <div className="container-editorial flex flex-wrap items-center justify-between gap-4 text-sm text-muted-soft">
            <span>© {new Date().getFullYear()} Bober AI Systems</span>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.bober-ai.dev/privacy-policy" className="text-muted-soft hover:text-muted">
                Политика конфиденциальности
              </a>
              <a href="https://www.bober-ai.dev" className="text-muted-soft hover:text-muted">
                bober-ai.dev
              </a>
            </div>
          </div>
        </footer>
      </div>
    </BareIntlShell>
  );
}
