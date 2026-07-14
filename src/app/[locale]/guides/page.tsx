import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { GUIDES } from "@/lib/guides";
import { GUIDE_LABELS, getGuideContent } from "@/lib/guides-content";
import { buildPageMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const labels = GUIDE_LABELS[locale === "en" ? "en" : "ru"];

  return buildPageMetadata({
    title: labels.guidesTitle,
    description: labels.guidesSubtitle,
    path: "/guides",
    locale,
  });
}

export default async function GuidesIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const labels = GUIDE_LABELS[isEn ? "en" : "ru"];
  const t = await getTranslations("guides");

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="section-band section--deep">
          <div className="container-editorial">
            <Link href="/" className="text-link text-sm">
              {isEn ? "← Home" : "← На главную"}
            </Link>
            <Reveal className="mt-8 max-w-3xl">
              <span className="section-label">{t("badge")}</span>
              <h1 className="display-md mt-4">{labels.guidesTitle}</h1>
              <p className="body-copy mt-4 text-lg">{labels.guidesSubtitle}</p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {GUIDES.map((guide) => {
                const content = getGuideContent(guide.contentKey, isEn ? "en" : "ru");
                if (!content) return null;
                return (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`} className="feature-card group block">
                    <h2 className="card-title group-hover:text-primary">{content.h1}</h2>
                    <p className="body-copy mt-3 text-base">{content.subtitle}</p>
                    <span className="text-link mt-6 inline-block text-[11px] uppercase tracking-[0.16em]">
                      {labels.readGuide} →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
