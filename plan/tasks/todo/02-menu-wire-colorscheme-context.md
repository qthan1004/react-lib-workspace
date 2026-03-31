# Wire colorScheme Through Menu → Context → Consumer Components

- **Goal**: Truyền `colorScheme` prop từ `<Menu>` vào context, rồi mỗi consumer component đọc từ context và forward xuống styled component dưới dạng `ownerColorScheme` prop.
- **Plan Reference**: `plan/2026-03-31_menu_v0.2.md` — sections "Components", "Consumer components"

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/components/Menu.tsx` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/components/MenuItem.tsx` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/components/MenuSubTrigger.tsx` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/components/MenuLabel.tsx` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/components/MenuDivider.tsx` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/components/MenuSubContent.tsx` |

## What to Do

### 1. `Menu.tsx` — Nhận prop, truyền vào context

Hiện tại dòng 31 destructure props:
```typescript
({ children, dense = false, mode = 'inline', display = 'default', trigger = 'hover', floatingSettings, maxHeight, className, style, onKeyDown, ...rest }, externalRef) => {
```

→ Thêm `colorScheme` vào destructure.

Hiện tại dòng 45–48 tạo context value:
```typescript
const contextValue = useMemo<MenuContextValue>(
  () => ({ dense, mode, display, trigger, floatingSettings }),
  [dense, mode, display, trigger, floatingSettings],
);
```

→ Thêm `colorScheme` vào object và dependency array.

Thêm `ownerColorScheme={colorScheme}` vào `<MenuContainerStyled>`.

### 2. `MenuItem.tsx` — Đọc context, truyền styled prop

Hiện tại dòng 34:
```typescript
const { dense, display } = useMenuContext();
```

→ Đổi thành:
```typescript
const { dense, display, colorScheme } = useMenuContext();
```

Tại `<MenuItemStyled>` (dòng 63–74), thêm prop:
```typescript
ownerColorScheme={colorScheme}
```

Tại `<MenuItemShortcutStyled>` (dòng 84), thêm prop:
```typescript
ownerColorScheme={colorScheme}
```

### 3. `MenuSubTrigger.tsx` — Tương tự MenuItem

Dòng 17:
```typescript
const { dense, display } = useMenuContext();
```
→ Thêm `colorScheme`.

Tại `<MenuItemStyled>` (dòng 80–93), thêm:
```typescript
ownerColorScheme={colorScheme}
```

Tại `<SubArrowStyled>` (dòng 102), thêm:
```typescript
ownerColorScheme={colorScheme}
```

### 4. `MenuLabel.tsx` — Đọc context, truyền styled prop

Hiện tại component không dùng context. Cần thêm:
```typescript
import { useMenuContext } from '../hooks/useMenuContext';
```

Trong component body, đọc:
```typescript
const { colorScheme } = useMenuContext();
```

Truyền vào `<MenuLabelStyled>`:
```typescript
ownerColorScheme={colorScheme}
```

### 5. `MenuDivider.tsx` — Tương tự MenuLabel

Thêm import `useMenuContext`, đọc `colorScheme`, truyền `ownerColorScheme={colorScheme}` vào `<MenuDividerStyled>`.

### 6. `MenuSubContent.tsx` — Truyền cho cả InlineSubContentStyled và PopoverSubContentStyled

Đọc `colorScheme` từ context:
```typescript
import { useMenuContext } from '../hooks/useMenuContext';
// ... trong component body:
const { colorScheme } = useMenuContext();
```

Truyền `ownerColorScheme={colorScheme}` vào cả `<InlineSubContentStyled>` và `<PopoverSubContentStyled>`.

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- **CHỈ** thêm wiring code — KHÔNG sửa logic styled components (ticket 03 làm)
- Các styled components sẽ chưa nhận prop `ownerColorScheme` → TypeScript sẽ báo lỗi type. Đó là expected — ticket 03 sẽ thêm prop vào styled. **Tuy nhiên**, bạn VẪN phải thêm prop vào JSX trước.
- Build có thể fail ở bước này do type mismatch — đó là OK vì ticket 03 sẽ fix.

## Dependencies

- **01-menu-add-colorscheme-model** phải xong trước (cần `MenuColorScheme` type trong context)

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx tsc --noEmit -p libs/menu/tsconfig.lib.json 2>&1 | head -40
```

**Lưu ý**: Build sẽ có type errors vì styled components chưa nhận `ownerColorScheme`. Chấp nhận lỗi dạng:
```
Property 'ownerColorScheme' does not exist on type ...
```
Đây là expected — ticket 03 sẽ resolve.

## Done Criteria

- [ ] `Menu.tsx` nhận `colorScheme` prop và truyền vào context + `MenuContainerStyled`
- [ ] `MenuItem.tsx` đọc `colorScheme` từ context, truyền `ownerColorScheme` vào `MenuItemStyled` + `MenuItemShortcutStyled`
- [ ] `MenuSubTrigger.tsx` đọc `colorScheme` từ context, truyền `ownerColorScheme` vào `MenuItemStyled` + `SubArrowStyled`
- [ ] `MenuLabel.tsx` đọc `colorScheme` từ context, truyền `ownerColorScheme` vào `MenuLabelStyled`
- [ ] `MenuDivider.tsx` đọc `colorScheme` từ context, truyền `ownerColorScheme` vào `MenuDividerStyled`
- [ ] `MenuSubContent.tsx` đọc `colorScheme` từ context, truyền `ownerColorScheme` vào `InlineSubContentStyled` + `PopoverSubContentStyled`
- [ ] File moved to `plan/tasks/done/`
