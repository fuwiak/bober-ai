/**
 * Demand radar («радар спроса») — tracking contract.
 *
 * Metrica goals (idents already synced via `npm run metrika:goals`):
 *   cta_click      → primary_cta_click (alias)
 *   form_start     → form_start
 *   form_submit    → form_submit (+ lead_delivered on API accept)
 *
 * Params on every goal: service, source, landing_path (+ UTM via attributionGoalParams).
 * CRM columns (deals, pipeline) are NOT in Metrica — see DemandRadarCrmFields.
 */

export const DEMAND_RADAR_EVENTS = {
  /** CTA open / click — Metrika ident `primary_cta_click` */
  cta_click: "primary_cta_click",
  form_start: "form_start",
  form_submit: "form_submit",
  /** API accepted lead — optimize Direct here when volume allows */
  lead_delivered: "lead_delivered",
} as const;

export type DemandRadarEvent = keyof typeof DEMAND_RADAR_EVENTS;

/** Params required on CTA / form goals so landings stay distinguishable. */
export type DemandRadarGoalParams = {
  service: string;
  source: string;
  landing_path: string;
};

export const DEMAND_RADAR_PARAM_KEYS = ["service", "source", "landing_path"] as const;

/** Quality score after 3–6 months of data. */
export const DEMAND_RADAR_QUALITY_METRIC =
  "qualified_pipeline_value / (organic_visits / 100)";

export function normalizeLandingPath(path: string | undefined | null): string {
  if (!path) return "/";
  try {
    const raw = path.includes("://") ? new URL(path).pathname : path.split("?")[0] || "/";
    const cleaned = raw.replace(/\/+$/, "") || "/";
    return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  } catch {
    return "/";
  }
}
