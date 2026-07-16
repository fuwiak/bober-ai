import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  YANDEX_PROOF_URL,
  credibilityGraphJsonLd,
  getCredibilityItems,
  getMediaDossierSections,
} from "@/lib/media";
import { absoluteUrl } from "@/lib/site";
import { ArrowRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.media" });
  const path = locale === "en" ? "/en/media" : "/media";
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: absoluteUrl(path),
      languages: {
        ru: absoluteUrl("/media"),
        en: absoluteUrl("/en/media"),
        "x-default": absoluteUrl("/media"),
      },
    },
  };
}

export default async function MediaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const path = locale === "en" ? "/en/media" : "/media";
  const pageUrl = absoluteUrl(path);
  const items = getCredibilityItems(locale);
  const byId = new Map(items.map((item) => [item.id, item]));
  const sections = getMediaDossierSections(locale);
  const graph = credibilityGraphJsonLd(pageUrl, locale);

  return (
    <div className="page-shell min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <Link href="/" className="text-link text-sm">
                ← {locale === "en" ? "Home" : "На главную"}
              </Link>
              <span className="section-label mt-8 block">{t("media.label")}</span>
              <h1 className="section-title mt-4">{t("pages.media.pageTitle")}</h1>
              <p className="body-copy mt-4 text-base">{t("media.body")}</p>
            </Reveal>
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.id} id={section.id} className="section-band border-b border-hairline">
            <div className="container-editorial">
              <Reveal>
                <h2 className="card-title text-xl">{section.title}</h2>
              </Reveal>

              {section.id === "proof" ? (
                <div className="mt-8 max-w-2xl space-y-4">
                  <p className="body-copy text-base">
                    {locale === "en"
                      ? "Client feedback and presence on Yandex Services confirm ongoing commercial delivery — not anonymous contracting."
                      : "Отзывы клиентов и профиль на Яндекс Услугах подтверждают коммерческую практику — не анонимный подряд."}
                  </p>
                  <a
                    href={YANDEX_PROOF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link inline-flex items-center gap-2 text-sm"
                  >
                    {locale === "en" ? "Open Yandex Services profile" : "Открыть профиль на Яндекс Услугах"}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              ) : (
                <ul className="mt-8 space-y-8">
                  {section.itemIds.map((id) => {
                    const item = byId.get(id);
                    if (!item) return null;
                    return (
                      <li key={id} className="border-t border-hairline pt-6">
                        <p className="meta-label">
                          {item.source} · {item.type}
                        </p>
                        <h3 className="card-title mt-2 text-lg">{item.title}</h3>
                        <p className="body-copy mt-3 max-w-3xl text-base">{item.description}</p>
                        <p className="mt-3 text-sm text-muted">{item.meta}</p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link mt-4 inline-flex items-center gap-2 text-sm"
                        >
                          {item.cta}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                        {item.secondaryLinks?.length ? (
                          <div className="mt-3 flex flex-wrap gap-4">
                            {item.secondaryLinks.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-link text-xs"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
