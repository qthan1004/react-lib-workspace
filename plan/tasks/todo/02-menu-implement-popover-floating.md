# 02-menu-implement-popover-floating

- **Goal**: Implement Floating UI logic để `MenuSubContent` thực sự bay (float) và hỗ trợ trigger hover/click khi `mode="popover"`.
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` - Section 1, 2, & 6

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuSub.tsx` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/hooks/useMenuContext.ts` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/styled/MenuSub.styled.tsx` |

## What to Do

1. Trong `MenuSub.tsx`:
   - Cần cấu trúc lại luồng xử lý riêng cho `mode === 'popover'` và `mode === 'inline'`.
   - Đối với `mode="popover"`, KHÔNG sử dụng `AnimatePresence` dạng list-box ẩn hiện đẩy nội dung bên dưới xuống.
   - Thay vào đó, tái sử dụng `useFloatingPosition` (từ `@thanh-libs/dialog/src/lib/hooks/useFloatingPosition` - hoặc setup Floating-UI thủ công) để lấy references, strategy, x, y cho Popover.
   - Gom nội dung của `MenuSubContent` vào thẻ Portal để nó trôi nổi phía trên DOM tree.
2. Tại block trigger, nếu `trigger === 'hover'`, lắng nghe `onMouseEnter`/`onMouseLeave` ở cả `Trigger` lẫn `Content` để đóng mở. Nếu `trigger === 'click'`, xài `onClick` bình thường, kết hợp với dismiss bằng click outside.

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Đảm bảo việc thêm Floating UI không làm phá vỡ logic cũ của `mode="inline"`.

## Dependencies

- None (Independent from 01)

## Verification

```bash
yarn storybook
# Kiểm tra story "Popover Sub-menus".
# Sub-menu phải hiển thị dưới dạng portal, không đẩy DOM xuống và chạy tốt khi hover.
```

## Done Criteria

- [ ] MenuSub float thực sự khi set mode="popover".
- [ ] Hover trigger mở được sub-menu ở mode popover.
- [ ] Tests pass
- [ ] File moved to `plan/tasks/done/`
