import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FounderCredibilitySection } from "@/components/FounderCredibilitySection";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/motion/Reveal";
import { routing } from "@/i18n/routing";
import {
  YANDEX_PROOF_URL,
  credibilityGraphJsonLd,
  getCredibilityByMarket,
  getCredibilityItems,
  getMediaDossierSections,
} from "@/lib/media";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { ArrowRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.media" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/media",
    locale,
  });
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
  const russianItems = getCredibilityByMarket(locale, "russian");
  const internationalItems = getCredibilityByMarket(locale, "international");

  return (
    <div className="page-shell min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial max-w-3xl">
            <Reveal>
              <Breadcrumbs
                locale={locale}
                items={[{ name: locale === "en" ? "Media" : "СМИ", path: "/media" }]}
              />
            </Reveal>
          </div>
        </section>

        <FounderCredibilitySection
          locale={locale}
          label={t("media.label")}
          title={t("media.title")}
          subtitle={t("media.subtitle")}
          body={t("media.body")}
          proofItems={t.raw("media.proofItems") as string[]}
          tabRussian={t("media.tabRussian")}
          tabInternational={t("media.tabInternational")}
          russianItems={russianItems}
          internationalItems={internationalItems}
          dossierCta={t("media.dossierCta")}
          closing={t("media.closing")}
          showDossierLink={false}
        />

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
