import type { LandingSpec } from "@/lib/seo-catalog/types";

/**
 * YouGile — open corporate messenger (work chats, task chats, guest links).
 * Single commercial landing + Yandex Uslugi listing.
 */
export const CATALOG_LANDING_SPECS_YOUGILE: LandingSpec[] = [
  {
    category: "integrations",
    slug: "yougile",
    contentKey: "yougile_corp_messenger",
    cluster: "messenger",
    serviceSlug: "crm-integration",
    coverImage: "/stock/offers/land-integrations-yougile.png",
    keywords: [
      "yougile",
      "внедрение yougile",
      "корпоративный мессенджер yougile",
      "внедрение корпоративного мессенджера",
      "настройка yougile",
      "корпоративный чат yougile",
      "мессенджер для бизнеса yougile",
      "чаты задач yougile",
    ],
    caseStudySlugs: ["crm-telegram-sheets", "finance-ops-slack-airtable", "lead-generation"],
    related: [
      {
        href: "/integrations/amocrm-sensei",
        labelRu: "Sensei в amoCRM",
        labelEn: "Sensei in amoCRM",
      },
      {
        href: "/services/business-process-automation",
        labelRu: "Автоматизация процессов",
        labelEn: "Process automation",
      },
      {
        href: "/integrations/bitrix24",
        labelRu: "Битрикс24",
        labelEn: "Bitrix24",
      },
      { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
    ],
    ru: {
      h1: "Внедрение корпоративного мессенджера YouGile",
      subtitle:
        "Рабочие чаты, чаты задач, голос и файлы в одном контуре. Гостей зовёте по ссылке — без лицензий и без доступа к внутренней структуре. От 150 000 ₽.",
      problems: [
        "Переписка по проектам размазана по Telegram/WhatsApp — нет единой истории",
        "Подрядчиков нельзя пускать во внутренний портал, а в личных чатах теряются договорённости",
        "Чаты и задачи живут в разных местах — статус задачи не виден в переписке",
      ],
      deliverables: [
        "Пространство YouGile: отделы, каналы, роли, шаблоны чатов",
        "Чаты задач и правила приглашения гостей по ссылке",
        "Регламент использования + при необходимости связь с CRM/порталом",
      ],
      intro: [
        "YouGile — открытый корпоративный мессенджер: групповые и личные чаты, чаты задач, голос, файлы, реакции. Экспериментальная модель позволяет бесплатно звать людей в рабочие чаты по ссылке — без лицензий и без просмотра внутренней структуры компании.",
        "Мы не продаём лицензии вендора: настраиваем контур под ваши отделы, миграцию с хаоса личных мессенджеров и понятные правила «кто где пишет».",
      ],
      howWeSolve: [
        {
          title: "Карта каналов",
          text: "Отделы, проекты, поддержка, новости. Что групповое, что личное, что привязано к задаче.",
        },
        {
          title: "Гости и права",
          text: "Подрядчики и клиенты — по ссылке в нужный чат. Внутренние каналы остаются закрытыми.",
        },
        {
          title: "Приёмка",
          text: "Тестовые сценарии, краткий регламент, что менять без интегратора. Связка с CRM — по запросу.",
        },
      ],
      faq: [
        {
          q: "Чем YouGile отличается от Telegram для команды?",
          a: "Рабочие и задачные чаты в одном продукте, структура каналов под компанию, гости по ссылке без доступа ко всему порталу. Личный Telegram остаётся личным.",
        },
        {
          q: "Нужны ли лицензии на гостей?",
          a: "В экспериментальной модели YouGile людей можно приглашать в рабочие чаты по ссылке бесплатно — без лицензий и без доступа к внутренней структуре. Уточняем актуальные условия вендора на старте проекта.",
        },
        {
          q: "Срок и цена?",
          a: "Типовой контур — от 150 000 ₽, 1–3 недели. Крупная миграция с десятков чатов и интеграция с CRM — отдельная смета.",
        },
      ],
    },
    en: {
      h1: "YouGile corporate messenger implementation",
      subtitle:
        "Work chats, task chats, voice and files. Invite guests by link — no licenses and no access to internal structure. From 150,000 ₽.",
      problems: [
        "Project talk is scattered across Telegram/WhatsApp — no single history",
        "Contractors must not see the internal portal, but DMs lose decisions",
        "Chats and tasks live apart — task status is invisible in the thread",
      ],
      deliverables: [
        "YouGile workspace: teams, channels, roles, chat templates",
        "Task chats and guest-by-link rules",
        "Usage playbook + optional CRM/portal link",
      ],
      intro: [
        "YouGile is an open corporate messenger: group and personal chats, task chats, voice, files, reactions. Guests can join work chats by link without licenses or seeing the company tree.",
        "We configure the contour for your teams and migrate off personal-messenger chaos — we do not resell vendor seats.",
      ],
      howWeSolve: [
        {
          title: "Channel map",
          text: "Departments, projects, support, news. Group vs personal vs task-linked.",
        },
        {
          title: "Guests and roles",
          text: "Contractors join the right chat by link. Internal channels stay closed.",
        },
        {
          title: "Accept",
          text: "Test flows, short playbook, what you can change later. CRM link on request.",
        },
      ],
      faq: [
        {
          q: "Why not just Telegram?",
          a: "Work and task chats in one product, company channel structure, guests by link without full portal access.",
        },
        {
          q: "Guest licenses?",
          a: "YouGile’s experimental model lets you invite people to work chats by link without licenses or internal-structure access. We confirm current vendor terms at kickoff.",
        },
        {
          q: "Price?",
          a: "Typical contour from 150,000 ₽, 1–3 weeks. Large migration or CRM wiring is a separate estimate.",
        },
      ],
    },
  },
];
