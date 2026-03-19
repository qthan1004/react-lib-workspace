---
description: Push changes inside a lib submodule to its system-core-ui org repo
---

// turbo-all

# Push Lib to system-core-ui

Use this workflow when you've made changes inside a lib (e.g. `libs/dialog`, `libs/theme`, etc.).
Lib changes must be committed and pushed to the **lib's own repo** (under `system-core-ui` org), NOT the workspace repo.

## Steps

1. Navigate into the lib directory
```bash
cd libs/<lib-name>
```

2. Check status
```bash
git status --short
```

3. Stage changes
```bash
git add .
```

4. Commit using Conventional Commits format
```bash
git commit -m "<type>(<scope>): <subject>"
```

5. Push to lib repo (system-core-ui/<lib-name>)
```bash
git push origin main
```

6. Go back to workspace root and update submodule reference
```bash
cd ../..
git add libs/<lib-name>
git commit -m "chore: update <lib-name> submodule"
git push
```

## Important Notes
- **NEVER** commit lib source code to the workspace repo directly
- Libs live at `git@github.com:system-core-ui/<lib-name>.git`
- The workspace only tracks the submodule commit reference
- After pushing lib changes, always update the submodule reference in workspace
