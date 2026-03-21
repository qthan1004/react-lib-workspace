#!/bin/bash
# Push all lib submodules and update workspace
# Usage: bash tools/push-all-libs.sh "commit message"
# If no message provided, only pushes (no commit)

set -e
WORKSPACE_ROOT=$(cd "$(dirname "$0")/.." && pwd)
LIBS=("utils" "theme" "dialog" "typography")
MSG="$1"

for lib in "${LIBS[@]}"; do
  echo "──── $lib ────"
  cd "$WORKSPACE_ROOT/libs/$lib"

  if [ -n "$MSG" ]; then
    git add .
    # Only commit if there are staged changes
    git diff --cached --quiet 2>/dev/null || git commit -m "$MSG"
  fi

  # Push current branch
  BRANCH=$(git rev-parse --abbrev-ref HEAD)
  git push origin "$BRANCH"
done

# Update workspace submodule refs
echo "──── workspace ────"
cd "$WORKSPACE_ROOT"
git add libs/
git diff --cached --quiet 2>/dev/null || {
  git commit -m "chore: update submodules"
  git push
}

echo "✅ All done!"
