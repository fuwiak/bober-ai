import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BareIntlShell } from "@/components/BareIntlShell";
import { IntentArticlePage } from "@/components/IntentArticlePage";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";
import { getAllIntentArticles, getIntentArticle } from "@/lib/seo-catalog";
import { articleJsonLd, breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

// Русские URL /blog/* обрабатываются вне next-intl (см. middleware),
// поэтому здесь отдаём и посты из Medium, и интентные статьи каталога.
export function generateStaticParams() {
  return [
    ...BLOG_POSTS.map((post) => ({ slug: post.slug })),
    ...getAllIntentArticles().map((article) => ({ slug: article.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    const article = getIntentArticle(slug);
    if (!article) return {};
    return buildPageMetadata({
      title: article.ru.title,
      description: article.ru.description,
      keywords: article.keywords,
      path: `/blog/${slug}`,
      locale: "ru",
    });
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.publishedAt,
      authors: ["Павел Стасиньски"],
      images: [{ url: post.coverImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    const article = getIntentArticle(slug);
    if (!article) notFound();
    return (
      <BareIntlShell>
        <IntentArticlePage article={article} locale="ru" />
      </BareIntlShell>
    );
  }

  const pageUrl = absoluteUrl(`/blog/${post.slug}`);
  const plainText = post.contentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const jsonLd = articleJsonLd({
    type: "BlogPosting",
    url: pageUrl,
    headline: post.title,
    text: plainText,
    description: post.description,
    authorName: "Павел Стасиньски",
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    about: post.tags,
    image: post.coverImage,
    inLanguage: "ru-RU",
  });
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: absoluteUrl("/") },
    { name: "Блог", url: absoluteUrl("/blog") },
    { name: post.title, url: pageUrl },
  ]);

  return (
    <BareIntlShell>
      <div className="page-shell min-h-screen">
        <SiteHeader />
        <main>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
          <article>
            <header className="section-band section--deep border-b border-hairline">
              <div className="container-editorial max-w-4xl">
                <Link href="/blog" className="text-link text-sm">
                  ← Все статьи
                </Link>
                <div className="meta-label mt-8 flex flex-wrap gap-x-3 gap-y-2 text-muted">
                  <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(post.publishedAt))}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h1 className="section-title mt-5">{post.title}</h1>
                <p className="body-copy mt-5 max-w-3xl text-lg">{post.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-hairline px-3 py-1 text-xs text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            <div className="section-band section--panel">
              <div className="container-editorial max-w-4xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.coverImage} alt={post.title} className="mb-12 aspect-[16/9] w-full rounded-2xl object-cover" />
                <div className="blog-article" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                <footer className="mt-14 border-t border-hairline pt-8">
                  <p className="meta-label">Источник и оригинал</p>
                  <p className="body-copy mt-3 text-base">
                    Это русская версия авторской статьи Павла Стасиньски. Оригинал опубликован на Medium.
                  </p>
                  <a href={post.originalUrl} target="_blank" rel="author noreferrer" className="text-link mt-5 inline-block">
                    Читать оригинал на Medium →
                  </a>
                </footer>
              </div>
            </div>
          </article>
        </main>
        <SiteFooter />
      </div>
    </BareIntlShell>
  );
}
