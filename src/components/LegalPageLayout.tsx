import Link from "next/link";
import { getLocale, getMessages } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { LegalProviders } from "@/components/LegalProviders";
import { LEGAL_ROUTES } from "@/lib/legal";

type LegalPageLayoutProps = {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
};

const LABELS = {
  ru: {
    home: "Главная",
    published: "Дата публикации",
    terms: "Условия оказания услуг",
    privacy: "Политика обработки ПДн",
    consent: "Согласие на обработку ПДн",
    backHome: "На главную",
  },
  en: {
    home: "Home",
    published: "Published",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    consent: "Personal Data Consent",
    backHome: "Back to home",
  },
} as const;

export async function LegalPageLayout({ title, updatedAt, children }: LegalPageLayoutProps) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isEn = locale === "en";
  const t = isEn ? LABELS.en : LABELS.ru;
  const prefix = isEn ? "/en" : "";
  const homeHref = isEn ? "/en" : "/";

  return (
    <LegalProviders locale={locale} messages={messages}>
      <div className="min-h-screen bg-canvas">
        <SiteHeader />
        <main className="section-band">
          <div className="container-editorial max-w-3xl">
            <nav className="mb-6 text-sm text-muted">
              <Link href={homeHref} className="text-link">
                {t.home}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink">{title}</span>
            </nav>
            <h1 className="display-md">{title}</h1>
            <p className="mt-2 text-sm text-muted">{t.published}: {updatedAt}</p>
            <article className="prose-legal mt-8 space-y-6">{children}</article>
            <nav className="mt-10 flex flex-wrap gap-4 border-t border-hairline pt-6 text-sm">
              <Link href={`${prefix}${LEGAL_ROUTES.terms}`} className="text-link">
                {t.terms}
              </Link>
              <Link href={`${prefix}${LEGAL_ROUTES.privacyPolicy}`} className="text-link">
                {t.privacy}
              </Link>
              <Link href={`${prefix}${LEGAL_ROUTES.consent}`} className="text-link">
                {t.consent}
              </Link>
              <Link href={homeHref} className="text-link">
                {t.backHome}
              </Link>
            </nav>
          </div>
        </main>
        <SiteFooter />
      </div>
    </LegalProviders>
  );
}
