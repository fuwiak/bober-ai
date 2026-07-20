import type { Metadata } from "next";
import Link from "next/link";
import { ACADEMY_POSTS } from "@/lib/academy-posts";
import { DEFAULT_KEYWORDS, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Блог практикума Yaga",
  description: `Практические статьи ${SITE_NAME} по Yandex API и CLI yaga: установка, OAuth, SEO Вебмастера и переобход.`,
  keywords: [
    ...DEFAULT_KEYWORDS,
    "yaga CLI",
    "Yandex Webmaster",
    "OAuth Яндекс",
    "переобход страниц",
  ],
  alternates: {
    canonical: absoluteUrl("/academy"),
  },
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function AcademyIndexPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Практикум Yaga · ${SITE_NAME}`,
    url: absoluteUrl("/academy"),
    description:
      "Блог практикума по Yandex API и CLI yaga: установка, OAuth, SEO-чеклист и безопасный переобход.",
    inLanguage: "ru-RU",
    blogPost: ACADEMY_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      url: absoluteUrl(`/academy/${post.slug}`),
      datePublished: post.publishedAt,
      keywords: post.tags.join(", "),
    })),
  };

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-primary font-bold uppercase tracking-widest text-xs font-body">
              Блог практикума
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Yaga · Yandex CLI</h1>
            <p className="mt-3 text-on-surface-variant">
              Отдельные туториалы по фактам из{" "}
              <code className="rounded bg-surface-container-low px-1.5 py-0.5 text-sm">cli/yaga</code>
              . Не официальная программа Яндекса — внутренний практикум Bober AI.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-outline-variant/30 bg-surface-container-low px-4 py-2 text-sm font-bold uppercase tracking-widest text-on-surface transition hover:bg-surface-container"
          >
            На главную
          </Link>
        </div>

        <div className="grid gap-5">
          {ACADEMY_POSTS.map((post, index) => (
            <Link
              key={post.slug}
              href={`/academy/${post.slug}`}
              className="group block rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 md:p-7 transition hover:border-primary/40 hover:bg-surface-container-low"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
                <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(post.publishedAt))}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-3 text-xl md:text-2xl font-bold text-on-surface group-hover:text-primary transition">
                {post.title}
              </h2>
              <p className="mt-2 text-sm md:text-base text-on-surface-variant">{post.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-outline-variant/30 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-block text-sm font-bold uppercase tracking-widest text-primary">
                Читать →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
