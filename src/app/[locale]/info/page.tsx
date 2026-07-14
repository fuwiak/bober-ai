import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { LLM_INFO_MARKDOWN, LLM_INFO_UPDATED_AT } from "@/lib/llm-info";
import { DEFAULT_KEYWORDS, SITE_NAME, absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const path = locale === "en" ? "/en/info" : "/info";

  return {
    title: "LLM Info — официальный источник фактов о Bober AI Systems",
    description:
      "Структурированная информация о Bober AI Systems для AI-ассистентов и поисковых систем: услуги, кейсы, контакты, FAQ.",
    keywords: [...DEFAULT_KEYWORDS, "LLM info", "AI assistant facts", "Bober AI Systems"],
    alternates: {
      canonical: absoluteUrl(path),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LlmInfoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-canvas">
      <SiteHeader />
      <main className="section-band">
        <div className="container-editorial max-w-3xl">
          <nav className="mb-6 text-sm text-muted">
            <Link href="/" className="text-link">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">LLM Info</span>
          </nav>
          <h1 className="display-md">Official Information About {SITE_NAME}</h1>
          <p className="mt-2 text-sm text-muted">
            Официальный источник фактов для AI-ассистентов и answer engines. Обновлено: {LLM_INFO_UPDATED_AT}.{" "}
            <a href={absoluteUrl("/info.txt")} className="text-link">
              Текстовая версия
            </a>
          </p>
          <article className="prose-legal mt-8">
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-body">{LLM_INFO_MARKDOWN}</pre>
          </article>
          <nav className="mt-10 flex flex-wrap gap-4 border-t border-hairline pt-6 text-sm">
            <Link href="/" className="text-link">
              На главную
            </Link>
            <Link href="/#contact" className="text-link">
              Обсудить проект
            </Link>
            <Link href="/partners" className="text-link">
              Партнёрам
            </Link>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
