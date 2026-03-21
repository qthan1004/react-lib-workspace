---
description: Create a new lib from scratch — scaffold, configure, setup git repo, push
---

// turbo-all

# Create a New Library

Use when creating a brand new library in the monorepo.

## Prerequisites
- Library name (e.g. `button`, `input`, `select`)
- GitHub repo must exist at `system-core-ui/<lib-name>` (create manually first)

## Phase 1 — Scaffold with nx

1. Generate the library using gen-lib.sh
```bash
bash tools/gen-lib.sh <lib-name>
```

## Phase 2 — Apply CI-ready templates

2. Override configs with standalone templates (tsconfig, publish.yml, package.json)
```bash
LIB=<lib-name>
cp tools/templates/tsconfig.json libs/$LIB/tsconfig.json
cp tools/templates/tsconfig.lib.json libs/$LIB/tsconfig.lib.json
cp tools/templates/tsconfig.spec.json libs/$LIB/tsconfig.spec.json
cp tools/templates/tsconfig.storybook.json libs/$LIB/tsconfig.storybook.json
cp tools/templates/publish.yml libs/$LIB/.github/workflows/publish.yml
```

3. Apply vite.config.mts template and replace placeholder
```bash
cp tools/templates/vite.config.mts libs/$LIB/vite.config.mts
sed -i "s/{{LIB_NAME}}/$LIB/g" libs/$LIB/vite.config.mts
```

4. Update package.json — merge template devDeps + standard-version config
```bash
node -e "
const fs = require('fs');
const tpl = JSON.parse(fs.readFileSync('tools/templates/package.json','utf8'));
const pkg = JSON.parse(fs.readFileSync('libs/$LIB/package.json','utf8'));
pkg.devDependencies = { ...pkg.devDependencies, ...tpl.devDependencies };
pkg['standard-version'] = tpl['standard-version'];
fs.writeFileSync('libs/$LIB/package.json', JSON.stringify(pkg, null, 2) + '\n');
"
```

## Phase 3 — Setup Git submodule

5. Initialize as git repo and set remote
```bash
cd libs/$LIB
git init
git remote add origin git@github.com:system-core-ui/$LIB.git
git checkout -b master
git add .
git commit -m "feat: initial scaffold for @thanh-libs/$LIB"
git push -u origin master
```

## Phase 4 — Register as workspace submodule

6. Go back to workspace root and add as submodule
```bash
cd ../..
git submodule add git@github.com:system-core-ui/$LIB.git libs/$LIB
git add .
git commit -m "chore: add $LIB submodule"
git push
```

## Phase 5 — Verify

7. **Ask user to configure `NPM_TOKEN` secret** at `github.com/system-core-ui/<lib-name>/settings/secrets/actions`

8. Run a local build test
```bash
cd libs/$LIB
npm install
npx vite build
```

## Notes
- `gen-lib.sh` creates the nx scaffold with Vite, Vitest, Emotion, Storybook
- Templates override nx defaults with standalone tsconfigs + CI-ready configs
- The lib is immediately ready for `/publish-lib` workflow after this
