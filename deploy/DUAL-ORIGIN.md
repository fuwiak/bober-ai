# Dual origin: Selectel (RU / без VPN) + Railway (VPN / мир)

## Сейчас

| Origin | URL | Роль |
|--------|-----|------|
| Railway | `https://bober-ai-production.up.railway.app` | Глобальный (работает с VPN) |
| Selectel | `https://45.80.131.136` | РФ без VPN (опционально) |

Railway custom domains: `www.bober-ai.dev`, `bober-ai.dev` (apex), `partners.bober-ai.dev`, `bitrix.bober-ai.dev`.

### DNS у регистратора (Namecheap BasicDNS)

Нужны записи, иначе apex `bober-ai.dev` не резолвится и Вебмастер путает зеркала:

```
CNAME  www                  → p62vcana.up.railway.app
TXT    _railway-verify.www  → railway-verify=9da1398c780a815232fe7023b05bafec95bb6ff4300d8f72e9ef3bd92923b36e

# Важно: ALIAS apex → ТОТ ЖЕ target, что у www.
# Отдельные *.up.railway.app для apex (qz3mo9ts / b134ks2o) с этой сети
# таймаутятся на :443 — робот Яндекса тоже не достучится.
ALIAS  @                    → p62vcana.up.railway.app
TXT    _railway-verify      → railway-verify=a9d433b771294aa24f94b66e85a3f52069e073e487b8b4e4475521f3d6a4ae4b
```

На Namecheap для корня (`@`) используйте **ALIAS**, не CNAME.

Проверка после DNS:

```bash
dig +short bober-ai.dev                 # должен совпасть с IP www
curl -sI --connect-timeout 5 https://bober-ai.dev/ | head -5
# Location должен быть https://www.bober-ai.dev/… БЕЗ :8080
# (баг clone()+host на Railway ломал Claude/ChatGPT)
railway domain status www.bober-ai.dev
```

AI / LLM: `robots.txt` явно Allow для GPTBot/ClaudeBot/…, визитка — `/llms.txt`.

В Вебмастере API уже: главный = `https://www.bober-ai.dev` (36 URL в поиске),
apex = неглавный. Если UI всё ещё пишет иначе — после рабочего 301 с apex
зайдите в **главный** сайт (без www) → Индексирование → Переезд сайта →
включите «Добавить WWW» → Сохранить.

Удалите старый `A www → 45.80.131.136` (и apex A на Selectel), иначе сертификат Railway не выпустится.

### Вариант B — geo-split (RU → Selectel, остальное → Railway)

См. [`cloudflare-worker-geo.js`](./cloudflare-worker-geo.js): Cloudflare Worker по `CF-IPCountry`.
VPN с выходом за рубеж попадает на Railway; без VPN из РФ — на Selectel.

## Деплой

```bash
# Railway
railway up --detach

# Selectel (после SSH)
cd /opt/bober-ai && git pull && docker restart bober-ai
```
