---
title: "Site-first публикация: bober-ai.dev → Medium / Habr"
description: "Как публиковать статьи сначала на своём домене, затем репостить через import/export без мёртвого Medium API."
slug: example-site-first-publish
publishedAt: 2026-07-22
readingTime: "4 мин"
tags: [Publishing, Medium, Habr, CLI]
coverImage: /stock/automation-code.jpg
locale: ru
status: draft
---

# Site-first публикация

Канонический URL статьи всегда на **bober-ai.dev**. Medium и Habr — каналы дистрибуции, а не источник правды.

## Почему так

1. **Medium REST API** устарел: новые integration tokens не выдают. Надёжный путь — *Import a story* по URL.
2. **Habr public API** закрыт на реконструкцию. Публикация — через веб-редактор (Markdown / HFM).
3. Свой домен держит SEO canonical и полный контроль над контентом.

## Минимальный цикл

```bash
npm run publish -- site example-site-first-publish
# задеплоить сайт
npm run publish -- open-medium-import example-site-first-publish
npm run publish -- habr export example-site-first-publish
npm run publish -- habr open-draft
```

## Что важно для импорта

- Страница на сайте должна отдавать нормальный HTML (не только клиентский JS).
- У статьи должны быть `title`, `description`, дата и читаемый body.
- После импорта на Medium проверьте форматирование code blocks — import tool иногда ломает их.

## Ссылки

- Сайт: [https://www.bober-ai.dev/blog/example-site-first-publish](https://www.bober-ai.dev/blog/example-site-first-publish)
- CLI: `cli/publish/README.md`
