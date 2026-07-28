import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Link } from "@/i18n/navigation";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { getAllIntentArticles } from "@/lib/seo-catalog";
import type { IntentArticleSpec } from "@/lib/seo-catalog/types";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const MEDIUM_URL = "https://medium.com/@stasinskipawel";
const HABR_URL = "https://habr.com/ru/users/fuwiak/articles/";

type Locale = "ru" | "en";

type TopicDef = {
  id: string;
  title: string;
  blurb: string;
  match: (article: IntentArticleSpec) => boolean;
};

const dateFormatterRu = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const dateFormatterEn = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function copy(locale: Locale) {
  if (locale === "en") {
    return {
      badge: `${SITE_NAME} blog`,
      h1: "Business automation, CRM and AI — practical articles",
      intro: [
        "This blog answers real owner and ops search queries: how to cut costs, automate sales, implement CRM so the team actually uses it, speed up document flow, and when AI or RAG is worth the investment.",
        "Each piece starts from a concrete problem — lost leads, copy-paste between systems, stalled deals — then gives a 4-week plan and a realistic cost range. No demo theatre: architecture, metrics and handoff.",
        "Use the topic blocks below to jump to the intent that matches your query, or browse the full list of articles for business owners and specialists.",
      ],
      topicsTitle: "Topics by search intent",
      topics: [
        {
          id: "automation",
          title: "Business process automation",
          blurb:
            "Where automation removes hours of manual work, how to calculate ROI before buying a tool, and what to pilot first.",
          match: (a: IntentArticleSpec) =>
            /avtomatiz|rashod|ruchn|shtat|roi|process/i.test(a.slug) ||
            a.keywords.some((k) => /автоматиз|расход|ручн|roi/i.test(k)),
        },
        {
          id: "crm-sales",
          title: "CRM, sales and follow-up",
          blurb:
            "amoCRM and Bitrix24 adoption, lead capture, proposal generation, funnel automation and sales KPIs.",
          match: (a: IntentArticleSpec) =>
            /crm|prodazh|lid|kp|voronk|amocrm|bitrix|sales/i.test(a.slug) ||
            a.keywords.some((k) => /crm|продаж|лид|воронк/i.test(k)),
        },
        {
          id: "docs-support",
          title: "Documents, support and integrations",
          blurb:
            "Document pipelines, approvals, support SLA, 1C/CRM links, Telegram and API integrations without copy-paste.",
          match: (a: IntentArticleSpec) =>
            /dokument|podderzh|1c|telegram|api|edo|soglasov|integr/i.test(a.slug) ||
            a.keywords.some((k) => /документ|поддерж|1с|интеграц|api/i.test(k)),
        },
        {
          id: "ai-rag",
          title: "AI, RAG and agents",
          blurb:
            "When you need an LLM vs plain automation, RAG over policies, MCP vs API, secure contours and production agents.",
          match: (a: IntentArticleSpec) =>
            a.cluster === "specialist-ai-architecture" ||
            /ai|rag|llm|agent|mcp|knowledge|on-prem|152/i.test(a.slug) ||
            a.keywords.some((k) => /\bai\b|rag|llm|агент|баз[аы] знан/i.test(k)),
        },
      ] satisfies TopicDef[],
      legacyTitle: "Engineering notes (Medium)",
      legacyIntro:
        "Russian versions of longer engineering write-ups on RAG, LangChain, Python tooling and production AI systems — each with a link to the original Medium post.",
      intentTitle: "Answers for business owners",
      intentIntro:
        "Articles mapped to Yandex Wordstat-style queries: automation, CRM, documents, sales, support and AI ROI.",
      allTitle: "All articles",
      readMore: "Read article",
      externalTitle: "Also published on",
      faqLabel: "FAQ",
      faqTitle: "What this blog covers",
      faqSubtitle: "Short answers to the queries people type before they open an article.",
      faq: [
        {
          q: "What is this blog about?",
          a: `Practical guides from ${SITE_NAME} on business automation, CRM rollout, document workflows and AI/RAG systems — written for owners and ops leads who need a plan and a budget range, not a product pitch.`,
        },
        {
          q: "How is this different from a CRM or AI vendor blog?",
          a: "We start from the process failure (lost lead, manual invoice, unread policy PDF), then pick the tool — amoCRM, Bitrix24, 1C, n8n or an LLM — only when it closes that failure. Many articles explicitly say when AI is unnecessary.",
        },
        {
          q: "Where should I start if I search for business process automation?",
          a: "Start with cost-cutting and sales automation pieces, then CRM adoption and document pipelines. Specialist RAG/MCP articles are for teams that already have structured data and a clear use case.",
        },
        {
          q: "Do you cover Russian stack and compliance?",
          a: "Yes: Bitrix24, amoCRM, 1C, ЭДО-style document flow, on-prem/LLM contours and 152-FZ considerations appear across the owner-intent and architecture articles.",
        },
      ],
      breadcrumb: "Blog",
      metaTitle: "Blog — business automation, CRM and AI",
      metaDescription:
        "Practical articles for owners: how to automate sales and documents, implement CRM, cut costs, and when RAG or AI agents are worth it. Plans, budgets and architecture from Bober AI Systems.",
    };
  }

  return {
    badge: `Блог ${SITE_NAME}`,
    h1: "Автоматизация бизнеса, CRM и AI — статьи и разборы",
    intro: [
      "Блог отвечает на реальные запросы владельцев и руководителей: как сократить расходы, автоматизировать продажи, внедрить CRM так, чтобы ей пользовались, ускорить документооборот и понять, когда AI или RAG реально окупаются.",
      "Каждый материал начинается с конкретной боли — потерянные лиды, копипаст между системами, зависшие сделки — и даёт план на 4 недели плюс вилку бюджета. Без демо «ради демо»: архитектура, метрики и передача команде.",
      "Ниже — блоки по поисковым интентам (автоматизация, CRM, документы, AI). Можно сразу перейти к теме запроса или листать полный список статей.",
    ],
    topicsTitle: "Темы по поисковым запросам",
    topics: [
      {
        id: "automation",
        title: "Автоматизация бизнес-процессов",
        blurb:
          "Где автоматизация снимает часы ручной работы, как считать ROI до покупки инструмента и какой процесс пилотировать первым.",
        match: (a: IntentArticleSpec) =>
          /avtomatiz|rashod|ruchn|shtat|roi|process|nachat|stoimost|oshibk|skryt/i.test(a.slug) ||
          a.keywords.some((k) => /автоматиз|расход|ручн|roi|процесс/i.test(k)),
      },
      {
        id: "crm-sales",
        title: "CRM, продажи и follow-up",
        blurb:
          "Внедрение amoCRM и Bitrix24, захват лидов, коммерческие предложения, воронка и KPI отдела продаж.",
        match: (a: IntentArticleSpec) =>
          /crm|prodazh|lid|kp|voronk|amocrm|bitrix|sales|ceo|excel/i.test(a.slug) ||
          a.keywords.some((k) => /crm|продаж|лид|воронк|коммерческ/i.test(k)),
      },
      {
        id: "docs-support",
        title: "Документы, поддержка и интеграции",
        blurb:
          "Документооборот, согласования, SLA поддержки, связка CRM и 1С, Telegram и API без ручного переноса данных.",
        match: (a: IntentArticleSpec) =>
          /dokument|podderzh|1c|telegram|api|edo|soglasov|integr|hr|onbord|n8n/i.test(a.slug) ||
          a.keywords.some((k) => /документ|поддерж|1с|интеграц|api|telegram/i.test(k)),
      },
      {
        id: "ai-rag",
        title: "AI, RAG и агенты",
        blurb:
          "Когда нужен LLM, а когда хватит обычной автоматизации; RAG по регламентам; MCP vs API; безопасный контур и агенты в продажах.",
        match: (a: IntentArticleSpec) =>
          a.cluster === "specialist-ai-architecture" ||
          a.cluster === "buyer-decision" ||
          /ai|rag|llm|agent|mcp|knowledge|on-prem|152|ii|neyro/i.test(a.slug) ||
          a.keywords.some((k) => /\bai\b|rag|llm|агент|баз[аы] знан|ии\b/i.test(k)),
      },
    ] satisfies TopicDef[],
    legacyTitle: "Инженерные разборы (Medium)",
    legacyIntro:
      "Русские версии длинных материалов о RAG, LangChain, Python и production AI-системах — в каждом сохранена ссылка на оригинал в Medium.",
    intentTitle: "Ответы на вопросы владельцев бизнеса",
    intentIntro:
      "Практические статьи по формулировкам из Яндекс Wordstat: автоматизация, CRM, документы, продажи, поддержка и ROI от AI.",
    allTitle: "Все статьи блога",
    readMore: "Читать статью",
    externalTitle: "Также публикуемся на",
    faqLabel: "FAQ",
    faqTitle: "На какие вопросы отвечает блог",
    faqSubtitle: "Короткие ответы на запросы, с которых обычно начинают поиск.",
    faq: [
      {
        q: "О чём этот блог?",
        a: `Практические статьи ${SITE_NAME} про автоматизацию бизнеса, внедрение CRM, документооборот и AI/RAG-системы — для владельцев и операционных руководителей, которым нужны план и вилка бюджета, а не рекламный лендинг продукта.`,
      },
      {
        q: "Чем это отличается от блога вендора CRM или AI?",
        a: "Сначала фиксируем сбой процесса (потерянный лид, ручной счёт, регламент, который никто не находит), потом выбираем инструмент — amoCRM, Bitrix24, 1С, n8n или LLM — только если он закрывает этот сбой. Во многих материалах прямо сказано, когда AI не нужен.",
      },
      {
        q: "С чего начать, если ищете «автоматизация бизнес-процессов»?",
        a: "С статей про сокращение расходов и автоматизацию продаж, затем внедрение CRM и документы. Специализированные материалы про RAG и MCP — для команд, у которых уже есть данные и понятный сценарий.",
      },
      {
        q: "Есть ли материалы про российский стек и 152-ФЗ?",
        a: "Да: Bitrix24, amoCRM, 1С, документооборот, on-prem/LLM-контур и требования 152-ФЗ разбираются в статьях для владельцев и в архитектурных разборах.",
      },
    ],
    breadcrumb: "Блог",
    metaTitle: "Блог об автоматизации бизнеса, CRM и AI",
    metaDescription:
      "Статьи для владельцев: как автоматизировать продажи и документы, внедрить CRM, сократить расходы и когда окупаются RAG и AI-агенты. Планы, бюджеты и архитектура от Bober AI Systems.",
  };
}

export function getBlogIndexMeta(locale: Locale) {
  const c = copy(locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: [
      "блог автоматизация бизнеса",
      "как автоматизировать продажи",
      "как внедрить crm",
      "автоматизация бизнес процессов",
      "RAG для бизнеса",
      "AI агент продажи",
      "документооборот автоматизация",
      SITE_NAME,
    ],
  };
}

export function BlogIndexView({ locale }: { locale: Locale }) {
  const c = copy(locale);
  const articles = getAllIntentArticles();
  const pageUrl = absoluteUrl(locale === "en" ? "/en/blog" : "/blog");
  const dateFmt = locale === "en" ? dateFormatterEn : dateFormatterRu;

  const topicBlocks = c.topics.map((topic) => ({
    ...topic,
    items: articles.filter(topic.match).slice(0, 8),
  }));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: c.h1,
    description: c.metaDescription,
    url: pageUrl,
    inLanguage: locale === "en" ? "en-US" : "ru-RU",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: absoluteUrl("/") },
    about: [
      "автоматизация бизнес-процессов",
      "внедрение CRM",
      "AI и RAG для бизнеса",
      "документооборот",
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: BLOG_POSTS.length + articles.length,
      itemListElement: [
        ...BLOG_POSTS.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: absoluteUrl(`/blog/${post.slug}`),
          name: post.title,
        })),
        ...articles.map((article, index) => ({
          "@type": "ListItem",
          position: BLOG_POSTS.length + index + 1,
          url: absoluteUrl(locale === "en" ? `/en/blog/${article.slug}` : `/blog/${article.slug}`),
          name: article[locale].title,
        })),
      ],
    },
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: c.badge,
    url: pageUrl,
    description: c.metaDescription,
    inLanguage: locale === "en" ? "en-US" : "ru-RU",
    publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    blogPost: [
      ...BLOG_POSTS.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.publishedAt,
        author: { "@type": "Person", name: "Павел Стасиньски" },
      })),
      ...articles.map((article) => ({
        "@type": "BlogPosting",
        headline: article[locale].title,
        url: absoluteUrl(locale === "en" ? `/en/blog/${article.slug}` : `/blog/${article.slug}`),
        datePublished: article.publishedAt,
        author: { "@type": "Person", name: "Павел Стасиньски" },
      })),
    ],
  };

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />

        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Breadcrumbs locale={locale} items={[{ name: c.breadcrumb, path: "/blog" }]} />
            <span className="section-label mt-2 inline-block">{c.badge}</span>
            <h1 className="section-title mt-4 max-w-4xl">{c.h1}</h1>
            <div className="mt-5 max-w-3xl space-y-4">
              {c.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="body-copy text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline" aria-labelledby="blog-topics">
          <div className="container-editorial">
            <h2 id="blog-topics" className="section-title max-w-3xl">
              {c.topicsTitle}
            </h2>
            <div className="mt-10 space-y-12">
              {topicBlocks.map((topic) => (
                <div key={topic.id} id={topic.id}>
                  <h3 className="font-display text-2xl tracking-tight text-ink">{topic.title}</h3>
                  <p className="body-copy mt-3 max-w-3xl text-base">{topic.blurb}</p>
                  <ul className="mt-5 grid gap-3 md:grid-cols-2">
                    {topic.items.map((article) => (
                      <li key={`${topic.id}-${article.slug}`}>
                        <Link
                          href={`/blog/${article.slug}`}
                          className="block border border-hairline bg-panel p-4 transition hover:border-ink/30"
                        >
                          <span className="font-medium text-ink">{article[locale].title}</span>
                          <span className="mt-2 block text-sm text-muted">{article[locale].description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <h2 className="section-title max-w-3xl">{c.legacyTitle}</h2>
            <p className="body-copy mt-4 max-w-3xl">{c.legacyIntro}</p>
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <article key={post.slug} className="card-kts overflow-hidden rounded-2xl border border-hairline bg-canvas">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover"
                    />
                    <div className="p-6">
                      <div className="meta-label flex flex-wrap gap-x-3 gap-y-1 text-muted">
                        <time dateTime={post.publishedAt}>{dateFmt.format(new Date(post.publishedAt))}</time>
                        <span>·</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h3 className="card-title mt-4 text-2xl">{post.title}</h3>
                      <p className="body-copy mt-4 text-base">{post.description}</p>
                      <span className="link-more mt-6">{c.readMore}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial">
            <h2 className="section-title max-w-3xl">{c.intentTitle}</h2>
            <p className="body-copy mt-4 max-w-3xl">{c.intentIntro}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="block border border-hairline bg-panel p-5 transition hover:border-ink/30"
                >
                  <h3 className="font-medium text-ink">{article[locale].title}</h3>
                  <p className="mt-2 text-sm text-muted">{article[locale].description}</p>
                  <p className="mt-3 text-xs text-muted-soft">{article.publishedAt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FaqSection
          label={c.faqLabel}
          title={c.faqTitle}
          subtitle={c.faqSubtitle}
          items={c.faq}
          pageUrl={pageUrl}
        />

        <section className="section-band">
          <div className="container-editorial border-t border-hairline pt-8">
            <p className="text-sm text-muted">{c.externalTitle}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <a href={MEDIUM_URL} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                Medium
              </a>
              <a href={HABR_URL} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                Habr
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
