---
description: Save the current implementation plan to the plan/ directory with a standardized filename
---

# Save Plan

Lưu implementation plan hiện tại vào thư mục `plan/` theo công thức đặt tên chuẩn.

## Naming Convention

```
plan/<YYYY-MM-DD>_<module>_<version>.md
```

- **`<YYYY-MM-DD>`**: Ngày hiện tại (lấy từ system time), ví dụ `2026-03-30`
- **`<module>`**: Tên module/lib đang làm việc (lowercase, no prefix), ví dụ `menu`, `dialog`, `theme`
- **`<version>`**: Version hiện tại của plan, ví dụ `v0.1`, `v1.0`

## Steps

1. Xác định **module name** từ context hiện tại (tên lib đang làm, hoặc hỏi user nếu không rõ)
2. Xác định **version** từ context (thường lấy từ `package.json` version hoặc nội dung plan, hoặc hỏi user)
3. Lấy **ngày hiện tại** từ system time, format `YYYY-MM-DD`
4. Copy file `implementation_plan.md` từ artifact directory sang `plan/<date>_<module>_<version>.md`

// turbo
5. Chạy lệnh copy:
```bash
cp "<artifact_dir>/implementation_plan.md" "<workspace>/plan/<date>_<module>_<version>.md"
```

## Examples

| Context | Filename |
|---------|----------|
| Menu lib v0.1 on 2026-03-30 | `plan/2026-03-30_menu_v0.1.md` |
| Dialog lib v1.0 on 2026-04-15 | `plan/2026-04-15_dialog_v1.0.md` |
| Theme lib v2.0 on 2026-05-01 | `plan/2026-05-01_theme_v2.0.md` |
