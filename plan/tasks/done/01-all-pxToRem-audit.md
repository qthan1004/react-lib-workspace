# Full Audit: Hardcoded px/rem Across All Libs

- **Goal**: Scan tất cả libs để tìm mọi hardcoded px/rem values, output danh sách cần convert sang `pxToRem()`.
- **Plan Reference**: `plan/workspace/2026-04-02_pxToRem-and-dep-audit.md` — Part 1: pxToRem Standardization

## Files

| Action | Path |
|--------|------|
| NEW | `plan/workspace/pxToRem-audit-results.md` (output report) |

## What to Do

### 1. Quyết định htmlFontSize

> [!IMPORTANT]
> Hiện tại `pxToRem` dùng base **14**. Hỏi user xác nhận:
> - Base **14** → app set `html { font-size: 14px }`
> - Base **16** → browser default
>
> Nếu user không response, **giữ nguyên base 14** (hiện tại).

### 2. Scan toàn bộ libs

Dùng grep/ripgrep tìm hardcoded values trong `libs/*/src/**/*.{ts,tsx}`:

```bash
# Tìm rem strings
grep -rn "'[0-9.]*rem'" libs/*/src/ --include="*.ts" --include="*.tsx"
grep -rn '"[0-9.]*rem"' libs/*/src/ --include="*.ts" --include="*.tsx"

# Tìm px strings trong styled-components
grep -rn "'[0-9]*px'" libs/*/src/ --include="*.ts" --include="*.tsx"
grep -rn '"[0-9]*px"' libs/*/src/ --include="*.ts" --include="*.tsx"

# Tìm template literal px/rem
grep -rn '`[^`]*[0-9]\+px[^`]*`' libs/*/src/ --include="*.ts" --include="*.tsx"
grep -rn '`[^`]*[0-9.]\+rem[^`]*`' libs/*/src/ --include="*.ts" --include="*.tsx"
```

### 3. Output report

Tạo file `plan/workspace/pxToRem-audit-results.md` với format:

```markdown
# pxToRem Audit Results

## htmlFontSize: [14 hoặc 16]

## Per-lib findings

### [lib name]
| File | Line | Current Value | Equivalent px | pxToRem() |
|------|------|---------------|---------------|-----------|
| `src/xxx.ts` | 42 | `'0.875rem'` | 14px | `pxToRem(14)` |

## Summary
- Total hardcoded values: N
- Libs affected: [list]
- Libs already using pxToRem correctly: [list]
```

### 4. Loại trừ

- **KHÔNG** convert gì trong task này — chỉ audit và output report
- Skip các giá trị thuộc CSS properties không liên quan đến sizing (vd: `transition: 0.2s`)
- Skip `0px`, `0rem` (no conversion needed)

## Constraints

- Đọc skill: `.agent/skills/strict-scope/SKILL.md`
- CHỈ tạo report, KHÔNG sửa source code
- Workspace root: `/home/administrator/back up/Personal lib`

## Dependencies

- None — đây là task đầu tiên

## Verification

```bash
# Verify report file exists
cat "plan/workspace/pxToRem-audit-results.md"
```

## Done Criteria

- [ ] Đã scan tất cả libs (menu, theme, typography, avatar, chip, button, card, layout, dialog, utils)
- [ ] Report file tạo xong với đầy đủ findings per-lib
- [ ] htmlFontSize đã được xác nhận (hoặc default 14)
- [ ] File moved to `plan/tasks/done/`
