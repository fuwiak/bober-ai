"use client";

import { useTranslations } from "next-intl";
import { useContactModal } from "@/components/ContactModalProvider";

export function ContactFab() {
  const t = useTranslations("contact");
  const { open } = useContactModal();

  return (
    <button type="button" className="contact-fab" onClick={() => open()} aria-label={t("fabLabel")}>
      {t("fabLabel")}
    </button>
  );
}
