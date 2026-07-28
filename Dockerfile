# Astro + Node standalone (API: /api/contact, /api/health, /api/kwork/webhook).
FROM node:22-alpine AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

ARG PUBLIC_SITE_URL=https://www.bober-ai.dev
ARG PUBLIC_PARTNERS_SITE_URL=https://partners.bober-ai.dev
ARG PUBLIC_BITRIX_SITE_URL=https://bitrix.bober-ai.dev
ARG PUBLIC_YANDEX_METRIKA_ID=110635302
ARG PUBLIC_PARTNERS_YANDEX_METRIKA_ID=110926696
ARG PUBLIC_BITRIX_YANDEX_METRIKA_ID=110926887
ARG PUBLIC_CONTACT_EMAIL=contact@bober-ai.dev
# Keep NEXT_PUBLIC_* aliases for shared lib fallbacks during migration
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL \
    PUBLIC_PARTNERS_SITE_URL=$PUBLIC_PARTNERS_SITE_URL \
    PUBLIC_BITRIX_SITE_URL=$PUBLIC_BITRIX_SITE_URL \
    PUBLIC_YANDEX_METRIKA_ID=$PUBLIC_YANDEX_METRIKA_ID \
    PUBLIC_PARTNERS_YANDEX_METRIKA_ID=$PUBLIC_PARTNERS_YANDEX_METRIKA_ID \
    PUBLIC_BITRIX_YANDEX_METRIKA_ID=$PUBLIC_BITRIX_YANDEX_METRIKA_ID \
    PUBLIC_CONTACT_EMAIL=$PUBLIC_CONTACT_EMAIL \
    NEXT_PUBLIC_SITE_URL=$PUBLIC_SITE_URL \
    NEXT_PUBLIC_PARTNERS_SITE_URL=$PUBLIC_PARTNERS_SITE_URL \
    NEXT_PUBLIC_BITRIX_SITE_URL=$PUBLIC_BITRIX_SITE_URL \
    NEXT_PUBLIC_YANDEX_METRIKA_ID=$PUBLIC_YANDEX_METRIKA_ID \
    NEXT_PUBLIC_CONTACT_EMAIL=$PUBLIC_CONTACT_EMAIL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

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
