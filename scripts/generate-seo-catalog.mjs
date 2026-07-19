#!/usr/bin/env node
/**
 * Generates src/lib/seo-catalog/landing-specs.ts with Wordstat-based landing pages.
 * Run: node scripts/generate-seo-catalog.mjs
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../src/lib/seo-catalog/landing-specs.ts");

const IMG = {
  workflow: "/diagrams/workflow-automation.svg",
  crm: "/diagrams/crm-integration.svg",
  documents: "/diagrams/document-flow.svg",
  sales: "/diagrams/sales-pipeline.svg",
  architecture: "/diagrams/system-architecture.svg",
  erp: "/diagrams/erp-sync.svg",
};

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function page(p) {
  const related = (p.related || [])
    .map(
      (r) =>
        `{ href: "${r.href}", labelRu: "${esc(r.labelRu)}", labelEn: "${esc(r.labelEn)}" }`,
    )
    .join(",\n      ");
  const cases = p.cases ? `caseStudySlugs: [${p.cases.map((c) => `"${c}"`).join(", ")}],` : "";
  return `  {
    category: "${p.cat}",
    slug: "${p.slug}",
    contentKey: "${p.key}",
    cluster: "${p.cluster}",
    serviceSlug: "${p.svc}",
    coverImage: "${p.img}",
    keywords: ${JSON.stringify(p.kw)},
    ${cases}
    related: [
      ${related}
    ],
    ru: {
      h1: "${esc(p.ru.h1)}",
      subtitle: "${esc(p.ru.sub)}",
      problems: ${JSON.stringify(p.ru.problems)},
      deliverables: ${JSON.stringify(p.ru.deliverables)},
      intro: ${JSON.stringify(p.ru.intro)},
      faq: ${JSON.stringify(p.ru.faq)},
    },
    en: {
      h1: "${esc(p.en.h1)}",
      subtitle: "${esc(p.en.sub)}",
      problems: ${JSON.stringify(p.en.problems)},
      deliverables: ${JSON.stringify(p.en.deliverables)},
      intro: ${JSON.stringify(p.en.intro)},
      faq: ${JSON.stringify(p.en.faq)},
    },
  }`;
}

/** Helper to quickly build bilingual page from RU seed */
function mk({
  cat,
  slug,
  key,
  cluster,
  svc = "business-process-automation",
  img = IMG.workflow,
  kw,
  related = [],
  cases,
  h1,
  sub,
  problems,
  deliverables,
  intro,
  faq,
  enH1,
  enSub,
  enProblems,
  enDeliverables,
  enIntro,
  enFaq,
}) {
  return {
    cat,
    slug,
    key: key || slug.replace(/-/g, ""),
    cluster,
    svc,
    img,
    kw,
    related,
    cases,
    ru: { h1, sub, problems, deliverables, intro, faq },
    en: {
      h1: enH1,
      sub: enSub,
      problems: enProblems,
      deliverables: enDeliverables,
      intro: enIntro,
      faq: enFaq,
    },
  };
}

const R = {
  processes: { href: "/automation/processes", labelRu: "Автоматизация процессов", labelEn: "Process automation" },
  documents: { href: "/automation/documents", labelRu: "Документооборот", labelEn: "Document automation" },
  sales: { href: "/automation/sales", labelRu: "Автоматизация продаж", labelEn: "Sales automation" },
  support: { href: "/automation/support", labelRu: "Поддержка", labelEn: "Support automation" },
  hr: { href: "/automation/hr", labelRu: "HR-автоматизация", labelEn: "HR automation" },
  management: { href: "/automation/management", labelRu: "Для руководителя", labelEn: "Management AI" },
  kb: { href: "/automation/knowledge-base", labelRu: "База знаний", labelEn: "Knowledge base" },
  crm: { href: "/integrations/crm", labelRu: "Внедрение CRM", labelEn: "CRM implementation" },
  amocrm: { href: "/integrations/amocrm", labelRu: "amoCRM", labelEn: "amoCRM" },
  bitrix: { href: "/integrations/bitrix24", labelRu: "Bitrix24", labelEn: "Bitrix24" },
  onec: { href: "/integrations/1c", labelRu: "Интеграция 1С", labelEn: "1C integration" },
  integrations: { href: "/integrations", labelRu: "Интеграции", labelEn: "Integrations" },
  corporate: { href: "/ai/corporate", labelRu: "Корпоративный ИИ", labelEn: "Enterprise AI" },
  assistant: { href: "/solutions/assistant", labelRu: "AI-ассистент", labelEn: "AI assistant" },
};

const pages = [];

function add(cfg) {
  pages.push(mk(cfg));
}

// ——— HUB LANDINGS (new core clusters) ———
add({
  cat: "automation",
  slug: "support",
  key: "support",
  cluster: "support",
  svc: "enterprise-ai-assistant",
  img: IMG.architecture,
  kw: ["автоматизация поддержки", "ai поддержка", "чат-бот", "служба поддержки", "обработка входящих заявок"],
  related: [R.processes, R.assistant, R.crm],
  cases: ["yandex-telemost-agent"],
  h1: "Автоматизация поддержки клиентов",
  sub: "Обработка заявок, чат-бот первой линии и маршрутизация обращений — меньше ручной работы у службы поддержки.",
  problems: [
    "Заявки теряются между почтой, Telegram и телефоном",
    "Одинаковые вопросы отнимают часы у операторов",
    "Нет единой истории обращения по клиенту",
    "Руководитель не видит SLA и узкие места",
  ],
  deliverables: [
    "Единый канал заявок с маршрутизацией",
    "Чат-бот / AI-ассистент первой линии",
    "Интеграция с CRM и базой знаний",
    "Дашборд SLA и эскалаций",
  ],
  intro: [
    "Автоматизация поддержки начинается с карты обращений: откуда приходят заявки, кто отвечает, какие вопросы повторяются.",
    "Мы связываем мессенджеры, почту и CRM, добавляем бота для типовых вопросов и оставляем сложные кейсы людям.",
    "AI здесь — слой ускорения, а не замена службы поддержки.",
  ],
  faq: [
    { q: "Заменит ли бот операторов?", a: "Нет. Бот закрывает 40–70% типовых вопросов. Сложные эскалируются человеку с полным контекстом." },
    { q: "С какими каналами работаете?", a: "Telegram, WhatsApp, сайт, почта, Bitrix24, amoCRM — по вашему стеку." },
    { q: "Сколько длится внедрение?", a: "Пилот первой линии — 2–4 недели. Полный контур с CRM и SLA — 4–8 недель." },
  ],
  enH1: "Customer support automation",
  enSub: "Ticket intake, first-line chatbot, and routing — less manual work for your support team.",
  enProblems: [
    "Tickets get lost across email, Telegram and phone",
    "Repetitive questions burn operator hours",
    "No single customer conversation history",
    "Managers cannot see SLA bottlenecks",
  ],
  enDeliverables: [
    "Unified intake with routing",
    "First-line chatbot / AI assistant",
    "CRM and knowledge-base integration",
    "SLA and escalation dashboard",
  ],
  enIntro: [
    "Support automation starts with a map of inbound channels and repeat questions.",
    "We connect messengers, email and CRM, add a bot for routine cases, and keep complex issues with humans.",
    "AI accelerates support — it does not replace your team.",
  ],
  enFaq: [
    { q: "Will a bot replace agents?", a: "No. Bots handle 40–70% of routine questions. Complex cases escalate with full context." },
    { q: "Which channels do you support?", a: "Telegram, WhatsApp, website, email, Bitrix24, amoCRM — based on your stack." },
    { q: "How long does delivery take?", a: "First-line pilot: 2–4 weeks. Full CRM + SLA setup: 4–8 weeks." },
  ],
});

add({
  cat: "automation",
  slug: "hr",
  key: "hr",
  cluster: "hr",
  svc: "enterprise-ai-assistant",
  img: IMG.documents,
  kw: ["автоматизация hr", "подбор персонала", "обработка резюме", "hr ai", "кадровый документооборот"],
  related: [R.documents, R.kb, R.processes],
  h1: "Автоматизация HR и подбора персонала",
  sub: "Обработка резюме, онбординг и ответы по регламентам — меньше рутины у HR, быстрее выход сотрудника в работу.",
  problems: [
    "Резюме разбирают вручную часами",
    "Онбординг зависит от одного HR-менеджера",
    "Сотрудники не находят ответы по политикам и отпускам",
    "Кадровые документы согласовываются по почте",
  ],
  deliverables: [
    "Скрининг резюме и короткий шорт-лист",
    "Портал онбординга с чеклистами",
    "Q&A-ассистент по HR-регламентам",
    "Маршруты кадрового документооборота",
  ],
  intro: [
    "HR-автоматизация окупается там, где много повторяющихся действий: скрининг, онбординг, ответы по политикам.",
    "Мы не «внедряем HRM ради HRM» — связываем текущие таблицы, почту и мессенджеры, добавляя AI только на разбор текстов и поиск по базе знаний.",
    "Результат — меньше ручной работы и быстрее выход нового сотрудника в продуктивность.",
  ],
  faq: [
    { q: "Нужна ли замена HRM-системы?", a: "Обычно нет. Начинаем с процессов поверх текущих инструментов." },
    { q: "Как обрабатываете персональные данные?", a: "NDA, контур заказчика, 152-ФЗ по запросу. Данные резюме не уходят в публичные модели без договора." },
    { q: "С чего начать?", a: "С одного потока: скрининг резюме или онбординг. Пилот — 2–3 недели." },
  ],
  enH1: "HR and recruiting automation",
  enSub: "Resume screening, onboarding, and policy Q&A — less HR busywork, faster time-to-productivity.",
  enProblems: [
    "Resumes are screened manually for hours",
    "Onboarding depends on a single HR manager",
    "Employees cannot find answers about policies and leave",
    "HR documents are approved over email",
  ],
  enDeliverables: [
    "Resume screening and shortlists",
    "Onboarding portal with checklists",
    "Q&A assistant for HR policies",
    "HR document approval workflows",
  ],
  enIntro: [
    "HR automation pays off where work repeats: screening, onboarding, policy answers.",
    "We connect your current tools and add AI only for text review and knowledge search.",
    "Result: less manual work and faster onboarding.",
  ],
  enFaq: [
    { q: "Do we need a new HRM?", a: "Usually no. We automate on top of what you already use." },
    { q: "How do you handle personal data?", a: "NDA, customer environment, local compliance on request. Resume data does not go to public models without a contract." },
    { q: "Where should we start?", a: "One flow: resume screening or onboarding. Pilot in 2–3 weeks." },
  ],
});

add({
  cat: "automation",
  slug: "management",
  key: "management",
  cluster: "management",
  svc: "ai-discovery-roadmap",
  img: IMG.architecture,
  kw: ["ai для руководителя", "ai аналитика", "ai директор", "управленческие панели", "дашборд для ceo"],
  related: [R.crm, R.sales, R.processes],
  h1: "AI и аналитика для руководителя",
  sub: "Управленческие панели, сводки по воронке и операциям — решения на данных, а не на ощущениях.",
  problems: [
    "Отчёты собирают вручную из Excel и CRM",
    "Нет единой картины продаж и операций",
    "Решения принимаются с задержкой в дни",
    "Руководитель тратит вечера на «свести цифры»",
  ],
  deliverables: [
    "Дашборд ключевых метрик под роль CEO/COO",
    "Автосбор данных из CRM, 1С и таблиц",
    "Еженедельные AI-сводки с отклонениями",
    "Алерты по SLA, кассе и воронке",
  ],
  intro: [
    "Руководители ищут не «нейросеть», а понятную картину бизнеса без ручной сводки.",
    "Мы собираем данные из CRM, 1С и операционных систем в панели и короткие AI-дайджесты.",
    "AI объясняет отклонения; источник правды остаётся в ваших системах учёта.",
  ],
  faq: [
    { q: "Это замена BI?", a: "Нет. Это слой управленческих метрик и сводок. При необходимости стыкуем с существующим BI." },
    { q: "Какие метрики ставите?", a: "Те, что влияют на деньги и сроки: воронка, касса, SLA, загрузка, дебиторка — по аудиту." },
    { q: "Нужен ли data engineer в штате?", a: "На старте — нет. Передаём схему и документацию вашему IT или сопровождаем сами." },
  ],
  enH1: "AI analytics for executives",
  enSub: "Management dashboards and pipeline/ops digests — decisions on data, not gut feel.",
  enProblems: [
    "Reports are stitched manually from Excel and CRM",
    "No single view of sales and operations",
    "Decisions lag by days",
    "Leaders spend evenings reconciling numbers",
  ],
  enDeliverables: [
    "CEO/COO metric dashboard",
    "Auto-collection from CRM, ERP and sheets",
    "Weekly AI digests with anomalies",
    "Alerts on SLA, cash and pipeline",
  ],
  enIntro: [
    "Executives do not search for “neural nets” — they want a clear business picture without manual reporting.",
    "We pull CRM, ERP and ops data into dashboards and short AI digests.",
    "AI explains anomalies; your systems of record stay the source of truth.",
  ],
  enFaq: [
    { q: "Is this a BI replacement?", a: "No. It is a management metrics layer. We can connect to existing BI." },
    { q: "Which metrics do you set?", a: "Those that move money and deadlines: pipeline, cash, SLA, load, receivables — based on audit." },
    { q: "Do we need a data engineer?", a: "Not at the start. We hand over the schema or support it ourselves." },
  ],
});

add({
  cat: "automation",
  slug: "knowledge-base",
  key: "knowledgeBaseAutomation",
  cluster: "knowledge-base",
  svc: "enterprise-ai-assistant",
  img: IMG.architecture,
  kw: ["корпоративная база знаний", "поиск по документам", "rag", "база знаний с ии", "создание базы знаний"],
  related: [R.documents, R.assistant, R.corporate],
  cases: ["kaspersky-ai-assistant"],
  h1: "Корпоративная база знаний с AI",
  sub: "Поиск по регламентам и документам компании с ответами на языке сотрудника — меньше «спроси у коллеги».",
  problems: [
    "Знания размазаны по Discord, Notion, папкам и головам",
    "Новые сотрудники недели ищут «как принято»",
    "Одинаковые вопросы забивают чаты руководителей",
    "Документы устаревают без контроля версий",
  ],
  deliverables: [
    "Индексация документов и регламентов",
    "Поиск с цитированием источников",
    "Ассистент в Telegram / портале / сайте",
    "Процесс обновления и владельцев знаний",
  ],
  intro: [
    "База знаний — не «загрузить PDF в чат». Нужны владельцы документов, актуальные версии и поиск с проверкой источника.",
    "Мы строим RAG/поиск по вашему контуру: ответы с ссылками на регламенты, без выдуманных политик.",
    "Это снижает нагрузку на экспертов и ускоряет онбординг.",
  ],
  faq: [
    { q: "Чем отличается от ChatGPT?", a: "Ответы опираются на ваши документы в вашем контуре, а не на общую модель из интернета." },
    { q: "Какие форматы документов?", a: "PDF, DOCX, Notion, Confluence, Google Docs, Wiki — по аудиту." },
    { q: "Нужен ли RAG всегда?", a: "Не всегда. Иногда достаточно хорошего поиска и структуры. RAG — когда нужен диалоговый ответ." },
  ],
  enH1: "Corporate knowledge base with AI",
  enSub: "Search company policies and documents with answers in employee language — fewer “ask a colleague” loops.",
  enProblems: [
    "Knowledge is scattered across chats, Notion, folders and people",
    "New hires spend weeks learning “how we do things”",
    "Repeat questions flood manager chats",
    "Documents go stale without version ownership",
  ],
  enDeliverables: [
    "Document and policy indexing",
    "Search with source citations",
    "Assistant in Telegram / portal / website",
    "Knowledge ownership and update process",
  ],
  enIntro: [
    "A knowledge base is not “upload PDFs to a chat”. You need owners, fresh versions, and cited answers.",
    "We build search/RAG in your environment with links back to policies.",
    "That reduces expert load and speeds onboarding.",
  ],
  enFaq: [
    { q: "How is this different from ChatGPT?", a: "Answers come from your documents in your environment — not the open internet." },
    { q: "Which formats?", a: "PDF, DOCX, Notion, Confluence, Google Docs, Wiki — based on audit." },
    { q: "Is RAG always required?", a: "No. Sometimes structured search is enough. RAG helps when you need conversational answers." },
  ],
});

// ——— SOLUTION PAGES: processes cluster ———
const processSolutions = [
  ["reduce-manual-work", "Как убрать ручную работу в процессах", "Remove manual work from processes", "ручная работа", "ручной ввод данных между системами"],
  ["process-audit", "Аудит бизнес-процессов перед автоматизацией", "Business process audit before automation", "аудит процессов", "карта бизнес-процессов"],
  ["workflow-automation", "Автоматизация workflow и согласований", "Workflow and approval automation", "workflow автоматизация", "согласование процессов"],
  ["cross-system-sync", "Синхронизация данных между системами", "Cross-system data sync", "синхронизация crm 1с", "интеграция систем"],
  ["request-intake", "Автоматизация обработки заявок", "Inbound request automation", "обработка заявок", "автоматизация обработки заявок"],
  ["approval-routes", "Маршруты согласования под ключ", "Approval routes under fixed scope", "согласование документов", "маршруты согласования"],
  ["ops-checklist", "Чеклисты и контроль исполнения процессов", "Process checklists and execution control", "контроль исполнения", "чеклисты процессов"],
  ["cost-reduction", "Автоматизация для сокращения расходов", "Automation to cut operating costs", "сократить расходы", "оптимизация затрат"],
];

for (const [slug, h1, enH1, kw1, kw2] of processSolutions) {
  add({
    cat: "automation",
    slug,
    key: `proc_${slug.replace(/-/g, "_")}`,
    cluster: "automation-processes",
    img: IMG.workflow,
    kw: [kw1, kw2, "автоматизация бизнес процессов"],
    related: [R.processes, R.documents, R.crm],
    h1,
    sub: `${h1}: фиксируем процесс, убираем ручные шаги, считаем ROI до разработки.`,
    problems: [
      `Команда тратит часы на «${kw1}» без измеримого результата`,
      "Нет владельца процесса и понятного SLA",
      "Данные дублируются в Excel, CRM и мессенджерах",
      "Автоматизацию начинали с инструмента, а не с боли",
    ],
    deliverables: [
      "Карта текущего и целевого процесса",
      "Приоритеты автоматизации с ROI",
      "Рабочий workflow в production",
      "Регламент и передача команде",
    ],
    intro: [
      `${h1} — это не покупка ещё одного SaaS. Сначала фиксируем, где теряется время и деньги.`,
      "Дальше проектируем минимальный контур: интеграции, правила, уведомления. AI — только если ускоряет конкретный шаг.",
      "Типичный горизонт пилота — 2–4 недели с понятным эффектом для руководителя.",
    ],
    faq: [
      { q: "С какого процесса начать?", a: "С того, где больше всего ручных часов и понятный денежный эффект: заявки, документы или продажи." },
      { q: "Можно ли без замены CRM?", a: "Да. Часто достаточно связать текущие системы и убрать ручные переносы." },
      { q: "Как считается ROI?", a: "Часы × ставка × частота сценария минус стоимость внедрения и сопровождения." },
    ],
    enH1,
    enSub: `${enH1}: map the process, remove manual steps, calculate ROI before build.`,
    enProblems: [
      `The team burns hours on “${kw1}” without measurable output`,
      "No process owner and clear SLA",
      "Data is duplicated across Excel, CRM and chats",
      "Automation started from a tool, not from a pain",
    ],
    enDeliverables: [
      "Current and target process map",
      "Automation priorities with ROI",
      "Production workflow",
      "Playbook and team handover",
    ],
    enIntro: [
      `${enH1} is not buying another SaaS. First we locate where time and money leak.`,
      "Then we design a minimal path: integrations, rules, alerts. AI only if it speeds a concrete step.",
      "A typical pilot is 2–4 weeks with a clear executive outcome.",
    ],
    enFaq: [
      { q: "Which process first?", a: "The one with the most manual hours and clear money impact: requests, documents or sales." },
      { q: "Can we keep our CRM?", a: "Yes. Often we just connect systems and remove copy-paste." },
      { q: "How is ROI calculated?", a: "Hours × rate × frequency minus delivery and support cost." },
    ],
  });
}

// ——— DOCUMENTS solutions ———
const docSolutions = [
  ["contract-approval", "Автоматизация согласования договоров", "Contract approval automation", "согласование договоров", "договорной документооборот"],
  ["ocr-data-extraction", "OCR и извлечение данных из документов", "OCR and document data extraction", "извлечение данных", "ocr документов"],
  ["invoice-processing", "Автоматизация обработки счетов и актов", "Invoice and act processing automation", "обработка счетов", "автоматизация актов"],
  ["template-generation", "Генерация документов по шаблонам", "Template-based document generation", "генерация документов", "шаблоны договоров"],
  ["edo-integration", "Интеграция с ЭДО и архивом документов", "E-doc and archive integration", "эдо интеграция", "электронный документооборот"],
  ["kp-from-crm", "КП и документы прямо из CRM", "Proposals and docs from CRM", "коммерческие предложения", "генерация кп"],
  ["policy-search", "Поиск по внутренним регламентам", "Internal policy search", "поиск по регламентам", "поиск по документам"],
  ["scan-to-crm", "Сканы и PDF в поля CRM автоматически", "Scans and PDFs into CRM fields", "pdf в crm", "распознавание документов"],
];

for (const [slug, h1, enH1, kw1, kw2] of docSolutions) {
  add({
    cat: "automation",
    slug,
    key: `doc_${slug.replace(/-/g, "_")}`,
    cluster: "automation-documents",
    svc: "document-processing",
    img: IMG.documents,
    kw: [kw1, kw2, "автоматизация документооборота"],
    related: [R.documents, R.sales, R.onec],
    cases: ["kp-llm-automation"],
    h1,
    sub: `${h1} для компаний: меньше ручной обработки, быстрее согласование, данные сразу в CRM/1С.`,
    problems: [
      "Документы зависают в почте и мессенджерах",
      "Реквизиты переносят вручную с ошибками",
      "Нет статуса: кто согласовал и на каком этапе",
      "Шаблоны разъехались по папкам сотрудников",
    ],
    deliverables: [
      "Маршрут согласования с дедлайнами",
      "Извлечение полей / генерация по шаблону",
      "Связка документа со сделкой в CRM",
      "Журнал версий и аудит действий",
    ],
    intro: [
      `${h1} строится вокруг цепочки: вход → проверка → согласование → учётная система.`,
      "AI и OCR подключаем к извлечению и черновикам; юридически значимые шаги остаются за людьми и ЭДО.",
      "Цель — часы, а не «красивый чат с PDF».",
    ],
    faq: [
      { q: "Нужен ли ЭДО обязательно?", a: "Не всегда. Для внутреннего согласования достаточно workflow. ЭДО — когда нужен юридический обмен." },
      { q: "Работаете со сканами?", a: "Да. OCR + проверка полей + подтверждение оператором при низкой уверенности." },
      { q: "Связка с 1С?", a: "Да. Типовые сценарии: счета, акты, контрагенты, статусы оплаты." },
    ],
    enH1,
    enSub: `${enH1} for companies: less manual processing, faster approvals, data straight into CRM/ERP.`,
    enProblems: [
      "Documents stall in email and chats",
      "Fields are copied manually with errors",
      "No status of who approved what",
      "Templates live in personal folders",
    ],
    enDeliverables: [
      "Approval route with deadlines",
      "Field extraction / template generation",
      "Document linked to the CRM deal",
      "Version log and action audit",
    ],
    enIntro: [
      `${enH1} follows intake → check → approval → system of record.`,
      "AI/OCR help with extraction and drafts; legal steps stay with people and e-doc flows.",
      "The goal is hours saved — not a pretty chat over a PDF.",
    ],
    enFaq: [
      { q: "Is e-doc mandatory?", a: "Not always. Internal approval can be workflow-only. E-doc when legal exchange is required." },
      { q: "Do you handle scans?", a: "Yes. OCR + field checks + human confirm on low confidence." },
      { q: "ERP/1C link?", a: "Yes — invoices, acts, counterparties, payment status." },
    ],
  });
}

// ——— SALES solutions ———
const salesSolutions = [
  ["sales-department", "Автоматизация отдела продаж", "Sales department automation", "автоматизация отдела продаж", "отдел продаж"],
  ["lead-routing", "Квалификация и маршрутизация лидов", "Lead qualification and routing", "маршрутизация лидов", "квалификация лидов"],
  ["follow-up-automation", "Автоматический follow-up по сделкам", "Automated deal follow-up", "follow up продажи", "автодожим сделок"],
  ["proposal-generation", "Генерация коммерческих предложений", "Commercial proposal generation", "генерация коммерческих предложений", "автоматизация кп"],
  ["pipeline-visibility", "Прозрачная воронка для руководителя", "Pipeline visibility for managers", "воронка продаж", "дашборд продаж"],
  ["ai-for-sales", "AI для отдела продаж", "AI for the sales team", "ai для продаж", "ai агент для продаж"],
  ["call-center-sales", "Автоматизация колл-центра и обзвона", "Call-center and outreach automation", "автоматизация колл центра", "обзвон лидов"],
  ["quote-to-order", "От КП до заказа без ручного переноса", "Quote-to-order without retyping", "quote to order", "заказ из кп"],
];

for (const [slug, h1, enH1, kw1, kw2] of salesSolutions) {
  add({
    cat: "automation",
    slug,
    key: `sales_${slug.replace(/-/g, "_")}`,
    cluster: "automation-sales",
    svc: "sales-ai-agent",
    img: IMG.sales,
    kw: [kw1, kw2, "автоматизация продаж"],
    related: [R.sales, R.crm, R.documents],
    cases: ["elia-suite", "kp-llm-automation"],
    h1,
    sub: `${h1}: быстрее реакция на лид, меньше рутины у менеджеров, воронка под контролем.`,
    problems: [
      "Менеджеры готовят КП часами",
      "Лиды остывают без follow-up",
      "Руководитель не видит реальное состояние воронки",
      "Данные сделки размазаны по чатам и таблицам",
    ],
    deliverables: [
      "Правила квалификации и маршрутизации",
      "Шаблоны КП / писем / задач в CRM",
      "Автоматические напоминания и дожим",
      "Дашборд конверсий по этапам",
    ],
    intro: [
      `${h1} окупается, когда убираем рутину вокруг сделки, а не «внедряем AI ради AI».`,
      "Связываем рекламу, CRM и документы: лид → квалификация → КП → follow-up → заказ.",
      "AI помогает в текстах и квалификации; дисциплина процесса остаётся в CRM.",
    ],
    faq: [
      { q: "Подойдёт ли для SMB?", a: "Да. Часто начинаем с КП и follow-up — эффект виден за 2–3 недели." },
      { q: "Нужна ли замена CRM?", a: "Редко. Настраиваем то, что уже есть: amoCRM или Bitrix24." },
      { q: "Как не сломать мотивацию менеджеров?", a: "Автоматизируем рутину, а не продажи. Менеджер остаётся владельцем сделки." },
    ],
    enH1,
    enSub: `${enH1}: faster lead response, less rep busywork, pipeline under control.`,
    enProblems: [
      "Reps spend hours building proposals",
      "Leads go cold without follow-up",
      "Managers cannot see true pipeline health",
      "Deal data lives in chats and sheets",
    ],
    enDeliverables: [
      "Qualification and routing rules",
      "Proposal / email / task templates in CRM",
      "Automated reminders and nudges",
      "Stage conversion dashboard",
    ],
    enIntro: [
      `${enH1} pays off when we remove deal busywork — not when we “add AI”.`,
      "We connect ads, CRM and documents: lead → qualify → quote → follow-up → order.",
      "AI helps with copy and qualification; process discipline stays in CRM.",
    ],
    enFaq: [
      { q: "Good for SMB?", a: "Yes. Often we start with proposals and follow-up — impact in 2–3 weeks." },
      { q: "Must we change CRM?", a: "Rarely. We configure amoCRM or Bitrix24 you already use." },
      { q: "Will reps resist?", a: "We automate busywork, not selling. Reps stay deal owners." },
    ],
  });
}

// ——— SUPPORT / HR / MGMT children ———
const supportSolutions = [
  ["first-line-chatbot", "Чат-бот первой линии поддержки", "First-line support chatbot", "чат-бот для бизнеса", "бот для поддержки"],
  ["ticket-routing", "Маршрутизация обращений в поддержку", "Support ticket routing", "маршрутизация обращений", "тикетная система"],
  ["sla-monitoring", "Контроль SLA службы поддержки", "Support SLA monitoring", "sla поддержки", "контроль sla"],
  ["faq-assistant", "AI-ассистент по FAQ и базе знаний", "FAQ and knowledge assistant", "ai поддержка", "faq бот"],
];
for (const [slug, h1, enH1, kw1, kw2] of supportSolutions) {
  add({
    cat: "automation",
    slug,
    key: `sup_${slug.replace(/-/g, "_")}`,
    cluster: "support",
    svc: "enterprise-ai-assistant",
    img: IMG.architecture,
    kw: [kw1, kw2, "автоматизация поддержки"],
    related: [R.support, R.kb, R.assistant],
    h1,
    sub: `${h1}: быстрее ответы клиентам, меньше нагрузки на операторов.`,
    problems: ["Очередь обращений растёт быстрее штата", "Типовые вопросы занимают половину смены", "Эскалации без контекста", "Нет метрик первой линии"],
    deliverables: ["Сценарии первой линии", "Интеграция каналов", "Эскалация с контекстом", "Отчёт по закрытию и CSAT"],
    intro: [`${h1} снижает нагрузку на людей за счёт типовых сценариев.`, "Сложные кейсы остаются у операторов с полным контекстом.", "Внедряем на ваших каналах без «ещё одного кабинета»."],
    faq: [
      { q: "На каком языке отвечает бот?", a: "На языке ваших клиентов — обычно русский, при необходимости мультиязычность." },
      { q: "Можно ли в Telegram?", a: "Да, это частый канал для B2B и B2C в РФ." },
      { q: "Как измеряете эффект?", a: "Доля автоответов, время первого ответа, эскалации, CSAT." },
    ],
    enH1,
    enSub: `${enH1}: faster customer answers, less load on agents.`,
    enProblems: ["Ticket volume grows faster than headcount", "Routine questions fill half the shift", "Escalations without context", "No first-line metrics"],
    enDeliverables: ["First-line scenarios", "Channel integrations", "Context-rich escalation", "Closure and CSAT reporting"],
    enIntro: [`${enH1} reduces human load via routine scenarios.`, "Complex cases stay with agents with full context.", "We deploy on your channels without yet another admin panel."],
    enFaq: [
      { q: "Which languages?", a: "Your customers’ languages — usually Russian, multilingual on request." },
      { q: "Telegram?", a: "Yes — a common channel in RU/CIS." },
      { q: "How do you measure impact?", a: "Auto-resolve rate, first response time, escalations, CSAT." },
    ],
  });
}

const hrSolutions = [
  ["resume-screening", "AI-обработка и скрининг резюме", "AI resume screening", "обработка резюме", "скрининг кандидатов"],
  ["onboarding-portal", "Портал онбординга сотрудников", "Employee onboarding portal", "онбординг сотрудников", "адаптация персонала"],
  ["hr-policy-bot", "Бот по HR-политикам и отпускам", "HR policy and leave bot", "hr бот", "вопросы по отпускам"],
  ["recruiting-pipeline", "Воронка подбора в CRM/HRM", "Recruiting pipeline in CRM/HRM", "воронка подбора", "автоматизация рекрутинга"],
];
for (const [slug, h1, enH1, kw1, kw2] of hrSolutions) {
  add({
    cat: "automation",
    slug,
    key: `hr_${slug.replace(/-/g, "_")}`,
    cluster: "hr",
    svc: "enterprise-ai-assistant",
    img: IMG.documents,
    kw: [kw1, kw2, "автоматизация hr"],
    related: [R.hr, R.kb, R.documents],
    h1,
    sub: `${h1} — меньше рутины у HR, быстрее закрытие вакансий и адаптация.`,
    problems: ["Резюме копятся без разбора", "Онбординг хаотичный", "HR отвечает на одни и те же вопросы", "Нет прозрачности воронки кандидатов"],
    deliverables: ["Скрининг / чеклисты / бот — по выбранному сценарию", "Интеграция с почтой и мессенджерами", "Отчёт для HR-руководителя", "Регламент передачи"],
    intro: [`${h1} ускоряет HR-процессы без замены всей HRM.`, "Начинаем с одного потока и измеримого KPI.", "Персональные данные — в вашем контуре."],
    faq: [
      { q: "Это замена рекрутера?", a: "Нет. Это ускорение скрининга и коммуникации; решение по кандидату — за людьми." },
      { q: "Срок пилота?", a: "2–4 недели на один HR-сценарий." },
      { q: "Интеграции?", a: "Почта, Telegram, Google Sheets, Bitrix24, специализированные HRM — по аудиту." },
    ],
    enH1,
    enSub: `${enH1} — less HR busywork, faster hiring and onboarding.`,
    enProblems: ["Resumes pile up unread", "Onboarding is chaotic", "HR answers the same questions daily", "No recruiting pipeline visibility"],
    enDeliverables: ["Screening / checklists / bot for the chosen scenario", "Email and messenger integration", "HR lead report", "Handover playbook"],
    enIntro: [`${enH1} speeds HR without replacing the whole HRM.`, "We start with one flow and a clear KPI.", "Personal data stays in your environment."],
    enFaq: [
      { q: "Does it replace recruiters?", a: "No. It speeds screening and communication; humans decide." },
      { q: "Pilot length?", a: "2–4 weeks for one HR scenario." },
      { q: "Integrations?", a: "Email, Telegram, Sheets, Bitrix24, HRMs — based on audit." },
    ],
  });
}

const mgmtSolutions = [
  ["ceo-dashboard", "Управленческий дашборд для CEO", "CEO management dashboard", "дашборд для руководителя", "управленческая панель"],
  ["weekly-digest", "Еженедельная AI-сводка по бизнесу", "Weekly AI business digest", "ai аналитика", "сводка для директора"],
  ["ops-alerts", "Алерты по кассе, SLA и воронке", "Cash, SLA and pipeline alerts", "алерты бизнеса", "контроль показателей"],
];
for (const [slug, h1, enH1, kw1, kw2] of mgmtSolutions) {
  add({
    cat: "automation",
    slug,
    key: `mgmt_${slug.replace(/-/g, "_")}`,
    cluster: "management",
    svc: "ai-discovery-roadmap",
    img: IMG.architecture,
    kw: [kw1, kw2, "ai для руководителя"],
    related: [R.management, R.crm, R.sales],
    h1,
    sub: `${h1}: цифры и отклонения без ручной сборки отчётов.`,
    problems: ["Отчётность запаздывает", "Цифры из разных систем не сходятся", "Нет ранних сигналов по кассе и SLA", "Руководитель тонет в операционке"],
    deliverables: ["Панель / дайджест / алерты под роль", "Подключение источников данных", "Правила аномалий", "Короткий регламент чтения метрик"],
    intro: [`${h1} экономит часы руководителя каждую неделю.`, "Источник правды — ваши CRM/1С; AI помогает читать отклонения.", "Внедряем без «большой data-платформы» на старте."],
    faq: [
      { q: "Нужно ли озеро данных?", a: "Нет. На старте — витрина ключевых метрик из 2–4 систем." },
      { q: "Кто владеет цифрами?", a: "Финансовый/операционный владелец у вас; мы настраиваем поставку." },
      { q: "Срок?", a: "Первая панель — 2–3 недели после доступа к источникам." },
    ],
    enH1,
    enSub: `${enH1}: numbers and anomalies without manual report assembly.`,
    enProblems: ["Reporting is late", "Numbers from systems do not match", "No early cash/SLA signals", "Leaders drown in ops noise"],
    enDeliverables: ["Dashboard / digest / alerts for the role", "Data source connections", "Anomaly rules", "Short metric reading playbook"],
    enIntro: [`${enH1} saves executive hours every week.`, "CRM/ERP stay the source of truth; AI helps read anomalies.", "No big data platform required at the start."],
    enFaq: [
      { q: "Do we need a data lake?", a: "No. Start with a metrics mart from 2–4 systems." },
      { q: "Who owns the numbers?", a: "Your finance/ops owner; we set up the pipeline." },
      { q: "Timeline?", a: "First dashboard in 2–3 weeks after source access." },
    ],
  });
}

// ——— INTEGRATIONS children ———
const integSolutions = [
  ["crm", "integrations", "telegram-crm", "Интеграция Telegram с CRM", "Telegram to CRM integration", "telegram crm", "заявки из telegram", IMG.crm, "business-process-automation", [R.crm, R.amocrm, R.bitrix]],
  ["crm", "integrations", "site-to-crm", "Заявки с сайта в CRM без потерь", "Website leads into CRM without loss", "заявки с сайта", "лиды в crm", IMG.crm, "crm-integration", [R.crm, R.sales]],
  ["crm", "integrations", "crm-robots", "Роботы и автоматизация в CRM", "CRM robots and automation", "роботы crm", "crm автоматизация", IMG.crm, "crm-integration", [R.crm, R.sales]],
  ["crm", "integrations", "crm-analytics", "Аналитика и отчёты CRM", "CRM analytics and reporting", "отчёты crm", "аналитика продаж", IMG.crm, "crm-integration", [R.crm, R.management]],
  ["amocrm", "integrations", "amocrm-ai", "AI для amoCRM", "AI for amoCRM", "ai amocrm", "автоматизация amocrm", IMG.crm, "crm-integration", [R.amocrm, R.sales]],
  ["amocrm", "integrations", "amocrm-widgets", "Виджеты и доработки amoCRM", "amoCRM widgets and customizations", "виджеты amocrm", "доработка amocrm", IMG.crm, "crm-integration", [R.amocrm, R.crm]],
  ["amocrm", "integrations", "amocrm-pipelines", "Воронки и цифровые воронки amoCRM", "amoCRM pipelines setup", "воронки amocrm", "цифровые воронки", IMG.crm, "crm-integration", [R.amocrm, R.sales]],
  ["bitrix24", "integrations", "bitrix24-ai", "AI для Bitrix24", "AI for Bitrix24", "ai bitrix24", "автоматизация bitrix24", IMG.crm, "crm-integration", [R.bitrix, R.sales]],
  ["bitrix24", "integrations", "bitrix24-bots", "Боты и открытые линии Bitrix24", "Bitrix24 bots and open lines", "боты bitrix24", "открытые линии", IMG.crm, "enterprise-ai-assistant", [R.bitrix, R.support]],
  ["bitrix24", "integrations", "bitrix24-tasks", "Автоматизация задач и проектов Bitrix24", "Bitrix24 tasks and projects automation", "задачи bitrix24", "проекты bitrix24", IMG.workflow, "business-process-automation", [R.bitrix, R.processes]],
  ["1c", "integrations", "1c-crm-sync", "Синхронизация 1С и CRM", "1C and CRM synchronization", "интеграция 1с crm", "синхронизация 1с", IMG.erp, "crm-integration", [R.onec, R.crm]],
  ["1c", "integrations", "1c-ai-layer", "AI-слой поверх 1С", "AI layer on top of 1C", "ai для 1с", "автоматизация 1с", IMG.erp, "business-process-automation", [R.onec, R.documents]],
  ["1c", "integrations", "1c-documents", "Документы и счета из 1С автоматически", "Automatic documents and invoices from 1C", "счета из 1с", "документы 1с", IMG.erp, "document-processing", [R.onec, R.documents]],
  ["1c", "integrations", "1c-stock", "Остатки и заказы: 1С ↔ сайт/CRM", "Stock and orders: 1C ↔ site/CRM", "остатки 1с", "заказы 1с", IMG.erp, "business-process-automation", [R.onec, R.crm]],
  ["api", "integrations", "api-integrations", "Интеграция по API под ключ", "Custom API integrations", "интеграция api", "rest api интеграция", IMG.architecture, "business-process-automation", [R.integrations, R.crm]],
  ["api", "integrations", "erp-integration", "Интеграция ERP с CRM и сайтом", "ERP integration with CRM and site", "интеграция erp", "erp crm", IMG.erp, "business-process-automation", [R.onec, R.crm]],
  ["api", "integrations", "n8n-automation", "Автоматизация на n8n для бизнеса", "n8n automation for business", "n8n автоматизация", "n8n для бизнеса", IMG.workflow, "n8n", [R.processes, R.integrations]],
  ["api", "integrations", "webhook-events", "События и webhook между системами", "Webhooks and events between systems", "webhook интеграция", "событийная интеграция", IMG.architecture, "business-process-automation", [R.integrations, R.crm]],
];

for (const [cluster, cat, slug, h1, enH1, kw1, kw2, img, svc, related] of integSolutions) {
  add({
    cat,
    slug,
    key: `int_${slug.replace(/-/g, "_")}`,
    cluster,
    svc,
    img,
    kw: [kw1, kw2],
    related,
    h1,
    sub: `${h1}: надёжный обмен данными без ручного копирования и «файл на почту».`,
    problems: ["Данные расходятся между системами", "Ручной перенос каждый день", "Ошибки в заказах и статусах", "Нет логов и повторных попыток"],
    deliverables: ["Схема потоков данных", "Production-интеграция с логированием", "Обработка ошибок и ретраи", "Документация для вашей команды"],
    intro: [`${h1} убирает ручной мост между системами.`, "Проектируем контракты данных, идемпотентность и мониторинг.", "AI не обязателен: часто достаточно стабильного API-слоя."],
    faq: [
      { q: "Сколько длится типовая интеграция?", a: "2–6 недель в зависимости от числа сущностей и окружений." },
      { q: "Можно ли on-prem?", a: "Да. Часто для 1С и внутренних API." },
      { q: "Кто поддерживает после запуска?", a: "Передаём вам или сопровождаем по SLA." },
    ],
    enH1,
    enSub: `${enH1}: reliable data exchange without copy-paste and “file by email”.`,
    enProblems: ["Systems drift out of sync", "Daily manual transfers", "Order and status errors", "No logs or retries"],
    enDeliverables: ["Data-flow diagram", "Production integration with logging", "Error handling and retries", "Docs for your team"],
    enIntro: [`${enH1} removes the manual bridge between systems.`, "We design data contracts, idempotency and monitoring.", "AI is optional — a stable API layer is often enough."],
    enFaq: [
      { q: "Typical timeline?", a: "2–6 weeks depending on entities and environments." },
      { q: "On-prem possible?", a: "Yes — common for ERP and internal APIs." },
      { q: "Who supports after launch?", a: "Your team after handover, or us under SLA." },
    ],
  });
}

// ——— INDUSTRIES ———
const industries = [
  ["construction", "AI и автоматизация для строительства", "AI and automation for construction", "ai для строительства", "автоматизация строительства", "сметы, заявки подрядчиков, документы на объектах"],
  ["manufacturing", "AI и автоматизация для производства", "AI and automation for manufacturing", "ai для производства", "автоматизация производства", "заявки, качество, склад и сменные отчёты"],
  ["logistics", "AI и автоматизация для логистики", "AI and automation for logistics", "ai для логистики", "автоматизация логистики", "заявки на перевозку, статусы, документы"],
  ["medicine", "AI и автоматизация для медицины и клиник", "AI and automation for clinics", "ai для медицины", "автоматизация клиники", "запись, документы, ответы пациентам"],
  ["banks", "AI и автоматизация для банков и финансов", "AI and automation for banking", "ai для банков", "автоматизация финпроцессов", "заявки, KYC-документы, поддержка"],
  ["restaurants", "AI и автоматизация для ресторанов", "AI and automation for restaurants", "ai для ресторанов", "автоматизация ресторана", "заявки, закупки, отзывы и смена"],
  ["ecommerce", "AI и автоматизация для интернет-магазинов", "AI and automation for ecommerce", "ai для интернет-магазинов", "автоматизация ecommerce", "заказы, поддержка, контент и CRM"],
  ["retail", "AI и автоматизация для ритейла", "AI and automation for retail", "ai для ритейла", "автоматизация розницы", "остатки, заявки магазинов, CRM"],
  ["real-estate", "AI и автоматизация для недвижимости", "AI and automation for real estate", "ai для недвижимости", "автоматизация агентства недвижимости", "лиды, показы, документы сделок"],
  ["education", "AI и автоматизация для образования", "AI and automation for education", "ai для образования", "автоматизация edtech", "заявки, поддержка студентов, база знаний"],
  ["legal", "AI и автоматизация для юристов и юрфирм", "AI and automation for legal teams", "ai для юристов", "автоматизация юрфирмы", "договоры, поиск по практике, согласования"],
  ["transport", "AI и автоматизация для транспорта", "AI and automation for transport", "ai для транспорта", "автоматизация транспорта", "заявки, рейсы, документы"],
  ["hospitality", "AI и автоматизация для гостиниц", "AI and automation for hospitality", "ai для гостиниц", "автоматизация отеля", "брони, поддержка гостей, регламенты"],
  ["agriculture", "AI и автоматизация для агробизнеса", "AI and automation for agribusiness", "ai для сельского хозяйства", "автоматизация агро", "заявки, учёт, документы поставок"],
  ["telecom", "AI и автоматизация для телеком", "AI and automation for telecom", "ai для телеком", "автоматизация телеком", "тикеты, продажи B2B, база знаний"],
];

for (const [slug, h1, enH1, kw1, kw2, focus] of industries) {
  add({
    cat: "industries",
    slug,
    key: `ind_${slug.replace(/-/g, "_")}`,
    cluster: "industries",
    svc: "business-process-automation",
    img: IMG.workflow,
    kw: [kw1, kw2, "автоматизация бизнес процессов"],
    related: [R.processes, R.documents, R.crm],
    h1,
    sub: `${h1}: процессы, CRM и документы под специфику отрасли — AI только там, где даёт ROI. Фокус: ${focus}.`,
    problems: [
      `В отрасли «${slug}» много ручных заявок и документов`,
      "Системы учёта не связаны с продажами и поддержкой",
      "Типовые вопросы съедают время экспертов",
      "Руководителю сложно видеть операционный статус",
    ],
    deliverables: [
      "Аудит 1–2 ключевых отраслевых процессов",
      "Пилот автоматизации с ROI",
      "Интеграции CRM / документов / учёта",
      "Регламент и обучение команды",
    ],
    intro: [
      `${h1} — это отраслевой вход в автоматизацию, а не универсальный «AI-пакет».`,
      `Мы начинаем с реальных сценариев: ${focus}.`,
      "Дальше масштабируем то, что доказало эффект на пилоте.",
    ],
    faq: [
      { q: "Есть ли готовый отраслевой продукт?", a: "Есть типовые сценарии. Финальная архитектура всегда под ваш стек и регламенты." },
      { q: "Срок пилота?", a: "Обычно 3–6 недель на один процесс." },
      { q: "Нужен ли отраслевой консалтинг?", a: "Мы приносим экспертизу автоматизации; доменные правила подтверждаете вы." },
    ],
    enH1,
    enSub: `${enH1}: processes, CRM and documents for the industry — AI only where it pays back. Focus: ${focus}.`,
    enProblems: [
      `Industry teams still run requests and documents manually`,
      "Systems of record are not linked to sales and support",
      "Routine questions consume expert time",
      "Leaders lack an operational status view",
    ],
    enDeliverables: [
      "Audit of 1–2 key industry processes",
      "Automation pilot with ROI",
      "CRM / docs / ledger integrations",
      "Playbook and team training",
    ],
    enIntro: [
      `${enH1} is an industry entry point — not a generic “AI pack”.`,
      `We start from real scenarios: ${focus}.`,
      "Then we scale what the pilot proves.",
    ],
    enFaq: [
      { q: "Is there a ready product?", a: "There are playbooks. Final architecture always fits your stack and policies." },
      { q: "Pilot length?", a: "Usually 3–6 weeks for one process." },
      { q: "Do you bring domain consulting?", a: "We bring automation expertise; you confirm domain rules." },
    ],
  });
}

// ——— AI / SOLUTIONS extras ———
const aiExtras = [
  ["solutions", "rag-search", "RAG-поиск по документам компании", "RAG search over company documents", "rag система", "поиск по документам", "enterprise-ai-assistant", IMG.architecture, [R.kb, R.corporate]],
  ["solutions", "ocr-pipeline", "OCR-конвейер для бизнеса", "Business OCR pipeline", "ocr", "распознавание документов", "ocr", IMG.documents, [R.documents, R.onec]],
  ["solutions", "voice-assistant", "Голосовой AI-ассистент для бизнеса", "Voice AI assistant for business", "голосовой бот", "voice ai", "voice-ai", IMG.architecture, [R.support, R.assistant]],
  ["ai", "private-llm", "Приватный LLM для компании", "Private LLM for companies", "приватный llm", "on premise llm", "private-llm-gigachat", IMG.architecture, [R.corporate, R.kb]],
  ["ai", "ai-audit", "AI-аудит компании и дорожная карта", "Company AI audit and roadmap", "ai аудит", "стратегия внедрения ии", "ai-discovery-roadmap", IMG.architecture, [R.corporate, R.processes]],
  ["ai", "ai-agents", "AI-агенты для бизнес-процессов", "AI agents for business processes", "ai агент для бизнеса", "ai агент", "ai-agent", IMG.workflow, [R.sales, R.processes]],
];

for (const [cat, slug, h1, enH1, kw1, kw2, svc, img, related] of aiExtras) {
  add({
    cat,
    slug,
    key: `ai_${slug.replace(/-/g, "_")}`,
    cluster: "ai-corporate",
    svc,
    img,
    kw: [kw1, kw2],
    related,
    h1,
    sub: `${h1}: внедрение с ROI, безопасным контуром и передачей команде.`,
    problems: ["Технологию выбрали раньше боли", "Пилоты не доходят до production", "Нет владельца процесса и метрик", "Риски по данным не закрыты"],
    deliverables: ["Сценарий с KPI", "Архитектура и оценка рисков", "Production-внедрение", "Документация и обучение"],
    intro: [`${h1} имеет смысл только после ясной бизнес-задачи.`, "Мы начинаем с процесса и данных, затем выбираем модель и интеграции.", "AI — способ автоматизации, не самоцель."],
    faq: [
      { q: "Облако или on-prem?", a: "Зависит от данных и 152-ФЗ. Часто гибрид: чувствительное — в контуре." },
      { q: "Какие модели?", a: "Claude, GigaChat, YandexGPT, open-source — по задаче и требованиям безопасности." },
      { q: "Срок?", a: "Аудит 1–2 недели, пилот 2–6 недель." },
    ],
    enH1,
    enSub: `${enH1}: delivered with ROI, a secure environment, and team handover.`,
    enProblems: ["Technology chosen before the pain", "Pilots never reach production", "No process owner or metrics", "Data risks unresolved"],
    enDeliverables: ["Scenario with KPIs", "Architecture and risk review", "Production delivery", "Docs and training"],
    enIntro: [`${enH1} only makes sense after a clear business job.`, "We start from process and data, then pick models and integrations.", "AI is a means of automation — not the goal."],
    enFaq: [
      { q: "Cloud or on-prem?", a: "Depends on data and compliance. Often hybrid." },
      { q: "Which models?", a: "Claude, GigaChat, YandexGPT, open-source — by task and security needs." },
      { q: "Timeline?", a: "Audit 1–2 weeks, pilot 2–6 weeks." },
    ],
  });
}

// Deduplicate by category+slug
const seen = new Set();
const unique = [];
for (const p of pages) {
  const id = `${p.cat}/${p.slug}`;
  if (seen.has(id)) continue;
  seen.add(id);
  // Avoid colliding with EXISTING landing slugs
  const existing = new Set([
    "automation/processes",
    "automation/documents",
    "automation/sales",
    "integrations/crm",
    "integrations/amocrm",
    "integrations/bitrix24",
    "integrations/1c",
    "solutions/knowledge-base",
    "solutions/assistant",
    "ai/corporate",
  ]);
  if (existing.has(id)) continue;
  unique.push(p);
}

const header = `import type { LandingSpec } from "@/lib/seo-catalog/types";

/**
 * Auto-generated Wordstat SEO landing specs.
 * Regenerate: node scripts/generate-seo-catalog.mjs
 */
export const CATALOG_LANDING_SPECS: LandingSpec[] = [
`;

const body = unique.map(page).join(",\n");
const footer = `\n];\n\nexport const CATALOG_LANDING_COUNT = CATALOG_LANDING_SPECS.length;\n`;

writeFileSync(outPath, header + body + footer, "utf8");
console.log(`Wrote ${unique.length} landing specs → ${outPath}`);
