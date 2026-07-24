"use client";

import { useEffect } from "react";
import {
  attributionGoalParams,
  captureAttribution,
  isOrganicTraffic,
  reachGoal,
  syncPaidTrafficMarker,
} from "@/lib/analytics";

/**
 * Диагностические события источника (НЕ конверсии / НЕ цели Direct):
 * - direct_visit — yclid / paid UTM
 * - organic_visit — referrer поисковика / utm_medium=organic
 *
 * Источник истины для SEO: Метрика → Источники → Поисковые системы.
 * Событие шлётся один раз за вкладку (sessionStorage), не на каждый route.
 */
const PAID_VISIT_KEY = "metrika_direct_visit_sent";
const ORGANIC_VISIT_KEY = "metrika_organic_visit_sent";
const LEGACY_PAID_KEY = "bober_paid_visit_sent";
const LEGACY_ORGANIC_KEY = "bober_organic_visit_sent";
let paidVisitSent = false;
let organicVisitSent = false;

function sessionHas(key: string): boolean {
  try {
    return Boolean(sessionStorage.getItem(key));
  } catch {
    return false;
  }
}

function claimOnce(storageKey: string, legacyKey: string, alreadySent: boolean, markSent: () => void): boolean {
  if (alreadySent || sessionHas(storageKey) || sessionHas(legacyKey)) {
    markSent();
    return false;
  }
  try {
    sessionStorage.setItem(storageKey, "1");
  } catch {
    // private mode — once per page-load via memory flag
  }
  markSent();
  return true;
}

export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
    const paid = syncPaidTrafficMarker();

    // Только первый hit визита — не при SPA-навигации (пустой deps).
    if (paid) {
      if (
        claimOnce(PAID_VISIT_KEY, LEGACY_PAID_KEY, paidVisitSent, () => {
          paidVisitSent = true;
        })
      ) {
        reachGoal("direct_visit", attributionGoalParams({ kind: "source_diag" }));
      }
      return;
    }

    if (
      isOrganicTraffic() &&
      claimOnce(ORGANIC_VISIT_KEY, LEGACY_ORGANIC_KEY, organicVisitSent, () => {
        organicVisitSent = true;
      })
    ) {
      reachGoal("organic_visit", attributionGoalParams({ kind: "source_diag" }));
    }
  }, []);

  return null;
}
