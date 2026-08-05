# Радар спроса (demand radar)

Каждый лендинг меряется отдельно. Качество через 3–6 месяцев:

`значение квалифицированного pipeline / 100 органических визитов`

См. `data/demand-radar/README.md`.

Код:

- `src/lib/demand-radar/` — контракт событий, типы, quality helper
- `scripts/demand-radar-report.mjs` — месячный отчёт
- формы/CTA шлют `service`, `source`, `landing_path` в Метрику

Metrica ≠ CRM: сделки и pipeline только вручную / позже из Bitrix.
