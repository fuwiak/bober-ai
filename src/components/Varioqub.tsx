"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getCookieConsent, type CookieConsentValue } from "@/components/CookieConsent";
import {
  BITRIX_YANDEX_METRIKA_ID,
  PARTNERS_YANDEX_METRIKA_ID,
  YANDEX_METRIKA_ID,
} from "@/lib/legal";

/** Loads only after cookie consent «Принять», same gate as Metrika. */
export function Varioqub() {
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

  return (
    <Script id="varioqub" strategy="afterInteractive">
      {`
        var isPartnersLanding = location.hostname.toLowerCase() === 'partners.bober-ai.dev' || location.pathname.indexOf('/white-label') === 0;
        var isBitrixLanding = location.hostname.toLowerCase() === 'bitrix.bober-ai.dev' || location.pathname.indexOf('/bitrix') === 0;
        var id = isPartnersLanding ? ${PARTNERS_YANDEX_METRIKA_ID} : (isBitrixLanding ? ${BITRIX_YANDEX_METRIKA_ID} : ${YANDEX_METRIKA_ID});
        (function(e, x, pe, r, i, me, nt){
          e[i]=e[i]||function(){(e[i].a=e[i].a||[]).push(arguments)},
          me=x.createElement(pe),me.async=1,me.src=r,nt=x.getElementsByTagName(pe)[0],
          me.addEventListener('error',function(){
            function cb(t){t=t[t.length-1],'function'==typeof t&&t({flags:{}})};
            Array.isArray(e[i].a)&&e[i].a.forEach(cb);
            e[i]=function(){cb(arguments)}
          }),
          nt.parentNode.insertBefore(me,nt)
        })(window, document, 'script', 'https://abt.s3.yandex.net/expjs/latest/exp.js', 'ymab');
        ymab('metrika.' + id, 'init');
      `}
    </Script>
  );
}
