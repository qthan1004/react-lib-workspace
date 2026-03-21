---
description: Project structure and conventions to avoid redundant file reading
---

# React Lib Workspace Context

## Structure
- **Workspace**: `react-lib-workspace` (yarn workspaces + nx)
- **Libs** (git submodules under `system-core-ui` org):
  - `libs/utils` — pure TS utilities (`pxToRem`, `alpha`), builds with `tsc`
  - `libs/theme` — Emotion-based theming (ThemeProvider, GlobalStyles, palettes), builds with `vite`
  - `libs/dialog` — Modal/Popover components, builds with `vite`
  - `libs/typography` — Typography components, builds with `vite`
- **npm scope**: `@thanh-libs/*` (e.g. `@thanh-libs/theme`)
- **Publish**: CI/CD via GitHub Actions (`publish.yml`), triggered by `v*` tags

## Build Tools per Lib
| Lib | Build | Test | Config |
|-----|-------|------|--------|
| utils | `tsc --project tsconfig.lib.json` | vitest | standalone tsconfig |
| theme | `vite build` | vitest | standalone tsconfig, `jsxImportSource: @emotion/react` |
| dialog | `vite build` | vitest | standalone tsconfig, `lib: [ES2022, dom, dom.iterable]` |
| typography | `vite build` | vitest | standalone tsconfig |

## Key Conventions
- **tsconfig**: All libs use standalone tsconfig (inlined base config, NO `extends ../../tsconfig.base.json`)
- **devDependencies**: Each lib lists its own build deps (`@vitejs/plugin-react`, `vite`, `vite-plugin-dts`, `vitest`, `typescript`, `jsdom`)
- **standard-version**: `prerelease` hook runs `vitest --passWithNoTests`, `postbump` runs build
- **Git**: Libs push to `system-core-ui/<lib>`, workspace tracks submodule refs at `qthan1004/react-lib-workspace`
- **Branches**: All use `master` (not `main`)

## Bulk Operations
- **Push all libs**: `bash tools/push-all-libs.sh "commit message"`
- **Publish a lib**: Follow `/publish-lib` workflow (release branch → alpha → confirm CI → official → merge → cleanup)

## Common Pitfalls (already fixed)
- CI needs standalone tsconfig (no workspace-relative paths)
- CI needs `--passWithNoTests` for libs without test files
- CI needs all build deps in each lib's `package.json` (not just workspace root)
- `vite.config.mts` `resolve.conditions` uses `@thanh-libs/source` for dev
