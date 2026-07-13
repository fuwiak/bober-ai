import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/BrandMark";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { CONTACT_PHONE, MARKETPLACES, SITE_NAME, TELEGRAM_URL } from "@/lib/site";
import { LEGAL_ROUTES } from "@/lib/legal";

export async function SiteHeader() {
  const t = await getTranslations("nav");

  const navItems = [
    { href: "/#services" as const, label: t("services") },
    { href: "/#packages" as const, label: t("packages") },
    { href: "/#portfolio" as const, label: t("portfolio") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/partners" as const, label: t("partners") },
    { href: "/#process" as const, label: t("process") },
    { href: "/#contact" as const, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-hairline bg-canvas/95 backdrop-blur-sm">
      <div className="container-editorial flex h-full items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-medium text-ink">
          <BrandMark className="h-4 w-4 text-ink" />
          <span className="text-sm font-medium tracking-tight">{SITE_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <a href={`tel:${CONTACT_PHONE}`} className="hidden text-sm text-muted md:inline">
            {CONTACT_PHONE.replace("+7", "+7 ")}
          </a>
          <ThemeToggle />
          <a href="#contact" className="btn-primary">
            {t("write")}
          </a>
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-hairline-soft px-4 py-2 text-sm md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export async function SiteFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="footer-dark">
      <div className="container-editorial">
        <div className="mb-8 flex items-center gap-2 text-on-dark">
          <BrandMark className="h-4 w-4" />
          <span className="font-display text-lg tracking-tight">{SITE_NAME}</span>
        </div>
        <p className="text-sm">
          <span className="text-on-dark">{t("legalName")}</span>
          {" · "}ИНН 772356334324 · ОГРНИП 325774600389226
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <NextLink href={LEGAL_ROUTES.privacyPolicy} className="text-on-dark-soft active:text-on-dark">
            {t("privacy")}
          </NextLink>
          <NextLink href={LEGAL_ROUTES.consent} className="text-on-dark-soft active:text-on-dark">
            {t("consent")}
          </NextLink>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="text-on-dark-soft active:text-on-dark">
            Telegram
          </a>
          <a href={`tel:${CONTACT_PHONE}`} className="text-on-dark-soft active:text-on-dark">
            {CONTACT_PHONE}
          </a>
        </div>
        <p className="mt-6 text-xs text-on-dark-soft">{t("marketplaces")}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {MARKETPLACES.map((item) => (
            <a key={item.name} href={item.url} target="_blank" rel="noreferrer" className="text-on-dark-soft active:text-on-dark">
              {item.name}
            </a>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-soft">© {new Date().getFullYear()} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
