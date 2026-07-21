import type { Metadata } from "next";
import { BareIntlShell } from "@/components/BareIntlShell";
import { ContactForm } from "@/components/ContactForm";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import { webPageJsonLd } from "@/lib/seo";
import { BITRIX_SITE_URL, TELEGRAM_URL } from "@/lib/site";

/**
 * Served at bitrix.bober-ai.dev (see deploy/Caddyfile[.railway]) —
 * AI automation for Bitrix24 + amoCRM with RU business integrations.
 */
const LANDING_URL = `${BITRIX_SITE_URL.replace(/\/$/, "")}/`;
const LANDING_NAME = "Bober AI Systems — Битрикс24 и amoCRM";

export const metadata: Metadata = {
  title: "AI-автоматизация для Битрикс24 и amoCRM",
  description:
    "Подключаем CRM к 1С, МойСклад, телефонии, документам и корпоративным данным. AI-ассистенты, аналитика и сложные процессы, когда стандартных роботов недостаточно.",
  keywords: [
    "битрикс24 ai",
    "автоматизация битрикс24",
    "amocrm ai",
    "интеграция битрикс24 1с",
    "ai ассистент crm",
    "автоматизация amocrm",
  ],
  alternates: { canonical: LANDING_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: LANDING_URL,
    siteName: LANDING_NAME,
    title: "AI-автоматизация для Битрикс24 и amoCRM",
    description:
      "Подключаем CRM к 1С, МойСклад, телефонии и документам. AI там, где стандартных роботов и виджетов недостаточно.",
    images: [{ url: "/stock/office-tower.jpg", width: 1200, height: 630 }],
  },
};

const BITRIX_OFFERS = [
  "Анализ воронки и работы менеджеров",
  "Ассистент руководителя по сделкам и задачам",
  "Генерация задач и отчётов",
  "Работа с дисками, комментариями и документами",
  "Сложные действия через REST API",
  "Связка с 1С и корпоративными базами",
];

const AMO_OFFERS = [
  "Квалификация лидов",
  "Саммари звонков и переписки",
  "Автозаполнение карточек",
  "Lead scoring и следующий лучший шаг",
  "Реактивация старых лидов",
  "Персонализированные сообщения и контроль проигранных сделок",
];

const ONEC_OFFERS = [
  "Проверка цен и остатков",
  "Создание заказов",
  "Перенос данных из документов",
  "Синхронизация контрагентов",
  "Генерация КП и подбор аналогов",
  "Отчёты по расхождениям",
];

const DOCFLOW_OFFERS = [
  "Диадок и СБИС",
  "Анализ договоров и актов",
  "Распознавание счетов и спецификаций",
  "Проверка комплектности",
  "Маршрутизация документов",
  "Автосоздание задач в CRM",
];

const INFRA_GROUPS = [
  {
    title: "Учёт и склад",
    items: ["1С:Предприятие", "1С:ERP", "1С:УТ", "1С:Бухгалтерия", "МойСклад"],
  },
  {
    title: "Документы",
    items: ["Контур.Диадок", "СБИС", "PDF", "сканы", "Excel", "Google Sheets"],
  },
  {
    title: "Телефония и каналы",
    items: ["MANGO OFFICE", "UIS", "МегаФон ВАТС", "Telegram", "VK", "WhatsApp", "e-mail", "формы сайта", "call tracking"],
  },
  {
    title: "Данные",
    items: ["PostgreSQL", "MySQL", "каталог товаров", "база знаний", "внутренние API"],
  },
];

const OTHER_CRM = ["RetailCRM", "Мегаплан", "ПланФикс"];

export default function BitrixLandingPage() {
  const webPage = webPageJsonLd({
    name: "AI-автоматизация для Битрикс24 и amoCRM",
    description:
      "Подключаем CRM к 1С, МойСклад, телефонии и корпоративным данным. AI-ассистенты и сложные процессы под задачи компании.",
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
              <span className="meta-label ml-3 text-muted">Битрикс24 · amoCRM</span>
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
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">CRM · AI · интеграции</span>
                <h1 className="section-title mt-4 max-w-3xl">
                  AI-автоматизация для Битрикс24 и amoCRM
                </h1>
                <p className="body-copy mt-5 max-w-2xl text-lg">
                  Подключаем CRM к 1С, МойСклад, телефонии, документам и корпоративным данным. Разрабатываем
                  AI-ассистентов, аналитику и сложные бизнес-процессы под задачи вашей компании.
                </p>
                <p className="mt-4 max-w-2xl font-display text-base text-body-strong">
                  Когда стандартных роботов, виджетов и встроенного AI недостаточно.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <TrackedAnchor href="#contact" className="btn-primary" goal="bitrix_cta_click">
                    Обсудить проект
                  </TrackedAnchor>
                  <TrackedAnchor
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    goal="bitrix_telegram_click"
                  >
                    Написать в Telegram
                  </TrackedAnchor>
                </div>
              </Reveal>

              <div className="bitrix-platforms mt-14" aria-label="Главные платформы">
                <div className="bitrix-platforms__card">
                  <span className="bitrix-platforms__eyebrow">Главная платформа</span>
                  <p className="bitrix-platforms__name">Битрикс24</p>
                  <p className="bitrix-platforms__hint">CRM, задачи, диск, роботы, REST API</p>
                </div>
                <div className="bitrix-platforms__card">
                  <span className="bitrix-platforms__eyebrow">Платформа продаж</span>
                  <p className="bitrix-platforms__name">amoCRM</p>
                  <p className="bitrix-platforms__hint">Воронка, лиды, коммуникации, sales AI</p>
                </div>
              </div>
              <p className="meta-label mt-6 text-muted">Главные платформы автоматизации</p>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Инфраструктура</span>
                <h2 className="section-title mt-4 max-w-2xl">Интегрируем с вашей инфраструктурой</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  1С · МойСклад · Диадок · СБИС · RetailCRM · телефония · Telegram · почта · Excel · базы
                  данных
                </p>
              </Reveal>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {INFRA_GROUPS.map((group) => (
                  <div key={group.title}>
                    <h3 className="meta-label text-muted">{group.title}</h3>
                    <p className="mt-3 font-display text-sm leading-relaxed text-body">
                      {group.items.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-8 border-t border-hairline pt-6 text-sm text-muted">
                Работаем и с другими системами: {OTHER_CRM.join(", ")}.
              </p>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">70% фокуса</span>
                <h2 className="section-title mt-4 max-w-2xl">AI для Битрикс24</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Сложные процессы через REST API, связка с 1С и базами — не только готовые роботы и виджеты.
                </p>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {BITRIX_OFFERS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">20% фокуса</span>
                <h2 className="section-title mt-4 max-w-2xl">AI для amoCRM</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Акцент на продажах: квалификация, follow-up, scoring и контроль воронки.
                </p>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {AMO_OFFERS.map((item) => (
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
                <span className="section-label">Учёт и склад</span>
                <h2 className="section-title mt-4 max-w-2xl">Интеграция с 1С и МойСклад</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Цены, остатки, заказы, контрагенты и КП — без ручного переноса между CRM и учётом.
                </p>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {ONEC_OFFERS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Документы</span>
                <h2 className="section-title mt-4 max-w-2xl">Документооборот</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Диадок, СБИС, счета и договоры — в задачи CRM с проверкой комплектности.
                </p>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {DOCFLOW_OFFERS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="contact" className="section-band">
            <div className="container-editorial max-w-2xl">
              <Reveal>
                <span className="section-label">Контакт</span>
                <h2 className="section-title mt-4">Разберём ваш контур CRM</h2>
                <p className="body-copy mt-4">
                  Битрикс24, amoCRM, 1С, телефония или документы — опишите задачу. Вернёмся с оценкой и
                  планом в течение суток.
                </p>
              </Reveal>
              <div className="mt-8">
                <ContactForm defaultService="Битрикс24 / amoCRM / AI" trackingPrefix="bitrix" />
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-hairline py-10">
          <div className="container-editorial flex flex-wrap items-center justify-between gap-4 text-sm text-muted-soft">
            <span>© {new Date().getFullYear()} Bober AI Systems</span>
            <a href="https://www.bober-ai.dev" className="text-muted-soft hover:text-muted">
              bober-ai.dev
            </a>
          </div>
        </footer>
      </div>
    </BareIntlShell>
  );
}
