import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_KEYWORDS, SITE_NAME, absoluteUrl } from "@/lib/site";
import type { AppLocale } from "@/i18n/routing";

const MEDIUM_URL = "https://medium.com/@stasinskipawel";
const HABR_URL = "https://habr.com/ru/users/fuwiak/articles/";


function getCopy(locale: AppLocale) {
  if (locale === "en") {
    return {
      pageBadge: `Blog ${SITE_NAME}`,
      title: "Posts & articles",
      intro:
        "A curated list of practical AI delivery notes: cloud LLMs, chatbots, private models, DevOps, and automation. For now, we show placeholders for latest Medium and Habr items.",
      home: "Home",
      mediumBadge: "Medium",
      mediumTitle: "Latest Medium posts",
      mediumProfile: "@stasinskipawel",
      mediumCta: "Open Medium",
      mediumCardLabel: (idx: number) => `Medium · post ${idx}`,
      mediumPlaceholderTitles: [
        "Latest Medium post will appear here",
        "Second Medium post will appear here",
        "Third Medium post will appear here",
      ],
      mediumPlaceholderDesc: "Medium sync will appear here.",
      habrBadge: "Habr",
      habrTitle: "Habr articles",
      habrProfile: "@fuwiak",
      habrCta: "Open Habr",
      habrCardLabel: (idx: number) => `Habr · article ${idx}`,
      habrPlaceholderTitles: [
        "Latest Habr article will appear here",
        "Second Habr article will appear here",
        "Third Habr article will appear here",
      ],
      habrPlaceholderDesc: "Habr sync will appear here.",
      metaTitle: `Blog ${SITE_NAME}`,
      metaDescription:
        `Posts by ${SITE_NAME} about enterprise AI delivery: cloud LLMs, private models, DevOps, and automation.`,
      inLanguage: "en-US",
    };
  }

  return {
    pageBadge: `Блог ${SITE_NAME}`,
    title: "Публикации и статьи",
    intro:
      "Здесь собираются материалы о практике внедрения AI: облачные LLM, чат-боты, приватные модели, DevOps и автоматизация. По умолчанию показываем последние посты с Medium и Habr.",
    home: "На главную",
    mediumBadge: "Medium",
    mediumTitle: "Последние посты с Medium",
    mediumProfile: "@stasinskipawel",
    mediumCta: "Открыть Medium",
    mediumCardLabel: (idx: number) => `Medium · пост ${idx}`,
    mediumPlaceholderTitles: [
      "Последний пост из Medium появится здесь",
      "Второй пост из Medium появится здесь",
      "Третий пост из Medium появится здесь",
    ],
    mediumPlaceholderDesc: "Автосинхронизация с профилем Medium появится здесь.",
    habrBadge: "Habr",
    habrTitle: "Статьи на Habr",
    habrProfile: "@fuwiak",
    habrCta: "Открыть Habr",
    habrCardLabel: (idx: number) => `Habr · статья ${idx}`,
    habrPlaceholderTitles: [
      "Последняя статья с Habr появится здесь",
      "Вторая статья с Habr появится здесь",
      "Третья статья с Habr появится здесь",
    ],
    habrPlaceholderDesc: "Автосинхронизация с профилем Habr появится здесь.",
    metaTitle: `Блог ${SITE_NAME}`,
    metaDescription:
      `Публикации ${SITE_NAME} о внедрении AI, облачных LLM, приватных моделях, DevOps и автоматизации.`,
    inLanguage: "ru-RU",
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: AppLocale }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = getCopy(locale);
  const path = locale === "en" ? "/en/blog" : "/blog";

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: [...DEFAULT_KEYWORDS, "AI blog", "LLM blog", "enterprise AI", "AI automation"],
    alternates: {
      canonical: absoluteUrl(path),
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: AppLocale }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);

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
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">{copy.pageBadge}</span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">{copy.title}</h1>
            <p className="mt-3 max-w-2xl text-on-surface-variant">{copy.intro}</p>
          </div>
          <Link
            href={locale === "en" ? "/en" : "/"}
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:bg-surface-container"
          >
            {copy.home}
          </Link>
        </div>

        <section className="mb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">{copy.mediumBadge}</span>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">{copy.mediumTitle}</h2>
              <p className="mt-2 text-on-surface-variant text-sm">
                Profile: <span className="font-semibold text-on-surface">{copy.mediumProfile}</span>
              </p>
            </div>
            <a
              href={MEDIUM_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-primary transition hover:opacity-90"
            >
              {copy.mediumCta}
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {copy.mediumPlaceholderTitles.map((title, idx) => (
              <a
                key={idx}
                href={MEDIUM_URL}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition hover:border-primary/40"
              >
                <div className="h-32 rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low grid place-items-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {copy.mediumCardLabel(idx + 1)}
                  </p>
                </div>
                <h3 className="mt-4 text-lg font-bold text-on-surface group-hover:text-primary">{title}</h3>
                <p className="mt-2 text-sm text-on-surface-variant">{copy.mediumPlaceholderDesc}</p>
              </a>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">{copy.habrBadge}</span>
              <h2 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight">{copy.habrTitle}</h2>
              <p className="mt-2 text-on-surface-variant text-sm">
                Profile: <span className="font-semibold text-on-surface">{copy.habrProfile}</span>
              </p>
            </div>
            <a
              href={HABR_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-primary transition hover:opacity-90"
            >
              {copy.habrCta}
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {copy.habrPlaceholderTitles.map((title, idx) => (
              <a
                key={idx}
                href={HABR_URL}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm transition hover:border-primary/40"
              >
                <div className="h-32 rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low grid place-items-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {copy.habrCardLabel(idx + 1)}
                  </p>
                </div>
                <h3 className="mt-4 text-lg font-bold text-on-surface group-hover:text-primary">{title}</h3>
                <p className="mt-2 text-sm text-on-surface-variant">{copy.habrPlaceholderDesc}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

