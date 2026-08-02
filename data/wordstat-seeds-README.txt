# Index: prioritized Wordstat seed files for Bober AI
# Run order (do NOT blast all at once):

# 1) Top 20 starter
# npm run yandex:wordstat -- --file=data/wordstat-seeds-top20.txt --csv --out=data/wordstat-top20.csv

# 2) Hot shortlist (next budget)
# npm run yandex:wordstat -- --file=data/wordstat-seeds-hot-shortlist.txt --csv --out=data/wordstat-hot-shortlist.csv

# 3) Purchase intent (Yandex transactional B2B — order/vendor/price/enterprise/rescue)
# npm run yandex:wordstat -- --file=data/wordstat-seeds-purchase-intent.txt --csv --min=1 --out=data/wordstat-purchase-intent.csv
#    → data/wordstat-purchase-intent-decisions.json

# 3b) Buyer intent CRM/automation (or expand Top 20 carefully)
# npm run yandex:wordstat -- --file=data/wordstat-seeds-buyer-intent.txt --csv --out=data/wordstat-buyer-intent.csv
# Optional expensive: --with-modifiers (× ~15 API calls per seed)

# 4) Clusters
# --file=data/wordstat-seeds-problem.txt
# --file=data/wordstat-seeds-bitrix24.txt
# --file=data/wordstat-seeds-amocrm.txt
# --file=data/wordstat-seeds-1c.txt
# --file=data/wordstat-seeds-consulting.txt  # secondary
# --file=data/wordstat-seeds-kaspersky.txt   # Silver path: licenses ~6M RUB/year
#   → data/wordstat-kaspersky.csv + data/wordstat-kaspersky-decisions.json → /kaspersky
# --file=data/wordstat-seeds-secure-ai-cloud.txt  # Secure Private AI Cloud pack
#   → data/wordstat-secure-ai-cloud.csv + decisions → /services/secure-private-ai-cloud
#   Note: EN brand phrase ≈0; ship RU component keywords (внедрение llm, корпоративный ии, частное облако)

# Taxonomy CSV columns: intent + intent_legacy (backward compat)
