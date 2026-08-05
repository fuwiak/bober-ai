/**
 * Monthly per-landing demand radar row.
 *
 * Automated: Webmaster (impressions, avg position) + Metrica (visits, goals).
 * Manual CRM: conversations, qualified leads, pipeline, deals, avg budget, lead source label.
 */

export type DemandRadarFieldSource = "webmaster" | "metrika" | "manual" | "computed";

export type DemandRadarLandingRow = {
  /** Canonical path, e.g. `/ai/corporate` */
  landing_path: string;
  /** Service name passed on forms / CTAs */
  service?: string;
  /** Dominant form source tag for the period (or manual override) */
  lead_source?: string;

  // —— Webmaster ——
  impressions: number | null;
  avg_position: number | null;

  // —— Metrica ——
  organic_visits: number | null;
  cta_clicks: number | null;
  form_starts: number | null;
  form_submits: number | null;

  // —— Manual CRM (Metrica cannot know these) ——
  conversations: number | null;
  qualified_leads: number | null;
  pipeline_value: number | null;
  signed_deals: number | null;
  avg_budget: number | null;

  // —— Computed ——
  /** qualified_pipeline_value / (organic_visits / 100) */
  quality_score: number | null;
};

export type DemandRadarCrmFields = Pick<
  DemandRadarLandingRow,
  | "conversations"
  | "qualified_leads"
  | "pipeline_value"
  | "signed_deals"
  | "avg_budget"
  | "lead_source"
  | "service"
>;

export type DemandRadarMonthReport = {
  month: string;
  generated_at: string;
  host: string;
  counter_id: string;
  quality_metric: string;
  notes: string[];
  landings: DemandRadarLandingRow[];
  /** Site-level Webmaster popular queries (URL-level shows often need manual CSV). */
  webmaster_queries?: Array<{
    query: string;
    shows: number | null;
    clicks: number | null;
    avg_position: number | null;
  }>;
};

export const DEMAND_RADAR_FIELD_SOURCES: Record<
  keyof Omit<DemandRadarLandingRow, "landing_path" | "service" | "lead_source">,
  DemandRadarFieldSource
> = {
  impressions: "webmaster",
  avg_position: "webmaster",
  organic_visits: "metrika",
  cta_clicks: "metrika",
  form_starts: "metrika",
  form_submits: "metrika",
  conversations: "manual",
  qualified_leads: "manual",
  pipeline_value: "manual",
  signed_deals: "manual",
  avg_budget: "manual",
  quality_score: "computed",
};
