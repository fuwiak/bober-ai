"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useContactModal } from "@/components/ContactModalProvider";
import { reachGoal } from "@/lib/analytics";

export function ContactFab() {
  const t = useTranslations("contact");
  const modal = useContactModal();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.2, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  if (!modal) return null;

  return (
    <button
      type="button"
      className={`contact-fab${hidden ? " contact-fab--hidden" : ""}`}
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
