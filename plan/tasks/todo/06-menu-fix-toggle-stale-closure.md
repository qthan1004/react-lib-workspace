# Fix toggle() → setOpen(false) Stale Closure Risk

- **Goal**: Replace `toggle()` with explicit `setOpen(false)` in `MenuSubContent` escape/arrow-left handler to prevent stale closure bugs.
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` — Bug #11

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/menu/src/lib/components/MenuSubContent.tsx` |
| MODIFY | `libs/menu/src/lib/components/MenuSub.tsx` |

## What to Do

### Issue

In `MenuSubContent.tsx`, the escape/ArrowLeft handler calls `toggle()` which does `setOpen(!isOpen)`. If `isOpen` is captured in a stale closure during rapid keypresses, the toggle could **re-open** the sub-menu instead of closing it.

### Fix 1: Add `setOpen` to MenuSubContext

Currently `MenuSubContextValue` only exposes `toggle`. Add `setOpen` to the context interface so consumers can explicitly close:

In `MenuSub.tsx`:
```tsx
interface MenuSubContextValue {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;  // ← ADD
  // ... rest
}
```

Pass `setOpen` in both `MenuSubInline` and `MenuSubPopover` context values:
```tsx
const contextValue = useMemo<MenuSubContextValue>(
  () => ({
    // ... existing
    setOpen,  // ← ADD
  }),
  [/* ... existing deps, setOpen */],
);
```

### Fix 2: Use setOpen(false) in MenuSubContent

In `MenuSubContent.tsx`, change:
```tsx
// Before:
const { isOpen, triggerId, toggle } = useMenuSubContext();
// ...
if (isOpen) { toggle(); }

// After:
const { isOpen, triggerId, setOpen } = useMenuSubContext();
// ...
if (isOpen) { setOpen(false); }
```

This guarantees the sub-menu always closes, regardless of stale closure state.

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Keep `toggle` in the context — other consumers may still use it
- Add `setOpen` alongside `toggle`, don't remove `toggle`

## Dependencies

- None

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Open Storybook → open a sub-menu → rapidly press Escape multiple times → verify it always closes and never re-opens.

## Done Criteria

- [ ] `MenuSubContextValue` includes `setOpen`
- [ ] Both `MenuSubInline` and `MenuSubPopover` pass `setOpen` in context
- [ ] `MenuSubContent` uses `setOpen(false)` instead of `toggle()`
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
