# Fix Focus Outline on Menu Container

- **Goal**: Remove the default browser outline on the `<Menu>` container when it receives focus, while preserving accessibility (individual MenuItems already have `&:focus-visible` ring).
- **Plan Reference**: `plan/menu/2026-04-01_enhance_v0.2.md` — Section ②

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/styled.tsx` |

## What to Do

In `styled.tsx`, add `&:focus { outline: 'none' }` to `MenuContainerStyled` (around line 24-34).

**Current code** (line 24-34):
```typescript
return {
  display: 'flex',
  flexDirection: 'column',
  // ...
};
```

**After:**
```typescript
return {
  display: 'flex',
  flexDirection: 'column',
  '&:focus': {
    outline: 'none',
  },
  // ... rest unchanged
};
```

**Why this is safe:**
- Container has `role="menu"` + `tabIndex={0}` → screen reader still announces it
- `useMenuKeyboard`'s `handleFocusIn` immediately delegates focus to the first child item
- Child items already have their own `&:focus-visible` ring (`styled.tsx` line 90-93)
- No visual focus ring is needed on the container itself

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Only touch `MenuContainerStyled` — do NOT modify MenuItem focus styles
- Do NOT add `outline: none` globally — only on the container's `&:focus`

## Dependencies

- None

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

## Done Criteria

- [ ] `MenuContainerStyled` has `&:focus { outline: 'none' }` rule
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
