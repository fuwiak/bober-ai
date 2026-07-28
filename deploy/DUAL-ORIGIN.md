# Selectel origin (единственный)

Публичный DNS `www.bober-ai.dev` / `partners` / `bitrix` → **A `45.80.131.136`** (Selectel VDS).

Railway больше не используется как публичный origin.

## DNS (Namecheap)

| Type | Host | Value |
|------|------|-------|
| A | `@` | `45.80.131.136` |
| A | `www` | `45.80.131.136` |
| A | `partners` | `45.80.131.136` |
| A | `bitrix` | `45.80.131.136` |

MX / TXT — не трогать.

## Стек на VDS

- **Astro Node** (`:3000`) — prerender HTML + API leads/webhooks
- **Caddy** — TLS, apex→www, host rewrite microsites → `/white-label` / `/bitrix`

```bash
# деплой
scp -i ~/.ssh/bober_selectel -o IdentitiesOnly=yes deploy/Caddyfile root@45.80.131.136:/opt/bober-ai/deploy/Caddyfile
# образ собрать локально/CI и загрузить, либо build на VDS при достаточной RAM
ssh -i ~/.ssh/bober_selectel -o IdentitiesOnly=yes root@45.80.131.136 'cd /opt/bober-ai/deploy && docker compose up -d --build'
```

CI: GitHub Actions `selectel-build` — на push в `main` собирает образ и деплоит на VDS (секрет `SELECTEL_SSH_KEY`).
На VDS git не нужен: runner делает `tar`+`scp` (как `selectel-rescue-sync`), atomic extract в `/opt/bober-ai/src`, затем `src/deploy` → `docker compose up -d --build`. Host `.env` из `/opt/bober-ai/deploy/.env` сохраняется.

Проверка:

```bash
dig +short A www.bober-ai.dev
# → 45.80.131.136

curl -sI --connect-timeout 5 https://www.bober-ai.dev/ | head -8
curl -sI https://www.bober-ai.dev/about | head -5
curl -s https://www.bober-ai.dev/api/health
```

## `bober-systems.ru`

| Что | Статус |
|-----|--------|
| A на Selectel | `45.80.131.136` (apex, www, partners, bitrix) |
| Caddy | публичный Let's Encrypt (как у `bober-ai.dev`); apex→www |

После смены Caddyfile на VDS: `docker compose up -d` в `/opt/bober-ai/deploy` — Caddy сам получит LE-сертификаты (порты 80/443 открыты, DNS уже на Selectel).

## Origins

| Origin | IP | Роль |
|--------|-----|------|
| Selectel cloud `bober-ai-www` (ru-7) | `45.80.131.136` | **единственный публичный** |
