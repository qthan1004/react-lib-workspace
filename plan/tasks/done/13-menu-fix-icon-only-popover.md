# Fix Icon-Only Display Mini Sidebar Popover

- **Goal**: Force `display="full"` for floating popover children so text shows up, and fix hover triggers for `display="icon"` sidebar mode.
- **Plan Reference**: `plan/bugs/2026-03-31_menu_v0.1.md` — 2. Icon-Only Display Mini Sidebar Popover (Major)

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuSubContent.tsx` |

## What to Do

1. **Identify the render bug**: When `Menu` is configured with `display="icon"`, `MenuSub` correctly renders icons on the sidebar. However, when the floating `<FloatingPortal>` popover is opened, the React Context cascades `display="icon"` downwards, so all text inside the popover is accidentally hidden (icon-only mode applied inside the popover).
2. **Override context inside Portal**: When rendering the popover content (the popup box itself inside the Portal), wrap the structural content with a nested `MenuContext.Provider` that forces `display: "full"`. Example: `<MenuContext.Provider value={{...parentContext, display: 'full'}}>`.
3. **Check trigger constraints**: Ensure hover and click events successfully open the sub-popover when hovering/clicking on the parent icon trigger in `display="icon"` mode. If there's early exit logic blocking hover/popups when display is icon, fix it.

## Constraints

- Sub-components inside the popover should now behave as full-text items (icons and text side-by-side).
- The outer sidebar triggers must still remain icon-only.
- Preserve other context values. Use existing context structure carefully.

## Dependencies

- 12-menu-fix-nested-popover (Fix nesting mechanics first so context is stable)

## Verification

```bash
npm run test menu
# Open Storybook: "Icon-Only Display"
# Verify hovering over the collapsed sidebar trigger shows a popover box that has FULL TEXT inside it.
npm run docs menu
```

## Done Criteria

- [ ] Items inside `display="icon"` popups render with full text.
- [ ] Hover works on the triggers.
- [ ] UI layouts aren't broken.
- [ ] Tests pass.
- [ ] File moved to `plan/tasks/done/`
