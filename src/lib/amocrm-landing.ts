/**
 * Контент лендингов amoCRM: хаб /amocrm + отдельные услуги.
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

export const AMOCRM_MESSENGERS_KEYWORDS = [
  "интеграция amocrm с telegram",
  "интеграция amocrm с сайтом",
  "amocrm телефония",
  "amocrm max",
  "заявки с сайта в amocrm",
  "мессенджеры amocrm",
] as const;

export const AMOCRM_SALES_KEYWORDS = [
  "автоматизация воронки amocrm",
  "digital pipeline amocrm",
  "salesbot amocrm",
  "роботы amocrm",
  "распределение лидов amocrm",
  "автоматизация продаж amocrm",
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
    "Каналы связи — /amocrm/messengers. Digital Pipeline и Salesbot — /amocrm/sales.",
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
      a: "Эта страница — внедрение и настройка портала. Каналы Telegram / MAX / телефония / сайт — /amocrm/messengers.",
    },
    {
      q: "Нужна автоматизация воронки?",
      a: "Digital Pipeline, Salesbot и распределение лидов — /amocrm/sales.",
    },
    {
      q: "Срок и цена?",
      a: "От 150 000 ₽. Пилот обычно 2–4 недели; полный контур — по смете после аудита.",
    },
  ],
  related: [
    { href: "/amocrm/messengers", label: "Интеграция с мессенджерами и сайтом" },
    { href: "/amocrm/sales", label: "Автоматизация воронки продаж" },
    { href: "/integrations/amocrm", label: "Интеграция amoCRM (API)" },
    { href: "/pricing", label: "Стоимость" },
  ],
  caseStudySlugs: ["amocrm-website-integration", "lead-generation"],
};

export const AMOCRM_MESSENGERS_CONTENT: SeoServiceContent = {
  metaTitle: "Интеграция amoCRM с Telegram, MAX, телефонией и сайтом — от 150 000 ₽",
  metaDescription:
    "Все обращения → в amoCRM. Переписка, звонки, заявки с сайта и источники лидов сохраняются в карточке клиента. От 150 000 ₽.",
  eyebrow: "amoCRM · каналы",
  h1: "Интеграция amoCRM с Telegram, MAX, телефонией и сайтом",
  subtitle:
    "Все обращения → в amoCRM. Переписка, звонки, заявки с сайта и источники лидов сохраняются в карточке клиента.",
  problemsTitle: "Когда обращаются",
  problems: [
    "Заявки с сайта и лендингов лежат в почте — часть лидов теряется",
    "Переписка в Telegram / MAX вне карточки сделки",
    "Звонки не привязаны к контакту и воронке",
    "Нет единого источника и UTM в CRM",
  ],
  deliverablesTitle: "Что подключаем",
  deliverables: [
    "Формы сайта → лид или сделка в amoCRM",
    "Telegram / MAX в карточке клиента",
    "Телефония: звонки и записи в CRM",
    "Источник, UTM и ответственный в карточке",
  ],
  intro: [
    "Собираем входящие каналы в один контур amoCRM — без копипаста из чатов и почты.",
    "Внедрение портала — /amocrm. Автоматизация воронки — /amocrm/sales.",
    "Пилот обычно 2–4 недели на согласованных каналах. От 150 000 ₽.",
  ],
  howWeSolveTitle: "Как работаем",
  howWeSolve: [
    {
      title: "Карта каналов",
      text: "Фиксируем сайт, мессенджеры, телефонию и приоритет подключения.",
    },
    {
      title: "Связка с CRM",
      text: "Вебхуки, виджеты, телефония: обращения и UTM в карточке.",
    },
    {
      title: "Тест",
      text: "Прогоняем живые заявки, звонки и сообщения end-to-end.",
    },
  ],
  architectureTitle: "Контур",
  architecture: [
    "Сайт / формы → лид или сделка",
    "Telegram / MAX → диалог в карточке",
    "Телефония → звонок и запись у контакта",
    "Источник и UTM без ручного ввода",
  ],
  roiTitle: "Ориентир",
  roi: [
    { value: "от 150 000 ₽", label: "старт интеграции каналов" },
    { value: "2–4 нед.", label: "пилот 1–2 каналов" },
    { value: "1 карточка", label: "все обращения в одном месте" },
  ],
  faqTitle: "Частые вопросы",
  faq: [
    {
      q: "Какие каналы подключаете?",
      a: "Сайт (формы / вебхуки), Telegram, MAX, телефония — по доступу и приоритету. WhatsApp — при наличии канала.",
    },
    {
      q: "Срок и цена?",
      a: "От 150 000 ₽. Обычно 2–4 недели на 1–2 канала; пакет каналов — по смете.",
    },
    {
      q: "Нужна настройка воронки?",
      a: "Базовую связку делаем здесь. Полное внедрение — /amocrm; Digital Pipeline — /amocrm/sales.",
    },
  ],
  related: [
    { href: "/amocrm", label: "Внедрение и настройка amoCRM" },
    { href: "/amocrm/sales", label: "Автоматизация воронки продаж" },
    { href: "/integrations/telephony-ai", label: "Телефония и ИИ" },
    { href: "/pricing", label: "Стоимость" },
  ],
  caseStudySlugs: ["amocrm-website-integration", "lead-generation", "crm-telegram-sheets"],
};

export const AMOCRM_SALES_CONTENT: SeoServiceContent = {
  metaTitle: "Автоматизация воронки продаж в amoCRM — от 200 000 ₽",
  metaDescription:
    "Digital Pipeline, Salesbot, задачи, триггеры и распределение лидов. Меньше ручной работы и потерянных заявок. От 200 000 ₽.",
  eyebrow: "amoCRM · воронка",
  h1: "Автоматизация воронки продаж в amoCRM",
  subtitle:
    "Digital Pipeline, Salesbot, задачи, триггеры и распределение лидов. Меньше ручной работы и потерянных заявок.",
  problemsTitle: "Когда обращаются",
  problems: [
    "Лиды зависают на стадиях без задач и SLA",
    "Нет распределения входящих — менеджеры разбирают вручную",
    "Salesbot и Digital Pipeline настроены слабо или не используются",
    "Дожим и follow-up живут в головах и чатах",
  ],
  deliverablesTitle: "Что настраиваем",
  deliverables: [
    "Digital Pipeline под ваш регламент",
    "Salesbot / триггеры на ключевых этапах",
    "Задачи, SLA и эскалации",
    "Правила распределения лидов",
  ],
  intro: [
    "Настраиваем автоматизацию воронки так, чтобы заявки не терялись и менеджеры не копировали статусы вручную.",
    "Внедрение портала — /amocrm. Каналы связи — /amocrm/messengers.",
    "Пилот обычно 2–4 недели на одной воронке. От 200 000 ₽.",
  ],
  howWeSolveTitle: "Как работаем",
  howWeSolve: [
    {
      title: "Регламент",
      text: "Описываем стадии, SLA, эскалации и правила назначения.",
    },
    {
      title: "Автоматизация",
      text: "Digital Pipeline, Salesbot, задачи и триггеры на ключевых шагах.",
    },
    {
      title: "Контроль",
      text: "Проверяем на тестовых лидах и передаём инструкцию команде.",
    },
  ],
  architectureTitle: "Контур",
  architecture: [
    "Стадии воронки и обязательные поля",
    "Digital Pipeline / Salesbot",
    "Задачи и SLA на этапах",
    "Распределение и эскалации",
  ],
  roiTitle: "Ориентир",
  roi: [
    { value: "от 200 000 ₽", label: "старт автоматизации воронки" },
    { value: "2–4 нед.", label: "пилот одной воронки" },
    { value: "меньше потерь", label: "лиды не зависают без задач" },
  ],
  faqTitle: "Частые вопросы",
  faq: [
    {
      q: "Чем отличается от внедрения amoCRM?",
      a: "/amocrm — воронка, поля, роли. Эта страница — Digital Pipeline, Salesbot, задачи и распределение.",
    },
    {
      q: "Срок и цена?",
      a: "От 200 000 ₽. Типовой пилот 2–4 недели; сложные сценарии — по смете.",
    },
    {
      q: "Нужны мессенджеры?",
      a: "Сначала воронка и роботы. Подключение Telegram / MAX / сайта — /amocrm/messengers.",
    },
  ],
  related: [
    { href: "/amocrm", label: "Внедрение и настройка amoCRM" },
    { href: "/amocrm/messengers", label: "Мессенджеры, телефония и сайт" },
    { href: "/integrations/amocrm-automation", label: "Автоматизация amoCRM (расширенная)" },
    { href: "/pricing", label: "Стоимость" },
  ],
  caseStudySlugs: ["amocrm-website-integration", "kp-llm-automation"],
};
