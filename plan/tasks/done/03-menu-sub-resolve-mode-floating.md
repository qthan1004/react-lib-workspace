# MenuSub — resolve mode/trigger + floating state cho popover

- **Goal**: Mở rộng `MenuSub` để resolve `mode` (từ prop hoặc context, con > cha) và `trigger`, expose floating state qua context khi `mode='popover'`.
- **Plan Reference**: `plan/2026-03-30_menu_sub-flying_v0.1.md` — Sections 3 (MenuSub), 6

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuSub.tsx` |

## What to Do

### 1. Resolve mode + trigger

Đọc `mode` và `trigger` từ `MenuContext` (parent) và so sánh với prop:

```ts
const { mode: parentMode, trigger: parentTrigger } = useMenuContext();
const resolvedMode: MenuSubMode = mode ?? parentMode; // prop > context > 'inline'
const resolvedTrigger: MenuSubTriggerType = trigger ?? parentTrigger; // prop > context > 'hover'
```

### 2. Mở rộng MenuSubContext

Thêm fields vào `MenuSubContextValue`:

```ts
interface MenuSubContextValue {
  // ... existing fields (isOpen, toggle, hasSelectedChild, registerSelected, triggerId) ...
  resolvedMode: MenuSubMode;
  resolvedTrigger: MenuSubTriggerType;
  // Popover-only fields (null khi inline):
  setReference: ((node: HTMLElement | null) => void) | null;
  setFloating: ((node: HTMLElement | null) => void) | null;
  floatingStyles: React.CSSProperties | null;
  context: FloatingContext | null;  // floating-ui context
  getReferenceProps: ((props?: Record<string, unknown>) => Record<string, unknown>) | null;
  getFloatingProps: ((props?: Record<string, unknown>) => Record<string, unknown>) | null;
}
```

### 3. Conditional floating logic

Khi `resolvedMode === 'popover'`:
- Import và gọi `useFloatingPosition` từ `@thanh-libs/dialog`
- Import `useHover`, `useClick`, `useDismiss`, `useRole`, `useInteractions`, `safePolygon` từ `@floating-ui/react`
- Setup hover vs click dựa trên `resolvedTrigger`:
  - `'hover'`: dùng `useHover` với `delay: { open: SUB_OPEN_DELAY, close: SUB_CLOSE_DELAY }` + `handleClose: safePolygon()`
  - `'click'`: dùng `useClick`
- `useDismiss` cho cả 2 trigger modes
- `useRole(context, { role: 'menu' })`
- Open/close state controlled bởi floating-ui `onOpenChange`

Khi `resolvedMode === 'inline'`:
- **Giữ nguyên behavior hiện tại** — toggle, registerSelected, auto-expand
- Set popover-only fields = `null`

**Lưu ý quan trọng:**
- `useFloatingPosition` và interaction hooks PHẢI được gọi unconditionally (React hooks rules). Dùng `enabled` option hoặc ignore kết quả khi inline mode.
- Hoặc: tách thành 2 internal sub-components (`MenuSubInline` + `MenuSubPopover`) rồi branch ở `MenuSub`. Approach này sạch hơn vì không vi phạm rules of hooks.

**Recommended approach — tách thành 2:**

```tsx
export const MenuSub = ({ mode, trigger, ...props }: MenuSubProps) => {
  const { mode: parentMode, trigger: parentTrigger } = useMenuContext();
  const resolvedMode = mode ?? parentMode;
  const resolvedTrigger = trigger ?? parentTrigger;
  
  if (resolvedMode === 'popover') {
    return <MenuSubPopover resolvedTrigger={resolvedTrigger} {...props} />;
  }
  return <MenuSubInline {...props} />;
};
```

`MenuSubInline` = code hiện tại của MenuSub (rename).
`MenuSubPopover` = version mới dùng floating-ui hooks.

Cả hai share cùng `MenuSubContext` interface nhưng `MenuSubPopover` populate floating fields còn `MenuSubInline` set chúng = `null`.

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- KHÔNG vi phạm React rules of hooks — hooks PHẢI gọi unconditionally
- Giữ nguyên behavior inline mode — existing tests PHẢI pass
- Constants `SUB_OPEN_DELAY`, `SUB_CLOSE_DELAY` import từ `../constants`

## Dependencies

- `01-menu-deps-types-constants` — cần types + constants + `@floating-ui/react` dep
- `02-menu-context-mode-display` — cần `useMenuContext()` trả về `mode`, `trigger`

## Verification

```bash
cd "/home/administrator/back up/Personal lib/libs/menu" && npx tsc --noEmit
cd "/home/administrator/back up/Personal lib/libs/menu" && npx vitest run
```

## Done Criteria

- [ ] `MenuSub` resolve `mode` theo priority: prop > context > 'inline'
- [ ] `MenuSub` resolve `trigger` theo priority: prop > context > 'hover'
- [ ] `MenuSubContext` expose `resolvedMode`, `resolvedTrigger`, và floating fields
- [ ] Popover mode: floating state setup đúng với hover/click trigger
- [ ] Inline mode: behavior giữ nguyên 100%, floating fields = null
- [ ] Existing tests pass
- [ ] File moved to `plan/tasks/done/`
