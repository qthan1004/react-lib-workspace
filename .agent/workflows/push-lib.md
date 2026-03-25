---
description: Push changes inside a single lib submodule and update workspace
---

// turbo-all

# Push 1 Lib

```bash
cd libs/<lib-name>
git add .
git commit -m "<type>(<scope>): <subject>"
git push origin master

cd ../..
git add libs/<lib-name>
git commit -m "chore: update <lib-name> submodule"
git push
```

> **IMPORTANT**: NEVER commit lib source code to the workspace repo directly. Workspace only tracks submodule refs.
