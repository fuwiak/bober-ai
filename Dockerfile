# Build static HTML, serve with Caddy (no Node runtime).
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

ARG NEXT_PUBLIC_SITE_URL=https://www.bober-ai.dev
ARG NEXT_PUBLIC_YANDEX_METRIKA_ID=110635302
ARG NEXT_PUBLIC_CONTACT_EMAIL=stasinskipawel@yandex.ru
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_YANDEX_METRIKA_ID=$NEXT_PUBLIC_YANDEX_METRIKA_ID \
    NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY deploy/Caddyfile.railway /etc/caddy/Caddyfile.railway
COPY deploy/caddy-entrypoint.sh /usr/local/bin/caddy-entrypoint.sh
RUN chmod +x /usr/local/bin/caddy-entrypoint.sh
COPY --from=builder /app/out /srv
# Railway probes $PORT; Selectel/docker-compose maps 80:80 + 443:443.
ENV PORT=80
EXPOSE 80 443
ENTRYPOINT ["/usr/local/bin/caddy-entrypoint.sh"]
