# Fix React State Update Warning

- **Goal**: Refactor `registerSelected` calls to resolve the React warning: "Cannot update a component ('MenuSubInline') while rendering a different component ('MenuSubInline')".
- **Plan Reference**: `plan/bugs/2026-03-31_menu_v0.1.md` — 3. React State Update Warning (Technical Debt)

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuSub.tsx` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuItem.tsx` |

## What to Do

1. **Investigate the Render Cycle**: Open `MenuItem.tsx` and `MenuSub.tsx`. Look for invocations of `registerSelected`. Currently, it's highly likely that `registerSelected()` is being invoked synchronously during the render phase of the child component.
2. **Move to `useEffect`**: Refactor the child component so that `registerSelected()` is called inside a `useEffect` hook. This ensures that the parent component's state (`setHasSelectedChild`) is updated after the child component has successfully mounted/rendered, rather than during the render.
3. **Handle Cleanup**: `registerSelected()` returns an unregister function. Make sure the returned function is used as the cleanup function in the `useEffect` hook so that state is properly cleared when the child unmounts.

## Constraints

- Read skill: `.agent/skills/component-patterns/SKILL.md`
- Do not remove the `hasSelectedChild` logic; only change *when* the registration occurs.
- Ensure exhaustive dependencies in the `useEffect` array.

## Dependencies

- None

## Verification

```bash
npm run test menu
# Open Storybook. Interact with menus that have active selected children.
# Check browser console to ensure the "Cannot update a component..." warning is gone.
npm run docs menu
```

## Done Criteria

- [ ] `registerSelected` is called exclusively inside `useEffect`.
- [ ] Cleanup function is returned correctly.
- [ ] React warning no longer appears in the console.
- [ ] Tests pass.
- [ ] File moved to `plan/tasks/done/`
