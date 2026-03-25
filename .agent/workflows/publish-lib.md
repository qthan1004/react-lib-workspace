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
bash tools/publish-lib.sh alpha <lib-name>
```
> **STOP**: Wait for Github Actions CI to pass. Fix & repeat if failed.

## 2. Official Release
```bash
bash tools/publish-lib.sh release <lib-name>
```
> **STOP**: Wait for Github Actions CI to pass.

## 3. Merge & Cleanup
```bash
bash tools/publish-lib.sh merge <lib-name>
```

## 4. Update Workspace
```bash
bash tools/publish-lib.sh update <lib-name>
```

## Notes
- `standard-version` auto-runs test (prerelease) + build (postbump) — if either fails, release is aborted.
- Alpha publishes with `--tag alpha`, official publishes to `latest` and auto-cleans alpha versions.
- **NEVER** delete release branch until user confirms both alpha AND official CI passed.
- Lib repo must have `NPM_TOKEN` secret configured.
