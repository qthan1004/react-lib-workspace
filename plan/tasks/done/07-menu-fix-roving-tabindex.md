# Fix tabIndex — Implement Roving Tabindex

- **Goal**: Default all non-disabled menu items to `tabIndex={-1}` and let `useMenuKeyboard` manage `tabIndex={0}` for correct roving tabindex pattern.
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` — Bug #7

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/menu/src/lib/components/MenuItem.tsx` |
| MODIFY | `libs/menu/src/lib/components/MenuSubTrigger.tsx` |

## What to Do

### Issue

Both `MenuItem.tsx` (line 65) and `MenuSubTrigger.tsx` (line 71) use:
```tsx
tabIndex={disabled ? -1 : undefined}
```

When `disabled` is false, `tabIndex` is `undefined` → browser default tab order → user can Tab through **every item**. Correct behavior is: all items `tabIndex={-1}`, only the focused item gets `tabIndex={0}` (managed by `useMenuKeyboard`).

### Fix

In both `MenuItem.tsx` and `MenuSubTrigger.tsx`, change:
```tsx
// Before:
tabIndex={disabled ? -1 : undefined}

// After:
tabIndex={-1}
```

This works because:
- `useMenuKeyboard` already handles setting `tabIndex={0}` on the focused item and `-1` on all others
- Disabled items with `tabIndex={-1}` are already correct
- Non-disabled items need `tabIndex={-1}` by default so they're not in the tab order

Note: `useMenuKeyboard` already initializes the first item with `tabIndex={0}` in its `useEffect` (line 23-29 of `useMenuKeyboard.ts`), so the first item will still be tabbable.

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- This is a simple 1-line change in 2 files
- Do NOT modify `useMenuKeyboard` — it already handles roving correctly

## Dependencies

- None

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Open Storybook → Tab into menu → verify:
- Only one item has focus ring at a time
- Tab moves OUT of the menu (not to next item)
- Arrow keys navigate between items

## Done Criteria

- [ ] `MenuItem.tsx` uses `tabIndex={-1}` unconditionally
- [ ] `MenuSubTrigger.tsx` uses `tabIndex={-1}` unconditionally
- [ ] Roving tabindex works (Tab enters menu, ArrowDown/Up navigates, Tab leaves menu)
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
