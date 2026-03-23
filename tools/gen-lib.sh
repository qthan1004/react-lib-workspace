#!/usr/bin/env bash
#
# gen-lib.sh — Quickly scaffold a new React library in the monorepo
#
# Usage:
#   yarn gen-lib <library-name>
#
# Example:
#   yarn gen-lib button
#   → creates libs/button with Vite, Vitest, Emotion, Storybook, publishable
#

set -e

# ─── Validate input ──────────────────────────────────────
if [ -z "$1" ]; then
  echo ""
  echo "❌ Error: Please provide a library name."
  echo ""
  echo "Usage: yarn gen-lib <library-name>"
  echo "Example: yarn gen-lib button"
  echo ""
  exit 1
fi

LIB_NAME="$1"
IMPORT_PATH="@thanh-libs/${LIB_NAME}"
LIB_DIR="libs/${LIB_NAME}"
TEMPLATE_DIR="tools/templates"

# ─── Check if library already exists ─────────────────────
if [ -d "$LIB_DIR" ]; then
  echo "❌ Error: Library '${LIB_NAME}' already exists at ${LIB_DIR}"
  exit 1
fi

# ─── Check templates exist ───────────────────────────────
if [ ! -d "$TEMPLATE_DIR" ]; then
  echo "❌ Error: Templates directory '${TEMPLATE_DIR}' not found"
  exit 1
fi

echo ""
echo "🚀 Creating library: ${LIB_NAME}"
echo "   Import path: ${IMPORT_PATH}"
echo "   Directory: ${LIB_DIR}"
echo ""

# ─── Step 1: Generate React library via nx ───────────────
echo "📦 Step 1/6: Generating React library..."
npx nx generate @nx/react:library "${LIB_NAME}" \
  --directory="${LIB_DIR}" \
  --bundler=vite \
  --unitTestRunner=vitest \
  --style=@emotion/styled \
  --component=true \
  --publishable \
  --importPath="${IMPORT_PATH}" \
  --no-interactive

echo ""

# ─── Step 2: Add Storybook configuration ─────────────────
echo "📖 Step 2/6: Adding Storybook configuration..."
npx nx generate @nx/react:storybook-configuration "${IMPORT_PATH}" \
  --no-interactive

echo ""

# ─── Step 3: Configure ThemeProvider for Storybook ────────
echo "🎨 Step 3/6: Configuring ThemeProvider for Storybook..."
cat > "${LIB_DIR}/.storybook/preview.ts" << 'EOF'
import { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@thanh-libs/theme';

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
  },
  globalTypes: {
    themeMode: {
      description: 'Theme mode',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    themeMode: 'light',
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.themeMode || 'light';
      return (
        <ThemeProvider defaultMode={mode}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
EOF

echo ""

# ─── Step 4: Create .gitignore ────────────────────────────
echo "🚫 Step 4/6: Creating .gitignore..."
cat > "${LIB_DIR}/.gitignore" << 'EOF'
# Build output
dist

# Dependencies
node_modules

# Test output
test-output
coverage

# Storybook
storybook-static

# Misc
*.tsbuildinfo
vite.config.*.timestamp*
vitest.config.*.timestamp*
EOF

echo ""

# ─── Step 5: Apply templates ─────────────────────────────
echo "📋 Step 5/6: Applying CI-ready templates..."

# Copy static templates (no placeholders)
cp "${TEMPLATE_DIR}/tsconfig.json"           "${LIB_DIR}/tsconfig.json"
cp "${TEMPLATE_DIR}/tsconfig.lib.json"       "${LIB_DIR}/tsconfig.lib.json"
cp "${TEMPLATE_DIR}/tsconfig.spec.json"      "${LIB_DIR}/tsconfig.spec.json"
cp "${TEMPLATE_DIR}/tsconfig.storybook.json" "${LIB_DIR}/tsconfig.storybook.json"

# Copy publish workflow
mkdir -p "${LIB_DIR}/.github/workflows"
cp "${TEMPLATE_DIR}/publish.yml" "${LIB_DIR}/.github/workflows/publish.yml"

# Copy templates with {{LIB_NAME}} placeholder and replace
cp "${TEMPLATE_DIR}/package.json" "${LIB_DIR}/package.json"
sed -i "s/{{LIB_NAME}}/${LIB_NAME}/g" "${LIB_DIR}/package.json"

cp "${TEMPLATE_DIR}/vite.config.mts" "${LIB_DIR}/vite.config.mts"
sed -i "s/{{LIB_NAME}}/${LIB_NAME}/g" "${LIB_DIR}/vite.config.mts"

# Copy LICENSE from root
cp LICENSE "${LIB_DIR}/LICENSE"

echo "   ✔ tsconfig.json, tsconfig.lib.json, tsconfig.spec.json, tsconfig.storybook.json"
echo "   ✔ publish.yml"
echo "   ✔ package.json (with @thanh-libs/${LIB_NAME})"
echo "   ✔ vite.config.mts (with @thanh-libs/${LIB_NAME})"
echo "   ✔ LICENSE"

echo ""

# ─── Step 6: Verify ──────────────────────────────────────
echo "✅ Step 6/6: Verifying..."

# Quick sanity check: ensure key files exist
MISSING=0
for f in tsconfig.json tsconfig.lib.json tsconfig.spec.json tsconfig.storybook.json vite.config.mts package.json LICENSE .gitignore .github/workflows/publish.yml .storybook/preview.ts; do
  if [ ! -f "${LIB_DIR}/${f}" ]; then
    echo "   ❌ Missing: ${f}"
    MISSING=1
  fi
done

if [ $MISSING -eq 0 ]; then
  echo "   ✔ All files present"
fi

echo ""
echo "✅ Library '${LIB_NAME}' created successfully!"
echo ""
echo "📋 Quick commands:"
echo "   yarn nx build ${IMPORT_PATH}        # Build the library"
echo "   yarn nx test ${IMPORT_PATH}         # Run tests"
echo "   yarn nx storybook ${IMPORT_PATH}    # Launch Storybook"
echo ""
echo "📦 Release commands:"
echo "   cd ${LIB_DIR}"
echo "   npx standard-version --first-release  # First release"
echo "   git push origin master --follow-tags   # Push & trigger publish"
echo ""
echo "📝 Import in your code:"
echo "   import { ${LIB_NAME^} } from '${IMPORT_PATH}';"
echo ""
echo "⚠️  Next steps:"
echo "   1. Setup git repo: follow /create-lib workflow (Phase 2+)"
echo "   2. Configure NPM_TOKEN secret at github.com/system-core-ui/${LIB_NAME}"
echo ""
