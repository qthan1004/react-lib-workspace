# Child Hover Differentiation (CSS-only)

- **Goal**: Make child items (inside `InlineSubContentStyled`) have a distinct, lighter hover style compared to parent/top-level items. Uses CSS nesting — zero JS change to MenuItem.
- **Plan Reference**: `plan/menu/2026-04-01_enhance_v0.2.md` — Section ③A

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/styled.tsx` |

## What to Do

### `styled.tsx` — Add child hover override in `InlineSubContentStyled`

The `InlineSubContentStyled` component (line 233-245) currently only handles collapse/expand animation. Add CSS nesting to override the hover style of child `[role="menuitem"]` elements.

**Current `InlineSubContentStyled`** has props: `ownerOpen`.

**Step 1: Add `ownerColorScheme` prop** to `InlineSubContentStyledProps`:
```typescript
interface InlineSubContentStyledProps {
  ownerOpen: boolean;
  ownerColorScheme?: MenuColorScheme;
}
```

**Step 2: Add child hover CSS** inside the return object, after `paddingLeft`:
```typescript
// Child items get a lighter, more subtle hover
'& > [role="menuitem"]': {
  '&:hover': {
    backgroundColor: ownerColorScheme?.childHoverBg ?? 'rgba(25,118,210,0.06)',
    ...(ownerColorScheme?.childHoverColor && { color: ownerColorScheme.childHoverColor }),
  },
},
```

The key insight: This CSS nesting naturally overrides the MenuItem's own `&:hover` because the parent selector `InlineSubContentStyled > [role="menuitem"]:hover` has higher specificity than `MenuItemStyled:hover`.

**Step 3: Update `MenuSubContentInline.tsx`** to pass `ownerColorScheme`:

File: `d:/workspace/react-lib-workspace/libs/menu/src/lib/components/MenuSubContentInline.tsx`

Import and use `useMenuContext`:
```typescript
import { useMenuContext } from '../hooks/useMenuContext';

// Inside component:
const { colorScheme } = useMenuContext();

// Pass to styled:
<InlineSubContentStyled
  ...existing props...
  ownerColorScheme={colorScheme}
>
```

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Use CSS nesting approach (Option A from plan) — do NOT add props to MenuItem
- Default child hover bg: `rgba(25,118,210,0.06)` (lighter than parent hover)
- Only direct children (`& >`) to avoid affecting deeply nested SubContent items
- Do NOT change parent item hover behavior

## Dependencies

- **02-menu-extend-colorscheme-props** must be done first (adds `childHoverBg`, `childHoverColor` to `MenuColorScheme`)

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

## Done Criteria

- [ ] `InlineSubContentStyled` has `ownerColorScheme` prop
- [ ] Child items inside SubContent have distinct, lighter hover style via CSS nesting
- [ ] `MenuSubContentInline.tsx` passes `colorScheme` to styled component
- [ ] Parent item hover unchanged
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
