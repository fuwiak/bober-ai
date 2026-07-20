# yaga

**yaga** (Яга) — модульный CLI для сервисов Яндекса. Каждый сервис = **brick** (klocek) в `src/bricks/*.mjs`: можно добавить, скрыть или выключить без переписывания ядра.

## Имя

Не `yc` и не «ещё один wrapper» — отдельный слой над API/скриптами bober-ai + passthrough к `yc` / `yandex-disk` / `yandex-ai-studio`.

## Установка

```bash
npm run yaga:install
# или: bash cli/yaga/install.sh
```

Дальше из любой директории: `yaga`.

## Профили (ты vs остальные)

| Profile | Что видно |
|---------|-----------|
| `owner` (default) | все bricks |
| `public` | только `visibility: "public"` (metrika, webmaster, cloud, disk, core) |
| `custom` | списки enable/disable/hide |

```bash
yaga profile public          # спрятать Direct / Wordstat / GPT / mail…
YAGA_PROFILE=public yaga help
yaga bricks hide direct      # точечно
yaga bricks list
```

Конфиг: `~/.config/yaga/config.json` (см. `config.example.json`).

## Bricks

| Brick | Visibility | Что делает |
|-------|------------|------------|
| `core` | public | архитектура |
| `webmaster` | public | status / feed / mirrors |
| `metrika` | public | status / counter / ytm |
| `cloud` | public | passthrough → `yc` |
| `disk` | public | passthrough → `yandex-disk` |
| `wordstat` | owner | keyword research |
| `direct` | owner | campaigns + oauth |
| `mail` | owner | Yandex 360 mailbox |
| `search` | owner | Cloud Search API |
| `gpt` | owner | YandexGPT chat |
| `aistudio` | owner | `yandex-ai-studio` |

## Примеры

```bash
yaga bricks
yaga doctor
yaga webmaster status
yaga metrika status
yaga direct campaigns status
yaga wordstat run
yaga gpt chat "кратко: что такое RAG"
yaga cloud storage bucket list
```

## Новый klocek

1. Создай `cli/yaga/src/bricks/foo.mjs`
2. Экспорт:

```js
export default {
  id: "foo",
  title: "Foo",
  visibility: "owner", // или "public"
  async run(ctx, args) {
    await ctx.runScript("my-script.mjs", args);
  },
};
```

3. Готово — `yaga foo` подхватит автоматически.
