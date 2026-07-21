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
  verification: { yandex: "b5643e127be991c8" },
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

const FLOW_STEPS = ["Входящий запрос", "Битрикс24", "AI-квалификация", "1С / телефония", "КП + задача менеджеру"];

const FLOW_STATUSES = [
  "сделка создана",
  "клиент найден в 1С",
  "остатки проверены",
  "КП сформировано",
  "задача назначена",
];

const BEFORE_STEPS = [
  "Менеджер читает письмо или сообщение",
  "Вручную создаёт сделку в CRM",
  "Ищет клиента и остатки в 1С",
  "Копирует данные в КП",
  "Отдельно ставит себе задачу",
];

const AFTER_STEPS = [
  "Письмо или сообщение поступает в систему",
  "AI создаёт сделку в Битрикс24 или amoCRM",
  "Проверяет клиента и остатки в 1С",
  "Готовит КП по шаблону",
  "Ставит задачу — менеджер подтверждает",
];

const COMPARISON_ROWS = [
  {
    label: "Где работает",
    standard: "Внутри CRM: карточка, робот, виджет",
    custom: "Связывает CRM, 1С, каталог, документы и телефонию",
  },
  {
    label: "Сценарии",
    standard: "Готовые шаблоны и стандартные роботы",
    custom: "Процессы под логику именно вашей компании",
  },
  {
    label: "Контроль",
    standard: "Ограниченные правила внутри платформы",
    custom: "Валидация данных, права доступа, логи, подтверждение человеком",
  },
  {
    label: "Данные",
    standard: "То, что видит платформа",
    custom: "Ваши источники: 1С, МойСклад, документы, внутренние API",
  },
];

const FLOWER_CASE_BUILT = [
  "Синхронизация клиентов и заказов с МойСклад",
  "Объединение прямых продаж и заказов с маркетплейсов",
  "История заказов по каждому клиенту",
  "Расчёт среднего чека и количества покупок",
  "Определение даты последнего заказа",
  "Автоматическая AI-сегментация клиентской базы",
  "Выделение постоянных, корпоративных и премиальных клиентов",
  "Обогащение карточек данными из Telegram, WhatsApp и других каналов",
  "Фильтрация и поиск по клиентской базе",
  "Группы для маркетинговых кампаний",
  "Рекомендации по повторным продажам и персональным предложениям",
  "Аналитический дашборд по выручке, заказам и каналам продаж",
];

const FLOWER_CASE_FLOW = ["МойСклад и каналы продаж", "Единая клиентская база", "AI-сегментация", "Рекомендации и группы", "Персональная коммуникация"];

const FLOWER_TO_BITRIX_STEPS = [
  "Битрикс24 или amoCRM остаётся основным рабочим интерфейсом",
  "Данные о заказах и остатках поступают из МойСклад или 1С",
  "AI автоматически сегментирует клиентскую базу",
  "Менеджер получает рекомендации по следующему контакту",
  "Система создаёт задачи и персональные предложения в CRM",
  "Результаты коммуникации сохраняются в карточке клиента",
];

const SCENARIO_DISCLAIMER =
  "Демонстрационный сценарий. Архитектура и эффект уточняются после аудита процесса.";

const MAIN_SCENARIOS = [
  {
    title: "Запрос клиента → готовое КП",
    problem: "Клиент присылает PDF или Excel со списком товаров — менеджер вручную ищет позиции, сверяет цены и остатки в 1С и собирает документ.",
    steps: [
      "Распознаёт позиции из PDF, Excel или сообщения",
      "Создаёт или обновляет сделку в Битрикс24",
      "Проверяет цены и остатки в 1С или МойСклад",
      "Подбирает точный товар или аналог, отмечает отсутствующие позиции",
      "Формирует DOCX/PDF и прикрепляет к сделке",
    ],
    systems: "Битрикс24 · 1С · OCR · каталог · DOCX/PDF",
    result: "Менеджер проверяет готовый документ вместо ручного переноса данных между системами.",
  },
  {
    title: "AI-ассистент руководителя",
    problem: "Данные разбросаны по CRM, задачам, комментариям, телефонии и 1С — любой ответ требует ручного отчёта.",
    steps: [
      "Собирает цифры из CRM, задач и активностей",
      "Анализирует комментарии и транскрипты звонков",
      "Подтягивает дебиторскую задолженность из 1С",
      "Указывает источник и дату актуальности каждой цифры",
      "Формирует отчёт или задачу для руководителя",
    ],
    systems: "Битрикс24 · 1С · телефония · права доступа",
    result: "Руководитель получает ответ по фактическим данным без ручной сборки отчёта из CRM, Excel и учётной системы.",
  },
  {
    title: "Контроль звонков и следующий шаг",
    problem: "Руководитель не может прослушать все звонки, а стандартная транскрипция не отвечает на вопрос, хорошо ли прошёл разговор.",
    steps: [
      "Получает запись из телефонии и создаёт транскрипт",
      "Разделяет реплики клиента и менеджера",
      "Определяет потребность, бюджет, срок и возражения",
      "Проверяет соответствие скрипту, готовит сводку",
      "Заполняет поля Битрикс24 и предлагает следующий шаг",
    ],
    systems: "Битрикс24 · телефония · речевая аналитика",
    result: "Карточка сделки сама заполняется выводами из разговора — вместо ручного прослушивания записей.",
  },
  {
    title: "Документ → 1С → согласование в Битрикс24",
    problem: "Входящие счета, акты, спецификации и накладные сотрудник читает и вручную переносит в учётную систему.",
    steps: [
      "Классифицирует тип документа",
      "Извлекает контрагента, номер, дату, позиции и суммы",
      "Сверяет данные с контрагентом и заказом, находит расхождения",
      "Создаёт черновик документа в 1С со ссылкой на источник",
      "Создаёт задачу на согласование в Битрикс24",
    ],
    systems: "Битрикс24 · 1С · OCR · ЭДО",
    result: "AI извлекает и проверяет данные, а проведение документа остаётся за человеком или чёткими правилами.",
  },
];

const SMALL_SCENARIOS = [
  { title: "Реактивация старых лидов", text: "Сегментация базы, персональные сообщения и передача заинтересованных менеджеру." },
  { title: "Квалификация лидов", text: "AI ведёт первый диалог и передаёт в CRM заполненную карточку со scoring." },
  { title: "Следующий лучший шаг", text: "Анализ стадии, активности и возражений — подсказка менеджеру, а не автодействие." },
  { title: "Контроль качества данных CRM", text: "Поиск дублей, пустых полей и расхождений между стадией и реальным статусом." },
  { title: "Дебиторская задолженность", text: "Группировка по риску, напоминания клиенту и алерт менеджеру перед новой отгрузкой." },
  { title: "Поддержка и сервис", text: "Классификация обращений, история клиента, эскалация нетиповых случаев." },
  { title: "Тендеры и документация", text: "Разбор конкурсной документации, чек-лист требований, контроль комплектности." },
  { title: "Заказы с маркетплейсов", text: "Сверка остатков, задача на производство или закупку, обновление статуса в CRM." },
];

const EXPERTISE_POINTS = [
  "7 лет в AI и автоматизации бизнес-процессов",
  "12+ промышленных внедрений в проде, не демо",
  "Проектный опыт в решениях для сценариев Kaspersky, ELIA Suite",
  "Партнёр Yandex Cloud · партнёрская программа Selectel · технологический партнёр Cloud.ru",
  "Развёртывание в облаке или в вашем контуре (on-premise)",
  "Код, документация и передача решения команде — без вендор-лока",
];

const PRICING_TIERS = [
  { name: "Аудит интеграций", price: "от 150 000 ₽", note: "1–2 недели · карта процессов и точек потерь" },
  { name: "Внедрение", price: "от 500 000 ₽", note: "4–12 недель · интеграции, тестирование, запуск" },
  { name: "Сопровождение", price: "от 200 000 ₽/мес", note: "мониторинг, итерации, приоритетная поддержка" },
];

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

              <div className="mt-10 border border-hairline bg-surface-card p-6 md:p-8">
                <span className="meta-label text-muted">Как проходит запрос</span>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-4">
                  {FLOW_STEPS.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="border border-hairline-strong bg-canvas px-4 py-3 font-display text-sm text-ink">
                        {step}
                      </span>
                      {index < FLOW_STEPS.length - 1 ? (
                        <span aria-hidden className="text-muted-soft">
                          →
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {FLOW_STATUSES.map((status) => (
                    <span key={status} className="meta-label text-muted-soft">
                      · {status}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">До и после</span>
                <h2 className="section-title mt-4 max-w-2xl">Один и тот же запрос — два разных процесса</h2>
              </Reveal>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="border border-hairline bg-surface-card p-6">
                  <span className="meta-label text-muted-soft">Сейчас</span>
                  <ol className="mt-4 space-y-3">
                    {BEFORE_STEPS.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm text-body">
                        <span className="text-muted-soft">{index + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="border border-hairline-strong bg-canvas p-6">
                  <span className="meta-label text-accent">После внедрения</span>
                  <ol className="mt-4 space-y-3">
                    {AFTER_STEPS.map((step, index) => (
                      <li key={step} className="flex gap-3 text-sm text-body-strong">
                        <span className="text-accent">{index + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Отличие</span>
                <h2 className="section-title mt-4 max-w-2xl">
                  Встроенные роботы и BitrixGPT против выделенного внедрения
                </h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Стандартные инструменты закрывают типовые сценарии внутри CRM. Мы подключаемся там, где нужно
                  выйти за пределы платформы.
                </p>
              </Reveal>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-hairline-strong text-left">
                      <th className="py-3 pr-4 font-display font-medium text-muted">&nbsp;</th>
                      <th className="py-3 pr-4 font-display font-medium text-muted">Стандартные функции</th>
                      <th className="py-3 font-display font-medium text-ink">Выделенное внедрение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.label} className="border-b border-hairline">
                        <td className="py-4 pr-4 meta-label text-muted-soft">{row.label}</td>
                        <td className="py-4 pr-4 text-body">{row.standard}</td>
                        <td className="py-4 text-body-strong">{row.custom}</td>
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
                <span className="section-label">Реализованный проект</span>
                <h2 className="section-title mt-4 max-w-2xl">
                  AI-CRM для цветочного бизнеса: данные из МойСклад и рекомендации для роста продаж
                </h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Единая клиентская база, которая объединяет покупателей, заказы и каналы продаж из МойСклад и
                  других источников — не список карточек, а рабочий инструмент для поиска повторных продаж.
                </p>
              </Reveal>

              <div className="mt-8 border border-hairline-strong bg-canvas p-6">
                <span className="meta-label text-muted">Сценарий работы</span>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-4">
                  {FLOWER_CASE_FLOW.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="border border-hairline-strong bg-surface-card px-4 py-3 font-display text-sm text-ink">
                        {step}
                      </span>
                      {index < FLOWER_CASE_FLOW.length - 1 ? (
                        <span aria-hidden className="text-muted-soft">
                          →
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <span className="meta-label text-muted">Что было реализовано</span>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {FLOWER_CASE_BUILT.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-body">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-hairline pt-6">
                <p className="body-copy text-sm text-body-strong">
                  Результат: менеджер видит историю взаимодействия с клиентом, средний чек, последние покупки и
                  подходящий повод для следующего контакта — вместо разрозненного списка заказчиков.
                </p>
                <p className="mt-3 text-sm text-muted">kinetic-ai.ru · МойСклад · AI-сегментация · Telegram · WhatsApp · маркетплейсы</p>
              </div>

              <div className="mt-8 border border-hairline bg-surface-card p-6">
                <span className="meta-label text-muted">Аналогичный сценарий для Битрикс24 и amoCRM</span>
                <p className="body-copy mt-3 text-sm">
                  Эту архитектуру можно встроить в существующую CRM компании — без замены системы и без переноса
                  работы сотрудников в новый интерфейс:
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {FLOWER_TO_BITRIX_STEPS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-body">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="section-band border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Примеры решений</span>
                <h2 className="section-title mt-4 max-w-2xl">Типовые сценарии для Битрикс24 и amoCRM</h2>
                <p className="body-copy mt-4 max-w-2xl">
                  Технически реализуемо через REST API, вебхуки, ботов и обмен данными с 1С и МойСклад. Точная
                  архитектура и эффект уточняются после аудита конкретного процесса.
                </p>
              </Reveal>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {MAIN_SCENARIOS.map((item) => (
                  <div key={item.title} className="border border-hairline bg-surface-card p-6">
                    <h3 className="card-title text-lg">{item.title}</h3>
                    <p className="body-copy mt-2 text-sm text-muted">{item.problem}</p>
                    <ul className="mt-4 space-y-2">
                      {item.steps.map((step) => (
                        <li key={step} className="flex items-start gap-2 text-sm text-body">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {step}
                        </li>
                      ))}
                    </ul>
                    <p className="meta-label mt-4 text-muted-soft">{item.systems}</p>
                    <p className="body-copy mt-3 text-sm text-body-strong">{item.result}</p>
                    <p className="mt-3 text-xs text-muted-soft">{SCENARIO_DISCLAIMER}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {SMALL_SCENARIOS.map((item) => (
                  <div key={item.title} className="border border-hairline px-5 py-4">
                    <h4 className="font-display text-sm text-ink">{item.title}</h4>
                    <p className="body-copy mt-1 text-sm text-muted">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-muted-soft">{SCENARIO_DISCLAIMER}</p>
            </div>
          </section>

          <section className="section-band section--panel border-b border-hairline">
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

          <section className="section-band border-b border-hairline">
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

          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-4xl">
              <Reveal>
                <span className="section-label">Проект ведёт AI-архитектор лично</span>
                <h2 className="section-title mt-4 max-w-2xl">Опыт, а не подрядчик на аутсорсе</h2>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {EXPERTISE_POINTS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-body">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 grid gap-4 border-t border-hairline pt-8 sm:grid-cols-3">
                {PRICING_TIERS.map((tier) => (
                  <div key={tier.name} className="home-hub-card">
                    <span className="meta-label text-muted">{tier.name}</span>
                    <p className="card-title mt-2 text-xl text-ink">{tier.price}</p>
                    <p className="body-copy mt-2 text-sm">{tier.note}</p>
                  </div>
                ))}
              </div>
              <p className="body-copy mt-6 text-sm text-muted">
                Стоимость аудита засчитывается в бюджет внедрения, если продолжаем.
              </p>
            </div>
          </section>

          <section id="contact" className="section-band">
            <div className="container-editorial max-w-2xl">
              <Reveal>
                <span className="section-label">Контакт</span>
                <h2 className="section-title mt-4">Разберём ваш контур CRM за один звонок</h2>
                <p className="body-copy mt-4">
                  Битрикс24, amoCRM, 1С, телефония или документы — опишите задачу. Вернёмся с архитектурой,
                  оценкой и планом в течение суток.
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
