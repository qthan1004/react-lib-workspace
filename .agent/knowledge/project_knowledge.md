# Mẫu Kiến thức chuẩn cho Agent

## 1. Project Topology (Cấu trúc có gì)

- **Repo Type**: Polyrepo (Yarn workspaces + NX)
- **Core Tech Stack**: React, Vite, Vitest, TypeScript, Emotion (CSS-in-JS).
- **General Architecture**: Standalone sub-modules in `libs/` namespace (`@thanh-libs/*`). Component libraries publish independently.

## 2. Tools & Workflows (Có các workflow/script gì)

- **Start/Dev**: `yarn dev` (runs `demo` inside NX).
- **Build**: `yarn build` (runs NX build on all libs). Or `vite build` per package.
- **Testing**: `yarn test` (runs Vitest on all libs).
- **Special Agent Workflows**: Workflows are in `.agent/workflows/` (e.g. `/create-lib`, `/publish-lib`, `/delegate`, `/execute-task`).

## 3. Directory Map (Phân chia directory ra sao)

### 3.1. Project-level Structure

```
<workspace_root>/
├── libs/              # Contains all independent component/utility libraries 
│   ├── avatar/
│   ├── button/
│   ├── chip/
│   ├── theme/
│   └── ...
├── apps/              # Next.js or Demo applications
├── tools/             # Bash scripts for Git and package scaffold operations
├── plan/              # Plan instructions and queued tasks
└── [config files]     # nx.json, package.json, eslint configs, etc.
```

### 3.2. Module/Lib Structure (rút ra từ scan thực tế)

```
libs/[module-name]/
├── src/
│   ├── lib/
│   │   ├── [ComponentName]/
│   │   │   ├── index.ts
│   │   │   ├── [ComponentName].tsx
│   │   │   └── styled.tsx
│   │   ├── stories/
│   │   ├── models/
│   │   ├── constants/
│   │   └── helpers/
│   └── index.ts       # Barrel export
├── tests/             # Component spec files reside here
├── .storybook/        # Module-specific storybook config
└── [config files]     # tsconfig.*.json, vite.config.mts, package.json
```

### 3.3. File Placement Convention (CRITICAL — phải điền chính xác)

| Loại file | Vị trí chính xác | Ví dụ (từ module đã scan) |
|-----------|-------------------|---------------------------|
| Source code | `src/lib/` và `src/lib/[ComponentName]/` | `libs/chip/src/lib/Chip/Chip.tsx` |
| **Test files** (`*.spec.*`, `*.test.*`) | `tests/` (at module root level) | `libs/chip/tests/Chip.test.tsx` |
| **Stories** (`*.stories.*`) | `src/lib/stories/` or `src/lib/` | `libs/chip/src/lib/stories/` |
| Barrel export | `src/index.ts` | `libs/chip/src/index.ts` |
| Styled components | `src/lib/[ComponentName]/styled.tsx` | `libs/chip/src/lib/Chip/styled.tsx` |
| Models/Types | `src/lib/models/` | `libs/chip/src/lib/models/index.ts` |
| Config files | `root of the lib` | `libs/chip/tsconfig.json` |

## 4. Architecture Conventions & Gotchas (Luật thiết kế & Lỗi cần tránh)

### 4.1. Structural Rules
- **Issue/Context**: Incorrect module definition or imports.
- **Mandatory Rule**: All components must use `forwardRef`. Export with named exports in `src/index.ts`. All test and story configurations must be completely contained within each lib so that it correctly bundles and resolves dependencies independent of monorepo.

### 4.2. Styled Components (Emotion) & CSS-in-JS
- **Issue/Context**: Theme passing to custom components.
- **Mandatory Rule**: ALWAYS import `useTheme` and `styled` from `@emotion/react`. Theme is read within the styled definition callback e.g. `({ prop }): CSSObject => { const { palette, spacing } = useTheme(); return {...} }`. Never import them from the internal UI library unless explicitly required. 

### 4.3. Component Testing 
- **Issue/Context**: `useTheme` context missing leading to emotion trace crash.
- **Mandatory Rule**: ALWAYS wrap components in test files using `import { ThemeProvider } from '@thanh-libs/theme'`. NEVER import `ThemeProvider` from `@emotion/react` directly. Use `@testing-library/react` and `vitest` with `describe/it/expect` explicit imports. Test files must include `axe` accessibility testing.

## 5. Shared Utilities (Functions / Helpers dùng chung)

| Utility | Package     | Mô tả | Ví dụ             |
| ------- | ----------- | ----- | ----------------- |
| `useTheme` | `@emotion/react` | Lấy theme object chuẩn | `const { palette, spacing } = useTheme();` |

## 6. Styling Token Convention (Khi nào dùng token vs hardcode)

### 6.1. Spacing

- **Tokens available**: e.g., `1=tiny(4px)`, `2=small(8px)`, `3=medium(12px)`, `4=large(16px)`, `5=extraLarge(24px)`.
- **Rule**: ALWAYS use spacing tokens for gap, padding, margin.

### 6.2. Palette Access

- **Pattern**: `palette?.[color]?.main` with optional chaining.
- **Rule**: Theme is single source of truth. ALWAYS use optional chaining syntax for palette access (`palette?.primary?.main`). Ensure defaults or fallbacks only if variables miss from the internal `@thanh-libs/theme` object.
