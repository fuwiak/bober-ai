"use client";

import { useEffect } from "react";
import {
  attributionGoalParams,
  captureAttribution,
  reachGoal,
  syncPaidTrafficMarker,
} from "@/lib/analytics";

const PAID_VISIT_KEY = "bober_paid_visit_sent";
let paidVisitSent = false;

export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
    const paid = syncPaidTrafficMarker();
    if (!paid || paidVisitSent) return;

    try {
      if (sessionStorage.getItem(PAID_VISIT_KEY)) {
        paidVisitSent = true;
        return;
      }
      sessionStorage.setItem(PAID_VISIT_KEY, "1");
    } catch {
      // private mode
    }

    paidVisitSent = true;
    reachGoal("direct_visit", attributionGoalParams());
  }, []);

  return null;
}
