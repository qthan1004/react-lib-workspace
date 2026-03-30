# Fix Ref Handling — Use useMergeRefs

- **Goal**: Replace broken ref casting pattern with proper `useMergeRefs` from `@floating-ui/react` in `Menu.tsx` and `MenuSubTrigger.tsx`.
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` — Bug #6

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/menu/src/lib/components/Menu.tsx` |
| MODIFY | `libs/menu/src/lib/components/MenuSubTrigger.tsx` |

## What to Do

### Issue

Both `Menu.tsx` and `MenuSubTrigger.tsx` use this broken pattern:
```tsx
const containerRef = (externalRef as React.RefObject<HTMLDivElement>) || internalRef;
```

This **silently breaks** callback refs (functions), and when `externalRef` is provided, the internal ref is never synced.

### Fix: Menu.tsx (line 32)

1. Import `useMergeRefs` from `@floating-ui/react`:
   ```tsx
   import { useMergeRefs } from '@floating-ui/react';
   ```

2. Replace the ref pattern:
   ```tsx
   // Before:
   const containerRef = (externalRef as React.RefObject<HTMLDivElement>) || internalRef;

   // After:
   const mergedRef = useMergeRefs([internalRef, externalRef]);
   ```

3. Use `internalRef` for logic that reads from the ref (e.g., `useMenuKeyboard(internalRef)`).
4. Use `mergedRef` as the ref passed to the DOM element (`<MenuContainerStyled ref={mergedRef}>`).

### Fix: MenuSubTrigger.tsx (line 20)

1. Import `useMergeRefs` from `@floating-ui/react`:
   ```tsx
   import { useMergeRefs } from '@floating-ui/react';
   ```

2. Replace the ref pattern:
   ```tsx
   // Before:
   const triggerRef = (externalRef as React.RefObject<HTMLDivElement>) || internalRef;

   // After:
   const mergedRef = useMergeRefs([internalRef, externalRef]);
   ```

3. Use `internalRef` for internal logic (like `triggerRef.current?.focus()` in the useEffect — change to `internalRef.current?.focus()`).
4. Use `mergedRef` as the ref passed to the DOM element.

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- `@floating-ui/react` is already a dependency — `useMergeRefs` is available
- Do NOT change the public component API
- Internal logic (like focus management) should use `internalRef` to guarantee access to the DOM node

## Dependencies

- None

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

## Done Criteria

- [ ] `Menu.tsx` uses `useMergeRefs` instead of ref casting
- [ ] `MenuSubTrigger.tsx` uses `useMergeRefs` instead of ref casting
- [ ] Both consumer refs (callback and object) work correctly
- [ ] Internal focus logic still works via `internalRef`
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
