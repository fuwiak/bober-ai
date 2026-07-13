"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("locale");
  const nextLocale = locale === "ru" ? "en" : "ru";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="nav-link"
    >
      {t("switchTo")}
    </Link>
  );
}
