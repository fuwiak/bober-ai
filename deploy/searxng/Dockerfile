# SearXNG for Telegram bot research (JSON API enabled).
# Deploy: railway add --service searxng && railway up deploy/searxng -s searxng --path-as-root -d -y

FROM docker.io/searxng/searxng:latest

USER root
COPY settings.yml /etc/searxng/settings.yml
RUN chown -R searxng:searxng /etc/searxng
USER searxng

EXPOSE 8080
