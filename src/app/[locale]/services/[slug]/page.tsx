import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EditorialImageFrame } from "@/components/EditorialImageFrame";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Link } from "@/i18n/navigation";
import { getEnterpriseService, getEnterpriseServices } from "@/lib/enterprise-services";
import { TELEGRAM_URL, absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["ru", "en"]) {
    for (const offer of getEnterpriseServices(locale)) {
      params.push({ locale, slug: offer.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const offer = getEnterpriseService(slug, locale);
  if (!offer) return {};
  const prefix = locale === "en" ? "/en" : "";
  return {
    title: offer.title,
    description: offer.description,
    alternates: { canonical: absoluteUrl(`${prefix}/services/${offer.slug}`) },
  };
}

export default async function ServiceOfferPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicePage");
  const offer = getEnterpriseService(slug, locale);
  if (!offer) notFound();

  const deliverables = t.raw("deliverables") as string[];

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <main className="section-band">
        <div className="container-editorial">
          <Link href="/services" className="text-link text-sm">
            {t("back")}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
            <article>
              <h1 className="display-md">{offer.title}</h1>
              <p className="mt-4 text-base leading-relaxed text-body">{offer.description}</p>

              <EditorialImageFrame variant="card" className="mt-8 aspect-[16/9] rounded-xl bg-surface-card">
                <Image
                  src={offer.serviceImage}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                  unoptimized={offer.serviceImage.endsWith(".svg")}
                />
              </EditorialImageFrame>

              <div className="feature-card mt-8">
                <h2 className="font-display text-xl tracking-tight">{t("includes")}</h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{offer.about}</p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-body">
                  {deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>

            <aside className="feature-card-bordered self-start">
              <p className="font-display text-2xl tracking-tight">{offer.salesNotes}</p>
              <p className="mt-1 text-sm text-muted">
                {t("timeline")}: {offer.deliveryDays} {t("days")}
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <Link href="/#contact" className="btn-primary text-center">
                  {t("quote")}
                </Link>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary text-center">
                  {t("telegram")}
                </a>
              </div>

              <div className="mt-6 border-t border-hairline pt-6">
                <p className="mb-4 text-sm font-medium text-ink">{t("formTitle")}</p>
                <ContactForm defaultService={offer.title} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
