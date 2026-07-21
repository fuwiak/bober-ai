#!/bin/sh
set -eu
# Railway sets RAILWAY_ENVIRONMENT; use HTTP-only Caddyfile there.
if [ -n "${RAILWAY_ENVIRONMENT:-}" ] && [ -f /etc/caddy/Caddyfile.railway ]; then
  cp /etc/caddy/Caddyfile.railway /etc/caddy/Caddyfile
fi
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
