---
description: Push changes inside a single lib submodule and update workspace
---

// turbo-all

# Push 1 Lib

```bash
bash tools/push-lib.sh <lib-name> "<type>(<scope>): <subject>"
```

> **IMPORTANT**: NEVER commit lib source code to the workspace repo directly. Workspace only tracks submodule refs.
