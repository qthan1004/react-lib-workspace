# Cleanup Constants & Magic Numbers

- **Goal**: Tập trung tất cả magic numbers (font size, sizing, animation durations, keyboard timeout) vào `constants/index.ts`, rồi import thay cho hardcode.
- **Plan Reference**: `plan/2026-03-30_menu_v0.1.md` — Section 2: Cleanup: Constants & Magic Numbers

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/constants/index.ts` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/styled.tsx` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/hooks/useMenuKeyboard.ts` |

## What to Do

### 1. `constants/index.ts` — Thêm các hằng số mới

File hiện có 2 constants (`SUB_OPEN_DELAY`, `COLLAPSE_DURATION`). Thêm các hằng sau vào cuối file:

```ts
// Typography
/** Default menu item font size */
export const FONT_SIZE_DEFAULT = '0.875rem';    // 14px
/** Dense menu item font size */
export const FONT_SIZE_DENSE = '0.8125rem';     // 13px
/** Keyboard shortcut font size */
export const FONT_SIZE_SHORTCUT = '0.75rem';    // 12px
/** Menu label font size */
export const FONT_SIZE_LABEL = '0.75rem';       // 12px
/** Sub-menu arrow icon font size */
export const FONT_SIZE_SUB_ARROW = '0.625rem';  // 10px

// Layout
/** Icon width/height in px */
export const ICON_SIZE = 20;
/** Check indicator width in px */
export const CHECK_WIDTH = 20;
/** Menu item border radius */
export const BORDER_RADIUS = '0.375rem';
/** Default line height */
export const LINE_HEIGHT = 1.5;

// Animation
/** Background transition duration (ms) */
export const TRANSITION_BG_DURATION = 150;
/** Sub-menu content opacity transition duration (ms) */
export const OPACITY_DURATION = 200;

// Keyboard
/** Typeahead buffer reset timeout (ms) */
export const TYPEAHEAD_TIMEOUT = 500;
```

### 2. `styled.tsx` — Import constants, thay thế magic numbers

Thêm import từ constants ở đầu file (sau các import hiện có):

```ts
import {
  FONT_SIZE_DEFAULT, FONT_SIZE_DENSE, FONT_SIZE_SHORTCUT,
  FONT_SIZE_LABEL, FONT_SIZE_SUB_ARROW,
  ICON_SIZE, CHECK_WIDTH, BORDER_RADIUS, LINE_HEIGHT,
  COLLAPSE_DURATION, TRANSITION_BG_DURATION, OPACITY_DURATION,
} from '../constants';
```

Sau đó tra tìm và thay thế tất cả giá trị hardcode trong file bằng constant tương ứng. Ví dụ:
- `'0.875rem'` → `${FONT_SIZE_DEFAULT}`
- `'0.8125rem'` → `${FONT_SIZE_DENSE}`
- `'0.75rem'` → `${FONT_SIZE_SHORTCUT}` / `${FONT_SIZE_LABEL}` (tùy context)
- `'0.625rem'` → `${FONT_SIZE_SUB_ARROW}`
- `20` (icon/check dimensions) → `${ICON_SIZE}` / `${CHECK_WIDTH}px`
- `'0.375rem'` → `${BORDER_RADIUS}`
- `1.5` (line-height) → `${LINE_HEIGHT}`
- `150` (ms, bg transition) → `${TRANSITION_BG_DURATION}ms`
- `250` (ms, collapse) → `${COLLAPSE_DURATION}ms`
- `200` (ms, opacity) → `${OPACITY_DURATION}ms`

### 3. `useMenuKeyboard.ts` — Import `TYPEAHEAD_TIMEOUT`

Thêm import ở đầu file:

```ts
import { TYPEAHEAD_TIMEOUT } from '../constants';
```

Thay dòng 94 (`}, 500);`) bằng:

```ts
}, TYPEAHEAD_TIMEOUT);
```

## Constraints

- Đọc skill: `.agent/skills/strict-scope/SKILL.md`
- Chỉ sửa 3 file trong danh sách
- Không thay đổi logic hay behavior — chỉ extract magic numbers thành named constants

## Dependencies

- Ticket `01-menu-fix-keyboard-nav` PHẢI hoàn thành trước (vì ticket 01 cũng sửa `useMenuKeyboard.ts` — tránh conflict)

## Verification

```bash
cd "/home/administrator/back up/Personal lib/libs/menu" && npx vitest run
```

Và build check:

```bash
cd "/home/administrator/back up/Personal lib" && npx nx build menu
```

## Done Criteria

- [ ] `constants/index.ts` chứa đầy đủ tất cả constants mới
- [ ] `styled.tsx` không còn magic number nào tương ứng (số cứng không có ý nghĩa)
- [ ] `useMenuKeyboard.ts` dùng `TYPEAHEAD_TIMEOUT` thay vì `500`
- [ ] Tất cả tests pass
- [ ] Build thành công
- [ ] File moved to `plan/tasks/done/`
