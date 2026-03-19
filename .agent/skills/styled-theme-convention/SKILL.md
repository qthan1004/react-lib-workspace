---
description: Convention for accessing theme inside @emotion/styled components using useTheme()
---

# Styled Component Theme Access Convention

## Rule 1 — Theme Access

When accessing the theme inside `@emotion/styled` components, **DO NOT** destructure `theme` from the styled callback arguments. Instead, call `useTheme()` from `@emotion/react` directly inside the callback and type-cast it as `ThemeSchema`.

## Rule 2 — Naming Convention

All styled component definitions **MUST** end with the `Styled` suffix to distinguish them from regular React components.

| ❌ Bad | ✅ Good |
|--------|---------|
| `ModalBackdrop` | `ModalBackdropStyled` |
| `ModalContent` | `ModalContentStyled` |
| `StoryCard` | `StoryCardStyled` |

## Rule 3 — CSSObject Return Type

The styled callback function **MUST** always declare `: CSSObject` as the return type (imported from `@emotion/react`). This prevents build errors from ambiguous return types.

```tsx
// ✅ Always annotate return type
({ ownerOpen }): CSSObject => { ... }

// ❌ Missing return type — can cause build errors
({ ownerOpen }) => { ... }
```

## Pattern

```tsx
import styled from '@emotion/styled';
import { CSSObject, useTheme } from '@emotion/react';
import { ThemeSchema } from '@thanhdq/theme';

interface MyComponentProps {
  ownerOpen: boolean;
}

// ✅ Name ends with "Styled"
export const MyComponentStyled = styled.div<MyComponentProps>(
  ({ ownerOpen }): CSSObject => {
    // ✅ Call useTheme() directly, destructure only what you need
    const { palette, spacing }: ThemeSchema = useTheme();

    return {
      color: palette?.primary?.main ?? '#1976d2',
      padding: spacing?.medium ?? '0.75rem',
      opacity: ownerOpen ? 1 : 0,
    };
  },
);
```

## Anti-pattern (DO NOT do this)

```tsx
// ❌ No "Styled" suffix + destructuring theme from args
export const MyComponent = styled.div<MyComponentProps>(
  ({ ownerOpen, theme }) => ({
    color: theme.palette?.primary?.main ?? '#1976d2',
  }),
);
```

## Benefits

1. **Clear distinction** — `Styled` suffix makes it obvious which are styled definitions vs React components
2. **Explicit typing** — `ThemeSchema` gives full autocomplete for theme properties
3. **Selective destructuring** — only import the theme slices you need (e.g. `palette`, `zIndex`)
4. **Consistent pattern** — same `useTheme()` usage as in regular React components
5. **Return type safety** — `CSSObject` return type ensures valid CSS properties

