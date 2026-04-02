# All Libs: Fix Missing Dependency Declarations

- **Goal**: Fix tất cả missing `peerDependencies` declarations cho `@thanh-libs/*` imports across all libs.
- **Plan Reference**: `plan/workspace/2026-04-02_pxToRem-and-dep-audit.md` — Part 2: Dependency Graph Audit

## Files

| Action | Path |
|--------|------|
| MODIFY | `libs/theme/package.json` |
| MODIFY | `libs/typography/package.json` |
| MODIFY | `libs/button/package.json` |
| MODIFY | `libs/menu/package.json` |

## What to Do

### 1. Chạy workspace dependency audit

```bash
bash ".agent/skills/check-deps/check-deps.sh"
```

Ghi nhận tất cả mismatches (có thể nhiều hơn plan ban đầu vì Part 1 đã thêm imports).

### 2. Fix từng lib

Dựa trên plan gốc + audit kết quả mới:

**theme/package.json** — thêm:
```json
"peerDependencies": {
  "@thanh-libs/utils": "*"
}
```

**typography/package.json** — thêm:
```json
"peerDependencies": {
  "@thanh-libs/theme": "*",
  "@thanh-libs/utils": "*"
}
```

**button/package.json** — thêm:
```json
"peerDependencies": {
  "@thanh-libs/theme": "*"
}
```
(Nếu Part 1 đã thêm utils import, cũng thêm `"@thanh-libs/utils": "*"`)

**menu/package.json** — normalize:
- Chuyển `"@thanh-libs/utils": "^0.0.8"` từ `dependencies` → `peerDependencies: "*"`
- Giữ nguyên các peerDeps hiện có

### 3. Fix thêm nếu cần

Nếu audit ở bước 1 phát hiện thêm mismatches ở libs khác (avatar, chip, card, layout, dialog) — fix luôn.

### 4. Re-run audit

```bash
bash ".agent/skills/check-deps/check-deps.sh"
```

Xác nhận 0 mismatches.

## Constraints

- Đọc skill: `.agent/skills/strict-scope/SKILL.md`
- CHỈ sửa `package.json` — KHÔNG sửa source code
- Dùng `"*"` cho tất cả `@thanh-libs/*` peer dependencies (workspace convention)
- KHÔNG chuyển peerDependencies thành dependencies

## Dependencies

- **02-all-pxToRem-convert** phải xong trước vì có thể thêm imports mới

## Verification

```bash
# Audit toàn bộ
bash ".agent/skills/check-deps/check-deps.sh"
# Expect: 0 mismatches
```

## Done Criteria

- [ ] `bash check-deps.sh` trả về 0 mismatches
- [ ] Tất cả `@thanh-libs/*` imports đều có matching peerDependencies
- [ ] Menu đã normalize từ `dependencies` sang `peerDependencies`
- [ ] File moved to `plan/tasks/done/`
