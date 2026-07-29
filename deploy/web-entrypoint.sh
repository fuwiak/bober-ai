#!/bin/sh
set -eu
# Named volume /app/data is root-owned on first create; app runs as astro.
if [ -d /app/data ]; then
  chown -R astro:astro /app/data 2>/dev/null || true
  chmod 775 /app/data 2>/dev/null || true
fi
exec su-exec astro "$@"
