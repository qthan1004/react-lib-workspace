#!/bin/bash
# Run a command inside every lib directory
# Usage: bash tools/apply-all-libs.sh '<command>'
#
# Examples:
#   bash tools/apply-all-libs.sh 'sed -i "s/@thanh-libs/@new-scope/g" package.json'
#   bash tools/apply-all-libs.sh 'npm install -D some-package'
#   bash tools/apply-all-libs.sh 'cat package.json | grep name'
#   bash tools/apply-all-libs.sh 'cp /tmp/tsconfig.json tsconfig.json'

set -e
WORKSPACE_ROOT=$(cd "$(dirname "$0")/.." && pwd)
CMD="$1"

if [ -z "$CMD" ]; then
  echo "Usage: bash tools/apply-all-libs.sh '<command>'"
  exit 1
fi

for dir in "$WORKSPACE_ROOT"/libs/*/; do
  LIB=$(basename "$dir")
  echo "──── $LIB ────"
  cd "$dir"
  eval "$CMD"
done

echo "✅ Applied to all libs!"
