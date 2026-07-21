import {
  FOUNDER_IMAGE,
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_NAME,
  SITE_URL,
  YANDEX_USLUGI_URL,
  absoluteUrl,
} from "@/lib/site";

export const HABR_URL = "https://habr.com/ru/users/fuwiak/";
export const MEDIUM_URL = "https://medium.com/@stasinskipawel";
export const FIVERR_URL = "https://www.fiverr.com/pawelstasinski";
export const STACKOVERFLOW_URL = "https://stackoverflow.com/users/2715948/fuwiak";
export const DATASCIENCE_SE_URL = "https://datascience.stackexchange.com/users/56354/fuwiak";
export const FAKRO_INTERVIEW_URL = "https://www.youtube.com/watch?v=8mF9eP-0fws";
export const FAKRO_PAGE_URL = "https://academy-fakro.ru/webinar/49";
export const MK_ARTICLE_URL =
  "https://www.mk-mosobl.ru/social/2026/03/16/starovery-i-novatory-pedagogi-razdelilis-na-dva-lagerya-izza-vnedreniya-neyrosetey.html";
export const SEVERGAZBANK_ARTICLE_URL =
  "https://gazeta.severgazbank.ru/virtuoz-i-ego-skripka-pochemu-ii-ne-zamena-programmistu-a-novyj-instrument/";

export type CredibilityMarket = "russian" | "international";

export type CredibilityItem = {
  id: string;
  market: CredibilityMarket;
  source: string;
  sourceShort: string;
  type: string;
  title: string;
  description: string;
  meta: string;
  cta: string;
  url: string;
  publishedAt?: string;
  secondaryLinks?: { label: string; url: string }[];
  schemaType?: "Article" | "VideoObject" | "ProfilePage";
};

export type MediaDossierSection = {
  id: string;
  title: string;
  itemIds: string[];
};

const ruItems: CredibilityItem[] = [
  {
    id: "fakro-fm",
    market: "russian",
    source: "FAKRO FM",
    sourceShort: "FAKRO",
    type: "Интервью / подкаст",
    title: "Нейросети в жизни и в работе",
    description:
      "Полноформатное интервью с Павлом Стасиньски о применении искусственного интеллекта, автоматизации работы, ограничениях нейросетей и задачах, которые компании могут передавать ИИ.",
    meta: "FAKRO FM, 2026",
    cta: "Смотреть интервью",
    url: FAKRO_INTERVIEW_URL,
    publishedAt: "2026-05-26",
    secondaryLinks: [{ label: "Страница выпуска FAKRO", url: FAKRO_PAGE_URL }],
    schemaType: "VideoObject",
  },
  {
    id: "mk-education",
    market: "russian",
    source: "МК Московская область",
    sourceShort: "МК",
    type: "Экспертный комментарий",
    title: "Использование нейросетей в образовании",
    description:
      "Комментарий Павла Стасиньски о возможностях и ограничениях автоматической проверки работ с помощью искусственного интеллекта.",
    meta: "МК Московская область, 2026",
    cta: "Читать публикацию",
    url: MK_ARTICLE_URL,
    publishedAt: "2026-03-16",
    schemaType: "Article",
  },
  {
    id: "severgazbank-ai",
    market: "russian",
    source: "Газета Севергазбанка",
    sourceShort: "Севергазбанк",
    type: "Экспертный материал",
    title: "ИИ как инструмент разработчика",
    description:
      "Материал о том, почему искусственный интеллект становится соавтором программиста, но не заменяет инженерное мышление, архитектуру и ответственность за результат.",
    meta: "Севергазбанк, 2025",
    cta: "Читать материал",
    url: SEVERGAZBANK_ARTICLE_URL,
    publishedAt: "2025-11-07",
    schemaType: "Article",
  },
  {
    id: "habr",
    market: "russian",
    source: "Habr",
    sourceShort: "Habr",
    type: "Технические публикации",
    title: "Статьи о Python, нейросетях и анализе данных",
    description:
      "Авторские материалы о рекуррентных нейронных сетях, генерации музыки, обработке данных и практическом применении Python.",
    meta: "3 авторские публикации",
    cta: "Открыть профиль Habr",
    url: HABR_URL,
    schemaType: "ProfilePage",
  },
  {
    id: "medium",
    market: "international",
    source: "Medium",
    sourceShort: "Medium",
    type: "Технические статьи",
    title: "AI, RAG, LangChain и data science",
    description:
      "Технические статьи о retrieval-augmented generation, LangChain, генеративном ИИ, Python, компьютерном зрении и анализе данных.",
    meta: "10 опубликованных статей",
    cta: "Читать на Medium",
    url: MEDIUM_URL,
    schemaType: "ProfilePage",
  },
  {
    id: "fiverr-pro",
    market: "international",
    source: "Fiverr Pro",
    sourceShort: "Fiverr Pro",
    type: "Подтверждённая экспертиза",
    title: "Верифицированный AI-специалист Fiverr Pro",
    description:
      "Подтверждённая экспертиза в AI-разработке, data science, машинном обучении и инженерии ПО, с коммерческими проектами для международных клиентов.",
    meta: "Верифицированный коммерческий профиль",
    cta: "Открыть профиль Fiverr Pro",
    url: FIVERR_URL,
    schemaType: "ProfilePage",
  },
  {
    id: "stack-exchange",
    market: "international",
    source: "Stack Exchange",
    sourceShort: "SE",
    type: "Сообщество разработчиков",
    title: "Многолетний технический вклад",
    description:
      "Более десяти лет ответов на практические вопросы по разработке ПО, data science, машинному обучению и математике.",
    meta: "Stack Overflow и Data Science Stack Exchange",
    cta: "Открыть технический профиль",
    url: STACKOVERFLOW_URL,
    secondaryLinks: [
      { label: "Stack Overflow", url: STACKOVERFLOW_URL },
      { label: "Data Science Stack Exchange", url: DATASCIENCE_SE_URL },
    ],
    schemaType: "ProfilePage",
  },
  {
    id: "github",
    market: "international",
    source: "GitHub",
    sourceShort: "GitHub",
    type: "Open source и инженерия",
    title: "Публичные AI- и software-проекты",
    description:
      "Репозитории по Python, машинному обучению, RAG, автоматизации, AI-приложениям и инженерным экспериментам за несколько лет.",
    meta: "Долгосрочный инженерный след",
    cta: "Открыть GitHub",
    url: GITHUB_URL,
    schemaType: "ProfilePage",
  },
  {
    id: "linkedin",
    market: "international",
    source: "LinkedIn",
    sourceShort: "LinkedIn",
    type: "Профессиональный профиль",
    title: "AI-автоматизация и LLM-инженерия",
    description:
      "Профессиональная деятельность в AI-автоматизации, интеграциях LLM, RAG, автоматизации бизнес-процессов и промышленном внедрении.",
    meta: "Профессиональная сеть",
    cta: "Открыть LinkedIn",
    url: LINKEDIN_URL,
    schemaType: "ProfilePage",
  },
];

const enItems: CredibilityItem[] = [
  {
    id: "fakro-fm",
    market: "russian",
    source: "FAKRO FM",
    sourceShort: "FAKRO",
    type: "Interview / podcast",
    title: "Neural networks in life and work",
    description:
      "Full-length interview with Pawel Stasinski on applying AI, work automation, model limitations, and tasks companies can delegate to neural networks.",
    meta: "FAKRO FM, 2026",
    cta: "Watch interview",
    url: FAKRO_INTERVIEW_URL,
    publishedAt: "2026-05-26",
    secondaryLinks: [{ label: "FAKRO episode page", url: FAKRO_PAGE_URL }],
    schemaType: "VideoObject",
  },
  {
    id: "mk-education",
    market: "russian",
    source: "MK Moscow Region",
    sourceShort: "MK",
    type: "Expert commentary",
    title: "Using neural networks in education",
    description:
      "Commentary by Pawel Stasinski on the opportunities and limits of automated grading with artificial intelligence.",
    meta: "MK Moscow Region, 2026",
    cta: "Read publication",
    url: MK_ARTICLE_URL,
    publishedAt: "2026-03-16",
    schemaType: "Article",
  },
  {
    id: "severgazbank-ai",
    market: "russian",
    source: "Severgazbank Newspaper",
    sourceShort: "Severgazbank",
    type: "Expert article",
    title: "AI as a developer tool",
    description:
      "On why artificial intelligence becomes a programmer’s co-author but does not replace engineering judgment, architecture, or responsibility for outcomes.",
    meta: "Severgazbank, 2025",
    cta: "Read article",
    url: SEVERGAZBANK_ARTICLE_URL,
    publishedAt: "2025-11-07",
    schemaType: "Article",
  },
  {
    id: "habr",
    market: "russian",
    source: "Habr",
    sourceShort: "Habr",
    type: "Technical publications",
    title: "Articles on Python, neural networks and data analysis",
    description:
      "Author articles on recurrent neural networks, music generation, data processing and practical Python applications.",
    meta: "3 authored publications",
    cta: "Open Habr profile",
    url: HABR_URL,
    schemaType: "ProfilePage",
  },
  {
    id: "medium",
    market: "international",
    source: "Medium",
    sourceShort: "Medium",
    type: "Technical writing",
    title: "AI, RAG, LangChain and data science",
    description:
      "Technical articles covering retrieval-augmented generation, LangChain, generative AI, Python, computer vision and data analysis.",
    meta: "10 published articles",
    cta: "Read on Medium",
    url: MEDIUM_URL,
    schemaType: "ProfilePage",
  },
  {
    id: "fiverr-pro",
    market: "international",
    source: "Fiverr Pro",
    sourceShort: "Fiverr Pro",
    type: "Verified expertise",
    title: "Vetted Fiverr Pro AI specialist",
    description:
      "Verified in AI development, data science, machine learning and software engineering, with commercial projects delivered for international clients.",
    meta: "Verified commercial profile",
    cta: "View Fiverr Pro profile",
    url: FIVERR_URL,
    schemaType: "ProfilePage",
  },
  {
    id: "stack-exchange",
    market: "international",
    source: "Stack Exchange",
    sourceShort: "SE",
    type: "Developer community",
    title: "Long-term technical contribution",
    description:
      "More than a decade of answering practical questions in software engineering, data science, machine learning and mathematics.",
    meta: "Stack Overflow and Data Science Stack Exchange",
    cta: "View technical profile",
    url: STACKOVERFLOW_URL,
    secondaryLinks: [
      { label: "Stack Overflow", url: STACKOVERFLOW_URL },
      { label: "Data Science Stack Exchange", url: DATASCIENCE_SE_URL },
    ],
    schemaType: "ProfilePage",
  },
  {
    id: "github",
    market: "international",
    source: "GitHub",
    sourceShort: "GitHub",
    type: "Open-source and engineering",
    title: "Public AI and software projects",
    description:
      "Repositories covering Python, machine learning, RAG, automation, AI applications and software experiments developed over several years.",
    meta: "Long-term engineering footprint",
    cta: "View GitHub",
    url: GITHUB_URL,
    schemaType: "ProfilePage",
  },
  {
    id: "linkedin",
    market: "international",
    source: "LinkedIn",
    sourceShort: "LinkedIn",
    type: "Professional profile",
    title: "AI automation and LLM engineering",
    description:
      "Professional activity focused on AI automation, LLM integrations, RAG, business-process automation and production deployment.",
    meta: "Professional network",
    cta: "View LinkedIn",
    url: LINKEDIN_URL,
    schemaType: "ProfilePage",
  },
];

export function getCredibilityItems(locale: string): CredibilityItem[] {
  return locale === "en" ? enItems : ruItems;
}

export function getCredibilityByMarket(locale: string, market: CredibilityMarket): CredibilityItem[] {
  return getCredibilityItems(locale).filter((item) => item.market === market);
}

export function getMediaDossierSections(locale: string): MediaDossierSection[] {
  if (locale === "en") {
    return [
      { id: "interviews", title: "Interviews and media appearances", itemIds: ["fakro-fm"] },
      { id: "commentary", title: "Expert commentary", itemIds: ["mk-education", "severgazbank-ai"] },
      { id: "publications", title: "Technical publications", itemIds: ["habr", "medium"] },
      { id: "communities", title: "Developer communities", itemIds: ["stack-exchange", "github"] },
      { id: "verified", title: "Verified commercial profiles", itemIds: ["fiverr-pro", "linkedin"] },
    ];
  }
  return [
    { id: "interviews", title: "Интервью и подкасты", itemIds: ["fakro-fm"] },
    { id: "commentary", title: "Комментарии в СМИ", itemIds: ["mk-education"] },
    { id: "expert", title: "Экспертные материалы", itemIds: ["severgazbank-ai"] },
    { id: "habr", title: "Авторские статьи на Habr", itemIds: ["habr"] },
    { id: "international", title: "Международные публикации", itemIds: ["medium"] },
    {
      id: "profiles",
      title: "Профессиональные профили",
      itemIds: ["fiverr-pro", "stack-exchange", "github", "linkedin"],
    },
    { id: "proof", title: "Отзывы и подтверждение опыта", itemIds: [] },
  ];
}

export const YANDEX_PROOF_URL = YANDEX_USLUGI_URL;

export function founderPersonJsonLd(pageUrl: string) {
  const items = getCredibilityItems("ru");
  const subjectOf = items
    .filter((item) => item.schemaType === "Article" || item.schemaType === "VideoObject")
    .map((item) => ({
      "@type": item.schemaType,
      name: item.title,
      url: item.url,
      ...(item.publishedAt ? { datePublished: item.publishedAt } : {}),
    }));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${pageUrl}#person`,
    name: "Pawel Stasinski",
    alternateName: [
      "Paweł Stasiński",
      "Павел Стасиньски",
      "Павел Стасиньский",
      "Pavel Stasinsky",
      "fuwiak",
    ],
    jobTitle: "AI Architect / AI Automation Engineer",
    url: pageUrl,
    image: absoluteUrl(FOUNDER_IMAGE),
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    founder: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    sameAs: [
      MEDIUM_URL,
      HABR_URL,
      GITHUB_URL,
      LINKEDIN_URL,
      FIVERR_URL,
      STACKOVERFLOW_URL,
      DATASCIENCE_SE_URL,
      YANDEX_USLUGI_URL,
    ],
    subjectOf,
  };
}

export function credibilityGraphJsonLd(pageUrl: string, locale: string) {
  const items = getCredibilityItems(locale);
  const person = founderPersonJsonLd(pageUrl);

  const creativeWorks = items
    .filter((item) => item.schemaType === "Article" || item.schemaType === "VideoObject")
    .map((item) => ({
      "@type": item.schemaType,
      "@id": `${pageUrl}#${item.id}`,
      name: item.title,
      description: item.description,
      url: item.url,
      ...(item.publishedAt ? { datePublished: item.publishedAt } : {}),
      author: { "@id": `${pageUrl}#person` },
      ...(item.schemaType === "VideoObject"
        ? {
            thumbnailUrl: "https://i.ytimg.com/vi/8mF9eP-0fws/hqdefault.jpg",
            uploadDate: item.publishedAt,
          }
        : {}),
    }));

  const profiles = items
    .filter((item) => item.schemaType === "ProfilePage")
    .map((item) => ({
      "@type": "ProfilePage",
      "@id": `${pageUrl}#${item.id}`,
      name: item.title,
      url: item.url,
      mainEntity: { "@id": `${pageUrl}#person` },
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "Organization",
        "@id": `${pageUrl}#org`,
        name: SITE_NAME,
        url: SITE_URL,
        founder: { "@id": `${pageUrl}#person` },
      },
      ...creativeWorks,
      ...profiles,
    ],
  };
}
