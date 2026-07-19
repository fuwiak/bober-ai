#!/usr/bin/env bash
# Install global `bober` command + enable git post-commit ops check.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CLI="$ROOT/cli"
BIN_DIR="${BOBER_BIN_DIR:-$HOME/bin}"

mkdir -p "$BIN_DIR"
cd "$CLI"
go build -o bober-ops .

ln -sfn "$CLI/run" "$BIN_DIR/bober"
chmod +x "$CLI/run" "$ROOT/.githooks/post-commit"

# Repo-local hooks (post-commit → bober status after every commit)
git -C "$ROOT" config core.hooksPath .githooks

echo "installed: $BIN_DIR/bober → $CLI/run"
echo "hooksPath: $(git -C "$ROOT" config --get core.hooksPath)"
if ! command -v bober >/dev/null 2>&1; then
  echo "note: ensure $BIN_DIR is on PATH (you already use ~/bin for teletext-tea)"
fi
bober help | head -5
echo "ok — from any directory: bober | bober status | bober health | bober logs"
