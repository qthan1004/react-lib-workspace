---
description: Git commit messages must follow Conventional Commits format for standard-version compatibility
---

# Git Commit Convention (Conventional Commits)

## Rule

All git commit messages **MUST** follow the [Conventional Commits](https://www.conventionalcommits.org/) format, compatible with `standard-version` for automated versioning and changelog generation.

## Format

```
<type>(<scope>): <subject>
```

- **type** — required
- **scope** — optional, the affected lib/module (e.g. `dialog`, `theme`, `typography`)
- **subject** — required, imperative present tense, no capital first letter, no period at end

## Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | minor |
| `fix` | Bug fix | patch |
| `refactor` | Code change (no feat/fix) | — |
| `style` | Formatting, whitespace | — |
| `docs` | Documentation only | — |
| `chore` | Build, tooling, deps | — |
| `test` | Adding/fixing tests | — |
| `perf` | Performance improvement | patch |
| `ci` | CI/CD changes | — |

### Breaking Changes → major bump

Add `!` after type or `BREAKING CHANGE:` in body:

```
feat(dialog)!: remove size prop in favor of preset system

BREAKING CHANGE: `size` prop type changed from string to ModalSize union
```

## Examples

```
feat(dialog): add size presets and custom width/height support
fix(theme): resolve z-index not applying from ThemeProvider
refactor(typography): use useTheme() in styled components
style: configure prettier import order sorting
chore: remove nexus registry references
docs(dialog): update storybook stories for size presets
```
