# Dual origin: Selectel (RU / без VPN) + Railway (VPN / мир)

## Сейчас

| Origin | URL | Роль |
|--------|-----|------|
| Railway | `https://bober-ai-production.up.railway.app` | Глобальный (работает с VPN) |
| Selectel | `https://45.80.131.136` / `www.bober-ai.dev` | РФ без VPN |

Railway custom domains уже добавлены. Нужны DNS-записи у регистратора (Namecheap):

### Вариант A — быстро: весь трафик на Railway (VPN + без VPN)

```
CNAME  www                → p62vcana.up.railway.app
TXT    _railway-verify.www → railway-verify=9da1398c780a815232fe7023b05bafec95bb6ff4300d8f72e9ef3bd92923b36e
CNAME  @ (или ALIAS/URL)  → ta3i2cwa.up.railway.app
TXT    _railway-verify    → railway-verify=a9d433b771294aa24f94b66e85a3f52069e073e487b8b4e4475521f3d6a4ae4b
```

Удалите старый `A www → 45.80.131.136` (и apex A), иначе сертификат Railway не выпустится.

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
