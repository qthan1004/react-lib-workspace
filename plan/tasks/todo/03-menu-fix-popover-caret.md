# 03-menu-fix-popover-caret

- **Goal**: Cập nhật chiều của mũi tên caret trong MenuSubTrigger tuỳ thuộc vào chế độ (chỉ xoay sang phải khi ở mode popover).
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` - Section 3

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuSub.tsx` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/styled/MenuSub.styled.tsx` |

## What to Do

1. Xác định chế độ menu hiện tại (`mode`) bên trong `MenuSubTrigger`.
2. Truền prop `$ownerMode="popover"` (hoặc kiểm tra bằng JS) vào styled component hiển thị mũi tên (caret).
3. Nếu mode là popover, biến đổi mũi tên sao cho nó chỉ sang tay phải `▸` (bằng cách dùng icon ChevronRight hoặc rotate bằng CSS qua `transform: rotate(-90deg)` nếu icon gốc đang chỉ xuống).

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`

## Dependencies

- 02-menu-implement-popover-floating.md (Nên xử lý file `MenuSub.tsx` sau khi bug 02 đã được fix xong để tránh merge conflict).

## Verification

```bash
yarn storybook
# Mở Playgound, chuyển đổi giữa "inline" và "popover" mode, quan sát biểu tượng dấu mũi tên ở Sub-menu trigger.
```

## Done Criteria

- [ ] Mũi tên chỉ xuống với `inline`, chỉ sang phải với `popover`.
- [ ] Tests pass
- [ ] File moved to `plan/tasks/done/`
