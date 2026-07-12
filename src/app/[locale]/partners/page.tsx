import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { absoluteUrl, TELEGRAM_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partnersPage" });
  return {
    title: t("title"),
    alternates: { canonical: locale === "en" ? absoluteUrl("/en/partners") : absoluteUrl("/partners") },
  };
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partners");

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <main className="section-band">
        <div className="container-editorial max-w-3xl">
          <Link href="/" className="text-link text-sm">
            ← {locale === "en" ? "Home" : "На главную"}
          </Link>
          <span className="badge-coral mt-6 inline-block text-[10px]">{t("badge")}</span>
          <h1 className="display-md mt-4">{t("title")}</h1>
          <p className="mt-3 text-lg font-medium text-ink">{t("subtitle")}</p>
          <p className="mt-4 text-sm leading-relaxed text-body">{t("description")}</p>

          <div className="mt-10 grid gap-4">
            {(t.raw("steps") as { title: string; text: string }[]).map((step, index) => (
              <article key={step.title} className="feature-card">
                <span className="font-display text-3xl text-primary/40">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-2 font-medium text-ink">{step.title}</h2>
                <p className="mt-2 text-sm text-body">{step.text}</p>
              </article>
            ))}
          </div>

          <ul className="mt-8 space-y-2 text-sm text-body">
            {(t.raw("models") as string[]).map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>

          <div className="feature-card-bordered mt-10 p-6">
            <p className="font-display text-4xl text-primary">{t("commission")}</p>
            <p className="text-sm text-muted">{t("commissionNote")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn-primary">
                {t("cta")}
              </Link>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                Telegram
              </a>
            </div>
          </div>

          <div className="feature-card-bordered mt-10">
            <ContactForm defaultService={locale === "en" ? "Partnership" : "Партнёрство"} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
