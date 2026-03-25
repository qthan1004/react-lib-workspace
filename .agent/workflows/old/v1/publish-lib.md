---
description: Publish a lib to npm via release branch + alpha builds + standard-version
---

// turbo-all

# Publish Lib to npm

Use this workflow to publish a lib (e.g. `utils`, `theme`, `dialog`, `typography`) to npm.
Uses a release branch with alpha builds for testing before the official publish.

> `standard-version` will auto-run **test** (prerelease) and **build** (postbump) before creating the release.

## Phase 0 — Review documentation

0. **Check and update README.md** before publishing:
   - Read the lib's source code (`src/index.ts`, components, models)
   - Ensure README covers: installation, requirements/peer deps, API/props, usage examples
   - If README is missing or outdated, write/update it and commit
   - Commit doc changes to master BEFORE creating release branch

1. **Run dependency check** to ensure all imports are declared in package.json:
```bash
bash tools/check-lib-deps.sh <lib-name>
```
> If any missing deps are reported, add them to `devDependencies` and commit to master first.

## Phase 1 — Setup release branch

1. Navigate into the lib directory
```bash
cd libs/<lib-name>
```

2. Create a release branch
```bash
git checkout -b release
```

## Phase 2 — Alpha build

3. Run standard-version with alpha prerelease (auto test + build)
```bash
npx standard-version --prerelease alpha
```

4. Push alpha to trigger CI/CD
```bash
git push origin release --follow-tags
```

> If alpha fails or needs fixes: fix the code, commit, then repeat steps 3-4.
> Each run increments: `v0.0.6-alpha.0` → `v0.0.6-alpha.1` → ...

5. **STOP — Wait for user to confirm CI passed before proceeding**
> Check CI status at `github.com/system-core-ui/<lib-name>` → Actions tab.
> If CI failed: fix the issue, commit, and repeat from step 3.

## Phase 3 — Official build

6. Run standard-version for official release (auto test + build)
```bash
npx standard-version
```

7. Push official release
```bash
git push origin release --follow-tags
```

8. **STOP — Wait for user to confirm CI passed before cleanup**
> Check CI status. If CI failed: fix and repeat from step 6.

## Phase 4 — Merge & cleanup (only after user confirms CI passed)

9. Merge release into master and delete branch
```bash
git checkout master
git merge release
git push origin master
git branch -d release
git push origin --delete release
```

## Phase 5 — Update workspace submodule

10. Update submodule reference and release log in workspace
```bash
cd ../..
git add libs/<lib-name>
```

11. **Update `RELEASES.md`** — Add a new row to the table with the lib name, new version, and today's date. Only log official releases (not alpha).

12. Commit and push workspace
```bash
git add RELEASES.md
git commit -m "chore: update <lib-name> submodule to v<version>"
git push
```

## Important Notes
- `standard-version` auto-runs test (prerelease) + build (postbump) — if either fails, release is aborted
- Alpha publishes to npm with `--tag alpha` (install via `@thanh-libs/<lib>@alpha`)
- Official publishes to npm `latest` tag, then auto-cleans up alpha versions
- **NEVER delete the release branch until user confirms both alpha AND official CI passed**
- The lib repo must have `NPM_TOKEN` secret configured
