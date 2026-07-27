import { KASPERSKY_PRODUCTS } from "@/lib/kaspersky-page";

/** Specialist line under Bober AI Systems — path /secure-ai (not a separate brand). */
export const SECURE_AI_PAGE = {
  lineRu: "Bober Secure AI",
  lineEn: "Bober Secure AI",
  parentRu: "линия Bober AI Systems",
  parentEn: "line of Bober AI Systems",
  metaTitleRu: "Bober Secure AI — безопасные LLM, RAG и AI-агенты | Bober AI",
  metaTitleEn: "Bober Secure AI — secure LLM, RAG and AI agents | Bober AI",
  metaDescRu:
    "Специализированная линия Bober AI Systems: безопасные корпоративные LLM/RAG, Agent Gateway, Container Security и Kaspersky для ИБ и IT-команд.",
  metaDescEn:
    "Specialist line of Bober AI Systems: secure corporate LLM/RAG, Agent Gateway, Container Security and Kaspersky for security and IT teams.",
  h1Ru: "Безопасные корпоративные LLM, RAG и AI-агенты",
  h1En: "Secure corporate LLM, RAG and AI agents",
  subtitleRu:
    "Специализированные решения для ИБ и IT: безопасное проектирование LLM, RAG и агентов, внедрение в существующую инфраструктуру клиента и опциональная интеграция с решениями защиты инфраструктуры.",
  subtitleEn:
    "Specialized solutions for security and IT teams: secure design of LLM, RAG and agents, deployment into the client's existing infrastructure, with optional integration into infrastructure-protection products.",
  mainBrandTitleRu: "Bober AI Systems — основная деятельность",
  mainBrandTitleEn: "Bober AI Systems — core business",
  mainBrandRu: [
    "Автоматизация бизнеса",
    "LLM, RAG, агенты",
    "CRM, документы, продажи",
    "Cloud / on-prem",
    "AI consulting и интеграции",
  ],
  mainBrandEn: [
    "Business automation",
    "LLM, RAG, agents",
    "CRM, documents, sales",
    "Cloud / on-prem",
    "AI consulting and integrations",
  ],
  lineTitleRu: "Bober Secure AI — специалистская линия",
  lineTitleEn: "Bober Secure AI — specialist line",
  lineScopeRu: [
    "Безопасность LLM и RAG",
    "Prompt injection и jailbreak",
    "Защита данных и контроль агентов",
    "Secure AI Agent Gateway",
    "Kubernetes и Container Security",
    "Инфраструктура с решениями Kaspersky",
  ],
  lineScopeEn: [
    "LLM and RAG security",
    "Prompt injection and jailbreak",
    "Data protection and agent control",
    "Secure AI Agent Gateway",
    "Kubernetes and Container Security",
    "Infrastructure with Kaspersky products",
  ],
  packHref: "/services/secure-private-ai-cloud",
  packLabelRu: "Пакет Secure Private AI Cloud",
  packLabelEn: "Secure Private AI Cloud pack",
  kasperskyHref: "/kaspersky",
  kasperskyLabelRu: "Партнёрский хаб Kaspersky",
  kasperskyLabelEn: "Kaspersky partner hub",

  trustTitleRu: "Партнёрский статус",
  trustTitleEn: "Partner status",
  trustIntroRu:
    "Registered Partner «Лаборатории Касперского» (B2B и B2C) — оригиналы сертификатов ниже, лицензии поставляются через авторизованную дистрибуцию.",
  trustIntroEn:
    "Kaspersky Lab Registered Partner (B2B and B2C) — certificate originals below; licenses are supplied via authorized distribution.",

  processTitleRu: "Как проходит внедрение",
  processTitleEn: "How an engagement runs",
  processRu: [
    "Аудит контура: данные, модель, агенты, инфраструктура — что уже есть и чего не хватает",
    "Выбор линии: LLM/RAG + аудит AIST, Container Security, SOC-ассистент на KUMA/KIRA, Agent Gateway или защита почты",
    "Внедрение AI Security Gateway (RAG, интеграции) и продуктов Kaspersky через партнёрскую дистрибуцию",
    "Мониторинг, отчёты для руководства и ИБ, продление лицензий",
  ],
  processEn: [
    "Contour audit: data, model, agents, infrastructure — what exists and what is missing",
    "Pick a line: LLM/RAG + AIST audit, Container Security, SOC assistant on KUMA/KIRA, Agent Gateway or mail protection",
    "Deploy the AI Security Gateway (RAG, integrations) plus Kaspersky products via authorized distribution",
    "Monitoring, reports for leadership and security, license renewals",
  ],

  faqRu: [
    {
      q: "Bober Secure AI — это отдельная компания?",
      a: "Нет. Bober Secure AI — направление Bober AI Systems: те же сертификаты, портфолио, контакты и реквизиты.",
    },
    {
      q: "Можно развернуть решение on-prem или в закрытом контуре?",
      a: "Да. Private LLM/RAG и Secure AI Agent Gateway разворачиваются on-prem, в российском облаке (Yandex Cloud, Selectel, Cloud.ru) или в гибридном контуре — вариант зависит от требований к данным.",
    },
    {
      q: "Чем Secure AI Agent Gateway отличается от антивируса Kaspersky?",
      a: "Kaspersky защищает инфраструктуру — хосты, контейнеры, почту, SIEM. Gateway — отдельный слой контроля над самим LLM-агентом: RBAC, allowlist инструментов, маскирование данных, human approval и audit log.",
    },
    {
      q: "С чего начать, если ещё нет лицензий Kaspersky?",
      a: "С аудита контура и сметы лицензий через партнёрскую дистрибуцию (Registered Partner Kaspersky) — после этого выбираем линию: LLM/RAG с AIST, Container Security, SOC-ассистент или защита почты.",
    },
  ],
  faqEn: [
    {
      q: "Is Bober Secure AI a separate company?",
      a: "No. Bober Secure AI is a line of Bober AI Systems — same certificates, portfolio, contacts and legal details.",
    },
    {
      q: "Can this run on-prem or in a closed contour?",
      a: "Yes. Private LLM/RAG and the Secure AI Agent Gateway deploy on-prem, in a Russian cloud (Yandex Cloud, Selectel, Cloud.ru) or in a hybrid contour, depending on data requirements.",
    },
    {
      q: "How is the Secure AI Agent Gateway different from Kaspersky antivirus?",
      a: "Kaspersky protects infrastructure — hosts, containers, mail, SIEM. The Gateway is a separate control layer over the LLM agent itself: RBAC, tool allowlists, data masking, human approval and an audit log.",
    },
    {
      q: "Where do we start without existing Kaspersky licenses?",
      a: "With a contour audit and a license quote via authorized distribution (Kaspersky Registered Partner) — then we pick a line: LLM/RAG with AIST, Container Security, a SOC assistant, or mail protection.",
    },
  ],
} as const;

export type ChecklistSection = {
  titleRu: string;
  titleEn: string;
  itemsRu: string[];
  itemsEn: string[];
};

/** "25 вопросов" lead magnet on /secure-ai — self-assessment before launching a corporate LLM/RAG/agent. */
export const SECURE_AI_CHECKLIST: ChecklistSection[] = [
  {
    titleRu: "Куда попадают данные",
    titleEn: "Where data goes",
    itemsRu: [
      "Данные не покидают периметр компании без контроля",
      "Известно, какие именно данные передаются во внешний LLM API",
      "Данные не используются для дообучения публичной модели без согласия",
    ],
    itemsEn: [
      "Data doesn't leave the company perimeter uncontrolled",
      "You know exactly what data is sent to an external LLM API",
      "Data isn't used to fine-tune a public model without consent",
    ],
  },
  {
    titleRu: "Доступ пользователей",
    titleEn: "User access",
    itemsRu: [
      "Доступ к AI разграничен по ролям (RBAC)",
      "Есть список сотрудников с доступом к чувствительным сценариям",
    ],
    itemsEn: ["AI access is role-restricted (RBAC)", "There's a list of staff with access to sensitive scenarios"],
  },
  {
    titleRu: "Утечки",
    titleEn: "Leaks",
    itemsRu: [
      "Есть защита от утечки данных через ответы модели",
      "Модель не может выдать чужие персональные данные",
    ],
    itemsEn: [
      "There's protection against data leakage via model responses",
      "The model cannot output another party's personal data",
    ],
  },
  {
    titleRu: "Prompt injection",
    titleEn: "Prompt injection",
    itemsRu: [
      "Проведены тесты на prompt injection и jailbreak",
      "Ввод пользователя не может переопределить системные политики",
    ],
    itemsEn: [
      "Prompt injection and jailbreak tests have been run",
      "User input cannot override system policies",
    ],
  },
  {
    titleRu: "Логирование",
    titleEn: "Logging",
    itemsRu: ["Все запросы и ответы AI логируются", "Логи доступны для аудита ИБ"],
    itemsEn: ["All AI requests and responses are logged", "Logs are available for security audits"],
  },
  {
    titleRu: "Контроль действий агентов",
    titleEn: "Agent action control",
    itemsRu: [
      "Агент не выполняет необратимые действия без подтверждения человека",
      "Есть allowlist инструментов и API, которые агент может вызывать",
      "Есть лимиты на количество и стоимость операций агента",
    ],
    itemsEn: [
      "The agent cannot take irreversible actions without human approval",
      "There's an allowlist of tools/APIs the agent can call",
      "There are limits on the number and cost of agent operations",
    ],
  },
  {
    titleRu: "Хранение истории",
    titleEn: "History storage",
    itemsRu: [
      "Понятно, где и как долго хранится история диалогов",
      "Есть политика удаления истории по запросу",
    ],
    itemsEn: [
      "You know where and for how long conversation history is stored",
      "There's a policy for deleting history on request",
    ],
  },
  {
    titleRu: "Kubernetes",
    titleEn: "Kubernetes",
    itemsRu: [
      "Образы AI-сервисов сканируются на уязвимости до продакшена",
      "Сетевые политики ограничивают доступ AI-подов к остальной инфраструктуре",
    ],
    itemsEn: [
      "AI service images are scanned for vulnerabilities before production",
      "Network policies restrict AI pods' access to the rest of the infrastructure",
    ],
  },
  {
    titleRu: "Секреты и ключи",
    titleEn: "Secrets and keys",
    itemsRu: [
      "API-ключи и секреты не хранятся в коде или промптах",
      "Ключи ротируются и имеют ограниченный scope",
    ],
    itemsEn: ["API keys and secrets aren't stored in code or prompts", "Keys are rotated and scoped"],
  },
  {
    titleRu: "On-prem / российское облако",
    titleEn: "On-prem / Russian cloud",
    itemsRu: [
      "Понятно, можно ли развернуть решение on-prem или в российском облаке",
      "Учтены требования 152-ФЗ, если есть персональные данные",
    ],
    itemsEn: [
      "You know whether the solution can run on-prem or in a Russian cloud",
      "152-FZ requirements are accounted for if personal data is involved",
    ],
  },
  {
    titleRu: "Ответственность за ошибочные действия",
    titleEn: "Liability for erroneous actions",
    itemsRu: [
      "Определено, кто отвечает за ошибочное решение AI",
      "Есть процесс отката / исправления при ошибке агента",
      "Есть план коммуникации с клиентами на случай инцидента",
    ],
    itemsEn: [
      "It's defined who is accountable for an incorrect AI decision",
      "There's a rollback / correction process when the agent errs",
      "There's a client communication plan in case of an incident",
    ],
  },
];

export function getSecureAiProductLinks() {
  return KASPERSKY_PRODUCTS.map((p) => ({
    slug: p.slug,
    href: `/kaspersky/${p.slug}` as const,
    titleRu: p.titleRu,
    titleEn: p.titleEn,
    badgeRu: p.badgeRu,
    badgeEn: p.badgeEn,
    summaryRu: p.summaryRu,
    summaryEn: p.summaryEn,
  }));
}
