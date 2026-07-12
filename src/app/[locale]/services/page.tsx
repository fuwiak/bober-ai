import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
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
          <Link href="/" className="text-link text-sm">
            ← {locale === "en" ? "Home" : "На главную"}
          </Link>
          <h1 className="display-md mt-4">{t("title")}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">{t("subtitle")}</p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((offer) => (
              <article key={offer.id} className="feature-card-bordered overflow-hidden p-0">
                <div className="relative aspect-[4/3] bg-surface-card">
                  <Image
                    src={offer.serviceImage}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover"
                    unoptimized={offer.serviceImage.endsWith(".svg")}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg tracking-tight text-ink">{offer.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-body">{offer.description}</p>
                  <div className="mt-5 flex items-end justify-between gap-2 border-t border-hairline pt-5">
                    <div>
                      <p className="font-display text-xl tracking-tight">{offer.salesNotes}</p>
                      <p className="text-xs text-muted">
                        {offer.deliveryDays} {t("days")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/services/${offer.slug}`} className="btn-secondary text-xs">
                        {t("details")}
                      </Link>
                      <Link href="/#contact" className="btn-primary text-xs">
                        {t("quote")}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
