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
yaga metrika status
yaga direct campaigns status
yaga bricks
yaga profile public          # только public bricks
yaga bricks hide gpt
yaga doctor
```

### TUI

| Tab | |
|-----|--|
| 1 Bricks | список klocek, Enter = default |
| 2 Doctor | токены / binaries |
| 3 Output | результат |
| 4 Help | |

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
