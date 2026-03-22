---
description: Create a new lib from scratch — scaffold, configure, setup git repo, push
---

// turbo-all

# Create a New Library

Use when creating a brand new library in the monorepo.

## Prerequisites
- Library name (e.g. `button`, `input`, `select`)
- GitHub repo must exist at `system-core-ui/<lib-name>` (create manually first)

## Phase 1 — Scaffold + Apply Templates

1. Generate the library with all configs applied automatically
```bash
bash tools/gen-lib.sh <lib-name>
```
> This runs nx scaffold + storybook + copies all templates (tsconfig, vite, package.json, publish.yml)

## Phase 2 — Setup Git submodule

2. Initialize as git repo and push to GitHub
```bash
cd libs/<lib-name>
git init
git remote add origin git@github.com:system-core-ui/<lib-name>.git
git checkout -b master
git add .
git commit -m "feat: initial scaffold for @thanh-libs/<lib-name>"
git push -u origin master
```

## Phase 3 — Register as workspace submodule

3. Go back to workspace root and add as submodule
```bash
cd ../..
git submodule add git@github.com:system-core-ui/<lib-name>.git libs/<lib-name>
git add .
git commit -m "chore: add <lib-name> submodule"
git push
```

## Phase 4 — Verify

4. **Ask user to configure `NPM_TOKEN` secret** at `github.com/system-core-ui/<lib-name>/settings/secrets/actions`

5. Run a local build test
```bash
cd libs/<lib-name>
npm install
npx vite build
```

## Notes
- `gen-lib.sh` handles everything: nx scaffold + storybook + templates + verification
- Templates live in `tools/templates/` — update there to change defaults for all future libs
- The lib is immediately ready for `/publish-lib` workflow after this
