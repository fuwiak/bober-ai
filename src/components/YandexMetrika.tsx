"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  PARTNERS_YANDEX_METRIKA_ID,
  YANDEX_METRIKA_ID,
  yandexMetrikaIdForLocation,
} from "@/lib/legal";

type YmFn = (id: number, method: string, ...args: unknown[]) => void;

/** Loads on every visit (no cookie-consent gate) so traffic and Metrika code_status stay complete. */
export function YandexMetrika() {
  const pathname = usePathname();
  const firstPageRef = useRef(true);
  const previousUrlRef = useRef("");

  useEffect(() => {
    if (firstPageRef.current) {
      firstPageRef.current = false;
      previousUrlRef.current = window.location.href;
      return;
    }

    const ym = (window as Window & { ym?: YmFn }).ym;
    if (typeof ym !== "function") return;

    const id = Number(yandexMetrikaIdForLocation(window.location.hostname, window.location.pathname));
    if (!Number.isFinite(id)) return;

    ym(id, "hit", window.location.href, {
      title: document.title,
      referer: previousUrlRef.current || document.referrer,
    });
    previousUrlRef.current = window.location.href;
  }, [pathname]);

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          var mainId = ${YANDEX_METRIKA_ID};
          var partnersId = ${PARTNERS_YANDEX_METRIKA_ID};
          var isPartnersLanding = location.hostname.toLowerCase() === 'partners.bober-ai.dev' || location.pathname.indexOf('/white-label') === 0;
          var id = isPartnersLanding ? partnersId : mainId;
          (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=' + id, 'ym');

          ym(id, 'init', {ssr:true, webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
        `}
      </Script>
      {process.env.NODE_ENV === "development" ? (
        <Script id="yandex-metrika-debug" strategy="afterInteractive">
          {`
            (function() {
              var isPartnersLanding = location.hostname.toLowerCase() === 'partners.bober-ai.dev' || location.pathname.indexOf('/white-label') === 0;
              var id = isPartnersLanding ? ${PARTNERS_YANDEX_METRIKA_ID} : ${YANDEX_METRIKA_ID};
              var hasYm = typeof window.ym === "function";
              if (hasYm) {
                console.info("[YM debug] initialized: " + id);
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
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
