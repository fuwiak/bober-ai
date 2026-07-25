# Kwork Bitrix — Bitrix local / Marketplace notes

## Режим v0.1: входящий webhook (без карточки Market)

Рекомендуется для пилота у `pasha_stasinski` / Bober AI:

1. Создать входящий webhook с правом CRM.
2. Развернуть `services/kwork-bitrix` (Docker / VPS).
3. Прописать `BITRIX_WEBHOOK_URL`, `KWORK_BITRIX_SYNC_TOKEN`, credentials Kwork **на стороне клиента**.
4. Один раз вызвать `ensure-funnel`.
5. Повесить cron на `POST /sources/kwork/sync`.

UI в портале не обязателен: воронка видна в CRM → Сделки → категория «Kwork Bitrix».

## Локальное приложение (следующий шаг)

В кабинете разработчика Bitrix24:

- Тип: **Серверное** / локальное приложение.
- Handler install: `https://<kwork-bitrix-host>/bitrix/install`
- Handler: `https://<kwork-bitrix-host>/bitrix/webhook` (события опциональны).
- Scope: `crm`.
- После установки предпочтительно сохранить incoming webhook URL, выданный порталом, или перейти на OAuth tokens.

Минимальный манифест (ориентир, не публиковать как есть без проверки актуальной схемы Market):

```json
{
  "name": "Kwork Bitrix by Bober AI",
  "description": "Агрегация лидов продавца (Kwork и др.) в воронку Bitrix24",
  "support": {
    "email": "support@bober-ai.dev"
  },
  "scopes": ["crm"]
}
```

## Marketplace listing — обязательный disclosure

Текст для карточки (черновик):

> Приложение переносит лиды **из аккаунта продавца** в CRM Bitrix24.
> Интеграция с Kwork использует **неофициальные** методы доступа (сессия продавца / сторонние библиотеки).
> Публичного API Kwork нет; стабильность не гарантируется Kwork.
> Пользователь самостоятельно указывает свои cookies/логин; издатель не получает доступ к чужим аккаунтам через репозиторий.
> Telegram и FL.ru в текущей версии — заготовки под расширение.

Не обещать «официальную интеграцию Kwork» и не обещать live FL.ru/Telegram, пока заглушки не реализованы.

## События

`ONCRMLEADADD` и др. можно подписаться позже; v0.1 пишет **в** Bitrix (outbound), а не слушает входящие лиды портала как основной поток.
