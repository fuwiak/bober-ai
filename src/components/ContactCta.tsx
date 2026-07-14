"use client";

import { useContactModal } from "@/components/ContactModalProvider";
import { reachGoal } from "@/lib/analytics";

type ContactCtaProps = {
  children: React.ReactNode;
  className?: string;
  defaultService?: string;
  variant?: "primary" | "secondary" | "link";
  goal?: string;
};

export function ContactCta({
  children,
  className = "",
  defaultService = "",
  variant = "primary",
  goal = "audit_cta_click",
}: ContactCtaProps) {
  const modal = useContactModal();

  const variantClass =
    variant === "secondary" ? "btn-secondary" : variant === "link" ? "text-link text-[11px] uppercase tracking-[0.16em]" : "btn-primary";

  if (!modal) {
    return (
      <a href="/#contact" className={`${variantClass} ${className}`.trim()} onClick={() => reachGoal(goal)}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${variantClass} ${className}`.trim()}
      onClick={() => {
        reachGoal(goal);
        modal.open(defaultService);
      }}
    >
      {children}
    </button>
  );
}
