import type { LandingSpec } from "@/lib/seo-catalog/types";

/**
 * Multi-system setup cluster: YClients + amoCRM + Bitrix24 + МойСклад.
 * Umbrella over single-system pages (amocrm-setup, bitrix24, erp-moysklad).
 */
export const CATALOG_LANDING_SPECS_CRM_SETUP: LandingSpec[] = [
  {
    category: "integrations",
    slug: "crm-setup",
    contentKey: "crm_setup_multi",
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "настройка yclients amocrm bitrix24 мойсклад",
      "настройка YClients amoCRM Bitrix24 МойСклад",
      "настройка yclients",
      "настройка amocrm bitrix24 мойсклад",
      "настройка crm yclients",
      "настройка онлайн записи yclients",
      "комплексная настройка crm и мойсклад",
    ],
    caseStudySlugs: ["amocrm-website-integration", "erp-moysklad-chatgpt-ux", "lead-generation"],
    related: [
      { href: "/integrations/amocrm-setup", labelRu: "Настройка amoCRM", labelEn: "amoCRM setup" },
      { href: "/integrations/bitrix24", labelRu: "Настройка Bitrix24", labelEn: "Bitrix24 setup" },
      { href: "/solutions/erp-moysklad", labelRu: "ERP МойСклад", labelEn: "MoySklad ERP" },
      { href: "/integrations/amocrm", labelRu: "Интеграция amoCRM", labelEn: "amoCRM integration" },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Настройка YClients, amoCRM, Bitrix24 и МойСклад",
      subtitle:
        "Настроим онлайн-запись, CRM и склад под один процесс: YClients, amoCRM или Bitrix24, МойСклад. Фиксированная смета, пилот 2–4 недели.",
      problems: [
        "YClients, CRM и МойСклад работают отдельно — записи, сделки и остатки не сходятся",
        "Нужна настройка портала: воронка, поля, права, роботы",
        "Заявки с сайта и онлайн-записи не попадают в сделки",
        "Склад и продажи живут в разных таблицах",
      ],
      deliverables: [
        "Карта процесса: запись / лид → сделка → склад / отгрузка",
        "Настройка YClients, amoCRM или Bitrix24 и МойСклад под ваш регламент",
        "Связка систем: статусы, остатки, задачи менеджеру",
        "Регламент, обучение команды и приёмка",
      ],
      intro: [
        "Настраиваем YClients, amoCRM, Bitrix24 и МойСклад так, чтобы запись клиента, сделка и склад жили в одном контуре — без ручного переноса между окнами.",
        "Можно начать с одной системы или сразу связать несколько: онлайн-запись, CRM и учёт. Смета фиксируется до старта.",
        "Узкая настройка amoCRM — /integrations/amocrm-setup; Bitrix24 — /integrations/bitrix24; склад и ERP — /solutions/erp-moysklad.",
      ],
      howWeSolve: [
        {
          title: "Аудит стека",
          text: "Смотрим, что уже куплено: YClients, amoCRM, Bitrix24, МойСклад. Фиксируем узкое место и пакет работ.",
        },
        {
          title: "Настройка и связка",
          text: "Портал, воронка, онлайн-запись, склады и обмен статусами. Без лишних модулей — только то, что закрывает процесс.",
        },
        {
          title: "Запуск и обучение",
          text: "Прогон сценариев с командой, регламент и передача. При необходимости — следующий этап: автоматизация или ИИ-слой.",
        },
      ],
      faq: [
        {
          q: "Можно настроить только одну систему?",
          a: "Да. Часто начинают с YClients или одной CRM, затем подключают МойСклад или вторую систему.",
        },
        {
          q: "Чем эта страница отличается от настройки amoCRM или Bitrix24?",
          a: "Здесь — комплекс: запись, CRM и склад. Для точечной настройки amoCRM — /integrations/amocrm-setup, Bitrix24 — /integrations/bitrix24, МойСклад — /solutions/erp-moysklad.",
        },
        {
          q: "Срок и цена?",
          a: "Пилот 2–4 недели. Базовая настройка одной системы — от 150 000 ₽; связка нескольких систем обычно от 300 000 ₽.",
        },
        {
          q: "Делаете обмен YClients ↔ CRM ↔ МойСклад?",
          a: "Да: статусы записей и заказов, остатки, задачи менеджеру. Логирование и retry — в промышленном контуре.",
        },
      ],
    },
    en: {
      h1: "YClients, amoCRM, Bitrix24 and MoySklad setup",
      subtitle:
        "Configure booking, CRM and warehouse as one process: YClients, amoCRM or Bitrix24, MoySklad. Fixed estimate; pilot 2–4 weeks.",
      problems: [
        "YClients, CRM and MoySklad run in silos — bookings, deals and stock disagree",
        "Portal needs setup: pipeline, fields, roles, robots",
        "Website leads and bookings never become deals",
        "Warehouse and sales live in separate spreadsheets",
      ],
      deliverables: [
        "Process map: booking / lead → deal → stock / shipment",
        "YClients, amoCRM or Bitrix24 and MoySklad configured to your playbook",
        "System links: statuses, stock, manager tasks",
        "Playbook, team training and acceptance",
      ],
      intro: [
        "We set up YClients, amoCRM, Bitrix24 and MoySklad so booking, deal and stock share one contour — no manual copy between apps.",
        "Start with one system or connect several at once. Estimate is fixed before kickoff.",
        "Narrow amoCRM setup — /integrations/amocrm-setup; Bitrix24 — /integrations/bitrix24; warehouse ERP — /solutions/erp-moysklad.",
      ],
      howWeSolve: [
        {
          title: "Stack audit",
          text: "Review what you already run: YClients, amoCRM, Bitrix24, MoySklad. Lock the bottleneck and work package.",
        },
        {
          title: "Setup and linking",
          text: "Portal, pipeline, online booking, warehouses and status sync — only what the process needs.",
        },
        {
          title: "Launch and training",
          text: "Scenario walkthrough with the team, playbook and handover. Next step if needed: automation or AI layer.",
        },
      ],
      faq: [
        {
          q: "Can you set up only one system?",
          a: "Yes. Teams often start with YClients or one CRM, then add MoySklad or a second system.",
        },
        {
          q: "How is this different from amoCRM or Bitrix24-only setup?",
          a: "This page is the multi-system contour. For focused amoCRM — /integrations/amocrm-setup; Bitrix24 — /integrations/bitrix24; MoySklad — /solutions/erp-moysklad.",
        },
        {
          q: "Timeline and price?",
          a: "Pilot 2–4 weeks. Single-system setup from a mid-market package; multi-system linking usually raises scope.",
        },
        {
          q: "Do you sync YClients ↔ CRM ↔ MoySklad?",
          a: "Yes: booking/order statuses, stock, manager tasks — with logging and retry in production.",
        },
      ],
    },
  },
];
