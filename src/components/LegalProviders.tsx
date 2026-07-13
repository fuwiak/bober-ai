"use client";

import { NextIntlClientProvider } from "next-intl";
import { ContactFab } from "@/components/ContactFab";
import { ContactModalProvider } from "@/components/ContactModalProvider";

type LegalProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export function LegalProviders({ children, locale, messages }: LegalProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ContactModalProvider>
        {children}
        <ContactFab />
      </ContactModalProvider>
    </NextIntlClientProvider>
  );
}
