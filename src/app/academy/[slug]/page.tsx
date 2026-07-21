import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BareIntlShell } from "@/components/BareIntlShell";
import { ShellCodeBlock } from "@/components/ShellCodeBlock";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ACADEMY_POSTS, getAcademyPost } from "@/lib/academy-posts";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ACADEMY_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAcademyPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: absoluteUrl(`/academy/${post.slug}`) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: absoluteUrl(`/academy/${post.slug}`),
      publishedTime: post.publishedAt,
      images: [{ url: absoluteUrl(post.coverImage), alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [absoluteUrl(post.coverImage)],
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default async function AcademyArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getAcademyPost(slug);
  if (!post) notFound();

  const pageUrl = absoluteUrl(`/academy/${post.slug}`);
  const index = ACADEMY_POSTS.findIndex((item) => item.slug === post.slug);
  const prev = index > 0 ? ACADEMY_POSTS[index - 1] : null;
  const next = index < ACADEMY_POSTS.length - 1 ? ACADEMY_POSTS[index + 1] : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.summary,
    url: pageUrl,
    datePublished: post.publishedAt,
    inLanguage: "ru-RU",
    keywords: post.tags.join(", "),
    image: absoluteUrl(post.coverImage),
    author: { "@type": "Organization", name: SITE_NAME },
    isPartOf: { "@type": "Blog", name: `Практикум Yaga · ${SITE_NAME}`, url: absoluteUrl("/academy") },
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.title,
    description: post.summary,
    url: pageUrl,
    step: post.steps.map((text, stepIndex) => ({
      "@type": "HowToStep",
      position: stepIndex + 1,
      name: `Шаг ${stepIndex + 1}`,
      text,
    })),
  };

  return (
    <BareIntlShell>
      <div className="page-shell min-h-screen">
        <SiteHeader />
        <main>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
          <article>
            <header className="section-band section--deep border-b border-hairline">
              <div className="container-editorial max-w-3xl">
                <nav className="mb-8 text-sm text-muted">
                  <Link href="/academy" className="link-more">
                    ← Блог практикума
                  </Link>
                </nav>

                <div className="meta-label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                  <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(post.publishedAt))}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                  <span>·</span>
                  <span>Практикум Yaga</span>
                </div>
                <h1 className="display-md mt-4">{post.title}</h1>
                <p className="body-copy mt-5 text-lg text-body-strong">{post.lead}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hairline px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            <div className="section-band section--panel">
              <div className="container-editorial max-w-3xl">
                <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl bg-surface-soft">
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                  />
                </div>

                <div className="blog-article" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

                <section className="mt-14">
                  <h2 className="section-title mb-4">Шпаргалка команд</h2>
                  <ShellCodeBlock code={post.commands.join("\n")} label="bash · yaga" />
                </section>

                {post.note ? (
                  <aside className="mt-8 rounded-2xl border border-hairline bg-surface-soft px-5 py-4 text-sm text-muted">
                    <p className="meta-label mb-2 text-ink">Важно</p>
                    <p>{post.note}</p>
                  </aside>
                ) : null}

                <footer className="mt-10 rounded-2xl border border-dashed border-hairline px-5 py-4 text-sm text-muted">
                  Не официальная программа Яндекса — внутренний практикум {SITE_NAME} по фактам из{" "}
                  <code className="rounded bg-canvas px-1.5 py-0.5 text-[0.85em]">cli/yaga</code>.
                </footer>

                <nav className="mt-14 grid gap-4 border-t border-hairline pt-8 sm:grid-cols-2">
                  {prev ? (
                    <Link
                      href={`/academy/${prev.slug}`}
                      className="rounded-2xl border border-hairline p-4 transition hover:border-primary/40"
                    >
                      <span className="meta-label text-muted">← Предыдущая</span>
                      <p className="mt-2 font-bold text-ink">{prev.title}</p>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <Link
                      href={`/academy/${next.slug}`}
                      className="rounded-2xl border border-hairline p-4 text-right transition hover:border-primary/40"
                    >
                      <span className="meta-label text-muted">Следующая →</span>
                      <p className="mt-2 font-bold text-ink">{next.title}</p>
                    </Link>
                  ) : null}
                </nav>
              </div>
            </div>
          </article>
        </main>
        <SiteFooter />
      </div>
    </BareIntlShell>
  );
}
