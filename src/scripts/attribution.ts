import {
  attributionGoalParams,
  captureAttribution,
  isOrganicTraffic,
  reachGoal,
  syncPaidTrafficMarker,
} from "@/lib/analytics";

const PAID_VISIT_KEY = "metrika_direct_visit_sent";
const ORGANIC_VISIT_KEY = "metrika_organic_visit_sent";
const LEGACY_PAID_KEY = "bober_paid_visit_sent";
const LEGACY_ORGANIC_KEY = "bober_organic_visit_sent";

function sessionHas(key: string): boolean {
  try {
    return Boolean(sessionStorage.getItem(key));
  } catch {
    return false;
  }
}

function claimOnce(storageKey: string, legacyKey: string): boolean {
  if (sessionHas(storageKey) || sessionHas(legacyKey)) return false;
  try {
    sessionStorage.setItem(storageKey, "1");
  } catch {
    /* private mode */
  }
  return true;
}

function initAttribution() {
  captureAttribution();
  const paid = syncPaidTrafficMarker();

  if (paid) {
    if (claimOnce(PAID_VISIT_KEY, LEGACY_PAID_KEY)) {
      reachGoal("direct_visit", attributionGoalParams({ kind: "source_diag" }));
    }
    return;
  }

  if (isOrganicTraffic() && claimOnce(ORGANIC_VISIT_KEY, LEGACY_ORGANIC_KEY)) {
    reachGoal("organic_visit", attributionGoalParams({ kind: "source_diag" }));
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAttribution, { once: true });
} else {
  initAttribution();
}
