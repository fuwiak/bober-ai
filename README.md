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

### Yaga — модульный Yandex CLI

**yaga** (Яга): один CLI на сервисы Яндекса, каждый сервис = brick в `cli/yaga/src/bricks/`.

```bash
npm run yaga:install
yaga bricks
yaga profile public    # спрятать owner-bricks (Direct, GPT, …)
yaga webmaster status
yaga metrika status
yaga direct campaigns status
```

Подробнее: [`cli/yaga/README.md`](cli/yaga/README.md).

### Docker локально

```bash
docker build -t bober-ai-dev .
docker run --rm -p 8080:80 bober-ai-dev
curl -sS http://localhost:8080/api/health
```
