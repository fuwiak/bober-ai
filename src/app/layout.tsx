import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DEFAULT_KEYWORDS, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Kinetic AI — облако и корпоративный ИИ",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: absoluteUrl("/"),
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
    title: "Kinetic AI — облако и корпоративный ИИ",
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
    title: "Kinetic AI — облако и корпоративный ИИ",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/favicon.png")],
  },
  other: {
    keywords: DEFAULT_KEYWORDS.join(", "),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`dark ${manrope.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <Script id="yandex-metrika" strategy="beforeInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108970326', 'ym');

            ym(108970326, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        {process.env.NODE_ENV === "development" ? (
          <Script id="yandex-metrika-debug" strategy="afterInteractive">
            {`
              (function() {
                var hasYm = typeof window.ym === "function";
                if (hasYm) {
                  console.info("[YM debug] initialized: 108970326");
                } else {
                  console.warn("[YM debug] ym is not available (possible ad blocker or script load issue)");
                }
              })();
            `}
          </Script>
        ) : null}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108970326"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var k='theme';var t=localStorage.getItem(k);var d=t!=='light';document.documentElement.classList.toggle('dark',d);}catch(e){}})();`}
        </Script>
        <Script id="scroll-top-init" strategy="beforeInteractive">
          {`(function(){try{if('scrollRestoration'in history)history.scrollRestoration='manual';var h=location.hash;if(h&&h!=='#')return;scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;}catch(e){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
