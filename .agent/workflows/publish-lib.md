---
description: Publish a lib to npm via release branch and standard-version
---

// turbo-all

# Publish Lib

**0. Pre-checks**: 
- `bash tools/check-lib-deps.sh <lib-name>` (add missing to package.json)
- Update `README.md` (installation, API, usage). Commit to master.

## 1. Alpha Release
```bash
cd libs/<lib-name>
git checkout -b release
npx standard-version --prerelease alpha
git push origin release --follow-tags
```
> **STOP**: Wait for Github Actions CI to pass. Fix & repeat if failed.

## 2. Official Release
```bash
npx standard-version
git push origin release --follow-tags
```
> **STOP**: Wait for Github Actions CI to pass.

## 3. Merge & Cleanup
```bash
git checkout master
git merge release
git push origin master
git branch -d release
git push origin --delete release

cd ../..
git add libs/<lib-name> RELEASES.md
git commit -m "chore: update <lib-name> v<version>"
git push
```
