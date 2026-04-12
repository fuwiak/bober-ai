import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kinetic AI — облако и корпоративный ИИ",
  description:
    "Официальный партнёр Yandex Cloud: AI-инфраструктура, миграция в облако, безопасность и DevOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body>
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
