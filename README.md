# Bober AI Systems (Next.js)

Проект переведён на чистый `Next.js` (App Router) без `Vite`.

## Локальный запуск

Требования: `Node.js 20+` (рекомендуется `22`).

1. Установить зависимости:
   `npm install`
2. Запустить dev-сервер:
   `npm run dev`
3. Открыть:
   `http://localhost:3000`

## Продакшн-сборка

1. Собрать проект:
   `npm run build`
2. Запустить в production:
   `npm run start`

## Деплой

Прод: **два origin** — Selectel (РФ / без VPN) и Railway (VPN / мир). См. [`deploy/DUAL-ORIGIN.md`](deploy/DUAL-ORIGIN.md).

- Railway: `railway up --detach` → `https://bober-ai-production.up.railway.app`
- Selectel VDS: `deploy/` + Caddy (`45.80.131.136`)

`Dockerfile` / `railway.toml` — основной путь для Railway; Selectel использует тот же образ/статику через `/opt/bober-ai`.

### Ops CLI (аналог Railway status / logs / healthcheck)

Bubble Tea CLI в `cli/` — статус контейнера, логи и Network › Healthcheck.

**Один раз установить** (глобальная команда `bober` + post-commit хук):

```bash
npm run ops:install
```

Потом из **любой** директории — **одно окно**, вкладки:

```bash
bober              # TUI → Status
bober status       # та же TUI, вкладка Status
bober health       # вкладка Health
bober logs         # вкладка Logs (live)
bober build        # вкладка Build
```

Внутри: `Tab` / `←` `→` / `1`–`4` — переключение, `f` — live follow, `r` — refresh, `q` — выход.

Для скриптов/хука (без TUI): `bober status --plain`.

После каждого `git commit` хук запускает `bober status --plain`. Отключить: `BOBER_OPS_SKIP=1 git commit ...`.

Без install:

```bash
npm run ops:status
npm run ops
```

### Yaga — модульный Yandex CLI (Go + TUI)

**yaga** на том же стеке, что `bober` (Go + Bubble Tea). Сервисы = bricks.

```bash
npm run yaga:install
yaga                 # TUI
yaga bricks
yaga profile public  # спрятать owner-bricks
yaga webmaster status
yaga webmaster seo   # чеклист позиций (ИКС / диагностика / индекс)
```

Подробнее: [`cli/yaga/README.md`](cli/yaga/README.md).

### Publish — статьи site-first (Medium / Habr)

Источник: `articles/<slug>/article.md`. Сначала сайт, потом репост.

```bash
npm run publish -- list
npm run publish -- site <slug>
npm run publish -- open-medium-import <slug>   # Import from URL (без Medium API)
npm run publish -- habr export <slug>
npm run publish -- habr open-draft <slug>
```

Подробнее: [`cli/publish/README.md`](cli/publish/README.md) · конвенция: [`articles/README.md`](articles/README.md).

### Docker локально

```bash
docker build -t bober-ai-dev .
docker run --rm -p 8080:80 bober-ai-dev
curl -sS http://localhost:8080/api/health
```
