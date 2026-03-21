#!/bin/bash
# Check/inspect a file or run a read-only command across all libs
# Usage: bash tools/check-all-libs.sh '<command>'
#
# Examples:
#   bash tools/check-all-libs.sh 'grep "extends.*tsconfig.base" tsconfig*.json'
#   bash tools/check-all-libs.sh 'node -p "require(\"./package.json\").version"'
#   bash tools/check-all-libs.sh 'git status --short'
#   bash tools/check-all-libs.sh 'cat .github/workflows/publish.yml | head -5'
#   bash tools/check-all-libs.sh 'ls tsconfig*.json'

WORKSPACE_ROOT=$(cd "$(dirname "$0")/.." && pwd)
CMD="$1"

if [ -z "$CMD" ]; then
  echo "Usage: bash tools/check-all-libs.sh '<command>'"
  exit 1
fi

for dir in "$WORKSPACE_ROOT"/libs/*/; do
  LIB=$(basename "$dir")
  echo "──── $LIB ────"
  cd "$dir"
  eval "$CMD" 2>&1 || true
  echo ""
done
