import type { Metadata } from "next";
import Image from "next/image";
import { BareIntlShell } from "@/components/BareIntlShell";
import { ContactForm } from "@/components/ContactForm";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import { webPageJsonLd } from "@/lib/seo";
import {
  BITRIX_SITE_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  OFFICE_STOCK_IMAGES,
  PORTFOLIO_IMAGES,
  STOCK_IMAGES,
  TELEGRAM_URL,
  WHATSAPP_URL,
} from "@/lib/site";

/**
 * Served at bitrix.bober-ai.dev (see deploy/Caddyfile[.railway]) —
 * AI automation for Bitrix24 + amoCRM with RU business integrations.
 */
const LANDING_URL = `${BITRIX_SITE_URL.replace(/\/$/, "")}/`;
const LANDING_NAME = "Bober AI Systems — Битрикс24";

export const metadata: Metadata = {
  title: "Автоматизация продаж и управления в Битрикс24",
  description:
    "AI анализирует сделки и звонки, заполняет CRM, формирует задачи, готовит коммерческие предложения и синхронизирует данные с 1С и МойСклад. Пилот от 300 000 ₽.",
  keywords: [
    "битрикс24 ai",
    "автоматизация битрикс24",
    "интеграция битрикс24 1с",
    "ai ассистент crm",
    "автоматизация amocrm",
    "битрикс24 мойсклад",
  ],
  alternates: { canonical: LANDING_URL },
  robots: { index: true, follow: true },
  verification: { yandex: "b5643e127be991c8" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: LANDING_URL,
    siteName: LANDING_NAME,
    title: "Автоматизация продаж и управления в Битрикс24",
    description:
      "AI анализирует сделки и звонки, заполняет CRM, готовит КП и синхронизирует данные с 1С и МойСклад.",
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
};

const CASES: CaseStudy[] = [
  {
    label: "Кейс 1 · AI-чат владельца",
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
    label: "Кейс 2 · Авто-КП · OfferKP",
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
    label: "Кейс 3 · Kinetic AI · цветы",
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

export default function BitrixLandingPage() {
  const webPage = webPageJsonLd({
    name: "Автоматизация продаж и управления в Битрикс24",
    description:
      "AI анализирует сделки и звонки, заполняет CRM, готовит КП и синхронизирует данные с 1С и МойСклад.",
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
                  Автоматизируем продажи и управление в Битрикс24
                </h1>
                <p className="body-copy mt-5 max-w-2xl text-lg">
                  AI анализирует сделки и звонки, заполняет CRM, формирует задачи, готовит коммерческие
                  предложения и синхронизирует данные с 1С и МойСклад.
                </p>
                <p className="mt-4 max-w-2xl font-display text-base text-muted">
                  Когда стандартных роботов и CoPilot уже недостаточно.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <TrackedAnchor href="#contact" className="btn-primary" goal="bitrix_cta_click">
                    Получить оценку интеграции
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
                <p className="meta-label mt-6 text-muted">
                  Пилот от 300 000 ₽ · 2–4 недели · облако или коробочная версия
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

          {/* 5. Case studies */}
          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Кейсы</span>
                <h2 className="section-title mt-4 max-w-2xl">Как это выглядит на реальных процессах</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Три сценария из практики: чат владельца по CRM, авто-КП и рост повторных продаж на данных склада.
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
                        <div className="relative mt-6 aspect-[16/9] max-w-xl overflow-hidden border border-hairline">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 560px"
                            className="object-cover object-top"
                          />
                        </div>
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
                  Получить оценку интеграции
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

          {/* 9. Form */}
          <section id="contact" className="section-band scroll-mt-16 pb-24 md:pb-16">
            <div className="container-editorial max-w-2xl">
              <Reveal>
                <div className="text-center">
                  <span className="section-label">Контакт</span>
                  <h2 className="section-title mt-4">Получите оценку интеграции Битрикс24</h2>
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
                  <ContactForm defaultService="Битрикс24 / AI-интеграция" trackingPrefix="bitrix" />
                </div>
              </Reveal>
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
