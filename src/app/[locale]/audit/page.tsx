import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProcessAuditQuiz } from "@/components/ProcessAuditQuiz";
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
      ? "AI-аудит процесса за 5 минут — карта автоматизации | Bober AI"
      : "AI process audit in 5 minutes — automation map | Bober AI",
    description: ru
      ? "Ответьте на 7 вопросов о вашем процессе — получите потенциал экономии, рекомендуемый формат внедрения и ориентировочный бюджет. Без звонка."
      : "Answer 7 questions about your process — get the savings potential, recommended engagement format and a budget estimate. No call required.",
    path: "/audit",
    locale,
  });
}

export default async function AuditPage({ params }: Props) {
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
                items={[{ name: ru ? "AI-аудит процесса" : "AI process audit", path: "/audit" }]}
              />
              <span className="section-label mt-4 inline-block">{ru ? "5 минут · без звонка" : "5 minutes · no call"}</span>
              <h1 className="display-md mt-4">
                {ru ? "Узнайте, стоит ли автоматизировать этот процесс" : "Find out if this process is worth automating"}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
                {ru
                  ? "Ответьте на 7 вопросов — получите потенциал экономии, рекомендуемый формат и ориентировочный бюджет. Без обязательств, полный разбор — по желанию."
                  : "Answer 7 questions — get the savings potential, recommended format and a budget estimate. No commitment; the full breakdown is optional."}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <ProcessAuditQuiz locale={locale} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
