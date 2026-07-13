"use client";

import { useContactModal } from "@/components/ContactModalProvider";

type ContactCtaProps = {
  children: React.ReactNode;
  className?: string;
  defaultService?: string;
  variant?: "primary" | "secondary" | "link";
};

export function ContactCta({
  children,
  className = "",
  defaultService = "",
  variant = "primary",
}: ContactCtaProps) {
  const modal = useContactModal();

  const variantClass =
    variant === "secondary" ? "btn-secondary" : variant === "link" ? "text-link text-[11px] uppercase tracking-[0.16em]" : "btn-primary";

  if (!modal) {
    return (
      <a href="/#contact" className={`${variantClass} ${className}`.trim()}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${variantClass} ${className}`.trim()}
      onClick={() => modal.open(defaultService)}
    >
      {children}
    </button>
  );
}
