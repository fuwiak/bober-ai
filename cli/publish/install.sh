#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
BIN_DIR="${PUBLISH_BIN_DIR:-$HOME/bin}"
mkdir -p "$BIN_DIR"
chmod +x "$ROOT/run" "$ROOT/bin/publish.js"
ln -sfn "$ROOT/run" "$BIN_DIR/publish"
echo "installed: $BIN_DIR/publish → $ROOT/run"
if ! command -v publish >/dev/null 2>&1; then
  echo "note: ensure $BIN_DIR is on PATH"
fi
publish help | head -20
echo "ok — publish | publish list | publish site <slug>"
