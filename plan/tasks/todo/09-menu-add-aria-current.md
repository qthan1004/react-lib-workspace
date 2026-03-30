# Add aria-current for Selected MenuItem

- **Goal**: Add `aria-current="page"` attribute to selected `MenuItem` for screen reader accessibility.
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` — Bug #12

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/menu/src/lib/components/MenuItem.tsx` |

## What to Do

### Issue

Per WAI-ARIA Navigation Menu pattern, the selected item should have `aria-current="page"` (for navigation menus) so screen readers can announce which item is active. Currently only visual indicators (✓ check + bold) are used.

### Fix

In `MenuItem.tsx`, add `aria-current` to the `MenuItemStyled`:

```tsx
<MenuItemStyled
  ref={ref}
  role="menuitem"
  tabIndex={-1}
  aria-disabled={disabled || undefined}
  aria-current={selected ? 'page' : undefined}  // ← ADD
  ownerDanger={danger}
  // ... rest
>
```

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- This is a 1-line addition
- Use `aria-current="page"` (standard for navigation menus)
- Only add when `selected` is true, set to `undefined` otherwise (so the attribute is removed from DOM)

## Dependencies

- None

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Open browser DevTools → inspect a selected MenuItem → verify `aria-current="page"` attribute is present.

## Done Criteria

- [ ] Selected `MenuItem` has `aria-current="page"`
- [ ] Non-selected items do NOT have `aria-current`
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
