import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getPortfolioItem, PORTFOLIO } from "@/lib/profile";
import { getOrderTelegramUrl } from "@/lib/services-feed";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PORTFOLIO.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description ?? item.title,
    alternates: {
      canonical: absoluteUrl(`/portfolio/${item.slug}`),
    },
  };
}

export default async function PortfolioProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  const hasCaseStudy = Boolean(item.description && item.solution && item.result);

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <main className="section-band">
        <div className="container-editorial">
          <Link href="/#portfolio" className="text-link text-sm">
            ← Портфолио
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
                <h2 className="font-display text-xl tracking-tight text-ink">Описание</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.description}</p>
              </article>
              <article className="feature-card">
                <h2 className="font-display text-xl tracking-tight text-ink">Решение</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.solution}</p>
              </article>
              <article className="feature-card md:col-span-2">
                <h2 className="font-display text-xl tracking-tight text-ink">Результат</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.result}</p>
              </article>
            </div>
          ) : (
            <p className="mt-10 text-sm text-muted">Подробное описание проекта готовится.</p>
          )}

          <div className="callout-coral mt-12">
            <h2 className="font-display text-2xl tracking-tight">Хотите похожее решение?</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-on-primary/90">
              Расскажите о задаче — предложу архитектуру, сроки и оценку внедрения.
            </p>
            <a
              href={getOrderTelegramUrl(item.title)}
              target="_blank"
              rel="noreferrer"
              className="btn-inverted mt-6"
            >
              Обсудить проект
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
