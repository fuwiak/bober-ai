import ru from "./ru";
import { deepMerge, type DeepPartial } from "../lib/deep-merge";

/** KZ-first FAQ — prepended; RU FAQ kept (prices rewritten to ₸ where needed). */
const kzFaqLead = [
  {
    q: "Вы работаете с компаниями в Казахстане?",
    a: "Да. Работаем с Алматы, Астаной и удалённо по Казахстану. Русский — рабочий язык проекта. Доступны локальный хостинг, on-premise и трансграничный договор.",
  },
  {
    q: "Почему цены в тенге, а не в рублях?",
    a: "Это рыночная вилка для Казахстана: аудит от 1 млн ₸, пилот от 2,5 млн ₸, внедрение от 5 млн ₸. Финальная смета — после короткого созвона, в тенге.",
  },
  {
    q: "Какие системы интегрируете?",
    a: "Bitrix24, amoCRM, 1С, WhatsApp, Telegram и внутренние системы. Secure AI и закрытый контур — для чувствительных данных.",
  },
  {
    q: "Где хранятся данные?",
    a: "По выбору: облако партнёра, локальный хостинг в Казахстане или on-premise у заказчика. Контур и доступы фиксируем до обмена данными.",
  },
] as const;

/** Russian-language Kazakhstan market overlay (not Kazakh language). */
const kzOverrides = {
  meta: {
    title: "Автоматизация CRM, документов и продаж для компаний Казахстана — Bober AI",
    description:
      "AI-интегратор для бизнеса в Казахстане: Bitrix24, amoCRM, 1С, WhatsApp и Telegram. Пилот от 2,5 млн ₸ — облако или закрытый контур, контроль доступа, передача кода. Алматы и Астана.",
    keywords: [
      "автоматизация CRM Казахстан",
      "внедрение Bitrix24 Алматы",
      "amoCRM Астана",
      "интеграция 1С Казахстан",
      "AI для бизнеса Казахстан",
      "корпоративный AI-интегратор",
      "WhatsApp Telegram CRM",
      "Secure AI on-premise",
      "RAG поиск документов",
      "автоматизация продаж Казахстан",
    ],
  },
  locale: {
    switchTo: "Россия",
  },
  hero: {
    location: "Алматы · Астана · Казахстан",
    eyebrow: "AI-интегратор для бизнеса в Казахстане",
    titleLine1: "Автоматизация CRM, документов и продаж для компаний Казахстана",
    titleLine2: "",
    valueProposition:
      "Интегрируем Bitrix24, amoCRM, 1С, WhatsApp и внутренние системы.\n\nРазворачиваем AI в облаке или закрытом контуре — с контролем доступа и передачей кода.",
    differentiator:
      "Для компаний Алматы и Астаны: финансы, добыча, логистика, e-commerce, промышленность и госсектор.",
    specialization:
      "Ответим в течение 4 рабочих часов. После 30-минутного созвона — план и вилка бюджета в тенге за 24 часа.",
    title: "Автоматизация CRM, документов и продаж для компаний Казахстана",
    trustItems: [
      "12+ внедрений",
      "Договор, NDA, трансграничная сделка",
      "Bitrix24 / amoCRM / 1С",
    ],
    partnersLine:
      "Bitrix24 · amoCRM · 1С · локальный хостинг или on-premise · WhatsApp / Telegram",
  },
  nav: {
    footTagRu: "Cloud / on-prem / KZ",
  },
  packages: {
    title: "Услуги и цены",
    subtitle:
      "Приоритет рынка: Битрикс24, документы в 1С, интеграции, внедрение ИИ. Цены в тенге, фиксированная смета до старта.",
    items: [
      {
        name: "Внедрение и настройка Битрикс24 под ключ",
        price: "от 1 500 000 ₸",
        duration: "2–8 недель",
        forWhom: "Нужен рабочий портал, воронка и роботы — без хаоса в Excel",
        result: "Настройка CRM, роли, стадии. Связка с 1С/телефонией и ИИ для продаж — по смете.",
        badge: "Топ-спрос · партнёр 1С-Битрикс",
        includes: ["Внедрение и настройка Битрикс24", "Воронка, роли, роботы", "Опционально: 1С, телефония, AI"],
        featured: true,
        tier: "implementation",
        detailsHref: "/bitrix",
      },
      {
        name: "Распознавание первичных документов в 1С",
        price: "от 2 500 000 ₸",
        duration: "2–4 недели",
        forWhom: "Бухгалтерия и операции вводят счета и акты вручную",
        result: "Сканы/PDF → поля в 1С с проверкой. Пилот на одном типе документа.",
        badge: "Высокий спрос",
        includes: ["OCR и извлечение полей", "Маршрут проверки", "Выгрузка в 1С"],
        featured: true,
        tier: "implementation",
        detailsHref: "/automation/ocr-data-extraction",
      },
      {
        name: "Интеграция Битрикс24 с 1С, ЗУП и УНФ",
        price: "от 2 500 000 ₸",
        duration: "4–8 недель",
        forWhom: "Продажи в CRM, учёт в 1С — данные расходятся",
        result: "Двусторонний обмен: сделки, заказы, оплаты, номенклатура — без копипаста.",
        badge: "Высокая ценность",
        includes: ["Схема потоков данных", "Шлюз с retry и логами", "Маппинг полей"],
        featured: true,
        tier: "implementation",
        detailsHref: "/integrations/bitrix24-1c",
      },
      {
        name: "Внедрение ИИ в бизнес-процессы под ключ",
        price: "от 2 500 000 ₸",
        duration: "2–12 недель",
        forWhom: "Нужен не чат-бот, а production-сценарий с ROI",
        result: "Аудит → пилот → industrial запуск. Фиксированная смета, NDA, передача команде.",
        badge: "Под ключ",
        includes: ["Аудит и дорожная карта", "Пилот на реальных данных", "Production и обучение"],
        featured: true,
        tier: "implementation",
        detailsHref: "/ii-dlya-biznesa",
      },
      {
        name: "Речевая аналитика звонков для отдела продаж",
        price: "от 5 000 000 ₸",
        duration: "4–6 недель",
        forWhom: "Контроль качества — выборочная прослушка, а не система",
        result: "Транскрипты, скоринг, факты в CRM, отчёты по менеджерам.",
        badge: "Отдельный продукт",
        includes: ["STT и разбор разговоров", "Поля и задачи в CRM", "Дашборд качества"],
        featured: true,
        tier: "implementation",
        detailsHref: "/services/voice-ai",
      },
      {
        name: "ИИ для отдела продаж: звонки, CRM и контроль",
        price: "от 5 000 000 ₸",
        duration: "2–4 недели",
        forWhom: "Нужны анализ звонков, CRM и follow-up в одном цикле",
        result: "Контакт → анализ → CRM → задача → отчёт. Не отдельный бот.",
        badge: "Продажи",
        includes: ["Телефония + CRM + AI", "Автозаполнение карточек", "Follow-up и упущенные сделки"],
        featured: true,
        tier: "implementation",
        detailsHref: "/services/ai-sales-loop",
      },
      {
        name: "Аудит процессов",
        price: "от 1 000 000 ₸",
        duration: "1–2 недели",
        forWhom: "Процессы теряют деньги — нужна карта и приоритеты",
        result: "Карта процессов, точки потерь и приоритеты автоматизации",
        includes: ["Аудит процессов и данных", "Расчёт ROI по сценариям", "Рекомендации по технологиям"],
        tier: "audit",
        detailsHref: "/services/ai-discovery-roadmap",
      },
      {
        name: "Сметы и КП в CRM",
        price: "от 2 500 000 ₸",
        duration: "2–4 недели",
        forWhom: "Узкий сценарий: смета → КП → отправка клиенту",
        result: "Точечный тест автоматизации КП в Bitrix24 / amoCRM / Megaplan.",
        badge: "Нишевый тест",
        includes: ["Аудит и сборка контура КП", "PDF/лендинг и отправка", "Запись в сделку"],
        tier: "implementation",
        detailsHref: "/services/crm-quote-offers",
      },
      {
        name: "Сопровождение после запуска",
        price: "от 1 500 000 ₸/мес",
        duration: "постоянно",
        forWhom: "Нужен партнёр после production — не разовый проект",
        result: "Мониторинг, интеграции, качество AI, развитие сценариев.",
        includes: ["Мониторинг и SLA", "Поддержка интеграций", "Оптимизация затрат и сценариев"],
        tier: "support",
        detailsHref: "/services/business-process-automation",
      },
    ],
    auditNote:
      "Стоимость аудита засчитывается в бюджет проекта при продолжении. Локальный хостинг, on-premise и трансграничный договор — по запросу.",
  },
  pages: {
    pricing: {
      metaTitle: "Цены на AI и автоматизацию в Казахстане — Bober AI",
      metaDescription:
        "Аудит от 1 млн ₸, пилот от 2,5 млн ₸, внедрение от 5 млн ₸. Фиксированная смета в тенге для компаний Алматы и Астаны.",
      h1: "Цены для компаний Казахстана",
      subtitle:
        "Округлые цены в тенге — не перевод с рублей. Фиксированная смета до старта, NDA по запросу.",
    },
  },
  contact: {
    title: "Обсудим задачу для Казахстана",
    subtitle:
      "Алматы, Астана или удалённо. Ответим за 4 рабочих часа — план и вилка в тенге за 24 часа после созвона.",
  },
  cta: {
    title: "Запустим пилот под контур вашей компании в Казахстане",
    subtitle:
      "Bitrix24, amoCRM, 1С, WhatsApp, Telegram — облако или закрытый контур. Оценка в тенге за 24 часа.",
  },
  about: {
    tagline: "AI-интегратор для бизнеса в Казахстане",
    text: "Помогаем компаниям в Алматы и Астане автоматизировать CRM, документы и продажи: Bitrix24, amoCRM, 1С, WhatsApp, Telegram — в облаке или закрытом контуре.",
  },
};

function rewriteRubPrices(text: string): string {
  return text
    .replace(/от 150\s*000\s*₽/gi, "от 1 000 000 ₸")
    .replace(/от 300\s*000\s*₽/gi, "от 2 500 000 ₸")
    .replace(/от 500\s*000\s*₽/gi, "от 5 000 000 ₸")
    .replace(/от 200\s*000\s*₽\/мес/gi, "от 1 500 000 ₸/мес")
    .replace(/от 800\s*000\s*₽/gi, "от 8 000 000 ₸")
    .replace(/150\s*000\s*₽/gi, "1 000 000 ₸")
    .replace(/300\s*000\s*₽/gi, "2 500 000 ₸")
    .replace(/500\s*000\s*₽/gi, "5 000 000 ₸")
    .replace(/200\s*000\s*₽/gi, "1 500 000 ₸")
    .replace(/₽/g, "₸");
}

const merged = deepMerge(ru, kzOverrides as DeepPartial<typeof ru>);

const kz = {
  ...merged,
  faq: {
    ...merged.faq,
    items: [
      ...kzFaqLead,
      ...merged.faq.items.map((item) => ({
        q: item.q,
        a: rewriteRubPrices(item.a),
      })),
    ],
  },
};

export default kz;
