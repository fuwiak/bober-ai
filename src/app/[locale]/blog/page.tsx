import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { getAllIntentArticles } from "@/lib/seo-catalog";
import { DEFAULT_KEYWORDS, SITE_NAME, absoluteUrl } from "@/lib/site";

const MEDIUM_URL = "https://medium.com/@stasinskipawel";
const HABR_URL = "https://habr.com/ru/users/fuwiak/articles/";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function getCopy(locale: AppLocale) {
  if (locale === "en") {
    return {
      pageBadge: `Blog ${SITE_NAME}`,
      title: "Guides for business owners",
      intro:
        "Practical answers to questions from Yandex Wordstat: how to cut costs, automate sales, implement CRM, and when AI actually helps.",
      home: "Home",
      articlesTitle: "Owner intent articles",
      externalTitle: "Also published on",
      mediumCta: "Medium",
      habrCta: "Habr",
      metaTitle: "Blog — automation and AI for business",
      metaDescription:
        "Articles answering real owner search queries: automation, CRM, documents, sales, support and AI ROI.",
      inLanguage: "en-US",
    };
  }

  return {
    pageBadge: `Блог ${SITE_NAME}`,
    title: "Статьи для владельца бизнеса",
    intro:
      "Практические ответы на запросы из Яндекс Wordstat: как сократить расходы, автоматизировать продажи, внедрить CRM и когда AI реально помогает.",
    home: "На главную",
    articlesTitle: "Статьи по интентам владельца",
    externalTitle: "Также публикуемся на",
    mediumCta: "Medium",
    habrCta: "Habr",
    metaTitle: "Блог — автоматизация и AI для бизнеса",
    metaDescription:
      "Статьи по реальным запросам владельцев: автоматизация, CRM, документы, продажи, поддержка и ROI от AI.",
    inLanguage: "ru-RU",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getCopy(locale);
  const path = locale === "en" ? "/en/blog" : "/blog";

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: [
      ...DEFAULT_KEYWORDS,
      "как автоматизировать продажи",
      "как внедрить crm",
      "как сократить расходы",
    ],
    alternates: {
      canonical: absoluteUrl(path),
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: AppLocale }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);
  const loc = locale === "en" ? "en" : "ru";
  const articles = getAllIntentArticles();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl(locale === "en" ? "/en" : "/") },
      { "@type": "ListItem", position: 2, name: copy.pageBadge, item: absoluteUrl(locale === "en" ? "/en/blog" : "/blog") },
    ],
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: copy.pageBadge,
    url: absoluteUrl(locale === "en" ? "/en/blog" : "/blog"),
    description: copy.metaDescription,
    inLanguage: copy.inLanguage,
  };

  return (
    <>
      <SiteHeader />
      <main className="section-band">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />

        <div className="container-editorial">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{copy.pageBadge}</p>
              <h1 className="mt-2 display-title">{copy.title}</h1>
              <p className="mt-4 max-w-2xl text-muted">{copy.intro}</p>
            </div>
            <Link href="/" className="link-back">
              {copy.home}
            </Link>
          </div>

          <h2 className="font-display text-2xl">{copy.articlesTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {articles.map((article) => {
              const item = article[loc];
              return (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="block border border-hairline bg-panel p-5 transition hover:border-ink/30"
                >
                  <h3 className="font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                  <p className="mt-3 text-xs text-muted-soft">{article.publishedAt}</p>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 border-t border-hairline pt-8">
            <p className="text-sm text-muted">{copy.externalTitle}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <a href={MEDIUM_URL} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                {copy.mediumCta}
              </a>
              <a href={HABR_URL} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                {copy.habrCta}
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
