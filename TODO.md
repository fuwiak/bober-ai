# TODO

## Алиса ИИ → Яндекс Услуги

- [ ] Deploy site with `/integrations/alisa-ai` (landing + feed offer)
- [ ] Publish Uslugi pack (spec «Разработка навыков Алисы» `54ae80ef-…`):

```bash
npm run yandex:uslugi:add -- --file=data/uslugi-alisa-ai-2026-09.json --headless --skip-photos --fast
npm run yandex:uslugi:list -- --spec=54ae80ef-6f2e-4749-9b7d-1cd0b2f2a180
```

- [ ] Check moderation in cabinet; no «под ключ», photos skipped on purpose

## Увеличить PNG Claude на весь прямоугольник

- [ ] Шаг 1: Изменить object-contain на object-cover в src/App.tsx (Hero секция Image claude.png)
- [ ] Шаг 2: Опционально resize PNG с sips для лучшего качества
- [ ] Шаг 3: git add/commit/push изменения
