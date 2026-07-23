"use client";

import { useContactModal } from "@/components/ContactModalProvider";
import { useCtaDestinationVariant } from "@/hooks/useAbVariant";
import { reachGoal } from "@/lib/analytics";
import { CALENDAR_URL, PRIMARY_CTA_GOAL } from "@/lib/site";
import { useTranslations } from "next-intl";

type ContactCtaProps = {
  children: React.ReactNode;
  className?: string;
  defaultService?: string;
  variant?: "primary" | "secondary" | "link" | "bare";
  goal?: string;
  /** When false, skip A/B calendar destination (e.g. secondary / contextual CTAs). */
  abTestDestination?: boolean;
};

export function ContactCta({
  children,
  className = "",
  defaultService = "",
  variant = "primary",
  goal = PRIMARY_CTA_GOAL,
  abTestDestination = true,
}: ContactCtaProps) {
  const modal = useContactModal();
  const t = useTranslations("cta");
  const destination = useCtaDestinationVariant();
  const useCalendar =
    abTestDestination &&
    (variant === "primary" || variant === "bare") &&
    destination === "calendar" &&
    Boolean(CALENDAR_URL);

  const variantClass =
    variant === "secondary"
      ? "btn-secondary"
      : variant === "link"
        ? "link-more"
        : variant === "bare"
          ? ""
          : "btn-primary";
  const label = useCalendar ? t("calendar") : children;
  const classNames = `${variantClass} ${className}`.trim();

  function onActivate() {
    reachGoal(goal, {
      destination: useCalendar ? "calendar" : "form",
      ab_cta_destination: destination,
    });
    if (useCalendar) {
      reachGoal("calendar_cta_click");
      window.open(CALENDAR_URL, "_blank", "noopener,noreferrer");
      return;
    }
    modal?.open(defaultService);
  }

  if (!modal && !useCalendar) {
    return (
      <a
        href="/#contact"
        className={classNames}
        onClick={() => reachGoal(goal, { destination: "form", ab_cta_destination: destination })}
      >
        {children}
      </a>
    );
  }

  if (useCalendar) {
    return (
      <a
        href={CALENDAR_URL}
        target="_blank"
        rel="noreferrer"
        className={classNames}
        onClick={(event) => {
          event.preventDefault();
          onActivate();
        }}
      >
        {label}
      </a>
    );
  }

  return (
    <button type="button" className={classNames} onClick={onActivate}>
      {label}
    </button>
  );
}
