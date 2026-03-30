# Implement Popover Mode — Floating Sub-menus

- **Goal**: Make `<Menu mode="popover">` render sub-menus as floating popovers via FloatingPortal, with hover/click triggers working via Floating UI interactions.
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` — Bug #1, #2, #5, #9 (popover parts)

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/menu/src/lib/components/MenuSubContent.tsx` |
| MODIFY | `libs/menu/src/lib/components/MenuSubTrigger.tsx` |
| MODIFY | `libs/menu/src/lib/components/MenuSub.tsx` |
| MODIFY | `libs/menu/src/lib/styled.tsx` |

## What to Do

### 1. MenuSubContent.tsx — Render via FloatingPortal when popover

Currently `MenuSubContent` always renders `InlineSubContentStyled` regardless of mode. It must branch:

```tsx
import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react';
import { useMenuSubContext } from './MenuSub';
import { InlineSubContentStyled, PopoverSubContentStyled } from '../styled';

export const MenuSubContent = forwardRef<HTMLDivElement, MenuSubContentProps>(
  ({ children, onKeyDown, ...rest }, ref) => {
    const {
      isOpen, triggerId, resolvedMode,
      setFloating, floatingStyles, getFloatingProps, context,
      toggle,
    } = useMenuSubContext();

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft' || e.key === 'Escape') {
          e.stopPropagation();
          e.preventDefault();
          if (isOpen) {
            // Bug #11 fix: use setOpen(false) instead of toggle()
            // But since context only exposes toggle, we just call toggle
            // when isOpen is confirmed true → safe.
            toggle();
          }
        }
        onKeyDown?.(e);
      },
      [isOpen, toggle, onKeyDown]
    );

    // INLINE MODE — existing behavior
    if (resolvedMode === 'inline') {
      return (
        <InlineSubContentStyled
          ref={ref}
          role="menu"
          aria-labelledby={triggerId}
          ownerOpen={isOpen}
          data-collapsed={!isOpen}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          {children}
        </InlineSubContentStyled>
      );
    }

    // POPOVER MODE — render in FloatingPortal
    if (!isOpen) return null;

    return (
      <FloatingPortal>
        <FloatingFocusManager context={context!} modal={false}>
          <PopoverSubContentStyled
            ref={setFloating ? (node) => {
              setFloating(node);
              // also forward consumer ref
              if (typeof ref === 'function') ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            } : ref}
            role="menu"
            aria-labelledby={triggerId}
            style={floatingStyles ?? undefined}
            onKeyDown={handleKeyDown}
            {...(getFloatingProps ? getFloatingProps(rest) : rest)}
          >
            {children}
          </PopoverSubContentStyled>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);
```

### 2. MenuSubTrigger.tsx — Connect to Floating UI refs when popover

Currently the trigger only has `onClick` for inline toggle. In popover mode it must use `setReference` + `getReferenceProps`.

```tsx
const {
  isOpen, toggle, hasSelectedChild, triggerId,
  resolvedMode, setReference, getReferenceProps,
} = useMenuSubContext();
```

For the ref:
- In popover mode, merge `internalRef`, `externalRef`, AND `setReference` using `useMergeRefs`.
- In inline mode, merge `internalRef` and `externalRef` only.

```tsx
import { useMergeRefs } from '@floating-ui/react';

const mergedRef = useMergeRefs([
  internalRef,
  externalRef,
  ...(resolvedMode === 'popover' && setReference ? [setReference] : []),
]);
```

For props spreading:
- In popover mode, spread `getReferenceProps()` onto the `MenuItemStyled`:
```tsx
const floatingReferenceProps = resolvedMode === 'popover' && getReferenceProps
  ? getReferenceProps()
  : {};

<MenuItemStyled
  ref={mergedRef}
  {...floatingReferenceProps}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
  // ... other props
>
```

**Important**: `getReferenceProps` returns `onMouseEnter`, `onMouseLeave`, etc. that Floating UI needs for hover. The `onClick` handler should also be preserved for both modes.

### 3. MenuSub.tsx — Read floatingSettings from context (Bug #5)

In `MenuSubPopover`, the `useFloatingPosition` call hardcodes `placement: 'right-start'` and ignores `floatingSettings`.

Fix:
```tsx
const { floatingSettings } = useMenuContext();

const floating = useFloatingPosition({
  open: isOpen,
  onOpenChange: setOpen,
  placement: floatingSettings?.placement ?? 'right-start',
  offset: floatingSettings?.offset,
  // flip and shift are likely handled by useFloatingPosition defaults
});
```

Add `useMenuContext` import if not already present (it is imported in `MenuSub` but `MenuSubPopover` needs access too — check scope).

### 4. styled.tsx — Add PopoverSubContentStyled

Create a new styled component for popover floating content:

```tsx
import { POPOVER_MIN_WIDTH, POPOVER_Z_INDEX } from './constants';

export const PopoverSubContentStyled = styled.div(
  (): CSSObject => {
    const { palette, spacing }: ThemeSchema = useTheme();

    return {
      minWidth: POPOVER_MIN_WIDTH,
      backgroundColor: palette?.background?.paper ?? '#fff',
      borderRadius: BORDER_RADIUS,
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      border: `1px solid ${palette?.divider ?? 'rgba(0,0,0,0.12)'}`,
      padding: `${spacing?.tiny ?? '0.25rem'} 0`,
      zIndex: POPOVER_Z_INDEX,
      display: 'flex',
      flexDirection: 'column',
    };
  },
);
```

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Do NOT break inline mode — it must continue working exactly as before
- `@floating-ui/react` exports `FloatingPortal`, `FloatingFocusManager`, `useMergeRefs` — all available
- `useFloatingPosition` is from `@thanh-libs/dialog` — check its API for supported options (placement, offset)
- Use `owner` prefix for styled component boolean props
- Constants `POPOVER_MIN_WIDTH` and `POPOVER_Z_INDEX` already exist in constants

## Dependencies

- **02-menu-fix-ref-handling** should ideally be done first (since this ticket also touches `MenuSubTrigger.tsx` refs). However, the changes are compatible — this ticket can run independently if needed.

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Open Storybook → "Popover Sub-menus" story → verify:
1. Sub-menus open as floating popovers to the right
2. Hover triggers open sub-menus (if default trigger=hover)
3. Sub-menus render outside the menu DOM via FloatingPortal
4. Pressing Escape or ArrowLeft closes the sub-menu
5. Inline mode stories still work correctly

## Done Criteria

- [ ] `MenuSubContent` renders via `FloatingPortal` + `PopoverSubContentStyled` when `resolvedMode === 'popover'`
- [ ] `MenuSubTrigger` uses `setReference` + `getReferenceProps` in popover mode
- [ ] `MenuSubPopover` reads `floatingSettings` from context
- [ ] `PopoverSubContentStyled` exists in `styled.tsx`
- [ ] Inline mode is unaffected
- [ ] Build passes
- [ ] Storybook popover stories work correctly
- [ ] File moved to `plan/tasks/done/`
