import { KASPERSKY_PARTNER_BADGES } from "@/lib/trust-partners";

/** License / classic offers on /kaspersky hub (Wordstat). */
export type KasperskyOffer = {
  id: string;
  titleRu: string;
  titleEn: string;
  blurbRu: string;
  blurbEn: string;
  wordstatHint: string;
};

/** AI × Kaspersky integration products → /kaspersky/[slug]. */
export type KasperskyProduct = {
  slug: string;
  priority: 1 | 2 | 3 | 4 | 5;
  badgeRu: string;
  badgeEn: string;
  titleRu: string;
  titleEn: string;
  metaTitleRu: string;
  metaTitleEn: string;
  metaDescRu: string;
  metaDescEn: string;
  summaryRu: string;
  summaryEn: string;
  clientBuysRu: string[];
  clientBuysEn: string[];
  boberScopeRu: string[];
  boberScopeEn: string[];
  kasperskyScopeRu: string[];
  kasperskyScopeEn: string[];
  architectureRu: string[];
  architectureEn: string[];
  fitRu: string;
  fitEn: string;
  noteRu?: string;
  noteEn?: string;
  relatedHref?: string;
  relatedLabelRu?: string;
  relatedLabelEn?: string;
};

export const KASPERSKY_PRODUCTS: KasperskyProduct[] = [
  {
    slug: "llm-rag-aist",
    priority: 1,
    badgeRu: "Продукт 1 — старт",
    badgeEn: "Product 1 — easiest start",
    titleRu: "Внедрение корпоративного LLM/RAG с аудитом безопасности AI",
    titleEn: "Corporate LLM/RAG with Kaspersky AIST security audit",
    metaTitleRu: "Безопасный корпоративный LLM/RAG + аудит Kaspersky AIST | Bober AI",
    metaTitleEn: "Secure corporate LLM/RAG + Kaspersky AIST audit | Bober AI",
    metaDescRu:
      "Приватный LLM/RAG, контроль доступа, логи AI, подготовка к оценке Kaspersky AIST: угрозы, данные, модель, мониторинг. Партнёр Kaspersky.",
    metaDescEn:
      "Private LLM/RAG, access control, AI logs, prep for Kaspersky AIST: threats, data, model, monitoring. Kaspersky partner.",
    summaryRu:
      "Не «чатбот», а безопасный корпоративный AI: контроль утечек, prompt injection, уязвимости RAG, политика использования и отчёт для руководства. AI Security Gateway Bober AI Systems + услуги Kaspersky AIST.",
    summaryEn:
      "Not a chatbot — secure corporate AI: data leakage control, prompt injection, RAG risks, usage policy and exec report. Bober AI Systems' AI Security Gateway + Kaspersky AIST services.",
    clientBuysRu: [
      "Контроль утечки данных через модель",
      "Тесты prompt injection и jailbreak",
      "Анализ уязвимостей RAG и отравления базы знаний",
      "Проверка, не выходит ли агент за права",
      "Политика безопасного использования AI",
      "Отчёт риска для руководства",
    ],
    clientBuysEn: [
      "Control of data leakage via the model",
      "Prompt injection and jailbreak tests",
      "RAG vulnerability and knowledge-base poisoning analysis",
      "Check that the agent cannot exceed permissions",
      "Safe AI usage policy",
      "Risk report for leadership",
    ],
    boberScopeRu: [
      "Внедрение частного LLM или RAG",
      "Интеграция с Bitrix24, 1С, почтой и документами",
      "Контроль доступа и прав агента",
      "Логирование действий AI",
      "Защита инструментов и API",
      "Подготовка системы к оценке Kaspersky AIST",
    ],
    boberScopeEn: [
      "Private LLM or RAG deployment",
      "Bitrix24, 1C, mail and document integration",
      "Agent access control and permissions",
      "Logging of AI actions",
      "Tool and API hardening",
      "System prep for Kaspersky AIST assessment",
    ],
    kasperskyScopeRu: [
      "Модель угроз для AI-решения (AIST)",
      "Анализ модели и данных (входных / тренировочных)",
      "Тесты устойчивости и мониторинг безопасности AI",
      "Консалтинг по AI security и регуляторике",
      "Отчёт и рекомендации",
    ],
    kasperskyScopeEn: [
      "Threat model for the AI solution (AIST)",
      "Model and data analysis (input / training)",
      "Resilience tests and AI security monitoring",
      "AI security and regulation consulting",
      "Report and recommendations",
    ],
    architectureRu: [
      "Пользователь → LLM/RAG в закрытом контуре",
      "Интеграции: Bitrix24 / 1С / документы / API",
      "Audit log + RBAC + политики агента",
      "Пакет артефактов → оценка Kaspersky AIST",
      "Отчёт риска → руководство / ИБ",
    ],
    architectureEn: [
      "User → LLM/RAG in a closed contour",
      "Integrations: Bitrix24 / 1C / documents / APIs",
      "Audit log + RBAC + agent policies",
      "Artifact pack → Kaspersky AIST assessment",
      "Risk report → leadership / security",
    ],
    fitRu: "Самый прямой Security for AI. Нужно подтвердить у менеджера Kaspersky возможность реселла/регистрации проектов AIST для Registered Partner.",
    fitEn: "Most direct Security for AI. Confirm with Kaspersky partner manager whether Registered Partners can resell/register AIST projects.",
    relatedHref: "/services/secure-private-ai-cloud",
    relatedLabelRu: "Связанный пакет: защищенная AI-инфраструктура",
    relatedLabelEn: "Related pack: Secure Private AI Cloud",
  },
  {
    slug: "container-security-kira",
    priority: 2,
    badgeRu: "Продукт 2 — технический",
    badgeEn: "Product 2 — most technical",
    titleRu: "Безопасный AI DevOps-контур (Container Security + KIRA)",
    titleEn: "Secure AI DevOps contour (Container Security + KIRA)",
    metaTitleRu: "AI DevSecOps: Kaspersky Container Security + KIRA / LLM | Bober AI",
    metaTitleEn: "AI DevSecOps: Kaspersky Container Security + KIRA / LLM | Bober AI",
    metaDescRu:
      "Внедрение Kaspersky Container Security, Registry/K8s, интеграция с KIRA или частным LLM, тикеты Bitrix24/Jira, Telegram, отчёты.",
    metaDescEn:
      "Deploy Kaspersky Container Security, Registry/K8s, integrate KIRA or private LLM, Bitrix24/Jira tickets, Telegram, reports.",
    summaryRu:
      "Конкретная продуктовая интеграция: Container Security 2.4 ↔ KIRA или внешний LLM клиента (API key / OAuth, лицензия Advanced PRO). Идеально для Docker/K8s AI, RAG и агентов.",
    summaryEn:
      "Concrete product integration: Container Security 2.4 ↔ KIRA or client external LLM (API key / OAuth, Advanced PRO). Ideal for Docker/K8s AI, RAG and agents.",
    clientBuysRu: [
      "Контроль образов до production",
      "Поиск уязвимостей, секретов и misconfig",
      "Объяснение риска LLM/KIRA на русском",
      "Автотикеты и уведомления команде",
      "Отчёт для админа и руководства",
    ],
    clientBuysEn: [
      "Image control before production",
      "Vulnerabilities, secrets and misconfig findings",
      "LLM/KIRA risk explanation",
      "Auto tickets and team alerts",
      "Report for admins and leadership",
    ],
    boberScopeRu: [
      "Внедрение Kaspersky Container Security",
      "Связка с Docker Registry / репозиторием образов",
      "Подключение Kubernetes",
      "Контроль образов до production",
      "Интеграция с KIRA или частным LLM",
      "Автообъяснение уязвимостей",
      "Тикеты в Bitrix24 / Jira, уведомления в Telegram",
      "Отчёт администратору и руководству",
    ],
    boberScopeEn: [
      "Deploy Kaspersky Container Security",
      "Wire Docker Registry / image repo",
      "Connect Kubernetes",
      "Pre-production image gates",
      "Integrate KIRA or private LLM",
      "Auto-explain vulnerabilities",
      "Bitrix24 / Jira tickets, Telegram alerts",
      "Admin and leadership report",
    ],
    kasperskyScopeRu: [
      "Kaspersky Container Security (скан, политики, runtime)",
      "KIRA — Investigation and Response Assistant (регион РФ)",
      "Опция внешнего LLM через API/OAuth (Advanced PRO)",
    ],
    kasperskyScopeEn: [
      "Kaspersky Container Security (scan, policies, runtime)",
      "KIRA — Investigation and Response Assistant (Russia region)",
      "Optional external LLM via API/OAuth (Advanced PRO)",
    ],
    architectureRu: [
      "Registry / CI/CD / Kubernetes → Kaspersky Container Security",
      "Обнаружение уязвимостей, секретов, misconfig; контроль образов",
      "Данные о риске → KIRA или частный LLM",
      "LLM: объяснение, риск, правка, отчёт",
      "Автоматизация → Bitrix24 / Jira / Telegram",
    ],
    architectureEn: [
      "Registry / CI/CD / Kubernetes → Kaspersky Container Security",
      "Vulns, secrets, misconfig; image control",
      "Risk data → KIRA or private LLM",
      "LLM: explain, risk, fix suggestion, report",
      "Automation → Bitrix24 / Jira / Telegram",
    ],
    fitRu: "Полная интеграционная услуга, не «консалтинг вокруг антивируса».",
    fitEn: "A full integration service — not consulting around antivirus.",
  },
  {
    slug: "soc-kuma-kira",
    priority: 3,
    badgeRu: "Продукт 3 — крупный контракт",
    badgeEn: "Product 3 — largest contract",
    titleRu: "AI-ассистент для отдела информационной безопасности (KUMA / KIRA)",
    titleEn: "AI assistant for the security team (KUMA / KIRA)",
    metaTitleRu: "AI-ассистент SOC на базе Kaspersky KUMA и KIRA | Bober AI",
    metaTitleEn: "SOC AI assistant on Kaspersky KUMA and KIRA | Bober AI",
    metaDescRu:
      "KUMA/XDR → KIRA или частный LLM: саммари алерта, IoC, timeline, рекомендации. Тикеты Bitrix24, эскалации, RAG по регламентам ИБ.",
    metaDescEn:
      "KUMA/XDR → KIRA or private LLM: alert summary, IoCs, timeline, recommendations. Bitrix24 tickets, escalations, RAG over security playbooks.",
    summaryRu:
      "Для компаний с Kaspersky SIEM/XDR без полного SOC: AI разбирает инциденты, готовит отчёты и эскалирует критичное в процессы клиента.",
    summaryEn:
      "For companies with Kaspersky SIEM/XDR without a full SOC: AI triages incidents, drafts reports and escalates critical cases into client workflows.",
    clientBuysRu: [
      "Быстрый разбор алертов без расширения штата SOC",
      "Timeline, IoC и рекомендации по реакции",
      "Автозаявки и эскалации",
      "RAG по внутренним регламентам ИБ",
      "Недельные сводки безопасности",
    ],
    clientBuysEn: [
      "Faster alert triage without growing SOC headcount",
      "Timeline, IoCs and response recommendations",
      "Auto tickets and escalations",
      "RAG over internal security playbooks",
      "Weekly security digests",
    ],
    boberScopeRu: [
      "Интеграция источников и workflow вокруг KUMA",
      "Alert → анализ LLM/KIRA",
      "Автосоздание заявки и назначение ответственного",
      "Эскалация критичных инцидентов",
      "Отчёт DOCX/PDF",
      "Недельное резюме безопасности",
      "RAG-база знаний по процедурам клиента",
      "Каналы: Bitrix24 / Telegram / email / helpdesk",
    ],
    boberScopeEn: [
      "Source and workflow integration around KUMA",
      "Alert → LLM/KIRA analysis",
      "Auto ticket and assignee",
      "Critical incident escalation",
      "DOCX/PDF report",
      "Weekly security digest",
      "RAG knowledge base of client procedures",
      "Channels: Bitrix24 / Telegram / email / helpdesk",
    ],
    kasperskyScopeRu: [
      "Kaspersky KUMA / Next XDR — сбор событий и алерты",
      "KIRA — саммари, IoC, timeline, рекомендации",
      "Опция внешнего LLM-провайдера по документации KUMA",
      "NL-запросы к SIEM (по возможностям продукта)",
    ],
    kasperskyScopeEn: [
      "Kaspersky KUMA / Next XDR — events and alerts",
      "KIRA — summary, IoCs, timeline, recommendations",
      "Optional external LLM provider per KUMA docs",
      "Natural-language SIEM queries where product allows",
    ],
    architectureRu: [
      "KUMA / XDR → алерт или инцидент",
      "KIRA / частный LLM → перевод, timeline, риск, действия, отчёт",
      "Bober автоматизация → Bitrix24 / Telegram / email / helpdesk",
    ],
    architectureEn: [
      "KUMA / XDR → alert or incident",
      "KIRA / private LLM → translate, timeline, risk, actions, report",
      "Bober automation → Bitrix24 / Telegram / email / helpdesk",
    ],
    fitRu: "Крупные ИБ-контракты: SIEM уже есть или планируется — не хватает аналитиков.",
    fitEn: "Larger security deals: SIEM exists or is planned — analysts are the bottleneck.",
  },
  {
    slug: "secure-ai-agent-gateway",
    priority: 4,
    badgeRu: "AI Security Gateway",
    badgeEn: "AI Security Gateway",
    titleRu: "Secure AI Agent Gateway — безопасный агент с ограниченным доступом",
    titleEn: "Secure AI Agent Gateway — limited-access AI agent",
    metaTitleRu: "Secure AI Agent Gateway: RBAC, allowlist, human approval | Bober AI",
    metaTitleEn: "Secure AI Agent Gateway: RBAC, allowlist, human approval | Bober AI",
    metaDescRu:
      "Шлюз между LLM и системами клиента: RBAC, allowlist инструментов, маскирование данных, лимиты, human approval, audit log + защита хостов Kaspersky.",
    metaDescEn:
      "Gateway between LLM and client systems: RBAC, tool allowlist, data masking, limits, human approval, audit log + Kaspersky host protection.",
    summaryRu:
      "Kaspersky не заменяет gateway LLM. Мы ставим слой контроля агента; Kaspersky закрывает хосты, админские станции, серверы, контейнеры, почту и SIEM.",
    summaryEn:
      "Kaspersky does not replace an LLM gateway. We add agent control; Kaspersky covers hosts, admin stations, servers, containers, mail and SIEM.",
    clientBuysRu: [
      "Агент не выполняет опасные действия без approval",
      "Allowlist инструментов и параметров",
      "Маскирование чувствительных данных",
      "Полный audit log",
      "Инфраструктурная защита Kaspersky вокруг контура",
    ],
    clientBuysEn: [
      "Agent cannot run risky actions without approval",
      "Tool and parameter allowlist",
      "Sensitive data masking",
      "Full audit log",
      "Kaspersky infrastructure protection around the contour",
    ],
    boberScopeRu: [
      "Security Gateway между LLM и Bitrix24 / 1С / CRM / email / документами",
      "RBAC, allowlist, контроль параметров",
      "Маскирование данных и лимиты операций",
      "Human approval для рискованных шагов",
      "Полный audit log",
    ],
    boberScopeEn: [
      "Security gateway between LLM and Bitrix24 / 1C / CRM / email / documents",
      "RBAC, allowlist, parameter checks",
      "Data masking and operation limits",
      "Human approval for risky steps",
      "Full audit log",
    ],
    kasperskyScopeRu: [
      "Защита хостов и endpoint (KES / Next)",
      "Станции администраторов и серверы",
      "Контейнеры (при необходимости Container Security)",
      "Почта и SIEM/инциденты — по контуру клиента",
    ],
    kasperskyScopeEn: [
      "Host and endpoint protection (KES / Next)",
      "Admin stations and servers",
      "Containers when needed (Container Security)",
      "Mail and SIEM/incidents per client contour",
    ],
    architectureRu: [
      "Пользователь → LLM / агент",
      "→ Security Gateway (RBAC, allowlist, mask, limits, HITL, audit)",
      "→ Bitrix24 / 1С / CRM / email / документы",
      "Параллельно: Kaspersky на инфраструктуре",
    ],
    architectureEn: [
      "User → LLM / agent",
      "→ Security Gateway (RBAC, allowlist, mask, limits, HITL, audit)",
      "→ Bitrix24 / 1C / CRM / email / documents",
      "In parallel: Kaspersky on infrastructure",
    ],
    fitRu: "Можно запускать сразу — без ожидания отдельного «продукта Kaspersky для агентов».",
    fitEn: "Can launch now — no need to wait for a dedicated Kaspersky agent product.",
  },
  {
    slug: "mail-ai-phishing",
    priority: 5,
    badgeRu: "Лёгкий вход",
    badgeEn: "Easier entry",
    titleRu: "Защита корпоративной почты от AI-фишинга",
    titleEn: "Corporate mail protection against AI phishing",
    metaTitleRu: "Защита почты от AI-фишинга: Kaspersky Mail Security | Bober AI",
    metaTitleEn: "Mail protection against AI phishing: Kaspersky Mail Security | Bober AI",
    metaDescRu:
      "Внедрение Kaspersky Secure Mail Gateway / Mail Server, фильтр LLM-фишинга, разбор писем внутренним LLM, заявки в helpdesk, обучение и отчёты.",
    metaDescEn:
      "Deploy Kaspersky Secure Mail Gateway / Mail Server, LLM-phishing filter, internal LLM triage, helpdesk tickets, training and reports.",
    summaryRu:
      "Проще в продаже, чем полный SIEM: Mail Security умеет детектировать письма, сгенерированные LLM, и стыкуется с Next XDR / KATA / Threat Intelligence.",
    summaryEn:
      "Easier to sell than full SIEM: Mail Security detects LLM-generated messages and links to Next XDR / KATA / Threat Intelligence.",
    clientBuysRu: [
      "Фильтрация AI-фишинга без ссылок и вложений",
      "Процесс разбора подозрительных писем",
      "Автозаявки в helpdesk",
      "Обучение сотрудников",
      "Отчёты по кампаниям",
    ],
    clientBuysEn: [
      "Filtering AI phishing without links or attachments",
      "Process for triaging suspicious mail",
      "Auto helpdesk tickets",
      "Employee training",
      "Campaign reports",
    ],
    boberScopeRu: [
      "Внедрение Kaspersky Secure Mail Gateway / Mail Server",
      "Подключение Exchange или другой почты",
      "Настройка фильтрации AI-фишинга",
      "Разбор подозрительных писем внутренним LLM (опционально)",
      "Автозаявки в helpdesk",
      "Обучение сотрудников и отчёты о кампаниях",
    ],
    boberScopeEn: [
      "Deploy Kaspersky Secure Mail Gateway / Mail Server",
      "Connect Exchange or other mail",
      "Configure AI-phishing filtering",
      "Optional internal LLM triage of suspicious messages",
      "Auto helpdesk tickets",
      "Employee training and campaign reports",
    ],
    kasperskyScopeRu: [
      "Kaspersky Security for Mail Server / Secure Mail Gateway",
      "Детекция сообщений, сгенерированных LLM",
      "Интеграция с Next XDR, KATA, Threat Intelligence Portal",
    ],
    kasperskyScopeEn: [
      "Kaspersky Security for Mail Server / Secure Mail Gateway",
      "Detection of LLM-generated messages",
      "Integration with Next XDR, KATA, Threat Intelligence Portal",
    ],
    architectureRu: [
      "Почта (Exchange / иное) → Kaspersky Mail Security",
      "Подозрительное → опционально внутренний LLM",
      "→ helpdesk / обучение / отчёт кампаний",
    ],
    architectureEn: [
      "Mail (Exchange / other) → Kaspersky Mail Security",
      "Suspicious → optional internal LLM",
      "→ helpdesk / training / campaign report",
    ],
    fitRu: "Быстрый коммерческий вход рядом с поставкой лицензий почты.",
    fitEn: "Fast commercial entry next to mail license supply.",
  },
];

export function getKasperskyProduct(slug: string): KasperskyProduct | undefined {
  return KASPERSKY_PRODUCTS.find((p) => p.slug === slug);
}

export function getAllKasperskyProductSlugs(): string[] {
  return KASPERSKY_PRODUCTS.map((p) => p.slug);
}

export const KASPERSKY_PAGE = {
  statusRu: "Registered Partner «Лаборатории Касперского» (B2B / B2C)",
  statusEn: "Kaspersky Lab Registered Partner (B2B / B2C)",
  badges: KASPERSKY_PARTNER_BADGES,
  metaTitleRu: "Kaspersky + AI: лицензии, LLM/RAG, Container Security, SOC | Bober AI",
  metaTitleEn: "Kaspersky + AI: licenses, LLM/RAG, Container Security, SOC | Bober AI",
  metaDescRu:
    "Партнёр Kaspersky: безопасный LLM/RAG с AIST, Container Security + KIRA, AI-ассистент SOC на KUMA, Agent Gateway, защита почты от AI-фишинга. Лицензии через дистрибуцию.",
  metaDescEn:
    "Kaspersky partner: secure LLM/RAG with AIST, Container Security + KIRA, SOC AI on KUMA, Agent Gateway, AI-phishing mail protection. Licenses via distribution.",
  h1Ru: "Kaspersky и безопасный корпоративный AI",
  h1En: "Kaspersky and secure corporate AI",
  subtitleRu:
    "Не «антивирус к чатботу». Связка LLM/RAG/агентов Bober AI Systems с продуктами Kaspersky: AIST, Container Security, KIRA, KUMA, Mail Security и endpoint.",
  subtitleEn:
    "Not “antivirus bolted to a chatbot”. Bober AI Systems' LLM/RAG/agents wired to Kaspersky: AIST, Container Security, KIRA, KUMA, Mail Security and endpoint.",
  disclaimerRu:
    "Маркетинговые материалы по продуктам Kaspersky согласуются с требованиями бренда. Возможность реселла отдельных сервисов AIST / KIRA уточняем у партнёрского менеджера. Статус — Registered Partner.",
  disclaimerEn:
    "Kaspersky product marketing follows brand guidelines. Resale of specific AIST / KIRA services is confirmed with the partner manager. Status: Registered Partner.",
  productsTitleRu: "Линии AI × Kaspersky",
  productsTitleEn: "AI × Kaspersky lines",
  productsIntroRu:
    "Самое сильное — не антивирус «для AI», а ваш LLM/RAG + продукты безопасности Kaspersky. Ниже — пять подстраниц с зонами ответственности.",
  productsIntroEn:
    "The strongest play is not antivirus “for AI”, but your LLM/RAG plus Kaspersky security products. Five subpages with responsibility split.",
  matrixTitleRu: "Что делает Kaspersky, что — Bober AI Systems",
  matrixTitleEn: "Kaspersky vs Bober AI Systems",
  matrixRu: [
    { k: "Оценка модели и данных (AIST)", b: "Подготовка системы и координация аудита" },
    { k: "Container Security / KIRA", b: "Внедрение, LLM, тикеты, автоматизация" },
    { k: "KUMA / XDR + KIRA", b: "Workflow, RAG по регламентам, эскалации" },
    { k: "Endpoint / Mail / SIEM", b: "Установка, политики, процессы реакции" },
    { k: "Частично — агенты", b: "Secure AI Agent Gateway (основной слой)" },
  ],
  matrixEn: [
    { k: "Model/data assessment (AIST)", b: "System prep and audit coordination" },
    { k: "Container Security / KIRA", b: "Deploy, LLM, tickets, automation" },
    { k: "KUMA / XDR + KIRA", b: "Workflow, playbook RAG, escalations" },
    { k: "Endpoint / Mail / SIEM", b: "Install, policies, response processes" },
    { k: "Agents — partial", b: "Secure AI Agent Gateway (primary layer)" },
  ],
  offers: [
    {
      id: "endpoint",
      titleRu: "Kaspersky Endpoint Security для бизнеса",
      titleEn: "Kaspersky Endpoint Security for Business",
      blurbRu:
        "Подбор редакции, поставка и продление. Wordstat: «KES купить», «лицензия для бизнеса».",
      blurbEn: "Edition selection, supply and renewals. Wordstat: buy / business license.",
      wordstatHint: "KES купить ~454 · лицензия для бизнеса ~420",
    },
    {
      id: "ksc",
      titleRu: "Внедрение Kaspersky Security Center",
      titleEn: "Kaspersky Security Center deployment",
      blurbRu: "Установка, политики, агенты. Тянет места Endpoint.",
      blurbEn: "Install, policies, agents. Pulls Endpoint seats.",
      wordstatHint: "настройка KSC ~279",
    },
    {
      id: "servers",
      titleRu: "Защита серверов 1С и терминалов",
      titleEn: "1C and terminal server protection",
      blurbRu: "KES + политики KSC под RDS и серверы 1С.",
      blurbEn: "KES + KSC policies for RDS and 1C servers.",
      wordstatHint: "терминалы ~216 · сервер 1С ~205",
    },
    {
      id: "mail",
      titleRu: "Kaspersky Security for Mail Server",
      titleEn: "Kaspersky Security for Mail Server",
      blurbRu: "Почтовый контур; см. также подстраницу AI-фишинга.",
      blurbEn: "Mail contour; see also the AI-phishing subpage.",
      wordstatHint: "KSMS ~184",
    },
    {
      id: "optimum",
      titleRu: "Kaspersky Optimum Security / EDR",
      titleEn: "Kaspersky Optimum Security / EDR",
      blurbRu: "Подбор и поставка через дистрибуцию.",
      blurbEn: "Selection and supply via distribution.",
      wordstatHint: "Optimum / EDR ~25–26",
    },
    {
      id: "audit",
      titleRu: "Аудит ИБ → миграция на Kaspersky",
      titleEn: "Security audit → migrate to Kaspersky",
      blurbRu: "Вход: аудит → смета лицензий → KSC + Endpoint.",
      blurbEn: "Entry: audit → license estimate → KSC + Endpoint.",
      wordstatHint: "аудит ИБ ~56",
    },
  ] as KasperskyOffer[],
  processTitleRu: "Как закрываем сделку",
  processTitleEn: "How we close a deal",
  processRu: [
    "Выбор линии: лицензии, LLM/RAG+AIST, Container+KIRA, SOC или почта",
    "Аудит контура и смета лицензий через дистрибьютора",
    "Внедрение продуктов Kaspersky + AI Security Gateway (RAG, gateway, автоматизация)",
    "Мониторинг, отчёты, продления",
  ],
  processEn: [
    "Pick a line: licenses, LLM/RAG+AIST, Container+KIRA, SOC or mail",
    "Contour audit and license quote via distributor",
    "Deploy Kaspersky products + AI Security Gateway (RAG, gateway, automation)",
    "Monitoring, reports, renewals",
  ],
  attachTitleRu: "С чем связываем",
  attachTitleEn: "What we bundle with",
  attachRu: [
    "On-prem / private LLM и серверы AI",
    "Защищенная AI-инфраструктура (Secure Private AI Cloud)",
    "Bitrix24 и корпоративные порталы",
    "Контуры 1С и терминальный доступ",
    "Почтовые серверы и SOC без полного штата",
  ],
  attachEn: [
    "On-prem / private LLM and AI servers",
    "Secure Private AI Cloud pack",
    "Bitrix24 and corporate portals",
    "1C contours and terminal access",
    "Mail servers and SOC without full headcount",
  ],
} as const;
