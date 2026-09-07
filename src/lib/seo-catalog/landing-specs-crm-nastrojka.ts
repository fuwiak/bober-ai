import type { LandingSpec, LocaleCopy } from "@/lib/seo-catalog/types";

const IMG = {
  crm: "/diagrams/crm-integration.svg",
  sales: "/diagrams/sales-pipeline.svg",
  workflow: "/diagrams/workflow-automation.svg",
  architecture: "/diagrams/system-architecture.svg",
} as const;

const RELATED = [
  { href: "/integrations/nastrojka-crm", labelRu: "Настройка CRM", labelEn: "CRM setup" },
  { href: "/integrations/nastrojka-crm-sistemy", labelRu: "Настройка CRM системы", labelEn: "CRM system setup" },
  { href: "/integrations/nastrojka-crm-pod-klyuch", labelRu: "Настройка CRM под ключ", labelEn: "Turnkey CRM setup" },
  { href: "/integrations/nastrojka-crm-dlya-biznesa", labelRu: "Настройка CRM для бизнеса", labelEn: "CRM for business" },
  { href: "/integrations/nastrojka-crm-otdel-prodazh", labelRu: "CRM для отдела продаж", labelEn: "CRM for sales" },
  { href: "/integrations/nastrojka-crm-s-nulya", labelRu: "Настройка CRM с нуля", labelEn: "CRM from scratch" },
  { href: "/integrations/nastrojka-crm-voronka", labelRu: "Настройка воронки CRM", labelEn: "CRM pipeline setup" },
  { href: "/integrations/nastrojka-crm-malyj-biznes", labelRu: "CRM для малого бизнеса", labelEn: "CRM for SMBs" },
  { href: "/integrations/nastrojka-crm-polya", labelRu: "Карточки и поля CRM", labelEn: "CRM fields" },
  { href: "/integrations/nastrojka-crm-pod-process", labelRu: "CRM под ваш процесс", labelEn: "CRM to your process" },
  { href: "/integrations/nastrojka-crm-kompleksnaya", labelRu: "Комплексная настройка CRM", labelEn: "Full CRM setup" },
  { href: "/integrations/crm-setup", labelRu: "YClients + склад", labelEn: "YClients + warehouse" },
  { href: "/pricing", labelRu: "Стоимость", labelEn: "Pricing" },
] as const;

function related(slug: string) {
  const path = `/integrations/${slug}`;
  return RELATED.filter((item) => item.href !== path).map((item) => ({ ...item }));
}

type Page = {
  slug: string;
  contentKey: string;
  coverImage: string;
  keywords: string[];
  ru: LocaleCopy;
  en: LocaleCopy;
};

function page(def: Page): LandingSpec {
  return {
    category: "integrations",
    slug: def.slug,
    contentKey: def.contentKey,
    cluster: "crm",
    serviceSlug: "crm-integration",
    coverImage: def.coverImage,
    keywords: def.keywords,
    caseStudySlugs: ["amocrm-website-integration", "bitrix24-kwork-crm", "lead-generation"],
    related: related(def.slug),
    ru: def.ru,
    en: def.en,
  };
}

/** Wordstat «настройка CRM»: exact title + 10 variants. Unique 200 URLs (not /integrations/crm-setup). */
export const CATALOG_LANDING_SPECS_CRM_NASTROJKA: LandingSpec[] = [
  page({
    slug: "nastrojka-crm",
    contentKey: "crm_nastrojka",
    coverImage: IMG.crm,
    keywords: ["настройка crm", "настройка срм", "настроить crm", "настройка crm цена", "заказать настройку crm"],
    ru: {
      h1: "Настройка CRM",
      subtitle:
        "Настроим CRM: воронка, поля, права, заявки с сайта и регламент для менеджеров. Битрикс24, amoCRM или другая система. От 150 000 ₽, 2–4 недели.",
      problems: [
        "CRM куплена, но менеджеры всё ещё ведут сделки в Excel",
        "Заявки с сайта не становятся сделками",
        "Нет прав, обязательных полей и понятных стадий",
      ],
      deliverables: [
        "Воронка, поля, роли и источники заявок",
        "Регламент: кто двигает сделку и когда",
        "Обучение команды и приёмка",
      ],
      intro: [
        "Настройка CRM — не лицензия и не «курс». Портал под ваш процесс: стадии, карточки, заявки, права.",
        "Узкие сценарии: система, под ключ, отдел продаж, воронка, поля — отдельные страницы ниже.",
      ],
      howWeSolve: [
        { title: "Аудит", text: "Как сейчас продаёте. Какая CRM уже куплена. Где рвётся заявка." },
        { title: "Настройка", text: "Воронка, поля, права, источники. Без лишних модулей." },
        { title: "Запуск", text: "Прогон сделок с командой, регламент, приёмка." },
      ],
      faq: [
        { q: "Какие CRM настраиваете?", a: "Битрикс24, amoCRM, RetailCRM и другие, если API позволяет. Мультисистемный контур с записью и складом — /integrations/crm-setup." },
        { q: "Срок и цена?", a: "Базовая настройка — от 150 000 ₽, 2–4 недели. Под ключ с интеграциями — от 300 000 ₽." },
      ],
    },
    en: {
      h1: "CRM setup",
      subtitle: "Pipeline, fields, roles, website leads and a playbook. Bitrix24, amoCRM or another CRM. From a mid-market package.",
      problems: [
        "CRM is paid for, deals still live in spreadsheets",
        "Website leads never become deals",
        "No roles, required fields or clear stages",
      ],
      deliverables: ["Pipeline, fields, roles and lead sources", "Playbook: who moves the deal", "Training and acceptance"],
      intro: ["CRM setup is not a license. The portal matches your process.", "Narrow scenarios have their own pages."],
      howWeSolve: [
        { title: "Audit", text: "How you sell today. Which CRM you already pay for." },
        { title: "Setup", text: "Pipeline, fields, roles, sources — no extra modules." },
        { title: "Launch", text: "Walkthrough, playbook, acceptance." },
      ],
      faq: [
        { q: "Which CRMs?", a: "Bitrix24, amoCRM, RetailCRM and others with an API." },
        { q: "Price?", a: "Basic setup is a smaller package; turnkey with integrations is larger." },
      ],
    },
  }),
  page({
    slug: "nastrojka-crm-sistemy",
    contentKey: "crm_nastrojka_sistemy",
    coverImage: IMG.architecture,
    keywords: ["настройка crm системы", "настройка системы crm", "настроить crm систему"],
    ru: {
      h1: "Настройка CRM системы",
      subtitle: "Карточки, стадии, справочники, роли. Система готова к ежедневной работе отдела продаж. От 150 000 ₽.",
      problems: ["Коробка CRM пустая: нет справочников и типов сделок", "Роли не разведены — все видят всё", "Карточка не совпадает с тем, как продаёте"],
      deliverables: ["Справочники, типы сделок, карточки", "Роли и права", "Проверка на живых сделках"],
      intro: ["Настройка CRM-системы — каркас: справочники и роли, чтобы менеджер не придумывал поля на ходу.", "Воронка отдельно — /integrations/nastrojka-crm-voronka."],
      howWeSolve: [
        { title: "Каркас", text: "Справочники, типы, обязательные поля." },
        { title: "Права", text: "РОП, менеджер, маркетинг — разные экраны." },
        { title: "Проверка", text: "Две-три живые сделки от заявки до закрытия." },
      ],
      faq: [
        { q: "Это внедрение «под ключ»?", a: "Нет. Здесь — каркас системы. Полный контур — /integrations/nastrojka-crm-pod-klyuch." },
        { q: "Срок?", a: "2–4 недели. От 150 000 ₽." },
      ],
    },
    en: {
      h1: "CRM system setup",
      subtitle: "Cards, stages, dictionaries, roles. Ready for daily sales work.",
      problems: ["Empty CRM box", "Everyone sees everything", "The card does not match how you sell"],
      deliverables: ["Dictionaries, deal types, cards", "Roles", "Live-deal check"],
      intro: ["System setup is the skeleton. Pipeline is a separate page."],
      howWeSolve: [
        { title: "Skeleton", text: "Dictionaries and required fields." },
        { title: "Access", text: "Head of sales vs manager vs marketing." },
        { title: "Check", text: "Two or three live deals." },
      ],
      faq: [
        { q: "Is this turnkey?", a: "No — skeleton only. Turnkey is a separate page." },
        { q: "Timeline?", a: "2–4 weeks." },
      ],
    },
  }),
  page({
    slug: "nastrojka-crm-pod-klyuch",
    contentKey: "crm_nastrojka_pod_klyuch",
    coverImage: IMG.workflow,
    keywords: ["настройка crm под ключ", "настройка срм под ключ", "crm под ключ настройка"],
    ru: {
      h1: "Настройка CRM под ключ",
      subtitle: "Аудит процесса, воронка, интеграции, обучение и приёмка. Фиксированная смета до старта. От 300 000 ₽.",
      problems: ["Нужен не «настроить поля», а рабочий контур", "Сайт, телефония и CRM живут отдельно", "После интегратора никто не умеет пользоваться порталом"],
      deliverables: ["Аудит и карта процесса", "Воронка, интеграции, обучение", "Акт приёмки и регламент"],
      intro: ["Под ключ — от аудита до приёмки: не оставляем «настройте сами роботов».", "Базовая настройка без интеграций — /integrations/nastrojka-crm."],
      howWeSolve: [
        { title: "Аудит", text: "Процесс, системы, узкое место, смета." },
        { title: "Контур", text: "Воронка, заявки, 1–2 интеграции, права." },
        { title: "Передача", text: "Обучение, регламент, приёмка." },
      ],
      faq: [
        { q: "Что входит в интеграции?", a: "Обычно сайт и одна телефония или мессенджер. 1С и склад — отдельным этапом." },
        { q: "Срок?", a: "3–6 недель. От 300 000 ₽." },
      ],
    },
    en: {
      h1: "Turnkey CRM setup",
      subtitle: "Process audit, pipeline, integrations, training and acceptance. Fixed estimate.",
      problems: ["Need a working contour, not just fields", "Site, telephony and CRM are silos", "Nobody can use the portal after the last vendor"],
      deliverables: ["Audit and process map", "Pipeline, integrations, training", "Acceptance and playbook"],
      intro: ["Turnkey means audit to acceptance. Basic setup is a smaller page."],
      howWeSolve: [
        { title: "Audit", text: "Process, systems, bottleneck, estimate." },
        { title: "Contour", text: "Pipeline, leads, 1–2 integrations." },
        { title: "Handover", text: "Training, playbook, acceptance." },
      ],
      faq: [
        { q: "Which integrations?", a: "Usually the site plus one telephony or messenger." },
        { q: "Timeline?", a: "3–6 weeks." },
      ],
    },
  }),
  page({
    slug: "nastrojka-crm-dlya-biznesa",
    contentKey: "crm_nastrojka_biznes",
    coverImage: IMG.sales,
    keywords: ["настройка crm для бизнеса", "настройка срм для бизнеса", "crm для бизнеса настройка"],
    ru: {
      h1: "Настройка CRM для бизнеса",
      subtitle: "Продажи, сервис и учёт заявок в одной системе. Без лишних модулей. От 200 000 ₽.",
      problems: ["Продажи в CRM, сервис — в чатах", "Заявки теряются между отделами", "Руководитель не видит загрузку"],
      deliverables: ["Одна воронка продаж и сервиса", "Маршруты между отделами", "Простые отчёты для собственника"],
      intro: ["CRM для бизнеса — общий контур продаж и сервиса, не отдельный портал «для галочки».", "Малый бизнес без тяжёлого портала — /integrations/nastrojka-crm-malyj-biznes."],
      howWeSolve: [
        { title: "Границы", text: "Что в CRM, что остаётся в почте и мессенджерах." },
        { title: "Маршруты", text: "Продажи ↔ сервис, кто эскалирует." },
        { title: "Отчёты", text: "3–5 цифр для собственника, не 40 дашбордов." },
      ],
      faq: [
        { q: "Подойдёт ИП / ООО?", a: "Да. Масштаб задаёт число воронок и ролей, не форма собственности." },
        { q: "Срок?", a: "2–4 недели. От 200 000 ₽." },
      ],
    },
    en: {
      h1: "CRM setup for business",
      subtitle: "Sales, service and lead intake in one system. No extra modules.",
      problems: ["Sales in CRM, service in chats", "Leads lost between teams", "The owner cannot see load"],
      deliverables: ["One sales + service pipeline", "Routes between teams", "Simple owner reports"],
      intro: ["Business CRM is a shared contour. SMB-only is a separate page."],
      howWeSolve: [
        { title: "Scope", text: "What lives in CRM vs mail." },
        { title: "Routes", text: "Sales ↔ service." },
        { title: "Reports", text: "3–5 numbers for the owner." },
      ],
      faq: [
        { q: "Sole trader?", a: "Yes. Scale is funnels and roles, not legal form." },
        { q: "Timeline?", a: "2–4 weeks." },
      ],
    },
  }),
  page({
    slug: "nastrojka-crm-otdel-prodazh",
    contentKey: "crm_nastrojka_sales",
    coverImage: IMG.sales,
    keywords: ["настройка crm для отдела продаж", "настройка срм отдел продаж", "crm отдел продаж настройка"],
    ru: {
      h1: "Настройка CRM для отдела продаж",
      subtitle: "Стадии сделки, обязательные поля, задачи, контроль менеджеров. Заявки не теряются. От 180 000 ₽.",
      problems: ["Менеджер двигает сделку как хочет — нет SLA", "РОП не видит, кто завис", "Заявки распределяются вручную"],
      deliverables: ["Стадии и обязательные поля под скрипт продаж", "Распределение заявок и задачи", "Контроль: зависания, активность, причины отказа"],
      intro: ["CRM для отдела продаж — дисциплина воронки, не «красивый портал».", "Только воронка без контроля — /integrations/nastrojka-crm-voronka."],
      howWeSolve: [
        { title: "Скрипт", text: "Стадии = шаги продажи, не абстрактные «в работе»." },
        { title: "Дисциплина", text: "Обязательные поля, задачи, эскалация." },
        { title: "РОП", text: "Отчёт: зависания и нагрузка по менеджерам." },
      ],
      faq: [
        { q: "Сколько менеджеров минимум?", a: "От двух. На одного человека часто хватает более короткого пакета полей." },
        { q: "Срок?", a: "2–4 недели. От 180 000 ₽." },
      ],
    },
    en: {
      h1: "CRM setup for the sales team",
      subtitle: "Deal stages, required fields, tasks, manager control. Leads do not disappear.",
      problems: ["Each manager moves deals their own way", "The head of sales cannot see stalls", "Leads are assigned by hand"],
      deliverables: ["Stages and fields matching the sales script", "Lead routing and tasks", "Stall and activity control"],
      intro: ["Sales CRM is pipeline discipline. Pipeline-only is a separate page."],
      howWeSolve: [
        { title: "Script", text: "Stages = sales steps." },
        { title: "Discipline", text: "Required fields, tasks, escalation." },
        { title: "Head of sales", text: "Stall and load report." },
      ],
      faq: [
        { q: "Minimum team size?", a: "Two managers. A solo seller often needs a smaller fields package." },
        { q: "Timeline?", a: "2–4 weeks." },
      ],
    },
  }),
  page({
    slug: "nastrojka-crm-s-nulya",
    contentKey: "crm_nastrojka_scratch",
    coverImage: IMG.architecture,
    keywords: ["настройка crm с нуля", "настроить crm с нуля", "внедрение crm с нуля настройка"],
    ru: {
      h1: "Настройка CRM с нуля",
      subtitle: "Выбираем систему, собираем воронку, поля, права и источники заявок. Портал сразу рабочий. От 200 000 ₽.",
      problems: ["CRM ещё нет — только таблицы и мессенджеры", "Неясно, Битрикс24 или amoCRM", "Боитесь купить коробку и год её «внедрять»"],
      deliverables: ["Рекомендация системы под процесс", "Рабочий портал: воронка, поля, заявки", "Регламент на первую неделю"],
      intro: ["С нуля — не миграция из другой CRM. Сначала рабочий минимум, потом интеграции.", "Миграция данных — отдельный объём."],
      howWeSolve: [
        { title: "Выбор", text: "Битрикс24, amoCRM или другая — по процессу, не по рекламе." },
        { title: "Минимум", text: "Воронка, поля, один источник заявок." },
        { title: "Неделя 1", text: "Регламент: как заводить сделку каждый день." },
      ],
      faq: [
        { q: "Лицензию покупаете вы?", a: "Нет. Лицензия — на клиенте. Мы настраиваем купленный портал." },
        { q: "Срок?", a: "2–4 недели. От 200 000 ₽." },
      ],
    },
    en: {
      h1: "CRM setup from scratch",
      subtitle: "Pick the system, build pipeline, fields, roles and lead sources. The portal works on day one.",
      problems: ["No CRM yet — only sheets and chats", "Bitrix24 vs amoCRM is unclear", "Fear of buying a box and implementing for a year"],
      deliverables: ["System recommendation", "Working portal: pipeline, fields, leads", "Week-one playbook"],
      intro: ["From scratch is not a migration. Working minimum first, then integrations."],
      howWeSolve: [
        { title: "Choice", text: "Bitrix24, amoCRM or other — by process." },
        { title: "Minimum", text: "Pipeline, fields, one lead source." },
        { title: "Week 1", text: "How to log a deal every day." },
      ],
      faq: [
        { q: "Do you buy the licence?", a: "No. You buy. We configure." },
        { q: "Timeline?", a: "2–4 weeks." },
      ],
    },
  }),
  page({
    slug: "nastrojka-crm-voronka",
    contentKey: "crm_nastrojka_voronka",
    coverImage: IMG.sales,
    keywords: ["настройка воронки crm", "настройка воронки в crm", "воронка продаж crm настройка"],
    ru: {
      h1: "Настройка воронки CRM",
      subtitle: "Стадии, причины отказа, SLA, кто двигает сделку. Видно, где зависают продажи. От 150 000 ₽.",
      problems: ["Стадии «новые / в работе / готово» — нельзя считать конверсию", "Нет причин отказа", "Сделка висит месяцами без задачи"],
      deliverables: ["Карта стадий под ваш цикл сделки", "Причины отказа и обязательные поля на переходах", "SLA и задача, если стадия просрочена"],
      intro: ["Воронка CRM — измеримый цикл сделки, не десять статусов «для красоты».", "Контроль менеджеров целиком — /integrations/nastrojka-crm-otdel-prodazh."],
      howWeSolve: [
        { title: "Цикл", text: "Сколько касаний до оплаты. Какие стадии реально нужны." },
        { title: "Переходы", text: "Что обязательно заполнить, чтобы двинуть сделку." },
        { title: "Зависания", text: "Задача или эскалация, если SLA пробит." },
      ],
      faq: [
        { q: "Сколько стадий нормально?", a: "Обычно 5–8. Больше — теряется смысл отчёта." },
        { q: "Срок?", a: "2–3 недели. От 150 000 ₽." },
      ],
    },
    en: {
      h1: "CRM pipeline setup",
      subtitle: "Stages, lost reasons, SLA, who moves the deal. You see where sales stall.",
      problems: ["New / in progress / done — no conversion", "No lost reasons", "Deals hang for months"],
      deliverables: ["Stage map for your cycle", "Lost reasons and required fields", "SLA and overdue tasks"],
      intro: ["A pipeline is a measurable cycle. Full sales-team control is a separate page."],
      howWeSolve: [
        { title: "Cycle", text: "Touches until payment. Stages you actually need." },
        { title: "Transitions", text: "What must be filled to move the deal." },
        { title: "Stalls", text: "Task or escalation on SLA breach." },
      ],
      faq: [
        { q: "How many stages?", a: "Usually 5–8." },
        { q: "Timeline?", a: "2–3 weeks." },
      ],
    },
  }),
  page({
    slug: "nastrojka-crm-malyj-biznes",
    contentKey: "crm_nastrojka_smb",
    coverImage: IMG.crm,
    keywords: ["настройка crm для малого бизнеса", "crm для малого бизнеса настройка", "настройка срм ип"],
    ru: {
      h1: "Настройка CRM для малого бизнеса",
      subtitle: "Простая воронка, заявки с сайта и мессенджеров, напоминания. Без тяжёлого портала. От 150 000 ₽.",
      problems: ["Команда 2–10 человек, корпоративный портал избыточен", "Заявки в WhatsApp теряются", "Нет времени «внедрять полгода»"],
      deliverables: ["Короткая воронка и карточка", "Один-два источника заявок", "Напоминания и простой отчёт"],
      intro: ["Малый бизнес — рабочий минимум за 2–4 недели, не Bitrix «на 200 сотрудников».", "Рост и сервис+продажи — /integrations/nastrojka-crm-dlya-biznesa."],
      howWeSolve: [
        { title: "Минимум", text: "5 стадий, 8 полей, один отчёт." },
        { title: "Вход", text: "Сайт или WhatsApp / Telegram → сделка." },
        { title: "Привычка", text: "Регламент на одну страницу." },
      ],
      faq: [
        { q: "ИП без отдела продаж?", a: "Да. Часто хватает одной воронки и напоминаний." },
        { q: "Срок?", a: "2–4 недели. От 150 000 ₽." },
      ],
    },
    en: {
      h1: "CRM setup for small business",
      subtitle: "Short pipeline, website and messenger leads, reminders. No heavy portal.",
      problems: ["Team of 2–10, enterprise portal is too much", "WhatsApp leads disappear", "No time for a six-month rollout"],
      deliverables: ["Short pipeline and card", "One or two lead sources", "Reminders and a simple report"],
      intro: ["SMB is a working minimum in 2–4 weeks."],
      howWeSolve: [
        { title: "Minimum", text: "5 stages, 8 fields, one report." },
        { title: "Intake", text: "Site or messenger → deal." },
        { title: "Habit", text: "One-page playbook." },
      ],
      faq: [
        { q: "Solo founder?", a: "Yes. One pipeline and reminders often enough." },
        { q: "Timeline?", a: "2–4 weeks." },
      ],
    },
  }),
  page({
    slug: "nastrojka-crm-polya",
    contentKey: "crm_nastrojka_polya",
    coverImage: IMG.crm,
    keywords: ["настройка полей crm", "настройка карточек crm", "обязательные поля crm"],
    ru: {
      h1: "Настройка карточек и полей CRM",
      subtitle: "Обязательные поля, справочники, типы сделок. Менеджер заполняет карточку за минуту. От 150 000 ₽.",
      problems: ["В карточке 80 полей — никто не заполняет", "Нет обязательных полей на стадии", "Справочники разъехались, отчёты врут"],
      deliverables: ["Карточка под скрипт: 10–20 рабочих полей", "Обязательность на переходах стадий", "Справочники без мусора"],
      intro: ["Поля CRM — чтобы отчёт был правдой, а не чтобы «всё учесть».", "Воронка целиком — /integrations/nastrojka-crm-voronka."],
      howWeSolve: [
        { title: "Инвентарь", text: "Какие поля реально читают РОП и маркетинг." },
        { title: "Карточка", text: "Убрать мёртвые, добавить обязательные." },
        { title: "Справочники", text: "Один список источников, один — причин отказа." },
      ],
      faq: [
        { q: "Можно без смены воронки?", a: "Да. Часто начинают с полей, воронку трогают следующим этапом." },
        { q: "Срок?", a: "1–3 недели. От 150 000 ₽." },
      ],
    },
    en: {
      h1: "CRM cards and fields setup",
      subtitle: "Required fields, dictionaries, deal types. The manager fills the card in a minute.",
      problems: ["80 fields, nobody fills them", "Nothing required on stage change", "Dictionaries drift, reports lie"],
      deliverables: ["Card with 10–20 working fields", "Required fields on transitions", "Clean dictionaries"],
      intro: ["Fields exist so reports are true. Full pipeline is a separate page."],
      howWeSolve: [
        { title: "Inventory", text: "Which fields the head of sales actually reads." },
        { title: "Card", text: "Drop dead fields, add required ones." },
        { title: "Dictionaries", text: "One source list, one lost-reason list." },
      ],
      faq: [
        { q: "Without changing the pipeline?", a: "Yes. Fields first is common." },
        { q: "Timeline?", a: "1–3 weeks." },
      ],
    },
  }),
  page({
    slug: "nastrojka-crm-pod-process",
    contentKey: "crm_nastrojka_process",
    coverImage: IMG.workflow,
    keywords: ["настройка crm под процесс", "настройка crm под бизнес процесс", "кастомная настройка crm"],
    ru: {
      h1: "Настройка CRM под ваш процесс",
      subtitle: "Не шаблон вендора: стадии, роли, документы, связка с сайтом и учётом. От 250 000 ₽.",
      problems: ["Типовая воронка «лид → квалификация → оплата» вам не подходит", "Документы и расчёты живут вне CRM", "Интегратор оставил коробку as is"],
      deliverables: ["Карта вашего процесса → стадии и роли", "Документы и поля под расчёт", "Связка с сайтом или учётом — по контуру"],
      intro: ["Под процесс — когда шаблон CRM ломает то, как вы уже продаёте.", "Типовая настройка — /integrations/nastrojka-crm."],
      howWeSolve: [
        { title: "Как есть", text: "Рисуем ваш цикл, не цикл вендора." },
        { title: "Как будет", text: "Стадии, поля, кто имеет право двигать." },
        { title: "Стыки", text: "Сайт, 1С, склад — только нужные." },
      ],
      faq: [
        { q: "Это разработка с нуля?", a: "Нет. Настройка и доработка коробки. Кастом CRM/ERP — /solutions/crm-erp-development." },
        { q: "Срок?", a: "3–6 недель. От 250 000 ₽." },
      ],
    },
    en: {
      h1: "CRM setup to your process",
      subtitle: "Not the vendor template: stages, roles, documents, site and ledger links.",
      problems: ["Lead → qualify → paid does not match you", "Docs and calculations live outside CRM", "The last vendor left the box as-is"],
      deliverables: ["Your process → stages and roles", "Fields for calculations", "Site or ledger link if needed"],
      intro: ["Process-fit when the CRM template breaks how you already sell."],
      howWeSolve: [
        { title: "As-is", text: "Your cycle, not the vendor cycle." },
        { title: "To-be", text: "Stages, fields, who may move the deal." },
        { title: "Joints", text: "Site, 1C, warehouse — only what you need." },
      ],
      faq: [
        { q: "Custom CRM from scratch?", a: "No. Configure the box. Custom CRM/ERP is a different page." },
        { q: "Timeline?", a: "3–6 weeks." },
      ],
    },
  }),
  page({
    slug: "nastrojka-crm-kompleksnaya",
    contentKey: "crm_nastrojka_kompleks",
    coverImage: IMG.workflow,
    keywords: ["комплексная настройка crm", "комплексная настройка срм", "полная настройка crm"],
    ru: {
      h1: "Комплексная настройка CRM",
      subtitle: "Воронка, поля, роботы, источники заявок, базовые интеграции и обучение. Один контур. От 300 000 ₽.",
      problems: ["Нужно сразу всё: воронка, поля, заявки, роботы", "Несколько точечных настроек уже делали — контур всё равно дырявый", "Хотите один подрядчик и одну приёмку"],
      deliverables: ["Воронка + поля + права", "Источники заявок и базовые роботы", "1–2 интеграции, обучение, приёмка"],
      intro: ["Комплекс — пакет «под ключ» с роботами и источниками, не набор разрозненных часов.", "Только поля — /integrations/nastrojka-crm-polya. Только воронка — /integrations/nastrojka-crm-voronka."],
      howWeSolve: [
        { title: "Состав", text: "Фиксируем пакет до старта: что входит, что следующим этапом." },
        { title: "Сборка", text: "Воронка, поля, заявки, роботы, 1–2 интеграции." },
        { title: "Приёмка", text: "Сценарии с командой, регламент, акт." },
      ],
      faq: [
        { q: "Чем отличается от «под ключ»?", a: "Тем же классом бюджета. «Под ключ» акцентирует приёмку и обучение; «комплексная» — состав: воронка + роботы + источники." },
        { q: "Срок?", a: "3–6 недель. От 300 000 ₽." },
      ],
    },
    en: {
      h1: "Full CRM setup",
      subtitle: "Pipeline, fields, robots, lead sources, basic integrations and training. One contour.",
      problems: ["Need pipeline, fields, leads and robots at once", "Several small setups still leak", "Want one vendor and one acceptance"],
      deliverables: ["Pipeline + fields + roles", "Lead sources and basic robots", "1–2 integrations, training, acceptance"],
      intro: ["Full setup is a fixed package, not scattered hours."],
      howWeSolve: [
        { title: "Scope", text: "Lock the package before kickoff." },
        { title: "Build", text: "Pipeline, fields, leads, robots, 1–2 integrations." },
        { title: "Accept", text: "Scenarios, playbook, sign-off." },
      ],
      faq: [
        { q: "Vs turnkey?", a: "Same budget class. Turnkey stresses handover; full setup stresses the bundle." },
        { q: "Timeline?", a: "3–6 weeks." },
      ],
    },
  }),
];
