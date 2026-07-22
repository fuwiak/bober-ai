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

const PARTNER_CASES = [
  {
    title: "Интегратор Bitrix24 продаёт AI-аналитику",
    problem:
      "Интегратор хорошо знает CRM и процессы клиента, но не располагает своей LLM/backend-командой. Клиент просит: «Хотим задавать вопросы о продажах, задачах и звонках обычным языком».",
    partner: [
      "Отношения с клиентом",
      "Анализ CRM и процессов",
      "Настройка Bitrix24",
      "Обучение пользователей",
      "Коммерческое сопровождение",
    ],
    boberAi: [
      "Архитектура решения",
      "Слой данных и контроль доступа",
      "Аналитика / RAG-запросы",
      "Интерфейс внутри Bitrix24",
      "Тесты, деплой, документация",
    ],
    result: "Партнёр добавляет AI-модуль к своему проекту и сохраняет весь клиентский контракт.",
  },
  {
    title: "Агентство продаёт voice AI для недвижимости",
    problem:
      "Агентству нужно закрыть запрос клиента: реактивация старых лидов и квалификация входящих звонков — без своей voice-инфраструктуры и backend-разработки.",
    partner: ["Клиент и договор", "Сценарий продаж", "Контент и креатив", "Настройка кампаний", "Account management"],
    boberAi: [
      "Voice-бэкенд",
      "Интеграция с телефонией",
      "Логика разговора",
      "Запись в CRM и транскрипция",
      "Scoring и назначение встреч",
      "Мониторинг",
    ],
    result: "Агентство продаёт полный цикл от обращения до квалифицированной встречи, а не рекламный трафик.",
  },
  {
    title: "1С-франчайзи добавляет обработку документов",
    problem:
      "Клиент 1С-франчайзи вручную переносит заказы и спецификации в учётную систему — франчайзи умеет настраивать 1С, но не строит модели распознавания документов.",
    partner: ["Конфигурация 1С", "Бизнес-объекты и справочники"],
    boberAi: [
      "OCR и извлечение данных",
      "Классификация документов",
      "Сопоставление позиций",
      "Confidence score",
      "Экран верификации",
      "API-интеграция с 1С",
    ],
    result: "Франчайзи расширяет внедрение модулем интеллектуальной обработки документов без своей AI-команды.",
  },
  {
    title: "Software house получает проект RAG",
    problem:
      "Клиент software house просит корпоративного ассистента по тысячам документов и внутренних политик — задача, которую студия не готова закрыть in-house без RAG-экспертизы.",
    partner: ["Frontend", "Аккаунты пользователей", "Инфраструктура приложения", "Бизнес-интеграции"],
    boberAi: [
      "Ingestion и chunking",
      "Embeddings и hybrid search",
      "Reranking и citations",
      "Eval и безопасность",
      "Выбор моделей, оптимизация стоимости",
    ],
    result: "Software house сохраняет проект и сроки вместо отказа от AI-части или найма команды под один контракт.",
  },
  {
    title: "Агентство создаёт систему коммерческих предложений",
    problem:
      "Клиент-дистрибьютор получает поток запросов в PDF и Excel — агентству нужно решение для генерации КП, но нет ресурсов на анализ документов и подбор товаров.",
    partner: ["Портал и интерфейс", "Дизайн клиентского опыта"],
    boberAi: [
      "Анализ документов",
      "Поиск товаров и подбор аналогов",
      "Интеграция с каталогом",
      "Ценовые правила",
      "Генерация документов",
      "Тесты на галлюцинации",
    ],
    result: "Партнёр продаёт клиенту отраслевой продукт, а не отдельную интеграцию с моделью.",
  },
  {
    title: "Консультант автоматизирует операционный отдел",
    problem:
      "Консультант по итогам аудита нашёл процесс с большими издержками, но у него нет delivery-команды, чтобы довести решение до продакшена.",
    partner: ["Бренд и стратегия", "Отношения с руководством клиента", "Презентация результатов", "Своя маржа"],
    boberAi: ["Техническая аналитика", "PoC", "Внедрение", "Мониторинг", "Документация", "Сопровождение"],
    result: "Консультант сохраняет отношения и стратегию, делегируя техническую реализацию.",
  },
];

const CAN_ADD_TO_OFFER = [
  "AI-модуль для Битрикс24",
  "Обработка документов для 1С",
  "Корпоративный RAG",
  "Голосовой агент",
  "AI-контроль звонков",
  "Генерация КП",
  "AI-аналитика для руководителя",
  "Классификация обращений",
  "Кастомный агент с API",
  "Локальная LLM в контуре клиента",
];

const PARTNER_GETS = [
  "Описание решения под вашей маркой",
  "Архитектуру",
  "Объём работ",
  "Техническую оценку стоимости",
  "Список ограничений",
  "Презентацию или демо",
  "Ответы на вопросы IT клиента",
  "Участие в разговоре как член команды",
  "Документацию по сдаче проекта",
];

const PRESALE_FLOW = [
  "Вы присылаете бриф",
  "Мы задаём технические вопросы",
  "Вы получаете архитектуру и себестоимость",
  "Добавляете свою маржу и услуги",
  "Презентуете клиенту под своим брендом",
  "Мы выполняем delivery",
];

const FLOWER_WHITELABEL_BUILT = [
  "Синхронизация клиентов и заказов",
  "Единая клиентская база",
  "AI-сегментация покупателей",
  "Обогащение данных из каналов общения",
  "Аналитика среднего чека и повторных заказов",
  "Рекомендации для маркетинговых кампаний",
  "Сценарии реактивации и персональных предложений",
  "Интеграция с Битрикс24, amoCRM или интерфейсом партнёра",
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
          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <p className="hero-label">Bober AI Systems · Partner Program</p>
                <h1 className="section-title mt-6 max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]">
                  AI-разработка под вашим брендом
                </h1>
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
                    <span className="spec-value">NDA</span>
                    <span className="spec-label">и non-circumvention</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-value">White-label</span>
                    <span className="spec-label">под вашим брендом</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-value">Fixed / hourly</span>
                    <span className="spec-label">или подрядное участие</span>
                  </div>
                  <div className="spec-cell">
                    <span className="spec-value">Silent</span>
                    <span className="spec-label">или technical partner</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Partner Program · White-label</span>
                <h2 className="section-title mt-4 max-w-2xl">Четыре обещания партнёру</h2>
              </Reveal>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {PROMISES.map((item) => (
                  <Reveal key={item.title}>
                    <div className="home-hub-card">
                      <h2 className="card-title text-lg">{item.title}</h2>
                      <p className="body-copy mt-2 text-sm">{item.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.08}>
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
              </Reveal>
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
              <div className="grid items-center gap-10 md:grid-cols-2">
                <Reveal>
                  <span className="section-label">Для кого</span>
                  <h2 className="section-title mt-4 max-w-2xl">С кем мы работаем в этом формате</h2>
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
                <span className="section-label">Как распределяются роли</span>
                <h2 className="section-title mt-4 max-w-2xl">Типовые сценарии сотрудничества</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Шесть моделей разделения труда между партнёром и нами — от интегратора CRM до консультанта по
                  процессам.
                </p>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {PARTNER_CASES.map((item) => (
                  <div key={item.title} className="border border-hairline bg-surface-card p-6">
                    <h3 className="card-title text-lg">{item.title}</h3>
                    <p className="body-copy mt-2 text-sm text-muted">{item.problem}</p>
                    <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                      <div>
                        <span className="meta-label text-muted-soft">Партнёр</span>
                        <ul className="mt-2 space-y-1.5">
                          {item.partner.map((role) => (
                            <li key={role} className="flex items-start gap-2 text-body">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-soft" />
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="meta-label text-muted-soft">Bober AI</span>
                        <ul className="mt-2 space-y-1.5">
                          {item.boberAi.map((role) => (
                            <li key={role} className="flex items-start gap-2 text-body">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-body-strong">{item.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Что добавить в предложение</span>
                <h2 className="section-title mt-4 max-w-2xl">Что вы можете добавить в своё предложение</h2>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {CAN_ADD_TO_OFFER.map((item) => (
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
                <span className="section-label">Presale</span>
                <h2 className="section-title mt-4 max-w-2xl">Что получает партнёр и как проходит presale</h2>
              </Reveal>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <ul className="space-y-3">
                  {PARTNER_GETS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-body">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ol className="space-y-3">
                  {PRESALE_FLOW.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm text-body">
                      <span className="font-display text-muted-soft">{String(index + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Реализованный проект вне Битрикс24</span>
                <h2 className="section-title mt-4 max-w-2xl">
                  Пример white-label проекта: AI-сегментация и повторные продажи на МойСклад
                </h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Партнёр работает с клиентом на МойСклад, сайте, маркетплейсах и в мессенджерах, который не
                  использует накопленные данные для повторных продаж. Мы подключаемся как техническая AI-команда
                  партнёра. Архитектура может быть встроена в Битрикс24 или amoCRM.
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
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="border border-hairline bg-surface-card p-5">
                  <span className="meta-label text-muted-soft">Партнёр</span>
                  <p className="body-copy mt-2 text-sm">
                    Ведёт отношения с клиентом, определяет коммерческое предложение, добавляет свою маржу,
                    отвечает за CRM или маркетинговую стратегию.
                  </p>
                </div>
                <div className="border border-hairline bg-surface-card p-5">
                  <span className="meta-label text-muted-soft">Bober AI</span>
                  <p className="body-copy mt-2 text-sm">
                    Проектирует AI-архитектуру, разрабатывает backend и интеграции, настраивает сегментацию и
                    рекомендации, тестирует и передаёт документацию под брендом партнёра.
                  </p>
                </div>
              </div>
              <p className="body-copy mt-6 text-sm text-body-strong">
                Результат: партнёр продаёт систему роста повторных продаж, не создавая собственную AI-команду.
              </p>
              <p className="mt-3 text-sm text-muted">kinetic-ai.ru · МойСклад · AI-сегментация · Telegram · WhatsApp</p>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
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
