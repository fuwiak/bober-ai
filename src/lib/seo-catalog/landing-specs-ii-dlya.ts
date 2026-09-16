import type { LandingSpec, LocaleCopy } from "@/lib/seo-catalog/types";

const IMG = {
  architecture: "/diagrams/system-architecture.svg",
  crm: "/diagrams/crm-integration.svg",
  sales: "/diagrams/sales-pipeline.svg",
  workflow: "/diagrams/workflow-automation.svg",
  docs: "/diagrams/document-flow.svg",
} as const;

/**
 * Wordstat 2026-09-16 (data/wordstat-ai-it-buy-2026-09.csv): exact Cyrillic
 * «ии для <функция/отрасль>» queries. Industry hubs (/industries/*) use Latin
 * «ai для …» H1s; these pages target the Cyrillic phrase with a concrete
 * function-level scenario, price and pilot.
 */
const RELATED = [
  { href: "/ai/ii-dlya-yuristov", labelRu: "ИИ для юристов", labelEn: "AI for lawyers" },
  { href: "/ai/ii-dlya-buhgalterii", labelRu: "ИИ для бухгалтерии", labelEn: "AI for accounting" },
  { href: "/ai/ii-dlya-hr", labelRu: "ИИ для HR", labelEn: "AI for HR" },
  { href: "/ai/ii-dlya-marketinga", labelRu: "ИИ для маркетинга", labelEn: "AI for marketing" },
  { href: "/ai/ii-dlya-nedvizhimosti", labelRu: "ИИ для недвижимости", labelEn: "AI for real estate" },
  { href: "/ai/ii-dlya-internet-magazina", labelRu: "ИИ для интернет-магазина", labelEn: "AI for e-commerce" },
  { href: "/ai/ii-dlya-stroitelstva", labelRu: "ИИ для строительства", labelEn: "AI for construction" },
  { href: "/ai/ii-dlya-proizvodstva", labelRu: "ИИ для производства", labelEn: "AI for manufacturing" },
  { href: "/ai/ii-dlya-logistiki", labelRu: "ИИ для логистики", labelEn: "AI for logistics" },
  { href: "/ai/ii-dlya-kliniki", labelRu: "ИИ для клиники", labelEn: "AI for clinics" },
  { href: "/ai/ii-assistent-dlya-rukovoditelya", labelRu: "ИИ-ассистент руководителя", labelEn: "AI assistant for executives" },
  { href: "/ai/vnedrenie-iskusstvennogo-intellekta-v-biznes", labelRu: "Внедрение ИИ в бизнес", labelEn: "AI implementation" },
  { href: "/ai/stoimost-vnedreniya-ii", labelRu: "Стоимость внедрения ИИ", labelEn: "AI implementation cost" },
  { href: "/pricing", labelRu: "Цены", labelEn: "Pricing" },
] as const;

function related(slug: string, extra: { href: string; labelRu: string; labelEn: string }[] = []) {
  const path = `/ai/${slug}`;
  const base = RELATED.filter((item) => item.href !== path).slice(0, 6).map((item) => ({ ...item }));
  return [...extra, ...base];
}

type Page = {
  slug: string;
  contentKey: string;
  coverImage: string;
  serviceSlug?: string;
  keywords: string[];
  caseStudySlugs?: string[];
  extraRelated?: { href: string; labelRu: string; labelEn: string }[];
  ru: LocaleCopy;
  en: LocaleCopy;
};

function page(def: Page): LandingSpec {
  return {
    category: "ai",
    slug: def.slug,
    contentKey: def.contentKey,
    cluster: "ai-industry",
    serviceSlug: def.serviceSlug ?? "enterprise-ai-assistant",
    coverImage: def.coverImage,
    keywords: def.keywords,
    caseStudySlugs: def.caseStudySlugs ?? ["kp-llm-automation", "kaspersky-ai-assistant"],
    related: related(def.slug, def.extraRelated),
    ru: def.ru,
    en: def.en,
  };
}

export const CATALOG_LANDING_SPECS_II_DLYA: LandingSpec[] = [
  page({
    slug: "ii-dlya-yuristov",
    contentKey: "iid_lawyers",
    coverImage: IMG.docs,
    serviceSlug: "document-processing",
    keywords: [
      "ии для юристов",
      "ии для юристов и адвокатов",
      "ии помощник для юриста",
      "ии ассистент для юриста",
      "ии агент для юриста",
      "ии для работы юриста",
      "нейросеть для юристов",
      "ии для юридического отдела",
    ],
    caseStudySlugs: ["kp-llm-automation", "kaspersky-ai-assistant"],
    extraRelated: [
      { href: "/industries/legal", labelRu: "Автоматизация юрфирмы", labelEn: "Law firm automation" },
      { href: "/automation/contract-approval", labelRu: "Согласование договоров", labelEn: "Contract approval" },
    ],
    ru: {
      h1: "ИИ для юристов: ассистент по договорам, практике и регламентам компании",
      subtitle:
        "Не «лучший ИИ для юристов» из списка, а рабочий ассистент юротдела: проверка договоров по чек-листу компании, поиск по своей базе и судебной практике, черновики документов с цитатами. Пилот 4–6 недель, от 300 000 ₽, данные не покидают контур.",
      problems: [
        "Юрист тратит 60% времени на типовые договоры и поиск «как мы уже делали»",
        "Публичные ИИ-сервисы для юристов не знают ваших шаблонов и позиций — и туда нельзя загружать договоры под NDA",
        "Согласование договора с бизнесом идёт неделями: правки теряются в почте и мессенджерах",
        "Новый юрист не знает регламентов и внутренних позиций компании — учится по чужим ошибкам",
      ],
      deliverables: [
        "Проверка входящих договоров по вашему чек-листу: риски, отклонения от шаблона, недостающие условия — с цитатой пункта",
        "Поиск по базе договоров, шаблонов, заключений и судебной практике с ответом «где это уже было»",
        "Черновики: протокол разногласий, претензия, ответ контрагенту, заключение — в стиле вашего отдела",
        "Развёртывание в контуре компании (on-premise или российское облако), права доступа, журнал запросов",
      ],
      intro: [
        "Запрос «ИИ для юристов» чаще всего означает поиск инструмента, который снимет рутину: первичная проверка договора, поиск по практике, черновик документа. Публичные сервисы дают общие ответы и не знают ваших шаблонов, а загружать в них договоры под NDA нельзя. Мы собираем ассистента на вашей базе.",
        "Как это устроено: RAG-индекс по вашим договорам, шаблонам, заключениям и выбранным источникам практики; языковая модель в закрытом контуре; интерфейс — веб, Telegram, Bitrix24 или плагин в Word. Каждый ответ содержит ссылку на пункт документа, а если источника нет — ассистент так и говорит.",
        "Типовой пилот для юротдела 3–10 человек: один сценарий (например, проверка договоров поставки по чек-листу), 4–6 недель, метрика — время первичной проверки и доля найденных рисков на контрольной выборке. Дальше — расширение на другие типы документов и согласование с бизнесом.",
      ],
      howWeSolve: [
        { title: "Аудит документов и сценариев", text: "Собираем типы договоров, чек-листы, шаблоны, частые вопросы бизнеса к юристам. Считаем, где ИИ окупится первым." },
        { title: "Пилот на одном сценарии", text: "Индекс, промпты, чек-лист, интерфейс. Тест на 50–100 реальных договорах вместе с юристами — до целевой точности." },
        { title: "Production и расширение", text: "Согласование с бизнесом в Bitrix24/ЭДО, новые типы документов, мониторинг качества, обучение отдела." },
      ],
      faq: [
        { q: "Какой ИИ лучше для юристов — готовый сервис или своя сборка?", a: "Готовый сервис подходит для общих вопросов по законодательству. Для работы с вашими договорами, шаблонами и позициями нужен ассистент на вашей базе в закрытом контуре — это и делаем." },
        { q: "Можно ли загружать договоры под NDA?", a: "Да: ассистент разворачивается on-premise или в российском облаке, данные не уходят вендорам моделей. Права доступа наследуются из вашей файловой системы или ЭДО." },
        { q: "Сколько стоит ИИ для юридического отдела?", a: "Пилот от 300 000 ₽ (один сценарий, одна база). Production с несколькими типами документов и интеграцией в ЭДО/Bitrix24 — от 600 000 ₽." },
        { q: "Заменит ли ИИ юриста?", a: "Нет. Ассистент делает первичную проверку и черновики, юрист принимает решение. Практика: −40–60% времени на типовые задачи." },
      ],
    },
    en: {
      h1: "AI for lawyers: an assistant for contracts, case law and company policies",
      subtitle: "A working legal-team assistant: contract checks against your checklist, search over your own base and case law, drafts with citations. Pilot in 4–6 weeks inside your perimeter.",
      problems: ["60% of time on routine contracts and “how did we do it before”", "Public AI tools do not know your templates and cannot take NDA documents", "Contract approval drags for weeks", "New lawyers learn policies by mistakes"],
      deliverables: ["Incoming contract check against your checklist with cited clauses", "Search over contracts, templates, opinions and case law", "Drafts: protocol of disagreements, claim, reply, opinion", "On-premise or Russian cloud, access rights, request log"],
      intro: ["“AI for lawyers” usually means removing routine: first-pass contract review, search, drafts. We build the assistant on your base.", "RAG index over your documents, LLM in a private contour, web/Telegram/Bitrix24/Word interface. Every answer cites a clause.", "Typical pilot: one scenario, 4–6 weeks, metric — review time and share of caught risks."],
      howWeSolve: [{ title: "Audit", text: "Contract types, checklists, templates, frequent questions." }, { title: "Pilot", text: "Index, prompts, checklist, test on 50–100 real contracts." }, { title: "Production", text: "Approval flow, more document types, monitoring, training." }],
      faq: [{ q: "Ready tool or custom build?", a: "Ready tools for general law; custom for your contracts and positions." }, { q: "NDA documents?", a: "Yes, on-premise or Russian cloud." }, { q: "Replace lawyers?", a: "No — first pass and drafts, lawyer decides." }],
    },
  }),
  page({
    slug: "ii-dlya-buhgalterii",
    contentKey: "iid_accounting",
    coverImage: IMG.docs,
    serviceSlug: "document-processing",
    keywords: [
      "ии для бухгалтерии",
      "ии для бухгалтера",
      "нейросеть для бухгалтерии",
      "ии в бухгалтерии",
      "автоматизация бухгалтерии с ии",
      "ии обработка первичных документов",
      "ии для 1с бухгалтерии",
    ],
    caseStudySlugs: ["invoice-processing-pipeline", "crm-1c-sync", "kp-llm-automation"],
    extraRelated: [
      { href: "/automation/ocr-data-extraction", labelRu: "Распознавание первички в 1С", labelEn: "Primary docs into 1C" },
      { href: "/automation/invoice-processing", labelRu: "Обработка счетов", labelEn: "Invoice processing" },
      { href: "/integrations/1c", labelRu: "Интеграция с 1С", labelEn: "1C integration" },
    ],
    ru: {
      h1: "ИИ для бухгалтерии: первичка в 1С без ручного ввода, сверка и ответы по регламентам",
      subtitle:
        "Распознавание счетов, актов, накладных и УПД → проверка → проведение в 1С. Ассистент по учётной политике и типовым вопросам сотрудников. Пилот 3–5 недель от 300 000 ₽.",
      problems: [
        "Бухгалтер вручную вбивает 300–2000 документов в месяц — ошибки в реквизитах, закрытие периода в авральном режиме",
        "Сотрудники задают одни и те же вопросы: «как оформить командировку», «какой документ нужен для подотчёта»",
        "Сканы и фото первички приходят в почту, WhatsApp и Telegram — часть теряется до бухгалтерии",
        "Готовые ИИ-сервисы «для бухгалтера» не встроены в вашу 1С и не знают вашей учётной политики",
      ],
      deliverables: [
        "OCR + LLM-извлечение реквизитов из счетов, актов, накладных, УПД, чеков — включая фото и сканы плохого качества",
        "Проверка: контрагент, ИНН, суммы, НДС, дубли; сомнительные документы — в очередь на ручную проверку",
        "Автосоздание документов в 1С:Бухгалтерия / 1С:ERP / 1С:УНФ через API или обработку; связь с ЭДО",
        "Ассистент по учётной политике и регламентам для сотрудников: ответы со ссылкой на документ, в Telegram или портале",
      ],
      intro: [
        "«ИИ для бухгалтерии» — это в первую очередь про первичку: 70–80% ручного труда бухгалтера уходит на ввод и сверку документов. Мы делаем конвейер: документ из почты, ЭДО, сканера или мессенджера распознаётся, проверяется и создаётся в 1С — бухгалтер только подтверждает спорные случаи.",
        "Второй сценарий — ассистент для сотрудников и бухгалтерии по регламентам: учётная политика, порядок подотчёта, командировки, документы для оплаты. Ответы с цитатой из вашего регламента, а не из интернета.",
        "Работаем с 1С:Бухгалтерия 8.3, 1С:ERP, 1С:УНФ, 1С:Комплексная, а также с Диадок и СБИС. Развёртывание on-premise или в российском облаке — данные контрагентов не уходят наружу.",
      ],
      howWeSolve: [
        { title: "Аудит потока документов", text: "Считаем объём первички по типам и каналам, долю ручного ввода, частые ошибки. Фиксируем смету и метрику." },
        { title: "Пилот: 1–2 типа документов", text: "Например, входящие счета и акты: распознавание, проверка, создание в 1С. Точность на контрольной выборке ≥ 95% по ключевым полям." },
        { title: "Production и ассистент", text: "Все типы документов, ЭДО, очередь проверки, отчёт о сэкономленных часах. Далее — ассистент по регламентам." },
      ],
      faq: [
        { q: "Сколько стоит ИИ для бухгалтерии?", a: "Пилот на 1–2 типах документов — от 300 000 ₽. Полный конвейер первички с ЭДО и несколькими юрлицами — от 500 000 ₽. Окупаемость при 500+ документах в месяц — 3–6 месяцев." },
        { q: "Подходит ли для 1С:Бухгалтерия базовой версии?", a: "Да, через обработку или обмен файлами; для ПРОФ/КОРП и ERP — через HTTP-сервисы 1С." },
        { q: "Чем это отличается от «1С:Распознавание документов»?", a: "Сервис 1С распознаёт типовые формы. Мы добавляем проверку по вашим правилам, работу с плохими сканами и фото, нетиповые документы и связку с ЭДО и мессенджерами." },
        { q: "Могут ли данные уйти во внешние модели?", a: "Нет: контур on-premise или российское облако, открытые модели. Внешние API — только по вашему решению." },
      ],
    },
    en: {
      h1: "AI for accounting: primary documents into 1C without manual entry",
      subtitle: "Recognition of invoices, acts, waybills and UPD → validation → posting in 1C. An assistant for accounting policy questions. Pilot in 3–5 weeks.",
      problems: ["300–2000 documents a month typed by hand", "Same employee questions every day", "Scans arrive by email, WhatsApp, Telegram and get lost", "Ready AI tools are not wired into your 1C"],
      deliverables: ["OCR + LLM extraction from invoices, acts, waybills, receipts", "Validation: counterparty, INN, amounts, VAT, duplicates", "Auto-created documents in 1C via API; e-doc link", "Policy assistant for employees with citations"],
      intro: ["AI for accounting is first of all about primary documents: 70–80% of manual work.", "Second scenario: a policy assistant for employees.", "1C Accounting 8.3, ERP, UNF; Diadoc, SBIS. On-premise or Russian cloud."],
      howWeSolve: [{ title: "Document flow audit", text: "Volume by type and channel, manual share, frequent errors." }, { title: "Pilot on 1–2 types", text: "Recognition, validation, creation in 1C, ≥95% accuracy on key fields." }, { title: "Production", text: "All types, e-doc, review queue, saved-hours report." }],
      faq: [{ q: "Cost?", a: "Pilot first; full pipeline with e-doc and several entities after." }, { q: "Basic 1C edition?", a: "Yes, via processing or file exchange." }, { q: "Data leaving?", a: "No — private contour, open models." }],
    },
  }),
  page({
    slug: "ii-dlya-hr",
    contentKey: "iid_hr",
    coverImage: IMG.workflow,
    keywords: [
      "ии для hr",
      "ии для эйчар",
      "ии для подбора персонала",
      "нейросеть для hr",
      "ии для рекрутинга",
      "ии для отдела кадров",
      "ии скрининг резюме",
      "ии для адаптации сотрудников",
    ],
    caseStudySlugs: ["kaspersky-ai-assistant", "elia-suite"],
    extraRelated: [
      { href: "/automation/hr", labelRu: "Автоматизация HR", labelEn: "HR automation" },
      { href: "/automation/resume-screening", labelRu: "Скрининг резюме", labelEn: "Resume screening" },
      { href: "/solutions/onboarding-bot", labelRu: "Бот адаптации", labelEn: "Onboarding bot" },
    ],
    ru: {
      h1: "ИИ для HR: скрининг резюме, бот адаптации и ассистент по кадровым регламентам",
      subtitle:
        "Три рабочих сценария: отбор откликов с hh.ru по вашим критериям, бот-наставник для новичков, ответы сотрудникам по отпускам, ДМС и регламентам. Пилот 3–5 недель от 300 000 ₽.",
      problems: [
        "Рекрутер просматривает 200–500 откликов на вакансию, 80% — мимо критериев",
        "Новичок первые две недели дёргает коллег вопросами, которые есть в регламентах",
        "HR отвечает на одни и те же вопросы про отпуск, справки, ДМС — вместо работы с людьми",
        "Готовые «ИИ для HR» не знают ваших вакансий, регламентов и не встроены в hh.ru / Bitrix24 / 1С:ЗУП",
      ],
      deliverables: [
        "Скрининг откликов: оценка резюме по критериям вакансии, ранжирование, черновик отказа/приглашения — в hh.ru, Хантфлоу или Bitrix24",
        "Бот адаптации в Telegram / портале: план первой недели, ответы по регламентам, эскалация HR",
        "Ассистент по кадровым вопросам: отпуск, больничный, справки, ДМС — с цитатой из ЛНА, интеграция с 1С:ЗУП",
        "Аналитика: воронка найма, время закрытия вакансии, частые вопросы сотрудников",
      ],
      intro: [
        "«ИИ для HR» окупается там, где есть поток: отклики на вакансии, вопросы сотрудников, адаптация новых людей. Мы не продаём HR-платформу — встраиваем ИИ в ваш стек: hh.ru, Хантфлоу, Bitrix24, 1С:ЗУП, Telegram.",
        "Скрининг работает по вашим критериям: обязательные навыки, опыт, локация, стоп-факторы. Ассистент не принимает решение, а ранжирует и объясняет, почему кандидат подходит — рекрутер смотрит топ-20 вместо 300.",
        "Ассистент по регламентам и бот адаптации строятся на RAG-индексе по вашим ЛНА и инструкциям; персональные данные не покидают контур компании.",
      ],
      howWeSolve: [
        { title: "Аудит HR-потоков", text: "Объём откликов, вопросов, новичков в месяц; где теряется больше всего часов. Выбираем один сценарий для пилота." },
        { title: "Пилот", text: "Например, скрининг на 2–3 вакансиях: критерии, интеграция с hh.ru/Хантфлоу, сравнение с ручной оценкой рекрутера." },
        { title: "Production", text: "Все вакансии, бот адаптации, ассистент по регламентам, аналитика. Обучение HR-команды." },
      ],
      faq: [
        { q: "Сколько стоит ИИ для HR-отдела?", a: "Пилот одного сценария — от 300 000 ₽. Три сценария (скрининг, адаптация, ассистент) — от 700 000 ₽." },
        { q: "Как с персональными данными?", a: "Обработка в контуре компании (on-premise или российское облако), доступ по ролям, журнал запросов. Соответствие 152-ФЗ — на стороне процесса, помогаем оформить." },
        { q: "Не будет ли ИИ дискриминировать кандидатов?", a: "Критерии задаёте вы, ассистент объясняет каждую оценку, решение принимает рекрутер. Чувствительные признаки исключаются из оценки." },
      ],
    },
    en: {
      h1: "AI for HR: resume screening, onboarding bot and HR policy assistant",
      subtitle: "Three working scenarios: screening hh.ru replies by your criteria, a mentor bot for newcomers, answers on leave, insurance and policies. Pilot in 3–5 weeks.",
      problems: ["200–500 replies per vacancy, 80% off-criteria", "Newcomers ask what is already in policies", "HR answers the same questions daily", "Ready tools are not wired into hh.ru / Bitrix24 / 1C"],
      deliverables: ["Screening: scoring, ranking, drafts in hh.ru, Huntflow or Bitrix24", "Onboarding bot in Telegram / portal", "HR assistant with policy citations, 1C ZUP integration", "Hiring funnel analytics"],
      intro: ["AI for HR pays off where there is volume.", "Screening by your criteria; the recruiter sees the top 20 instead of 300.", "Policy assistant built on a RAG index of your internal documents; personal data stays inside."],
      howWeSolve: [{ title: "HR flow audit", text: "Volumes, hours lost, one scenario for the pilot." }, { title: "Pilot", text: "Screening on 2–3 vacancies compared with manual scoring." }, { title: "Production", text: "All vacancies, onboarding bot, assistant, analytics." }],
      faq: [{ q: "Cost?", a: "Pilot for one scenario first; three scenarios after." }, { q: "Personal data?", a: "Processed inside your perimeter with role access." }, { q: "Bias?", a: "You set criteria, the assistant explains, the recruiter decides." }],
    },
  }),
  page({
    slug: "ii-dlya-marketinga",
    contentKey: "iid_marketing",
    coverImage: IMG.sales,
    serviceSlug: "sales-ai-agent",
    keywords: [
      "ии для маркетинга",
      "ии для маркетолога",
      "нейросеть для маркетинга",
      "ии в маркетинге для бизнеса",
      "ии для контента",
      "ии для рекламы",
      "ии аналитика маркетинга",
      "ии для лидогенерации",
    ],
    caseStudySlugs: ["ai-sales-loop", "kp-llm-automation", "support-knowledge-base"],
    extraRelated: [
      { href: "/integrations/crm-marketing-automation", labelRu: "Маркетинг в CRM", labelEn: "CRM marketing" },
      { href: "/integrations/roistat", labelRu: "Сквозная аналитика Roistat", labelEn: "Roistat analytics" },
      { href: "/automation/lead-routing", labelRu: "Обработка лидов", labelEn: "Lead routing" },
    ],
    ru: {
      h1: "ИИ для маркетинга: квалификация лидов, контент по брендбуку и отчёты из CRM и рекламы",
      subtitle:
        "Не генератор постов, а ИИ-слой в маркетинговом процессе: лид из рекламы квалифицируется и попадает в CRM с оценкой, контент собирается по вашему тону и продуктам, отчёт по CAC/ROI приходит сам. Пилот 3–5 недель от 300 000 ₽.",
      problems: [
        "Лиды из Директа, VK и Авито падают в CRM без квалификации — менеджеры звонят всем подряд",
        "Контент пишется вручную и не в тоне бренда; ChatGPT выдаёт «воду» без знания продукта",
        "Отчёт по каналам собирается в Excel раз в месяц — решения по бюджету запаздывают",
        "Маркетинг и продажи спорят о качестве лидов, а единой оценки нет",
      ],
      deliverables: [
        "ИИ-квалификация лидов: оценка по анкете, сайту и переписке, приоритет в amoCRM/Bitrix24, автоответ в мессенджере за минуту",
        "Контент-ассистент на вашей базе: продукты, кейсы, брендбук, tone of voice — черновики статей, писем, карточек, объявлений",
        "Автоотчёт по каналам из Директа, Метрики, Roistat и CRM: CPL, CAC, ROI, конверсия по менеджерам — в Telegram каждую неделю",
        "Персонализация: сегменты, триггерные письма и сообщения по поведению в CRM",
      ],
      intro: [
        "«ИИ для маркетинга» в 2026 году — это не «нейросеть напишет пост». Реальный эффект даёт ИИ в процессе: квалификация и первый ответ лиду за минуту, контент на базе ваших материалов, автоматическая аналитика вместо ручного Excel.",
        "Мы собираем ИИ-слой поверх вашего стека — amoCRM, Bitrix24, Яндекс Директ, Метрика, Roistat, Telegram, email-рассылки. Контент-ассистент индексирует ваши продукты, кейсы и брендбук, поэтому пишет о вашем продукте, а не о «решениях для бизнеса» вообще.",
        "Пилот: один сценарий, например, квалификация лидов с автоответом. Метрика — время первого ответа, доля квалифицированных лидов, конверсия в встречу. Дальше — контент и отчётность.",
      ],
      howWeSolve: [
        { title: "Аудит воронки и контента", text: "Откуда приходят лиды, как обрабатываются, что пишется вручную, какие отчёты нужны. Считаем эффект, фиксируем смету." },
        { title: "Пилот на одном сценарии", text: "Квалификация лидов или контент-ассистент: интеграции, промпты на ваших данных, сравнение с текущим процессом." },
        { title: "Масштабирование", text: "Все каналы, автоотчёты, персонализация, обучение команды маркетинга и продаж." },
      ],
      faq: [
        { q: "Сколько стоит ИИ для отдела маркетинга?", a: "Пилот от 300 000 ₽ (один сценарий). Полный контур квалификация + контент + отчётность — от 600 000 ₽." },
        { q: "Какие нейросети используете?", a: "По задаче и политике данных: YandexGPT, GigaChat, открытые модели в контуре или зарубежные API, если данные это позволяют." },
        { q: "Заменит ли это маркетолога?", a: "Нет: ИИ снимает рутину — ответы лидам, черновики, отчёты. Стратегию, креатив и бюджет ведёт человек." },
      ],
    },
    en: {
      h1: "AI for marketing: lead qualification, on-brand content and reports from CRM and ads",
      subtitle: "An AI layer in the marketing process: leads are qualified into CRM with a score, content follows your tone and products, CAC/ROI reports arrive on their own. Pilot in 3–5 weeks.",
      problems: ["Leads land in CRM unqualified", "Content is off-brand; ChatGPT does not know the product", "Channel reports once a month in Excel", "Marketing and sales argue about lead quality"],
      deliverables: ["AI lead qualification with a reply within a minute", "Content assistant on your products, cases and brand book", "Weekly channel report from Direct, Metrica, Roistat and CRM", "Behaviour-based personalisation"],
      intro: ["AI for marketing in 2026 is AI inside the process, not a post generator.", "We build the layer over your stack: amoCRM, Bitrix24, Yandex Direct, Metrica, Roistat, Telegram, email.", "Pilot: one scenario, metric — first response time, qualified share, meeting conversion."],
      howWeSolve: [{ title: "Funnel and content audit", text: "Sources, handling, manual content, reports needed." }, { title: "Pilot", text: "Lead qualification or content assistant vs current process." }, { title: "Scale", text: "All channels, reports, personalisation, training." }],
      faq: [{ q: "Cost?", a: "Pilot first, full contour after." }, { q: "Which models?", a: "YandexGPT, GigaChat, open models or foreign APIs per data policy." }, { q: "Replace marketers?", a: "No — routine only." }],
    },
  }),
  page({
    slug: "ii-dlya-nedvizhimosti",
    contentKey: "iid_real_estate",
    coverImage: IMG.crm,
    serviceSlug: "sales-ai-agent",
    keywords: [
      "ии для недвижимости",
      "ии для агентства недвижимости",
      "ии для риэлторов",
      "нейросеть для недвижимости",
      "ии для застройщика",
      "ии бот для недвижимости",
      "ии обработка заявок недвижимость",
    ],
    caseStudySlugs: ["ai-sales-loop", "yandex-telemost-agent"],
    extraRelated: [
      { href: "/industries/real-estate", labelRu: "Автоматизация агентства недвижимости", labelEn: "Real estate automation" },
      { href: "/integrations/avito-leads", labelRu: "Заявки с Авито в CRM", labelEn: "Avito leads into CRM" },
      { href: "/integrations/telephony-ai", labelRu: "ИИ в телефонии", labelEn: "AI telephony" },
    ],
    ru: {
      h1: "ИИ для недвижимости: ответ на заявку за минуту, подбор объектов и контроль звонков риэлторов",
      subtitle:
        "Для агентств и застройщиков: ИИ-ассистент отвечает на заявки с Авито, ЦИАН, сайта и мессенджеров, квалифицирует клиента, подбирает объекты из базы и передаёт в amoCRM/Bitrix24. Речевая аналитика звонков. Пилот 3–5 недель от 300 000 ₽.",
      problems: [
        "Заявка с Авито или ЦИАН ждёт ответа 2 часа — клиент уже у конкурента",
        "Риэлторы ведут клиентов в личных телефонах, воронка в CRM не заполняется",
        "Подбор объектов по запросу занимает у менеджера 30–60 минут, ответ шаблонный",
        "РОП не слышит звонки: скрипт не соблюдается, возражения не отрабатываются",
      ],
      deliverables: [
        "ИИ-ассистент первого контакта: Авито, ЦИАН, сайт, WhatsApp, Telegram — ответ, квалификация (бюджет, район, срок), запись на показ",
        "Подбор объектов из вашей базы (CRM, фид, Excel) по параметрам и по тексту запроса, карточки с фото и ссылками",
        "Речевая аналитика звонков риэлторов: соблюдение скрипта, возражения, следующий шаг — отчёт РОПу",
        "Интеграция с amoCRM/Bitrix24, телефонией, Авито/ЦИАН; сделка создаётся автоматически со всей историей",
      ],
      intro: [
        "«ИИ для недвижимости» решает три задачи: скорость первого ответа, качество квалификации и контроль риэлторов. Клиент оставляет 3–5 заявок в разные агентства — выигрывает тот, кто ответил первым и по делу.",
        "Ассистент отвечает в канале, где пришла заявка, уточняет бюджет, район, срок и цель, предлагает 3–5 объектов из вашей базы и записывает на показ в календарь риэлтора. Всё попадает в CRM: источник, переписка, оценка.",
        "Для застройщиков — сценарий с очередями на объекты, ипотечными вопросами и передачей в отдел продаж. Для агентств — вторичка, аренда, коммерческая. Модели работают в российском облаке; персональные данные клиентов не уходят наружу.",
      ],
      howWeSolve: [
        { title: "Аудит каналов и воронки", text: "Откуда заявки, время ответа, как ведутся сделки, какие звонки стоит слушать. Смета и метрика пилота." },
        { title: "Пилот: ассистент первого контакта", text: "1–2 канала (например, Авито + сайт), квалификация, подбор, запись на показ. Метрика — время ответа и конверсия в показ." },
        { title: "Production", text: "Все каналы, речевая аналитика, отчёты РОПу, обучение риэлторов." },
      ],
      faq: [
        { q: "Сколько стоит ИИ для агентства недвижимости?", a: "Пилот от 300 000 ₽. Полный контур с речевой аналитикой — от 600 000 ₽. Для агентства из 10+ риэлторов окупается за 2–4 месяца по приросту показов." },
        { q: "Работает ли с ЦИАН и Авито?", a: "Да: заявки и сообщения из Авито Pro и ЦИАН попадают в ассистента и CRM. Для других площадок — через почту или API." },
        { q: "Клиент поймёт, что отвечает бот?", a: "Ассистент представляется как помощник агентства и передаёт риэлтору по первому запросу. Практика: конверсия в показ выше, чем при ответе через 2 часа." },
      ],
    },
    en: {
      h1: "AI for real estate: reply within a minute, property matching and call control",
      subtitle: "For agencies and developers: an AI assistant answers Avito, CIAN, website and messenger enquiries, qualifies, matches properties and hands over to amoCRM/Bitrix24. Pilot in 3–5 weeks.",
      problems: ["Enquiries wait 2 hours", "Agents keep clients in personal phones", "Property matching takes 30–60 minutes", "Sales head does not hear the calls"],
      deliverables: ["First-contact assistant across channels with qualification and viewing booking", "Property matching from your base", "Call analytics for agents", "CRM, telephony, Avito/CIAN integration"],
      intro: ["Three tasks: response speed, qualification quality, agent control.", "The assistant replies in the same channel, qualifies, offers 3–5 properties, books a viewing; everything goes to CRM.", "Developer and agency scenarios; models in Russian cloud."],
      howWeSolve: [{ title: "Channel and funnel audit", text: "Sources, response time, deals, calls." }, { title: "Pilot", text: "First-contact assistant on 1–2 channels." }, { title: "Production", text: "All channels, call analytics, reports, training." }],
      faq: [{ q: "Cost?", a: "Pilot first; full contour with call analytics after." }, { q: "CIAN and Avito?", a: "Yes." }, { q: "Will clients notice a bot?", a: "It introduces itself as an assistant and hands over on request." }],
    },
  }),
  page({
    slug: "ii-dlya-internet-magazina",
    contentKey: "iid_ecommerce",
    coverImage: IMG.crm,
    serviceSlug: "sales-ai-agent",
    keywords: [
      "ии для интернет магазина",
      "ии для интернет-магазина",
      "нейросеть для интернет магазина",
      "ии консультант для интернет магазина",
      "ии для маркетплейсов",
      "ии описания товаров",
      "ии поддержка интернет магазина",
    ],
    caseStudySlugs: ["erp-moysklad-chatgpt-ux", "crm-1c-sync", "ai-sales-loop"],
    extraRelated: [
      { href: "/industries/ecommerce", labelRu: "Автоматизация e-commerce", labelEn: "E-commerce automation" },
      { href: "/solutions/erp-moysklad", labelRu: "МойСклад + ИИ", labelEn: "MoySklad + AI" },
      { href: "/automation/order-processing", labelRu: "Обработка заказов", labelEn: "Order processing" },
    ],
    ru: {
      h1: "ИИ для интернет-магазина: консультант по каталогу, поддержка «где мой заказ» и карточки товаров",
      subtitle:
        "ИИ-консультант на сайте и в мессенджерах отвечает по вашему каталогу и остаткам, закрывает 60–80% обращений в поддержку, генерирует описания и характеристики для сайта и маркетплейсов. Интеграция с 1С, МойСклад, Bitrix, InSales, Ozon/WB. Пилот от 300 000 ₽.",
      problems: [
        "Поддержка отвечает на «где заказ», «есть ли размер», «как вернуть» по 200 раз в день",
        "Консультант в чате не знает остатков и характеристик — отправляет «уточню у менеджера»",
        "Карточки на 5 000 SKU заполняются вручную, описания одинаковые, на маркетплейсах — штрафы за незаполненность",
        "Отзывы и вопросы на Ozon/WB остаются без ответа днями",
      ],
      deliverables: [
        "ИИ-консультант по каталогу: подбор, характеристики, остатки, доставка — на сайте, в Telegram/WhatsApp/VK, с передачей оператору",
        "Поддержка: статус заказа из 1С/МойСклад/CMS, возвраты, оплата — ответы по вашим правилам, создание тикета в CRM",
        "Генерация карточек: описания, характеристики, SEO-тексты по вашим шаблонам и данным поставщика; выгрузка на сайт и маркетплейсы",
        "Ответы на отзывы и вопросы на Ozon/Wildberries по тону бренда с модерацией",
      ],
      intro: [
        "«ИИ для интернет-магазина» окупается на двух потоках: обращения покупателей и контент каталога. Первое — деньги поддержки и конверсия, второе — часы контент-менеджеров и позиции на маркетплейсах.",
        "Консультант работает на RAG-индексе по каталогу и правилам магазина и получает данные из вашей системы учёта в реальном времени: остатки, статус заказа, трек-номер. Не «чат-бот по кнопкам», а ответ на вопрос, заданный своими словами.",
        "Стек: 1С-Битрикс, InSales, Tilda, WooCommerce, 1С:УНФ/УТ, МойСклад, RetailCRM, Bitrix24, Ozon и Wildberries API. Развёртывание в российском облаке.",
      ],
      howWeSolve: [
        { title: "Аудит обращений и каталога", text: "Категории вопросов, доля типовых, качество карточек, интеграции. Считаем эффект в часах и конверсии." },
        { title: "Пилот", text: "Консультант + поддержка на одном канале (сайт или Telegram) с данными из учёта. Метрика — доля закрытых без оператора и CSAT." },
        { title: "Production", text: "Все каналы, маркетплейсы, генерация карточек, отчёты. Обучение команды поддержки и контента." },
      ],
      faq: [
        { q: "Сколько стоит ИИ-консультант для интернет-магазина?", a: "Пилот от 300 000 ₽ (один канал, каталог, статус заказа). Полный контур с маркетплейсами и генерацией карточек — от 600 000 ₽." },
        { q: "Не будет ли ИИ обещать то, чего нет на складе?", a: "Ответы строятся только на данных из учёта и ваших правил. Если данных нет — ассистент переводит на оператора." },
        { q: "Подходит для маленького магазина?", a: "От ~500 обращений или 1 000 SKU в месяц эффект уже заметен. Меньше — предложим готовые инструменты вместо внедрения." },
      ],
    },
    en: {
      h1: "AI for e-commerce: catalogue consultant, order support and product cards",
      subtitle: "An AI consultant answers from your catalogue and stock, closes 60–80% of support requests, generates product descriptions for the site and marketplaces. 1C, MoySklad, Bitrix, InSales, Ozon/WB.",
      problems: ["“Where is my order” 200 times a day", "Chat consultant does not know stock", "5,000 SKUs filled by hand", "Marketplace reviews unanswered for days"],
      deliverables: ["Catalogue consultant on site and messengers", "Support with live order status", "Product card generation for site and marketplaces", "Review replies on Ozon/Wildberries"],
      intro: ["Two flows pay off: customer requests and catalogue content.", "RAG over catalogue and rules plus live data from your inventory system.", "Bitrix, InSales, Tilda, WooCommerce, 1C, MoySklad, RetailCRM, Ozon and WB APIs."],
      howWeSolve: [{ title: "Audit", text: "Question categories, card quality, integrations." }, { title: "Pilot", text: "Consultant + support on one channel with live data." }, { title: "Production", text: "All channels, marketplaces, cards, reports." }],
      faq: [{ q: "Cost?", a: "Pilot first; full contour after." }, { q: "Will it promise missing stock?", a: "Answers are grounded in inventory data; otherwise it hands over." }, { q: "Small shops?", a: "From ~500 requests or 1,000 SKUs a month." }],
    },
  }),
  page({
    slug: "ii-dlya-stroitelstva",
    contentKey: "iid_construction",
    coverImage: IMG.docs,
    serviceSlug: "document-processing",
    keywords: [
      "ии для строительства",
      "ии в строительстве",
      "ии для строительной компании",
      "нейросеть для строительства",
      "ии для сметчика",
      "ии для стройки",
      "ии для застройщика документы",
      "ии обработка смет и кс-2",
    ],
    caseStudySlugs: ["kp-llm-automation", "elia-suite"],
    extraRelated: [
      { href: "/industries/construction", labelRu: "Автоматизация строительства", labelEn: "Construction automation" },
      { href: "/automation/field-reports", labelRu: "Отчёты с объектов", labelEn: "Field reports" },
      { href: "/automation/contract-registry", labelRu: "Реестр договоров", labelEn: "Contract registry" },
    ],
    ru: {
      h1: "ИИ для строительства: сметы, КС-2/КС-3, тендерная документация и отчёты с объектов",
      subtitle:
        "Для генподрядчиков, застройщиков и субподрядчиков: ИИ разбирает тендерную документацию и ТЗ, сверяет сметы с актами, собирает отчёты с объектов из фото и голосовых сообщений прорабов. Пилот 4–6 недель от 300 000 ₽.",
      problems: [
        "Сметчик неделю читает 800 страниц тендерной документации, чтобы понять объёмы и риски",
        "КС-2 не бьётся со сметой и с фактом на объекте — споры с заказчиком на закрытии",
        "Прорабы отчитываются голосовыми и фото в WhatsApp — в офисе никто не сводит это в журнал работ",
        "Договоры с 50 субподрядчиками: сроки, гарантии, штрафы — в разных папках, контроль вручную",
      ],
      deliverables: [
        "Разбор тендерной документации: объёмы, требования, риски, вопросы заказчику — таблица за часы вместо недели",
        "Сверка смет с КС-2/КС-3 и фактом: расхождения по позициям, объёмам, ценам — отчёт для ПТО и заказчика",
        "Отчёты с объектов: голосовые, фото и сообщения прорабов → журнал работ, задачи, отклонения от графика",
        "Реестр договоров с субподрядчиками: сроки, гарантии, штрафные санкции, напоминания; интеграция с 1С и Bitrix24",
      ],
      intro: [
        "«ИИ для строительства» в 2026 году — это в первую очередь документы: тендеры, сметы, акты, договоры, журналы. Именно там строительная компания теряет больше всего инженерных часов и денег на закрытии.",
        "Мы делаем ассистентов на ваших документах: модель читает ТЗ и сметы, сопоставляет позиции, находит расхождения и готовит таблицы для ПТО и сметчиков. Прорабы продолжают писать в мессенджер — ассистент превращает это в структурированный журнал.",
        "Работаем с Гранд-Смета, 1С:Подрядчик, 1С:ERP, Bitrix24, Excel, PDF и сканами. Развёртывание on-premise или в российском облаке; сметы и договоры не уходят наружу.",
      ],
      howWeSolve: [
        { title: "Аудит документооборота", text: "Какие документы, объёмы, кто и сколько часов тратит, где споры с заказчиком. Выбираем сценарий с максимальным эффектом." },
        { title: "Пилот", text: "Например, сверка смет с КС-2 на 3–5 объектах или разбор 10 тендеров. Точность и время — на реальных документах." },
        { title: "Production", text: "Все объекты, интеграция с 1С/Bitrix24, отчёты с объектов, реестр договоров. Обучение ПТО и сметчиков." },
      ],
      faq: [
        { q: "Сколько стоит внедрение ИИ в строительной компании?", a: "Пилот одного сценария — от 300 000 ₽. Контур из 2–3 сценариев (тендеры, сверка, отчёты) — от 700 000 ₽." },
        { q: "Понимает ли ИИ сметы в Гранд-Смете?", a: "Да: работаем с выгрузками XML/Excel из Гранд-Сметы и Smeta.ru, а также с PDF и сканами актов." },
        { q: "Нужен ли BIM?", a: "Нет, сценарии на документах работают без BIM. При наличии моделей — добавляем сверку объёмов с ними." },
      ],
    },
    en: {
      h1: "AI for construction: estimates, KS-2/KS-3, tender documents and site reports",
      subtitle: "For general contractors, developers and subcontractors: AI parses tender documents, reconciles estimates with acts, builds site reports from foremen’s photos and voice notes. Pilot in 4–6 weeks.",
      problems: ["A week reading 800 pages of tender documents", "KS-2 does not match the estimate", "Foremen report by voice in WhatsApp", "50 subcontractor contracts controlled by hand"],
      deliverables: ["Tender parsing: volumes, requirements, risks", "Estimate vs KS-2/KS-3 reconciliation", "Site reports from voice, photos and messages", "Subcontractor contract registry with 1C and Bitrix24"],
      intro: ["AI for construction is first of all documents.", "Assistants on your documents: read, match, find discrepancies, build tables.", "Grand-Smeta, 1C, Bitrix24, Excel, PDF, scans. On-premise or Russian cloud."],
      howWeSolve: [{ title: "Document flow audit", text: "Documents, volumes, hours, disputes." }, { title: "Pilot", text: "Reconciliation on 3–5 sites or 10 tenders." }, { title: "Production", text: "All sites, integrations, reports, registry." }],
      faq: [{ q: "Cost?", a: "Pilot first; 2–3 scenarios after." }, { q: "Grand-Smeta?", a: "Yes, via XML/Excel exports." }, { q: "BIM required?", a: "No." }],
    },
  }),
  page({
    slug: "ii-dlya-proizvodstva",
    contentKey: "iid_manufacturing",
    coverImage: IMG.workflow,
    keywords: [
      "ии для производства",
      "ии на производстве",
      "ии для производственной компании",
      "нейросеть для производства",
      "ии для завода",
      "ии в промышленности внедрение",
      "ии для планирования производства",
      "ии для отк",
    ],
    caseStudySlugs: ["elia-suite", "crm-1c-sync", "kp-llm-automation"],
    extraRelated: [
      { href: "/industries/manufacturing", labelRu: "Автоматизация производства", labelEn: "Manufacturing automation" },
      { href: "/integrations/erp-integration", labelRu: "Интеграция с ERP", labelEn: "ERP integration" },
      { href: "/automation/quality-checklists", labelRu: "Чек-листы качества", labelEn: "Quality checklists" },
    ],
    ru: {
      h1: "ИИ для производства: заявки и КП по спецификациям, планирование, ОТК и база знаний цеха",
      subtitle:
        "Для производственных компаний и заводов: ИИ читает заявки и чертежи клиентов, считает КП по спецификации, помогает планировать загрузку, фиксирует брак по фото и отвечает рабочим по техкартам. Интеграция с 1С:ERP/УПП, MES. Пилот 4–6 недель от 300 000 ₽.",
      problems: [
        "Заявка клиента — это письмо с чертежом и Excel; технолог и менеджер считают КП 2–3 дня",
        "Планирование загрузки в Excel: срывы сроков, простой оборудования, «горящие» заказы",
        "Брак фиксируется на бумаге, статистику по причинам никто не сводит",
        "Опытный мастер уходит — с ним уходят знания по наладке и техкартам",
      ],
      deliverables: [
        "Разбор входящих заявок: спецификация, чертежи, объёмы → нормы, себестоимость, КП из 1С за часы",
        "Ассистент планирования: загрузка участков, сроки, приоритеты, сценарии «что если» на данных ERP/MES",
        "ОТК и брак: фиксация по фото и голосу с участка, классификация причин, отчёт по сменам",
        "База знаний цеха: техкарты, инструкции, регламенты наладки — ответы рабочим в Telegram/терминале с цитатой",
      ],
      intro: [
        "«ИИ для производства» — не только компьютерное зрение на конвейере. Для средних предприятий быстрее всего окупаются офисные процессы вокруг цеха: расчёт заявок и КП, планирование, документация, обучение персонала.",
        "Мы начинаем с аудита: где теряются часы технологов и менеджеров, какие данные уже есть в 1С:ERP, УПП, MES или Excel. Потом — пилот на одном процессе с метрикой (время расчёта КП, точность плана, доля брака по причинам).",
        "Развёртывание on-premise или в российском облаке; чертежи, спецификации и себестоимость не покидают периметр предприятия. Партнёр Kaspersky для контуров с повышенными требованиями ИБ.",
      ],
      howWeSolve: [
        { title: "Аудит процессов", text: "Заявки, планирование, качество, знания: объёмы, часы, данные. Выбор сценария с быстрым ROI." },
        { title: "Пилот", text: "Например, расчёт КП по спецификациям: 50 реальных заявок, сравнение с расчётом технолога по времени и точности." },
        { title: "Production", text: "Интеграция с 1С:ERP/MES, остальные сценарии, обучение сотрудников, сопровождение." },
      ],
      faq: [
        { q: "Сколько стоит внедрение ИИ на производстве?", a: "Пилот от 300 000 ₽. Контур из нескольких сценариев с интеграцией в ERP — от 800 000 ₽. Крупные предприятия — по результатам аудита." },
        { q: "Нужно ли компьютерное зрение?", a: "Для ОТК по фото — да, используем открытые модели. Для заявок, планирования и базы знаний — нет, работают языковые модели на ваших данных." },
        { q: "Совместимо с 1С:ERP и УПП?", a: "Да, через HTTP-сервисы, обмены и COM; с MES — по API или через БД." },
      ],
    },
    en: {
      h1: "AI for manufacturing: quotes from specifications, planning, QC and a shop-floor knowledge base",
      subtitle: "For manufacturers and plants: AI reads customer requests and drawings, calculates quotes, helps plan capacity, logs defects from photos and answers workers from process sheets. 1C:ERP/MES integration.",
      problems: ["Quotes take 2–3 days", "Excel planning, missed deadlines", "Defects on paper", "Master leaves, knowledge leaves"],
      deliverables: ["Request parsing → norms, cost, quote from 1C in hours", "Planning assistant on ERP/MES data", "QC: defects from photo and voice, cause classification", "Shop-floor knowledge base with citations"],
      intro: ["Not only computer vision on the line: office processes around the shop pay off first.", "Audit → pilot on one process with a metric.", "On-premise or Russian cloud; Kaspersky partner."],
      howWeSolve: [{ title: "Process audit", text: "Requests, planning, quality, knowledge." }, { title: "Pilot", text: "Quotes on 50 real requests vs technologist." }, { title: "Production", text: "ERP/MES integration, more scenarios, training." }],
      faq: [{ q: "Cost?", a: "Pilot first; multi-scenario contour after." }, { q: "Computer vision?", a: "Only for QC by photo." }, { q: "1C:ERP?", a: "Yes." }],
    },
  }),
  page({
    slug: "ii-dlya-logistiki",
    contentKey: "iid_logistics",
    coverImage: IMG.workflow,
    keywords: [
      "ии для логистики",
      "ии в логистике",
      "ии для транспортной компании",
      "нейросеть для логистики",
      "ии для логистической компании",
      "ии обработка заявок на перевозку",
      "ии для экспедитора",
    ],
    caseStudySlugs: ["elia-suite", "support-knowledge-base"],
    extraRelated: [
      { href: "/industries/logistics", labelRu: "Автоматизация логистики", labelEn: "Logistics automation" },
      { href: "/industries/transport", labelRu: "Транспортные компании", labelEn: "Transport companies" },
      { href: "/automation/request-intake", labelRu: "Приём заявок", labelEn: "Request intake" },
    ],
    ru: {
      h1: "ИИ для логистики: заявки на перевозку из почты и мессенджеров в TMS, статусы клиентам и документы",
      subtitle:
        "Для транспортных компаний, экспедиторов и 3PL: ИИ разбирает заявки из писем, Excel и чатов, создаёт их в TMS/CRM, отвечает клиентам «где груз», проверяет ТТН и счета перевозчиков. Пилот 3–5 недель от 300 000 ₽.",
      problems: [
        "Заявки приходят письмами и в WhatsApp в свободной форме — логист вручную переносит в TMS 40–100 заявок в день",
        "Клиенты звонят «где груз» — диспетчер ищет по трекерам и чатам с водителями",
        "Документы перевозчиков (ТТН, счета, акты) сверяются вручную — ошибки и просрочки оплат",
        "Расчёт ставки по нестандартной заявке — 30 минут менеджера, ответ клиенту через час",
      ],
      deliverables: [
        "Разбор заявок из почты, Excel, Telegram/WhatsApp: маршрут, груз, сроки, требования → карточка в TMS/CRM/1С",
        "Ассистент для клиентов: статус груза из TMS и GPS, документы, ETA — в мессенджере и на портале",
        "Проверка документов перевозчиков: ТТН, счета, акты — сверка с заявкой, очередь на оплату",
        "Расчёт ставки: тарифы, история, рынок — черновик КП за минуты; интеграция с 1С:TMS, ABM, Bitrix24, amoCRM",
      ],
      intro: [
        "«ИИ для логистики» для среднего перевозчика или экспедитора — это прежде всего документооборот и коммуникации: заявки, статусы, документы. Здесь теряются часы логистов и диспетчеров и растёт дебиторка из-за ошибок в документах.",
        "Ассистент читает заявку в любом виде (письмо, таблица, голосовое), извлекает поля, сверяет с тарифами и создаёт заявку в вашей системе. Клиенту отвечает по статусу из TMS и трекеров, не отвлекая диспетчера.",
        "Стек: 1С:TMS, 1С:Управление автотранспортом, ABM Rinkai, Bitrix24, amoCRM, Excel, почта, мессенджеры, GPS-трекеры. Развёртывание в российском облаке или on-premise.",
      ],
      howWeSolve: [
        { title: "Аудит потоков", text: "Заявки, обращения, документы: объёмы, часы, ошибки. Выбираем сценарий пилота с прямым эффектом." },
        { title: "Пилот", text: "Например, разбор заявок из почты в TMS: 200 реальных заявок, точность полей, время обработки." },
        { title: "Production", text: "Все каналы, ассистент клиентов, проверка документов, расчёт ставок, обучение логистов." },
      ],
      faq: [
        { q: "Сколько стоит ИИ для транспортной компании?", a: "Пилот от 300 000 ₽. Полный контур заявки + статусы + документы — от 600 000 ₽. Окупаемость от 20+ заявок в день — 3–5 месяцев." },
        { q: "Интегрируется с нашей TMS?", a: "Да, если есть API или БД. 1С:TMS, УАТ, ABM — типовые интеграции; самописные — через API или обмен файлами." },
        { q: "Как ассистент узнаёт, где груз?", a: "Из TMS и GPS-трекеров по API; если данных нет — переводит на диспетчера с контекстом заявки." },
      ],
    },
    en: {
      h1: "AI for logistics: shipping requests from email and messengers into TMS, statuses and documents",
      subtitle: "For carriers, forwarders and 3PL: AI parses requests from emails, Excel and chats, creates them in TMS/CRM, answers “where is my cargo”, checks carrier documents. Pilot in 3–5 weeks.",
      problems: ["40–100 free-form requests a day typed into TMS", "“Where is my cargo” calls", "Carrier documents checked by hand", "30 minutes per rate calculation"],
      deliverables: ["Request parsing into TMS/CRM/1C", "Client assistant with status from TMS and GPS", "Carrier document checks", "Rate calculation and quotes"],
      intro: ["Documents and communications first.", "The assistant reads any request format, extracts fields, creates it in your system.", "1C:TMS, ABM, Bitrix24, amoCRM, email, messengers, GPS."],
      howWeSolve: [{ title: "Flow audit", text: "Requests, enquiries, documents." }, { title: "Pilot", text: "Email requests into TMS on 200 real cases." }, { title: "Production", text: "All channels, client assistant, documents, rates." }],
      faq: [{ q: "Cost?", a: "Pilot first; full contour after." }, { q: "Our TMS?", a: "Yes, via API or database." }, { q: "Cargo location?", a: "From TMS and GPS via API." }],
    },
  }),
  page({
    slug: "ii-dlya-kliniki",
    contentKey: "iid_clinic",
    coverImage: IMG.crm,
    keywords: [
      "ии для клиники",
      "ии для медицинского центра",
      "ии для стоматологии",
      "ии администратор клиники",
      "ии для записи пациентов",
      "нейросеть для клиники",
      "ии для медицины внедрение",
    ],
    caseStudySlugs: ["yandex-telemost-agent", "ai-sales-loop"],
    extraRelated: [
      { href: "/industries/medicine", labelRu: "Автоматизация клиники", labelEn: "Clinic automation" },
      { href: "/integrations/yclients", labelRu: "YCLIENTS", labelEn: "YCLIENTS" },
      { href: "/integrations/telephony-ai", labelRu: "ИИ в телефонии", labelEn: "AI telephony" },
    ],
    ru: {
      h1: "ИИ для клиники: запись пациентов 24/7, напоминания, ответы по услугам и контроль звонков администраторов",
      subtitle:
        "Для клиник, стоматологий и медцентров: ИИ-администратор отвечает в мессенджерах и по телефону, записывает в МИС/YCLIENTS, напоминает о приёме, снижает неявки. Речевая аналитика колл-центра. Пилот 3–5 недель от 300 000 ₽.",
      problems: [
        "Администраторы не успевают отвечать: 30% звонков в пиковые часы теряются, вечером и в выходные — никто не отвечает",
        "Пациенты спрашивают цены, подготовку к анализам, врачей — одни и те же 50 вопросов",
        "Неявки 15–25%: напоминания вручную или не делаются вовсе",
        "Главврач не слышит, как администраторы продают услуги и работают с возражениями",
      ],
      deliverables: [
        "ИИ-администратор: ответы по услугам, ценам, врачам, подготовке; запись и перенос приёма в МИС (1С:Медицина, Инфоклиника, Renovatio, IDENT, YCLIENTS)",
        "Каналы: сайт, Telegram, WhatsApp, VK, телефон (голосовой ассистент) — с передачей человеку по запросу",
        "Напоминания и подтверждения приёма, лист ожидания, повторные приёмы и профосмотры по расписанию",
        "Речевая аналитика звонков администраторов: скрипт, конверсия в запись, причины отказов — отчёт руководителю",
      ],
      intro: [
        "«ИИ для клиники» — это в первую очередь фронт-офис: запись, ответы, напоминания. Именно здесь теряются пациенты и деньги: неотвеченный звонок — это потерянный первичный приём стоимостью 3–15 тысяч рублей.",
        "Ассистент отвечает по вашей базе услуг и правил (подготовка, противопоказания, цены), проверяет расписание в МИС и записывает пациента. Медицинские вопросы не консультирует — переводит на врача или администратора.",
        "Персональные данные пациентов обрабатываются в контуре клиники или в российском облаке с учётом 152-ФЗ; модели не обучаются на ваших данных.",
      ],
      howWeSolve: [
        { title: "Аудит обращений", text: "Каналы, объём, потерянные звонки, типовые вопросы, неявки. Считаем стоимость потерь и эффект пилота." },
        { title: "Пилот", text: "ИИ-администратор на 1–2 каналах с записью в МИС и напоминаниями. Метрика — доля отвеченных обращений и неявки." },
        { title: "Production", text: "Телефон, все каналы, речевая аналитика, повторные приёмы, обучение администраторов." },
      ],
      faq: [
        { q: "Сколько стоит ИИ-администратор для клиники?", a: "Пилот от 300 000 ₽ (мессенджеры + запись в МИС). С голосовым ассистентом на телефоне и речевой аналитикой — от 600 000 ₽." },
        { q: "Совместимо с нашей МИС?", a: "1С:Медицина, Инфоклиника, Renovatio, IDENT, Medesk, YCLIENTS — типовые интеграции. Другие — через API." },
        { q: "Может ли ИИ давать медицинские рекомендации?", a: "Нет. Ассистент отвечает только по организационным вопросам и вашим утверждённым текстам; медицинские вопросы передаёт врачу." },
      ],
    },
    en: {
      h1: "AI for clinics: 24/7 booking, reminders, service answers and call control",
      subtitle: "For clinics, dental and medical centres: an AI receptionist answers in messengers and by phone, books into the HIS/YCLIENTS, sends reminders, cuts no-shows. Pilot in 3–5 weeks.",
      problems: ["30% of peak-hour calls lost", "Same 50 questions daily", "15–25% no-shows", "Head doctor does not hear the calls"],
      deliverables: ["AI receptionist with booking into HIS", "Site, Telegram, WhatsApp, VK, phone", "Reminders, confirmations, waiting list", "Call analytics for receptionists"],
      intro: ["Front office first: booking, answers, reminders.", "Grounded in your services and rules; no medical advice.", "Patient data inside the clinic perimeter or Russian cloud."],
      howWeSolve: [{ title: "Enquiry audit", text: "Channels, lost calls, no-shows." }, { title: "Pilot", text: "Receptionist on 1–2 channels with HIS booking." }, { title: "Production", text: "Phone, all channels, analytics." }],
      faq: [{ q: "Cost?", a: "Pilot first; voice and analytics after." }, { q: "Our HIS?", a: "Common ones are standard; others via API." }, { q: "Medical advice?", a: "No." }],
    },
  }),
  page({
    slug: "ii-assistent-dlya-rukovoditelya",
    contentKey: "iid_executive_assistant",
    coverImage: IMG.architecture,
    keywords: [
      "ии ассистент для руководителя",
      "ии помощник руководителя",
      "ии секретарь для бизнеса",
      "ии ассистент директора",
      "персональный ии ассистент для бизнеса",
      "ии для руководителя компании",
      "ии ассистент для собственника",
    ],
    caseStudySlugs: ["yandex-telemost-agent", "kaspersky-ai-assistant"],
    extraRelated: [
      { href: "/for-ceo", labelRu: "ИИ для CEO", labelEn: "AI for CEO" },
      { href: "/automation/meeting-notes", labelRu: "Протоколы встреч", labelEn: "Meeting notes" },
      { href: "/automation/ceo-dashboard", labelRu: "Дашборд руководителя", labelEn: "CEO dashboard" },
    ],
    ru: {
      h1: "ИИ-ассистент для руководителя: сводка по компании, протоколы встреч и ответы по данным CRM и 1С",
      subtitle:
        "Персональный ассистент собственника или директора в Telegram: утренняя сводка по продажам, деньгам и задачам, протоколы созвонов с поручениями в Bitrix24, ответы на вопросы «сколько мы продали в Казани» из CRM и 1С. Внедрение 3–5 недель от 300 000 ₽.",
      problems: [
        "Чтобы узнать цифры, руководитель ждёт отчёт от финдира или РОПа — данные приходят через день и в разных форматах",
        "После созвонов поручения теряются: никто не записал, кто и что должен сделать",
        "Почта, чаты, документы на согласование — 2–3 часа в день на разбор",
        "Готовые «ИИ-секретари» не подключены к вашей CRM, 1С и календарю — отвечают общими словами",
      ],
      deliverables: [
        "Утренняя сводка в Telegram: продажи, касса, дебиторка, просроченные задачи, ключевые сделки — из CRM, 1С и таск-трекера",
        "Протоколы встреч: транскрипт Телемоста/Zoom/Meet → решения, поручения, сроки → задачи в Bitrix24/Jira и напоминания",
        "Ответы на вопросы по данным: «маржа по направлению за квартал», «кто из клиентов не платил 60 дней» — с таблицей и источником",
        "Разбор входящих: приоритеты в почте, черновики ответов, документы на согласование с краткой выжимкой",
      ],
      intro: [
        "«ИИ-ассистент для руководителя» полезен только тогда, когда подключён к реальным данным компании. Мы делаем ассистента поверх вашей CRM, 1С, таск-трекера, календаря и почты — с правами доступа руководителя и без утечки данных наружу.",
        "Сценарий дня: в 8:30 сводка в Telegram; после созвона — протокол и поручения в Bitrix24; в любой момент — вопрос по данным своими словами и ответ с таблицей. Ассистент не «придумывает» цифры — только запрос к системам и цитата источника.",
        "Кейс — ИИ-агент для Яндекс Телемоста (протоколы и поручения) в портфолио. Развёртывание в российском облаке или on-premise; голос и переписка руководителя не покидают контур.",
      ],
      howWeSolve: [
        { title: "Интервью и доступы", text: "Какие вопросы руководитель задаёт чаще всего, какие отчёты ждёт, какие системы есть. Проектируем сводку и права доступа." },
        { title: "Внедрение", text: "Подключение CRM/1С/трекера/календаря, сводка, протоколы встреч, вопросы к данным. Тест на реальных встречах и отчётах." },
        { title: "Расширение", text: "Ассистенты для топ-команды (РОП, финдир, COO), дашборды, алерты по отклонениям." },
      ],
      faq: [
        { q: "Сколько стоит ИИ-ассистент руководителя?", a: "Внедрение для одного руководителя с подключением 2–3 систем — от 300 000 ₽. Для топ-команды из 3–5 человек — от 600 000 ₽." },
        { q: "Безопасно ли давать ИИ доступ к 1С и CRM?", a: "Ассистент работает с правами конкретного пользователя, только на чтение, в вашем контуре; каждый запрос журналируется." },
        { q: "Какие встречи умеет протоколировать?", a: "Яндекс Телемост, Zoom, Google Meet, Контур.Толк, а также аудиозаписи и голосовые сообщения." },
      ],
    },
    en: {
      h1: "AI assistant for executives: company digest, meeting minutes and answers from CRM and 1C",
      subtitle: "A personal assistant for the owner or CEO in Telegram: morning digest on sales, cash and tasks, meeting minutes with action items in Bitrix24, answers to data questions from CRM and 1C.",
      problems: ["Numbers arrive a day late in different formats", "Action items lost after calls", "2–3 hours a day on inbox and approvals", "Ready “AI secretaries” are not connected to your systems"],
      deliverables: ["Morning Telegram digest from CRM, 1C and task tracker", "Meeting minutes → tasks in Bitrix24/Jira", "Data questions answered with a table and source", "Inbox triage and drafts"],
      intro: ["Useful only when connected to real company data.", "Digest at 8:30, minutes after calls, data questions any time — no invented numbers.", "Case: Yandex Telemost agent. Private deployment."],
      howWeSolve: [{ title: "Interview and access", text: "Frequent questions, reports, systems." }, { title: "Rollout", text: "Connect systems, digest, minutes, data questions." }, { title: "Scale", text: "Assistants for the top team, dashboards, alerts." }],
      faq: [{ q: "Cost?", a: "One executive with 2–3 systems first; top team next." }, { q: "Safe access to 1C and CRM?", a: "User rights, read-only, private contour, logging." }, { q: "Which meetings?", a: "Telemost, Zoom, Meet, Tolk, recordings." }],
    },
  }),
];
