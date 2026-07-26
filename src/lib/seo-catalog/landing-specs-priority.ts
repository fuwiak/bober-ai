/**
 * Priority commercial intent pack (problem + system + purchase intent).
 * Canonical paths stay under /integrations|/automation|/solutions|/ai|/services —
 * pretty aliases live in next.config redirects (/bitrix24/*, /cases/*, …).
 */
import type { LandingSpec } from "@/lib/seo-catalog/types";

export const CATALOG_LANDING_SPECS_PRIORITY: LandingSpec[] = [
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
        labelRu: "AI-консалтинг и дорожная карта",
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
        "Для коммерческих директоров и владельцев CRM: заявка → квалификация → задача → КП → follow-up внутри Bitrix24. От 500 000 ₽, пилот 2–4 недели.",
      problems: [
        "Лиды из сайта, почты и маркетплейсов не долетают в воронку или дублируются",
        "Менеджеры вручную собирают КП и забывают follow-up",
        "Роботы Bitrix24 покрывают только простые условия — сложные тексты и документы остаются ручными",
        "Руководитель не видит, где сделки зависают и сколько часов уходит на рутину",
      ],
      deliverables: [
        "Карта воронки и точек потерь в Bitrix24",
        "Автоприём заявок, дедупликация, назначение ответственного",
        "AI-шаги: квалификация, черновики писем и КП из карточки сделки",
        "Триггеры follow-up, дашборд конверсий, журнал ошибок",
      ],
      intro: [
        "Внедряем не «ИИ для Битрикс», а конкретный контур продаж: от входящей заявки до КП и напоминаний — с фиксированной сметой.",
        "Базовая настройка портала — на /integrations/bitrix24; AI-слой поверх роботов — здесь и на /integrations/bitrix24-ai.",
        "Типовой результат: меньше ручного копипаста, быстрее первый контакт, КП из каталога без выдуманных цен.",
      ],
      faq: [
        {
          q: "Чем это отличается от обычного внедрения Bitrix24?",
          a: "Внедрение портала — пользователи, права, воронки. Здесь — автоматизация продаж и AI-шаги: заявки, квалификация, КП, follow-up с измеримым ROI.",
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
      "интеграция bitrix24 с 1с",
      "интеграция битрикс24 и 1с",
      "синхронизация bitrix24 1с",
      "bitrix24 1с обмен",
      "сделки bitrix24 заказы 1с",
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
        labelRu: "AI-слой для Битрикс24",
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
      h1: "Интеграция Битрикс24 с 1С: сделки, заказы и оплаты без копипаста",
      subtitle:
        "Двусторонний обмен: выигранная сделка → заказ в 1С; оплата в 1С → этап в Bitrix24. От 500 000 ₽, типичный срок 4–8 недель.",
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
          a: "Оба варианта. Для 1С чаще on-prem или контур заказчика; уточняем на аудите.",
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
        labelRu: "AI для amoCRM",
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
      h1: "Автоматизация amoCRM: воронка, заявки и follow-up без ручного ввода",
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
        "Базовая интеграция портала — /integrations/amocrm; AI-слой — /integrations/amocrm-ai.",
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
          q: "Чем отличается от AI для amoCRM?",
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
];
