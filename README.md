# Bober AI Systems (Astro + HTMX)

Сайт на **Astro 5** (HTML-компоненты + HTMX + TypeScript), деплой **только Selectel**.

## Локальный запуск

Требования: `Node.js 20+` (рекомендуется `22`).

1. `npm install`
2. `npm run dev` → `http://localhost:4321`
3. Прод-режим локально: `npm run build && npm run start` → `:3000`

## Стек

- Astro pages/layouts (prerender) + `@astrojs/node` для `/api/contact`, `/api/health`, `/api/kwork/webhook`
- Контент: `src/content/ru.ts`, `src/content/en.ts`, `src/lib/seo-catalog/`
- Стили: Tailwind 4 (`src/styles/globals.css`)
- Формы: HTMX → `POST /api/contact`

## Деплой (Selectel)

Единственный origin: VDS `45.80.131.136`. См. [`deploy/DUAL-ORIGIN.md`](deploy/DUAL-ORIGIN.md).

```bash
# на машине с Docker (локально или CI)
docker build -t bober-ai:latest .
# на VDS: compose с Caddy + web
cd deploy && docker compose up -d --build
```

Caddy: TLS + reverse_proxy на `:3000`, host rewrite для `partners.*` → `/white-label`, `bitrix.*` → `/bitrix`.

### GitHub Actions

Workflow [`.github/workflows/selectel-build.yml`](.github/workflows/selectel-build.yml):

| Когда | Что | Статус в UI |
|-------|-----|-------------|
| push/PR → `main` | `docker build` (тот же Dockerfile) | зелёная галка = образ собирается |
| push → `main` или manual | SSH на VDS → `compose up -d --build` → `/api/health` | зелёная = Selectel deploy ок |

Секрет: `SELECTEL_SSH_KEY` (тот же, что у `selectel-rescue-sync`). Смотреть: **Actions** → `selectel-build`, или галка у коммита на `main`.

### Ops CLI

```bash
npm run ops:install
bober          # TUI
bober status
bober health
```

## Yandex / Bitrix / feeds

Скрипты `npm run webmaster:*`, `yandex:*`, `bitrix:*`, `feeds:generate` — без изменений по смыслу.
