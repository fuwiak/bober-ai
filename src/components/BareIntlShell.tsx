import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ContactModalProvider } from "@/components/ContactModalProvider";

type BareIntlShellProps = {
  children: React.ReactNode;
  locale?: "ru" | "en";
};

/**
 * /blog, /privacy-policy и другие bare-роуты вне [locale] всё равно
 * используют SiteHeader/ContactForm с next-intl — нужен провайдер.
 */
export async function BareIntlShell({ children, locale = "ru" }: BareIntlShellProps) {
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ContactModalProvider>{children}</ContactModalProvider>
    </NextIntlClientProvider>
  );
}
