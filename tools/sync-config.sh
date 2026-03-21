#!/bin/bash
# Copy a file into every lib directory (overwrite if exists)
# Usage: bash tools/sync-config.sh <source-file> [dest-filename]
#
# Examples:
#   bash tools/sync-config.sh /tmp/tsconfig.storybook.json
#   bash tools/sync-config.sh /tmp/publish.yml .github/workflows/publish.yml
#   bash tools/sync-config.sh templates/tsconfig.json tsconfig.json

set -e
WORKSPACE_ROOT=$(cd "$(dirname "$0")/.." && pwd)
SRC="$1"
DEST="${2:-$(basename "$SRC")}"

if [ -z "$SRC" ]; then
  echo "Usage: bash tools/sync-config.sh <source-file> [dest-filename]"
  exit 1
fi

if [ ! -f "$SRC" ]; then
  echo "Error: Source file '$SRC' not found"
  exit 1
fi

for dir in "$WORKSPACE_ROOT"/libs/*/; do
  LIB=$(basename "$dir")
  DEST_DIR=$(dirname "$dir/$DEST")
  mkdir -p "$DEST_DIR"
  echo "──── $LIB ──── → $DEST"
  cp "$SRC" "$dir/$DEST"
done

echo "✅ Synced '$DEST' to all libs!"
