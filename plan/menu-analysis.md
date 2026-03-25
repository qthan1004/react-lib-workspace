# @thanh-libs/menu — Phân tích & Thiết kế API (v2)

## 1. Tổng quan

Menu component dùng để hiển thị danh sách hành động hoặc tùy chọn. Hỗ trợ hai dạng chính:
- **Dropdown Menu** — floating surface triggered bởi button (dropdown actions, account menu)
- **Inline Menu** — embedded list (sidebar navigation, settings panel)

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
| Basic dropdown | ✅ | ✅ | ✅ | ✅ |
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
| Collapsed (icon-only) | ❌ | ✅ `inlineCollapsed` | ❌ | ❌ (xem mục 8) |
| Checkbox/Radio item | ❌ | ❌ | ✅ | ❌ (v2 — sau input lib) |
| Context menu | ✅ manual | ✅ | ✅ | ❌ (tạm note) |

---

## 3. Hai loại Sub-menu

Đây là điểm quan trọng phân biệt `@thanh-libs/menu` với hầu hết các lib khác (chỉ AntD hỗ trợ cả hai):

### Loại 1: Popover Sub-menu (floating)

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

- Sub-menu mở ra **bên cạnh** parent menu (floating panel)
- Dùng cho: dropdown menu, context menu, menubar
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
// Loại 1 — Popover (default khi dùng trong Menu dropdown)
<MenuSub mode="popover">
  <MenuSubTrigger icon={<ViewIcon />}>View</MenuSubTrigger>
  <MenuSubContent>
    <MenuItem>Zoom In</MenuItem>
    <MenuItem>Zoom Out</MenuItem>
  </MenuSubContent>
</MenuSub>

// Loại 2 — Inline (dùng trong sidebar / embedded menu)
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
- `"popover"` (default) — floating panel bên cạnh
- `"inline"` — collapse/expand xuống bên dưới

---

## 4. Các Use Cases

### Case 1: Basic Action Menu
Click button → list actions → click item → đóng + callback.

### Case 2: Icon Menu ("⋮" more actions)
Icon-only trigger, items có icon + danger variant.

### Case 3: Grouped Menu
Items nhóm theo category với label + separator.

### Case 4: Account Menu
Custom content (avatar header) + action items.

### Case 5: Popover Sub-menu
Item mở floating submenu bên cạnh.

### Case 6: Sidebar Navigation (inline sub-menu)
```tsx
// Vertical inline menu — sidebar style
<Menu mode="inline">
  <MenuItem icon={<DashboardIcon />}>Dashboard</MenuItem>

  <MenuSub mode="inline">
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

### Case 7: Selected State / Max Height Scroll

---

## 5. Thiết kế API

### Pattern: Compound Components

Lý do:
- **Type-safe** — mỗi component có props riêng
- **Linh hoạt** — dễ render custom content (avatar, icons)
- **Nhất quán** — giống dialog lib pattern
- **Dễ compose** — sub-menu chỉ cần nest `<MenuSub>`

### Root `<Menu>`

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `open` | `boolean` | — | Controlled (chỉ cho dropdown mode) |
| `defaultOpen` | `boolean` | `false` | Uncontrolled initial state |
| `onOpenChange` | `(open: boolean) => void` | — | Callback khi open/close |
| `mode` | `'dropdown' \| 'inline'` | `'dropdown'` | Dropdown = floating, Inline = embedded list |
| `triggerMode` | `'click' \| 'hover'` | `'click'` | Cách mở menu (chỉ dropdown) |

### `<MenuTrigger>` — Kích hoạt menu (chỉ dropdown mode)

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `children` | `ReactElement` | — | Trigger element |

### `<MenuContent>` — Nội dung menu

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `placement` | `Placement` | `'bottom-start'` | Vị trí (chỉ dropdown) |
| `offset` | `number` | `4` | Gap từ trigger (chỉ dropdown) |
| `maxHeight` | `number \| string` | `300` | Max height trước khi scroll |
| `minWidth` | `number \| string` | `180` | Min width |
| `dense` | `boolean` | `false` | Compact mode |
| `className` | `string` | — | Custom class |
| `style` | `CSSProperties` | — | Custom style |
| `zIndex` | `number` | `1400` | Z-index (chỉ dropdown) |

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
| `closeOnClick` | `boolean` | `true` | Auto đóng menu (chỉ dropdown) |

### `<MenuLabel>` / `<MenuDivider>` / `<MenuGroup>`

Giữ nguyên như phiên bản trước — đơn giản, không thay đổi.

### `<MenuSub>` — Sub-menu container

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `mode` | `'popover' \| 'inline'` | `'popover'` | Popover = floating, Inline = collapse |
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

---

## 6. Accessibility (WCAG 2.2)

### ARIA Roles

| Element | Role | Aria attrs |
|---------|------|------------|
| Trigger | — | `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` |
| Content | `role="menu"` | `aria-labelledby` → trigger |
| Item | `role="menuitem"` | `aria-disabled` khi disabled |
| SubTrigger | `role="menuitem"` | `aria-haspopup="menu"`, `aria-expanded` |
| SubContent | `role="menu"` | — |
| Group | `role="group"` | `aria-labelledby` → label |
| Label | `role="none"` | — |
| Divider | `role="separator"` | — |

### Keyboard

| Key | Hành vi |
|-----|---------|
| `Space` / `Enter` | Mở menu hoặc activate item |
| `↓` / `↑` | Navigate items |
| `→` | Mở sub-menu (popover) hoặc expand (inline) |
| `←` | Đóng sub-menu / collapse |
| `Escape` | Đóng (sub → parent, root → đóng hẳn) |
| `Home` / `End` | First / last item |
| Typeahead | Gõ ký tự → focus matching item |

### Focus

- Mở → focus first item (hoặc selected item)
- Đóng → restore focus về trigger
- Roving tabindex

---

## 7. Internal Architecture

**Quyết định: dùng `@floating-ui/react` trực tiếp** (không wrap Popover)

Lý do:
- `useListNavigation` (roving tabindex) + `useTypeahead` từ floating-ui — chính xác cho menu
- Menu cần `role="menu"`, không phải `role="dialog"` như Popover
- Keyboard interaction khác Popover hoàn toàn (ArrowUp/Down, sub-menu Right/Left)
- Sub-menu popover cần hover-to-open (Popover hiện tại chỉ click)

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
- Component đó **compose** `Menu` bên trong: expanded → `Menu mode="inline"`, collapsed → `Menu mode="dropdown"` trên mỗi icon
- Menu chỉ cần làm đúng 1 việc: render menu items + handle interactions

> [!NOTE]
> Menu cung cấp đủ building blocks. Sidebar/Navigation sẽ compose chúng lại. Giữ Menu đơn giản, single-purpose.

---

## 9. Phạm vi v0.1 vs v0.2

### v0.1 — Ship trước

- [ ] `Menu`, `MenuTrigger`, `MenuContent` (dropdown mode)
- [ ] `MenuItem` (icon, shortcut, disabled, danger, selected, onClick)
- [ ] `MenuDivider`, `MenuLabel`, `MenuGroup`
- [ ] `MenuSub` + `MenuSubTrigger` + `MenuSubContent` — **cả 2 mode**:
  - `mode="popover"` — floating sub-menu
  - `mode="inline"` — collapse/expand
- [ ] Keyboard: Arrow navigation, Enter/Space, Escape, Home/End, Typeahead
- [ ] Focus management (auto-focus, restore focus, roving tabindex)
- [ ] Dense mode
- [ ] Max height scrollable
- [ ] Trigger: click (default), hover (optional via `triggerMode="hover"`)
- [ ] Full ARIA roles

### v0.2 — Đợi sau khi input lib sẵn sàng

- [ ] `MenuCheckboxItem` (toggle)
- [ ] `MenuRadioGroup` + `MenuRadioItem` (exclusive selection)
- [ ] Context menu (right-click)
- [ ] `Menu mode="inline"` (standalone embedded menu — sidebar use case)
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
│       ├── MenuTrigger.tsx          # Trigger (dropdown mode)
│       ├── MenuContent.tsx          # Content container
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
