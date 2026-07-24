import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CookieConsent } from "@/components/CookieConsent";
import { AttributionCapture } from "@/components/AttributionCapture";
import { Varioqub } from "@/components/Varioqub";
import { YandexMetrika } from "@/components/YandexMetrika";
import { DEFAULT_KEYWORDS, FOUNDER_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

/** Architectural sans — близко к TT Wellingtons / DIN у Alcon DC. */
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Автоматизация КП, документов и CRM с AI — Bober AI",
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
    // Yandex recommends 120×120 (or SVG) for clear snippet favicons.
    icon: [
      { url: "/favicon-120x120.png", type: "image/png", sizes: "120x120" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico", "/favicon-16x16.png", "/favicon-32x32.png"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    yandex: "b5643e127be991c8",
    // Задать в Railway после добавления сайта в Google Search Console.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
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
    title: "Автоматизация КП, документов и CRM с AI — Bober AI",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: absoluteUrl(FOUNDER_IMAGE),
        width: 1024,
        height: 768,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Автоматизация КП, документов и CRM с AI — Bober AI",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(FOUNDER_IMAGE)],
  },
  other: {
    keywords: DEFAULT_KEYWORDS.join(", "),
    "geo.region": "RU-MOW",
    "geo.placename": "Moscow",
    "geo.position": "55.6665;37.7448",
    ICBM: "55.6665, 37.7448",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#12141a" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6ec" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body className={`${manrope.variable} ${ibmPlexMono.variable}`}>
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
        <Varioqub />
      </body>
    </html>
  );
}
