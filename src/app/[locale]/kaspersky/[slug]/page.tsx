import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  getAllKasperskyProductSlugs,
  getKasperskyProduct,
  KASPERSKY_PRODUCTS,
} from "@/lib/kaspersky-page";
import { buildPageMetadata } from "@/lib/seo";
import { TELEGRAM_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of getAllKasperskyProductSlugs()) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getKasperskyProduct(slug);
  if (!product) return {};
  const ru = locale !== "en";
  return buildPageMetadata({
    title: ru ? product.metaTitleRu : product.metaTitleEn,
    description: ru ? product.metaDescRu : product.metaDescEn,
    path: `/kaspersky/${slug}`,
    locale,
  });
}

export default async function KasperskyProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getKasperskyProduct(slug);
  if (!product) notFound();
  const ru = locale !== "en";

  const others = KASPERSKY_PRODUCTS.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <main>
        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Breadcrumbs
              locale={locale}
              items={[
                { name: "Secure AI", path: "/secure-ai" },
                { name: "Kaspersky", path: "/kaspersky" },
                { name: ru ? product.titleRu : product.titleEn, path: `/kaspersky/${slug}` },
              ]}
            />
            <span className="badge-accent mt-2 inline-block text-[10px]">
              {ru ? product.badgeRu : product.badgeEn}
            </span>
            <h1 className="display-md mt-4">{ru ? product.titleRu : product.titleEn}</h1>
            <p className="mt-4 text-base leading-relaxed text-body">
              {ru ? product.summaryRu : product.summaryEn}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kaspersky#contact" className="btn-primary">
                {ru ? "Обсудить проект" : "Discuss the project"}
              </Link>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                Telegram
              </a>
              <Link href="/kaspersky" className="btn-secondary">
                {ru ? "Все линии Kaspersky" : "All Kaspersky lines"}
              </Link>
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">
              {ru ? "Что клиент покупает" : "What the client buys"}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-body">
              {(ru ? product.clientBuysRu : product.clientBuysEn).map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="section-title text-xl">Bober AI Systems</h2>
              <ul className="mt-4 space-y-2 text-sm text-body">
                {(ru ? product.boberScopeRu : product.boberScopeEn).map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="section-title text-xl">Kaspersky</h2>
              <ul className="mt-4 space-y-2 text-sm text-body">
                {(ru ? product.kasperskyScopeRu : product.kasperskyScopeEn).map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? "Архитектура" : "Architecture"}</h2>
            <ol className="mt-6 space-y-3 text-sm text-body">
              {(ru ? product.architectureRu : product.architectureEn).map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="font-display text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-body">{ru ? product.fitRu : product.fitEn}</p>
            {product.relatedHref ? (
              <p className="mt-4 text-sm">
                <Link href={product.relatedHref} className="text-link">
                  {ru ? product.relatedLabelRu : product.relatedLabelEn} →
                </Link>
              </p>
            ) : null}
            {product.noteRu ? (
              <p className="mt-4 text-xs text-muted">{ru ? product.noteRu : product.noteEn}</p>
            ) : null}
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? "Другие линии" : "Other lines"}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link href={`/kaspersky/${p.slug}`} className="text-link">
                    {ru ? p.titleRu : p.titleEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="section-band">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? "Запрос" : "Request"}</h2>
            <div className="feature-card-bordered mt-6">
              <ContactForm
                defaultService={ru ? product.titleRu : product.titleEn}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
