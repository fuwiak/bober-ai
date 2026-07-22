import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactCta } from "@/components/ContactCta";
import { FounderManifesto } from "@/components/FounderManifesto";
import { PartnerCertificates } from "@/components/PartnerCertificates";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { FOUNDER_IMAGE } from "@/lib/site";
import { KASPERSKY_PARTNER_BADGES } from "@/lib/trust-partners";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const isEn = locale === "en";
  const skills = t.raw("about.skills") as string[];
  const founderStats = t.raw("founderManifesto.stats") as { value: string; label: string }[];

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <FounderManifesto
          label={t("founderManifesto.label")}
          name={t("founderManifesto.name")}
          role={t("founderManifesto.role")}
          quote={t("founderManifesto.quote")}
          goal={t("founderManifesto.goal")}
          imageAlt={t("hero.heroImageAlt")}
          stats={founderStats}
        />

        <section
          id="certificates"
          className="section-band section--deep scroll-mt-16 border-b border-hairline"
        >
          <div className="container-editorial">
            <Reveal>
              <Breadcrumbs
                locale={locale}
                items={[{ name: isEn ? "About" : "О компании", path: "/about" }]}
              />
              <span className="section-label mt-8 inline-block">{t("certificates.label")}</span>
              <h1 className="section-title mt-4 max-w-3xl">{t("pages.about.pageTitle")}</h1>
              <p className="body-copy mt-5 max-w-2xl text-base">{t("pages.about.lead")}</p>
            </Reveal>

            <div className="about-certs mt-14">
              <Reveal>
                <h2 className="about-certs__heading">{t("certificates.title")}</h2>
                <p className="body-copy mt-4 max-w-2xl text-base">{t("certificates.intro")}</p>
              </Reveal>

              <Reveal delay={0.04} className="partner-badge-row mt-10">
                {KASPERSKY_PARTNER_BADGES.map((badge) => (
                  <div key={badge.id} className="partner-badge-frame">
                    <Image
                      src={badge.src}
                      alt={isEn ? badge.altEn : badge.altRu}
                      width={badge.width}
                      height={badge.height}
                      className="partner-badge-image"
                      sizes="(max-width: 768px) 100vw, 420px"
                      priority
                    />
                  </div>
                ))}
              </Reveal>

              <div className="mt-14">
                <PartnerCertificates
                  locale={locale}
                  titles={t.raw("certificates.titles") as { b2b: string; b2c: string }}
                  openLabel={t("certificates.openPdf")}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="company" className="section-band section--panel scroll-mt-16 border-b border-hairline">
          <div className="container-editorial">
            <div className="about-company">
              <Reveal className="about-company__portrait">
                <div className="about-company__frame">
                  <Image
                    src={FOUNDER_IMAGE}
                    alt={t("hero.heroImageAlt")}
                    fill
                    sizes="(max-width: 768px) 100vw, 28rem"
                    className="about-company__image"
                    unoptimized={FOUNDER_IMAGE.endsWith(".svg")}
                  />
                </div>
              </Reveal>

              <div className="about-company__copy">
                <Reveal>
                  <span className="section-label">{t("about.title")}</span>
                  <h2 className="section-title mt-4">{t("about.tagline")}</h2>
                  {t("about.text")
                    .split("\n\n")
                    .map((paragraph) => (
                      <p key={paragraph.slice(0, 48)} className="body-copy mt-5 max-w-2xl text-base">
                        {paragraph}
                      </p>
                    ))}
                </Reveal>

                <Reveal delay={0.06} className="mt-10">
                  <dl className="about-company__facts">
                    <div className="about-company__fact">
                      <dt className="meta-label">{t("about.approach")}</dt>
                      <dd className="body-copy mt-2 text-base">{t("about.approachValue")}</dd>
                    </div>
                    <div className="about-company__fact">
                      <dt className="meta-label">{t("about.schedule")}</dt>
                      <dd className="body-copy mt-2 text-base">{t("about.scheduleValue")}</dd>
                    </div>
                    <div className="about-company__fact">
                      <dt className="meta-label">{t("about.collaboration")}</dt>
                      <dd className="body-copy mt-2 text-base">{t("about.collaborationSummary")}</dd>
                      <dd className="body-copy mt-2 text-sm text-muted">{t("about.collaborationDetail")}</dd>
                    </div>
                  </dl>
                </Reveal>

                <Reveal delay={0.08} className="mt-10">
                  <p className="meta-label">{t("about.skillsTitle")}</p>
                  <ul className="about-company__skills mt-4">
                    {skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                  <p className="meta-label mt-8">{t("about.techStackTitle")}</p>
                  <p className="body-copy mt-3 text-base">{t("about.techStack")}</p>
                </Reveal>

                <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-4">
                  <ContactCta>{t("about.cta")}</ContactCta>
                  <Link href="/media" className="btn-secondary">
                    {t("nav.media")}
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
