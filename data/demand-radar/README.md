# Demand radar (радар спроса)

Per-landing quality table — not one blob of site stats.

## Can Metrica / Webmaster do this?

| Metric | Source |
|---|---|
| Impressions (показы), avg position | **Webmaster** (API popular queries site-level; per-URL → `webmaster-urls/YYYY-MM.json` or Webmaster UI export) |
| Organic visits, CTA, form start/submit | **Metrica** goals + `ym:s:startURLPath` |
| Conversations, qualified leads, pipeline, signed deals, avg budget | **Manual CRM** (`manual/YYYY-MM.json`) — Metrica cannot know deals |

Quality (after 3–6 months):

```text
qualified_pipeline_value / (organic_visits / 100)
```

## Tracking contract

Events (Metrika idents via `npm run metrika:goals`):

- `cta_click` → `primary_cta_click`
- `form_start` → `form_start`
- `form_submit` → `form_submit` (+ `lead_delivered` on API accept)

Params on every goal: `service`, `source`, `landing_path` (+ UTM).

Forms already send hidden `service` + `source`; landings set them per page (`landing-order-…`, `landing-estimate-…`).

## Monthly report

```bash
# Previous calendar month (needs OAuth with metrika:read + webmaster)
npm run demand-radar:report

npm run demand-radar:report -- --month 2026-07
npm run demand-radar:report -- --dry   # empty schema, no API
```

Writes:

- `data/demand-radar/YYYY-MM.json`
- `data/demand-radar/YYYY-MM.csv`
- `data/demand-radar/YYYY-MM.md`

## Manual CRM

Copy `manual/YYYY-MM.example.json` → `manual/YYYY-MM.json`:

```json
{
  "landings": [
    {
      "landing_path": "/ai/corporate",
      "service": "Корпоративный ИИ-ассистент",
      "lead_source": "organic-yandex",
      "conversations": 3,
      "qualified_leads": 2,
      "pipeline_value": 800000,
      "signed_deals": 1,
      "avg_budget": 400000
    }
  ]
}
```

## Per-URL Webmaster shows

API popular queries are query-level. For URL impressions/position put:

`webmaster-urls/YYYY-MM.json`:

```json
{
  "urls": [
    { "landing_path": "/ai/corporate", "impressions": 1200, "avg_position": 8.4 }
  ]
}
```

## Kill weak hypotheses

Report sorts by `quality_score` ascending (weakest first). After 3–6 months of data, close bottom landings.
