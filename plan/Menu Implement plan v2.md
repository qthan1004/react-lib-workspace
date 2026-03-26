# Menu Implement Plan v2 (Remaining Features)

Kế hoạch hoàn thiện các tính năng còn thiếu cho `@thanh-libs/menu` dựa trên `menu-analysis.md`.
Branch: `features/menu-refinements`

> [!IMPORTANT]
> Menu hiện tại là **Persistent List** (không có dropdown). `MenuTrigger`/`MenuContent` đã bị xóa.
> `MenuSub` chỉ có **inline mode** (accordion). Popover sub-menu sẽ thuộc `@thanh-libs/dropdown`.

---

## 1. Max Height & Scroll cho `<Menu>`

**File sửa:**
- `libs/menu/src/lib/models/index.ts`
- `libs/menu/src/lib/components/Menu.tsx`
- `libs/menu/src/lib/styled.tsx`

**Chi tiết:**

1. Thêm prop `maxHeight?: number | string` vào `MenuProps` trong `models/index.ts`.
2. Trong `Menu.tsx`: destructure `maxHeight` từ props, truyền xuống `MenuContainerStyled` qua transient prop `ownerMaxHeight`.
3. Trong `styled.tsx` — `MenuContainerStyled`:
   - Thêm interface prop `ownerMaxHeight?: number | string`.
   - Khi `ownerMaxHeight` có giá trị: set `maxHeight` (nếu là number thì convert sang `px`) và `overflowY: 'auto'`.

---

## 2. Accessibility cho `<MenuGroup>` & `<MenuLabel>`

**File sửa:**
- `libs/menu/src/lib/models/index.ts`
- `libs/menu/src/lib/components/MenuGroup.tsx`
- `libs/menu/src/lib/components/MenuLabel.tsx`

**Chi tiết:**

1. Thêm prop `id?: string` vào `MenuLabelProps` trong `models/index.ts`.
2. Trong `MenuLabel.tsx`: truyền `id` xuống `MenuLabelStyled` → `<div id={id} ...>`.
3. Trong `MenuGroup.tsx`:
   - Import `useId` từ React.
   - Sinh `const labelId = useId()`.
   - Truyền `labelId` vào `<MenuLabel id={labelId}>`.
   - Thêm `aria-labelledby={label ? labelId : undefined}` vào `<div role="group">`.

---

## 3. Keyboard Navigation & Roving Tabindex

**File sửa:**
- `libs/menu/src/lib/hooks/useMenuKeyboard.ts` **(NEW)**
- `libs/menu/src/lib/components/Menu.tsx`
- `libs/menu/src/lib/components/MenuItem.tsx`

**Chi tiết:**

### 3a. Tạo hook `useMenuKeyboard.ts`

Hook nhận ref của menu container, xử lý toàn bộ keyboard logic:

```ts
// Selector cho các item navigable
const ITEM_SELECTOR = '[role="menuitem"]:not([aria-disabled="true"])';
```

| Phím | Hành vi |
|------|---------|
| `ArrowDown` | Focus item tiếp theo (wrap về đầu nếu cuối) |
| `ArrowUp` | Focus item trước đó (wrap về cuối nếu đầu) |
| `Home` | Focus item đầu tiên |
| `End` | Focus item cuối cùng |
| Ký tự text | **Typeahead**: tìm item có textContent bắt đầu bằng chuỗi gõ, focus vào đó. Reset buffer sau 500ms không gõ thêm. |

Hook return: `{ onKeyDown: (e: KeyboardEvent) => void }`

### 3b. Roving Tabindex

- Trong `MenuItem.tsx`: thay `tabIndex={disabled ? -1 : 0}` thành logic roving:
  - Item đang được focus (hoặc là item đầu tiên nếu chưa có focus): `tabIndex={0}`
  - Tất cả item còn lại: `tabIndex={-1}`
- **Cách đơn giản nhất**: mặc định tất cả `tabIndex={-1}`, item đầu tiên `tabIndex={0}`. Khi navigate bằng phím, set `tabIndex={0}` cho item mới focus và `tabIndex={-1}` cho item cũ — xử lý trong hook `useMenuKeyboard`.

### 3c. Tích hợp vào `Menu.tsx`

- Thêm `useRef` cho container div.
- Gọi `useMenuKeyboard(containerRef)`.
- Gắn `onKeyDown` handler lên `MenuContainerStyled`.

---

## 4. Focus Management

**File sửa:**
- `libs/menu/src/lib/hooks/useMenuKeyboard.ts` (cùng hook mục 3)
- `libs/menu/src/lib/components/MenuSubTrigger.tsx`
- `libs/menu/src/lib/components/MenuSub.tsx`

**Chi tiết:**

### 4a. Auto-focus first/selected item

- Khi menu mount (hoặc khi focus vào menu container lần đầu): tự động focus vào item đầu tiên, hoặc item đang `selected` nếu có.
- Xử lý trong `useMenuKeyboard`: lắng nghe `focus` event trên container, nếu focus target là container chính thì redirect focus vào first/selected item.

### 4b. Restore focus khi sub-menu đóng

- Trong `MenuSubTrigger.tsx`: khi `isOpen` chuyển từ `true` → `false`, auto focus lại vào chính SubTrigger element.
- Dùng `useEffect` + `useRef` để detect transition:

```tsx
const triggerRef = useRef<HTMLDivElement>(null);
const prevOpenRef = useRef(isOpen);

useEffect(() => {
  if (prevOpenRef.current && !isOpen) {
    triggerRef.current?.focus();
  }
  prevOpenRef.current = isOpen;
}, [isOpen]);
```

---

## 5. Sub-menu Keyboard Interactions (Inline)

**File sửa:**
- `libs/menu/src/lib/components/MenuSubTrigger.tsx`
- `libs/menu/src/lib/components/MenuSubContent.tsx`

**Chi tiết:**

### 5a. `MenuSubTrigger` — mở rộng keyboard handler

Bổ sung vào `handleKeyDown` hiện có:

| Phím | Hành vi |
|------|---------|
| `ArrowRight` | Mở sub-menu (nếu đang đóng) + focus first child item |
| `ArrowDown` | Nếu sub-menu đang mở → focus first child item (thay vì chỉ navigate ngang) |

### 5b. `MenuSubContent` — Escape & ArrowLeft

Thêm `onKeyDown` handler lên `InlineSubContentStyled`:

| Phím | Hành vi |
|------|---------|
| `ArrowLeft` | Đóng sub-menu + focus trả về SubTrigger |
| `Escape` | Đóng sub-menu + focus trả về SubTrigger |

**Lưu ý**: cần `e.stopPropagation()` để Escape không bubble lên parent menu.

### 5c. ARIA attributes (đã có một phần)

Verify `MenuSubTrigger` đã có:
- `role="menuitem"` ✅
- `aria-haspopup="menu"` ✅
- `aria-expanded={isOpen}` ✅

---

## 6. Accessibility cho `<MenuSubContent>` — `aria-labelledby`

**File sửa:**
- `libs/menu/src/lib/components/MenuSub.tsx` (context)
- `libs/menu/src/lib/components/MenuSubTrigger.tsx`
- `libs/menu/src/lib/components/MenuSubContent.tsx`

**Chi tiết:**

1. Trong `MenuSub.tsx`: sinh `const triggerId = useId()`, thêm `triggerId` vào `MenuSubContextValue`.
2. Trong `MenuSubTrigger.tsx`: lấy `triggerId` từ context, gắn `id={triggerId}` lên element.
3. Trong `MenuSubContent.tsx`: lấy `triggerId` từ context, gắn `aria-labelledby={triggerId}` lên `InlineSubContentStyled`.

---

## Thứ tự implement khuyến nghị

1. **Mục 1** (maxHeight) — đơn giản nhất, không phụ thuộc gì
2. **Mục 2** (MenuGroup ARIA) — đơn giản, independent
3. **Mục 6** (SubContent aria-labelledby) — nhỏ, chuẩn bị context cho mục 5
4. **Mục 3** (Keyboard + Roving) — phức tạp nhất, cần hook mới
5. **Mục 4** (Focus management) — phụ thuộc hook mục 3
6. **Mục 5** (Sub-menu keyboard) — phụ thuộc mục 3, 4

---

**Trạng thái**: Chờ user confirm để bắt đầu implement trên branch `features/menu-refinements`.
