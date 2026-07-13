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
  const { open } = useContactModal();

  const variantClass =
    variant === "secondary" ? "btn-secondary" : variant === "link" ? "text-link text-[11px] uppercase tracking-[0.16em]" : "btn-primary";

  return (
    <button
      type="button"
      className={`${variantClass} ${className}`.trim()}
      onClick={() => open(defaultService)}
    >
      {children}
    </button>
  );
}
