# All Libs: Convert Hardcoded px/rem to pxToRem() (Parallel)

- **Goal**: Convert tất cả hardcoded px/rem values trong **menu, button, card, layout, dialog** sang `pxToRem()` — chạy song song nhiều libs cùng lúc.
- **Plan Reference**: `plan/workspace/2026-04-02_pxToRem-and-dep-audit.md` — Part 1: pxToRem Standardization

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/menu/src/**/*.{ts,tsx}` |
| MODIFY | `libs/button/src/**/*.{ts,tsx}` |
| MODIFY | `libs/card/src/**/*.{ts,tsx}` |
| MODIFY | `libs/layout/src/**/*.{ts,tsx}` |
| MODIFY | `libs/dialog/src/**/*.{ts,tsx}` |
| MODIFY | `libs/*/package.json` (thêm `@thanh-libs/utils` peerDep nếu chưa có) |

## What to Do

### 1. Đọc audit report

```bash
cat "plan/workspace/pxToRem-audit-results.md"
```

Lấy danh sách hardcoded values cho từng lib.

### 2. Convert song song — mỗi lib là 1 batch độc lập

> [!IMPORTANT]
> Các libs **KHÔNG depend vào nhau** → Worker nên xử lý song song bằng cách mở nhiều sub-agent hoặc batch edit cùng lúc.

Với **mỗi lib** (menu, button, card, layout, dialog):

#### a. Import `pxToRem`
```typescript
import { pxToRem } from '@thanh-libs/utils';
```

#### b. Convert hardcoded values
```typescript
// BEFORE
const FONT_SIZE = '0.875rem';
padding: '8px';

// AFTER
const FONT_SIZE = pxToRem(14);
padding: pxToRem(8);
```

#### c. Đảm bảo dependency
Nếu `package.json` chưa có `@thanh-libs/utils`, thêm:
```json
"peerDependencies": {
  "@thanh-libs/utils": "*"
}
```

### 3. Những lib đã dùng pxToRem (theme, typography, avatar, chip)

- **KHÔNG cần convert** — chỉ kiểm tra nếu audit report phát hiện hardcoded values còn sót
- Nếu có sót → convert luôn trong batch này

### 4. Loại trừ

- Skip `0px`, `0rem`
- Skip transition/animation durations (vd: `0.2s`, `200ms`)
- Skip giá trị trong CSS `calc()` nếu phức tạp — ghi note để review sau
- KHÔNG refactor logic hay restructure code

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Đọc skill: `.agent/skills/strict-scope/SKILL.md`
- CHỈ convert values trong audit report
- Giữ nguyên CSS property names, chỉ thay values
- Mỗi lib xử lý độc lập — không cross-reference

## Dependencies

- **01-all-pxToRem-audit** phải xong trước (cần audit report)

## Verification

```bash
# TypeScript check tất cả affected libs
for lib in menu button card layout dialog; do
  echo "=== $lib ==="
  (cd "libs/$lib" && npx tsc --noEmit)
done
```

## Done Criteria

- [ ] Tất cả hardcoded px/rem trong 5 libs đã convert sang `pxToRem()`
- [ ] `import { pxToRem }` đã thêm đúng trong mỗi file
- [ ] `package.json` của mỗi lib declare `@thanh-libs/utils` peerDep
- [ ] TypeScript build pass cho tất cả 5 libs
- [ ] File moved to `plan/tasks/done/`
