# All Libs: Integrate check-deps Into Build Pipeline

- **Goal**: Đảm bảo `check-deps.mjs` có mặt trong **tất cả** libs và được hook vào `prerelease` script để tự động gate trước release.
- **Plan Reference**: `plan/workspace/2026-04-02_pxToRem-and-dep-audit.md` — Part 3: Integrate check-deps vào Build Pipeline

## Files

| Action | Path |
|--------|------|
| NEW | `libs/button/check-deps.mjs` (copy từ menu) |
| NEW | `libs/layout/check-deps.mjs` (copy từ menu) |
| NEW | `libs/theme/check-deps.mjs` (copy từ menu) |
| NEW | `libs/typography/check-deps.mjs` (copy từ menu) |
| NEW | `libs/utils/check-deps.mjs` (copy từ menu) |
| MODIFY | `libs/avatar/package.json` |
| MODIFY | `libs/chip/package.json` |
| MODIFY | `libs/dialog/package.json` |
| MODIFY | `libs/button/package.json` |
| MODIFY | `libs/layout/package.json` |
| MODIFY | `libs/theme/package.json` |
| MODIFY | `libs/typography/package.json` |
| MODIFY | `libs/utils/package.json` |

## What to Do

### 1. Copy `check-deps.mjs`

Copy file từ `libs/menu/check-deps.mjs` sang 5 libs chưa có:
- `libs/button/check-deps.mjs`
- `libs/layout/check-deps.mjs`
- `libs/theme/check-deps.mjs`
- `libs/typography/check-deps.mjs`
- `libs/utils/check-deps.mjs`

Script là generic — cùng nội dung, không cần chỉnh sửa.

### 2. Hook vào prerelease

Thêm/sửa `standard-version.scripts.prerelease` trong `package.json` cho tất cả libs cần update:

**Pattern thống nhất:**
```json
"standard-version": {
  "scripts": {
    "prerelease": "node check-deps.mjs && npx vitest run --passWithNoTests"
  }
}
```

**Libs cần update:**

| Library | Current `prerelease` | Action |
|---------|---------------------|--------|
| menu | `node check-deps.mjs && yarn vitest run` | ✅ Đã ok (chuẩn hóa vitest command nếu muốn) |
| card | `node check-deps.mjs && yarn vitest run` | ✅ Đã ok |
| avatar | `node ../../node_modules/vitest/vitest.mjs run` | Thêm `node check-deps.mjs &&` prefix |
| chip | `node ../../node_modules/vitest/vitest.mjs run` | Thêm `node check-deps.mjs &&` prefix |
| dialog | `npx vitest run` | Thêm `node check-deps.mjs &&` prefix |
| button | `npx vitest run` | Thêm `node check-deps.mjs &&` prefix |
| layout | `npx vitest run` | Thêm `node check-deps.mjs &&` prefix |
| theme | `npx vitest run` | Thêm `node check-deps.mjs &&` prefix |
| typography | `npx vitest run` | Thêm `node check-deps.mjs &&` prefix |
| utils | `node ../../node_modules/vitest/vitest.mjs run` | Thêm `node check-deps.mjs &&` prefix |

### 3. Chuẩn hóa vitest command (optional nhưng recommended)

Nếu đã thêm `check-deps.mjs`, tiện chuẩn hóa vitest command luôn:
- `yarn vitest run` → `npx vitest run --passWithNoTests`
- `node ../../node_modules/vitest/vitest.mjs run` → `npx vitest run --passWithNoTests`

Pattern cuối cùng cho tất cả libs:
```
"prerelease": "node check-deps.mjs && npx vitest run --passWithNoTests"
```

### 4. Verify từng lib

Chạy `node check-deps.mjs` trong mỗi lib để đảm bảo script hoạt động:

```bash
for lib in avatar button card chip dialog layout menu theme typography utils; do
  echo "=== $lib ==="
  cd "libs/$lib" && node check-deps.mjs && cd ../..
done
```

## Constraints

- Đọc skill: `.agent/skills/strict-scope/SKILL.md`
- Copy `check-deps.mjs` nguyên bản — KHÔNG sửa nội dung script
- Giữ nguyên tất cả `standard-version` config khác (chỉ sửa `scripts.prerelease`)

## Dependencies

- **03-all-deps-fix-declarations** phải xong trước (deps phải clean trước khi gate)

## Verification

```bash
# Verify tất cả libs có check-deps.mjs
ls libs/*/check-deps.mjs

# Verify tất cả đều pass
for lib in avatar button card chip dialog layout menu theme typography utils; do
  echo "=== $lib ==="
  (cd "libs/$lib" && node check-deps.mjs)
done
```

## Done Criteria

- [ ] Tất cả 10 libs đều có `check-deps.mjs`
- [ ] Tất cả 10 libs đều có `prerelease` script chứa `node check-deps.mjs`
- [ ] `node check-deps.mjs` pass trong tất cả 10 libs
- [ ] Vitest command đã chuẩn hóa
- [ ] File moved to `plan/tasks/done/`
