# publish — site-first CLI

Публикация статей: сначала **bober-ai.dev**, затем репост на Medium / Habr.

Стек как у соседних CLI: entry в `cli/publish/`, запуск через `run` / `npm run publish`. Тяжёлая логика на Node (Markdown), без зависимости от мёртвых Medium tokens.

## Install

```bash
npm run publish:install
# → ~/bin/publish
```

Или без install:

```bash
npm run publish -- help
./cli/publish/run list
```

## Commands

| Command | Что делает |
|---------|------------|
| `publish list` | статьи в `articles/` |
| `publish site <slug>` | MD → HTML + `src/content/articles/<slug>.generated.ts` |
| `publish site --all` | сгенерировать все |
| `publish preview <slug>` | canonical URL |
| `publish export-medium <slug>` | Medium-ready markdown → `.export/medium.md` |
| `publish open-medium-import <slug>` | открыть Medium Import UI + URL статьи |
| `publish habr export <slug>` | HFM markdown → `.export/habr.md` |
| `publish habr open-draft <slug>` | открыть редактор Habr + скопировать текст |
| `publish habr open-sandbox <slug>` | то же для Песочницы |
| `publish medium playwright <slug>` | **optional / fragile** last resort |
| `publish habr playwright <slug>` | **optional / fragile** last resort |

Алиасы: `publish-site`, `medium export`, `medium open-import`.

## Рекомендуемый workflow

### 1. Сайт (канон)

```text
articles/<slug>/article.md   →   publish site <slug>   →   commit + deploy
```

Canonical: `https://www.bober-ai.dev/blog/<slug>`.

В `index.generated.ts` попадают только статьи со `status: published`. Черновики (`draft`) можно генерировать файлы, но они не подмешиваются в блог, пока не смените статус и не пересоберёте.

### 2. Medium (без API)

**Почему не API:** официальный REST / Integration tokens deprecated; новые токены не выдают. CLI **не требует** и **не хранит** Medium secrets.

**Путь:**

1. Статья живёт на bober-ai.dev.
2. `publish open-medium-import <slug>` — открывает [Import a story](https://medium.com/me/import) и копирует URL.
3. Paste URL → Import → правки (часто code blocks) → Publish.
4. Medium сам ставит canonical на исходный URL.

Fallback: `export-medium` → вручную New story.

Playwright (`medium playwright`) — только если очень нужно открыть вкладки автоматически; логин/submit **не** автоматизируем (хрупко).

### 3. Habr (RU)

**Почему не API:** [публичный API закрыт](https://habr.com/ru/docs/help/api/). Публикация через веб-редактор; поддерживается [Habr Flavored Markdown](https://habr.com/ru/docs/help/markdown/).

**Путь:**

1. `publish habr export <slug>` → `articles/<slug>/.export/habr.md`
2. `publish habr open-draft <slug>` (или `open-sandbox`) — редактор + буфер обмена
3. Включить Markdown-режим → вставить → хабы → превью → опубликовать

Токены Habr в CLI не нужны и не должны коммититься.

## Secrets / auth

| Что | Где |
|-----|-----|
| Основной flow | **без секретов** |
| Опциональные override URL | env: `PUBLISH_SITE_URL`, `MEDIUM_IMPORT_URL`, `HABR_CREATE_URL`, `HABR_SANDBOX_URL` |
| Medium / Habr cookies / tokens | **не коммитить**; этот CLI их не читает |

Локальные секреты (если когда-нибудь понадобятся для экспериментов): `~/.config/bober-publish/credentials.env` — в `.gitignore` через паттерн `**/credentials.env`.

## Source layout

См. [`articles/README.md`](../../articles/README.md).

```
articles/<slug>/article.md
src/content/articles/<slug>.generated.ts   # publish site
src/content/articles/index.generated.ts
src/lib/blog-posts.ts                      # LEGACY + GENERATED
```

## Limits (честно)

- Это scaffold + export/import helpers, не CMS.
- Medium import зависит от того, как Medium парсит вашу HTML-страницу.
- Habr — copy/paste в редактор; хабы и модерация вручную.
- Playwright команды помечены fragile и не являются основным путём.
