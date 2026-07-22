import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PartnerCertificates } from "@/components/PartnerCertificates";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Reveal } from "@/components/motion/Reveal";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { KASPERSKY_PARTNER_BADGES } from "@/lib/trust-partners";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.certificates" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/certificates",
    locale,
  });
}

export default async function CertificatesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("certificates");
  const isEn = locale === "en";

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <Breadcrumbs
                locale={locale}
                items={[{ name: isEn ? "Certificates" : "Сертификаты", path: "/certificates" }]}
              />
              <span className="section-label mt-6 inline-block">{t("label")}</span>
              <h1 className="section-title mt-4 max-w-3xl">{t("title")}</h1>
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

            <div className="mt-12">
              <PartnerCertificates
                locale={locale}
                intro={t("intro")}
                titles={t.raw("titles") as { b2b: string; b2c: string }}
                openLabel={t("openPdf")}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
