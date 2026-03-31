# Fix Nested Popover Submenu Closing Parent

- **Goal**: Implement `FloatingTree`, `FloatingNode`, and `useFloatingNodeId` to prevent nested floating submenus from incorrectly closing parent popovers.
- **Plan Reference**: `plan/bugs/2026-03-31_menu_v0.1.md` — 1. Nested Popover Submenu Not Working (Critical)

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/Menu.tsx` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuSub.tsx` |

## What to Do

1. **Understand Floating UI nesting**: The bug triggers because clicking or hovering over a child floating popover inside a parent floating popover is seen by the parent as an "outside click/hover", so the parent immediately closes.
2. **Setup root `FloatingTree`**: In the root component that initializes floating mechanics (could be `Menu.tsx` or higher up `MenuSub.tsx`), you need to wrap the floating structure in a `<FloatingTree>` if `mode` is `popover`/`floating`. Be careful not to break standard `inline` mode.
3. **Register nodes**: In `MenuSub.tsx` (the popover definition component):
   - Use `const nodeId = useFloatingNodeId()`
   - Pass `nodeId` to `useFloating(..., { nodeId })`
   - Wrap the trigger and popup elements inside `<FloatingNode id={nodeId}>`
   - Ensure you use `useFloatingParentNodeId` implicitly/explicitly via the context of `FloatingTree`.
4. **Contexts**: Read the `@floating-ui/react` docs regarding `useInteractions` and nested components if you run into context bleeding. Usually, nesting providers correctly inside the tree is enough.

## Constraints

- Ensure the design maintains structure for basic `inline` (non-floating) display mode.
- Avoid wrapping the entire application in `FloatingTree` indiscriminately, apply it logically to the parent menu component.

## Dependencies

- 11-menu-fix-popover-hover-trigger (Fix basic popover triggers first)

## Verification

```bash
npm run test menu
# Open Storybook: "10 - Right Side" (or any floating/popover submenu story).
# Click/Hover on the inner submenu. Note that parent popup stays OPEN.
npm run docs menu
```

## Done Criteria

- [ ] `FloatingTree` and `FloatingNode` implemented.
- [ ] Submenus open properly inside parent popovers.
- [ ] Parent popovers DO NOT close when interacting with children.
- [ ] Tests pass.
- [ ] File moved to `plan/tasks/done/`
