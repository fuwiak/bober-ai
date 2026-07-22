export type LandingExtendedContent = {
  intro: string[];
  howWeSolveTitle: string;
  howWeSolve: { title: string; text: string }[];
  roiTitle: string;
  roi: { value: string; label: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  caseStudy?: {
    title: string;
    problem: string;
    solution: string;
    result: string;
    href?: string;
  };
};

export type LandingExtendedLocale = "ru" | "en";

const EXTENDED_RU: Record<string, LandingExtendedContent> = {
  processes: {
    intro: [
      "Автоматизация бизнес-процессов начинается не с выбора платформы, а с карты того, как работа реально проходит через CRM, почту, мессенджеры и таблицы. Без этой карты любое внедрение превращается в «ещё один SaaS», которым команда обходит.",
      "Мы работаем как внешний отдел автоматизации: сначала аудит и ROI по сценариям, потом архитектура интеграций, затем production-запуск с передачей команде. AI подключаем только там, где он снимает ручной труд — не ради модного слова.",
      "Типичный проект: 4–12 недель, фиксированная смета, этапы с актами. Интеграции с amoCRM, Bitrix24, 1С, Telegram, документами и внутренними API.",
    ],
    howWeSolveTitle: "Как мы решаем задачу",
    howWeSolve: [
      { title: "Аудит процессов", text: "Интервью с владельцами процессов, карта потоков, точки потерь времени и денег. Считаем ROI по 2–3 сценариям автоматизации." },
      { title: "Архитектура и дорожная карта", text: "Выбираем стек: workflow, CRM, интеграции, AI-слой. Фиксируем объём, сроки и смету до старта разработки." },
      { title: "Внедрение и передача", text: "Разработка, тесты, production-деплой, документация и обучение вашей команды. Мониторинг и SLA по запросу." },
    ],
    roiTitle: "Типичный эффект",
    roi: [
      { value: "−40%", label: "ручных операций в целевом процессе" },
      { value: "2–4 нед.", label: "до первого production-релиза" },
      { value: "3–6 мес.", label: "окупаемость при среднем enterprise-проекте" },
    ],
    faqTitle: "Частые вопросы",
    faq: [
      { q: "С чего начать автоматизацию бизнес-процессов?", a: "С аудита одного процесса с максимальной болью: продажи, документы или согласования. Результат — карта, ROI и приоритеты, а не сразу разработка." },
      { q: "Нужен ли отдельный BPM-софт?", a: "Не всегда. Часто достаточно CRM + workflow + интеграции. BPM-платформу рекомендуем только при сложных маршрутах согласования и аудита." },
      { q: "Можно ли без AI?", a: "Да. Большинство проектов начинается с интеграций и workflow. AI добавляем, когда он даёт измеримый выигрыш — например, в документах или поддержке." },
      { q: "Какой бюджет?", a: "Аудит — от 150 000 ₽. Внедрение — от 400 000 ₽ в зависимости от числа интеграций и процессов." },
      { q: "Работаете удалённо?", a: "Да. Москва, Россия и СНГ. NDA, on-prem и 152-ФЗ — по запросу." },
    ],
    caseStudy: {
      title: "ELIA Suite — автоматизация КП",
      problem: "Подготовка коммерческих предложений занимала 45 минут на каждую сделку.",
      solution: "CRM + workflow согласования + генерация PDF/XLSX из шаблонов.",
      result: "2 минуты на КП, +32% конверсия quote→заказ, ROI за 4 месяца.",
      href: "/portfolio/elia-suite",
    },
  },
  crm: {
    intro: [
      "Внедрение CRM — это не установка лицензий. Это настройка воронки, автоматизация этапов, связка с документами, 1С и мессенджерами так, чтобы менеджеры работали в CRM, а не вокруг неё.",
      "Мы внедряем amoCRM и Bitrix24 под ваши процессы: от первичного аудита до production и обучения команды. Интеграции — двусторонние, с логированием и обработкой ошибок.",
      "Если CRM уже есть, но ею не пользуются — начинаем с диагностики: где менеджеры обходят систему и почему.",
    ],
    howWeSolveTitle: "Этапы внедрения CRM",
    howWeSolve: [
      { title: "Диагностика воронки", text: "Смотрим реальный путь сделки: от лида до оплаты. Фиксируем поля, этапы, отчёты и точки ручного ввода." },
      { title: "Настройка и интеграции", text: "Воронка, роботы, задачи, уведомления. Связка с сайтом, 1С, документами, Telegram." },
      { title: "Запуск и adoption", text: "Обучение, регламенты, дашборд для руководителя. Первые 2 недели — сопровождение после go-live." },
    ],
    roiTitle: "Что получает бизнес",
    roi: [
      { value: "100%", label: "лидов из сайта попадают в CRM" },
      { value: "−60%", label: "ручного ввода в воронке" },
      { value: "1 день", label: "видимость воронки для CEO" },
    ],
    faqTitle: "FAQ по CRM",
    faq: [
      { q: "amoCRM или Bitrix24 — что выбрать?", a: "amoCRM — проще для продаж и SMB. Bitrix24 — шире: задачи, портал, телефония. Рекомендуем после аудита процесса, не по бренду." },
      { q: "Сколько длится внедрение CRM?", a: "Базовая настройка — 2–3 недели. С интеграциями 1С и документами — 4–8 недель." },
      { q: "Можно ли мигрировать данные?", a: "Да. Переносим контакты, сделки и историю из Excel, старой CRM или 1С." },
      { q: "Нужен ли штатный администратор CRM?", a: "На старте — нет. Передаём документацию и обучаем ответственного сотрудника. SLA-сопровождение — опционально." },
    ],
    caseStudy: {
      title: "GTM Flow — лиды из рекламы",
      problem: "Заявки терялись между Google, VK, Telegram и Avito.",
      solution: "Единая лента лидов + AI-квалификация + автодожим.",
      result: "Меньше потерянных лидов, воронка на одном дашборде.",
      href: "/portfolio/lead-generation",
    },
  },
  documents: {
    intro: [
      "Автоматизация документооборота — это цепочка: приём документа → извлечение данных → согласование → архив в CRM/ERP. AI нужен не всегда: часто достаточно workflow и OCR.",
      "Типичные боли: договоры теряются между почтой и файловым хранилищем, согласование занимает дни, шаблоны разбросаны по папкам сотрудников.",
      "Мы проектируем маршруты согласования с уведомлениями, дедлайнами и аудитом. Документы привязываем к сделкам в CRM и заказам в 1С.",
    ],
    howWeSolveTitle: "Как автоматизируем документы",
    howWeSolve: [
      { title: "Карта документов", text: "Какие типы документов, кто согласует, где хранятся, какие поля нужны в CRM/1С." },
      { title: "Workflow и OCR", text: "Цепочки согласования, извлечение реквизитов из PDF/сканов, автозаполнение шаблонов." },
      { title: "Интеграции", text: "Связка с CRM, 1С, почтой, ЭДО. Версионирование и журнал действий." },
    ],
    roiTitle: "Эффект",
    roi: [
      { value: "−70%", label: "времени на согласование договора" },
      { value: "0", label: "потерянных документов между системами" },
      { value: "минуты", label: "вместо часов на обработку пакета сканов" },
    ],
    faqTitle: "Вопросы по документообороту",
    faq: [
      { q: "Нужен ли отдельный ЭДО?", a: "Зависит от требований. Часто начинаем с внутреннего workflow + интеграция с существующим ЭДО." },
      { q: "AI или OCR?", a: "OCR + правила — для структурированных документов. AI — для нестандартных текстов и классификации." },
      { q: "152-ФЗ и on-prem?", a: "Да, поддерживаем изолированное развёртывание и политики хранения ПДн." },
    ],
    caseStudy: {
      title: "OCR-пайплайн для бухгалтерии",
      problem: "Ручной ввод реквизитов из сканов счетов и актов.",
      solution: "OCR + извлечение полей + выгрузка в учётную систему.",
      result: "Пакетная обработка за минуты, меньше ошибок ввода.",
      href: "/portfolio/ocr-text-extraction",
    },
  },
  sales: {
    intro: [
      "Автоматизация продаж — это когда менеджер тратит время на звонки и переговоры, а не на сборку КП в Word. Данные берутся из CRM и каталога, документ генерируется за минуты.",
      "Типичная схема: лид → квалификация в CRM → автогенерация коммерческого предложения → отправка клиенту → follow-up по расписанию.",
      "Мы не заменяем CRM — мы делаем так, чтобы CRM стала центром продаж, а не ещё одной системой для отчётов.",
    ],
    howWeSolveTitle: "Как ускоряем продажи",
    howWeSolve: [
      { title: "Единый источник данных", text: "Цены, SKU, условия — только из каталога и CRM. Никакого копипаста из Excel." },
      { title: "Генерация КП", text: "Шаблоны DOCX/PDF, мультивалютность, НДС, скидки. PDF за 2 минуты вместо 45." },
      { title: "Follow-up", text: "Автонапоминания, задачи в CRM, уведомления в Telegram. Лиды не пропадают." },
    ],
    roiTitle: "Результаты клиентов",
    roi: [
      { value: "45→2 мин", label: "подготовка коммерческого предложения" },
      { value: "+32%", label: "конверсия quote→заказ (ELIA Suite)" },
      { value: "−50%", label: "времени менеджера на рутину" },
    ],
    faqTitle: "FAQ по автоматизации продаж",
    faq: [
      { q: "Как автоматизировать отдел продаж?", a: "Начните с одного узкого места: КП, обработка лидов или follow-up. Аудит → пилот на одной воронке → масштабирование." },
      { q: "Нужен ли AI для КП?", a: "Не обязательно. Шаблоны + CRM часто дают 90% эффекта. AI — для нестандартных формулировок и подбора позиций." },
      { q: "Какие CRM поддерживаете?", a: "amoCRM, Bitrix24, кастомные API. Интеграция с 1С для цен и остатков." },
    ],
    caseStudy: {
      title: "Автоматизация КП",
      problem: "Менеджеры тратили 45 минут на каждое коммерческое предложение.",
      solution: "CRM + каталог + шаблоны + AI-сборка документа.",
      result: "PDF за 2 минуты, цены только из каталога.",
      href: "/portfolio/kp-llm-automation",
    },
  },
  amocrm: {
    intro: [
      "Интеграция amoCRM — это связка вашего сайта, мессенджеров, 1С и генерации документов с воронкой продаж. Без двусторонней синхронизации менеджеры продолжают работать в Telegram и Excel.",
      "Типичный запрос: «заявки с сайта не попадают в CRM» или «нужна интеграция amoCRM с 1С». Мы делаем оба сценария с webhook-ами, обработкой ошибок и логами.",
      "Автоматизируем смену этапов, постановку задач, отправку КП и уведомления — роботы amoCRM + внешний workflow там, где роботов недостаточно.",
    ],
    howWeSolveTitle: "Что входит в интеграцию amoCRM",
    howWeSolve: [
      { title: "Входящие лиды", text: "Сайт, формы, Telegram, реклама → сделка в amoCRM с нужными полями и ответственным." },
      { title: "Синхронизация с 1С", text: "Заказы, оплаты, остатки — двусторонний обмен по расписанию или в реальном времени." },
      { title: "Документы и задачи", text: "Генерация КП из сделки, автозадачи на follow-up, уведомления в мессенджеры." },
    ],
    roiTitle: "Эффект",
    roi: [
      { value: "0", label: "лидов без ответственного в CRM" },
      { value: "−80%", label: "ручного переноса данных" },
      { value: "2 нед.", label: "типичный срок базовой интеграции" },
    ],
    faqTitle: "Вопросы по amoCRM",
    faq: [
      { q: "Как связать сайт с amoCRM?", a: "Webhook или API: форма → создание сделки + контакт + задача менеджеру. UTM-метки сохраняем в полях." },
      { q: "Интеграция amoCRM с 1С — как работает?", a: "Промежуточный слой: сделка «выиграна» → заказ в 1С; оплата в 1С → этап в CRM." },
      { q: "Нужен ли программист amoCRM в штате?", a: "Нет. Передаём документацию и схему интеграций. Поддержка — по SLA." },
    ],
    caseStudy: {
      title: "Сайт → amoCRM",
      problem: "Заявки с сайта обрабатывались вручную с задержкой до суток.",
      solution: "Webhook + автоназначение + Telegram-уведомление менеджеру.",
      result: "Лид в CRM за секунды, первый контакт в течение часа.",
      href: "/portfolio/amocrm-website-integration",
    },
  },
  bitrix24: {
    intro: [
      "Bitrix24 — мощная платформа, но без настройки процессов и интеграций превращается в «ещё один чат». Мы автоматизируем CRM-роботов, связку с 1С, телефонией и документами.",
      "Работаем как интегратор Bitrix24: аудит, настройка воронки, REST API, бизнес-процессы и AI-слой поверх — когда есть база знаний и повторяющиеся запросы.",
      "Типичный клиент: Bitrix24 установлен, но сотрудники ведут сделки в Excel и Telegram.",
    ],
    howWeSolveTitle: "Этапы работы с Bitrix24",
    howWeSolve: [
      { title: "Аудит и воронка", text: "Этапы, поля, роботы, права доступа. Убираем лишнее, оставляем то, что команда реально использует." },
      { title: "Интеграции", text: "1С, телефония, сайт, документы, внешние API через REST и вебхуки." },
      { title: "AI-ассистент", text: "Опционально: бот для сотрудников по регламентам, подсказки в карточке сделки." },
    ],
    roiTitle: "Результат",
    roi: [
      { value: "100%", label: "сделок ведутся в Bitrix24" },
      { value: "−50%", label: "времени на отчёты руководителю" },
      { value: "4–8 нед.", label: "полное внедрение с интеграциями" },
    ],
    faqTitle: "FAQ Bitrix24",
    faq: [
      { q: "Чем отличается интегратор от настройщика?", a: "Настройщик ставит поля. Интегратор связывает Bitrix24 с 1С, сайтом и документами в единый процесс." },
      { q: "Облако или коробка?", a: "Работаем с обоими. Коробка — для on-prem и 152-ФЗ." },
      { q: "Можно white-label для моих клиентов?", a: "Да. NDA, ваш бренд, фиксированная смета для вашего PM." },
    ],
    caseStudy: {
      title: "Bitrix24 + 1С",
      problem: "Менеджеры дублировали заказы в CRM и 1С вручную.",
      solution: "Двусторонняя синхронизация сделок и заказов.",
      result: "Единая картина по сделке, −80% ручного ввода.",
      href: "/portfolio/bitrix24-erp-sync",
    },
  },
  onec: {
    intro: [
      "Интеграция 1С с CRM — один из самых частых запросов в B2B: заказы, оплаты, остатки и контрагенты должны синхронизироваться без ручного копирования. Мы строим надёжный слой обмена с очередями, логами и обработкой ошибок.",
      "Работаем с 1С:УТ, 1С:ERP, 1С:Бухгалтерия через REST, OData, COM или файловый обмен — в зависимости от вашей конфигурации и политики безопасности.",
      "Типичные сценарии: новая сделка в CRM → заказ в 1С; оплата в 1С → закрытие этапа в CRM; изменение остатков → уведомление менеджеру.",
    ],
    howWeSolveTitle: "Как связываем CRM с 1С",
    howWeSolve: [
      { title: "Карта сущностей", text: "Какие объекты синхронизируем: контрагенты, заказы, счета, номенклатура. Частота и направление обмена." },
      { title: "Слой интеграции", text: "API-шлюз, очередь сообщений, идемпотентность, retry при сбоях. Журнал всех операций." },
      { title: "Тесты и мониторинг", text: "Сверка данных, алерты при расхождениях, документация для вашего 1С-специалиста." },
    ],
    roiTitle: "Эффект интеграции",
    roi: [
      { value: "−80%", label: "ручного дублирования CRM ↔ 1С" },
      { value: "real-time", label: "или по расписанию — на ваш выбор" },
      { value: "0", label: "потерянных заказов при сбое — retry + алерт" },
    ],
    faqTitle: "Вопросы по интеграции 1С",
    faq: [
      { q: "Как связать CRM с 1С?", a: "Промежуточный сервис: CRM шлёт событие → сервис создаёт документ в 1С → подтверждение обратно в CRM. Подробнее — в нашем гайде." },
      { q: "Какая 1С поддерживается?", a: "УТ, ERP, Бухгалтерия, КА — по согласованию. Нужен доступ к API или обмену через расширение." },
      { q: "Кто делает доработки в 1С?", a: "Мы — слой интеграции и спецификация. Доработки конфигурации 1С — ваш 1С-специалист или наш партнёр." },
      { q: "Сколько стоит?", a: "От 300 000 ₽ за базовую двустороннюю синхронизацию. Точная смета — после аудита конфигурации." },
    ],
    caseStudy: {
      title: "CRM ↔ 1С синхронизация",
      problem: "Заказы создавались дважды — в CRM и в 1С разными людьми.",
      solution: "API-шлюз с очередью и двусторонним обменом.",
      result: "Единый источник правды, −80% ручного ввода.",
      href: "/portfolio/crm-1c-sync",
    },
  },
  knowledgeBase: {
    intro: [
      "Корпоративная база знаний — это не wiki «для галочки». Это единое место для регламентов, FAQ и документов с поиском и AI-ответами со ссылками на источники.",
      "Типичные симптомы: новые сотрудники месяцами выходят на самообслуживание, одни и те же вопросы в чатах, документы в Confluence, Google Drive и почте одновременно.",
      "Мы индексируем документы, настраиваем поиск и подключаем ассистента для сотрудников или клиентов — с цитированием источников, а не галлюцинациями.",
    ],
    howWeSolveTitle: "Этапы создания базы знаний",
    howWeSolve: [
      { title: "Инвентаризация", text: "Какие документы, где лежат, кто владелец, как часто обновляются." },
      { title: "Индексация и поиск", text: "Загрузка, чанкинг, векторный поиск, ACL по ролям." },
      { title: "Ассистент", text: "Чат-бот для сотрудников: ответ + ссылка на параграф документа. Интеграция с Telegram, Bitrix24, сайтом." },
    ],
    roiTitle: "Эффект",
    roi: [
      { value: "−50%", label: "повторяющихся вопросов в поддержку" },
      { value: "2 нед.", label: "выход нового сотрудника на самообслуживание" },
      { value: "24/7", label: "доступ к регламентам" },
    ],
    faqTitle: "FAQ базы знаний",
    faq: [
      { q: "Confluence или своё решение?", a: "Зависит от объёма и требований к AI. Часто делаем слой поиска и RAG поверх существующих хранилищ." },
      { q: "On-prem?", a: "Да. Модели и индексы — в вашем периметре." },
      { q: "Как обновлять документы?", a: "Автосинхронизация из SharePoint, Confluence, Google Drive или ручная загрузка с версионированием." },
    ],
    caseStudy: {
      title: "AI-помощник на базе решений Kaspersky",
      problem: "Консультанты тратили время на поиск в продуктовой документации.",
      solution: "RAG-ассистент с эскалацией к эксперту.",
      result: "Быстрее типовые обращения, единообразные ответы.",
      href: "/portfolio/kaspersky-ai-assistant",
    },
  },
  corporate: {
    intro: [
      "Внедрение AI в компании — не пилот на ChatGPT, а production-система: архитектура, интеграции, мониторинг, compliance. AI имеет смысл, когда процесс и данные уже структурированы.",
      "Мы внедряем корпоративных ассистентов, RAG по документам, агентов для CRM и поддержки — в вашем периметре или изолированном облаке.",
      "Начинаем с аудита: где AI даст ROI, а где достаточно workflow без LLM.",
    ],
    howWeSolveTitle: "Как внедряем enterprise AI",
    howWeSolve: [
      { title: "AI readiness audit", text: "Данные, процессы, риски. Считаем ROI по сценариям: поддержка, документы, продажи." },
      { title: "Архитектура", text: "Модель (YandexGPT, GigaChat, private LLM), RAG, API, интеграции с CRM и мессенджерами." },
      { title: "Production", text: "MLOps, логирование, guardrails, передача команде. Не демо — рабочая система." },
    ],
    roiTitle: "Когда AI окупается",
    roi: [
      { value: "−40%", label: "нагрузки на L1-поддержку" },
      { value: "3–6 мес.", label: "типичная окупаемость RAG-ассистента" },
      { value: "on-prem", label: "данные не уходят в публичные API" },
    ],
    faqTitle: "FAQ enterprise AI",
    faq: [
      { q: "Когда AI имеет смысл, а когда достаточно workflow?", a: "Workflow — для правил и маршрутов. AI — для неструктурированного текста, классификации, диалогов. Подробнее — в нашем гайде." },
      { q: "ChatGPT или своя модель?", a: "Для корпоративных данных — private LLM или YandexGPT/GigaChat в вашем контуре." },
      { q: "Сколько стоит?", a: "Аудит — от 150 000 ₽. Внедрение — от 500 000 ₽ в зависимости от интеграций и объёма знаний." },
    ],
    caseStudy: {
      title: "AI-ассистент на базе решений Kaspersky",
      problem: "Сотни однотипных вопросов о продуктах и лицензиях.",
      solution: "LLM + RAG по документации + эскалация.",
      result: "Быстрее типовые кейсы, больше времени на сложные.",
      href: "/portfolio/kaspersky-ai-assistant",
    },
  },
  assistant: {
    intro: [
      "Бизнес-чатбот — это не «ответить на FAQ». Это квалификация лидов, запись в CRM, подсказки сотрудникам и эскалация к человеку — в Telegram, на сайте или внутри Bitrix24.",
      "Мы проектируем сценарии под ваш бренд, подключаем базу знаний и CRM. Бот знает, когда ответить сам, а когда передать менеджеру.",
    ],
    howWeSolveTitle: "Что входит",
    howWeSolve: [
      { title: "Сценарии", text: "Диалоги для продаж, поддержки, внутренних регламентов. Ветвления и сбор данных." },
      { title: "Интеграции", text: "CRM, Telegram, сайт, телефония. Лид создаётся автоматически." },
      { title: "База знаний", text: "RAG по документам — ответы со ссылками на источники." },
    ],
    roiTitle: "Эффект",
    roi: [
      { value: "−60%", label: "повторяющихся вопросов в поддержку" },
      { value: "24/7", label: "первичная квалификация лидов" },
      { value: "2–4 нед.", label: "запуск MVP-бота" },
    ],
    faqTitle: "FAQ чат-ботов",
    faq: [
      { q: "Заменит ли бот менеджеров?", a: "Нет. Бот закрывает типовое и квалифицирует. Сложное — эскалация человеку с контекстом диалога." },
      { q: "Telegram или виджет на сайте?", a: "Оба. Один сценарий — разные каналы." },
    ],
    caseStudy: {
      title: "Telemost Agent",
      problem: "Итоги встреч терялись, CRM обновлялась вручную.",
      solution: "AI-расшифровка + автообновление CRM после звонка.",
      result: "Быстрее follow-up, ничего не забывается.",
      href: "/portfolio/yandex-telemost-agent",
    },
  },
};

const EXTENDED_EN: Record<string, LandingExtendedContent> = {
  processes: {
    intro: [
      "Business process automation starts with a map of how work actually flows through CRM, email, messengers and spreadsheets — not with picking a platform. Without that map, any rollout becomes shelfware your team works around.",
      "We work as an external automation department: audit and ROI first, then integration architecture, then production launch with team handover. We add AI only where it removes manual work — not for buzzwords.",
      "Typical project: 4–12 weeks, fixed scope, milestone delivery. Integrations with amoCRM, Bitrix24, 1C, Telegram, documents and internal APIs.",
    ],
    howWeSolveTitle: "How we solve it",
    howWeSolve: [
      { title: "Process audit", text: "Interviews with process owners, flow mapping, time and money loss points. ROI calculation for 2–3 automation scenarios." },
      { title: "Architecture & roadmap", text: "Stack selection: workflow, CRM, integrations, AI layer. Fixed scope, timeline and estimate before development." },
      { title: "Implementation & handover", text: "Development, testing, production deploy, documentation and team training. Monitoring and SLA on request." },
    ],
    roiTitle: "Typical impact",
    roi: [
      { value: "−40%", label: "manual operations in the target process" },
      { value: "2–4 wks", label: "to first production release" },
      { value: "3–6 mo", label: "payback on typical enterprise projects" },
    ],
    faqTitle: "FAQ",
    faq: [
      { q: "Where to start with business process automation?", a: "Audit one high-pain process: sales, documents or approvals. Output is a map, ROI and priorities — not immediate development." },
      { q: "Do we need a BPM platform?", a: "Not always. CRM + workflow + integrations is enough for many cases. We recommend BPM only for complex approval chains and audit requirements." },
      { q: "Can we do it without AI?", a: "Yes. Most projects start with integrations and workflow. AI is added when it delivers measurable gain — e.g. in documents or support." },
      { q: "What budget?", a: "Audit from €1,500. Implementation from €4,000 depending on integrations and process count." },
      { q: "Remote delivery?", a: "Yes. Moscow, Russia & CIS. NDA, on-prem and compliance — on request." },
    ],
    caseStudy: {
      title: "ELIA Suite — proposal automation",
      problem: "Commercial proposals took 45 minutes per deal.",
      solution: "CRM + approval workflow + PDF/XLSX generation from templates.",
      result: "2 minutes per proposal, +32% quote→order conversion, ROI in 4 months.",
      href: "/portfolio/elia-suite",
    },
  },
  crm: {
    intro: [
      "CRM implementation is not license installation. It is pipeline setup, stage automation, and links to documents, 1C and messengers so managers work in CRM — not around it.",
      "We implement amoCRM and Bitrix24 for your processes: from initial audit to production and team training. Integrations are bidirectional, with logging and error handling.",
      "If CRM exists but nobody uses it — we start with diagnosis: where managers bypass the system and why.",
    ],
    howWeSolveTitle: "CRM implementation stages",
    howWeSolve: [
      { title: "Pipeline diagnosis", text: "Real deal path from lead to payment. Fields, stages, reports and manual entry points." },
      { title: "Setup & integrations", text: "Pipeline, robots, tasks, notifications. Website, 1C, documents, Telegram links." },
      { title: "Launch & adoption", text: "Training, playbooks, executive dashboard. First 2 weeks post go-live support." },
    ],
    roiTitle: "Business outcomes",
    roi: [
      { value: "100%", label: "website leads reach CRM" },
      { value: "−60%", label: "manual pipeline entry" },
      { value: "1 day", label: "pipeline visibility for CEO" },
    ],
    faqTitle: "CRM FAQ",
    faq: [
      { q: "amoCRM or Bitrix24?", a: "amoCRM — simpler for sales and SMB. Bitrix24 — broader: tasks, portal, telephony. We recommend after process audit, not by brand." },
      { q: "How long does CRM implementation take?", a: "Basic setup — 2–3 weeks. With 1C and document integrations — 4–8 weeks." },
      { q: "Can you migrate data?", a: "Yes. Contacts, deals and history from Excel, legacy CRM or 1C." },
      { q: "Need a full-time CRM admin?", a: "Not at start. We hand over documentation and train a responsible employee. SLA support — optional." },
    ],
    caseStudy: {
      title: "GTM Flow — ad leads",
      problem: "Leads lost between Google, VK, Telegram and Avito.",
      solution: "Unified lead feed + AI qualification + auto follow-up.",
      result: "Fewer lost leads, single dashboard funnel.",
      href: "/portfolio/lead-generation",
    },
  },
  documents: {
    intro: [
      "Document workflow automation is a chain: intake → data extraction → approval → archive in CRM/ERP. AI is not always needed — workflow and OCR often suffice.",
      "Typical pains: contracts lost between email and file shares, approvals take days, templates scattered across employee folders.",
      "We design approval routes with notifications, deadlines and audit trails. Documents link to CRM deals and 1C orders.",
    ],
    howWeSolveTitle: "How we automate documents",
    howWeSolve: [
      { title: "Document map", text: "Document types, approvers, storage, fields needed in CRM/1C." },
      { title: "Workflow & OCR", text: "Approval chains, field extraction from PDF/scans, template auto-fill." },
      { title: "Integrations", text: "CRM, 1C, email, EDI. Versioning and action log." },
    ],
    roiTitle: "Impact",
    roi: [
      { value: "−70%", label: "contract approval time" },
      { value: "0", label: "documents lost between systems" },
      { value: "minutes", label: "instead of hours for scan batches" },
    ],
    faqTitle: "Document workflow FAQ",
    faq: [
      { q: "Need separate EDI?", a: "Depends on requirements. Often we start with internal workflow + existing EDI integration." },
      { q: "AI or OCR?", a: "OCR + rules for structured docs. AI for non-standard text and classification." },
      { q: "On-prem compliance?", a: "Yes — isolated deployment and data retention policies." },
    ],
    caseStudy: {
      title: "OCR pipeline for accounting",
      problem: "Manual entry of invoice and act details from scans.",
      solution: "OCR + field extraction + export to accounting system.",
      result: "Batch processing in minutes, fewer input errors.",
      href: "/portfolio/ocr-text-extraction",
    },
  },
  sales: {
    intro: [
      "Sales automation means managers spend time on calls and negotiations — not building proposals in Word. Data comes from CRM and catalog, document generates in minutes.",
      "Typical flow: lead → CRM qualification → auto proposal → client delivery → scheduled follow-up.",
      "We don't replace CRM — we make it the center of sales, not another reporting system.",
    ],
    howWeSolveTitle: "How we accelerate sales",
    howWeSolve: [
      { title: "Single source of truth", text: "Prices, SKU, terms — only from catalog and CRM. No Excel copy-paste." },
      { title: "Proposal generation", text: "DOCX/PDF templates, multi-currency, VAT, discounts. PDF in 2 minutes not 45." },
      { title: "Follow-up", text: "Auto reminders, CRM tasks, Telegram notifications. Leads don't disappear." },
    ],
    roiTitle: "Client results",
    roi: [
      { value: "45→2 min", label: "commercial proposal preparation" },
      { value: "+32%", label: "quote→order conversion (ELIA Suite)" },
      { value: "−50%", label: "manager time on routine" },
    ],
    faqTitle: "Sales automation FAQ",
    faq: [
      { q: "How to automate a sales department?", a: "Start with one bottleneck: proposals, lead handling or follow-up. Audit → pilot on one pipeline → scale." },
      { q: "Need AI for proposals?", a: "Not required. Templates + CRM often deliver 90% of value. AI for non-standard wording and product matching." },
      { q: "Which CRM?", a: "amoCRM, Bitrix24, custom APIs. 1C integration for prices and stock." },
    ],
    caseStudy: {
      title: "Proposal automation",
      problem: "Managers spent 45 minutes on each commercial proposal.",
      solution: "CRM + catalog + templates + AI document assembly.",
      result: "PDF in 2 minutes, prices only from catalog.",
      href: "/portfolio/kp-llm-automation",
    },
  },
  amocrm: {
    intro: [
      "amoCRM integration connects your website, messengers, 1C and document generation to the sales pipeline. Without bidirectional sync, managers keep working in Telegram and Excel.",
      "Typical requests: website leads don't reach CRM, or amoCRM–1C integration needed. We deliver both with webhooks, error handling and logs.",
      "We automate stage changes, tasks, proposal sending and notifications — amoCRM robots plus external workflow where robots aren't enough.",
    ],
    howWeSolveTitle: "What's included",
    howWeSolve: [
      { title: "Inbound leads", text: "Website, forms, Telegram, ads → deal in amoCRM with fields and owner." },
      { title: "1C sync", text: "Orders, payments, stock — bidirectional exchange on schedule or real-time." },
      { title: "Documents & tasks", text: "Proposal from deal, auto follow-up tasks, messenger notifications." },
    ],
    roiTitle: "Impact",
    roi: [
      { value: "0", label: "leads without owner in CRM" },
      { value: "−80%", label: "manual data transfer" },
      { value: "2 wks", label: "typical basic integration timeline" },
    ],
    faqTitle: "amoCRM FAQ",
    faq: [
      { q: "How to connect website to amoCRM?", a: "Webhook or API: form → deal + contact + manager task. UTM stored in fields." },
      { q: "How does amoCRM–1C integration work?", a: "Middleware: deal won → order in 1C; payment in 1C → stage in CRM." },
      { q: "Need amoCRM developer on staff?", a: "No. We hand over documentation and integration schema. SLA support available." },
    ],
    caseStudy: {
      title: "Website → amoCRM",
      problem: "Website leads processed manually with up to 24h delay.",
      solution: "Webhook + auto-assignment + Telegram alert to manager.",
      result: "Lead in CRM in seconds, first contact within an hour.",
      href: "/portfolio/amocrm-website-integration",
    },
  },
  bitrix24: {
    intro: [
      "Bitrix24 is powerful but without process setup and integrations becomes another chat app. We automate CRM robots, 1C links, telephony and documents.",
      "We work as Bitrix24 integrators: audit, pipeline setup, REST API, business processes and optional AI layer when knowledge base and repetitive queries exist.",
      "Typical client: Bitrix24 installed but deals still tracked in Excel and Telegram.",
    ],
    howWeSolveTitle: "Bitrix24 engagement stages",
    howWeSolve: [
      { title: "Audit & pipeline", text: "Stages, fields, robots, access rights. Remove clutter, keep what team actually uses." },
      { title: "Integrations", text: "1C, telephony, website, documents, external APIs via REST and webhooks." },
      { title: "AI assistant", text: "Optional: employee bot for policies, deal card suggestions." },
    ],
    roiTitle: "Outcomes",
    roi: [
      { value: "100%", label: "deals managed in Bitrix24" },
      { value: "−50%", label: "time on manager reports" },
      { value: "4–8 wks", label: "full rollout with integrations" },
    ],
    faqTitle: "Bitrix24 FAQ",
    faq: [
      { q: "Integrator vs configurator?", a: "Configurator sets fields. Integrator connects Bitrix24 to 1C, website and documents as one process." },
      { q: "Cloud or on-prem?", a: "Both. On-prem for compliance requirements." },
      { q: "White-label for my clients?", a: "Yes. NDA, your brand, fixed scope for your PM." },
    ],
    caseStudy: {
      title: "Bitrix24 + 1C",
      problem: "Managers duplicated orders in CRM and 1C manually.",
      solution: "Bidirectional deal and order sync.",
      result: "Single deal view, −80% manual entry.",
      href: "/portfolio/bitrix24-erp-sync",
    },
  },
  onec: {
    intro: [
      "1C–CRM integration is one of the most common B2B requests: orders, payments, stock and counterparties must sync without manual copy-paste. We build a reliable exchange layer with queues, logs and error handling.",
      "We work with 1C:Trade, 1C:ERP, 1C:Accounting via REST, OData, COM or file exchange — depending on your configuration and security policy.",
      "Typical flows: new CRM deal → 1C order; 1C payment → CRM stage closed; stock change → manager notification.",
    ],
    howWeSolveTitle: "How we connect CRM with 1C",
    howWeSolve: [
      { title: "Entity map", text: "What syncs: counterparties, orders, invoices, catalog. Frequency and direction." },
      { title: "Integration layer", text: "API gateway, message queue, idempotency, retry on failure. Full operation log." },
      { title: "Testing & monitoring", text: "Data reconciliation, alerts on mismatch, documentation for your 1C specialist." },
    ],
    roiTitle: "Integration impact",
    roi: [
      { value: "−80%", label: "manual CRM ↔ 1C duplication" },
      { value: "real-time", label: "or scheduled — your choice" },
      { value: "0", label: "lost orders on failure — retry + alert" },
    ],
    faqTitle: "1C integration FAQ",
    faq: [
      { q: "How to connect CRM with 1C?", a: "Middleware: CRM event → service creates 1C document → confirmation back to CRM. See our guide for details." },
      { q: "Which 1C configurations?", a: "Trade, ERP, Accounting, CA — by agreement. API or exchange extension access required." },
      { q: "Who modifies 1C?", a: "We deliver integration layer and spec. 1C config changes — your specialist or our partner." },
      { q: "Cost?", a: "From €3,000 for basic bidirectional sync. Exact estimate after configuration audit." },
    ],
    caseStudy: {
      title: "CRM ↔ 1C sync",
      problem: "Orders created twice — in CRM and 1C by different people.",
      solution: "API gateway with queue and bidirectional exchange.",
      result: "Single source of truth, −80% manual entry.",
      href: "/portfolio/crm-1c-sync",
    },
  },
  knowledgeBase: {
    intro: [
      "A corporate knowledge base is not a checkbox wiki. It is one place for policies, FAQ and documents with search and AI answers citing sources.",
      "Typical symptoms: new hires take months to self-serve, same questions in chats, docs in Confluence, Drive and email at once.",
      "We index documents, configure search and connect assistants for employees or clients — with source citations, not hallucinations.",
    ],
    howWeSolveTitle: "Knowledge base stages",
    howWeSolve: [
      { title: "Inventory", text: "Which documents, where stored, owners, update frequency." },
      { title: "Indexing & search", text: "Ingestion, chunking, vector search, role-based ACL." },
      { title: "Assistant", text: "Employee chat: answer + link to document paragraph. Telegram, Bitrix24, website integration." },
    ],
    roiTitle: "Impact",
    roi: [
      { value: "−50%", label: "repetitive support questions" },
      { value: "2 wks", label: "new hire self-service ramp" },
      { value: "24/7", label: "policy access" },
    ],
    faqTitle: "Knowledge base FAQ",
    faq: [
      { q: "Confluence or custom?", a: "Depends on volume and AI requirements. Often we add search and RAG layer on existing stores." },
      { q: "On-prem?", a: "Yes. Models and indexes in your perimeter." },
      { q: "How to update documents?", a: "Auto-sync from SharePoint, Confluence, Drive or manual upload with versioning." },
    ],
    caseStudy: {
      title: "AI assistant built on Kaspersky-related solutions",
      problem: "Consultants spent time searching product documentation.",
      solution: "RAG assistant with expert escalation.",
      result: "Faster typical cases, consistent answers.",
      href: "/portfolio/kaspersky-ai-assistant",
    },
  },
  corporate: {
    intro: [
      "Enterprise AI implementation is not a ChatGPT pilot — it is a production system: architecture, integrations, monitoring, compliance. AI makes sense when process and data are already structured.",
      "We deploy corporate assistants, document RAG, CRM and support agents — in your perimeter or isolated cloud.",
      "We start with audit: where AI delivers ROI and where workflow without LLM is enough.",
    ],
    howWeSolveTitle: "How we deploy enterprise AI",
    howWeSolve: [
      { title: "AI readiness audit", text: "Data, processes, risks. ROI by scenario: support, documents, sales." },
      { title: "Architecture", text: "Model (YandexGPT, GigaChat, private LLM), RAG, API, CRM and messenger integrations." },
      { title: "Production", text: "MLOps, logging, guardrails, team handover. Not a demo — working system." },
    ],
    roiTitle: "When AI pays off",
    roi: [
      { value: "−40%", label: "L1 support load" },
      { value: "3–6 mo", label: "typical RAG assistant payback" },
      { value: "on-prem", label: "data stays in your perimeter" },
    ],
    faqTitle: "Enterprise AI FAQ",
    faq: [
      { q: "When does AI make sense vs workflow?", a: "Workflow for rules and routes. AI for unstructured text, classification, dialogs. See our guide." },
      { q: "ChatGPT or own model?", a: "For corporate data — private LLM or YandexGPT/GigaChat in your contour." },
      { q: "Cost?", a: "Audit from €1,500. Implementation from €5,000 depending on integrations and knowledge volume." },
    ],
    caseStudy: {
      title: "AI assistant built on Kaspersky-related solutions",
      problem: "Hundreds of repetitive product and license questions.",
      solution: "LLM + documentation RAG + escalation.",
      result: "Faster typical cases, more time on complex ones.",
      href: "/portfolio/kaspersky-ai-assistant",
    },
  },
  assistant: {
    intro: [
      "A business chatbot is not just FAQ answers. It qualifies leads, writes to CRM, helps employees and escalates to humans — in Telegram, on website or inside Bitrix24.",
      "We design scenarios for your brand, connect knowledge base and CRM. The bot knows when to answer and when to hand off to a manager.",
    ],
    howWeSolveTitle: "What's included",
    howWeSolve: [
      { title: "Scenarios", text: "Dialogs for sales, support, internal policies. Branching and data collection." },
      { title: "Integrations", text: "CRM, Telegram, website, telephony. Lead created automatically." },
      { title: "Knowledge base", text: "Document RAG — answers with source links." },
    ],
    roiTitle: "Impact",
    roi: [
      { value: "−60%", label: "repetitive support questions" },
      { value: "24/7", label: "lead qualification" },
      { value: "2–4 wks", label: "MVP bot launch" },
    ],
    faqTitle: "Chatbot FAQ",
    faq: [
      { q: "Will the bot replace managers?", a: "No. Bot handles routine and qualifies. Complex cases escalate with dialog context." },
      { q: "Telegram or website widget?", a: "Both. One scenario — multiple channels." },
    ],
    caseStudy: {
      title: "Telemost Agent",
      problem: "Meeting outcomes lost, CRM updated manually.",
      solution: "AI transcription + auto CRM update after call.",
      result: "Faster follow-up, nothing forgotten.",
      href: "/portfolio/yandex-telemost-agent",
    },
  },
};

export function getLandingExtended(contentKey: string, locale: LandingExtendedLocale): LandingExtendedContent | undefined {
  const map = locale === "en" ? EXTENDED_EN : EXTENDED_RU;
  return map[contentKey];
}
