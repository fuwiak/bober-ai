import type { LandingSpec, LocaleCopy } from "@/lib/seo-catalog/types";

const IMG = {
  architecture: "/diagrams/system-architecture.svg",
  crm: "/diagrams/crm-integration.svg",
  sales: "/diagrams/sales-pipeline.svg",
  workflow: "/diagrams/workflow-automation.svg",
  docs: "/diagrams/document-flow.svg",
} as const;

const RELATED = [
  {
    href: "/ai/vnedrenie-iskusstvennogo-intellekta-v-biznes",
    labelRu: "ИИ в бизнес",
    labelEn: "AI into the business",
  },
  { href: "/ai/vnedrenie-ii-v-kompaniyu", labelRu: "ИИ в компанию", labelEn: "AI into the company" },
  { href: "/ai/vnedrenie-ii-v-prodazhi", labelRu: "ИИ в продажи", labelEn: "AI for sales" },
  { href: "/ai/vnedrenie-ii-v-otdel-prodazh", labelRu: "ИИ в отдел продаж", labelEn: "AI for the sales team" },
  { href: "/ai/vnedrenie-ii-v-dokumenty", labelRu: "ИИ в документы", labelEn: "AI for documents" },
  { href: "/ai/vnedrenie-ii-v-crm", labelRu: "ИИ в CRM", labelEn: "AI in CRM" },
  { href: "/ai/pilot-vnedreniya-ii", labelRu: "Пилот ИИ", labelEn: "AI pilot" },
  { href: "/ai/vnedrenie-ii-malyj-biznes", labelRu: "ИИ для малого бизнеса", labelEn: "AI for SMBs" },
  { href: "/ai/vnedrenie-ii-v-organizaciyu", labelRu: "ИИ в организацию", labelEn: "AI for the org" },
  { href: "/ai/stoimost-vnedreniya-ii", labelRu: "Стоимость внедрения ИИ", labelEn: "AI implementation cost" },
  { href: "/ai/zakazat-vnedrenie-ii", labelRu: "Заказать внедрение ИИ", labelEn: "Order AI implementation" },
  { href: "/ai/ai-implementation", labelRu: "Компания по внедрению ИИ", labelEn: "AI implementation company" },
  { href: "/ii-dlya-biznesa", labelRu: "ИИ для бизнеса", labelEn: "AI for business" },
  { href: "/pricing", labelRu: "цены", labelEn: "pricing" },
] as const;

function related(slug: string) {
  const path = `/ai/${slug}`;
  return RELATED.filter((item) => item.href !== path).map((item) => ({ ...item }));
}

type Page = {
  slug: string;
  contentKey: string;
  coverImage: string;
  keywords: string[];
  ru: LocaleCopy;
  en: LocaleCopy;
};

function page(def: Page): LandingSpec {
  return {
    category: "ai",
    slug: def.slug,
    contentKey: def.contentKey,
    cluster: "ai-corporate",
    serviceSlug: "enterprise-ai-assistant",
    coverImage: def.coverImage,
    keywords: def.keywords,
    caseStudySlugs: ["kaspersky-ai-assistant", "yandex-telemost-agent"],
    related: related(def.slug),
    ru: def.ru,
    en: def.en,
  };
}

/**
 * Exact «внедрение искусственного интеллекта в бизнес» + 10 variants.
 * Distinct from /ai/ai-implementation (H1 «Компания по внедрению ИИ»).
 */
export const CATALOG_LANDING_SPECS_AI_VNEDRENIE: LandingSpec[] = [
  page({
    slug: "vnedrenie-iskusstvennogo-intellekta-v-biznes",
    contentKey: "ai_vnedrenie_biznes",
    coverImage: IMG.architecture,
    keywords: [
      "внедрение искусственного интеллекта в бизнес",
      "внедрение искусственного интеллекта",
      "внедрить искусственный интеллект в бизнес",
      "интегратор искусственного интеллекта",
    ],
    ru: {
      h1: "Внедрение искусственного интеллекта в бизнес",
      subtitle:
        "Аудит процесса, пилот с KPI, связка с CRM и 1С, production. Фиксированная смета до старта. От 400 000 ₽.",
      problems: [
        "Нужно внедрение искусственного интеллекта в бизнес, а не демо-чат и курс",
        "Пилоты не доходят до заявок, сделок и документов",
        "Нет сметы, критериев приёмки и ответственного за контур",
      ],
      deliverables: [
        "Карта процесса и смета до кода",
        "Один приоритетный контур в production",
        "Интеграция с CRM / 1С, обучение, передача",
      ],
      intro: [
        "Запрос «внедрение искусственного интеллекта в бизнес» — про исполнителя и запуск, не про теорию.",
        "Канон компании-интегратора — /ai/ai-implementation. Узкие сценарии: продажи, документы, CRM — страницы ниже.",
      ],
      howWeSolve: [
        { title: "Аудит", text: "Где ручная работа, какой KPI, какие системы уже куплены." },
        { title: "Пилот", text: "2–4 недели, измеримый эффект, журнал ошибок." },
        { title: "Production", text: "Права, логи, регламент, передача команде." },
      ],
      faq: [
        {
          q: "Сколько стоит внедрение искусственного интеллекта в бизнес?",
          a: "Аудит и смета — от 150 000 ₽. Один процесс в production — от 400 000 ₽. Сложный контур — от 500 000 ₽.",
        },
        {
          q: "Чем отличается от «компании по внедрению ИИ»?",
          a: "Здесь точный запрос «в бизнес». Страница интегратора с акцентом на стоимость и сроки — /ai/ai-implementation.",
        },
      ],
    },
    en: {
      h1: "AI implementation in business",
      subtitle: "Process audit, KPI pilot, CRM/1C wire, production. Fixed estimate. From a mid-market package.",
      problems: ["You need a production contour, not a demo chat", "Pilots never reach deals or documents", "No estimate or acceptance criteria"],
      deliverables: ["Process map and estimate before code", "One production contour", "CRM/1C, training, handover"],
      intro: ["This page matches the exact Russian query. Integrator page: /ai/ai-implementation."],
      howWeSolve: [
        { title: "Audit", text: "Manual work, KPI, systems you already pay for." },
        { title: "Pilot", text: "2–4 weeks, measurable effect, error log." },
        { title: "Production", text: "Roles, logs, playbook, handover." },
      ],
      faq: [
        { q: "Price?", a: "Audit from an entry package; one production process from a mid-market package." },
        { q: "Vs implementation-company page?", a: "This is the exact “into the business” query. Canon vendor page: /ai/ai-implementation." },
      ],
    },
  }),
  page({
    slug: "vnedrenie-ii-v-kompaniyu",
    contentKey: "ai_vnedrenie_kompaniya",
    coverImage: IMG.architecture,
    keywords: ["внедрение искусственного интеллекта в компанию", "внедрить ии в компанию"],
    ru: {
      h1: "Внедрение искусственного интеллекта в компанию",
      subtitle: "Один контур внутри компании: заявки, документы или продажи. Пилот 2–4 недели. От 400 000 ₽.",
      problems: ["ИИ «для всех» — никто не пользуется", "Нет владельца процесса внутри компании", "Данные размазаны по почте и таблицам"],
      deliverables: ["Выбранный процесс и владелец", "Пилот на реальных данных компании", "Регламент и доступы"],
      intro: ["Акцент на контур компании, не на отрасль. Канон — /ai/vnedrenie-iskusstvennogo-intellekta-v-biznes."],
      howWeSolve: [
        { title: "Владелец", text: "Кто принимает результат и двигает KPI." },
        { title: "Контур", text: "Один процесс, не «платформа для всего»." },
        { title: "Передача", text: "Доступы, инструкция, кто чинит сбой." },
      ],
      faq: [
        { q: "Можно начать с отдела?", a: "Да. Часто стартуют продажи или документы, затем масштабируют." },
        { q: "Цена?", a: "От 400 000 ₽ за один контур. Аудит — от 150 000 ₽." },
      ],
    },
    en: {
      h1: "AI implementation in the company",
      subtitle: "One in-company contour: intake, documents or sales.",
      problems: ["AI for everyone, used by no one", "No process owner", "Data lives in mail and sheets"],
      deliverables: ["Chosen process and owner", "Pilot on real company data", "Playbook and access"],
      intro: ["Company contour, not an industry page. Canon: /ai/vnedrenie-iskusstvennogo-intellekta-v-biznes."],
      howWeSolve: [
        { title: "Owner", text: "Who accepts the result." },
        { title: "Contour", text: "One process, not a platform for everything." },
        { title: "Handover", text: "Access, how to fix a break." },
      ],
      faq: [
        { q: "Start with one team?", a: "Yes — sales or documents first." },
        { q: "Price?", a: "One contour is a mid-market package." },
      ],
    },
  }),
  page({
    slug: "vnedrenie-ii-v-prodazhi",
    contentKey: "ai_vnedrenie_prodazhi",
    coverImage: IMG.sales,
    keywords: ["внедрение искусственного интеллекта в продажи", "ии в продажи"],
    ru: {
      h1: "Внедрение искусственного интеллекта в продажи",
      subtitle: "Квалификация лида, черновик КП, дожим, факты в CRM. От 400 000 ₽.",
      problems: ["Менеджер копирует бриф из почты в CRM", "КП пишут с нуля каждый раз", "Дожим зависит от памяти, не от задачи"],
      deliverables: ["Сценарий: лид → квалификация → КП → задача", "Черновики в карточке CRM", "KPI пилота: время до КП, доля дожима"],
      intro: ["Уже есть /automation/sales-department. Здесь — формулировка «внедрение искусственного интеллекта в продажи»."],
      howWeSolve: [
        { title: "Воронка", text: "Где рвётся: квалификация, КП или дожим." },
        { title: "ИИ-слой", text: "Текст и факты в сделку, не отдельный чат." },
        { title: "Приёмка", text: "Контрольные сделки, регламент." },
      ],
      faq: [
        { q: "Bitrix24 или amoCRM?", a: "Оба. Узкие страницы CRM — /integrations/ai-for-crm." },
        { q: "Цена?", a: "От 400 000 ₽ за контур продаж." },
      ],
    },
    en: {
      h1: "AI implementation in sales",
      subtitle: "Lead qualification, proposal draft, follow-up, facts in CRM.",
      problems: ["Reps copy briefs from email", "Proposals from scratch", "Follow-up lives in memory"],
      deliverables: ["Lead → qualify → proposal → task", "Drafts on the CRM card", "Pilot KPI"],
      intro: ["Related: /automation/sales-department."],
      howWeSolve: [
        { title: "Funnel", text: "Where it breaks." },
        { title: "AI layer", text: "Text and facts into the deal." },
        { title: "Accept", text: "Control deals, playbook." },
      ],
      faq: [
        { q: "Bitrix24 or amoCRM?", a: "Both. CRM AI: /integrations/ai-for-crm." },
        { q: "Price?", a: "Sales contour is a mid-market package." },
      ],
    },
  }),
  page({
    slug: "vnedrenie-ii-v-otdel-prodazh",
    contentKey: "ai_vnedrenie_otdel_prodazh",
    coverImage: IMG.sales,
    keywords: ["внедрение искусственного интеллекта в отдел продаж", "ии для отдела продаж внедрение"],
    ru: {
      h1: "Внедрение искусственного интеллекта в отдел продаж",
      subtitle: "Регламент менеджера, задачи из звонков и писем, SLA. От 400 000 ₽.",
      problems: ["РОП не видит, кто не дожал", "Звонок был — в CRM пусто", "Новички учатся месяцами на чужих переписках"],
      deliverables: ["Саммари звонка/письма в сделку", "Задачи по SLA", "Короткий регламент для отдела"],
      intro: ["Отдел как единица внедрения, не «продажи вообще». Сосед: /ai/vnedrenie-ii-v-prodazhi."],
      howWeSolve: [
        { title: "Роли", text: "Менеджер, РОП, кто правит промпт." },
        { title: "Сигналы", text: "Звонок, почта, мессенджер → карточка." },
        { title: "Контроль", text: "Отчёт: сделки без следующего шага." },
      ],
      faq: [
        { q: "Нужна речевая аналитика?", a: "Можно. Отдельный контур — /automation/speech-analytics-sales." },
        { q: "Цена?", a: "От 400 000 ₽. Телефония и записи — в смете отдельно, если нет API." },
      ],
    },
    en: {
      h1: "AI implementation in the sales department",
      subtitle: "Rep playbook, tasks from calls and mail, SLA.",
      problems: ["Head of sales cannot see missed follow-ups", "Call happened, CRM is empty", "New hires learn slowly"],
      deliverables: ["Call/mail summary on the deal", "SLA tasks", "Short team playbook"],
      intro: ["Team as the unit of rollout. Neighbor: /ai/vnedrenie-ii-v-prodazhi."],
      howWeSolve: [
        { title: "Roles", text: "Rep, lead, who owns the prompt." },
        { title: "Signals", text: "Call, mail, messenger → card." },
        { title: "Control", text: "Deals with no next step." },
      ],
      faq: [
        { q: "Speech analytics?", a: "Optional. See /automation/speech-analytics-sales." },
        { q: "Price?", a: "Mid-market package. Telephony extras if no API." },
      ],
    },
  }),
  page({
    slug: "vnedrenie-ii-v-dokumenty",
    contentKey: "ai_vnedrenie_dokumenty",
    coverImage: IMG.docs,
    keywords: ["внедрение искусственного интеллекта в документы", "ии документооборот внедрение"],
    ru: {
      h1: "Внедрение искусственного интеллекта в документы",
      subtitle: "Распознавание, проверка полей, выгрузка в 1С или CRM. От 400 000 ₽.",
      problems: ["Первичка разбирается руками", "Ошибки в суммах и ИНН доходят до учёта", "Нет журнала, кто подтвердил поле"],
      deliverables: ["Конвейер: файл → поля → проверка → 1С/CRM", "Очередь ошибок", "Критерии приёмки на контрольном пакете"],
      intro: ["Соседи: /automation/documents и /automation/ocr-data-extraction. Здесь — формулировка внедрения ИИ."],
      howWeSolve: [
        { title: "Типы документов", text: "Счёт, УПД, договор — что в пилоте." },
        { title: "Проверка", text: "Человек подтверждает спорные поля." },
        { title: "Выгрузка", text: "1С или CRM, идемпотентность." },
      ],
      faq: [
        { q: "On-prem?", a: "Да, часто для документов. Облако — если политика позволяет." },
        { q: "Цена?", a: "От 400 000 ₽ за один тип документа в production." },
      ],
    },
    en: {
      h1: "AI implementation in documents",
      subtitle: "OCR, field checks, export to 1C or CRM.",
      problems: ["Primary docs are keyed by hand", "Amount and tax-id errors reach accounting", "No log of who confirmed a field"],
      deliverables: ["File → fields → review → 1C/CRM", "Error queue", "Acceptance on a control pack"],
      intro: ["Neighbors: /automation/documents."],
      howWeSolve: [
        { title: "Doc types", text: "What is in the pilot." },
        { title: "Review", text: "Humans confirm disputed fields." },
        { title: "Export", text: "1C or CRM, idempotent writes." },
      ],
      faq: [
        { q: "On-prem?", a: "Yes, common for documents." },
        { q: "Price?", a: "One document type in production is a mid-market package." },
      ],
    },
  }),
  page({
    slug: "vnedrenie-ii-v-crm",
    contentKey: "ai_vnedrenie_crm",
    coverImage: IMG.crm,
    keywords: ["внедрение искусственного интеллекта в crm", "ии в битрикс24 amocrm внедрение"],
    ru: {
      h1: "Внедрение искусственного интеллекта в CRM",
      subtitle: "Скоринг, черновики, саммари сделки в Bitrix24 или amoCRM. От 400 000 ₽.",
      problems: ["ИИ живёт в отдельной вкладке, CRM — в другой", "Менеджер не доверяет «чёрному ящику»", "Нет лога, что модель записала в поля"],
      deliverables: ["ИИ-слой внутри карточки", "Что можно писать автоматически, что только черновик", "Журнал изменений полей"],
      intro: ["Интеграторский контур CRM+ИИ: /integrations/ai-for-crm. Здесь — запрос «внедрение искусственного интеллекта в CRM»."],
      howWeSolve: [
        { title: "Поля", text: "Что модель имеет право заполнять." },
        { title: "Черновик vs запись", text: "Письмо — черновик; тег — авто, если уверенность высокая." },
        { title: "Контроль", text: "РОП видит, где ИИ ошибся." },
      ],
      faq: [
        { q: "Какие CRM?", a: "Bitrix24, amoCRM, другие с API. RetailCRM — по брифу." },
        { q: "Цена?", a: "От 400 000 ₽. Портал «с нуля» — отдельная настройка CRM." },
      ],
    },
    en: {
      h1: "AI implementation in CRM",
      subtitle: "Scoring, drafts, deal summary in Bitrix24 or amoCRM.",
      problems: ["AI in one tab, CRM in another", "Reps distrust a black box", "No log of model writes"],
      deliverables: ["AI layer on the card", "Auto vs draft rules", "Field-change journal"],
      intro: ["Related: /integrations/ai-for-crm."],
      howWeSolve: [
        { title: "Fields", text: "What the model may fill." },
        { title: "Draft vs write", text: "Email is a draft; tags may auto-write." },
        { title: "Control", text: "Lead sees model errors." },
      ],
      faq: [
        { q: "Which CRMs?", a: "Bitrix24, amoCRM, others with an API." },
        { q: "Price?", a: "Mid-market package. Empty portal setup is extra." },
      ],
    },
  }),
  page({
    slug: "pilot-vnedreniya-ii",
    contentKey: "ai_vnedrenie_pilot",
    coverImage: IMG.workflow,
    keywords: ["пилот внедрения искусственного интеллекта", "пилот ии в бизнес", "пилотное внедрение ии"],
    ru: {
      h1: "Пилот внедрения искусственного интеллекта",
      subtitle: "Один процесс, KPI за 2–4 недели, смета на production после пилота. От 150 000 ₽.",
      problems: ["Страшно сразу покупать «платформу»", "Нужно доказательство на своих данных", "Нет критерия «пилот удался»"],
      deliverables: ["Границы пилота и KPI", "Рабочий контур на ваших примерах", "Отчёт: масштабировать / остановить / сузить"],
      intro: ["Вход дешевле полного внедрения. Production — /ai/vnedrenie-iskusstvennogo-intellekta-v-biznes."],
      howWeSolve: [
        { title: "Рамка", text: "Один процесс, срок, что не входит." },
        { title: "Данные", text: "Реальные заявки/документы, не синтетика." },
        { title: "Решение", text: "Цифры и рекомендация в отчёте." },
      ],
      faq: [
        { q: "Пилот = аудит?", a: "Аудит — карта и смета. Пилот — уже работающий кусок контура." },
        { q: "Цена?", a: "От 150 000 ₽. Если сразу production — от 400 000 ₽." },
      ],
    },
    en: {
      h1: "AI implementation pilot",
      subtitle: "One process, KPI in 2–4 weeks, production estimate after.",
      problems: ["Too early to buy a platform", "Need proof on your data", "No “pilot succeeded” rule"],
      deliverables: ["Pilot scope and KPI", "Working contour on real examples", "Go / no-go report"],
      intro: ["Cheaper entry. Production: /ai/vnedrenie-iskusstvennogo-intellekta-v-biznes."],
      howWeSolve: [
        { title: "Frame", text: "One process, deadline, exclusions." },
        { title: "Data", text: "Real leads/docs." },
        { title: "Decision", text: "Numbers in the report." },
      ],
      faq: [
        { q: "Pilot vs audit?", a: "Audit is a map. Pilot is a working slice." },
        { q: "Price?", a: "Entry package. Production is larger." },
      ],
    },
  }),
  page({
    slug: "vnedrenie-ii-malyj-biznes",
    contentKey: "ai_vnedrenie_smb",
    coverImage: IMG.workflow,
    keywords: ["внедрение искусственного интеллекта в малый бизнес", "ии для малого бизнеса внедрение"],
    ru: {
      h1: "Внедрение искусственного интеллекта в малый бизнес",
      subtitle: "Узкий сценарий без лишних модулей: заявки, документы или дожим. От 400 000 ₽.",
      problems: ["Команда из 5–20 человек, нет выделенного IT", "Коробки «для enterprise» не садятся", "Нужен один рабочий сценарий, не платформа"],
      deliverables: ["Один сценарий под ваш стек (CRM, почта, таблицы)", "Пилот на живых заявках", "Кто нажимает кнопки после нас"],
      intro: ["Не урезаем качество до «бота в Telegram». Режем объём: один процесс."],
      howWeSolve: [
        { title: "Стек как есть", text: "Не заставляем менять CRM в первый месяц." },
        { title: "Один сценарий", text: "Заявки или документы — не оба сразу." },
        { title: "Простота", text: "Регламент на одну страницу." },
      ],
      faq: [
        { q: "Почему не 50 000 ₽?", a: "Production с интеграцией и приёмкой — не чат-виджет. Пилот аудита — от 150 000 ₽." },
        { q: "Можно позже расширить?", a: "Да. Второй контур — отдельная смета." },
      ],
    },
    en: {
      h1: "AI implementation for small business",
      subtitle: "One scenario, no extra modules: intake, documents or follow-up.",
      problems: ["No dedicated IT", "Enterprise boxes do not fit", "Need one working scenario"],
      deliverables: ["One scenario on your stack", "Pilot on live leads", "Who clicks after we leave"],
      intro: ["We cut scope, not quality."],
      howWeSolve: [
        { title: "Keep the stack", text: "Do not swap CRM in month one." },
        { title: "One scenario", text: "Intake or documents — not both." },
        { title: "Simple", text: "One-page playbook." },
      ],
      faq: [
        { q: "Why not a widget price?", a: "Production with integrations is not a chat bubble." },
        { q: "Expand later?", a: "Yes — second contour is a new estimate." },
      ],
    },
  }),
  page({
    slug: "vnedrenie-ii-v-organizaciyu",
    contentKey: "ai_vnedrenie_org",
    coverImage: IMG.architecture,
    keywords: ["внедрение искусственного интеллекта в организацию", "корпоративное внедрение ии"],
    ru: {
      h1: "Внедрение искусственного интеллекта в организацию",
      subtitle: "Доступы, логи, контур заказчика, интеграции. Не публичный чат. От 500 000 ₽.",
      problems: ["ИБ не пускает данные в публичные модели", "Нужны роли, аудит действий, контур", "Несколько юрлиц / подразделений"],
      deliverables: ["Модель размещения: on-prem / закрытое облако", "Роли и журнал", "Интеграции в процессы организации"],
      intro: ["Ближе к /ai/corporate-neural-net и /ai/private-llm. Здесь — формулировка «в организацию»."],
      howWeSolve: [
        { title: "Контур", text: "Где крутится модель и логи." },
        { title: "Роли", text: "Кто видит какие документы." },
        { title: "Процесс", text: "Один production-сценарий в этом контуре." },
      ],
      faq: [
        { q: "152-ФЗ / NDA?", a: "NDA стандарт. Требования к ПДн фиксируем в договоре и архитектуре." },
        { q: "Цена?", a: "От 500 000 ₽: контур дороже «облачного пилота»." },
      ],
    },
    en: {
      h1: "AI implementation in the organization",
      subtitle: "Access, logs, customer contour, integrations. Not a public chat.",
      problems: ["Security blocks public models", "Need roles and an audit trail", "Several legal entities"],
      deliverables: ["On-prem or private cloud", "Roles and journal", "Org-process integrations"],
      intro: ["Related: /ai/private-llm."],
      howWeSolve: [
        { title: "Contour", text: "Where the model and logs run." },
        { title: "Roles", text: "Who sees which documents." },
        { title: "Process", text: "One production scenario in that contour." },
      ],
      faq: [
        { q: "Compliance / NDA?", a: "NDA is standard. Data rules go into the contract." },
        { q: "Price?", a: "Larger package than a public-cloud pilot." },
      ],
    },
  }),
  page({
    slug: "stoimost-vnedreniya-ii",
    contentKey: "ai_vnedrenie_stoimost",
    coverImage: IMG.architecture,
    keywords: ["стоимость внедрения искусственного интеллекта", "сколько стоит внедрение искусственного интеллекта"],
    ru: {
      h1: "Стоимость внедрения искусственного интеллекта",
      subtitle: "Аудит и смета до кода. Аудит от 150 000 ₽, процесс в production — от 400 000 ₽.",
      problems: ["В поиске видят «от 10 000 ₽» — это не production", "Нет понятной вилки аудит / пилот / запуск", "Боятся time & material без потолка"],
      deliverables: ["Вилка по пакетам", "Что входит и не входит", "Фиксированная смета после аудита"],
      intro: ["Сосед по смыслу: FAQ на /ai/ai-implementation. Здесь — отдельный URL под запрос «стоимость»."],
      howWeSolve: [
        { title: "Аудит", text: "Карта и цифра до разработки." },
        { title: "Пилот", text: "Доказательство на одном процессе." },
        { title: "Production", text: "Фикс в договоре, критерии приёмки." },
      ],
      faq: [
        { q: "Почему так дорого?", a: "В цену входят интеграции, логи, приёмка и передача. Виджет чата — другой продукт." },
        { q: "Можно только аудит?", a: "Да. От 150 000 ₽. Внедрение после — отдельный договор." },
      ],
    },
    en: {
      h1: "AI implementation cost",
      subtitle: "Audit and estimate before code. Audit from an entry package; production from a mid-market package.",
      problems: ["Search shows toy prices", "No audit / pilot / launch split", "Fear of uncapped time & material"],
      deliverables: ["Package ranges", "In and out of scope", "Fixed estimate after audit"],
      intro: ["Related FAQ: /ai/ai-implementation."],
      howWeSolve: [
        { title: "Audit", text: "Number before build." },
        { title: "Pilot", text: "Proof on one process." },
        { title: "Production", text: "Fixed contract, acceptance." },
      ],
      faq: [
        { q: "Why this price?", a: "Integrations, logs, acceptance. A chat widget is a different product." },
        { q: "Audit only?", a: "Yes — then a separate delivery contract." },
      ],
    },
  }),
  page({
    slug: "zakazat-vnedrenie-ii",
    contentKey: "ai_vnedrenie_zakazat",
    coverImage: IMG.workflow,
    keywords: ["заказать внедрение искусственного интеллекта", "заказать внедрение ии в бизнес"],
    ru: {
      h1: "Заказать внедрение искусственного интеллекта",
      subtitle: "Бриф → смета → пилот → production. Критерии приёмки в договоре. От 400 000 ₽.",
      problems: ["Непонятно, с чего начать заказ", "Боятся бесконечных созвонов без результата", "Нужен договор, а не «посмотрим»"],
      deliverables: ["Форма брифа и слоты", "Смета до старта", "Этапы и приёмка в договоре"],
      intro: ["Коммерческий CTA-запрос. Содержание работ — /ai/vnedrenie-iskusstvennogo-intellekta-v-biznes."],
      howWeSolve: [
        { title: "Бриф", text: "Процесс, системы, ограничения ИБ." },
        { title: "Смета", text: "Фикс или пилот+опцион на production." },
        { title: "Запуск", text: "Срок, KPI, кто со стороны заказчика." },
      ],
      faq: [
        { q: "Как заказать?", a: "Форма на этой странице или /tel. Отвечаем со сметой или уточняющими вопросами." },
        { q: "Предоплата?", a: "Этапами. Аудит можно закрыть отдельно до полного внедрения." },
      ],
    },
    en: {
      h1: "Order AI implementation",
      subtitle: "Brief → estimate → pilot → production. Acceptance in the contract.",
      problems: ["Unclear how to start", "Endless calls, no contour", "Need a contract, not “let’s see”"],
      deliverables: ["Brief and slots", "Estimate before kickoff", "Stages in the contract"],
      intro: ["CTA query. Scope: /ai/vnedrenie-iskusstvennogo-intellekta-v-biznes."],
      howWeSolve: [
        { title: "Brief", text: "Process, systems, security limits." },
        { title: "Estimate", text: "Fixed or pilot plus production option." },
        { title: "Launch", text: "Dates, KPI, your owner." },
      ],
      faq: [
        { q: "How to order?", a: "Form on this page or /tel." },
        { q: "Prepay?", a: "By stage. Audit can be a separate contract." },
      ],
    },
  }),
];
