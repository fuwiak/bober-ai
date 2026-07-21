"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("locale");
  const nextLocale = locale === "ru" ? "en" : "ru";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className={`locale-switcher ${className}`.trim()}
    >
      {t("switchTo")}
    </Link>
  );
}
