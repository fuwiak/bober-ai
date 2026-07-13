"use client";

import { createContext, useCallback, useContext, useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";

type ContactModalContextValue = {
  open: (defaultService?: string) => void;
  close: () => void;
};

export const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  return useContext(ContactModalContext);
}

const MODAL_EXIT_MS = 240;

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [defaultService, setDefaultService] = useState("");
  const titleId = useId();
  const t = useTranslations("contact");

  const open = useCallback((service = "") => {
    setDefaultService(service);
    setMounted(true);
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible && mounted) {
      const timer = window.setTimeout(() => {
        setMounted(false);
        setDefaultService("");
      }, MODAL_EXIT_MS);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [mounted, visible]);

  useEffect(() => {
    if (!mounted) return;
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
  }, [close, mounted]);

  return (
    <ContactModalContext.Provider value={{ open, close }}>
      {children}
      {mounted ? (
        <div
          className={`contact-modal${visible ? " contact-modal--open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
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
