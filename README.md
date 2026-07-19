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

Прод сейчас на **Selectel VDS** (`deploy/` + Caddy). `Dockerfile` / `railway.toml` оставлены как запасной вариант.

### Ops CLI (аналог Railway status / logs / healthcheck)

Bubble Tea CLI в `cli/` — статус контейнера, логи и Network › Healthcheck:

```bash
npm run ops:status    # контейнер + deploy + health
npm run ops:health    # GET /api/health (public + IP)
npm run ops:logs      # docker logs (добавь -- -f для follow)
npm run ops:build     # хвост /var/log/bober-deploy.log
npm run ops           # интерактивный TUI
```

По умолчанию: хост `45.80.131.136`, ключ `~/.ssh/bober_selectel`. Переопределение через `BOBER_HOST`, `BOBER_SSH_KEY`, `BOBER_PUBLIC_URL`.

### Docker локально

```bash
docker build -t bober-ai-dev .
docker run --rm -p 8080:80 bober-ai-dev
curl -sS http://localhost:8080/api/health
```
