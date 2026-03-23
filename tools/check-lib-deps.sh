#!/bin/bash
# check-lib-deps.sh — Verify a lib has all required dependencies in its package.json
#
# Usage:
#   bash tools/check-lib-deps.sh <lib-name>
#   bash tools/check-lib-deps.sh dialog
#
# Scans all imports in src/ and tests/, checks each external package
# is listed in dependencies, peerDependencies, or devDependencies.

set -e

if [ -z "$1" ]; then
  echo ""
  echo "❌ Error: Please provide a library name."
  echo ""
  echo "Usage: bash tools/check-lib-deps.sh <lib-name>"
  echo "Example: bash tools/check-lib-deps.sh dialog"
  echo ""
  exit 1
fi

LIB_NAME="$1"
LIB_DIR="libs/${LIB_NAME}"

if [ ! -d "$LIB_DIR" ]; then
  echo "❌ Error: Library '${LIB_NAME}' not found at ${LIB_DIR}"
  exit 1
fi

PKG="$LIB_DIR/package.json"

echo ""
echo "🔍 Checking dependencies for @thanh-libs/${LIB_NAME}"
echo "   Directory: ${LIB_DIR}"
echo ""

# ─── Step 1: Extract all declared deps from package.json ─────
DECLARED_DEPS=$(node -e "
  const pkg = require('./${PKG}');
  const all = {
    ...pkg.dependencies,
    ...pkg.peerDependencies,
    ...pkg.devDependencies
  };
  console.log(Object.keys(all).join('\n'));
" 2>/dev/null || echo "")

# ─── Step 2: Scan all imports from src/ and tests/ ───────────
# Match: import ... from 'pkg' / import 'pkg' / require('pkg')
# Exclude stories files (storybook deps are workspace-level, not per-lib CI)
IMPORTED_PKGS=$(grep -rhoE "(from|import|require\()\s*['\"]([^'\"./][^'\"]*)['\"]" \
  "$LIB_DIR/src" "$LIB_DIR/tests" 2>/dev/null \
  --include='*.ts' --include='*.tsx' \
  --exclude='*.stories.*' \
  | grep -oE "['\"][^'\"]+['\"]" \
  | tr -d "'\""  \
  | sed 's|/jsx-runtime$||; s|/jsx-dev-runtime$||' \
  | sort -u)

# ─── Step 3: Normalize to package names ──────────────────────
# @scope/pkg/subpath → @scope/pkg
# pkg/subpath → pkg
normalize_pkg() {
  local imp="$1"
  if [[ "$imp" == @* ]]; then
    echo "$imp" | cut -d'/' -f1,2
  else
    echo "$imp" | cut -d'/' -f1
  fi
}

# ─── Step 4: Check each import against declared deps ─────────
MISSING=()
CHECKED=()

for imp in $IMPORTED_PKGS; do
  pkg=$(normalize_pkg "$imp")

  # Skip Node.js builtins
  case "$pkg" in
    react/jsx-runtime|react/jsx-dev-runtime) continue ;;
    path|fs|os|url|util|events|stream|crypto|http|https|net|child_process|assert|buffer|querystring|string_decoder|timers|tty|zlib|module|process) continue ;;
    node:*) continue ;;
  esac

  # Skip if already checked
  if [[ " ${CHECKED[*]} " =~ " ${pkg} " ]]; then
    continue
  fi
  CHECKED+=("$pkg")

  # Check if declared
  if ! echo "$DECLARED_DEPS" | grep -qx "$pkg"; then
    MISSING+=("$pkg")
  fi
done

# ─── Step 5: Report ──────────────────────────────────────────
echo "📦 Declared deps: $(echo "$DECLARED_DEPS" | wc -l | tr -d ' ')"
echo "📥 Unique imports: ${#CHECKED[@]}"
echo ""

if [ ${#MISSING[@]} -eq 0 ]; then
  echo "✅ All imports are covered by package.json dependencies!"
  echo ""
  exit 0
else
  echo "❌ Missing ${#MISSING[@]} package(s) in ${PKG}:"
  echo ""
  for pkg in "${MISSING[@]}"; do
    # Check where it's imported from
    FILES=$(grep -rl "from ['\"]${pkg}" "$LIB_DIR/src" "$LIB_DIR/tests" 2>/dev/null | head -3 | sed "s|${LIB_DIR}/||g" | tr '\n' ', ' | sed 's/,$//')
    echo "   ❌ ${pkg}"
    echo "      └─ used in: ${FILES}"
  done
  echo ""
  echo "💡 Add them to devDependencies in ${PKG}"
  echo ""
  exit 1
fi
