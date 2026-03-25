#!/usr/bin/env bash
# push-lib.sh — Push a single lib submodule and update workspace ref
# Usage: bash tools/push-lib.sh <lib-name> "<commit-message>"
set -e

WORKSPACE_ROOT=$(cd "$(dirname "$0")/.." && pwd)
LIB_NAME="$1"
MSG="$2"

if [ -z "$LIB_NAME" ]; then
  echo "Usage: bash tools/push-lib.sh <lib-name> \"<commit-message>\""
  exit 1
fi

LIB_DIR="$WORKSPACE_ROOT/libs/$LIB_NAME"

if [ ! -d "$LIB_DIR" ]; then
  echo "Error: '$LIB_DIR' does not exist."
  exit 1
fi

# ── Push lib submodule ──
echo "──── $LIB_NAME ────"
cd "$LIB_DIR"

if [ -n "$MSG" ]; then
  git add .
  git diff --cached --quiet 2>/dev/null || git commit -m "$MSG"
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)
git push origin "$BRANCH"

# ── Update workspace submodule ref ──
echo "──── workspace ────"
cd "$WORKSPACE_ROOT"
git add "libs/$LIB_NAME"
git diff --cached --quiet 2>/dev/null || {
  git commit -m "chore: update $LIB_NAME submodule"
  git push
}

echo "✅ $LIB_NAME pushed!"
