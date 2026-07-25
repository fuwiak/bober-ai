# Kwork → Bitrix24: захват заказов (HAR / cat-catch)

Официального API Kwork нет. Живой сниффинг чужого аккаунта из CI/агента **невозможен** без вашей сессии в браузере. Рабочий путь: вы залогинены на **своём** seller-аккаунте → сохраняете сетевые ответы локально → `npm run kwork:bitrix:from-har` кладёт заказы в Bitrix24 (`SOURCE_ID=KWORK`).

Только свой аккаунт. Не для чужих продавцов, не для обхода DRM/paywall.

## cat-catch vs DevTools

| Инструмент | Что умеет | Для заказов Kwork |
|---|---|---|
| [cat-catch](https://github.com/xifangczy/cat-catch) | Медиа-сниффер (m3u8/video/audio/image), фильтр по расширению/regex, JSON-viewer для отдельных ресурсов | Слабо: XHR заказов обычно не «медиа». Если расширение показало `.json`/API URL и вы сохранили **тело** ответа — парсер примет `--capture` |
| Chrome DevTools → Network | Fetch/XHR + **Save all as HAR with content** | **Рекомендуется** для списка заказов / трекера |

## Workflow A — HAR (рекомендуется)

1. Chrome → войти на https://kwork.ru под своим продавцом.
2. Открыть раздел заказов / трекер (чтобы XHR реально ушли).
3. DevTools → **Network** → фильтр **Fetch/XHR**, домен `kwork.ru` / `api.kwork.ru`.
4. ПКМ по списку → **Save all as HAR with content**.
5. Не коммитьте живой HAR с токенами/PII — только локально.

```bash
npm run kwork:bitrix:from-har -- path/to/session.har --dry-run
npm run kwork:bitrix:from-har -- path/to/session.har
```

Эквивалент:

```bash
npm run kwork:bitrix:sync -- --har path/to/session.har --dry-run
```

## Workflow B — cat-catch (если есть тела JSON)

1. Установить расширение из [официального репо](https://github.com/xifangczy/cat-catch).
2. На странице заказов открыть popup → отфильтровать `json` / `api` / `kwork`.
3. Открыть JSON-viewer у нужного ответа → скопировать тело в файл, **или** собрать export вида:

```json
{
  "note": "EXAMPLE cat-catch-style",
  "resources": [
    {
      "url": "https://api.kwork.ru/v1/seller/orders",
      "body": { "success": true, "response": { "orders": [] } }
    }
  ]
}
```

Без поля `body`/`text`/`content` одни URL бесполезны для CRM.

```bash
npm run kwork:bitrix:sync -- --capture data/kwork-capture.example.json --dry-run
```

## Примеры в репозитории

- `data/kwork-orders.har.example.json` — урезанный HAR (**EXAMPLE**, фейковые заказы)
- `data/kwork-capture.example.json` — cat-catch-style export (**EXAMPLE**)
- `data/kwork-orders.example.csv` / `.json` — ручной импорт без сниффа

## Bitrix

Нужен уже настроенный OAuth (`npm run bitrix:oauth -- test`, scope `crm`). Источник `KWORK` создаётся автоматически.

Профиль продавца (контекст): https://kwork.ru/user/pasha_stasinski
