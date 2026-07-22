# Articles (source of truth)

Канонический источник статей для **bober-ai.dev**. Сначала публикуем на сайте, затем репостим на Medium / Habr.

## Layout

```
articles/
  <slug>/
    article.md          # YAML frontmatter + Markdown body
    assets/             # опционально: локальные картинки
```

После `publish site|export-*` появляется служебная папка (не коммитить, если не нужно):

```
articles/<slug>/.export/
  site.html
  medium.md
  habr.md
```

Сгенерированные модули для Next:

```
src/content/articles/<slug>.generated.ts
src/content/articles/index.generated.ts
```

## Frontmatter

```yaml
---
title: "Заголовок"
description: "Короткое описание для SEO / OG"
slug: my-article-slug
publishedAt: 2026-07-22
readingTime: "5 мин"
tags: [RAG, LLM, Python]
coverImage: /stock/automation-code.jpg
locale: ru
status: draft   # draft | published
---
```

- `slug` — URL `/blog/<slug>` на bober-ai.dev
- `status: published` — попадает в генерацию сайта; `draft` только в list/export
- Canonical всегда `https://www.bober-ai.dev/blog/<slug>`

## Workflow

```bash
# 1) черновик в articles/<slug>/article.md
npm run publish -- list

# 2) в сайт (генерирует TS + HTML)
npm run publish -- site my-article-slug

# 3) после деплоя — Medium (import from URL, canonical на свой домен)
npm run publish -- export-medium my-article-slug
npm run publish -- open-medium-import my-article-slug

# 4) Habr (публичного publish API нет — экспорт + открытие редактора)
npm run publish -- habr export my-article-slug
npm run publish -- habr open-draft
```

Подробности и ограничения API — в [`cli/publish/README.md`](../cli/publish/README.md).
