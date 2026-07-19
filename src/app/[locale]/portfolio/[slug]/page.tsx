import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Link } from "@/i18n/navigation";
import { getPortfolioItem, PORTFOLIO, PROFILE } from "@/lib/profile";
import { articleJsonLd, breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["ru", "en"]) {
    for (const item of PORTFOLIO) {
      params.push({ locale, slug: item.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return {};

  return buildPageMetadata({
    title: item.title,
    description: item.description ?? item.title,
    path: `/portfolio/${item.slug}`,
    locale,
    ogType: "article",
    article: {
      authors: [PROFILE.name],
      section: locale === "en" ? "Case studies" : "Кейсы",
      tags: item.skills?.slice(0, 6),
    },
  });
}

export default async function PortfolioProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  const hasCaseStudy = Boolean(item.description && item.solution && item.result);
  const isEn = locale === "en";
  const prefix = isEn ? "/en" : "";
  const pageUrl = absoluteUrl(`${prefix}/portfolio/${item.slug}`);
  const portfolioLabel = isEn ? "Case studies" : "Портфолио";

  const articleText = [item.description, item.solution, item.result, item.stack, ...(item.skills ?? [])]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const breadcrumb = breadcrumbJsonLd([
    { name: isEn ? "Home" : "Главная", url: absoluteUrl(prefix || "/") },
    { name: portfolioLabel, url: absoluteUrl(`${prefix}/portfolio`) },
    { name: item.title, url: pageUrl },
  ]);

  const articleSchema = hasCaseStudy
      ? articleJsonLd({
          type: "Article",
          url: pageUrl,
          fragmentId: "article",
          headline: item.title,
          text: articleText.length >= 500 ? articleText : `${item.title}. ${articleText}`,
          description: item.description,
          authorName: PROFILE.name,
          about: [item.category, ...(item.skills?.slice(0, 4) ?? [])],
          image: item.image,
          inLanguage: isEn ? "en-US" : "ru-RU",
        })
      : null;

  return (
    <div className="min-h-screen bg-canvas">
      {articleSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <SiteHeader />
      <main className="section-band">
        <div className="container-editorial">
          <Link href="/portfolio" className="link-back">
            {portfolioLabel}
          </Link>

          <article id="article">
            <div className="mt-6 max-w-3xl">
              <span className="badge-accent text-[10px]">{item.category}</span>
              <h1 className="display-md mt-4">{item.title}</h1>
              {item.priceLabel ? (
                <p className="mt-3 font-display text-2xl tracking-tight text-ink">{item.priceLabel}</p>
              ) : null}
              {item.skills?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span key={skill} className="badge-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <EditorialImageFrame variant="card" className="mt-10 aspect-[16/10] rounded-xl border border-hairline bg-surface-card">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1152px"
                className="case-study__image"
                priority
              />
            </EditorialImageFrame>

            {hasCaseStudy ? (
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                <div className="feature-card">
                  <h2 className="font-display text-xl tracking-tight text-ink">{isEn ? "Problem" : "Проблема"}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-body">{item.description}</p>
                </div>
                <div className="feature-card">
                  <h2 className="font-display text-xl tracking-tight text-ink">{isEn ? "Solution" : "Решение"}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-body">{item.solution}</p>
                </div>
                <div className="feature-card">
                  <h2 className="font-display text-xl tracking-tight text-ink">{isEn ? "Result" : "Результат"}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-body">{item.result}</p>
                </div>
              </div>
            ) : (
              <p className="mt-10 text-sm text-muted">{isEn ? "Detailed case study coming soon." : "Подробное описание проекта готовится."}</p>
            )}
          </article>

          <div className="callout-accent mt-12">
            <h2 className="font-display text-2xl tracking-tight">{isEn ? "Similar solution for your business" : "Похожее решение для вашего бизнеса"}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-primary/90">
              {isEn
                ? "Describe your scope — we will propose architecture, timeline, and estimate."
                : "Расскажите о задаче — предложим архитектуру, сроки и оценку внедрения."}
            </p>
            <Link href="/#contact" className="btn-inverted mt-6 inline-block">
              {isEn ? "Request a quote" : "Обсудить проект"}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
