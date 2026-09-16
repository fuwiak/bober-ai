import type { LandingSpec } from "@/lib/seo-catalog/types";

const IMG = {
  architecture: "/diagrams/system-architecture.svg",
  crm: "/diagrams/crm-integration.svg",
  sales: "/diagrams/sales-pipeline.svg",
  workflow: "/diagrams/workflow-automation.svg",
} as const;

/**
 * Landings for queries where Yandex already shows the site (Webmaster → «Запросы»),
 * but without a dedicated page: «компании по внедрению ии москва», «rag система для
 * бизнеса заказать», «сколько стоит внедрение roistat для отдела продаж»,
 * «аи ассистент кира каспер» / «kira llm», «срм система бобр».
 */
export const CATALOG_LANDING_SPECS_YANDEX_QUERIES: LandingSpec[] = [
  {
    category: "ai",
    slug: "kompanii-po-vnedreniyu-ii-moskva",
    contentKey: "yq_ai_companies_moscow",
    cluster: "ai-corporate",
    serviceSlug: "enterprise-ai-assistant",
    coverImage: IMG.architecture,
    keywords: [
      "компании по внедрению ии москва",
      "компания по внедрению ии в москве",
      "внедрение ии москва",
      "внедрение искусственного интеллекта москва",
      "интегратор ии москва",
      "подрядчик по внедрению ии",
      "как выбрать компанию по внедрению ии",
    ],
    caseStudySlugs: ["kaspersky-ai-assistant", "yandex-telemost-agent", "kp-llm-automation"],
    related: [
      { href: "/ai/ai-implementation", labelRu: "Компания по внедрению ИИ", labelEn: "AI implementation company" },
      { href: "/ai/zakazat-vnedrenie-ii", labelRu: "Заказать внедрение ИИ", labelEn: "Order AI implementation" },
      { href: "/ai/stoimost-vnedreniya-ii", labelRu: "Стоимость внедрения ИИ", labelEn: "AI implementation cost" },
      { href: "/ai/pilot-vnedreniya-ii", labelRu: "Пилот ИИ", labelEn: "AI pilot" },
      { href: "/about", labelRu: "О компании", labelEn: "About us" },
      { href: "/portfolio", labelRu: "Кейсы", labelEn: "Case studies" },
    ],
    ru: {
      h1: "Компании по внедрению ИИ в Москве: как выбрать подрядчика",
      subtitle:
        "Bober AI Systems — московский интегратор ИИ: пилот за 3–6 недель, фиксированная смета, договор с критериями приёмки, NDA, облако или on-premise. Аудит от 150 000 ₽, пилот от 300 000 ₽.",
      problems: [
        "На рынке десятки «компаний по внедрению ИИ», но у большинства нет production-кейсов — только демо и презентации",
        "Смета плавает: сначала «от 100 тысяч», потом «зависит от объёма» — и так до конца проекта",
        "Подрядчик не готов работать в контуре заказчика: данные должны уехать в чужое облако",
        "После сдачи никто не сопровождает: модель деградирует, интеграции ломаются при обновлении CRM",
      ],
      deliverables: [
        "Чек-лист выбора подрядчика по ИИ: 12 вопросов, которые задают до подписания договора",
        "Аудит процесса с расчётом ROI до старта разработки — что автоматизировать первым",
        "Пилот в вашем контуре: CRM/1С/API, on-premise или российское облако (Yandex Cloud, Selectel, Cloud.ru)",
        "Договор с этапами, KPI и критериями приёмки; сопровождение по SLA после запуска",
      ],
      intro: [
        "Запрос «компании по внедрению ИИ Москва» обычно означает, что руководитель уже понял: своими силами не получится, нужен подрядчик, и хочется не ошибиться с выбором. Ниже — на что смотреть и чем мы отличаемся от консалтинга «ради слайдов».",
        "Bober AI Systems работает из Москвы (ИП, ИНН и адрес — на странице «О компании»), внедряет ИИ в продажи, документы и поддержку: коммерческие предложения из CRM, распознавание первички в 1С, ассистенты по базе знаний, речевая аналитика звонков. Партнёр Kaspersky, Yandex Cloud, Selectel, Cloud.ru, Битрикс24.",
        "Ключевое отличие от большинства компаний в выдаче: мы не продаём лицензии и не берём процент с облака. Смета фиксируется до старта, пилот сдаётся по метрике (время обработки, доля автоматически закрытых обращений, точность извлечения полей), а не по факту «что-то показали».",
      ],
      howWeSolve: [
        {
          title: "Проверьте кейсы и контур",
          text: "Спросите у любого подрядчика: где стоит в production, какие метрики, можно ли развернуть on-premise. У нас — Kaspersky, Яндекс Телемост, Bitrix24-проекты с цифрами в портфолио.",
        },
        {
          title: "Требуйте смету до договора",
          text: "Аудит 1–2 недели → смета на пилот с фиксированной суммой и KPI. Если после аудита ИИ не нужен — говорим прямо и предлагаем классическую автоматизацию.",
        },
        {
          title: "Сдача по метрике и SLA",
          text: "Пилот 3–6 недель, приёмка по согласованным критериям, затем production и сопровождение: мониторинг качества ответов, обновление интеграций, обучение команды.",
        },
      ],
      faq: [
        {
          q: "Чем вы отличаетесь от других компаний по внедрению ИИ в Москве?",
          a: "Фиксированная смета до старта, production-кейсы с метриками, работа в контуре заказчика (on-premise или российское облако) и договор с критериями приёмки. Не консалтинг и не перепродажа лицензий.",
        },
        {
          q: "Нужна ли личная встреча в Москве?",
          a: "Не обязательно: бриф и аудит проходят онлайн. При необходимости встречаемся в офисе заказчика в Москве, выезд на объект обсуждается отдельно.",
        },
        {
          q: "Сколько стоит внедрение ИИ в Москве?",
          a: "Аудит от 150 000 ₽, пилот от 300 000 ₽, полноценное внедрение от 400 000 ₽. Подробная разбивка — на странице «Стоимость внедрения ИИ».",
        },
        {
          q: "Работаете с регионами и СНГ?",
          a: "Да: Россия целиком, Казахстан и Узбекистан. Юрлицо российское, договор в рублях; для КЗ/УЗ — отдельные условия.",
        },
      ],
    },
    en: {
      h1: "AI implementation companies in Moscow: how to choose a vendor",
      subtitle:
        "Bober AI Systems is a Moscow-based AI integrator: a 3–6 week pilot, fixed estimate, acceptance criteria in the contract, NDA, cloud or on-premise.",
      problems: [
        "Dozens of “AI companies” with demos but no production cases",
        "Floating estimates that grow until the project ends",
        "Vendors who cannot work inside your perimeter",
        "No support after handover — models degrade, integrations break",
      ],
      deliverables: [
        "12-question vendor checklist before signing",
        "Process audit with ROI before development",
        "Pilot in your contour: CRM/1C/API, on-premise or Russian cloud",
        "Contract with stages, KPI and acceptance; SLA after launch",
      ],
      intro: [
        "“AI implementation companies Moscow” means the owner already knows an in-house attempt will not fly and wants to pick a vendor without regret.",
        "Bober AI Systems works from Moscow and ships AI into sales, documents and support: proposals from CRM, primary document recognition into 1C, knowledge assistants, call analytics. Partner of Kaspersky, Yandex Cloud, Selectel, Cloud.ru, Bitrix24.",
        "We do not resell licenses or take a cloud margin. The estimate is fixed before kickoff and the pilot is accepted by a metric, not by a demo.",
      ],
      howWeSolve: [
        { title: "Check cases and perimeter", text: "Ask any vendor where they run in production and whether on-premise is possible." },
        { title: "Estimate before contract", text: "1–2 week audit, then a fixed pilot estimate with KPI." },
        { title: "Acceptance by metric and SLA", text: "3–6 week pilot, acceptance by agreed criteria, then production and support." },
      ],
      faq: [
        { q: "How are you different?", a: "Fixed estimate, production cases with metrics, work inside your perimeter, acceptance in the contract." },
        { q: "Is an in-person meeting required?", a: "No. Brief and audit run online; we meet in Moscow when needed." },
        { q: "Cost?", a: "Audit from an entry package, pilot next, full rollout after. See the pricing page." },
      ],
    },
  },
  {
    category: "solutions",
    slug: "rag-sistema-dlya-biznesa",
    contentKey: "yq_rag_system_business",
    cluster: "ai-corporate",
    serviceSlug: "rag",
    coverImage: IMG.architecture,
    keywords: [
      "rag система для бизнеса заказать",
      "rag система для бизнеса",
      "заказать rag систему",
      "разработка rag системы",
      "rag под ключ",
      "rag система цена",
      "внедрение rag в компании",
      "rag для компании",
    ],
    caseStudySlugs: ["kaspersky-ai-assistant", "yandex-telemost-agent", "elia-suite"],
    related: [
      { href: "/services/rag", labelRu: "Корпоративный RAG под ключ", labelEn: "Corporate RAG" },
      { href: "/solutions/rag-search", labelRu: "RAG-поиск по документам", labelEn: "RAG document search" },
      { href: "/solutions/knowledge-chatbot", labelRu: "Чат-бот по базе знаний", labelEn: "Knowledge chatbot" },
      { href: "/ai/private-llm", labelRu: "Приватный LLM", labelEn: "Private LLM" },
      { href: "/kaspersky/llm-rag-aist", labelRu: "Безопасный RAG с Kaspersky", labelEn: "Secure RAG with Kaspersky" },
      { href: "/blog/rag-dlya-biznesa", labelRu: "Статья: RAG для бизнеса", labelEn: "Article: RAG for business" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "RAG-система для бизнеса: заказать разработку под ключ",
      subtitle:
        "Ассистент, который отвечает по вашим документам с цитатой источника — регламенты, договоры, база знаний, 1С и CRM. Пилот 4–6 недель от 300 000 ₽, on-premise или российское облако.",
      problems: [
        "Сотрудники ищут ответы в 40 папках и у «того самого коллеги» — новичок выходит на продуктивность за 3 месяца",
        "ChatGPT-обёртка «галлюцинирует»: отвечает уверенно, но не по вашему регламенту и без ссылки на источник",
        "Документы нельзя отдавать во внешнее облако — ИБ блокирует любой SaaS-чат",
        "Пробовали «RAG за неделю» — точность 60%, никто не пользуется",
      ],
      deliverables: [
        "RAG-система с индексом по вашим документам: PDF, DOCX, Confluence, 1С, CRM, тикеты — с правами доступа",
        "Ответы с цитатами и ссылкой на документ; «не знаю», если источника нет",
        "Развёртывание в вашем контуре: on-premise или Yandex Cloud / Selectel / Cloud.ru; открытые модели или API по политике ИБ",
        "Набор эталонных вопросов, метрика точности и сопровождение: переиндексация, мониторинг качества",
      ],
      intro: [
        "«Заказать RAG-систему для бизнеса» — это не про чат-бот на сайте. RAG (retrieval-augmented generation) — это связка поиска по вашим документам и языковой модели: ассистент сначала находит нужные фрагменты в базе, потом отвечает, ссылаясь на них. Именно поэтому он не выдумывает и работает по вашим правилам.",
        "Мы делаем RAG-системы для поддержки, продаж, юристов, HR и техподдержки: ответы по регламентам, договорам, инструкциям, каталогам, тикетам. Кейсы — ассистент для Kaspersky и агент для Яндекс Телемоста в портфолио.",
        "Стоимость зависит от объёма и типов документов, требований ИБ и интеграций. Типовой пилот: одна база знаний, один канал (веб, Telegram, Битрикс24), метрика точности на 50–100 эталонных вопросах — 4–6 недель, от 300 000 ₽.",
      ],
      howWeSolve: [
        {
          title: "Аудит документов и вопросов",
          text: "Собираем реальные вопросы сотрудников и клиентов, размечаем источники, определяем права доступа. Считаем, где RAG окупится, а где хватит обычного поиска.",
        },
        {
          title: "Пилот с метрикой",
          text: "Индекс, ретривер, промпты, цитаты. Тест на эталонных вопросах: точность, полнота, доля «не знаю». Правим чанкинг и модели до целевого порога.",
        },
        {
          title: "Production и сопровождение",
          text: "Интеграция в канал (портал, Telegram, CRM), SSO и права, автоматическая переиндексация, мониторинг качества и дообучение под новые документы.",
        },
      ],
      faq: [
        {
          q: "Сколько стоит RAG-система для бизнеса?",
          a: "Пилот от 300 000 ₽ (одна база знаний, один канал, метрика точности). Production-внедрение с несколькими источниками, правами доступа и интеграциями — от 600 000 ₽. Смета фиксируется после аудита.",
        },
        {
          q: "Можно ли развернуть RAG без выхода данных наружу?",
          a: "Да: on-premise на вашем сервере или в российском облаке с открытыми моделями (Qwen, Llama, YandexGPT/GigaChat по API). Для регулируемых отраслей — контур с Kaspersky.",
        },
        {
          q: "Какие документы подходят?",
          a: "PDF, Word, Excel, Confluence/Wiki, сайты, 1С, CRM, тикеты, переписка. Сканы — через OCR. Права доступа наследуются из источника.",
        },
        {
          q: "Чем RAG отличается от «обучения нейросети на наших данных»?",
          a: "Дообучение (fine-tuning) меняет модель и требует переобучения при каждом изменении документов. RAG хранит знания в индексе: обновили документ — ассистент отвечает по новой версии сразу.",
        },
        {
          q: "Как заказать?",
          a: "Форма ниже или /tel. Пришлите 5–10 типовых вопросов и примеры документов — вернём смету и план пилота.",
        },
      ],
    },
    en: {
      h1: "RAG system for business: order a turnkey build",
      subtitle:
        "An assistant that answers from your documents with a cited source — policies, contracts, knowledge base, 1C and CRM. Pilot in 4–6 weeks, on-premise or Russian cloud.",
      problems: [
        "Answers live in 40 folders and one colleague’s head",
        "ChatGPT wrappers hallucinate and cite nothing",
        "Security forbids external SaaS chat",
        "“RAG in a week” hits 60% accuracy and nobody uses it",
      ],
      deliverables: [
        "RAG index over PDF, DOCX, Confluence, 1C, CRM, tickets — with access rights",
        "Answers with citations; “don’t know” when there is no source",
        "Deployment in your perimeter, open models or API per security policy",
        "Golden question set, accuracy metric, re-indexing and monitoring",
      ],
      intro: [
        "Ordering a RAG system is not a website chatbot. RAG pairs search over your documents with an LLM: retrieve first, then answer with citations.",
        "We build RAG for support, sales, legal, HR and helpdesk. Cases: Kaspersky assistant and Yandex Telemost agent.",
        "Price depends on document volume, security and integrations. A typical pilot: one knowledge base, one channel, accuracy on 50–100 golden questions, 4–6 weeks.",
      ],
      howWeSolve: [
        { title: "Audit documents and questions", text: "Real questions, sources, access rights, where RAG pays off." },
        { title: "Pilot with a metric", text: "Index, retriever, prompts, citations. Tune until the target threshold." },
        { title: "Production and support", text: "Channel integration, SSO, re-indexing, quality monitoring." },
      ],
      faq: [
        { q: "Cost?", a: "Pilot first, production with several sources and integrations next. Estimate fixed after audit." },
        { q: "No data leaving the perimeter?", a: "Yes: on-premise or Russian cloud with open models." },
        { q: "RAG vs fine-tuning?", a: "RAG keeps knowledge in an index — update a document and the answer changes immediately." },
      ],
    },
  },
  {
    category: "integrations",
    slug: "vnedrenie-roistat-otdel-prodazh-cena",
    contentKey: "yq_roistat_sales_price",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: IMG.sales,
    keywords: [
      "сколько стоит внедрение roistat",
      "внедрение roistat для отдела продаж цена",
      "внедрение roistat цена",
      "стоимость внедрения roistat",
      "roistat для отдела продаж",
      "roistat автосервис",
      "roistat сквозная аналитика цена",
      "настройка roistat под ключ",
    ],
    caseStudySlugs: ["ai-sales-loop", "crm-1c-sync", "support-knowledge-base"],
    related: [
      { href: "/integrations/roistat", labelRu: "Внедрение Roistat", labelEn: "Roistat implementation" },
      { href: "/integrations/business-from-phone", labelRu: "CRM, Roistat и телефония в одном контуре", labelEn: "CRM, Roistat and telephony contour" },
      { href: "/automation/sales-department", labelRu: "Автоматизация отдела продаж", labelEn: "Sales department automation" },
      { href: "/amocrm", labelRu: "amoCRM", labelEn: "amoCRM" },
      { href: "/bitrix", labelRu: "Битрикс24", labelEn: "Bitrix24" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Сколько стоит внедрение Roistat для отдела продаж",
      subtitle:
        "Сквозная аналитика «реклама → лид → сделка → деньги» в amoCRM или Битрикс24. Базовая настройка от 60 000 ₽, внедрение под ключ с коллтрекингом, интеграциями и отчётами для РОПа — от 150 000 ₽. Сроки 2–4 недели.",
      problems: [
        "Маркетинг отчитывается лидами, продажи — сделками, а сколько стоит клиент по каждому каналу, никто не знает",
        "Roistat подключили «по инструкции», но сделки не матчатся с визитами: половина выручки в «прямых заходах»",
        "Коллтрекинг и заявки с сайта, WhatsApp и Авито идут мимо CRM — отчёт Roistat пустой",
        "Для автосервиса, клиники или сети точек: несколько филиалов, а аналитика одна на всех",
      ],
      deliverables: [
        "Roistat ↔ CRM (amoCRM/Битрикс24): статусы, суммы, отказы; сделки привязаны к источнику визита",
        "Коллтрекинг, формы, мессенджеры, Авито/маркетплейсы — все каналы в одном отчёте",
        "Отчёт для РОПа и собственника: CPL, CAC, ROI по каналам, конверсия по менеджерам",
        "Регламент для отдела продаж и маркетинга: кто и что заполняет, чтобы цифры не расходились",
      ],
      intro: [
        "Запрос «сколько стоит внедрение Roistat для отдела продаж» почти всегда упирается в одно: подписка на Roistat — это лишь часть стоимости. Основные деньги и время уходят на связку с CRM, телефонией и формами, а также на дисциплину заполнения сделок. Без этого сквозная аналитика показывает красивые, но неверные цифры.",
        "Ориентиры по цене. Базовая настройка (счётчик, цели, интеграция с amoCRM или Битрикс24, 1 сайт, 1 канал звонков) — 60 000–90 000 ₽, 1–2 недели. Внедрение под ключ для отдела продаж (коллтрекинг, все источники заявок, мультиканальные отчёты, обучение РОПа) — 150 000–300 000 ₽, 2–4 недели. Сеть филиалов, автосервис с несколькими точками или e-commerce со складом — от 300 000 ₽ с проектированием.",
        "Подписка Roistat оплачивается вендору отдельно (зависит от тарифа и трафика). Мы не берём процент с лицензий — только за работу и результат: сделки в CRM привязаны к источникам, отчёт сходится с выручкой из 1С/банка.",
      ],
      howWeSolve: [
        {
          title: "Аудит воронки и каналов",
          text: "Разбираем, откуда приходят заявки (сайт, звонки, мессенджеры, Авито, офлайн), как ведутся сделки в CRM и где теряется атрибуция. Фиксируем смету.",
        },
        {
          title: "Настройка и интеграции",
          text: "Roistat, коллтрекинг, формы, CRM, телефония, при необходимости 1С и оплаты. Правила матчинга сделок с визитами, мультиканальные модели атрибуции.",
        },
        {
          title: "Отчёты и обучение",
          text: "Дашборд РОПа и собственника, еженедельный отчёт по CAC/ROI, регламент заполнения для менеджеров. Первый месяц — сопровождение и правка расхождений.",
        },
      ],
      faq: [
        {
          q: "Сколько стоит внедрение Roistat для небольшого отдела продаж (3–5 менеджеров)?",
          a: "Обычно базовый пакет 60 000–90 000 ₽: интеграция с amoCRM/Битрикс24, коллтрекинг на один номер, отчёт по каналам. Срок 1–2 недели.",
        },
        {
          q: "Подходит ли для автосервиса или сети автосервисов?",
          a: "Да. Для авторемонта важны звонки и записи: настраиваем коллтрекинг по точкам, связку с CRM/YCLIENTS и отчёт по филиалам. Сеть из 2–5 точек — от 150 000 ₽.",
        },
        {
          q: "Что входит в цену, а что оплачивается отдельно?",
          a: "В цену входит настройка, интеграции, отчёты и обучение. Отдельно — подписка Roistat, номера для коллтрекинга и лицензии CRM у вендоров.",
        },
        {
          q: "Можно ли починить уже внедрённый Roistat?",
          a: "Да, аудит текущей настройки — от 30 000 ₽: находим, почему сделки не матчатся, и правим интеграции. Часто дешевле, чем переделывать с нуля.",
        },
        {
          q: "Есть ли альтернатива Roistat?",
          a: "Для Битрикс24 — встроенная сквозная аналитика, для amoCRM — Calltouch/CoMagic или собственная сборка на Метрике и BI. Подберём под бюджет и стек.",
        },
      ],
    },
    en: {
      h1: "How much does a Roistat rollout for a sales team cost",
      subtitle:
        "End-to-end analytics “ad → lead → deal → money” in amoCRM or Bitrix24. Basic setup in 1–2 weeks, turnkey rollout with call tracking, integrations and reports in 2–4 weeks.",
      problems: [
        "Marketing reports leads, sales report deals, nobody knows CAC per channel",
        "Roistat set up “by the manual” — half of revenue lands in direct traffic",
        "Calls, WhatsApp and Avito bypass the CRM",
        "Several branches, one blended report",
      ],
      deliverables: [
        "Roistat ↔ CRM: statuses, amounts, deals matched to visits",
        "Call tracking, forms, messengers, marketplaces in one report",
        "Owner and sales-head dashboard: CPL, CAC, ROI, manager conversion",
        "Data discipline rules for sales and marketing",
      ],
      intro: [
        "The Roistat subscription is only part of the cost. Most money and time go into CRM, telephony and form integrations, plus deal hygiene.",
        "Price guide: basic setup 1–2 weeks; turnkey rollout for a sales team 2–4 weeks; multi-branch or e-commerce with design phase — longer.",
        "The vendor subscription is paid separately. We charge for the work and the result: deals attributed, report matches revenue.",
      ],
      howWeSolve: [
        { title: "Funnel and channel audit", text: "Where leads come from, how deals are kept, where attribution breaks. Fixed estimate." },
        { title: "Setup and integrations", text: "Roistat, call tracking, forms, CRM, telephony, 1C and payments when needed." },
        { title: "Reports and training", text: "Dashboards, weekly CAC/ROI report, rules for managers, first-month support." },
      ],
      faq: [
        { q: "Small team of 3–5 managers?", a: "Basic package: CRM integration, one call-tracking number, channel report." },
        { q: "Car service chains?", a: "Yes: per-branch call tracking, CRM/YCLIENTS link, branch report." },
        { q: "Fix an existing rollout?", a: "Yes — audit first, then repair integrations. Often cheaper than a redo." },
      ],
    },
  },
  {
    category: "ai",
    slug: "kira-llm-kaspersky-ai-assistent",
    contentKey: "yq_kira_llm_kaspersky",
    cluster: "ai-corporate",
    serviceSlug: "enterprise-ai-assistant",
    coverImage: IMG.architecture,
    keywords: [
      "kira llm",
      "аи ассистент кира каспер",
      "ai ассистент kira kaspersky",
      "kaspersky kira",
      "kira kaspersky llm ассистент",
      "внедрение kira",
      "интеграция kira llm",
      "ассистент касперского kira",
    ],
    caseStudySlugs: ["kaspersky-ai-assistant", "yandex-telemost-agent"],
    related: [
      { href: "/kaspersky", labelRu: "Решения Kaspersky + AI", labelEn: "Kaspersky + AI solutions" },
      { href: "/kaspersky/container-security-kira", labelRu: "Container Security + KIRA", labelEn: "Container Security + KIRA" },
      { href: "/kaspersky/soc-kuma-kira", labelRu: "SOC: KUMA + KIRA", labelEn: "SOC: KUMA + KIRA" },
      { href: "/kaspersky/llm-rag-aist", labelRu: "Безопасный LLM/RAG-контур", labelEn: "Secure LLM/RAG contour" },
      { href: "/secure-ai", labelRu: "Безопасный ИИ", labelEn: "Secure AI" },
      { href: "/ai/private-llm", labelRu: "Приватный LLM", labelEn: "Private LLM" },
    ],
    ru: {
      h1: "AI-ассистент KIRA (Kaspersky): внедрение и интеграция LLM-ассистента",
      subtitle:
        "KIRA — ИИ-ассистент Kaspersky на базе LLM для SOC, DevSecOps и аналитиков ИБ. Интегрируем KIRA с KUMA, Container Security, тикетами Bitrix24/Jira и Telegram или разворачиваем аналог на частном LLM в вашем контуре. Пилот 4–6 недель.",
      problems: [
        "Аналитики SOC тонут в алертах: разбор одного инцидента занимает часы, а объяснение «что случилось» для бизнеса — ещё столько же",
        "Хочется LLM-ассистента в ИБ, но данные об инцидентах нельзя отправлять в публичные модели",
        "KIRA куплена в составе продуктов Kaspersky, но не встроена в процессы: нет связи с тикетами, чатами и отчётами",
        "Непонятно, где хватит KIRA, а где нужен собственный RAG-ассистент по регламентам и базе знаний",
      ],
      deliverables: [
        "Сценарии для KIRA: объяснение инцидентов и уязвимостей на русском, приоритизация, черновики отчётов",
        "Интеграция с KUMA / Container Security / Symphony XDR, тикетами Bitrix24 или Jira, Telegram-уведомлениями",
        "Приватный LLM-контур как дополнение или альтернатива: открытые модели on-premise, RAG по вашим регламентам",
        "Регламент использования, журналирование запросов, оценка качества ответов и обучение команды",
      ],
      intro: [
        "KIRA (Kaspersky Intelligent Response Assistant) — ИИ-ассистент на языковой модели, встроенный в продукты Kaspersky: объясняет события и уязвимости, помогает аналитику собрать картину инцидента и подготовить отчёт. Запросы «kira llm» и «аи ассистент кира каспер» обычно означают одно из двух: понять, что это и как работает, или встроить ассистента в реальный процесс SOC/DevSecOps.",
        "Bober AI Systems — партнёр Kaspersky и интегратор ИИ. Мы делаем два типа проектов: (1) интеграция KIRA с вашим стеком — KUMA, Container Security, тикеты, чаты, отчёты; (2) собственный LLM-ассистент в закрытом контуре, когда нужны ответы по внутренним регламентам, базе знаний или данным, которые не должны покидать периметр.",
        "Кейс: ассистент для Kaspersky в портфолио. Типовой пилот — один сценарий (например, объяснение и приоритизация алертов KUMA с черновиком тикета), 4–6 недель, метрика — время разбора инцидента.",
      ],
      howWeSolve: [
        {
          title: "Аудит процессов ИБ",
          text: "Разбираем, какие события и вопросы забирают время аналитиков, какие данные можно отдать ассистенту, какие ограничения ИБ и лицензий (Advanced PRO, API key/OAuth) действуют.",
        },
        {
          title: "Интеграция KIRA или частный LLM",
          text: "Подключаем KIRA к KUMA/Container Security и тикетам, либо разворачиваем открытую модель on-premise с RAG по регламентам. Промпты, права доступа, журнал запросов.",
        },
        {
          title: "Пилот и сопровождение",
          text: "Метрика — время разбора инцидента и доля тикетов с готовым черновиком. После приёмки — production, мониторинг качества ответов, дообучение под новые сценарии.",
        },
      ],
      faq: [
        {
          q: "Что такое KIRA от Kaspersky?",
          a: "LLM-ассистент внутри продуктов Kaspersky (KUMA, Container Security, XDR): объясняет события и уязвимости, помогает расследовать инциденты и готовить отчёты. Лицензируется в составе продуктов вендора.",
        },
        {
          q: "Вы продаёте KIRA?",
          a: "Нет, лицензии — у Kaspersky и его дистрибьюторов. Мы внедряем: встраиваем ассистента в процессы, интегрируем с тикетами и чатами, при необходимости дополняем собственным LLM-контуром.",
        },
        {
          q: "Можно ли использовать KIRA с внешней или собственной LLM?",
          a: "В ряде продуктов Kaspersky доступно подключение внешней модели по API key/OAuth. Мы помогаем выбрать модель, настроить контур и политику данных.",
        },
        {
          q: "Нужен ассистент не для ИБ, а для поддержки или продаж — это к вам?",
          a: "Да: делаем корпоративных ИИ-ассистентов по базе знаний, CRM и документам — см. «Корпоративный ИИ» и «RAG-система для бизнеса».",
        },
      ],
    },
    en: {
      h1: "KIRA AI assistant (Kaspersky): LLM assistant rollout and integration",
      subtitle:
        "KIRA is Kaspersky’s LLM assistant for SOC, DevSecOps and security analysts. We integrate it with KUMA, Container Security, Bitrix24/Jira tickets and Telegram, or deploy a private LLM alternative in your perimeter.",
      problems: [
        "SOC analysts drown in alerts; explaining incidents to the business takes hours",
        "Incident data cannot go to public models",
        "KIRA is licensed but not wired into tickets, chats and reports",
        "Unclear where KIRA is enough and where a custom RAG assistant is needed",
      ],
      deliverables: [
        "KIRA scenarios: incident and vulnerability explanations, prioritisation, report drafts",
        "Integration with KUMA / Container Security / XDR, Bitrix24 or Jira, Telegram",
        "Private LLM contour as a complement or alternative",
        "Usage rules, request logging, answer quality metrics, team training",
      ],
      intro: [
        "KIRA (Kaspersky Intelligent Response Assistant) is an LLM assistant inside Kaspersky products. The queries “kira llm” usually mean either understanding it or embedding it into a real SOC/DevSecOps process.",
        "Bober AI Systems is a Kaspersky partner and AI integrator: we integrate KIRA with your stack or build a private LLM assistant for internal policies and data.",
        "Case: Kaspersky assistant in the portfolio. Typical pilot — one scenario, 4–6 weeks, metric: incident triage time.",
      ],
      howWeSolve: [
        { title: "Security process audit", text: "Which events cost analyst time, what data the assistant may see, licence limits." },
        { title: "KIRA integration or private LLM", text: "Connect KIRA to KUMA/Container Security and tickets, or deploy an open model on-premise with RAG." },
        { title: "Pilot and support", text: "Metric: triage time and share of tickets with a ready draft. Then production and monitoring." },
      ],
      faq: [
        { q: "What is KIRA?", a: "Kaspersky’s LLM assistant inside KUMA, Container Security and XDR." },
        { q: "Do you sell KIRA?", a: "No — licences come from Kaspersky. We integrate it into processes." },
        { q: "Need an assistant for support or sales?", a: "Yes: see Enterprise AI and RAG system for business." },
      ],
    },
  },
  {
    category: "solutions",
    slug: "crm-sistema-bober",
    contentKey: "yq_crm_system_bober",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: IMG.crm,
    keywords: [
      "срм система бобр",
      "crm система бобр",
      "crm бобр",
      "bober crm",
      "бобр ии",
      "bober ai crm",
      "crm с ии от bober ai",
      "бобер ai системс",
    ],
    caseStudySlugs: ["ai-sales-loop", "support-knowledge-base", "crm-1c-sync"],
    related: [
      { href: "/integrations/crm", labelRu: "Интеграция CRM", labelEn: "CRM integration" },
      { href: "/ai/vnedrenie-ii-v-crm", labelRu: "ИИ в CRM", labelEn: "AI in CRM" },
      { href: "/amocrm", labelRu: "amoCRM", labelEn: "amoCRM" },
      { href: "/bitrix", labelRu: "Битрикс24", labelEn: "Bitrix24" },
      { href: "/about", labelRu: "О компании Bober AI", labelEn: "About Bober AI" },
      { href: "/portfolio", labelRu: "Кейсы", labelEn: "Case studies" },
    ],
    ru: {
      h1: "CRM-система «Бобр» — Bober AI: внедрение CRM с ИИ-надстройкой",
      subtitle:
        "Ищете «СРМ систему Бобр»? Bober AI Systems (Бобр ИИ) не продаёт «свою» коробочную CRM — мы внедряем amoCRM и Битрикс24 и добавляем ИИ-слой: КП из карточки сделки, разбор звонков, автозаполнение полей, ассистент менеджера. Пилот от 300 000 ₽.",
      problems: [
        "Менеджеры ведут сделки в Excel, WhatsApp и голове — собственник не видит воронку",
        "CRM куплена, но заполняется на 30%: поля пустые, задачи просрочены, отчёты врут",
        "Заявки с сайта, Авито, Telegram и звонки теряются до попадания в CRM",
        "Хочется «CRM с ИИ», но непонятно, что реально работает, а что маркетинг вендоров",
      ],
      deliverables: [
        "Выбор и внедрение CRM (amoCRM или Битрикс24) под ваш процесс продаж: воронки, поля, роли, автоматизации",
        "Все каналы заявок в CRM: сайт, телефония, мессенджеры, Авито, маркетплейсы, 1С",
        "ИИ-надстройка Bober AI: речевая аналитика звонков, автозаполнение карточки, генерация КП, подсказки менеджеру, ассистент РОПа",
        "Обучение команды, регламент и сопровождение по SLA",
      ],
      intro: [
        "Bober AI Systems (в кириллице нас ищут как «Бобр ИИ» или «СРМ система Бобр») — московский интегратор CRM и искусственного интеллекта. Мы не разрабатываем ещё одну CRM с нуля: рынок уже закрыт amoCRM и Битрикс24, а бизнесу нужен работающий процесс продаж, а не новый интерфейс.",
        "Что мы делаем: внедряем CRM под ваш процесс, собираем все каналы заявок, а затем добавляем ИИ-слой, который снимает с менеджеров рутину — заполняет карточку по звонку, готовит коммерческое предложение из сделки и прайса, подсказывает следующий шаг, а РОПу присылает разбор звонков и рисков по сделкам.",
        "Кейсы: лидогенерация с CRM-контуром, CRM + Telegram + Google Sheets для малого бизнеса, Битрикс24 для агентства — в портфолио. Партнёр Битрикс24, Kaspersky, Yandex Cloud.",
      ],
      howWeSolve: [
        {
          title: "Аудит продаж",
          text: "Как приходят заявки, как ведутся сделки, где теряются деньги. Выбираем CRM (amoCRM/Битрикс24) под процесс, а не наоборот. Смета фиксируется.",
        },
        {
          title: "Внедрение CRM и каналов",
          text: "Воронки, поля, автоматизации, интеграции с сайтом, телефонией, мессенджерами и 1С. Миграция данных из Excel и старой CRM.",
        },
        {
          title: "ИИ-надстройка",
          text: "Речевая аналитика, автозаполнение, КП из сделки, ассистент менеджера. Пилот на одном сценарии с метрикой, затем расширение.",
        },
      ],
      faq: [
        {
          q: "«СРМ система Бобр» — это ваш продукт?",
          a: "Нет отдельной коробочной CRM. Bober AI Systems — интегратор: внедряем amoCRM/Битрикс24 и добавляем ИИ-модули. Так дешевле и надёжнее, чем самописная CRM.",
        },
        {
          q: "Сколько стоит внедрение CRM с ИИ?",
          a: "Внедрение CRM — от 150 000 ₽, ИИ-надстройка пилотом — от 300 000 ₽. Точная смета после аудита процесса продаж (1–2 недели).",
        },
        {
          q: "Какую CRM выбрать: amoCRM или Битрикс24?",
          a: "amoCRM — для отделов продаж с простыми воронками и мессенджерами. Битрикс24 — когда нужны задачи, документы, портал и глубокая связка с 1С. Подберём после аудита.",
        },
        {
          q: "Как связаться?",
          a: "Форма на этой странице, Telegram или /tel. Отвечаем в рабочее время по Москве.",
        },
      ],
    },
    en: {
      h1: "“Bober” CRM system — Bober AI: CRM rollout with an AI layer",
      subtitle:
        "Looking for a “Bober CRM”? Bober AI Systems does not sell a boxed CRM — we roll out amoCRM and Bitrix24 and add an AI layer: proposals from the deal card, call analytics, auto-filled fields, a manager assistant.",
      problems: [
        "Deals live in Excel, WhatsApp and heads",
        "CRM bought but 30% filled; reports lie",
        "Website, Avito, Telegram and calls leak before the CRM",
        "“CRM with AI” — unclear what really works",
      ],
      deliverables: [
        "CRM selection and rollout (amoCRM or Bitrix24) for your sales process",
        "All lead channels into CRM: site, telephony, messengers, marketplaces, 1C",
        "Bober AI layer: call analytics, auto-fill, proposal generation, manager hints",
        "Training, rules and SLA support",
      ],
      intro: [
        "Bober AI Systems is a Moscow CRM and AI integrator. We do not build yet another CRM: the market is covered by amoCRM and Bitrix24; business needs a working sales process.",
        "We roll out the CRM, wire all lead channels, then add an AI layer that removes routine from managers and gives the sales head call reviews and deal risks.",
        "Cases: lead generation with a CRM contour, CRM + Telegram + Sheets for SMB, Bitrix24 for an agency.",
      ],
      howWeSolve: [
        { title: "Sales audit", text: "How leads arrive, how deals are kept, where money leaks. CRM chosen for the process." },
        { title: "CRM and channels rollout", text: "Pipelines, fields, automations, integrations, data migration." },
        { title: "AI layer", text: "Call analytics, auto-fill, proposals, assistant. Pilot with a metric, then scale." },
      ],
      faq: [
        { q: "Is “Bober CRM” your product?", a: "No boxed CRM. We integrate amoCRM/Bitrix24 and add AI modules." },
        { q: "amoCRM or Bitrix24?", a: "amoCRM for simple sales pipelines; Bitrix24 for tasks, documents and 1C." },
        { q: "How to contact?", a: "Form on this page, Telegram or /tel." },
      ],
    },
  },
];
