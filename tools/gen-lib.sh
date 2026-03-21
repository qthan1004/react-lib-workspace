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
echo "🎨 Step 3/5: Configuring ThemeProvider for Storybook..."
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
echo "🚫 Step 4/5: Creating .gitignore..."
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

# ─── Step 5: Create GitHub Actions publish workflow ───────
echo "🚀 Step 5/5: Creating CI/CD publish workflow..."
mkdir -p "${LIB_DIR}/.github/workflows"
cat > "${LIB_DIR}/.github/workflows/publish.yml" << 'WORKFLOW_EOF'
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  # ─── Stage 1: Test ───
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22.13.0'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npx vitest run

  # ─── Stage 2: Build ───
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22.13.0'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npx vite build

  # ─── Stage 3: Publish ───
  publish:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22.13.0'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npx vite build

      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
WORKFLOW_EOF

# ─── Update package.json: add publishConfig + release scripts ───
echo ""
echo "📝 Updating package.json with publishConfig and release scripts..."

# Use node to safely modify package.json
node -e "
const fs = require('fs');
const pkgPath = '${LIB_DIR}/package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.publishConfig = { access: 'public' };
pkg.scripts = pkg.scripts || {};
pkg.scripts.release = 'standard-version';
pkg.scripts['release:minor'] = 'standard-version --release-as minor';
pkg.scripts['release:major'] = 'standard-version --release-as major';
if (pkg.files) {
  if (!pkg.files.includes('!**/*.stories.*')) {
    pkg.files.push('!**/*.stories.*');
  }
}
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
"

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
