/**
 * Priority commercial intent pack (problem + system + purchase intent).
 * Canonical paths stay under /integrations|/automation|/solutions|/ai|/services —
 * pretty aliases live in next.config redirects (/bitrix24/*, /cases/*, …).
 */
import type { LandingSpec } from "@/lib/seo-catalog/types";

export const CATALOG_LANDING_SPECS_PRIORITY: LandingSpec[] = [
  {
    category: "integrations",
    slug: "bitrix24-implementation",
    contentKey: "prio_bitrix24_implementation",
    cluster: "bitrix24",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "внедрение битрикс24",
      "интеграция битрикс24",
      "автоматизация битрикс24",
      "внедрение и интеграция битрикс24",
      "внедрение crm битрикс24",
      "битрикс24 под ключ",
      "настройка битрикс24",
      "внедрение bitrix24 цена",
      "стоимость внедрения битрикс24",
      "заказать внедрение битрикс24",
    ],
    caseStudySlugs: ["bitrix24-kwork-crm", "bitrix24-erp-sync", "yandex-telemost-agent"],
    related: [
      {
        href: "/bitrix",
        labelRu: "лендинг Bitrix24 · пакеты и ИИ",
        labelEn: "Bitrix24 landing · packages and AI",
      },
      {
        href: "/integrations/bitrix24",
        labelRu: "автоматизация внутри портала",
        labelEn: "in-portal automation",
      },
      {
        href: "/integrations/bitrix24-sales-automation",
        labelRu: "автоматизация отдела продаж",
        labelEn: "sales automation",
      },
      {
        href: "/integrations/bitrix24-1c",
        labelRu: "Bitrix24 ↔ 1С",
        labelEn: "Bitrix24 ↔ 1C",
      },
      {
        href: "/automation/ocr-data-extraction",
        labelRu: "документы → 1С",
        labelEn: "documents → 1C",
      },
      {
        href: "/pricing",
        labelRu: "цены и форматы",
        labelEn: "pricing",
      },
    ],
    ru: {
      h1: "Внедрение и интеграция Битрикс24",
      subtitle:
        "Внедрение Битрикс24 под ключ: портал, воронки, телефония, 1С и мессенджеры. Пилот от 300 000 ₽, 2–4 недели; промышленное внедрение — от 500 000 ₽.",
      problems: [
        "Bitrix24 куплен, но заявки не доходят до ответственного и дублируются",
        "Телефония, сайт и мессенджеры живут отдельно от CRM",
        "1С и склад не связаны со сделками — ручной копипаст",
        "Руководитель не видит, где сделки зависают и сколько часов уходит на рутину",
      ],
      deliverables: [
        "Аудит процессов и карта воронки под ваш отдел продаж",
        "Настройка портала: права, роботы, открытые линии, задачи",
        "Интеграции: сайт, 1С, телефония, Telegram / WhatsApp / MAX",
        "Пилот одного сценария за 2–4 недели + смета полного контура",
      ],
      intro: [
        "Wordstat: «интеграция Битрикс24» и «внедрение Битрикс24» — закрываем как внедрение под ключ с фиксированной сметой, без курсов и «скачать бесплатно».",
        "Автоматизация продаж внутри портала — /integrations/bitrix24-sales-automation. Обмен с 1С — /integrations/bitrix24-1c.",
        "Цель: 2–3 квалифицированных проекта в месяц с бюджетом пилота от 300 000 ₽.",
      ],
      faq: [
        {
          q: "Сколько стоит внедрение Битрикс24?",
          a: "Пилот одного сценария — от 300 000 ₽ (2–4 недели). Полный контур с интеграциями — от 500 000 ₽. После брифа — фиксированная смета.",
        },
        {
          q: "Чем отличается от /bitrix и /integrations/bitrix24?",
          a: "Эта страница — коммерческий оффер «внедрение и интеграция» под Direct/SEO. /bitrix — пакетный лендинг; /integrations/bitrix24 — сценарий автоматизации внутри портала.",
        },
        {
          q: "Нужен ли ИИ сразу?",
          a: "Нет. Часто хватает роботов, вебхуков и открытых линий. ИИ подключаем там, где текст, звонки или КП реально экономят часы.",
        },
        {
          q: "Бесплатная консультация?",
          a: "Да — 30 минут: боль, стек, вилка бюджета. Без обязательств, NDA по запросу.",
        },
      ],
    },
    en: {
      h1: "Bitrix24 implementation and integration",
      subtitle:
        "Portal, pipelines, telephony, 1C and messengers — a working contour, not a box. Pilot from €3,000, 2–4 weeks; production from €5,000.",
      problems: [
        "Bitrix24 is bought but leads never reach an owner and get duplicated",
        "Telephony, site and messengers live outside CRM",
        "1C and warehouse are not linked to deals — manual copy-paste",
        "Leadership cannot see where deals stall",
      ],
      deliverables: [
        "Process audit and pipeline map",
        "Portal setup: rights, robots, open lines, tasks",
        "Integrations: site, 1C, telephony, Telegram / WhatsApp / MAX",
        "One-scenario pilot in 2–4 weeks + full-contour estimate",
      ],
      intro: [
        "We sell Bitrix24 implementation with a fixed estimate — not courses or free downloads.",
        "AI sales layer lives on /integrations/bitrix24-sales-automation; documents→1C is a separate offer.",
        "Target: a few qualified mid-ticket projects per month.",
      ],
      faq: [
        {
          q: "Price?",
          a: "One-scenario pilot from €3,000 (2–4 weeks). Full contour from €5,000. Fixed estimate after a short brief.",
        },
        {
          q: "Different from /bitrix?",
          a: "This page is the commercial SEO/Direct offer. /bitrix is the package landing.",
        },
        {
          q: "Is AI mandatory?",
          a: "No. Robots and webhooks often suffice; AI where text/calls/proposals save hours.",
        },
        {
          q: "Free consult?",
          a: "Yes — 30 minutes: pain, stack, budget range. NDA on request.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "bitrix24-sales-automation",
    contentKey: "prio_bitrix24_sales_automation",
    cluster: "bitrix24",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/sales-pipeline.svg",
    keywords: [
      "автоматизация отдела продаж bitrix24",
      "автоматизация продаж битрикс24",
      "роботы bitrix24 продажи",
      "воронка bitrix24 автоматизация",
      "внедрение ии в bitrix24",
      "bitrix24 sales automation",
    ],
    caseStudySlugs: ["bitrix24-kwork-crm", "kp-llm-automation"],
    related: [
      {
        href: "/integrations/bitrix24-ai",
        labelRu: "внедрение ИИ в Битрикс24",
        labelEn: "AI implementation in Bitrix24",
      },
      {
        href: "/automation/proposal-generation",
        labelRu: "автоматизация коммерческих предложений",
        labelEn: "commercial proposal automation",
      },
      {
        href: "/portfolio/bitrix24-kwork-crm",
        labelRu: "пример интеграции заявок Kwork с CRM",
        labelEn: "Kwork → Bitrix24 lead capture case",
      },
      {
        href: "/automation/sales",
        labelRu: "автоматизация продаж end-to-end",
        labelEn: "end-to-end sales automation",
      },
      {
        href: "/services/ai-consulting",
        labelRu: "ИИ-консалтинг и дорожная карта",
        labelEn: "AI consulting and roadmap",
      },
      {
        href: "/pricing",
        labelRu: "стоимость внедрения AI",
        labelEn: "AI implementation pricing",
      },
    ],
    ru: {
      h1: "Автоматизация отдела продаж в Битрикс24 с помощью ИИ",
      subtitle:
        "Для коммерческих директоров и владельцев CRM: заявка → квалификация → задача → КП → дожим внутри Bitrix24. От 500 000 ₽, пилот 2–4 недели.",
      problems: [
        "Лиды из сайта, почты и маркетплейсов не долетают в воронку или дублируются",
        "Менеджеры вручную собирают КП и забывают дожим",
        "Роботы Bitrix24 покрывают только простые условия — сложные тексты и документы остаются ручными",
        "Руководитель не видит, где сделки зависают и сколько часов уходит на рутину",
      ],
      deliverables: [
        "Карта воронки и точек потерь в Bitrix24",
        "Автоприём заявок, дедупликация, назначение ответственного",
        "ИИ-шаги: квалификация, черновики писем и КП из карточки сделки",
        "Триггеры дожим, дашборд конверсий, журнал ошибок",
      ],
      intro: [
        "Внедряем не «ИИ для Битрикс», а конкретный контур продаж: от входящей заявки до КП и напоминаний — с фиксированной сметой.",
        "Базовая настройка портала — на /integrations/bitrix24; ИИ-слой поверх роботов — здесь и на /integrations/bitrix24-ai.",
        "Типовой результат: меньше ручного копипаста, быстрее первый контакт, КП из каталога без выдуманных цен.",
      ],
      faq: [
        {
          q: "Чем это отличается от обычного внедрения Bitrix24?",
          a: "Внедрение портала — пользователи, права, воронки. Здесь — автоматизация продаж и ИИ-шаги: заявки, квалификация, КП, дожим с измеримым ROI.",
        },
        {
          q: "Сколько стоит и сколько длится?",
          a: "От 500 000 ₽ за промышленный контур; пилот одного сценария — 2–4 недели, полный rollout — обычно 4–12 недель.",
        },
        {
          q: "Нужен ли обязательно ИИ?",
          a: "Нет. Часто хватает роботов, вебхуков и шаблонов. ИИ подключаем там, где текст и квалификация реально экономят часы.",
        },
        {
          q: "Есть ли кейс?",
          a: "Да — интеграция заказов Kwork → Bitrix24 и автоматизация КП. Смотрите /portfolio/bitrix24-kwork-crm и /portfolio/kp-llm-automation.",
        },
      ],
    },
    en: {
      h1: "Bitrix24 sales automation with AI",
      subtitle:
        "For commercial leads: lead → qualification → task → proposal → follow-up inside Bitrix24. From €5,000; pilot 2–4 weeks.",
      problems: [
        "Leads from site, email and marketplaces never reach the pipeline or get duplicated",
        "Reps build proposals by hand and forget follow-up",
        "Bitrix robots only cover simple rules — complex copy and documents stay manual",
        "Leadership cannot see where deals stall or how many hours go to busywork",
      ],
      deliverables: [
        "Pipeline and leakage map in Bitrix24",
        "Auto-intake, dedupe, owner assignment",
        "AI steps: qualification, email/proposal drafts from the deal card",
        "Follow-up triggers, conversion dashboard, error log",
      ],
      intro: [
        "We deliver a sales contour — not “AI for Bitrix” in the abstract — with a fixed estimate.",
        "Portal setup lives on /integrations/bitrix24; the AI layer on robots lives here and on /integrations/bitrix24-ai.",
        "Typical outcome: less copy-paste, faster first contact, catalog-priced proposals.",
      ],
      faq: [
        {
          q: "Different from a normal Bitrix24 rollout?",
          a: "Portal rollout is users, rights, pipelines. This page is sales automation and AI steps with measurable ROI.",
        },
        {
          q: "Price and timeline?",
          a: "From €5,000 for a production contour; one-scenario pilot 2–4 weeks; full rollout usually 4–12 weeks.",
        },
        {
          q: "Is AI mandatory?",
          a: "No. Robots, webhooks and templates often suffice. AI goes where text and qualification save real hours.",
        },
        {
          q: "Any case studies?",
          a: "Yes — Kwork → Bitrix24 intake and proposal automation. See /portfolio/bitrix24-kwork-crm and /portfolio/kp-llm-automation.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "bitrix24-1c",
    contentKey: "prio_bitrix24_1c",
    cluster: "bitrix24",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/erp-sync.svg",
    keywords: [
      "интеграция битрикс24 и 1с",
      "интеграция bitrix24 с 1с",
      "интеграция битрикс24 1с",
      "синхронизация bitrix24 1с",
      "bitrix24 1с обмен",
      "сделки bitrix24 заказы 1с",
      "стоимость интеграции битрикс24 1с",
    ],
    caseStudySlugs: ["bitrix24-erp-sync", "crm-1c-sync"],
    related: [
      {
        href: "/integrations/1c",
        labelRu: "интеграция 1С с CRM",
        labelEn: "1C ↔ CRM integration",
      },
      {
        href: "/integrations/1c-documents",
        labelRu: "документы и счета из 1С",
        labelEn: "documents and invoices from 1C",
      },
      {
        href: "/integrations/bitrix24-ai",
        labelRu: "ИИ-слой для Битрикс24",
        labelEn: "AI layer for Bitrix24",
      },
      {
        href: "/automation/documents",
        labelRu: "обработка документов с выгрузкой в 1С",
        labelEn: "document processing into 1C",
      },
      {
        href: "/portfolio/bitrix24-erp-sync",
        labelRu: "кейс Bitrix24 + 1С",
        labelEn: "Bitrix24 + 1C case",
      },
      {
        href: "/pricing",
        labelRu: "стоимость внедрения",
        labelEn: "implementation pricing",
      },
    ],
    ru: {
      h1: "Интеграция Битрикс24 с 1С, ЗУП и УНФ",
      subtitle:
        "Двусторонний обмен: сделка → заказ в 1С; оплата → этап в Bitrix24. ЗУП/УНФ — по аудиту. От 300 000 ₽, типичный срок 4–8 недель.",
      problems: [
        "Менеджер ведёт сделку в Bitrix24, бухгалтер — заказ в 1С; данные расходятся",
        "Оплаты и отгрузки не отражаются в воронке вовремя",
        "Номенклатура и контрагенты дублируются с ошибками",
        "Нет журнала синхронизации и повторных попыток при сбоях",
      ],
      deliverables: [
        "Схема потоков: сделки, контрагенты, заказы, оплаты, остатки",
        "Production-шлюз с очередью, идемпотентностью и retry",
        "Маппинг полей Bitrix24 ↔ документы 1С",
        "Алерты при расхождениях и документация для IT/бухгалтерии",
      ],
      intro: [
        "Связываем Bitrix24 и 1С так, чтобы продажи и учёт жили в одном контуре — без Excel «на почту».",
        "Общий сценарий CRM↔1С — на /integrations/1c; эта страница — акцент на пару Bitrix24 + 1С.",
        "AI-извлечение первички в 1С — соседний сценарий /integrations/1c-documents и /automation/documents.",
      ],
      faq: [
        {
          q: "Облако Bitrix24 или коробка?",
          a: "Оба варианта. Для 1С чаще on-premise или контур заказчика; уточняем на аудите.",
        },
        {
          q: "Какие конфигурации 1С?",
          a: "Типовые УТ/БУХ/ERP и доработки через OData/HTTP-сервисы — зависит от релиза и обменов.",
        },
        {
          q: "Срок и цена?",
          a: "От 500 000 ₽; пилот одной сущности 2–4 недели, полный обмен обычно 4–8 недель.",
        },
        {
          q: "Есть кейс?",
          a: "Да — /portfolio/bitrix24-erp-sync: сделка «выиграна» → заказ в 1С, оплата → этап в CRM.",
        },
      ],
    },
    en: {
      h1: "Bitrix24 ↔ 1C integration: deals, orders and payments without copy-paste",
      subtitle:
        "Bidirectional sync: won deal → 1C order; payment in 1C → Bitrix stage. From €5,000; typical 4–8 weeks.",
      problems: [
        "Sales runs Bitrix24 while accounting runs 1C — data drifts",
        "Payments and shipments do not hit the pipeline on time",
        "Counterparties and SKUs get duplicated with errors",
        "No sync journal or retries on failures",
      ],
      deliverables: [
        "Flow map: deals, counterparties, orders, payments, stock",
        "Production gateway with queue, idempotency and retry",
        "Field mapping Bitrix24 ↔ 1C documents",
        "Mismatch alerts and docs for IT/accounting",
      ],
      intro: [
        "We connect Bitrix24 and 1C so sales and ledger share one contour — no Excel by email.",
        "Generic CRM↔1C lives on /integrations/1c; this page focuses on Bitrix24 + 1C.",
        "AI extraction of source docs into 1C is covered on /integrations/1c-documents and /automation/documents.",
      ],
      faq: [
        {
          q: "Cloud Bitrix24 or on-prem?",
          a: "Both. 1C is often on-prem or customer perimeter — confirmed in the audit.",
        },
        {
          q: "Which 1C configs?",
          a: "Common UT/ACC/ERP builds plus custom HTTP/OData services — depends on release.",
        },
        {
          q: "Price and timeline?",
          a: "From €5,000; one-entity pilot 2–4 weeks; full exchange usually 4–8 weeks.",
        },
        {
          q: "Case study?",
          a: "Yes — /portfolio/bitrix24-erp-sync: won deal → 1C order; payment → CRM stage.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "amocrm-automation",
    contentKey: "prio_amocrm_automation",
    cluster: "amocrm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/crm-integration.svg",
    keywords: [
      "автоматизация amocrm",
      "автоматизация amoCRM",
      "роботы amocrm",
      "автоматизация воронки amocrm",
      "интеграция amocrm с сайтом",
      "amocrm sales automation",
    ],
    caseStudySlugs: ["amocrm-website-integration", "kp-llm-automation"],
    related: [
      {
        href: "/integrations/amocrm-ai",
        labelRu: "ИИ для amoCRM",
        labelEn: "AI for amoCRM",
      },
      {
        href: "/integrations/amocrm-1c",
        labelRu: "интеграция amoCRM с 1С",
        labelEn: "amoCRM ↔ 1C integration",
      },
      {
        href: "/automation/proposal-generation",
        labelRu: "автоматизация коммерческих предложений",
        labelEn: "proposal automation",
      },
      {
        href: "/automation/sales",
        labelRu: "автоматизация отдела продаж",
        labelEn: "sales team automation",
      },
      {
        href: "/portfolio/amocrm-website-integration",
        labelRu: "кейс сайт → amoCRM",
        labelEn: "website → amoCRM case",
      },
      {
        href: "/pricing",
        labelRu: "стоимость внедрения",
        labelEn: "implementation pricing",
      },
    ],
    ru: {
      h1: "Автоматизация amoCRM: воронка, заявки  и дожим без ручного ввода",
      subtitle:
        "Сайт и реклама → сделки, роботы, КП и напоминания. Для команд на amoCRM. От 500 000 ₽, пилот 2–4 недели.",
      problems: [
        "Заявки с сайта лежат в почте часами, часть лидов теряется",
        "Роботы настроены слабо — менеджеры живут в Excel и мессенджерах",
        "КП и договоры собирают вручную вне карточки сделки",
        "Нет единых UTM и ответственности за этап воронки",
      ],
      deliverables: [
        "Приём лидов с сайта/рекламы в amoCRM за секунды",
        "Роботы: назначение, задачи, SLA, дожим",
        "Связка с генерацией КП и документами",
        "Дашборд воронки и контроль дублей",
      ],
      intro: [
        "Делаем amoCRM рабочим контуром продаж, а не «хранилищем карточек».",
        "Базовая интеграция портала — /integrations/amocrm; ИИ-слой — /integrations/amocrm-ai.",
        "Типовой эффект: лид в CRM мгновенно, первый контакт в SLA, меньше ручного переноса.",
      ],
      faq: [
        {
          q: "Можно без замены CRM?",
          a: "Да — почти всегда остаёмся на amoCRM и наращиваем автоматизацию и интеграции.",
        },
        {
          q: "Срок и цена?",
          a: "От 500 000 ₽; пилот 2–4 недели, полный контур обычно 4–10 недель.",
        },
        {
          q: "Чем отличается от ИИ для amoCRM?",
          a: "Эта страница — роботы, заявки, воронка. /integrations/amocrm-ai — квалификация и тексты поверх CRM.",
        },
      ],
    },
    en: {
      h1: "amoCRM automation: pipeline, intake and follow-up without manual entry",
      subtitle:
        "Website and ads → deals, robots, proposals and reminders. From €5,000; pilot 2–4 weeks.",
      problems: [
        "Website leads sit in email for hours; some are lost",
        "Robots are weak — reps live in Excel and messengers",
        "Proposals are built outside the deal card",
        "No consistent UTMs or stage ownership",
      ],
      deliverables: [
        "Lead intake from site/ads into amoCRM in seconds",
        "Robots: assignment, tasks, SLA, nudges",
        "Link to proposal generation and documents",
        "Pipeline dashboard and duplicate control",
      ],
      intro: [
        "We turn amoCRM into a sales contour — not a card dump.",
        "Base portal work: /integrations/amocrm; AI layer: /integrations/amocrm-ai.",
        "Typical effect: instant CRM lead, first contact in SLA, less manual transfer.",
      ],
      faq: [
        {
          q: "Can we keep amoCRM?",
          a: "Yes — we almost always stay on amoCRM and add automation and integrations.",
        },
        {
          q: "Price and timeline?",
          a: "From €5,000; pilot 2–4 weeks; full contour usually 4–10 weeks.",
        },
        {
          q: "Different from AI for amoCRM?",
          a: "This page is robots, intake, pipeline. /integrations/amocrm-ai is qualification and copy on top of CRM.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "amocrm-1c",
    contentKey: "prio_amocrm_1c",
    cluster: "amocrm",
    serviceSlug: "crm-integration",
    coverImage: "/diagrams/erp-sync.svg",
    keywords: [
      "интеграция amocrm с 1с",
      "интеграция amoCRM и 1с",
      "синхронизация amocrm 1с",
      "amocrm 1с обмен",
      "заказы amocrm в 1с",
    ],
    caseStudySlugs: ["crm-1c-sync", "invoice-processing-pipeline"],
    related: [
      {
        href: "/integrations/1c",
        labelRu: "интеграция 1С с CRM",
        labelEn: "1C ↔ CRM integration",
      },
      {
        href: "/integrations/amocrm-automation",
        labelRu: "автоматизация amoCRM",
        labelEn: "amoCRM automation",
      },
      {
        href: "/integrations/bitrix24-1c",
        labelRu: "интеграция Битрикс24 с 1С",
        labelEn: "Bitrix24 ↔ 1C integration",
      },
      {
        href: "/automation/documents",
        labelRu: "распознавание документов с выгрузкой в 1С",
        labelEn: "document recognition into 1C",
      },
      {
        href: "/portfolio/crm-1c-sync",
        labelRu: "кейс CRM ↔ 1С",
        labelEn: "CRM ↔ 1C case",
      },
      {
        href: "/pricing",
        labelRu: "стоимость внедрения",
        labelEn: "implementation pricing",
      },
    ],
    ru: {
      h1: "Интеграция amoCRM с 1С: заказы, оплаты и остатки в одном контуре",
      subtitle:
        "Двусторонний обмен без ручного дублирования. От 500 000 ₽, типичный срок 4–8 недель.",
      problems: [
        "Заказы создают дважды — в CRM и в 1С",
        "Остатки в CRM устаревают, оплаты не закрывают воронку",
        "Контрагенты и номенклатура расходятся",
        "Сбои обмена никто не замечает вовремя",
      ],
      deliverables: [
        "Карта сущностей: сделки, контрагенты, заказы, оплаты, остатки",
        "Промежуточный сервис с идемпотентностью и сверкой",
        "Правила: когда сделка становится заказом в 1С",
        "Алерты, retry и документация для бухгалтерии",
      ],
      intro: [
        "Собираем единый источник правды между amoCRM и 1С — продажи видят учёт, учёт видит сделки.",
        "Общий сценарий — /integrations/1c; для Bitrix24 — /integrations/bitrix24-1c.",
        "OCR счетов в 1С — /portfolio/invoice-processing-pipeline и /automation/documents.",
      ],
      faq: [
        {
          q: "Работает с облачной amoCRM?",
          a: "Да — через API amoCRM и HTTP/OData 1С (или шину заказчика).",
        },
        {
          q: "Срок и цена?",
          a: "От 500 000 ₽; пилот 2–4 недели, полный обмен обычно 4–8 недель.",
        },
        {
          q: "Есть кейс?",
          a: "Да — /portfolio/crm-1c-sync: −80% ручного ввода, retry и алерты при сбоях.",
        },
      ],
    },
    en: {
      h1: "amoCRM ↔ 1C integration: orders, payments and stock in one loop",
      subtitle:
        "Bidirectional sync without manual duplication. From €5,000; typical 4–8 weeks.",
      problems: [
        "Orders are created twice — in CRM and in 1C",
        "CRM stock goes stale; payments do not close the pipeline",
        "Counterparties and SKUs drift apart",
        "Sync failures go unnoticed",
      ],
      deliverables: [
        "Entity map: deals, counterparties, orders, payments, stock",
        "Middleware with idempotency and reconciliation",
        "Rules for when a deal becomes a 1C order",
        "Alerts, retry and accounting docs",
      ],
      intro: [
        "One source of truth between amoCRM and 1C — sales sees ledger, ledger sees deals.",
        "Generic path: /integrations/1c; Bitrix24 path: /integrations/bitrix24-1c.",
        "Invoice OCR into 1C: /portfolio/invoice-processing-pipeline and /automation/documents.",
      ],
      faq: [
        {
          q: "Works with cloud amoCRM?",
          a: "Yes — via amoCRM API and 1C HTTP/OData (or customer bus).",
        },
        {
          q: "Price and timeline?",
          a: "From €5,000; pilot 2–4 weeks; full exchange usually 4–8 weeks.",
        },
        {
          q: "Case study?",
          a: "Yes — /portfolio/crm-1c-sync: −80% manual entry, retry and alerts.",
        },
      ],
    },
  },
  {
    category: "integrations",
    slug: "telephony-ai",
    contentKey: "prio_telephony_ai",
    cluster: "bitrix24",
    serviceSlug: "ai-sales-loop",
    coverImage: "/diagrams/sales-pipeline.svg",
    keywords: [
      "телефония crm ai",
      "телефония битрикс24 ai",
      "анализ звонков crm",
      "ai контур отдела продаж",
      "связка телефонии с crm",
      "mango bitrix24",
      "uis bitrix24",
      "bitrix24 telephony ai",
      "yandex телефония ai",
      "yandex speechkit crm",
      "speechsense yandex",
      "yandex contact center ai",
    ],
    caseStudySlugs: ["yandex-telemost-agent", "bitrix24-kwork-crm"],
    related: [
      {
        href: "/services/ai-sales-loop",
        labelRu: "ИИ-контур отдела продаж",
        labelEn: "AI sales loop",
      },
      {
        href: "/integrations/bitrix24-ai",
        labelRu: "Bitrix24 ИИ — слой внедрения",
        labelEn: "Bitrix24 AI implementation layer",
      },
      {
        href: "/integrations/bitrix24-sales-automation",
        labelRu: "Автоматизация продаж в Bitrix24",
        labelEn: "Bitrix24 sales automation",
      },
      {
        href: "/integrations/telephony-crm",
        labelRu: "Телефония и запись звонков в CRM",
        labelEn: "Telephony and call logging in CRM",
      },
      {
        href: "https://bitrix.bober-systems.ru/#sales-loop",
        labelRu: "Bitrix-лендинг · ИИ-контур",
        labelEn: "Bitrix landing · AI sales loop",
      },
      {
        href: "/pricing",
        labelRu: "Цены и форматы",
        labelEn: "Pricing and formats",
      },
    ],
    ru: {
      h1: "Телефония + CRM + ИИ: один операционный контур продаж",
      subtitle:
        "Звонки, переписки, CRM и автоматические следующие действия — один продукт. Bitrix24/amoCRM или стек Yandex Cloud (SpeechKit, YandexGPT) — под вашу инфраструктуру. Пилот от 300 000 ₽.",
      problems: [
        "Звонок закончился — и всё, что менеджер услышал, осталось у него в голове, а не в CRM",
        "Бота купили отдельно, анализ звонков — отдельно, CRM — отдельно, и контур так и не замкнулся",
        "BitrixGPT пишет текст и саммари внутри портала, но не знает вашу телефонию, 1С и правила квалификации",
        "Дожим забывается, старая база не реактивируется, а об упущенной сделке руководитель узнаёт последним",
      ],
      deliverables: [
        "Связка телефонии (MANGO, UIS, Voximplant, Asterisk, штатная Bitrix24) с CRM",
        "AI: классификация обращений, саммари, факты в карточке сделки",
        "Автозадачи, дожим, эскалации и отчёт об упущенных сделках",
        "Слой поверх BitrixGPT: 1С, телефония, документы, КП и своя бизнес-логика",
        "Тот же контур на стеке Yandex Cloud: SpeechKit/SpeechSense распознаёт речь, YandexGPT анализирует и суммирует",
      ],
      intro: [
        "Звонок закончился — и всё, что услышал менеджер, осталось у него в голове. В CRM попадает в лучшем случае наспех написанный комментарий. Мы собираем звонки, переписки и CRM в один контур: разговор анализируется, факты попадают в карточку сделки, а задача на дожим создаётся сама.",
        "Это не ещё один бот и не отдельный сервис анализа звонков. Разбор разговора — только первый шаг. Дальше — обновление CRM, задача менеджеру и отчёт по упущенным сделкам, без ручного переноса данных.",
        "Если вы на Bitrix24: BitrixGPT уже умеет писать сообщения и делать саммари внутри портала — это никуда не девается. Мы достраиваем то, чего там нет: связь с телефонией, 1С, складом, документами, свои правила квалификации и действия за пределами портала.",
        "Если вы на стеке Yandex Cloud (или готовы на него перейти) — собираем тот же контур на инструментах Yandex: распознавание речи через SpeechKit/SpeechSense, анализ и саммари через YandexGPT, факты — в вашу CRM (Bitrix24, amoCRM или свою). Актуально, если для вас важны российское облако и 152-ФЗ.",
        "Готовые сценарии для малого и среднего бизнеса: квалификация новых лидов, реактивация старой базы, контроль качества разговоров, автозадачи и дожим, отчёт по упущенным сделкам.",
        "Начинаем с одного канала — пилот на 2–4 недели. Полный контур — от 300 000 ₽. Коммерческий пакет и лендинг Bitrix24 — в связанных ссылках ниже.",
      ],
      howWeSolve: [
        {
          title: "Bitrix24: телефония + CRM + AI",
          text: "Звонки через MANGO, UIS, Voximplant, Asterisk или штатную телефонию Bitrix24 → факты в карточке сделки → задача  и дожим. Строим поверх BitrixGPT, а не вместо него.",
        },
        {
          title: "Yandex: телефония + CRM + AI",
          text: "SpeechKit/SpeechSense распознаёт речь, YandexGPT анализирует и делает саммари — те же факты и задачи в вашей CRM. Весь контур на стеке Yandex Cloud.",
        },
      ],
      faq: [
        {
          q: "Чем это отличается от «анализа звонков»?",
          a: "Анализ — вход. Продукт замыкает цикл: факты в CRM, задача, дожим, эскалация и отчёт об упущенных сделках.",
        },
        {
          q: "Не конкурируете ли вы с BitrixGPT?",
          a: "Нет. BitrixGPT закрывает текст и базовые сценарии внутри CRM. Мы расширяем его телефонией, 1С, документами, правилами квалификации и действиями вне портала.",
        },
        {
          q: "А если мы на Yandex Cloud, а не на своей телефонии?",
          a: "Собираем контур на инструментах Yandex: SpeechKit/SpeechSense распознаёт речь, YandexGPT анализирует и суммирует разговор, факты уходят в вашу CRM. Хорошо подходит, если важны российское облако и 152-ФЗ.",
        },
        {
          q: "Какая телефония поддерживается?",
          a: "MANGO Office, UIS, Voximplant, Asterisk и штатная телефония Bitrix24 — подключаем то, что уже есть. Либо распознавание речи через Yandex SpeechKit, если вы на этом стеке.",
        },
        {
          q: "С чего начать МСП?",
          a: "С одного канала (входящие звонки или чаты) и одного сценария: квалификация лидов или контроль качества. Затем — реактивация базы и отчёт об упущенных сделках.",
        },
        {
          q: "Где коммерческий пакет?",
          a: "ИИ-контур отдела продаж — от 300 000 ₽. Можно начать с записи звонков в CRM без ИИ-слоя. Ссылки на пакет и лендинг Bitrix24 — в блоке связанных материалов ниже.",
        },
      ],
    },
    en: {
      h1: "Telephony + CRM + AI: one sales operating loop",
      subtitle:
        "Calls, chats, CRM and automatic next actions — one product. Bitrix24/amoCRM or the Yandex Cloud stack (SpeechKit, YandexGPT) — built for your infrastructure. Pilot from €3,000.",
      problems: [
        "The call ends, and whatever the rep heard stays in their head, not in CRM",
        "You bought a bot, call analytics and CRM separately, and the loop never closed",
        "BitrixGPT drafts text and summaries inside the portal but doesn't know your telephony, 1C or qualification rules",
        "Follow-ups slip, the old base stays cold, and the manager is the last to hear about a lost deal",
      ],
      deliverables: [
        "Telephony (MANGO, UIS, Voximplant, Asterisk, native Bitrix24) wired to CRM",
        "AI: intent classification, summaries, facts written into the deal card",
        "Auto tasks, follow-ups, escalations and a lost-deal report",
        "Layer on top of BitrixGPT: 1C, telephony, documents, proposals and your own business logic",
        "The same loop on the Yandex Cloud stack: SpeechKit/SpeechSense for speech recognition, YandexGPT for analysis and summaries",
      ],
      intro: [
        "The call ends, and whatever the rep heard stays in their head. At best, CRM gets a rushed one-line comment. We wire calls, chats and CRM into one loop: the conversation gets analyzed, the facts land in the deal card, and a follow-up task gets created automatically.",
        "This isn't another bot or a standalone call-analytics tool. Analyzing the conversation is just the first step — next comes the CRM update, a task for the rep, and a lost-deal report, with nothing copied by hand.",
        "If you're on Bitrix24: BitrixGPT already drafts messages and summaries inside the portal — that stays. We build what's missing: telephony, 1C, warehouse, documents, your own qualification rules, and actions outside the portal.",
        "If you run on Yandex Cloud (or are open to it) — we build the same loop on Yandex tools: speech recognition via SpeechKit/SpeechSense, analysis and summaries via YandexGPT, with the facts landing in your CRM (Bitrix24, amoCRM, or your own). Useful if a Russian cloud and 152-FZ compliance matter to you.",
        "Ready-made scenarios for small and mid-size teams: qualifying new leads, reactivating the old base, call quality control, auto tasks and follow-ups, a lost-deal report.",
        "We start with one channel — a 2–4 week pilot. The full loop is from €3,000. The commercial package and Bitrix24 landing are in the related links below.",
      ],
      howWeSolve: [
        {
          title: "Bitrix24: telephony + CRM + AI",
          text: "Calls via MANGO, UIS, Voximplant, Asterisk or native Bitrix24 telephony → facts in the deal card → task and follow-up. Built on top of BitrixGPT, not instead of it.",
        },
        {
          title: "Yandex: telephony + CRM + AI",
          text: "SpeechKit/SpeechSense transcribes the call, YandexGPT analyzes and summarizes it — the same facts and tasks land in your CRM. The whole loop on the Yandex Cloud stack.",
        },
      ],
      faq: [
        {
          q: "How is this different from call analytics?",
          a: "Analytics is the input. The product closes the loop: CRM fields, task, follow-up, escalation and a lost-deal report.",
        },
        {
          q: "Do you compete with BitrixGPT?",
          a: "No. BitrixGPT covers text and basic in-CRM scenarios. We extend it with telephony, 1C, documents, qualification rules and actions outside the portal.",
        },
        {
          q: "What if we're on Yandex Cloud instead of our own telephony?",
          a: "We build the loop on Yandex tools: SpeechKit/SpeechSense transcribes the call, YandexGPT analyzes and summarizes it, and the facts land in your CRM. A good fit if a Russian cloud and 152-FZ compliance matter.",
        },
        {
          q: "Which telephony stacks?",
          a: "MANGO Office, UIS, Voximplant, Asterisk and native Bitrix24 telephony — we connect what you already use. Or speech recognition via Yandex SpeechKit if that's your stack.",
        },
        {
          q: "Where should an SMB start?",
          a: "One channel (inbound calls or chats) and one scenario: lead qualification or quality control. Then reactivation and lost-deal reporting.",
        },
        {
          q: "Where is the commercial package?",
          a: "AI sales loop from €3,000. You can start with call logging into CRM without the AI layer. Package and Bitrix24 landing links are in the related section below.",
        },
      ],
    },
  },
  {
    category: "automation",
    slug: "speech-analytics-sales",
    contentKey: "prio_speech_analytics_sales",
    cluster: "automation-sales",
    serviceSlug: "ai-sales-loop",
    coverImage: "/diagrams/sales-pipeline.svg",
    keywords: [
      "речевая аналитика",
      "речевая аналитика отдела продаж",
      "анализ звонков crm",
      "контроль качества звонков",
      "распознавание речи продажи",
      "speech analytics bitrix24",
      "анализ разговоров менеджеров",
    ],
    caseStudySlugs: ["yandex-telemost-agent", "bitrix24-kwork-crm"],
    related: [
      {
        href: "/services/voice-ai",
        labelRu: "услуга · речевая аналитика",
        labelEn: "service · speech analytics",
      },
      {
        href: "/integrations/telephony-ai",
        labelRu: "телефония + CRM + AI",
        labelEn: "telephony + CRM + AI",
      },
      {
        href: "/services/ai-sales-loop",
        labelRu: "ИИ-контур отдела продаж",
        labelEn: "AI sales loop",
      },
      {
        href: "/automation/meeting-to-crm",
        labelRu: "встречи → задачи в CRM",
        labelEn: "meetings → CRM tasks",
      },
      {
        href: "/integrations/bitrix24-implementation",
        labelRu: "внедрение Битрикс24",
        labelEn: "Bitrix24 implementation",
      },
      {
        href: "/pricing",
        labelRu: "цены",
        labelEn: "pricing",
      },
    ],
    ru: {
      h1: "Речевая аналитика отдела продаж",
      subtitle:
        "Все звонки → транскрипт, скоринг, факты в CRM и задачи на дожим. Не выборочная прослушка. Пилот от 300 000 ₽; полный контур — от 500 000 ₽.",
      problems: [
        "Руководитель слушает 5% звонков — остальные возражения и упущенные сделки невидимы",
        "Менеджер закончил разговор — в CRM пустой комментарий или ничего",
        "Нет единых критериев качества: скрипт, запрещённые обещания, эскалация",
        "Дожим забывается, старая база не реактивируется",
      ],
      deliverables: [
        "Связка телефонии (MANGO, UIS, Bitrix24, Asterisk) → STT → анализ",
        "Скоринг разговора, факты и итог в карточке сделки",
        "Автозадачи и алерты по упущенным сделкам",
        "Дашборд по менеджерам: качество, возражения, конверсия",
      ],
      intro: [
        "Речевая аналитика — не «ещё один бот». Цель: контроль качества и заполнение CRM без ручной прослушки каждого звонка.",
        "Коммерческий пакет — /services/voice-ai. Полный контур телефония+CRM+AI — /integrations/telephony-ai.",
        "Пилот на одной линии 2–4 недели. Бюджет от 300 000 ₽; промышленный контур с дашбордами — от 500 000 ₽.",
      ],
      faq: [
        {
          q: "Чем отличается от voice-бота?",
          a: "Бот ведёт диалог. Здесь — разбор уже состоявшихся звонков менеджеров: качество, факты в CRM, дожим.",
        },
        {
          q: "Какая телефония?",
          a: "MANGO, UIS, Voximplant, Asterisk, штатная Bitrix24 — подключаем то, что есть. STT: SpeechKit / SaluteSpeech / on-premise.",
        },
        {
          q: "Цена?",
          a: "Пилот от 300 000 ₽. Полный контур с отчётами и правилами эскалации — от 500 000 ₽.",
        },
        {
          q: "152-ФЗ / NDA?",
          a: "Да. On-prem или российское облако, NDA до обмена записями.",
        },
      ],
    },
    en: {
      h1: "Sales speech analytics",
      subtitle:
        "Every call → transcript, scoring, CRM facts and follow-up tasks. Not sample listening. Pilot from €3,000; full contour from €5,000.",
      problems: [
        "Managers hear 5% of calls — lost objections stay invisible",
        "After the call CRM gets an empty comment or nothing",
        "No shared quality criteria",
        "Follow-ups slip; old base stays cold",
      ],
      deliverables: [
        "Telephony → STT → analysis pipeline",
        "Call scoring and facts in the deal card",
        "Auto tasks and lost-deal alerts",
        "Rep dashboard: quality, objections, conversion",
      ],
      intro: [
        "Speech analytics fills CRM and surfaces quality — not another chatbot.",
        "Commercial package: /services/voice-ai. Full telephony loop: /integrations/telephony-ai.",
        "One-line pilot 2–4 weeks from €3,000.",
      ],
      faq: [
        {
          q: "Different from a voice bot?",
          a: "Bots talk. This product analyzes human sales calls into CRM and tasks.",
        },
        {
          q: "Which telephony?",
          a: "MANGO, UIS, Voximplant, Asterisk, native Bitrix24 — we wire what you have.",
        },
        {
          q: "Price?",
          a: "Pilot from €3,000; full contour from €5,000.",
        },
        {
          q: "Compliance?",
          a: "On-prem or RU cloud; NDA before call recordings.",
        },
      ],
    },
  },
  {
    category: "automation",
    slug: "meeting-to-crm",
    contentKey: "prio_meeting_to_crm",
    cluster: "automation-sales",
    serviceSlug: "ai-meeting-crm",
    coverImage: "/diagrams/workflow-automation.svg",
    keywords: [
      "встречи в crm",
      "протоколы встреч в crm",
      "meeting to crm",
      "задачи из созвонов",
      "транскрипт встречи bitrix24",
      "ai meeting crm",
      "саммари встречи в сделку",
    ],
    caseStudySlugs: ["yandex-telemost-agent"],
    related: [
      {
        href: "/services/ai-meeting-crm",
        labelRu: "услуга · AI Meeting-to-CRM",
        labelEn: "service · AI Meeting-to-CRM",
      },
      {
        href: "/automation/speech-analytics-sales",
        labelRu: "речевая аналитика звонков",
        labelEn: "call speech analytics",
      },
      {
        href: "/portfolio/yandex-telemost-agent",
        labelRu: "кейс Telemost Agent",
        labelEn: "Telemost Agent case",
      },
      {
        href: "/integrations/bitrix24-implementation",
        labelRu: "внедрение Битрикс24",
        labelEn: "Bitrix24 implementation",
      },
      {
        href: "/automation/proposal-generation",
        labelRu: "автоматизация КП",
        labelEn: "proposal automation",
      },
      {
        href: "/pricing",
        labelRu: "цены",
        labelEn: "pricing",
      },
    ],
    ru: {
      h1: "Встречи и звонки → задачи в CRM",
      subtitle:
        "Договорённости со встречи сразу в Bitrix24/amoCRM: задачи, сроки, дожим. Не «ещё одно саммари». Пилот от 300 000 ₽, 2–4 недели.",
      problems: [
        "После созвона решения остаются в чате или PDF — CRM пустая",
        "Ответственные и сроки не фиксируются — дожим забывается",
        "ВКС уже умеет саммари, но не пишет в сделку и не ставит задачи",
        "Критические изменения статуса пишут без проверки человеком",
      ],
      deliverables: [
        "Забор транскрипта из Telemost / MTS Link / SaluteJazz / IVA360",
        "Распознавание договорённостей, ответственных и сроков",
        "Обновление сделки + задачи + дожим в CRM",
        "Human-in-the-loop перед критической записью",
      ],
      intro: [
        "Саммари встречи — вход. Продукт — исполнение: задачи, поля CRM, контроль срока.",
        "Коммерческий оффер — /services/ai-meeting-crm. Референс — кейс Yandex Telemost Agent.",
        "Инновационный оффер: на старте Direct — малый тест; основной бюджет — документы/Bitrix/КП.",
      ],
      faq: [
        {
          q: "Это то же, что встроенное саммари ВКС?",
          a: "Нет. Саммари — вход. Мы делаем задачи, CRM и контроль сроков после встречи.",
        },
        {
          q: "Какая CRM?",
          a: "Bitrix24 и amoCRM. Другие — через REST.",
        },
        {
          q: "Цена и срок?",
          a: "Пилот от 300 000 ₽ за 2–4 недели на одной ВКС и одной CRM.",
        },
        {
          q: "Можно без автозаписи в сделку?",
          a: "Да. Критические поля — только после утверждения человеком.",
        },
      ],
    },
    en: {
      h1: "Meetings and calls → CRM tasks",
      subtitle:
        "Meeting decisions land in Bitrix24/amoCRM: tasks, deadlines, follow-up. Not another summary. Pilot from €3,000, 2–4 weeks.",
      problems: [
        "After the call decisions stay in chat or PDF — CRM is empty",
        "Owners and deadlines are not captured — follow-up slips",
        "VCS already summarizes but does not write the deal or create tasks",
        "Critical status changes get written without human review",
      ],
      deliverables: [
        "Transcript intake from Telemost / MTS Link / SaluteJazz / IVA360",
        "Decisions, owners and deadlines extraction",
        "Deal update + tasks + follow-up in CRM",
        "Human-in-the-loop before critical writes",
      ],
      intro: [
        "Summary is the input. The product is execution: tasks, CRM fields, deadline control.",
        "Commercial offer: /services/ai-meeting-crm. Reference: Yandex Telemost Agent.",
        "Innovative offer — small Direct test; main budget stays on docs/Bitrix/proposals.",
      ],
      faq: [
        {
          q: "Same as built-in VCS summary?",
          a: "No. Summary is input; we deliver tasks, CRM and deadline control.",
        },
        {
          q: "Which CRM?",
          a: "Bitrix24 and amoCRM; others via REST.",
        },
        {
          q: "Price and timeline?",
          a: "Pilot from €3,000 in 2–4 weeks on one VCS and one CRM.",
        },
        {
          q: "Can we require human approval?",
          a: "Yes — critical fields only after human confirm.",
        },
      ],
    },
  },
];
