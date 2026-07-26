# Index: prioritized Wordstat seed files for Bober AI
# Run order (do NOT blast all at once):

# 1) Top 20 starter
# npm run yandex:wordstat -- --file=data/wordstat-seeds-top20.txt --csv --out=data/wordstat-top20.csv

# 2) Hot shortlist (next budget)
# npm run yandex:wordstat -- --file=data/wordstat-seeds-hot-shortlist.txt --csv --out=data/wordstat-hot-shortlist.csv

# 3) Buyer intent (or expand Top 20 carefully)
# npm run yandex:wordstat -- --file=data/wordstat-seeds-buyer-intent.txt --csv --out=data/wordstat-buyer-intent.csv
# Optional expensive: --with-modifiers (× ~15 API calls per seed)

# 4) Clusters
# --file=data/wordstat-seeds-problem.txt
# --file=data/wordstat-seeds-bitrix24.txt
# --file=data/wordstat-seeds-amocrm.txt
# --file=data/wordstat-seeds-1c.txt
# --file=data/wordstat-seeds-consulting.txt  # secondary

# Taxonomy CSV columns: intent + intent_legacy (backward compat)
