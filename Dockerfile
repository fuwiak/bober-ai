# Astro + Node standalone (API: /api/contact, /api/health, /api/kwork/webhook).
# Domain defaults: config/domains.mjs (override with build-args / env).
FROM node:22-alpine AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

ARG PUBLIC_SITE_URL=
ARG PUBLIC_PARTNERS_SITE_URL=
ARG PUBLIC_BITRIX_SITE_URL=
ARG PUBLIC_YANDEX_METRIKA_ID=110635302
ARG PUBLIC_PARTNERS_YANDEX_METRIKA_ID=110926696
ARG PUBLIC_BITRIX_YANDEX_METRIKA_ID=110926887
ARG PUBLIC_CONTACT_EMAIL=contact@bober-systems.ru
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL \
    PUBLIC_PARTNERS_SITE_URL=$PUBLIC_PARTNERS_SITE_URL \
    PUBLIC_BITRIX_SITE_URL=$PUBLIC_BITRIX_SITE_URL \
    PUBLIC_YANDEX_METRIKA_ID=$PUBLIC_YANDEX_METRIKA_ID \
    PUBLIC_PARTNERS_YANDEX_METRIKA_ID=$PUBLIC_PARTNERS_YANDEX_METRIKA_ID \
    PUBLIC_BITRIX_YANDEX_METRIKA_ID=$PUBLIC_BITRIX_YANDEX_METRIKA_ID \
    PUBLIC_CONTACT_EMAIL=$PUBLIC_CONTACT_EMAIL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN eval "$(node scripts/docker-domain-env.mjs)" && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ARG GIT_SHA=
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3001 \
    GIT_SHA=$GIT_SHA

RUN addgroup -S astro && adduser -S astro -G astro

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN chown -R astro:astro /app
USER astro
EXPOSE 3001

CMD ["node", "./dist/server/entry.mjs"]
