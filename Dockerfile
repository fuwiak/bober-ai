# Next.js standalone (API routes: /api/contact, /api/health).
FROM node:22-alpine AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

ARG NEXT_PUBLIC_SITE_URL=https://www.bober-ai.dev
ARG NEXT_PUBLIC_PARTNERS_SITE_URL=https://partners.bober-ai.dev
ARG NEXT_PUBLIC_BITRIX_SITE_URL=https://bitrix.bober-ai.dev
ARG NEXT_PUBLIC_YANDEX_METRIKA_ID=110635302
ARG NEXT_PUBLIC_PARTNERS_YANDEX_METRIKA_ID=110926696
ARG NEXT_PUBLIC_BITRIX_YANDEX_METRIKA_ID=110926887
ARG NEXT_PUBLIC_CONTACT_EMAIL=contact@bober-ai.dev
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_PARTNERS_SITE_URL=$NEXT_PUBLIC_PARTNERS_SITE_URL \
    NEXT_PUBLIC_BITRIX_SITE_URL=$NEXT_PUBLIC_BITRIX_SITE_URL \
    NEXT_PUBLIC_YANDEX_METRIKA_ID=$NEXT_PUBLIC_YANDEX_METRIKA_ID \
    NEXT_PUBLIC_PARTNERS_YANDEX_METRIKA_ID=$NEXT_PUBLIC_PARTNERS_YANDEX_METRIKA_ID \
    NEXT_PUBLIC_BITRIX_YANDEX_METRIKA_ID=$NEXT_PUBLIC_BITRIX_YANDEX_METRIKA_ID \
    NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN mkdir -p /app/.next/cache \
    && chown -R nextjs:nextjs /app

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
