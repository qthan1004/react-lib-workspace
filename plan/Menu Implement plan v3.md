# Menu Implementation Plan v3

> Tài liệu thiết kế chi tiết dành cho agent thực thi. Tham chiếu từ [menu-analysis.md](file:///home/administrator/back%20up/Personal%20lib/plan/menu-analysis.md) (master branch — bản chuẩn nhất).

---

## 1. Trạng thái hiện tại

### Đã có (branch `master` của `libs/menu`)

| Component | File | Trạng thái |
|-----------|------|-----------|
| `Menu` | `components/Menu.tsx` | ✅ Persistent inline list, keyboard nav, typeahead |
| `MenuItem` | `components/MenuItem.tsx` | ✅ icon, shortcut, disabled, danger, selected, auto-expand |
| `MenuLabel` | `components/MenuLabel.tsx` | ✅ |
| `MenuDivider` | `components/MenuDivider.tsx` | ✅ |
| `MenuGroup` | `components/MenuGroup.tsx` | ✅ |
| `MenuSub` | `components/MenuSub.tsx` | ✅ Inline-only, auto-expand, soft-select |
| `MenuSubTrigger` | `components/MenuSubTrigger.tsx` | ✅ Click toggle, ▾/▴ indicator |
| `MenuSubContent` | `components/MenuSubContent.tsx` | ✅ Slide animation (inline) |
| `useMenuKeyboard` | `hooks/useMenuKeyboard.ts` | ✅ Arrow, Home/End, Typeahead |
| `useMenuContext` | `hooks/useMenuContext.ts` | ✅ dense only |
| Styled | `styled.tsx` | ✅ All styled components |
| Stories | `stories/Menu.stories.tsx` | ✅ 9 stories |
| Tests | — | ❌ Chưa có |

### Cần thêm (theo `menu-analysis.md` đã cập nhật)

1. **`mode` prop trên `Menu` root** — `'popover' | 'inline'`, default `'inline'`. Set default sub-menu mode cho tất cả `MenuSub` con.
2. **`mode` prop trên `MenuSub`** — kế thừa từ `Menu` root, có thể đè lên. Khi `mode="popover"` → render floating flyout panel thay vì inline collapse.
3. **`display` prop trên `Menu` root** — `'default' | 'icon'`. Khi `'icon'` → ẩn text, chỉ show icon (direct children only). Force `showIcon = true`.
4. **Flyout popover** khi `display="icon"`:
   - `MenuItem` không có sub → flyout hiện **display name** (children text)
   - `MenuSub` có sub → flyout hiện **sub-menu content**
   - Flyout là **clickable**, không phải tooltip thuần túy
5. **Popover sub-menu rendering** — dùng `@floating-ui/react` cho positioning, hover intent.

---

## 2. Phạm vi thay đổi

> [!IMPORTANT]
> **Nguyên tắc**: Không phá vỡ API hiện tại. Tất cả thay đổi là **additive** — code hiện tại không có `mode`/`display` vẫn hoạt động y hệt.

### Phase 1: Mode prop (popover/inline sub-menu)
### Phase 2: Display prop (icon-only mode)

---

## 3. Chi tiết thay đổi — Phase 1: Mode prop

### 3.1. Dependencies

#### [MODIFY] [package.json](file:///home/administrator/back%20up/Personal%20lib/libs/menu/package.json)

Thêm `@floating-ui/react` vào `peerDependencies` và `devDependencies`:

```diff
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "@emotion/react": ">=11",
    "@emotion/styled": ">=11",
-   "@thanh-libs/theme": "*"
+   "@thanh-libs/theme": "*",
+   "@floating-ui/react": ">=0.27.0"
  },
  "devDependencies": {
+   "@floating-ui/react": "^0.27.0",
```

---

### 3.2. Models

#### [MODIFY] [models/index.ts](file:///home/administrator/back%20up/Personal%20lib/libs/menu/src/lib/models/index.ts)

```diff
+ export type MenuMode = 'popover' | 'inline';
+ export type MenuDisplay = 'default' | 'icon';

  export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
+   /** Default sub-menu mode cho tất cả MenuSub bên trong */
+   mode?: MenuMode;
+   /** Chế độ hiển thị: 'icon' = ẩn text, chỉ show icon (direct children only) */
+   display?: MenuDisplay;
    dense?: boolean;
    maxHeight?: number | string;
  }

  export interface MenuSubProps {
    children: ReactNode;
+   /** Đè lên mode kế thừa từ Menu root. Nếu không set, dùng mode của Menu root */
+   mode?: MenuMode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  export interface MenuSubContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
+   /** Floating placement — chỉ dùng khi mode="popover" */
+   placement?: 'right-start' | 'right-end' | 'left-start' | 'left-end';
+   /** Floating offset — chỉ dùng khi mode="popover" */
+   offset?: number;
  }
```

---

### 3.3. Context

#### [MODIFY] [hooks/useMenuContext.ts](file:///home/administrator/back%20up/Personal%20lib/libs/menu/src/lib/hooks/useMenuContext.ts)

Thêm `mode` và `display` vào `MenuContextValue`:

```diff
+ import type { MenuMode, MenuDisplay } from '../models';

  export interface MenuContextValue {
    dense: boolean;
+   /** Default sub-menu mode — inherited by all MenuSub */
+   mode: MenuMode;
+   /** Display mode — 'icon' hides text for direct children */
+   display: MenuDisplay;
  }
```

---

### 3.4. Menu root

#### [MODIFY] [components/Menu.tsx](file:///home/administrator/back%20up/Personal%20lib/libs/menu/src/lib/components/Menu.tsx)

Nhận `mode` và `display` props, truyền qua context:

```diff
  export const Menu = forwardRef<HTMLDivElement, MenuProps>(
-   ({ children, dense = false, maxHeight, className, style, onKeyDown, ...rest }, externalRef) => {
+   ({ children, dense = false, mode = 'inline', display = 'default', maxHeight, className, style, onKeyDown, ...rest }, externalRef) => {

      const contextValue = useMemo<MenuContextValue>(
-       () => ({ dense }),
-       [dense],
+       () => ({ dense, mode, display }),
+       [dense, mode, display],
      );
```

---

### 3.5. MenuSub — Mode inheritance + popover logic

#### [MODIFY] [components/MenuSub.tsx](file:///home/administrator/back%20up/Personal%20lib/libs/menu/src/lib/components/MenuSub.tsx)

Thêm vào `MenuSubContextValue`:

```diff
  interface MenuSubContextValue {
    isOpen: boolean;
    toggle: () => void;
+   /** Resolved mode — 'popover' hoặc 'inline' */
+   resolvedMode: MenuMode;
    hasSelectedChild: boolean;
    registerSelected: () => () => void;
    triggerId: string;
  }
```

Trong component `MenuSub`:

```tsx
export const MenuSub = ({ children, mode: localMode, open: controlledOpen, defaultOpen = false, onOpenChange }: MenuSubProps) => {
  const { mode: parentMode } = useMenuContext();
  const resolvedMode = localMode ?? parentMode; // kế thừa từ Menu root, đè lên nếu có

  // ... giữ nguyên logic open/toggle/registerSelected ...

  // Popover mode: dùng @floating-ui/react
  // (Xử lý hover intent sẽ nằm ở MenuSubTrigger + MenuSubContent)

  const contextValue = useMemo<MenuSubContextValue>(
    () => ({ isOpen, toggle, resolvedMode, hasSelectedChild, registerSelected, triggerId }),
    [isOpen, toggle, resolvedMode, hasSelectedChild, registerSelected, triggerId],
  );
  // ...
};
```

---

### 3.6. MenuSubTrigger — Conditional rendering

#### [MODIFY] [components/MenuSubTrigger.tsx](file:///home/administrator/back%20up/Personal%20lib/libs/menu/src/lib/components/MenuSubTrigger.tsx)

```tsx
// Lấy resolvedMode từ MenuSubContext
const { isOpen, toggle, hasSelectedChild, triggerId, resolvedMode } = useMenuSubContext();

// Arrow indicator thay đổi theo mode
const arrow = resolvedMode === 'popover' ? '▸' : (isOpen ? '▴' : '▾');

// Popover mode: cần hover interaction
// Dùng useFloating + useRole + useInteractions từ @floating-ui/react
// Khi hover vào trigger → open sub-menu (với delay ~300ms), click cũng mở
// Khi rời khỏi cả trigger + content → close (với delay ~150ms)

// Inline mode: giữ click toggle như hiện tại
```

**Keyboard thay đổi cho popover mode:**
- `ArrowRight` → mở sub-menu, focus first item trong popover
- `ArrowLeft` (từ trong popover content) → đóng sub, focus lại trigger

---

### 3.7. MenuSubContent — Dual rendering

#### [MODIFY] [components/MenuSubContent.tsx](file:///home/administrator/back%20up/Personal%20lib/libs/menu/src/lib/components/MenuSubContent.tsx)

```tsx
const { isOpen, triggerId, toggle, resolvedMode } = useMenuSubContext();

if (resolvedMode === 'popover') {
  // Render floating panel bằng FloatingPortal + useFloating
  // - placement: props.placement ?? 'right-start'
  // - offset: props.offset ?? 0
  // - flip + shift middleware
  // - FloatingFocusManager cho focus trap
  return (
    <FloatingPortal>
      {isOpen && (
        <PopoverSubContentStyled  // styled component mới
          ref={floating}
          role="menu"
          aria-labelledby={triggerId}
          style={floatingStyles}
          {...rest}
        >
          {children}
        </PopoverSubContentStyled>
      )}
    </FloatingPortal>
  );
}

// Inline mode — giữ nguyên code hiện tại
return (
  <InlineSubContentStyled ...>
    {children}
  </InlineSubContentStyled>
);
```

---

### 3.8. Styled — Thêm PopoverSubContentStyled

#### [MODIFY] [styled.tsx](file:///home/administrator/back%20up/Personal%20lib/libs/menu/src/lib/styled.tsx)

Thêm styled component cho popover sub-menu:

```tsx
/* ─── Popover SubContent (floating) ───────────────────────── */

export const PopoverSubContentStyled = styled.div(
  (): CSSObject => {
    const { palette, spacing, shape }: ThemeSchema = useTheme();

    return {
      backgroundColor: palette?.background?.paper ?? '#fff',
      borderRadius: shape?.borderRadius ?? '0.5rem',
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      border: `1px solid ${palette?.divider ?? 'rgba(0,0,0,0.12)'}`,
      padding: `${spacing?.tiny ?? '0.25rem'} 0`,
      minWidth: 180,
      outline: 'none',
    };
  },
);
```

---

## 4. Chi tiết thay đổi — Phase 2: Display prop (icon-only)

### 4.1. Menu root

Đã thêm `display` vào context ở Phase 1. Không cần thay đổi thêm.

### 4.2. MenuItem — Icon-only rendering

#### [MODIFY] [components/MenuItem.tsx](file:///home/administrator/back%20up/Personal%20lib/libs/menu/src/lib/components/MenuItem.tsx)

```tsx
const { dense, display } = useMenuContext();
const isIconMode = display === 'icon';

// Đây là direct child check — nếu nằm trong MenuSubContent thì KHÔNG bị ảnh hưởng
// Cách xác định: nếu có MenuSubContext → đang trong sub → không áp dụng icon mode
const subContext = useOptionalMenuSubContext();
const isDirectChild = !subContext; // không trong sub = direct child của Menu
const shouldShowIconOnly = isIconMode && isDirectChild;

return (
  <MenuItemStyled ...>
    {/* Icon luôn hiện khi display="icon" (force showIcon = true) */}
    {(icon || shouldShowIconOnly) && (
      <MenuItemIconStyled aria-hidden="true">{icon}</MenuItemIconStyled>
    )}

    {/* Ẩn label khi icon-only mode, nhưng giữ cho accessibility */}
    {shouldShowIconOnly ? (
      <VisuallyHidden>{children}</VisuallyHidden>  // screen reader only
    ) : (
      <MenuItemLabelStyled>{children}</MenuItemLabelStyled>
    )}

    {/* Shortcut cũng ẩn trong icon mode */}
    {!shouldShowIconOnly && shortcut && (
      <MenuItemShortcutStyled>{shortcut}</MenuItemShortcutStyled>
    )}
  </MenuItemStyled>
);
```

**Flyout popover cho MenuItem (không có sub):**

Khi `shouldShowIconOnly = true`, wrap MenuItem trong floating trigger:
- Hover/click → mở flyout popover hiện **display name** (children text)
- Flyout là clickable (có thể chứa content)

Cần thêm hook hoặc wrapper component: `useIconModePopover` hoặc render trực tiếp inline.

### 4.3. MenuSubTrigger — Icon-only rendering

#### [MODIFY] [components/MenuSubTrigger.tsx](file:///home/administrator/back%20up/Personal%20lib/libs/menu/src/lib/components/MenuSubTrigger.tsx)

Tương tự MenuItem, nhưng flyout hiện **sub-menu content** thay vì display name:

```tsx
const { display } = useMenuContext();
const isIconMode = display === 'icon';

// MenuSubTrigger LUÔN là con trực tiếp (hoặc gần nhất) nên check khác
// Dùng depth counter trong context hoặc đơn giản: check parent sub context
const parentSub = useOptionalMenuSubContext(); // null nếu depth 0
const isTopLevel = !parentSub; // hoặc kiểm tra depth
const shouldShowIconOnly = isIconMode && isTopLevel;

// Khi shouldShowIconOnly:
// - Ẩn label + arrow ▾
// - Icon luôn hiện
// - Hover/click → mở flyout popover chứa sub-menu content (thay vì inline expand)
// → Tức là tự động chuyển sang mode="popover" behavior
```

> [!IMPORTANT]
> Khi `display="icon"`, sub-menu trigger ở top-level **luôn hoạt động như popover** (bất kể `mode` setting), vì không có chỗ cho inline expand khi chỉ hiện icon.

### 4.4. Styled — Icon-only container width

#### [MODIFY] [styled.tsx](file:///home/administrator/back%20up/Personal%20lib/libs/menu/src/lib/styled.tsx)

Thêm `ownerIconMode` prop cho `MenuContainerStyled`:

```tsx
interface MenuContainerStyledProps {
  ownerMaxHeight?: number | string;
  ownerIconMode?: boolean;
}

// Khi ownerIconMode:
// - width: auto (fit icon)
// - alignItems: center
```

---

## 5. Hover Intent cho Popover

Cần xử lý **safe triangle** hoặc đơn giản dùng delay:
- Hover vào trigger → wait 200–300ms → mở popover
- Di chuột từ trigger sang popover content → giữ mở (gap bridge)
- Rời khỏi cả trigger + content → wait 150ms → đóng

`@floating-ui/react` cung cấp sẵn `useHover` với `handleClose: safePolygon()` cho pattern này.

```tsx
import { useFloating, useHover, useInteractions, safePolygon, offset, flip, shift } from '@floating-ui/react';

// Trong MenuSubTrigger/MenuSubContent khi resolvedMode === 'popover':
const { refs, floatingStyles, context } = useFloating({
  open: isOpen,
  onOpenChange: (open) => { /* gọi toggle */ },
  placement: 'right-start',
  middleware: [offset(0), flip(), shift()],
});

const hover = useHover(context, {
  delay: { open: 250, close: 150 },
  handleClose: safePolygon(),
});

const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
```

---

## 6. File mới cần tạo

| File | Mục đích |
|------|----------|
| `hooks/usePopoverSub.ts` | Hook wrap `@floating-ui/react` cho popover sub-menu (useFloating + useHover + safePolygon) |
| `hooks/useIconModePopover.ts` | Hook cho flyout popover khi `display="icon"` (MenuItem name tooltip / MenuSub flyout) |
| `components/VisuallyHidden.tsx` | Utility component ẩn visual, giữ cho screen reader (hoặc dùng styled) |

---

## 7. Thứ tự thực hiện

Chia thành **3 PR** (hoặc 3 commit lớn trên cùng branch):

### PR 1: Mode prop + Context plumbing
1. Cập nhật `models/index.ts` — thêm types
2. Cập nhật `useMenuContext.ts` — thêm `mode`, `display`
3. Cập nhật `Menu.tsx` — nhận props, pass context
4. Cập nhật `MenuSub.tsx` — mode inheritance logic
5. **Chưa thay đổi rendering** — chỉ plumbing

### PR 2: Popover sub-menu rendering
1. Thêm `@floating-ui/react` vào `package.json`
2. Tạo `hooks/usePopoverSub.ts`
3. Cập nhật `MenuSubTrigger.tsx` — dual behavior (hover + click)
4. Cập nhật `MenuSubContent.tsx` — dual rendering (popover | inline)
5. Thêm `PopoverSubContentStyled` vào `styled.tsx`
6. Thêm stories: `Popover Sub-menu`, `Mixed Mode`

### PR 3: Display icon-only mode
1. Cập nhật `MenuItem.tsx` — icon-only rendering + flyout
2. Cập nhật `MenuSubTrigger.tsx` — icon-only + auto popover
3. Tạo `hooks/useIconModePopover.ts`
4. Tạo `VisuallyHidden.tsx`
5. Cập nhật `styled.tsx` — icon-mode container
6. Thêm stories: `Icon Only Mode`

---

## 8. Verification Plan

### Storybook Visual Testing
```bash
# Từ workspace root
npx storybook dev -p 6006
```

Kiểm tra từng story:
- **Các story hiện tại vẫn hoạt động** (backward compatibility)
- **Popover Sub-menu story**: hover trigger → flyout mở bên phải → di chuột vào flyout → giữ mở → rời đi → đóng
- **Mixed Mode story**: Menu có cả inline và popover sub-menu cùng lúc
- **Icon Only Mode story**: chỉ hiện icon → hover → flyout hiện tên/sub-menu

### Manual Keyboard Testing (trên Storybook)
1. Focus menu → ArrowDown/Up navigate
2. Focus popover sub trigger → ArrowRight mở popover → focus first item
3. ArrowLeft đóng popover → focus lại trigger
4. Typeahead vẫn hoạt động
5. Tab trap trong popover (không tab ra ngoài)

### Unit Tests (Vitest)
```bash
cd libs/menu && npx vitest run --passWithNoTests
```
Hiện chưa có tests. Nên thêm ít nhất:
- `Menu.test.tsx` — render basic, context values
- `MenuSub.test.tsx` — mode inheritance, toggle behavior

> [!NOTE]
> Ưu tiên Storybook visual testing trước. Unit tests có thể thêm sau nếu thời gian cho phép.

---

## 9. Lưu ý cho Agent thực thi

1. **Branch**: Tạo branch `features/menu-mode-display` từ `master` của menu submodule.
2. **Skill files**: Đọc [SKILL.md](file:///home/administrator/back%20up/Personal%20lib/.agent/skills/component-patterns/SKILL.md) trước khi code — tuân thủ naming conventions (`ownerXxx`, `Styled` suffix, `forwardRef`, arrow functions).
3. **Styled**: Object style only, dùng `useTheme()` callback pattern.
4. **Backward Compatibility**: Tất cả code hiện tại không truyền `mode`/`display` PHẢI hoạt động y hệt. Default: `mode="inline"`, `display="default"`.
5. **`@floating-ui/react`**: Đã có trong workspace root (`^0.27.19`). Cần thêm vào `libs/menu/package.json` peer + dev deps.
6. **Không tạo lib mới** — tất cả nằm trong `libs/menu`.
7. **Đọc `menu-analysis.md`** (trên master) để hiểu design intent đầy đủ.
