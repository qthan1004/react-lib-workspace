# Fix getVisibleMenuItems for Popover Portal Items

- **Goal**: Make keyboard navigation work correctly when sub-menus render in FloatingPortal (outside the root container DOM).
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` — Bug #8

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/menu/src/lib/helpers/index.ts` |
| MODIFY | `libs/menu/src/lib/hooks/useMenuKeyboard.ts` |

## What to Do

### Issue

`getVisibleMenuItems` queries `container.querySelectorAll(ITEM_SELECTOR)` which only finds items **inside** the menu container DOM. In popover mode, `MenuSubContent` renders inside `FloatingPortal` which is **outside** the container — so those items are invisible to keyboard navigation.

### Fix approach: Scope keyboard navigation per menu level

The root `useMenuKeyboard` should only navigate items at the **root level** (not inside open popover sub-menus). Each popover sub-menu should handle its own keyboard navigation independently.

### Option A (Recommended — minimal change):

1. **`helpers/index.ts`**: Update `getVisibleMenuItems` to also exclude items inside popover portals. Since popover items are already outside the container, they're naturally excluded. The only fix needed is for items inside **collapsed inline** sub-menus (which is already handled by `data-collapsed`).

   Actually, `getVisibleMenuItems` **already works correctly** for the root level — popover items are in a portal outside the container, so `querySelectorAll` won't find them. The issue is that popover content has **no keyboard handler of its own** for ArrowUp/ArrowDown.

2. **`MenuSubContent.tsx`** (already modified in ticket 04): When rendering in popover mode, the `FloatingFocusManager` from `@floating-ui/react` handles focus trapping. Add `ArrowUp`/`ArrowDown` keyboard handling inside the popover content's `onKeyDown`:

   In `MenuSubContent.tsx`'s popover branch, add navigation within the popover's own items:
   ```tsx
   const handlePopoverKeyDown = useCallback(
     (e: React.KeyboardEvent<HTMLDivElement>) => {
       const container = e.currentTarget;
       const items = Array.from(
         container.querySelectorAll(ITEM_SELECTOR)
       ) as HTMLElement[];

       if (items.length === 0) return;
       const currentIndex = items.indexOf(document.activeElement as HTMLElement);

       switch (e.key) {
         case 'ArrowDown':
           e.preventDefault();
           e.stopPropagation();
           items[(currentIndex + 1) % items.length]?.focus();
           break;
         case 'ArrowUp':
           e.preventDefault();
           e.stopPropagation();
           items[(currentIndex - 1 + items.length) % items.length]?.focus();
           break;
         case 'ArrowLeft':
         case 'Escape':
           e.stopPropagation();
           e.preventDefault();
           setOpen(false);
           break;
       }
       onKeyDown?.(e);
     },
     [setOpen, onKeyDown]
   );
   ```

3. **`helpers/index.ts`**: Export the `ITEM_SELECTOR` constant so it can be reused in `MenuSubContent`:
   ```tsx
   export const ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])';
   ```

4. **`useMenuKeyboard.ts`**: No changes needed if popover items are naturally excluded (they're in portals). But optionally, add `e.stopPropagation()` awareness so root keyboard handler doesn't interfere with popover keyboard events.

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Popover keyboard navigation must be self-contained
- Root keyboard navigation must not interfere with popover items
- Inline mode must continue working as-is

## Dependencies

- **04-menu-implement-popover-mode** MUST be done first (popover rendering must exist)
- **06-menu-fix-toggle-stale-closure** should be done first (`setOpen(false)` must be available in context)

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Open Storybook → "Popover Sub-menus" story:
1. Hover to open a popover sub-menu
2. ArrowDown/ArrowUp navigates within the popover
3. ArrowLeft/Escape closes the popover and returns focus to trigger
4. Root menu ArrowDown/ArrowUp still works for root-level items

## Done Criteria

- [ ] Popover sub-menu content has its own ArrowUp/ArrowDown keyboard navigation
- [ ] `ITEM_SELECTOR` is exported from helpers
- [ ] Root keyboard navigation unaffected
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
