# Nx Monorepo Setup — Walkthrough

## What Was Built

Nx monorepo tại `/home/administrator/back up/Personal lib/` với:

| Component | Status |
|---|---|
| **Nx workspace** (v22.5.4) | ✅ Initialized |
| **Theme library** (`@personal-lib/theme`) | ✅ Built — 43.43 kB |
| **Storybook** (v10, Vite builder) | ✅ Configured |
| **Demo app** (`demo`) | ✅ Created |
| **Gen-lib script** (`yarn gen-lib`) | ✅ Ready |

## Project Structure

```
Personal lib/
├── apps/demo/                           # React demo app (Vite)
│   ├── src/
│   │   ├── main.tsx                     # Entry + ThemeProvider
│   │   └── app/app.tsx                  # Styled demo page
│   └── vite.config.mts                  # Emotion babel plugin configured
├── libs/theme/                          # @personal-lib/theme library
│   ├── src/
│   │   ├── index.ts                     # Barrel exports
│   │   └── lib/
│   │       ├── tokens.ts                # Design tokens (colors, spacing, ...)
│   │       ├── themes.ts                # Light + Dark theme + module augmentation
│   │       ├── ThemeProvider.tsx         # Theme context + toggle
│   │       ├── GlobalStyles.tsx         # CSS reset (Emotion Global)
│   │       └── theme.stories.tsx        # Storybook showcase
│   ├── .storybook/
│   │   ├── main.ts                      # Storybook config
│   │   └── preview.tsx                  # ThemeProvider decorator + toolbar toggle
│   └── vite.config.mts
├── tools/gen-lib.sh                     # Library scaffolding script
├── package.json                         # Yarn scripts
├── nx.json
└── tsconfig.base.json
```

## Available Commands

| Command | Description |
|---|---|
| `yarn dev` | Start demo app (`http://localhost:4200`) |
| `yarn storybook` | Start theme Storybook |
| `yarn build` | Build all projects |
| `yarn test` | Run all tests |
| `yarn lint` | Lint all projects |
| `yarn gen-lib <name>` | Scaffold new library (Vite + Vitest + Emotion + Storybook) |

> **Important**: Use Node v22.13.0 (`nvm use 22.13.0`) before running commands.

## Theme Library Exports

```tsx
import {
  // Components
  ThemeProvider, GlobalStyles,

  // Hooks
  useThemeMode,

  // Themes
  lightTheme, darkTheme,

  // Tokens
  colors, spacing, fontFamily, fontSize,
  fontWeight, lineHeight, borderRadius,
  shadows, breakpoints, transitions, zIndex,

  // Types
  AppTheme, ThemeProviderProps,
} from '@personal-lib/theme';
```

## Verification Results

- ✅ `npx nx build @personal-lib/theme` — Built successfully (43.43 kB)
- ✅ `npx nx serve demo` — Dev server starts at `http://localhost:4200`
- ✅ Yarn install with workspaces resolving correctly
- ⚠️ Browser testing showed stale cache issues during development — do a hard refresh (`Ctrl+Shift+R`) on first load
