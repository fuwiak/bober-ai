import type { Metadata } from "next";
import Image from "next/image";
import { BareIntlShell } from "@/components/BareIntlShell";
import { ContactForm } from "@/components/ContactForm";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { Reveal } from "@/components/motion/Reveal";
import { webPageJsonLd } from "@/lib/seo";
import { PARTNERS_SITE_URL, TELEGRAM_URL } from "@/lib/site";
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
  title: "AI-разработка под вашим брендом — Partner Program",
  description:
    "White-label AI-разработка для агентств, software house и интеграторов CRM/ERP: работа под вашим брендом, NDA, без прямого контакта с клиентом. Fixed price, почасовая ставка или подрядное участие.",
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
    title: "AI-разработка под вашим брендом",
    description:
      "Проектируем и внедряем AI-системы для ваших клиентов — без выхода на прямой контакт и без конкуренции с вашей компанией.",
    images: [{ url: "/stock/office-tower.jpg", width: 1200, height: 630 }],
  },
};

const PROMISES = [
  {
    title: "Работа под вашим брендом",
    text: "Клиент видит только вашу компанию — от первого письма до сдачи проекта.",
  },
  {
    title: "NDA и non-circumvention",
    text: "Без прямого коммерческого контакта с конечным клиентом. Соглашение — по запросу, до старта.",
  },
  {
    title: "Материалы в вашем брендинге",
    text: "Документация, демо и презентации оформляем под ваш бренд, а не под наш.",
  },
  {
    title: "Гибкая модель оплаты",
    text: "Фиксированная цена, почасовая ставка или подрядное участие в вашем проекте.",
  },
];

const AUDIENCE = [
  "Digital-агентства",
  "Software house",
  "Интеграторы Bitrix24 и 1С",
  "Консалтинговые компании",
  "Фрилансеры с крупными проектами",
  "Зарубежные агентства без своей AI-команды",
];

const SCOPE = [
  "Discovery и анализ требований",
  "Архитектура решения",
  "Backend и интеграции",
  "RAG, AI-агенты, voice AI, OCR",
  "Развёртывание в облаке или on-premise",
  "DevOps и мониторинг",
  "Техническая документация",
  "Техническая поддержка на встречах с клиентом",
];

const WORKFLOW = [
  { title: "Бриф", text: "Партнёр передаёт задачу и контекст клиента." },
  { title: "Решение и смета", text: "Помогаем собрать архитектуру и оценку под клиента." },
  { title: "Презентация", text: "Партнёр представляет предложение клиенту от своего имени." },
  { title: "Реализация", text: "Ведём проект под брендом партнёра — от разработки до сдачи." },
  { title: "Партнёр сохраняет отношения и маржу", text: "Мы остаёмся за кулисами на всех этапах." },
];

const GUARANTEES = [
  "Не выходим на связь с клиентом за пределами согласованного канала",
  "Не предлагаем клиенту собственные услуги напрямую",
  "Не используем проект публично без согласия партнёра",
  "Код, документация и доступы передаются по договору",
  "NDA и соглашение о неконкуренции (non-circumvention) — по запросу",
  "Коммуникация с клиентом может идти исключительно через партнёра",
];

const MODELS = [
  {
    title: "Silent subcontractor",
    text: "Конечный клиент не знает о нашем участии в проекте.",
  },
  {
    title: "Technical partner",
    text: "Участвуем во встречах как технический член вашей команды.",
  },
  {
    title: "Delivery team",
    text: "Берём весь технический этап — от анализа до продакшена.",
  },
  {
    title: "Expert on demand",
    text: "Консультации, аудиты, оценки и поддержка на этапе presale.",
  },
];

const MODEL_FLOW = [
  "Ваш бренд",
  "Клиент и контракт",
  "Вы: продажа и отношения",
  "Bober AI: архитектура и delivery",
  "Система под вашим брендом",
];

const SELLABLES = [
  {
    title: "AI для CRM",
    text: "Bitrix24, amoCRM: квалификация лидов, sales-ассистент, аналитика звонков.",
  },
  {
    title: "AI для документов",
    text: "OCR, договоры, счета, спецификации, автогенерация коммерческих предложений.",
  },
  {
    title: "Корпоративные ассистенты",
    text: "RAG, базы знаний, поиск по документам, действия через внутренние API.",
  },
  {
    title: "Голосовые агенты",
    text: "Телефония, квалификация звонков, поддержка, запись на встречи.",
  },
];

const EARNINGS = [
  "Партнёр устанавливает конечную цену для клиента",
  "Мы называем стоимость технической реализации — это ваша база для расчёта маржи",
  "Помогаем собрать объём работ и аргументацию для клиента",
  "Партнёр может добавить свой консалтинг, account management и поддержку",
  "Клиент и договор остаются на стороне партнёра",
];

const PACKAGES = [
  {
    title: "Presale support",
    items: ["Анализ брифа", "Архитектура решения", "Оценка стоимости", "Участие в технической встрече"],
  },
  {
    title: "Project delivery",
    items: ["Разработка", "Интеграции", "Тестирование", "Deployment", "Документация"],
  },
  {
    title: "Ongoing AI team",
    items: ["Ежемесячный пул часов", "Развитие нескольких проектов", "Приоритетная поддержка", "Быстрые оценки"],
  },
];

const EXAMPLE_STEPS = [
  "Интегратор Битрикс24 получает от клиента запрос на AI-анализ звонков",
  "Партнёр передаёт бриф — в течение 1–2 дней получает архитектуру и стоимость",
  "Партнёр представляет предложение клиенту от своего имени",
  "Мы делаем backend, интеграцию с телефонией и дашборд",
  "Партнёр передаёт готовую систему клиенту под своим брендом",
  "Мы остаёмся технической опорой за кулисами",
];

export default function WhiteLabelPage() {
  const webPage = webPageJsonLd({
    name: "AI-разработка под вашим брендом — Partner Program",
    description:
      "White-label AI-разработка для агентств, software house и интеграторов: NDA, работа под вашим брендом, гибкая модель оплаты.",
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
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Partner Program · White-label</span>
                <h1 className="section-title mt-4 max-w-3xl">AI-разработка под вашим брендом</h1>
                <p className="body-copy mt-5 max-w-2xl text-lg">
                  Проектируем и внедряем AI-системы для ваших клиентов — без выхода на прямой контакт и без
                  конкуренции с вашей компанией.
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

              <div className="mt-14 grid gap-4 sm:grid-cols-2">
                {PROMISES.map((item) => (
                  <div key={item.title} className="home-hub-card">
                    <h2 className="card-title text-lg">{item.title}</h2>
                    <p className="body-copy mt-2 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 border border-hairline bg-surface-card p-6 md:p-8">
                <span className="meta-label text-muted">Модель white-label</span>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-4">
                  {MODEL_FLOW.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="border border-hairline-strong bg-canvas px-4 py-3 font-display text-sm text-ink">
                        {step}
                      </span>
                      {index < MODEL_FLOW.length - 1 ? (
                        <span aria-hidden className="text-muted-soft">
                          →
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Что вы сможете продавать</span>
                <h2 className="section-title mt-4 max-w-2xl">Новый каталог услуг для ваших клиентов</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Вы получаете не технологию, а готовые продукты, которые можно предложить клиенту под своим
                  брендом.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {SELLABLES.map((item) => (
                  <div key={item.title} className="home-hub-card">
                    <h3 className="card-title text-lg">{item.title}</h3>
                    <p className="body-copy mt-2 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
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

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Для кого</span>
                <h2 className="section-title mt-4 max-w-2xl">С кем мы работаем в этом формате</h2>
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

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Что можем закрыть</span>
                <h2 className="section-title mt-4 max-w-2xl">Технический периметр под вашим проектом</h2>
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
                <span className="section-label">Как устроена работа</span>
                <h2 className="section-title mt-4 max-w-2xl">Пять шагов от брифа до сдачи</h2>
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

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Как вы зарабатываете</span>
                <h2 className="section-title mt-4 max-w-2xl">Маржа и отношения остаются у вас</h2>
              </Reveal>
              <ul className="mt-8 grid gap-3">
                {EARNINGS.map((item) => (
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
                <span className="section-label">Гарантии партнёру</span>
                <h2 className="section-title mt-4 max-w-2xl">Ваш клиент — ваш клиент</h2>
              </Reveal>
              <ul className="mt-8 grid gap-3">
                {GUARANTEES.map((item) => (
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

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Пример (иллюстрация)</span>
                <h2 className="section-title mt-4 max-w-2xl">Как это работает на практике</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Условный сценарий, чтобы показать распределение ролей — не описание конкретного клиента.
                </p>
              </Reveal>
              <ol className="mt-8 space-y-3">
                {EXAMPLE_STEPS.map((step, index) => (
                  <li key={step} className="flex gap-4 text-sm text-body">
                    <span className="font-display text-muted-soft">{String(index + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Модели сотрудничества</span>
                <h2 className="section-title mt-4 max-w-2xl">Четыре формата участия</h2>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {MODELS.map((item) => (
                  <div key={item.title} className="home-hub-card">
                    <h3 className="card-title text-lg">{item.title}</h3>
                    <p className="body-copy mt-2 text-sm">{item.text}</p>
                  </div>
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
                  Опишите тип сотрудничества и бриф — вернёмся с условиями и распределением ролей в течение
                  суток.
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
            <a href="https://www.bober-ai.dev" className="text-muted-soft hover:text-muted">
              bober-ai.dev
            </a>
          </div>
        </footer>
      </div>
    </BareIntlShell>
  );
}
