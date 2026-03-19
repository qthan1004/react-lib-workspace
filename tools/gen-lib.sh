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
IMPORT_PATH="@thanhdq/${LIB_NAME}"
LIB_DIR="libs/${LIB_NAME}"

# ─── Check if library already exists ─────────────────────
if [ -d "$LIB_DIR" ]; then
  echo "❌ Error: Library '${LIB_NAME}' already exists at ${LIB_DIR}"
  exit 1
fi

echo ""
echo "🚀 Creating library: ${LIB_NAME}"
echo "   Import path: ${IMPORT_PATH}"
echo "   Directory: ${LIB_DIR}"
echo ""

# ─── Step 1: Generate React library ──────────────────────
echo "📦 Step 1/3: Generating React library..."
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
echo "📖 Step 2/3: Adding Storybook configuration..."
npx nx generate @nx/react:storybook-configuration "${IMPORT_PATH}" \
  --no-interactive

echo ""

# ─── Step 3: Update Storybook preview with ThemeProvider ──
echo "🎨 Step 3/3: Configuring ThemeProvider for Storybook..."
cat > "${LIB_DIR}/.storybook/preview.ts" << 'EOF'
import { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@thanhdq/theme';

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
echo "✅ Library '${LIB_NAME}' created successfully!"
echo ""
echo "📋 Quick commands:"
echo "   yarn nx build ${IMPORT_PATH}        # Build the library"
echo "   yarn nx test ${IMPORT_PATH}         # Run tests"
echo "   yarn nx storybook ${IMPORT_PATH}    # Launch Storybook"
echo ""
echo "📝 Import in your code:"
echo "   import { ${LIB_NAME^} } from '${IMPORT_PATH}';"
echo ""
