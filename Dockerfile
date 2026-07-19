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
COPY --from=builder /app/out /srv
EXPOSE 80 443
