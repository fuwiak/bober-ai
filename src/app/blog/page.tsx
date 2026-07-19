import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Блог об AI, RAG, Python и автоматизации",
  description:
    "Статьи Павла Стасиньски о RAG, LangChain, генеративном AI, Python, Solara, Streamlit и практической разработке AI-систем.",
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    type: "website",
    title: `Блог об AI и автоматизации | ${SITE_NAME}`,
    description: "Практические статьи об AI, RAG, Python и разработке приложений.",
    url: absoluteUrl("/blog"),
  },
};

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function BlogPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Блог ${SITE_NAME}`,
    url: absoluteUrl("/blog"),
    inLanguage: "ru-RU",
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      author: { "@type": "Person", name: "Павел Стасиньски" },
    })),
  };

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <span className="section-label">Блог {SITE_NAME}</span>
            <h1 className="section-title mt-4 max-w-4xl">Практика AI, Python и автоматизации</h1>
            <p className="body-copy mt-5 max-w-3xl text-lg">
              Русские версии моих статей о разработке AI-систем, работе с данными и инструментах для production.
              В каждом материале сохранена ссылка на оригинальную публикацию в Medium.
            </p>
          </div>
        </section>

        <section className="section-band section--panel">
          <div className="container-editorial grid gap-8 lg:grid-cols-3">
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
                      <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(post.publishedAt))}</time>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="card-title mt-4 text-2xl">{post.title}</h2>
                    <p className="body-copy mt-4 text-base">{post.description}</p>
                    <span className="text-link mt-6 inline-block text-xs uppercase tracking-[0.16em]">Читать статью →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
