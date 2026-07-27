import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProcessReviewForm } from "@/components/ProcessReviewForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/motion/Reveal";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale !== "en";
  return buildPageMetadata({
    title: ru
      ? "Разбор одного процесса бесплатно | Bober AI"
      : "Free review of one process | Bober AI",
    description: ru
      ? "Опишите один ручной процесс — покажем, где его можно автоматизировать, какие интеграции потребуются и есть ли смысл запускать пилот."
      : "Describe one manual process — we'll show where it can be automated, what integrations are needed and whether a pilot makes sense.",
    path: "/process-review",
    locale,
  });
}

export default async function ProcessReviewPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ru = locale !== "en";

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <Breadcrumbs
                locale={locale}
                items={[{ name: ru ? "Разбор процесса" : "Process review", path: "/process-review" }]}
              />
              <span className="section-label mt-4 inline-block">{ru ? "Бесплатно" : "Free"}</span>
              <h1 className="display-md mt-4">
                {ru ? "Разберём один ваш процесс бесплатно" : "We'll review one of your processes for free"}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
                {ru
                  ? "Опишите один ручной процесс — покажем, где его можно автоматизировать, какие интеграции потребуются и есть ли смысл запускать пилот."
                  : "Describe one manual process — we'll show where it can be automated, what integrations are needed and whether a pilot makes sense."}
              </p>
              <ul className="mt-6 space-y-2">
                {(ru
                  ? [
                      "Не более одного процесса за раз",
                      "Без проектирования полной архитектуры",
                      "Ответ в течение одного рабочего дня (24 часа)",
                    ]
                  : [
                      "One process per request",
                      "No full architecture design",
                      "Reply within one business day (24 hours)",
                    ]
                ).map((item) => (
                  <li key={item} className="body-copy flex gap-3 text-sm text-muted">
                    <span className="meta-label shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <ProcessReviewForm locale={locale} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
