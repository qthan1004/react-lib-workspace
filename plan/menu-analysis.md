# @thanh-libs/menu — Phân tích & Thiết kế API (v2)

## 1. Tổng quan

Menu component dùng để hiển thị **danh sách cấu trúc cây** (persistent inline list) — sidebar navigation, settings panel, accordion-style menu.

> [!NOTE]
> Floating/popup menu (dropdown actions, account menu, context menu) thuộc về `@thanh-libs/dropdown` — phát hành riêng.

**Dependencies sẵn có:**
- `@thanh-libs/theme` ✅ — design tokens
- `@thanh-libs/dialog` (Popover) ✅ — floating positioning, portal, dismiss behavior

---

## 2. So sánh các thư viện

### Kiến trúc / API Pattern

| Aspect | MUI | AntD | Radix |
|--------|-----|------|-------|
| **Pattern** | Imperative (`anchorEl` + `open`) | Data-driven (`items` array) | Compound components |
| **Trigger** | Manual `anchorEl` ref | Render prop `trigger` | `<Trigger>` component |
| **Sub-menu** | Không built-in | `children` trong item | `<Sub>` compound |
| **Inline mode** | ❌ (dùng List) | ✅ `mode="inline"` | ❌ |
| **Collapsed mode** | ❌ | ✅ `inlineCollapsed` | ❌ |

### Features Matrix

| Feature | MUI | AntD | Radix | Thanh-libs v0.1 |
|---------|-----|------|-------|-----------------|
| Basic menu list | ✅ | ✅ | ✅ | ✅ |
| Icon + label | ✅ | ✅ | ✅ tự render | ✅ |
| Keyboard shortcut text | ✅ tự render | ❌ | ✅ tự render | ✅ |
| Disabled item | ✅ | ✅ | ✅ | ✅ |
| Danger item | ❌ tự style | ✅ `danger` | ❌ tự style | ✅ |
| Divider | ✅ | ✅ | ✅ | ✅ |
| Group + Label | ✅ | ✅ | ✅ | ✅ |
| Sub-menu (popover) | ❌ | ✅ | ✅ | ✅ |
| Sub-menu (inline collapse) | ❌ | ✅ `mode="inline"` | ❌ | ✅ |
| Dense mode | ✅ | ✅ | ❌ | ✅ |
| Max height / scroll | ✅ | ❌ | ❌ | ✅ |
| Selected state | ✅ | ✅ | ❌ | ✅ |
| Collapsed (icon-only) | ❌ | ✅ `inlineCollapsed` | ❌ | ✅ `display="icon"` |
| Checkbox/Radio item | ❌ | ❌ | ✅ | ❌ (v2 — sau input lib) |
| Context menu | ✅ manual | ✅ | ✅ | ❌ (tạm note) |

---

## 3. Hai loại Sub-menu

Menu hỗ trợ **cả 2 loại** sub-menu (tương tự AntD):

### Loại 1: Popover Sub-menu (flyout)

```
┌──────────────┐
│ File         │
│ Edit         │
│ View       ▸ ├──────────────┐
│ Help         │ │ Zoom In      │
└──────────────┘ │ Zoom Out     │
                 │ Full Screen  │
                 └──────────────┘
```

- Sub-menu mở ra **bên cạnh** parent item (floating panel)
- Dùng cho: compact menu, menubar-style, collapsed sidebar
- Trigger: hover + delay hoặc click
- Positioning: `@floating-ui` → auto flip khi sát rìa viewport

### Loại 2: Inline Sub-menu (collapse/expand)

```
┌──────────────────┐         ┌──────────────────┐
│ 🏠 Dashboard     │         │ 🏠 Dashboard     │
│ 📊 Analytics  ▾  │    →    │ 📊 Analytics  ▴  │
│ 👤 Users         │         │   ├ Overview     │
│ ⚙ Settings      │         │   ├ Reports      │
└──────────────────┘         │   └ Exports      │
                             │ 👤 Users         │
                             │ ⚙ Settings      │
                             └──────────────────┘
```

- Sub-menu **xổ xuống inline** bên dưới trigger item
- Dùng cho: sidebar navigation, settings panel, accordion-style menu
- Trigger: click toggle
- Animation: slide down/up (giống accordion)

### API cho cả hai loại

```tsx
// Loại 1 — Popover (flyout bên cạnh)
<MenuSub mode="popover">
  <MenuSubTrigger icon={<ViewIcon />}>View</MenuSubTrigger>
  <MenuSubContent>
    <MenuItem>Zoom In</MenuItem>
    <MenuItem>Zoom Out</MenuItem>
  </MenuSubContent>
</MenuSub>

// Loại 2 — Inline (collapse/expand)
<MenuSub mode="inline">
  <MenuSubTrigger icon={<AnalyticsIcon />}>Analytics</MenuSubTrigger>
  <MenuSubContent>
    <MenuItem>Overview</MenuItem>
    <MenuItem>Reports</MenuItem>
    <MenuItem>Exports</MenuItem>
  </MenuSubContent>
</MenuSub>
```

`mode` prop trên `MenuSub`:
- `"popover"` — floating panel bên cạnh (flyout)
- `"inline"` — collapse/expand xuống bên dưới

`Menu` root cũng có `mode` prop — set default cho tất cả `MenuSub` bên trong. `MenuSub` có thể đè lên nếu cần:

```tsx
// Tất cả sub-menu mặc định là inline
<Menu mode="inline">
  <MenuSub>  {/* kế thừa mode="inline" từ Menu */}
    ...
  </MenuSub>
  <MenuSub mode="popover">  {/* đè lên thành popover */}
    ...
  </MenuSub>
</Menu>
```

---

## 4. Các Use Cases

### Case 1: Sidebar Navigation (inline sub-menu)

### Case 2: Grouped Menu
Items nhóm theo category với label + separator.

### Case 3: Popover Sub-menu (flyout)
Item mở floating sub-menu bên cạnh.

### Case 4: Inline Sub-menu (collapse/expand)
```tsx
// Menu root set default mode="inline" cho tất cả sub
<Menu mode="inline">
  <MenuItem icon={<DashboardIcon />}>Dashboard</MenuItem>

  <MenuSub>  {/* kế thừa mode="inline" từ Menu */}
    <MenuSubTrigger icon={<AnalyticsIcon />}>Analytics</MenuSubTrigger>
    <MenuSubContent>
      <MenuItem>Overview</MenuItem>
      <MenuItem>Reports</MenuItem>
    </MenuSubContent>
  </MenuSub>

  <MenuItem icon={<UsersIcon />}>Users</MenuItem>
  <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
</Menu>
```

### Case 5: Icon-only Mode
```tsx
// Sidebar collapsed — chỉ hiển icon, flyout popover khi interact
<Menu mode="inline" display="icon">
  <MenuItem icon={<DashboardIcon />}>Dashboard</MenuItem>  {/* hover/click → popover "Dashboard" */}
  <MenuSub>
    <MenuSubTrigger icon={<AnalyticsIcon />}>Analytics</MenuSubTrigger>  {/* hover/click → popover sub-menu */}
    <MenuSubContent>
      <MenuItem>Overview</MenuItem>  {/* không bị ảnh hưởng, hiển bình thường */}
      <MenuItem>Reports</MenuItem>
    </MenuSubContent>
  </MenuSub>
</Menu>
```

### Case 6: Selected State / Max Height Scroll

---

## 5. Thiết kế API

### Pattern: Compound Components

Lý do:
- **Type-safe** — mỗi component có props riêng
- **Linh hoạt** — dễ render custom content (avatar, icons)
- **Nhất quán** — giống dialog lib pattern
- **Dễ compose** — sub-menu chỉ cần nest `<MenuSub>`

### Root `<Menu>`

Menu là persistent inline list, không có open/close state.

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `mode` | `'popover' \| 'inline'` | `'inline'` | Default sub-menu mode cho tất cả `MenuSub` bên trong |
| `display` | `'default' \| 'icon'` | `'default'` | Chế độ hiển thị. `'icon'` = ẩn text, chỉ show icon |
| `dense` | `boolean` | `false` | Compact mode |
| `className` | `string` | — | Custom class |
| `style` | `CSSProperties` | — | Custom style |

#### `display="icon"` behavior

Chỉ ảnh hưởng **con gần nhất** (direct children), không ảnh hưởng nội dung bên trong sub-menu.

| Tình huống | Behavior khi hover/click |
|-----------|-------------------------|
| `MenuItem` không có sub | Flyout popover hiển **display name** (children text) |
| `MenuSub` có sub-menu | Flyout popover hiển **sub-menu content** |

Flyout popover này là **clickable** (không phải tooltip thuần túy), user có thể tương tác với nội dung bên trong.

> [!IMPORTANT]
> Khi `display="icon"`, prop `showIcon` tự động **force = true** cho **direct children** (con gần nhất). Nội dung bên trong sub-menu không bị ảnh hưởng.

### `<MenuItem>` — Action item

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `children` | `ReactNode` | — | Label |
| `icon` | `ReactNode` | — | Leading icon |
| `shortcut` | `ReactNode` | — | Trailing shortcut text |
| `disabled` | `boolean` | `false` | Disabled |
| `danger` | `boolean` | `false` | Destructive styling (đỏ) |
| `selected` | `boolean` | `false` | Check mark |
| `onClick` | `() => void` | — | Click handler |

### `<MenuLabel>` / `<MenuDivider>` / `<MenuGroup>`

Giữ nguyên như phiên bản trước — đơn giản, không thay đổi.

### `<MenuSub>` — Sub-menu container

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `mode` | `'popover' \| 'inline'` | *kế thừa từ `Menu`* | Đè lên default mode từ parent. Nếu không set, dùng `mode` của `Menu` root |
| `open` | `boolean` | — | Controlled |
| `defaultOpen` | `boolean` | `false` | Uncontrolled |
| `onOpenChange` | `(open: boolean) => void` | — | Callback |

### `<MenuSubTrigger>` — Mở sub-menu

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `children` | `ReactNode` | — | Label |
| `icon` | `ReactNode` | — | Leading icon |
| `disabled` | `boolean` | `false` | Disabled |

Auto render trailing indicator: `▸` (popover) hoặc `▾`/`▴` (inline).

### `<MenuSubContent>` — Sub-menu content

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `placement` | `Placement` | `'right-start'` | Chỉ popover mode |
| `offset` | `number` | `0` | Chỉ popover mode |

Khi `mode="inline"`: render như collapsible div với slide animation.
Khi `mode="popover"`: floating panel positioned bằng `@floating-ui`.

---

## 6. Accessibility (WCAG 2.2)

### ARIA Roles

| Element | Role | Aria attrs |
|---------|------|------------|
| Menu (root) | `role="menu"` | — |
| Item | `role="menuitem"` | `aria-disabled` khi disabled |
| SubTrigger | `role="menuitem"` | `aria-haspopup="menu"`, `aria-expanded` |
| SubContent | `role="menu"` | — |
| Group | `role="group"` | `aria-labelledby` → label |
| Label | `role="none"` | — |
| Divider | `role="separator"` | — |

### Keyboard

| Key | Hành vi |
|-----|---------|
| `Space` / `Enter` | Activate item hoặc toggle sub-menu |
| `↓` / `↑` | Navigate items |
| `→` | Mở sub-menu (popover) hoặc expand (inline) |
| `←` | Đóng sub-menu / collapse |
| `Home` / `End` | First / last item |
| Typeahead | Gõ ký tự → focus matching item |

### Focus

- Roving tabindex giữa các items

---

## 7. Internal Architecture

Menu là persistent inline list (không có root-level floating). Tuy nhiên **sub-menu popover** vẫn dùng `@floating-ui/react` cho positioning.

- Inline rendering: keyboard navigation + focus management xử lý nội bộ
- Sub-menu popover: dùng `@floating-ui/react` cho floating positioning + hover intent

> [!NOTE]
> `@thanh-libs/dropdown` (root-level floating menu) cũng sẽ dùng `@floating-ui/react`. Menu lib lo inline list + sub-menu (cả 2 mode).

---

## 8. Collapsed Sidebar (icon-only mode) — Phân tích

> Câu hỏi: "Khi collapse sidebar chỉ còn icon — đó có phải Menu không?"

### Phân tích

```
Expanded                    Collapsed
┌──────────────────┐        ┌────┐
│ 🏠 Dashboard     │        │ 🏠 │
│ 📊 Analytics  ▴  │   →    │ 📊 │ ← click → popover sub-menu
│   ├ Overview     │        │ 👤 │
│   └ Reports      │        │ ⚙  │
│ 👤 Users         │        └────┘
│ ⚙ Settings      │
└──────────────────┘
```

Sidebar collapsed có 2 yếu tố:
1. **Layout collapse** — width animation, hide text, chỉ show icon → đây là **layout** concern
2. **Menu behavior** — khi collapsed, click icon mở popover sub-menu → đây là **menu** concern

### Đề xuất: Không implement trong `@thanh-libs/menu`

**Lý do:**
- Collapsed sidebar là **pattern kết hợp** layout + menu, không phải pure menu
- Sidebar cần: width animation, responsive breakpoint, toggle button, persist state — đều là layout concerns
- AntD tuy có `inlineCollapsed` nhưng chỉ vì AntD Menu quá phức tạp (horizontal, vertical, inline — 1 component làm quá nhiều việc)

**Hướng giải quyết sau:**
- Tạo `@thanh-libs/sidebar` hoặc `@thanh-libs/navigation` riêng
- Component đó **compose** `Menu` bên trong: expanded → dùng `Menu` (inline list), collapsed → dùng `@thanh-libs/dropdown` trên mỗi icon
- Menu chỉ cần làm đúng 1 việc: render menu items + handle interactions

> [!NOTE]
> Menu cung cấp đủ building blocks. Sidebar/Navigation sẽ compose chúng lại. Giữ Menu đơn giản, single-purpose.

---

## 9. Phạm vi v0.1 vs v0.2

### v0.1 — Ship trước

- [ ] `Menu` (persistent inline list)
- [ ] `MenuItem` (icon, shortcut, disabled, danger, selected, onClick)
- [ ] `MenuDivider`, `MenuLabel`, `MenuGroup`
- [ ] `MenuSub` + `MenuSubTrigger` + `MenuSubContent` — **cả 2 mode**:
  - `mode="popover"` — flyout floating sub-menu
  - `mode="inline"` — collapse/expand (default)
- [ ] `display` prop: `'default' | 'icon'` — icon-only mode với flyout popover
- [ ] Keyboard: Arrow navigation, Enter/Space, Home/End, Typeahead
- [ ] Focus management (roving tabindex)
- [ ] Dense mode
- [ ] Full ARIA roles

### v0.2 — Đợi sau khi input lib sẵn sàng

- [ ] `MenuCheckboxItem` (toggle)
- [ ] `MenuRadioGroup` + `MenuRadioItem` (exclusive selection)
- [ ] Context menu (right-click) → có thể thuộc `@thanh-libs/dropdown`
- [ ] Transition/animation

### Tương lai — Component riêng

- [ ] `@thanh-libs/sidebar` hoặc `@thanh-libs/navigation` — compose Menu + layout cho collapsed sidebar pattern

---

## 10. Cấu trúc file

```
libs/menu/
├── src/
│   ├── index.ts
│   └── lib/
│       ├── Menu.tsx                 # Root context provider
│       ├── MenuItem.tsx             # Action item
│       ├── MenuLabel.tsx            # Group label
│       ├── MenuDivider.tsx          # Separator
│       ├── MenuGroup.tsx            # Semantic group
│       ├── MenuSub.tsx              # Sub-menu root
│       ├── MenuSubTrigger.tsx       # Sub-menu trigger item
│       ├── MenuSubContent.tsx       # Sub-menu content (popover | inline)
│       ├── styled.tsx
│       ├── models/
│       │   └── index.ts
│       ├── constants/
│       │   └── index.ts
│       ├── helpers/
│       │   └── index.ts
│       ├── hooks/
│       │   └── useMenuContext.ts
│       └── stories/
│           ├── Menu.stories.tsx
│           └── styled.tsx
├── package.json
├── vite.config.mts
└── tsconfig.lib.json
```

---

## 11. Nhật ký xử lý & Trạng thái hiện tại (Đang tiến hành)

**Các thay đổi kiến trúc so với kế hoạch ban đầu:**
1. **Dropdown/Popover tách riêng:** `Menu` hiện tại được refactor thành **Persistent List** (danh sách cấu trúc cây hiển thị luôn như sidebar). Các tính năng popover/floating sẽ được gom vào component `@thanh-libs/dropdown` sau và phát hành cùng đợt. (Đã xóa `MenuTrigger`, `MenuContent`).
2. **MenuSub chỉ còn Inline Mode:** Xóa behavior popover hover của sub-menu. `MenuSub` đổi sang click-to-expand (accordion style) sử dụng `MenuSubTrigger` và `MenuSubContent`.
3. **Auto-expand:** Khi một child `MenuItem` được set `selected={true}`, nó sẽ báo lên context (`registerSelected`) giúp toàn bộ các parent `MenuSub` tự động mở ra ở lần render đầu tiên.
4. **Soft-select cho Parent:** Khi child đang active, parent `MenuSubTrigger` sẽ nhận background nhạt hơn (`ownerSoftSelected={true}`) và **không in đậm**, giúp phân biệt rõ item đang chọn và danh mục chứa nó. Đã xử lý clear soft-select khi mảng active child rỗng.

**Todo tiếp theo:**
- Chỉnh sửa nhẹ style của soft-select nếu cần.
- Review tổng thể Menu khi phát hành cùng Dropdown và tích hợp vào pattern Layout/Sidebar.
