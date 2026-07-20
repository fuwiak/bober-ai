#!/usr/bin/env bash
# Install global `yaga` → ~/bin/yaga
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
BIN_DIR="${YAGA_BIN_DIR:-$HOME/bin}"
mkdir -p "$BIN_DIR"
chmod +x "$ROOT/run" "$ROOT/bin/yaga.js"
ln -sfn "$ROOT/run" "$BIN_DIR/yaga"
echo "installed: $BIN_DIR/yaga → $ROOT/run"
if ! command -v yaga >/dev/null 2>&1; then
  echo "note: ensure $BIN_DIR is on PATH"
fi
yaga --help | head -20
echo "ok — try: yaga bricks · yaga doctor · yaga wordstat --help"
