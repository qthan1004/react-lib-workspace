# Fix React Render-phase State Update Error

- **Goal**: Eliminate the `Cannot update a component while rendering a different component` React warning by deferring state updates in `registerSelected()`.
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` — Bug #4

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/menu/src/lib/components/MenuSub.tsx` |

## What to Do

In `MenuSubInline.registerSelected()` (around line 94–126), `setOpen(true)` and `parentSub.registerSelected()` are called **inside** a `setSelectedCount` updater function. This triggers state updates during another state update, which React 18+ strict mode warns about.

### Changes required:

1. **Refactor `registerSelected` in `MenuSubInline`** (lines 94–126):
   - Remove the `setOpen(true)` call from inside the `setSelectedCount` updater.
   - Remove the `parentSub.registerSelected()` call from inside the `setSelectedCount` updater.
   - Instead, use `queueMicrotask` to defer both `setOpen(true)` and `parentSub.registerSelected()` calls.
   - The logic should still track the count transitions (0→1) to know when to auto-expand and bubble up.

   **Before** (simplified):
   ```tsx
   const registerSelected = useCallback(() => {
     setSelectedCount((c) => {
       const next = c + 1;
       if (next === 1 && !hasAutoExpandedRef.current) {
         setOpen(true);   // ❌ setState inside setState updater
       }
       if (next === 1 && parentSub) {
         parentUnregisterRef.current = parentSub.registerSelected(); // ❌
       }
       return next;
     });
     return () => { ... };
   }, [setOpen, parentSub]);
   ```

   **After** (approach):
   ```tsx
   const registerSelected = useCallback(() => {
     let shouldAutoExpand = false;
     let shouldBubbleUp = false;

     setSelectedCount((c) => {
       const next = c + 1;
       if (next === 1 && !hasAutoExpandedRef.current) {
         shouldAutoExpand = true;
       }
       if (next === 1 && parentSub) {
         shouldBubbleUp = true;
       }
       return next;
     });

     // Defer side effects outside the updater
     queueMicrotask(() => {
       if (shouldAutoExpand) {
         hasAutoExpandedRef.current = true;
         setOpen(true);
       }
       if (shouldBubbleUp && parentSub) {
         parentUnregisterRef.current = parentSub.registerSelected();
       }
     });

     return () => {
       setSelectedCount((c) => {
         const next = c - 1;
         if (next === 0 && parentUnregisterRef.current) {
           // This unregister also needs deferring
           queueMicrotask(() => {
             parentUnregisterRef.current?.();
             parentUnregisterRef.current = null;
           });
         }
         return next;
       });
     };
   }, [setOpen, parentSub]);
   ```

2. **Apply the same fix to `MenuSubPopover.registerSelected()`** (lines 189–215):
   - Same pattern: defer `parentSub.registerSelected()` via `queueMicrotask`.

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Do NOT change the public API or context shape
- Keep the `hasAutoExpandedRef` guard to prevent re-expansion
- Both `MenuSubInline` and `MenuSubPopover` must be fixed

## Dependencies

- None

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Open Storybook → verify the console shows NO `Cannot update a component` warnings when rendering menus with `selected` items inside `MenuSub`.

## Done Criteria

- [ ] `registerSelected` in `MenuSubInline` no longer calls `setOpen`/`registerSelected` inside `setSelectedCount` updater
- [ ] `registerSelected` in `MenuSubPopover` no longer calls `registerSelected` inside `setSelectedCount` updater
- [ ] No React warnings in console
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
