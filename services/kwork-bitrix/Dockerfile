FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HOST=0.0.0.0 \
    PORT=8090

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY kwork_bitrix ./kwork_bitrix
COPY scripts ./scripts
COPY bitrix-app ./bitrix-app
COPY README.md .

EXPOSE 8090

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8090/health')" || exit 1

CMD ["python", "-m", "kwork_bitrix", "serve"]
