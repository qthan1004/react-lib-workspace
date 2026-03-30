# Cleanup Helpers — Remove Unused, Extract Pure Functions

- **Goal**: Xóa `normalizeMaxHeight` và `normalizeMinWidth` không dùng; thêm 2 pure function mới `getVisibleMenuItems` và `getTextColor` để tập trung logic.
- **Plan Reference**: `plan/2026-03-30_menu_v0.1.md` — Section 3: Cleanup: Unused helpers

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/helpers/index.ts` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/hooks/useMenuKeyboard.ts` |

## What to Do

### 1. `helpers/index.ts` — Xóa 2 hàm cũ, thêm 2 hàm mới

**Xóa hoàn toàn** `normalizeMaxHeight` và `normalizeMinWidth` (toàn bộ file hiện tại chứa 2 hàm này).

**Thêm** 2 pure function sau:

```ts
const ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])';

/**
 * Returns all visible (non-collapsed) menu items within a container.
 * Filters out items inside a collapsed sub-menu ([data-collapsed="true"]).
 */
export const getVisibleMenuItems = (container: HTMLElement): HTMLElement[] => {
  const all = Array.from(
    container.querySelectorAll(ITEM_SELECTOR)
  ) as HTMLElement[];
  return all.filter(
    (el) => el.closest('[role="menu"][data-collapsed="true"]') === null
  );
};

/**
 * Resolve text color for a menu item based on danger/disabled state.
 * Falls back to palette.text.primary when neither danger nor disabled.
 */
export const getTextColor = (
  danger: boolean,
  disabled: boolean,
  palette: {
    error: { main: string };
    text: { disabled: string; primary: string };
  }
): string => {
  if (danger) return palette.error.main;
  if (disabled) return palette.text.disabled;
  return palette.text.primary;
};
```

### 2. `useMenuKeyboard.ts` — Dùng `getVisibleMenuItems` từ helpers

Thêm import ở đầu file:

```ts
import { getVisibleMenuItems } from '../helpers';
```

Xóa hằng `ITEM_SELECTOR` ở đầu `useMenuKeyboard.ts` (nay đã được define trong helpers).

Thay `getItems` callback để gọi helper thay vì inline query:

```ts
const getItems = useCallback(() => {
  if (!containerRef.current) return [];
  return getVisibleMenuItems(containerRef.current);
}, [containerRef]);
```

> **Lưu ý**: Ticket 01 đã thêm filter vào `getItems`. Ticket 03 này thực ra làm cùng việc nhưng extract ra helper. Nếu ticket 01 đã xong, hãy **thay thế** toàn bộ logic filter trong `getItems` bằng lời gọi `getVisibleMenuItems` — đừng duplicate logic.

## Constraints

- Đọc skill: `.agent/skills/strict-scope/SKILL.md`
- Chỉ sửa 2 file trong danh sách
- `getVisibleMenuItems` phải là pure function (không dùng React hooks, không có side effects)
- `getTextColor` phải là pure function
- Không sửa `styled.tsx` trong ticket này (dùng `getTextColor` trong styled là optional, chỉ thêm helper thôi)

## Dependencies

- Ticket `01-menu-fix-keyboard-nav` PHẢI hoàn thành trước (ticket 01 sửa `useMenuKeyboard.ts`)

## Verification

```bash
cd "/home/administrator/back up/Personal lib/libs/menu" && npx vitest run
```

Kiểm tra: không có import nào còn reference đến `normalizeMaxHeight` hoặc `normalizeMinWidth`:

```bash
grep -r "normalizeMaxHeight\|normalizeMinWidth" "/home/administrator/back up/Personal lib/libs/menu/src"
```

Kết quả mong đợi: **không có output** (không còn usage nào).

## Done Criteria

- [ ] `helpers/index.ts` không còn `normalizeMaxHeight` và `normalizeMinWidth`
- [ ] `helpers/index.ts` export `getVisibleMenuItems` và `getTextColor`
- [ ] `useMenuKeyboard.ts` dùng `getVisibleMenuItems` từ helpers
- [ ] `useMenuKeyboard.ts` không còn define `ITEM_SELECTOR` inline (đã moved vào helpers)
- [ ] Không có import nào trong codebase reference đến các hàm bị xóa
- [ ] Tất cả tests pass
- [ ] File moved to `plan/tasks/done/`
