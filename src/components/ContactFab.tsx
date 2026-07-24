"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ContactCta } from "@/components/ContactCta";
import { TrackedAnchor } from "@/components/TrackedAnchor";
import { useContactModal } from "@/components/ContactModalProvider";
import { isPaidTraffic, syncPaidTrafficMarker } from "@/lib/analytics";
import { CONTACT_PHONE, PRIMARY_CTA_GOAL, TELEGRAM_URL } from "@/lib/site";

export function ContactFab() {
  const t = useTranslations("contact");
  const modal = useContactModal();
  const [hidden, setHidden] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    syncPaidTrafficMarker();
    setPaid(isPaidTraffic());
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  if (!modal) return null;

  if (paid) {
    return (
      <div className={`direct-sticky-bar${hidden ? " direct-sticky-bar--hidden" : ""}`}>
        <TrackedAnchor href={`tel:${CONTACT_PHONE}`} className="direct-sticky-bar__link" goal="phone_click">
          {CONTACT_PHONE}
        </TrackedAnchor>
        <TrackedAnchor
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="direct-sticky-bar__link"
          goal="telegram_click"
        >
          Telegram
        </TrackedAnchor>
        <ContactCta variant="bare" goal={PRIMARY_CTA_GOAL} className="direct-sticky-bar__cta">
          {t("fabLabel")}
        </ContactCta>
      </div>
    );
  }

  return (
    <ContactCta
      variant="bare"
      goal={PRIMARY_CTA_GOAL}
      className={`contact-fab${hidden ? " contact-fab--hidden" : ""}`}
    >
      {t("fabLabel")}
    </ContactCta>
  );
}
