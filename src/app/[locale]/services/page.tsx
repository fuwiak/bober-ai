import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { AnimatedServiceCard } from "@/components/motion/AnimatedServiceCard";
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
  const t = await getTranslations({ locale, namespace: "servicePage" });
  return {
    title: t("listTitle"),
    alternates: { canonical: locale === "en" ? absoluteUrl("/en/services") : absoluteUrl("/services") },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const services = getEnterpriseServices(locale);

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <main className="section-band">
        <div className="container-editorial">
          <Reveal>
            <Link href="/" className="text-link text-sm">
              ← {locale === "en" ? "Home" : "На главную"}
            </Link>
            <h1 className="display-md mt-4">{t("title")}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">{t("subtitle")}</p>
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
                detailsLabel={t("details")}
                quoteLabel={t("quote")}
                daysLabel={t("days")}
              />
            ))}
          </Stagger>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
