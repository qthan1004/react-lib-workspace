---
description: Component file structure, styled patterns, and naming conventions for React library components
---

# Component Patterns

Standard structure for React components in `@thanh-libs/*` libraries.

## File Structure

```
src/lib/
├── ComponentName.tsx        # Main component (PascalCase)
├── styled.tsx               # Styled components (1 file, or styled/ folder if many)
├── models/
│   └── index.ts             # Props types + related interfaces
├── constants/
│   └── index.ts             # Maps, defaults, magic numbers
├── helpers/
│   └── index.ts             # Pure utility functions
└── stories/
    └── ComponentName.stories.tsx
```

> If the lib has **multiple root components** (e.g. Modal + Popover), each gets its own subfolder under `src/lib/`.

## Component File (`ComponentName.tsx`)

```tsx
import { forwardRef } from 'react';
import type { ComponentProps } from './models';
import { ComponentStyled } from './styled';

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ComponentStyled ref={ref} {...rest}>
        {children}
      </ComponentStyled>
    );
  },
);

Component.displayName = 'Component';
```

**Rules:**
- Always use `forwardRef` for DOM-wrapping components
- Always set `displayName`
- Spread remaining props via `...rest`
- Import styled from `./styled`, types from `./models`

## Code Style

### Arrow Functions First

**Always use arrow functions** (`const fn = () => {}`) instead of `function` declarations.

```tsx
// ✅ Arrow function
export const resolveSpacing = (value: number): string => `${value * 8}px`;

// ✅ Arrow component
export const Layout = forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, ...rest }, ref) => { ... },
);

// ❌ Never use function declarations
export function resolveSpacing(value: number): string { ... }
function Layout() { ... }
```

**Exceptions** (only when arrow functions are not possible):
- Generator functions (`function*`)
- Functions requiring `this` binding

## Styled File (`styled.tsx`)

```tsx
import { CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeSchema } from '@thanh-libs/theme';

interface ComponentStyledProps {
  ownerVariant: string;
}

export const ComponentStyled = styled.div<ComponentStyledProps>(
  ({ ownerVariant }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();

    return {
      color: palette?.text?.primary ?? '#333',
    };
  },
);
```

**Rules:**
- **Object style only** — `({ prop }): CSSObject => ({ ... })`, never template literals
- **`owner*` prefix** for internal styled props to avoid DOM leakage
- **`Styled` suffix** on all styled component names
- **`useTheme()`** inside callback, never from styled args
- See `styled-theme-convention` skill for full details

## Models File (`models/index.ts`)

```tsx
import type { HTMLAttributes, ReactNode } from 'react';

export interface ComponentProps extends HTMLAttributes<HTMLDivElement> {
  /** Brief JSDoc description */
  variant?: 'default' | 'outlined';
  children?: ReactNode;
}
```

**Rules:**
- Extend the correct `HTMLAttributes<HTMLElement>` type
- JSDoc comments on every public prop
- Export types from `src/index.ts`

## Index File (`src/index.ts`)

```tsx
export { Component } from './lib/Component';
export type { ComponentProps } from './lib/models';
```

**Rules:**
- Named exports only (no default exports from index)
- Export component + public types

## Theme-First Design

All `@thanh-libs/*` libraries **MUST** read values from `@thanh-libs/theme` via `useTheme()` instead of hardcoding. The theme is the **single source of truth** for visual tokens.

### What to read from theme

| Need | Theme path | Fallback |
|------|-----------|----------|
| Colors | `palette?.primary?.main` | CSS color string |
| Spacing | `spacing?.small`, `spacing?.medium` | `'0.5rem'` |
| Z-index | `zIndex?.modal`, `zIndex?.popover` | Numeric constant |
| Border radius | `shape?.borderRadius` | `'0.375rem'` |
| Font | `font?.fontFamily`, `typography?.h1` | CSS font string |
| Shadows | `shadows?.[1]` | CSS shadow string |

### Pattern

```tsx
import { CSSObject, useTheme } from '@emotion/react';
import type { ThemeSchema } from '@thanh-libs/theme';

export const ComponentStyled = styled.div(
  (): CSSObject => {
    const { spacing, palette }: ThemeSchema = useTheme();

    return {
      // ✅ Theme values with sensible fallbacks
      padding: spacing?.medium ?? '0.75rem',
      color: palette?.primary?.main ?? '#1976d2',
    };
  },
);
```

### Anti-pattern

```tsx
// ❌ Hardcoded values — ignores user's theme
return {
  padding: 16,           // Should use spacing?.large
  color: '#1976d2',      // Should use palette?.primary?.main
  zIndex: 1300,          // Should use zIndex?.modal
};
```

### Spacing scale (numbers → theme keys)

When a component accepts numeric `spacing` props, map to theme scale:

| Number | Theme key | Default px |
|--------|-----------|-----------|
| 1 | `spacing.tiny` | 4px |
| 2 | `spacing.small` | 8px |
| 3 | `spacing.medium` | 12px |
| 4 | `spacing.large` | 16px |
| 5 | `spacing.extraLarge` | 24px |
