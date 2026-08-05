/**
 * Quality for a landing after 3–6 months:
 *   qualified_pipeline_value / (organic_visits / 100)
 *
 * Returns null when visits are 0/unknown or pipeline is unknown.
 */
export function qualifiedPipelinePer100Visits(
  qualifiedPipelineValue: number | null | undefined,
  organicVisits: number | null | undefined,
): number | null {
  if (qualifiedPipelineValue == null || !Number.isFinite(qualifiedPipelineValue)) return null;
  if (organicVisits == null || !Number.isFinite(organicVisits) || organicVisits <= 0) return null;
  return qualifiedPipelineValue / (organicVisits / 100);
}

/** Sort landings weakest-first for monthly hypothesis kill. */
export function rankByQualityAscending<T extends { quality_score: number | null }>(
  rows: T[],
): T[] {
  return [...rows].sort((a, b) => {
    const av = a.quality_score;
    const bv = b.quality_score;
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    return av - bv;
  });
}
