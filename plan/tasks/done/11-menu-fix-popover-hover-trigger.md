# Fix Popover Hover Trigger Inconsistency

- **Goal**: Improve `@floating-ui/react` `useHover` stability by adding `safePolygon` and `delay` to prevent accidental popover closures during diagonal mouse traverses.
- **Plan Reference**: `plan/bugs/2026-03-31_menu_v0.1.md` — 4. Popover Hover Trigger Inconsistency (Minor)

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuSub.tsx` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/Menu.tsx` (If context/provider needs update) |

## What to Do

1. **Locate `useHover`**: Find the `useHover` hook invocation from `@floating-ui/react` (around line 229 in `MenuSub.tsx`).
2. **Import `safePolygon`**: Import `safePolygon` from `@floating-ui/react`.
3. **Configure `useHover` Options**: Update the hook configuration to include:
   - `handleClose: safePolygon()` (to allow diagonal mouse movement without closing the popup).
   - `delay: { open: 0, close: 150 }` (add a small close delay so it feels more responsive and forgiving).
   - Note: make sure this configuration applies cleanly based on the trigger mode (if trigger is 'click', hover might be disabled, so ensure logic accounts for that).

## Constraints

- Review `@floating-ui/react` documentation briefly if needed for `safePolygon` usage.
- The UI should feel fluid and snappy, not artificially delayed on open.

## Dependencies

- 10-menu-fix-react-state-warning (Helps keep logs clean while debugging)

## Verification

```bash
npm run test menu
# Open Storybook: "Popover Triggers & Settings".
# Verify hover is smooth and you can drag mouse diagonally from trigger to popover content without it closing.
npm run docs menu
```

## Done Criteria

- [ ] `safePolygon` is applied to the hover handler.
- [ ] Hover interactions feel stable and forgiving.
- [ ] Tests pass.
- [ ] File moved to `plan/tasks/done/`
