import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Saira_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";
import { AttributionCapture } from "@/components/AttributionCapture";
import { YandexMetrika } from "@/components/YandexMetrika";
import { DEFAULT_KEYWORDS, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const sairaCondensed = Saira_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-saira",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-cormorant",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Внедрение AI и автоматизация для бизнеса",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      ru: absoluteUrl("/"),
      en: absoluteUrl("/en"),
      "x-default": absoluteUrl("/"),
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-120x120.png", type: "image/png", sizes: "120x120" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico", "/favicon-16x16.png", "/favicon-32x32.png"],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    yandex: "53fda44dc6d2443f",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Внедрение AI и автоматизация для бизнеса",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: absoluteUrl("/favicon.png"),
        width: 512,
        height: 512,
        alt: `${SITE_NAME} favicon`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Внедрение AI и автоматизация для бизнеса",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/favicon.png")],
  },
  other: {
    keywords: DEFAULT_KEYWORDS.join(", "),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body className={`${sairaCondensed.variable} ${cormorant.variable} ${ibmPlexMono.variable}`}>
        <Script id="locale-lang" strategy="beforeInteractive">
          {`(function(){try{var p=location.pathname;var l=(p==='/en'||p.indexOf('/en/')===0)?'en':'ru';document.documentElement.lang=l;}catch(e){}})();`}
        </Script>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var k='theme';var t=localStorage.getItem(k);var d=t!=='light';document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`}
        </Script>
        <Script id="scroll-top-init" strategy="beforeInteractive">
          {`(function(){try{if('scrollRestoration'in history)history.scrollRestoration='manual';var h=location.hash;if(h&&h!=='#')return;scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;}catch(e){}})();`}
        </Script>
        {children}
        <AttributionCapture />
        <CookieConsent />
        <YandexMetrika />
      </body>
    </html>
  );
}
