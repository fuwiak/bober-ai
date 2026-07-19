import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { SiteHeaderClient } from "@/components/SiteHeaderClient";
import { Link } from "@/i18n/navigation";
import { CONTACT_PHONE, HOMEPAGE_PRESENCE_LINKS, SITE_NAME, SITE_URL, TELEGRAM_URL } from "@/lib/site";
import { LEGAL_ENTITY, LEGAL_ROUTES, formatLegalRequisitesLine } from "@/lib/legal";

export async function SiteHeader() {
  const t = await getTranslations("nav");

  const navItems = [
    { href: "/automation" as const, label: t("automation") },
    { href: "/services" as const, label: t("services") },
    { href: "/portfolio" as const, label: t("portfolio") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/pricing" as const, label: t("pricing") },
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
          {" · "}
          {formatLegalRequisitesLine()}
        </p>
        <p className="mt-2 text-sm text-on-dark-soft">{LEGAL_ENTITY.address}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <NextLink href={LEGAL_ROUTES.terms} className="text-on-dark-soft active:text-on-dark">
            {t("terms")}
          </NextLink>
          <NextLink href={LEGAL_ROUTES.privacyPolicy} className="text-on-dark-soft active:text-on-dark">
            {t("privacy")}
          </NextLink>
          <NextLink href={LEGAL_ROUTES.consent} className="text-on-dark-soft active:text-on-dark">
            {t("consent")}
          </NextLink>
          <a href={`mailto:${LEGAL_ENTITY.email}`} className="text-on-dark-soft active:text-on-dark">
            {LEGAL_ENTITY.email}
          </a>
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
        <a
          href={`https://webmaster.yandex.ru/siteinfo/?site=${encodeURIComponent(SITE_URL)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block opacity-70 transition-opacity hover:opacity-100"
          title={t("sqiTitle")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- external Yandex SQI badge */}
          <img
            src={`https://yandex.ru/cycounter?${SITE_URL}&theme=light&lang=ru`}
            width={88}
            height={31}
            alt={t("sqiAlt")}
            className="rounded-lg"
          />
        </a>
      </div>
    </footer>
  );
}
