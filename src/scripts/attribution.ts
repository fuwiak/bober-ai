import { captureAttribution, syncPaidTrafficMarker } from "@/lib/analytics";

/**
 * Capture UTM / referrer for forms. Source diagnostics (organic/direct)
 * live in Metrika «Источники» — no reachGoal noise in contact goals.
 */
function initAttribution() {
  captureAttribution();
  syncPaidTrafficMarker();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAttribution, { once: true });
} else {
  initAttribution();
}
