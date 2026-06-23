# Bober AI Dev (Next.js)

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

## Деплой в Railway через Docker

В репозитории есть production `Dockerfile` для Railway.

1. В Railway выбери **Deploy from GitHub repo**.
2. Railway автоматически найдёт `Dockerfile` и соберёт образ.
3. Убедись, что переменная `PORT` задаётся Railway (обычно автоматически).
4. Healthcheck настроен через `railway.toml` на `GET /api/health`.

Локальная проверка Docker:

```bash
docker build -t bober-ai-dev .
docker run --rm -p 3000:3000 bober-ai-dev
```
