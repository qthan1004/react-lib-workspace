---
description: Push changes for all lib submodules at once with a single commit message
---

// turbo-all

# Push All Libs

Use when you've made the **same type of change** across multiple libs (e.g. config updates, CI fixes).
This replaces calling `/push-lib` separately for each lib.

## Steps

1. Run the push-all script with a commit message
```bash
bash tools/push-all-libs.sh "<type>(<scope>): <subject>"
```

Example:
```bash
bash tools/push-all-libs.sh "fix: standalone tsconfig for CI"
```

This will:
- `git add .` + `git commit` + `git push` for each lib (utils, theme, dialog, typography)
- Update workspace submodule references
- Push workspace

## Notes
- Skips libs with no changes automatically
- Pushes whatever branch each lib is currently on
- Uses Conventional Commits format for the message
