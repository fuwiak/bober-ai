"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  BITRIX_YANDEX_METRIKA_ID,
  PARTNERS_YANDEX_METRIKA_ID,
  YANDEX_METRIKA_ID,
  yandexMetrikaIdForLocation,
} from "@/lib/legal";

type YmFn = (id: number, method: string, ...args: unknown[]) => void;

/**
 * Яндекс.Метрика всегда активна (hit + цели).
 * Cookie-баннер — юридическая фасада; отказ «Только необходимые» её не отключает.
 */
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
          var bitrixId = ${BITRIX_YANDEX_METRIKA_ID};
          var host = location.hostname.toLowerCase();
          var path = location.pathname;
          var isPartnersLanding = host === 'partners.bober-ai.dev' || path.indexOf('/white-label') === 0;
          var isBitrixLanding = host === 'bitrix.bober-ai.dev' || path.indexOf('/bitrix') === 0;
          var id = isPartnersLanding ? partnersId : (isBitrixLanding ? bitrixId : mainId);
          (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=' + id, 'ym');

          ym(id, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            trackHash: true,
            referrer: document.referrer,
            url: location.href
          });
        `}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
      {process.env.NODE_ENV === "development" ? (
        <Script id="yandex-metrika-debug" strategy="afterInteractive">
          {`
            (function() {
              var host = location.hostname.toLowerCase();
              var path = location.pathname;
              var isPartnersLanding = host === 'partners.bober-ai.dev' || path.indexOf('/white-label') === 0;
              var isBitrixLanding = host === 'bitrix.bober-ai.dev' || path.indexOf('/bitrix') === 0;
              var id = isPartnersLanding ? ${PARTNERS_YANDEX_METRIKA_ID} : (isBitrixLanding ? ${BITRIX_YANDEX_METRIKA_ID} : ${YANDEX_METRIKA_ID});
              setTimeout(function() {
                if (typeof window.ym === "function") {
                  console.info("[YM debug] initialized (always-on): " + id);
                } else {
                  console.warn("[YM debug] ym not available (adblock?)");
                }
              }, 1500);
            })();
          `}
        </Script>
      ) : null}
    </>
  );
}
