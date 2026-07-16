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

export async function LegalPageLayout({ title, updatedAt, children }: LegalPageLayoutProps) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <LegalProviders locale={locale} messages={messages}>
      <div className="min-h-screen bg-canvas">
        <SiteHeader />
        <main className="section-band">
          <div className="container-editorial max-w-3xl">
            <nav className="mb-6 text-sm text-muted">
              <Link href="/" className="text-link">
                Главная
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink">{title}</span>
            </nav>
            <h1 className="display-md">{title}</h1>
            <p className="mt-2 text-sm text-muted">Дата публикации: {updatedAt}</p>
            <article className="prose-legal mt-8 space-y-6">{children}</article>
            <nav className="mt-10 flex flex-wrap gap-4 border-t border-hairline pt-6 text-sm">
              <Link href={LEGAL_ROUTES.terms} className="text-link">
                Условия оказания услуг
              </Link>
              <Link href={LEGAL_ROUTES.privacyPolicy} className="text-link">
                Политика обработки ПДн
              </Link>
              <Link href={LEGAL_ROUTES.consent} className="text-link">
                Согласие на обработку ПДн
              </Link>
              <Link href="/" className="text-link">
                На главную
              </Link>
            </nav>
          </div>
        </main>
        <SiteFooter />
      </div>
    </LegalProviders>
  );
}
