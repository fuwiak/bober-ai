"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getCookieConsent, type CookieConsentValue } from "@/components/CookieConsent";
import { YANDEX_METRIKA_ID } from "@/lib/legal";

export function YandexMetrika() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);

  useEffect(() => {
    setConsent(getCookieConsent());

    function onConsentChange(event: Event) {
      const detail = (event as CustomEvent<CookieConsentValue>).detail;
      setConsent(detail);
    }

    window.addEventListener("cookie-consent-change", onConsentChange);
    return () => window.removeEventListener("cookie-consent-change", onConsentChange);
  }, []);

  if (consent !== "accepted") return null;

  const id = YANDEX_METRIKA_ID;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}', 'ym');

          ym(${id}, 'init', {ssr:true, webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
        `}
      </Script>
      {process.env.NODE_ENV === "development" ? (
        <Script id="yandex-metrika-debug" strategy="afterInteractive">
          {`
            (function() {
              var hasYm = typeof window.ym === "function";
              if (hasYm) {
                console.info("[YM debug] initialized: ${id}");
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
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
