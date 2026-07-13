"use client";

import { createContext, useCallback, useContext, useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";

type ContactModalContextValue = {
  open: (defaultService?: string) => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return context;
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultService, setDefaultService] = useState("");
  const titleId = useId();
  const t = useTranslations("contact");

  const open = useCallback((service = "") => {
    setDefaultService(service);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setDefaultService("");
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, isOpen]);

  return (
    <ContactModalContext.Provider value={{ open, close }}>
      {children}
      {isOpen ? (
        <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <button type="button" className="contact-modal__backdrop" aria-label={t("modalClose")} onClick={close} />
          <div className="contact-modal__panel">
            <div className="contact-modal__header">
              <div>
                <h2 id={titleId} className="card-title text-2xl">
                  {t("title")}
                </h2>
                <p className="body-copy mt-3 text-base">{t("subtitle")}</p>
              </div>
              <button type="button" className="contact-modal__close" onClick={close} aria-label={t("modalClose")}>
                ×
              </button>
            </div>
            <ContactForm defaultService={defaultService} onSuccess={close} />
          </div>
        </div>
      ) : null}
    </ContactModalContext.Provider>
  );
}
