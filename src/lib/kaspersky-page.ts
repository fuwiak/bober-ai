import { KASPERSKY_PARTNER_BADGES } from "@/lib/trust-partners";

/** Wordstat-backed offers for /kaspersky (see data/wordstat-kaspersky-decisions.json). */
export type KasperskyOffer = {
  id: string;
  titleRu: string;
  titleEn: string;
  blurbRu: string;
  blurbEn: string;
  wordstatHint: string;
};

export const KASPERSKY_PAGE = {
  statusRu: "Registered Partner «Лаборатории Касперского» (B2B / B2C)",
  statusEn: "Kaspersky Lab Registered Partner (B2B / B2C)",
  badges: KASPERSKY_PARTNER_BADGES,
  metaTitleRu: "Kaspersky для бизнеса — поставка и внедрение | Bober AI",
  metaTitleEn: "Kaspersky for business — supply and deployment | Bober AI",
  metaDescRu:
    "Авторизованный партнёр Kaspersky: Endpoint Security, Security Center, Mail Server, защита серверов 1С и терминалов. Лицензии через дистрибуцию, внедрение и поддержка.",
  metaDescEn:
    "Authorized Kaspersky partner: Endpoint Security, Security Center, Mail Server, 1C and terminal server protection. Licenses via distribution, deployment and support.",
  h1Ru: "Kaspersky для бизнеса: лицензии и внедрение",
  h1En: "Kaspersky for business: licenses and deployment",
  subtitleRu:
    "Поставляем корпоративные продукты Kaspersky и внедряем контур защиты рядом с AI, Bitrix24 и on-prem инфраструктурой. Лицензии — через авторизованную дистрибуцию.",
  subtitleEn:
    "We supply Kaspersky corporate products and deploy protection next to AI, Bitrix24 and on-prem infrastructure. Licenses via authorized distribution.",
  disclaimerRu:
    "Маркетинговые материалы по продуктам Kaspersky согласуются с требованиями бренда. Статус партнёра подтверждён сертификатами — не является каталогом цен вендора.",
  disclaimerEn:
    "Kaspersky product marketing follows brand guidelines. Partner status is certificate-backed — this is not a vendor price list.",
  offers: [
    {
      id: "endpoint",
      titleRu: "Kaspersky Endpoint Security для бизнеса",
      titleEn: "Kaspersky Endpoint Security for Business",
      blurbRu:
        "Подбор редакции (стандартный / расширенный), поставка и продление лицензий. Фокус Wordstat: «KES купить», «лицензия для бизнеса», «стоимость».",
      blurbEn:
        "Edition selection (standard / advanced), supply and renewals. Wordstat focus: buy / license / pricing queries.",
      wordstatHint: "KES купить ~454 · лицензия для бизнеса ~420",
    },
    {
      id: "ksc",
      titleRu: "Внедрение Kaspersky Security Center",
      titleEn: "Kaspersky Security Center deployment",
      blurbRu:
        "Установка, политики, агенты, Linux/Windows. Сильнейший service-intent в выдаче — тянет за собой места Endpoint.",
      blurbEn:
        "Install, policies, agents, Linux/Windows. Strongest service intent — pulls Endpoint seats.",
      wordstatHint: "настройка KSC ~279 · установка и настройка ~46",
    },
    {
      id: "servers",
      titleRu: "Защита серверов 1С и терминалов",
      titleEn: "1C and terminal server protection",
      blurbRu:
        "Проблемный спрос без бренда в запросе: защита RDS/терминалов и серверов 1С — закрываем KES + политики KSC.",
      blurbEn:
        "Problem demand without brand in the query: RDS/terminals and 1C servers — covered with KES + KSC policies.",
      wordstatHint: "защита терминальных серверов ~216 · защита сервера 1С ~205",
    },
    {
      id: "mail",
      titleRu: "Kaspersky Security for Mail Server",
      titleEn: "Kaspersky Security for Mail Server",
      blurbRu: "Защита почтового контура (в т.ч. Linux Mail Server) для компаний с собственным mail.",
      blurbEn: "Mail perimeter protection (incl. Linux Mail Server) for companies with own mail.",
      wordstatHint: "KSMS ~184 · защита почтового сервера ~83",
    },
    {
      id: "optimum",
      titleRu: "Kaspersky Optimum Security / EDR",
      titleEn: "Kaspersky Optimum Security / EDR",
      blurbRu: "Оптимальный контур и EDR-запросы для бизнеса — подбор и поставка через дистрибуцию.",
      blurbEn: "Optimum and EDR business queries — selection and supply via distribution.",
      wordstatHint: "Optimum ~26 · EDR оптимальный купить ~25",
    },
    {
      id: "audit",
      titleRu: "Аудит ИБ → миграция на Kaspersky",
      titleEn: "Security audit → migrate to Kaspersky",
      blurbRu:
        "Входная услуга: аудит → смета лицензий и план замены другого AV. Дальше KSC + Endpoint.",
      blurbEn:
        "Entry offer: audit → license estimate and AV replacement plan. Then KSC + Endpoint.",
      wordstatHint: "аудит ИБ компания ~56",
    },
  ] as KasperskyOffer[],
  processTitleRu: "Как закрываем сделку на лицензии",
  processTitleEn: "How we close license deals",
  processRu: [
    "Короткий аудит контура (места, серверы, почта, 1С/терминалы)",
    "Подбор продуктов и сметы лицензий через дистрибьютора",
    "Внедрение Security Center и политик (если нужно)",
    "Продление и поддержка — отдельный контур удержания",
  ],
  processEn: [
    "Short perimeter audit (seats, servers, mail, 1C/terminals)",
    "Product mix and license quote via distributor",
    "Security Center and policies if needed",
    "Renewals and support as a retention loop",
  ],
  attachTitleRu: "С чем обычно связываем Kaspersky",
  attachTitleEn: "What we usually bundle Kaspersky with",
  attachRu: [
    "On-prem / private LLM и серверы AI",
    "Bitrix24 и корпоративные порталы",
    "Контуры 1С и терминальный доступ",
    "Почтовые серверы компании",
  ],
  attachEn: [
    "On-prem / private LLM and AI servers",
    "Bitrix24 and corporate portals",
    "1C contours and terminal access",
    "Company mail servers",
  ],
} as const;
