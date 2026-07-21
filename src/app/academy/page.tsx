import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BareIntlShell } from "@/components/BareIntlShell";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ACADEMY_POSTS } from "@/lib/academy-posts";
import { DEFAULT_KEYWORDS, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Блог практикума Yaga",
  description: `Практические статьи ${SITE_NAME} по Yandex API и CLI yaga: установка, OAuth, SEO Вебмастера, переобход, профили и Метрика.`,
  keywords: [
    ...DEFAULT_KEYWORDS,
    "yaga CLI",
    "Yandex Webmaster",
    "OAuth Яндекс",
    "переобход страниц",
    "Яндекс Метрика CLI",
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
      "Блог практикума по Yandex API и CLI yaga: установка, OAuth, SEO-чеклист, переобход, профили bricks и Метрика.",
    inLanguage: "ru-RU",
    blogPost: ACADEMY_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.summary,
      url: absoluteUrl(`/academy/${post.slug}`),
      datePublished: post.publishedAt,
      keywords: post.tags.join(", "),
      image: absoluteUrl(post.coverImage),
    })),
  };

  return (
    <BareIntlShell>
      <div className="page-shell min-h-screen">
        <SiteHeader />
        <main>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
          <section className="section-band section--deep border-b border-hairline">
            <div className="container-editorial max-w-5xl">
              <span className="section-label">Блог практикума</span>
              <h1 className="display-md mt-4">Yaga · Yandex CLI</h1>
              <p className="body-copy mt-4 max-w-2xl text-lg">
                Редакционные туториалы по фактам из{" "}
                <code className="rounded bg-surface-soft px-1.5 py-0.5 text-sm">cli/yaga</code>
                : установка, OAuth, SEO Вебмастера, переобход, профили и Метрика. Не официальная программа
                Яндекса — внутренний практикум Bober AI.
              </p>
            </div>
          </section>

          <section className="section-band section--panel">
            <div className="container-editorial max-w-5xl grid gap-6">
              {ACADEMY_POSTS.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/academy/${post.slug}`}
                  className="group grid overflow-hidden rounded-2xl border border-hairline bg-canvas transition hover:border-primary/40 md:grid-cols-[220px_1fr]"
                >
                  <div className="relative aspect-[16/10] bg-surface-soft md:aspect-auto md:min-h-full">
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 220px"
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <div className="meta-label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                      <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(post.publishedAt))}</time>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="card-title mt-3 text-2xl transition group-hover:text-primary">{post.title}</h2>
                    <p className="body-copy mt-2 text-base">{post.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="link-more mt-5">Читать</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </BareIntlShell>
  );
}
