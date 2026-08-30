/**
 * Контент хаба /amocrm (как /bitrix для Битрикс24).
 */
import type { SeoServiceContent } from "@/lib/seo-services-content";

export const AMOCRM_LANDING_KEYWORDS = [
  "внедрение amocrm",
  "настройка amocrm",
  "amocrm под ключ",
  "внедрение amoCRM",
  "настройка amoCRM",
  "интеграция amocrm",
] as const;

export const AMOCRM_SEO_CONTENT: SeoServiceContent = {
  metaTitle: "Внедрение и настройка amoCRM под ключ — от 150 000 ₽",
  metaDescription:
    "Аудит продаж, воронки, карточки, роли и автоматизация. Настраиваем amoCRM под реальные процессы отдела продаж. От 150 000 ₽.",
  eyebrow: "amoCRM",
  h1: "Внедрение и настройка amoCRM под ключ",
  subtitle:
    "Аудит продаж, воронки, карточки, роли и автоматизация. Настраиваем amoCRM под реальные процессы отдела продаж.",
  problemsTitle: "Когда обращаются",
  problems: [
    "amoCRM купили, но воронка и поля не отражают процесс продаж",
    "Менеджеры ведут сделки в чатах и Excel вне CRM",
    "Заявки с сайта и рекламы не попадают в карточки вовремя",
    "Нет ролей, обязательных полей и понятной автоматизации",
  ],
  deliverablesTitle: "Что внедряем",
  deliverables: [
    "Аудит процесса продаж и карта воронки",
    "Стадии, поля, права и роли менеджеров",
    "Роботы, задачи и базовые триггеры",
    "Регламент и приёмка на тестовых сделках",
  ],
  intro: [
    "Делаем amoCRM рабочим инструментом отдела продаж, а не «хранилищем карточек».",
    "Каналы связи — /integrations/amocrm-messengers. Digital Pipeline и Salesbot — /automation/amocrm-sales.",
    "Фиксированная смета до старта. Пилот обычно 2–4 недели.",
  ],
  howWeSolveTitle: "Как работаем",
  howWeSolve: [
    {
      title: "Аудит",
      text: "Разбираем текущую воронку, поля, роли и точки потери лидов.",
    },
    {
      title: "Настройка",
      text: "Собираем стадии, карточки, права и базовую автоматизацию под регламент.",
    },
    {
      title: "Приёмка",
      text: "Прогоняем тестовые сделки, передаём инструкцию и план на 90 дней.",
    },
  ],
  architectureTitle: "Контур",
  architecture: [
    "Воронка и стадии под реальный процесс",
    "Карточки: обязательные поля, источники, UTM",
    "Роли и права менеджеров",
    "Роботы / задачи на ключевых этапах",
  ],
  roiTitle: "Ориентир",
  roi: [
    { value: "от 150 000 ₽", label: "старт настройки / внедрения" },
    { value: "2–4 нед.", label: "типовой пилот" },
    { value: "1 контур", label: "воронка + роли + автоматизация" },
  ],
  faqTitle: "Частые вопросы",
  faq: [
    {
      q: "Чем отличается от интеграции с мессенджерами?",
      a: "Эта страница — внедрение и настройка портала. Каналы Telegram / MAX / телефония / сайт — /integrations/amocrm-messengers.",
    },
    {
      q: "Нужна автоматизация воронки?",
      a: "Digital Pipeline, Salesbot и распределение лидов — /automation/amocrm-sales.",
    },
    {
      q: "Срок и цена?",
      a: "От 150 000 ₽. Пилот обычно 2–4 недели; полный контур — по смете после аудита.",
    },
  ],
  related: [
    { href: "/integrations/amocrm-messengers", label: "Интеграция с мессенджерами и сайтом" },
    { href: "/automation/amocrm-sales", label: "Автоматизация воронки продаж" },
    { href: "/integrations/amocrm", label: "Интеграция amoCRM (API)" },
    { href: "/pricing", label: "Стоимость" },
  ],
  caseStudySlugs: ["amocrm-website-integration", "lead-generation"],
};
