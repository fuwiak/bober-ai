"use client";

import { useEffect } from "react";
import {
  attributionGoalParams,
  captureAttribution,
  isOrganicTraffic,
  reachGoal,
  syncPaidTrafficMarker,
} from "@/lib/analytics";

const PAID_VISIT_KEY = "bober_paid_visit_sent";
const ORGANIC_VISIT_KEY = "bober_organic_visit_sent";
let paidVisitSent = false;
let organicVisitSent = false;

function claimOnce(storageKey: string, alreadySent: boolean, markSent: () => void): boolean {
  if (alreadySent) return false;
  try {
    if (sessionStorage.getItem(storageKey)) {
      markSent();
      return false;
    }
    sessionStorage.setItem(storageKey, "1");
  } catch {
    // private mode
  }
  markSent();
  return true;
}

export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
    const paid = syncPaidTrafficMarker();

    if (paid) {
      if (claimOnce(PAID_VISIT_KEY, paidVisitSent, () => { paidVisitSent = true; })) {
        reachGoal("direct_visit", attributionGoalParams());
      }
      return;
    }

    if (
      isOrganicTraffic() &&
      claimOnce(ORGANIC_VISIT_KEY, organicVisitSent, () => { organicVisitSent = true; })
    ) {
      reachGoal("organic_visit", attributionGoalParams());
    }
  }, []);

  return null;
}
