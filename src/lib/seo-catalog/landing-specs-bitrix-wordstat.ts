import type { LandingSpec } from "@/lib/seo-catalog/types";

/**
 * Bitrix24 integration buy + problem cluster (Wordstat 2026-09-01).
 * Source: data/wordstat-bitrix24-integration-seed-totals.json
 * Head: «интеграция битрикс24» 1833, «интегратор битрикс24» 304.
 */
export const CATALOG_LANDING_SPECS_BITRIX_WORDSTAT: LandingSpec[] = [
  {
    category: "integrations",
    slug: "bitrix24-integration",
    contentKey: "bitrix_ws_integration",
    cluster: "bitrix24",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "интеграция битрикс24",
      "интегратор битрикс24",
      "интеграция и настройка битрикс24",
      "битрикс24 интеграция сайтом",
      "интеграция сайта с битрикс24",
      "тильда битрикс24 интеграция",
      "настройка интеграции битрикс24",
      "заказать интеграцию битрикс24",
      "интеграция битрикс24 цена",
      "стоимость интеграции битрикс24",
      "интеграция битрикс24 под ключ",
      "ошибка интеграции битрикс24",
      "проблемы интеграции битрикс24",
      "интеграция битрикс24 не работает",
      "доработка интеграции битрикс24",
      "модуль интеграции битрикс24",
    ],
    caseStudySlugs: ["bitrix24-kwork-crm", "bitrix24-erp-sync", "amocrm-website-integration"],
    related: [
      {
        href: "/bitrix",
        labelRu: "пакеты Bitrix24 и ИИ",
        labelEn: "Bitrix24 packages and AI",
      },
      {
        href: "/integrations/bitrix24-implementation",
        labelRu: "внедрение Битрикс24",
        labelEn: "Bitrix24 implementation",
      },
      {
        href: "/integrations/bitrix24-1c",
        labelRu: "Битрикс24 ↔ 1С",
        labelEn: "Bitrix24 ↔ 1C",
      },
      {
        href: "/integrations/site-to-crm",
        labelRu: "заявки с сайта в CRM",
        labelEn: "site leads to CRM",
      },
      { href: "/pricing", labelRu: "цены", labelEn: "pricing" },
    ],
    ru: {
      h1: "Интеграция Битрикс24",
      subtitle:
        "Интеграция Битрикс24 под ключ: сайт, 1С, телефония, мессенджеры. Чиним сломанный обмен и собираем новый контур. Бизнес-партнёр Битрикс24 · смета до старта · от 300 000 ₽.",
      problems: [
        "Интеграция Битрикс24 не работает: заявки дублируются или не доходят до сделки",
        "Сайт, Тильда, Авито, почта и мессенджеры живут отдельно от CRM",
        "1С / УНФ и Битрикс24 расходятся в статусах и суммах",
        "Модуль интеграции есть, но нет логов, ретраев и ответственного",
        "Нужен интегратор Битрикс24 — не курс и не «скачать бесплатно»",
      ],
      deliverables: [
        "Карта потоков: что откуда приходит и куда пишется в CRM",
        "Рабочая интеграция с логом, ретраями и идемпотентностью",
        "Связка сайта / Тильды / телефонии / 1С / мессенджеров",
        "Доработка или ремонт уже сломанного обмена",
        "Регламент и критерии приёмки",
      ],
      intro: [
        "Wordstat: «интеграция битрикс24» (1833) и «интегратор битрикс24» (304) — закрываем как услугу под ключ, не как инструкцию.",
        "Покупают интеграцию, когда заявки теряются, 1С не сходится со сделками или готовый модуль падает без логов. Мы чиним текущий контур или собираем новый.",
        "Сайт и Тильда — сюда. Обмен с 1С подробно — /integrations/bitrix24-1c. Полное внедрение портала — /integrations/bitrix24-implementation.",
      ],
      howWeSolve: [
        {
          title: "Разбираем сбой",
          text: "Где рвётся поток: вебхук, очередь, права, дубли, маппинг полей.",
        },
        {
          title: "Фиксируем контур",
          text: "Что пишем в сделку, какие ретраи, кто владеет ошибками. Смета до кода.",
        },
        {
          title: "Собираем обмен",
          text: "Сайт, 1С, телефония, мессенджеры — с логом и повторными попытками.",
        },
        {
          title: "Приёмка",
          text: "Контрольные сделки, акт, регламент. Дальше — сопровождение по SLA.",
        },
      ],
      faq: [
        {
          q: "Сколько стоит интеграция Битрикс24?",
          a: "Типовой контур сайт/телефония/мессенджеры — от 300 000 ₽. Связка с 1С/УНФ — от 300 000 ₽, сложный контур — от 500 000 ₽. После брифа — фиксированная смета.",
        },
        {
          q: "Интеграция не работает. Чините чужой модуль?",
          a: "Да. Сначала аудит: права, вебхуки, очередь, дубли. Часто хватает доработки, а не новой системы. Если модуль мёртвый — собираем стабильный обмен заново.",
        },
        {
          q: "Чем это отличается от внедрения Битрикс24?",
          a: "Эта страница — про обмен данными (сайт, 1С, телефония, сервисы). Внедрение портала, воронки и ролей — /integrations/bitrix24-implementation. Пакеты с ИИ — /bitrix.",
        },
        {
          q: "Делаете интеграцию сайта и Тильды с Битрикс24?",
          a: "Да: формы, UTM, дубли, ответственный в сделке. Тильда, свой сайт, Авито и открытые линии — по карте источников.",
        },
        {
          q: "Вы официальный партнёр?",
          a: "Да. Бизнес-партнёр Битрикс24, участие в программе 1С-Битрикс · ID 28909898.",
        },
      ],
    },
    en: {
      h1: "Bitrix24 integration",
      subtitle:
        "Bitrix24 integration: site, 1C, telephony, messengers. We repair broken sync or build a new contour. Bitrix24 Business Partner · fixed estimate · from €3,000.",
      problems: [
        "Bitrix24 integration is broken: leads duplicate or never reach a deal",
        "Site, telephony and messengers live outside CRM",
        "1C and Bitrix24 disagree on status and amount",
        "A connector exists but there are no logs or retries",
        "You need an integrator — not a course",
      ],
      deliverables: [
        "Data-flow map",
        "Production sync with logs and retries",
        "Site / telephony / 1C / messenger connectors",
        "Repair of a broken contour",
        "Acceptance criteria and playbook",
      ],
      intro: [
        "We sell Bitrix24 integration as a service — not a downloadable module.",
        "Buyers come when leads leak or 1C drifts from deals. We repair or rebuild.",
        "1C detail: /integrations/bitrix24-1c. Full portal rollout: /integrations/bitrix24-implementation.",
      ],
      howWeSolve: [
        { title: "Trace the break", text: "Webhook, queue, rights, duplicates, field map." },
        { title: "Lock the contour", text: "What is written where, retries, ownership. Estimate first." },
        { title: "Ship the sync", text: "Site, 1C, telephony, messengers — with logs." },
        { title: "Accept", text: "Control deals, handover, optional SLA." },
      ],
      faq: [
        {
          q: "Price?",
          a: "Typical site/telephony contour from €3,000. 1C from €3,000; complex from €5,000. Fixed estimate after a brief.",
        },
        {
          q: "Can you fix someone else’s connector?",
          a: "Yes. Audit first. Repair if viable; rebuild if the module is dead.",
        },
        {
          q: "Different from implementation?",
          a: "This page is data exchange. Portal rollout is /integrations/bitrix24-implementation.",
        },
        {
          q: "Site and Tilda?",
          a: "Yes — forms, UTM, owner on the deal, duplicate rules.",
        },
        {
          q: "Official partner?",
          a: "Yes. Bitrix24 Business Partner, 1C-Bitrix program ID 28909898.",
        },
      ],
    },
  },
];
