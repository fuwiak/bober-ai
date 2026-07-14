import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeaderClient } from "@/components/SiteHeaderClient";
import { Link } from "@/i18n/navigation";
import { CONTACT_PHONE, HOMEPAGE_PRESENCE_LINKS, SITE_NAME, TELEGRAM_URL } from "@/lib/site";
import { LEGAL_ROUTES } from "@/lib/legal";

export async function SiteHeader() {
  const t = await getTranslations("nav");

  const navItems = [
    { href: "/#services" as const, label: t("services") },
    { href: "/#portfolio" as const, label: t("portfolio") },
    { href: "/#about" as const, label: t("about") },
    { href: "/#faq" as const, label: t("faq") },
    { href: "/#contact" as const, label: t("contact") },
  ];

  return (
    <SiteHeaderClient
      navItems={navItems}
      writeLabel={t("consultCta")}
      writeShortLabel={t("consultCtaShort")}
      wordmark="BOBER AI"
      menuOpenLabel={t("menuOpen")}
      menuCloseLabel={t("menuClose")}
      quickContactLabel={t("quickContact")}
      callLabel={t("call")}
      telegramLabel={t("telegram")}
    />
  );
}

export async function SiteFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="footer-dark">
      <div className="container-editorial">
        <div className="mb-8">
          <span className="site-wordmark text-ink">{SITE_NAME}</span>
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
        <p className="mt-6 text-xs text-on-dark-soft">{t("profiles")}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {HOMEPAGE_PRESENCE_LINKS.map((item) => (
            <a key={item.id} href={item.url} target="_blank" rel="me noreferrer" className={`text-on-dark-soft active:text-on-dark${item.id === "linkedin" ? " font-medium text-on-dark" : ""}`}>
              {t(`presence.${item.id}`)}
            </a>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-soft">© {new Date().getFullYear()} {SITE_NAME}</p>
      </div>
    </footer>
  );
}
