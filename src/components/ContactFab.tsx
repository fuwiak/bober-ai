"use client";

import { useTranslations } from "next-intl";
import { useContactModal } from "@/components/ContactModalProvider";
import { reachGoal } from "@/lib/analytics";

export function ContactFab() {
  const t = useTranslations("contact");
  const modal = useContactModal();

  if (!modal) return null;

  return (
    <button
      type="button"
      className="contact-fab"
      onClick={() => {
        reachGoal("audit_cta_click");
        modal.open();
      }}
      aria-label={t("fabLabel")}
    >
      {t("fabLabel")}
    </button>
  );
}
