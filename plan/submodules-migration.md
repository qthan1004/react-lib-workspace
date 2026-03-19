# Monorepo → Submodules Migration Plan

## Goal

Tách mỗi lib thành repo riêng dưới GitHub org `system-ui`, workspace reference qua git submodules.

## Current → Target Architecture

```
BEFORE:                                    AFTER:
react-lib-workspace/ (single repo)         GitHub org: system-ui/
├── libs/                                  ├── dialog     ← standalone repo
│   ├── dialog/                            ├── theme      ← standalone repo
│   ├── theme/                             ├── typography ← standalone repo
│   ├── typography/                        └── utils      ← standalone repo
│   └── utils/
                                           react-lib-workspace/ (workspace repo)
                                           ├── libs/
                                           │   ├── dialog/     ← submodule → system-ui/dialog
                                           │   ├── theme/      ← submodule → system-ui/theme
                                           │   ├── typography/ ← submodule → system-ui/typography
                                           │   └── utils/      ← submodule → system-ui/utils
```

## Decisions

| Item | Decision |
|------|----------|
| Org name | `system-ui` |
| Git history | Fresh (no history) |
| Visibility | Public |
| Workspace libs | Cleared, replaced by submodules |
| New libs | Always push to group, not workspace |

## Steps

### Phase 1 — Prerequisites
1. Install `gh` CLI
2. Create GitHub Organization `system-ui`
3. Auth `gh auth login`

### Phase 2 — Create repos & push lib code
For each lib (`dialog`, `theme`, `typography`, `utils`):
1. Create repo: `system-ui/<lib-name>` (public)
2. Copy code to temp dir, init git, push

### Phase 3 — Update workspace
1. `git rm -r libs/` — clear lib code from workspace
2. Add submodules:
   ```bash
   git submodule add git@github.com:system-ui/dialog.git libs/dialog
   git submodule add git@github.com:system-ui/theme.git libs/theme
   git submodule add git@github.com:system-ui/typography.git libs/typography
   git submodule add git@github.com:system-ui/utils.git libs/utils
   ```
3. Commit & push workspace

### Phase 4 — Verify
- Fresh clone + `git submodule update --init --recursive`
- `yarn install`
- `yarn storybook`

### Phase 5 — Add workflow
- Create workflow `/gen-lib` for generating new libs under `system-ui/` org
