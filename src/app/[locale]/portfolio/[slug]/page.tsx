import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Link } from "@/i18n/navigation";
import { getPortfolioItem, PORTFOLIO } from "@/lib/profile";
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
  const prefix = locale === "en" ? "/en" : "";
  return {
    title: item.title,
    description: item.description ?? item.title,
    alternates: { canonical: absoluteUrl(`${prefix}/portfolio/${item.slug}`) },
  };
}

export default async function PortfolioProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  const hasCaseStudy = Boolean(item.description && item.solution && item.result);
  const isEn = locale === "en";

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <main className="section-band">
        <div className="container-editorial">
          <Link href="/#portfolio" className="text-link text-sm">
            ← {isEn ? "Case studies" : "Портфолио"}
          </Link>

          <div className="mt-6 max-w-3xl">
            <span className="badge-coral text-[10px]">{item.category}</span>
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

          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-xl border border-hairline bg-surface-card">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1152px"
              className="object-cover object-top"
              priority
            />
          </div>

          {hasCaseStudy ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <article className="feature-card md:col-span-3">
                <h2 className="font-display text-xl tracking-tight text-ink">{isEn ? "Overview" : "Описание"}</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.description}</p>
              </article>
              <article className="feature-card">
                <h2 className="font-display text-xl tracking-tight text-ink">{isEn ? "Solution" : "Решение"}</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.solution}</p>
              </article>
              <article className="feature-card md:col-span-2">
                <h2 className="font-display text-xl tracking-tight text-ink">{isEn ? "Outcome" : "Результат"}</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.result}</p>
              </article>
            </div>
          ) : (
            <p className="mt-10 text-sm text-muted">{isEn ? "Detailed case study coming soon." : "Подробное описание проекта готовится."}</p>
          )}

          <div className="callout-coral mt-12">
            <h2 className="font-display text-2xl tracking-tight">{isEn ? "Want a similar solution?" : "Хотите похожее решение?"}</h2>
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
