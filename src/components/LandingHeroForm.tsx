"use client";

import { useEffect, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { isPaidTraffic, syncPaidTrafficMarker } from "@/lib/analytics";

type LandingHeroFormProps = {
  defaultService: string;
  title: string;
  subtitle: string;
};

/**
 * Форма в первом экране лендинга.
 * Для Direct (yclid / cpc) — квалификация без A/B short-формы.
 */
export function LandingHeroForm({ defaultService, title, subtitle }: LandingHeroFormProps) {
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    syncPaidTrafficMarker();
    setPaid(isPaidTraffic());
  }, []);

  return (
    <div className="landing-hero-form feature-card-bordered" id="contact-hero">
      <p className="meta-label">{title}</p>
      <p className="body-copy mt-2 text-sm">{subtitle}</p>
      <div className="mt-5">
        <ContactForm
          defaultService={defaultService}
          qualify={paid}
          abTestLength={!paid}
        />
      </div>
    </div>
  );
}
