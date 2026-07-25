# Kwork Bitrix (Bober AI)

Сервис агрегации лидов продавца в воронку Bitrix24. Ориентирован на **локальное приложение** сейчас и на публикацию в **Bitrix24 Marketplace** позже.

**Не ApiMonster** — свой Python-сервис + входящий webhook Bitrix24.

## Воронка (сделки)

| Стадия | STATUS_ID (внутри категории) |
|--------|------------------------------|
| Новый | `NEW` |
| Подходит | `FIT` |
| Ответ подготовлен | `REPLY_READY` |
| Отклик отправлен | `REPLY_SENT` |
| Клиент ответил | `CLIENT_REPLIED` |
| Переговоры | `NEGOTIATION` |

Дедуп: `ORIGINATOR_ID` = источник (`kwork` / …) + `ORIGIN_ID` = внешний id.

## Источники

| Источник | Статус |
|----------|--------|
| **Kwork** | Рабочий путь: cookie-сессия `GET /get_manage_orders` (как в `scripts/lib/kwork-session.mjs`). Опционально `pykwork` (неофициальный mobile API). |
| Telegram-канал | Заглушка `sources/telegram.py` |
| FL.ru | Заглушка `sources/flru.py` |

### Честно про Kwork и ToS

- Публичного API Kwork для сторонних интеграций **нет**.
- Используются **неофициальные** обходы (cookies продавца и/или `pykwork`). Это **может нарушать ToS Kwork**, ломаться без предупреждения, требовать повторный логин.
- В Marketplace-листинге **обязательно** указать: доступ к Kwork неофициальный; продавец использует **свои** учётные данные; издатель не хранит чужие cookies в репозитории.
- Сервис обращается только к **аккаунту продавца**, не к чужим приватным данным.

При истечении сессии: явный лог `KworkSessionExpired`, HTTP 503 на sync, опциональный алерт в Telegram (`KWORK_BITRIX_ALERT_TG_*`).

## Быстрый старт

```bash
cd services/kwork-bitrix
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Заполните BITRIX_WEBHOOK_URL и (для live) KWORK_COOKIE / KWORK_COOKIES_FILE

# Offline dry-run (без Bitrix / без cookies)
python -m kwork_bitrix dry-run --json-file ../../data/kwork-orders.example.json

# Создать воронку один раз
python -m kwork_bitrix ensure-funnel
# или: python scripts/ensure_funnel.py

# Sync (dry-run)
python -m kwork_bitrix sync --no-write --json-file ../../data/kwork-orders.example.json

# API
python -m kwork_bitrix serve
# GET  /health
# POST /sources/kwork/sync?dry_run=true   (+ X-Sync-Token)
# POST /funnel/ensure
```

Из корня монорепо:

```bash
npm run kwork-bitrix:sync -- --json-file data/kwork-orders.example.json --no-write
npm run kwork-bitrix:ensure-funnel
npm run kwork-bitrix:serve
```

## Bitrix: входящий webhook

1. Портал → Разработчикам → Другое → Входящий вебхук.
2. Права: `crm` (сделки / статусы).
3. Скопируйте URL вида `https://<portal>/rest/<user>/<token>/` в `BITRIX_WEBHOOK_URL`.
4. `python -m kwork_bitrix ensure-funnel` — создаст категорию «Kwork Bitrix» и 6 стадий.
5. Cron: `curl -X POST -H "X-Sync-Token: $KWORK_BITRIX_SYNC_TOKEN" https://<host>/sources/kwork/sync`

OAuth локального приложения поддерживается через `BITRIX24_ACCESS_TOKEN` + `BITRIX24_PORTAL` / `BITRIX24_CLIENT_ENDPOINT` (как в остальном репо), но для Marketplace install docs проще webhook.

## Docker

```bash
docker build -t kwork-bitrix ./services/kwork-bitrix
docker run --env-file services/kwork-bitrix/.env -p 8090:8090 kwork-bitrix
```

## Структура

```
services/kwork-bitrix/
  kwork_bitrix/           # FastAPI + adapters
  bitrix-app/           # заметки по local/marketplace приложению
  scripts/ensure_funnel.py
  Dockerfile
  requirements.txt
  .env.example
```

## Marketplace path (позже)

См. `bitrix-app/README.md`: локальное приложение → проверка на тестовом портале → подготовка карточки Marketplace с disclosure про неофициальный Kwork.

## Связь с существующими скриптами

Node MVP `scripts/kwork-bitrix-sync.mjs` остаётся для HAR/CSV и OAuth-потока сайта. **Kwork Bitrix** — отдельный продаваемый продукт (Python), паттерны сессии/дедупа переиспользованы, cookies в git не кладём.
