import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getEnterpriseService } from "@/lib/enterprise-services";
import { AI_KUBERNETES_PAGE } from "@/lib/ai-kubernetes-page";
import {
  buildPageMetadata,
  faqJsonLd,
  localizedAbsolute,
  pageBreadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { TELEGRAM_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale !== "en";
  const p = AI_KUBERNETES_PAGE;
  return buildPageMetadata({
    title: ru ? p.metaTitleRu : p.metaTitleEn,
    description: ru ? p.metaDescRu : p.metaDescEn,
    keywords: ru ? [...p.metaKeywordsRu] : [...p.metaKeywordsEn],
    path: "/ai-kubernetes",
    locale,
  });
}

export default async function AiKubernetesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ru = locale !== "en";
  const p = AI_KUBERNETES_PAGE;
  const pack = getEnterpriseService("secure-private-ai-cloud", ru ? "ru" : "en");
  const pageUrl = localizedAbsolute("/ai-kubernetes", locale);

  const breadcrumbs = pageBreadcrumbJsonLd(locale, [{ name: "AI on Kubernetes", path: "/ai-kubernetes" }]);
  const webPage = webPageJsonLd({
    name: ru ? p.metaTitleRu : p.metaTitleEn,
    description: ru ? p.metaDescRu : p.metaDescEn,
    url: pageUrl,
    locale,
  });
  const faq = faqJsonLd(
    (ru ? p.faqRu : p.faqEn).map((item) => ({ q: item.q, a: item.a })),
    pageUrl,
  );

  return (
    <div className="min-h-screen bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <SiteHeader />
      <main>
        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Breadcrumbs
              locale={locale}
              items={[{ name: "AI on Kubernetes", path: "/ai-kubernetes" }]}
            />
            <span className="badge-accent mt-2 inline-block text-[10px]">
              {p.lineRu} · {ru ? "линия Bober AI Systems" : "line of Bober AI Systems"}
            </span>
            <h1 className="display-md mt-4">{ru ? p.h1Ru : p.h1En}</h1>
            <p className="mt-4 text-base leading-relaxed text-body">
              {ru ? p.subtitleRu : p.subtitleEn}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#contact" className="btn-primary">
                {ru ? "Обсудить архитектуру" : "Discuss the architecture"}
              </Link>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                Telegram
              </a>
              <Link href={p.secureAiHref} className="btn-secondary">
                {ru ? p.secureAiLabelRu : p.secureAiLabelEn}
              </Link>
            </div>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? p.problemsTitleRu : p.problemsTitleEn}</h2>
            <ul className="mt-6 grid gap-3 text-sm text-body sm:grid-cols-2">
              {(ru ? p.problemsRu : p.problemsEn).map((item) => (
                <li key={item} className="feature-card">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? p.servicesTitleRu : p.servicesTitleEn}</h2>
            <div className="mt-8 grid gap-4">
              {(ru ? p.servicesRu : p.servicesEn).map((service) => (
                <article key={service.title} className="feature-card">
                  <h3 className="font-medium text-ink">
                    {"href" in service && service.href ? (
                      <Link href={service.href} className="hover:text-primary">
                        {service.title}
                      </Link>
                    ) : (
                      service.title
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-body">{service.summary}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm">
              <Link href={p.packHref} className="text-link">
                {ru ? p.packLabelRu : p.packLabelEn} →
              </Link>
              {pack && (
                <span className="text-muted">
                  {" "}
                  ({pack.salesNotes} · {pack.deliveryDays} {ru ? "дней" : "days"})
                </span>
              )}
              <span className="text-muted"> · </span>
              <Link href={p.kasperskyHref} className="text-link">
                {ru ? p.kasperskyLabelRu : p.kasperskyLabelEn} →
              </Link>
            </p>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? p.processTitleRu : p.processTitleEn}</h2>
            <ol className="mt-6 space-y-3 text-sm text-body">
              {(ru ? p.processRu : p.processEn).map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="font-display text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? p.kasperskyNoteTitleRu : p.kasperskyNoteTitleEn}</h2>
            <p className="body-copy mt-3 max-w-2xl text-sm">
              {ru ? p.kasperskyNoteRu : p.kasperskyNoteEn}
            </p>
          </div>
        </section>

        <section className="section-band border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? "Частые вопросы" : "FAQ"}</h2>
            <div className="mt-6 space-y-6">
              {(ru ? p.faqRu : p.faqEn).map((item) => (
                <div key={item.q}>
                  <h3 className="font-medium text-ink">{item.q}</h3>
                  <p className="mt-2 text-sm text-body">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-band">
          <div className="container-editorial max-w-3xl">
            <h2 className="section-title">{ru ? "Запрос" : "Request"}</h2>
            <div className="feature-card-bordered mt-6">
              <ContactForm
                defaultService={ru ? "Bober AI on Kubernetes" : "Bober AI on Kubernetes"}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
