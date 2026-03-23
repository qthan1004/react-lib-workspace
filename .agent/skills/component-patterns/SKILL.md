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

## Reference Libraries

When designing a new component or deciding on its API, **always research these libraries first** to inform your decisions:

| Library | What to look for |
|---------|-----------------|
| **MUI** (Material UI) | Props API, variants, sizes, accessibility patterns |
| **Ant Design** | Props API, feature set, nested/composition patterns |
| **shadcn/ui** | Compound component patterns, modern API design, simplicity |

**Process:**
1. Check how each library implements the component
2. Identify common props across all three (these are likely essential)
3. Note unique/useful props from each (consider adopting the best ones)
4. Design our API by combining the best patterns — keep it simple but powerful
5. Document the reasoning in the implementation plan

> Our lib should feel familiar to devs who've used MUI/Ant/shadcn, but remain lightweight and opinionated where it matters.

## WCAG 2.2 Accessibility Checklist

Every component MUST comply with WCAG 2.2. Apply relevant items from this checklist:

### Required for ALL components
- **SC 4.1.2 (Name, Role, Value)**: Use semantic HTML (`<button>`, `<dialog>`, etc.) — not `<div onClick>`
- **SC 2.4.7 (Focus Visible)**: `:focus-visible` style on all interactive elements
- **SC 2.4.13 (Focus Appearance)**: `outline: 2px solid transparent` alongside `box-shadow` for Windows High Contrast Mode
- **SC 4.1.2**: `forwardRef` + `displayName` on all components
- **SC 4.1.2**: Spread `...rest` to allow `aria-*` props passthrough

### Interactive components (buttons, inputs, links)
- **SC 4.1.2**: `aria-disabled` when disabled (some AT ignores `disabled` attr)
- **SC 4.1.2**: `aria-busy={true}` during loading states
- **SC 1.1.1 (Non-text Content)**: `aria-hidden="true"` on decorative icons
- **SC 1.1.1**: Icon-only buttons MUST document `aria-label` requirement in JSDoc
- **SC 4.1.3 (Status Messages)**: Loading spinners need `role="status"` + `aria-label`

### Overlay components (modal, drawer, popover, tooltip)
- **SC 2.4.3 (Focus Order)**: Focus trap inside modal/drawer when open
- **SC 4.1.2**: `role="dialog"` + `aria-modal="true"` on modal/drawer
- **SC 3.2.1 (On Focus)**: Restore focus to trigger element on close
- **SC 1.4.13 (Content on Hover)**: Tooltips must be dismissable (ESC) and hoverable
- **SC 2.1.1 (Keyboard)**: ESC key to close overlays

### Form components (inputs, selects, checkboxes)
- **SC 1.3.1 (Info and Relationships)**: Associate labels via `htmlFor`/`id` or `aria-labelledby`
- **SC 3.3.1 (Error Identification)**: `aria-invalid` + `aria-errormessage` for validation errors
- **SC 3.3.2 (Labels or Instructions)**: `aria-describedby` for helper text
- **SC 4.1.2**: `aria-required` for required fields
