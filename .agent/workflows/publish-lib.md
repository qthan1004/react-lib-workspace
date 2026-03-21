---
description: Publish a lib to npm via release branch + alpha builds + standard-version
---

// turbo-all

# Publish Lib to npm

Use this workflow to publish a lib (e.g. `utils`, `theme`, `dialog`, `typography`) to npm.
Uses a release branch with alpha builds for testing before the official publish.

> `standard-version` will auto-run **test** (prerelease) and **build** (postbump) before creating the release.

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

## Phase 3 — Official build

5. Run standard-version for official release (auto test + build)
```bash
npx standard-version
```

6. Push official release
```bash
git push origin release --follow-tags
```

## Phase 4 — Merge & cleanup

7. Merge release into master and delete branch
```bash
git checkout master
git merge release
git push origin master
git branch -d release
git push origin --delete release
```

## Phase 5 — Update workspace submodule

8. Update submodule reference in workspace
```bash
cd ../..
git add libs/<lib-name>
git commit -m "chore: update <lib-name> submodule"
git push
```

## Important Notes
- `standard-version` auto-runs test (prerelease) + build (postbump) — if either fails, release is aborted
- Alpha publishes to npm with `--tag alpha` (install via `@thanh-libs/<lib>@alpha`)
- Official publishes to npm `latest` tag
- The lib repo must have `NPM_TOKEN` secret configured
- Check CI status at `github.com/system-core-ui/<lib-name>` → Actions tab
