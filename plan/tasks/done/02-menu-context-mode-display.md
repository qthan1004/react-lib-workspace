# Add mode/display/trigger to Menu Context

- **Goal**: Mở rộng `MenuContext` để truyền `mode`, `display`, `trigger` xuống children. Cập nhật `Menu` root component nhận và pass props mới.
- **Plan Reference**: `plan/2026-03-30_menu_sub-flying_v0.1.md` — Section 3

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/hooks/useMenuContext.ts` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/Menu.tsx` |

## What to Do

### 1. useMenuContext.ts — mở rộng MenuContextValue

```ts
import type { MenuSubMode, MenuDisplay, MenuSubTriggerType } from '../models';

export interface MenuContextValue {
  dense: boolean;
  mode: MenuSubMode;             // default sub-menu mode
  display: MenuDisplay;          // icon-only mode
  trigger: MenuSubTriggerType;   // default popover trigger type
}
```

### 2. Menu.tsx — nhận và pass props mới

Thêm vào props destructuring:
```ts
({ children, dense = false, mode = 'inline', display = 'default', trigger = 'hover', maxHeight, ... })
```

Cập nhật context value:
```ts
const contextValue = useMemo<MenuContextValue>(
  () => ({ dense, mode, display, trigger }),
  [dense, mode, display, trigger],
);
```

**Quan trọng:** Giữ nguyên tất cả behavior hiện tại — chỉ thêm fields mới vào context. Existing tests PHẢI pass không thay đổi.

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Backward compatible — `mode` default 'inline', `display` default 'default', `trigger` default 'hover'
- KHÔNG thay đổi render logic hay styled components

## Dependencies

- `01-menu-deps-types-constants` — cần types `MenuSubMode`, `MenuDisplay`, `MenuSubTriggerType`

## Verification

```bash
cd "/home/administrator/back up/Personal lib/libs/menu" && npx tsc --noEmit
cd "/home/administrator/back up/Personal lib/libs/menu" && npx vitest run
```

## Done Criteria

- [ ] `MenuContextValue` có 4 fields: `dense`, `mode`, `display`, `trigger`
- [ ] `Menu` component nhận `mode`, `display`, `trigger` props với default values
- [ ] Context value truyền đầy đủ 4 fields
- [ ] Tất cả existing tests pass (backward compatible)
- [ ] TypeScript compiles without errors
- [ ] File moved to `plan/tasks/done/`
