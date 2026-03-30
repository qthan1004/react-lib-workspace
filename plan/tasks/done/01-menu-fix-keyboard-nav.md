# Fix Keyboard Navigation — Skip Collapsed Sub-menu Items

- **Goal**: Sửa bug `useMenuKeyboard` nhảy vào `[role="menuitem"]` bên trong collapsed sub-menu khi dùng Arrow Up/Down.
- **Plan Reference**: `plan/2026-03-30_menu_v0.1.md` — Section 1: Bug Fix: Keyboard navigation bỏ qua collapsed items

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/hooks/useMenuKeyboard.ts` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/MenuSubContent.tsx` |

## What to Do

### 1. `MenuSubContent.tsx` — Thêm `data-collapsed` attribute

Trong JSX của `InlineSubContentStyled`, thêm prop `data-collapsed={!isOpen}`:

```tsx
<InlineSubContentStyled
  ref={ref}
  role="menu"
  aria-labelledby={triggerId}
  ownerOpen={isOpen}
  data-collapsed={!isOpen}   // ← THÊM DÒNG NÀY
  onKeyDown={handleKeyDown}
  {...rest}
>
```

### 2. `useMenuKeyboard.ts` — Filter out items trong collapsed sub-menu

Thay thế hàm `getItems` hiện tại (dòng 9–12) bằng logic có filter:

```ts
const getItems = useCallback(() => {
  if (!containerRef.current) return [];
  const all = Array.from(
    containerRef.current.querySelectorAll(ITEM_SELECTOR)
  ) as HTMLElement[];
  // Loại bỏ items nằm trong collapsed sub-menu
  return all.filter(
    (el) => el.closest('[role="menu"][data-collapsed="true"]') === null
  );
}, [containerRef]);
```

> `el.closest('[role="menu"][data-collapsed="true"]')` sẽ tìm ancestor `role="menu"` có `data-collapsed="true"`. Nếu tìm thấy → item đang bị ẩn → loại.

## Constraints

- Đọc skill: `.agent/skills/strict-scope/SKILL.md`
- Chỉ sửa 2 file trong danh sách, không sửa file khác
- Không thay đổi behavior của keyboard khi sub-menu đang **mở**

## Dependencies

- None

## Verification

```bash
cd "/home/administrator/back up/Personal lib" && npx vitest run --project menu
```

Hoặc:

```bash
cd "/home/administrator/back up/Personal lib/libs/menu" && npx vitest run
```

Kiểm tra test file: `libs/menu/tests/MenuSub.spec.tsx` — tất cả tests phải pass.

## Done Criteria

- [ ] `MenuSubContent` render `data-collapsed="true"` khi closed, `data-collapsed="false"` khi open
- [ ] `getItems()` trong `useMenuKeyboard` filter out items có ancestor `[data-collapsed="true"]`
- [ ] Tất cả tests trong `libs/menu/tests/` pass
- [ ] File moved to `plan/tasks/done/`
