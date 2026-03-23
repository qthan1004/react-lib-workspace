---
description: Create a new lib from scratch — scaffold, configure, setup git repo, push
---

// turbo-all

# Create a New Library

Use when creating a brand new library in the monorepo.

## Prerequisites
- Library name (e.g. `button`, `input`, `select`)
- `gh` CLI authenticated with access to `system-core-ui` org
- Check git protocol in use: `grep url .gitmodules | head -1`
  - SSH: `git@github.com:system-core-ui/<lib>.git`
  - HTTPS: `https://github.com/system-core-ui/<lib>.git`

## Phase 1 — Scaffold + Apply Templates

1. Generate the library with all configs applied automatically
```bash
bash tools/gen-lib.sh <lib-name>
```
> This runs nx scaffold + storybook + copies all templates (tsconfig, vite, package.json, publish.yml)
> **Note:** If `bash` is not available (e.g. PowerShell), execute the steps in `gen-lib.sh` manually or use Git Bash.

## Phase 2 — Create GitHub repo + Setup Git

2. Create the GitHub repo via `gh` CLI
```bash
gh repo create system-core-ui/<lib-name> --public --confirm
```

3. Initialize as git repo and push to GitHub (use the same protocol as existing submodules)
```bash
cd libs/<lib-name>
git init
# SSH:   git remote add origin git@github.com:system-core-ui/<lib-name>.git
# HTTPS: git remote add origin https://github.com/system-core-ui/<lib-name>.git
git remote add origin <url-matching-.gitmodules-protocol>
git checkout -b master
git add .
git commit -m "feat: initial scaffold for @thanh-libs/<lib-name>"
git push -u origin master
```

## Phase 3 — Register as workspace submodule

4. Go back to workspace root and add as submodule (use same protocol as `.gitmodules`)
```bash
cd ../..
# SSH:   git submodule add git@github.com:system-core-ui/<lib-name>.git libs/<lib-name>
# HTTPS: git submodule add https://github.com/system-core-ui/<lib-name>.git libs/<lib-name>
git submodule add <url-matching-.gitmodules-protocol> libs/<lib-name>
git add .
git commit -m "chore: add <lib-name> submodule"
git push
```

## Phase 4 — Verify

5. **Ask user to configure `NPM_TOKEN` secret** at `github.com/system-core-ui/<lib-name>/settings/secrets/actions`

6. Run a local build test
```bash
cd libs/<lib-name>
npm install
npx vite build
```

## Notes
- `gen-lib.sh` handles everything: nx scaffold + storybook + templates + verification
- Templates live in `tools/templates/` — update there to change defaults for all future libs
- The lib is immediately ready for `/publish-lib` workflow after this
- GitHub repo is created automatically via `gh` CLI — no manual setup needed
