---
description: Project structure and conventions to minimize token usage
---

# React Lib Workspace Context

## Structure
- **Workspace**: `react-lib-workspace` (yarn + nx)
- **Libs**: git submodules at `system-core-ui/<lib>` (`@thanh-libs/*`)
- **Builds**:
  - `utils`: `tsc` (vitest, standalone tsconfig)
  - `theme`, `dialog`, `typography`: `vite build` (vitest, standalone tsconfig)
- **CI/CD**: `publish.yml` triggered by `v*` tags

## Conventions
- **tsconfig**: Standalone (no base extensions).
- **devDeps**: Full devDeps (vite, vitest, typescript) inside each lib's `package.json`.
- **Git**: Branch `master`. Workspace tracks submodule references.
- **a11y**: Strict WCAG 2.2 compliance (see `component-patterns`).

## Bulk Tools (`tools/`)
- Push all libs: `bash tools/push-all-libs.sh "<msg>"`
- Sync config: `bash tools/sync-config.sh <source> [dest]`
- Publish/Push 1 Lib: Use `/publish-lib` or `/push-lib` workflow.
- **Timeout Rule**: Stop any command exceeding 30s with no output.
