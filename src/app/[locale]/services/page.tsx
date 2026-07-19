import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MicroConversionsSection } from "@/components/MicroConversionsSection";
import { SectionCtaBand } from "@/components/SectionCtaBand";
import { AnimatedServiceCard } from "@/components/motion/AnimatedServiceCard";
import { ImplementationCard, type ImplementationArea } from "@/components/motion/ImplementationCard";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getEnterpriseServices } from "@/lib/enterprise-services";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  const path = locale === "en" ? "/en/services" : "/services";
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: absoluteUrl(path) },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const implementationAreas = t.raw("services.implementationAreas") as ImplementationArea[];
  const services = getEnterpriseServices(locale);

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="section-band section--deep border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <Link href="/" className="link-back">
                {locale === "en" ? "Home" : "На главную"}
              </Link>
              <span className="section-label mt-8 block">{t("sections.solutions")}</span>
              <h1 className="section-title mt-4">{t("services.title")}</h1>
              <p className="body-copy mt-4 max-w-2xl text-base">{t("services.subtitle")}</p>
            </Reveal>
            <Stagger className="mt-10">
              {implementationAreas.map((area, index) => (
                <ImplementationCard key={area.title} index={index} {...area} ctaLabel={t("services.discussCta")} />
              ))}
            </Stagger>
          </div>
        </section>

        <MicroConversionsSection
          label={t("microConversions.label")}
          title={t("microConversions.title")}
          subtitle={t("microConversions.subtitle")}
          items={t.raw("microConversions.items") as { title: string; description: string; cta: string; service: string }[]}
        />

        <section className="section-band section--panel border-b border-hairline">
          <div className="container-editorial">
            <Reveal>
              <span className="section-label">{t("servicePage.listTitle")}</span>
              <h2 className="section-title mt-4">{t("servicePage.listTitle")}</h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((offer) => (
                <AnimatedServiceCard
                  key={offer.id}
                  title={offer.title}
                  description={offer.description}
                  salesNotes={offer.salesNotes}
                  deliveryDays={offer.deliveryDays}
                  slug={offer.slug}
                  image={offer.serviceImage}
                  detailsLabel={t("services.details")}
                  quoteLabel={t("services.quote")}
                  daysLabel={t("services.days")}
                />
              ))}
            </Stagger>
          </div>
        </section>

        <SectionCtaBand
          title={t("sectionCta.title")}
          duration={t("sectionCta.duration")}
          commitment={t("sectionCta.commitment")}
          format={t("sectionCta.format")}
          cta={t("sectionCta.cta")}
          urgency={t("sectionCta.urgency")}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
