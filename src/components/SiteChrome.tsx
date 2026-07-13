import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeaderClient } from "@/components/SiteHeaderClient";
import { BrandMark } from "@/components/BrandMark";
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

  return <SiteHeaderClient navItems={navItems} writeLabel={t("write")} />;
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
