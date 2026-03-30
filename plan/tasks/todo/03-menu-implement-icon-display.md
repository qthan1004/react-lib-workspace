# Implement display="icon" Mode (Mini Sidebar)

- **Goal**: Make `<Menu display="icon">` actually hide text labels, shortcuts, sub-arrows, and check indicators — showing only icons in a narrow sidebar.
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` — Bug #3, #9 (icon-mode parts)

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/menu/src/lib/components/MenuItem.tsx` |
| MODIFY | `libs/menu/src/lib/components/MenuSubTrigger.tsx` |
| MODIFY | `libs/menu/src/lib/styled.tsx` |

## What to Do

### 1. MenuItem.tsx

1. Read `display` from `useMenuContext()`:
   ```tsx
   const { dense, display } = useMenuContext();
   const isIconOnly = display === 'icon';
   ```

2. Pass `ownerIconOnly={isIconOnly}` to `MenuItemStyled`.

3. Conditionally render children based on `isIconOnly`:
   - Always render `icon` (the purpose of icon-only mode)
   - Wrap `MenuItemLabelStyled` in a condition or pass `ownerIconOnly` to it
   - Hide `MenuItemShortcutStyled` when `isIconOnly`
   - Hide `MenuItemCheckStyled` when `isIconOnly`

### 2. MenuSubTrigger.tsx

1. Read `display` from `useMenuContext()`:
   ```tsx
   const { dense, display } = useMenuContext();
   const isIconOnly = display === 'icon';
   ```

2. Pass `ownerIconOnly={isIconOnly}` to `MenuItemStyled`.

3. Conditionally render:
   - Always render `icon`
   - Hide `MenuItemLabelStyled` when `isIconOnly`
   - Hide `SubArrowStyled` when `isIconOnly`

### 3. styled.tsx

1. **Add `ownerIconOnly` prop to `MenuItemStyled`**:
   ```tsx
   interface MenuItemStyledProps {
     ownerDanger: boolean;
     ownerDisabled: boolean;
     ownerSelected: boolean;
     ownerSoftSelected: boolean;
     ownerDense: boolean;
     ownerIconOnly: boolean;  // ← ADD
   }
   ```

   When `ownerIconOnly` is true:
   - Set `justifyContent: 'center'`
   - Set `padding` to equal on all sides (square-ish)
   - Remove gap or make it 0

2. **Add `ownerIconOnly` prop to `MenuItemLabelStyled`**:
   ```tsx
   interface MenuItemLabelStyledProps {
     ownerIconOnly?: boolean;
   }

   export const MenuItemLabelStyled = styled.span<MenuItemLabelStyledProps>(
     ({ ownerIconOnly }): CSSObject => ({
       flex: 1,
       overflow: 'hidden',
       textOverflow: 'ellipsis',
       whiteSpace: 'nowrap',
       ...(ownerIconOnly && {
         display: 'none',
       }),
     }),
   );
   ```

3. **Add `ownerIconOnly` prop to `MenuItemShortcutStyled`** (or just use conditional rendering — either approach is fine).

4. **Add `ownerIconOnly` prop to `SubArrowStyled`** (or just use conditional rendering).

5. **Optionally narrow `MenuContainerStyled`** when icon-only: Add `ownerIconOnly` prop → set `width: 'auto'` or a narrow fixed width like `56px`.

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Use `owner` prefix for all styled-component boolean props (established pattern)
- Do NOT change the public API
- The `display` value is already in context (`MenuContextValue.display`), just needs to be consumed

## Dependencies

- None (independent of ref fix and state fix)

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Open Storybook → "Icon-Only Display (Mini Sidebar)" story → verify:
- Only icons are visible
- Text labels are hidden
- Shortcuts are hidden
- Sub-menu arrows are hidden
- Menu has a narrow width

## Done Criteria

- [ ] `MenuItem` reads `display` from context and passes `ownerIconOnly` to styled components
- [ ] `MenuSubTrigger` reads `display` from context and hides label/arrow in icon mode
- [ ] `MenuItemLabelStyled` hides text when `ownerIconOnly=true`
- [ ] `MenuItemStyled` centers content when `ownerIconOnly=true`
- [ ] Build passes
- [ ] Storybook icon-only story shows correct behavior
- [ ] File moved to `plan/tasks/done/`
