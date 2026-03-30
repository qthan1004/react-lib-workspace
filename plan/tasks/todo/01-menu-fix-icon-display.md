# 01-menu-fix-icon-display

- **Goal**: Cập nhật CSS/Styled Components để ẩn text label khi `display="icon"`.
- **Plan Reference**: `plan/bugs/2026-03-30_menu_v0.1.md` - Section 4 & 6

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuItem.tsx` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/styled/MenuItem.styled.tsx` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuSub.tsx` |

## What to Do

1. Đọc giá trị `display` từ `useMenuContext(containerRef)` hoặc context chung.
2. Truyền thuộc tính này dưới dạng `$ownerDisplay` vào `MenuItemStyled` và styled components của `MenuSubTrigger`.
3. Cập nhật `MenuItem.styled.tsx`: khi thẻ có `$ownerDisplay="icon"`, hãy dùng CSS ẩn đi phần `<MenuItemLabelStyled>`, điều chỉnh lại thẻ cha để có padding bằng nhau hoặc co lại width, giúp item biến thành hình vuông (icon-only mode chuẩn của sidebar).

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`

## Dependencies

- None

## Verification

```bash
yarn storybook
# Mở story "Menu -> Icon-Only Display (Mini Sidebar)" và kiểm tra text đã biến mất chưa.
```

## Done Criteria

- [ ] Thẻ text label biến mất hoàn toàn khi display="icon".
- [ ] Kích thước padding của thẻ item cân đối ở chế độ icon.
- [ ] Tests pass
- [ ] File moved to `plan/tasks/done/`
