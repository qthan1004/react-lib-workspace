---
description: Create a new lib from scratch — scaffold, configure git, push
---

// turbo-all

# Create a New Library

## 1. Scaffold
```bash
bash tools/gen-lib.sh <lib-name>
```

## 2. GitHub & Git Setup
```bash
LIB_NAME="<lib-name>"
PROTOCOL_URL="<url-matching-.gitmodules-protocol>" # e.g. git@github.com:system-core-ui/<lib>.git

gh repo create system-core-ui/$LIB_NAME --public --confirm

cd libs/$LIB_NAME
git init
git remote add origin $PROTOCOL_URL
git checkout -b master
git add .
git commit -m "feat: initial scaffold for @thanh-libs/$LIB_NAME"
git push -u origin master

cd ../..
git submodule add $PROTOCOL_URL libs/$LIB_NAME
git add .
git commit -m "chore: add $LIB_NAME submodule"
git push
```

## 3. Verify
- Add `NPM_TOKEN` inside github.com/system-core-ui/<lib-name>/settings/secrets/actions
- Build test:
```bash
cd libs/<lib-name>
npm install
npx vite build
```
