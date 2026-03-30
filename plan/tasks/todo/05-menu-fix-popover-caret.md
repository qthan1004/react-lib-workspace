# Fix Caret Icon Direction for Popover Mode

- **Goal**: Show `▸` (right arrow) for popover sub-menu triggers instead of `▾`/`▴` (down/up arrows).
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` — Bug #10

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/menu/src/lib/components/MenuSubTrigger.tsx` |

## What to Do

Currently the `SubArrowStyled` in `MenuSubTrigger` always shows `▾` (closed) or `▴` (open), which is correct for inline mode but wrong for popover mode.

### Change

Read `resolvedMode` from `useMenuSubContext()`:

```tsx
const { isOpen, toggle, hasSelectedChild, triggerId, resolvedMode } = useMenuSubContext();
```

Update the caret rendering (line 86):

```tsx
// Before:
<SubArrowStyled aria-hidden="true">{isOpen ? '▴' : '▾'}</SubArrowStyled>

// After:
<SubArrowStyled aria-hidden="true">
  {resolvedMode === 'popover' ? '▸' : (isOpen ? '▴' : '▾')}
</SubArrowStyled>
```

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Only change the caret icon logic, nothing else
- `resolvedMode` is already available in `MenuSubContext` — just destructure it

## Dependencies

- **04-menu-implement-popover-mode** should be done first (but this ticket is still self-contained)

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Open Storybook → verify:
- Inline mode: arrows show `▾`/`▴` as before
- Popover mode: arrows show `▸`

## Done Criteria

- [ ] Popover triggers show `▸` instead of `▾`
- [ ] Inline triggers still show `▾`/`▴`
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
