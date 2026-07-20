# yaga (Go + Bubble Tea)

**yaga** (Яга) — модульный Yandex CLI на том же стеке, что **bober**: Go + Charm Bubble Tea.

Каждый сервис = **brick** (klocek) в `bricks.go` (`allBricks()`). Профили прячут private-функции.

## Install

```bash
npm run yaga:install
# → ~/bin/yaga
```

## Usage

```bash
yaga                         # TUI
yaga webmaster status
yaga webmaster seo           # ИКС, диагностика, индекс, важные URL, запросы
yaga webmaster recrawl URL   # переобход страницы
yaga metrika status
yaga direct campaigns status
yaga bricks
yaga profile public          # только public bricks
yaga bricks hide gpt
yaga doctor
yaga credentials             # список секретов + URL UI Яндекса
yaga credentials set KEY val
yaga credentials open YANDEX_WEBMASTER_OAUTH_TOKEN
```

### TUI

| Tab | |
|-----|--|
| 1 Bricks | список klocek, Enter = default |
| 2 Creds | добавить credentials + ссылки на UI |
| 3 Doctor | токены / binaries |
| 4 Output | результат |
| 5 Help | |

На вкладке **Creds**: `Enter` = ввести значение, `o` = открыть UI в браузере, `d` = удалить.

Секреты: `~/.config/yaga/credentials.env` (не коммитить).

`Tab` / `←→` · `↑↓` · `Enter` · `q`

## Profiles

| Profile | |
|---------|--|
| `owner` | всё (тебе) |
| `public` | только `visibility: public` |
| `custom` | enable/disable/hide |

Config: `~/.config/yaga/config.json`

## Добавить brick

В `bricks.go` добавь `Brick{ ID, Visibility, Run: ... }` в `allBricks()`.

Тяжёлая логика API по-прежнему в `scripts/*.mjs` (вызывается из Go). Legacy Node entry: `node/` (только search/gpt helpers).

## Stack

- Go 1.22+
- bubbletea + lipgloss + bubbles (как bober)
