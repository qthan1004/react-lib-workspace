# Apply colorScheme to All Styled Components

- **Goal**: Cập nhật tất cả styled components trong `styled.tsx` để nhận prop `ownerColorScheme?: MenuColorScheme` và áp dụng theo priority chain: **colorScheme → palette (theme) → hardcoded fallback**.
- **Plan Reference**: `plan/2026-03-31_menu_v0.2.md` — section "Styled"

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/styled.tsx` |

## What to Do

### Import

Thêm import ở đầu file:
```typescript
import type { MenuColorScheme } from './models';
```

### Priority chain pattern

Cho **MỌI** token, dùng pattern:
```typescript
// colorScheme override → theme palette → hardcoded fallback
const textColor = ownerColorScheme?.color ?? palette?.text?.primary ?? 'rgba(0,0,0,0.87)';
```

### Cụ thể từng styled component:

#### 1. `MenuContainerStyled` (dòng 14–32)

Thêm `ownerColorScheme?: MenuColorScheme` vào interface `MenuContainerStyledProps`.

Áp dụng:
- `background`: `ownerColorScheme?.background` → (không có palette default) → không set (transparent)
- `color`: `ownerColorScheme?.color` → `palette?.text?.primary` → `'rgba(0,0,0,0.87)'`

```typescript
...(ownerColorScheme?.background && { backgroundColor: ownerColorScheme.background }),
color: ownerColorScheme?.color ?? palette?.text?.primary ?? 'rgba(0,0,0,0.87)',
```

#### 2. `MenuItemStyled` (dòng 36–103)

Thêm `ownerColorScheme?: MenuColorScheme` vào interface `MenuItemStyledProps`.

Các tokens cần thay đổi:

| Token | Logic |
|-------|-------|
| `textColor` (normal) | `ownerColorScheme?.color ?? palette?.text?.primary ?? 'rgba(0,0,0,0.87)'` |
| `textColor` (danger) | `ownerColorScheme?.dangerColor ?? palette?.error?.main ?? '#d32f2f'` |
| `textColor` (disabled) | `ownerColorScheme?.disabledColor ?? palette?.text?.disabled ?? 'rgba(0,0,0,0.38)'` |
| hover bg (normal) | `ownerColorScheme?.hoverBg ?? palette?.action?.hover ?? 'rgba(0,0,0,0.04)'` |
| hover bg (danger) | `ownerColorScheme?.dangerHoverBg ?? palette?.error?.light ?? 'rgba(211,47,47,0.08)'` |
| hover color | nếu `ownerColorScheme?.hoverColor` → set `color: ownerColorScheme.hoverColor` |
| focus-visible boxShadow | `ownerColorScheme?.focusRingColor ?? palette?.primary?.main ?? '#1976d2'` |
| `selectedBg` | `ownerColorScheme?.activeBg ?? palette?.action?.selected ?? 'rgba(25,118,210,0.08)'` |
| selected text color | nếu `ownerColorScheme?.activeColor` → set `color: ownerColorScheme.activeColor` trong block `ownerSelected` |
| `softSelectedBg` | `ownerColorScheme?.softSelectedBg ?? palette?.action?.hover ?? 'rgba(0,0,0,0.04)'` |

Ví dụ cụ thể cho textColor:
```typescript
const textColor = ownerDanger
  ? (ownerColorScheme?.dangerColor ?? palette?.error?.main ?? '#d32f2f')
  : ownerDisabled
    ? (ownerColorScheme?.disabledColor ?? palette?.text?.disabled ?? 'rgba(0,0,0,0.38)')
    : (ownerColorScheme?.color ?? palette?.text?.primary ?? 'rgba(0,0,0,0.87)');
```

Ví dụ cho selectedBg:
```typescript
const selectedBg = ownerColorScheme?.activeBg ?? palette?.action?.selected ?? 'rgba(25,118,210,0.08)';
const softSelectedBg = ownerColorScheme?.softSelectedBg ?? palette?.action?.hover ?? 'rgba(0,0,0,0.04)';
```

Ví dụ cho hover:
```typescript
'&:hover': {
  backgroundColor: ownerDanger
    ? (ownerColorScheme?.dangerHoverBg ?? palette?.error?.light ?? 'rgba(211,47,47,0.08)')
    : (ownerColorScheme?.hoverBg ?? palette?.action?.hover ?? 'rgba(0,0,0,0.04)'),
  ...(ownerColorScheme?.hoverColor && { color: ownerColorScheme.hoverColor }),
},
```

Ví dụ cho focus-visible:
```typescript
'&:focus-visible': {
  outline: '2px solid transparent',
  boxShadow: `inset 0 0 0 2px ${ownerColorScheme?.focusRingColor ?? palette?.primary?.main ?? '#1976d2'}`,
},
```

Ví dụ cho selected block — thêm activeColor:
```typescript
...(ownerSelected && {
  backgroundColor: selectedBg,
  fontWeight: 600,
  ...(ownerColorScheme?.activeColor && { color: ownerColorScheme.activeColor }),
}),
```

#### 3. `MenuItemShortcutStyled` (dòng 137–149)

Thêm interface + prop `ownerColorScheme`:
```typescript
interface MenuItemShortcutStyledProps {
  ownerColorScheme?: MenuColorScheme;
}

export const MenuItemShortcutStyled = styled.span<MenuItemShortcutStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();
    return {
      marginLeft: 'auto',
      paddingLeft: '2rem',
      color: ownerColorScheme?.secondaryColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.6)',
      fontSize: FONT_SIZE_SHORTCUT,
      flexShrink: 0,
    };
  },
);
```

#### 4. `MenuLabelStyled` (dòng 159–173)

Thêm interface + prop `ownerColorScheme`:
```typescript
interface MenuLabelStyledProps {
  ownerColorScheme?: MenuColorScheme;
}
```

Token: `color` → `ownerColorScheme?.secondaryColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.6)'`

#### 5. `MenuDividerStyled` (dòng 177–187)

Thêm interface + prop `ownerColorScheme`:
```typescript
interface MenuDividerStyledProps {
  ownerColorScheme?: MenuColorScheme;
}
```

Token: `borderTop` → `1px solid ${ownerColorScheme?.dividerColor ?? palette?.divider ?? 'rgba(0,0,0,0.12)'}`

#### 6. `SubArrowStyled` (dòng 191–203)

Thêm interface + prop `ownerColorScheme`:
```typescript
interface SubArrowStyledProps {
  ownerColorScheme?: MenuColorScheme;
}
```

Token: `color` → `ownerColorScheme?.secondaryColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.6)'`

#### 7. `PopoverSubContentStyled` (dòng 227–243)

Thêm interface + prop `ownerColorScheme`:
```typescript
interface PopoverSubContentStyledProps {
  ownerColorScheme?: MenuColorScheme;
}
```

Tokens:
- `backgroundColor`: `ownerColorScheme?.popoverBg ?? palette?.background?.paper ?? '#fff'`
- `border`: `1px solid ${ownerColorScheme?.popoverBorderColor ?? palette?.divider ?? 'rgba(0,0,0,0.12)'}`

#### 8. `InlineSubContentStyled` — KHÔNG cần colorScheme (chỉ layout/animation)

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- **KHÔNG** thêm `ownerColorScheme` vào `InlineSubContentStyled` — nó chỉ quản lý layout/collapse animation
- **KHÔNG** thêm `ownerColorScheme` vào `MenuItemIconStyled`, `MenuItemLabelStyled`, `MenuItemCheckStyled` — chúng inherit color từ parent
- Giữ nguyên **TẤT CẢ** styling logic hiện tại khi `ownerColorScheme` undefined
- Pattern: dùng `??` (nullish coalescing), KHÔNG dùng `||`

## Dependencies

- **01-menu-add-colorscheme-model** phải xong (cần import `MenuColorScheme`)
- **02-menu-wire-colorscheme-context** phải xong (consumer components đã truyền `ownerColorScheme` prop)

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Build PHẢI pass hoàn toàn — không còn type errors.

## Done Criteria

- [ ] Import `MenuColorScheme` trong `styled.tsx`
- [ ] `MenuContainerStyled` nhận `ownerColorScheme`, áp dụng `background` + `color`
- [ ] `MenuItemStyled` nhận `ownerColorScheme`, áp dụng đầy đủ 10 tokens
- [ ] `MenuItemShortcutStyled` nhận `ownerColorScheme`, áp dụng `secondaryColor`
- [ ] `MenuLabelStyled` nhận `ownerColorScheme`, áp dụng `secondaryColor`
- [ ] `MenuDividerStyled` nhận `ownerColorScheme`, áp dụng `dividerColor`
- [ ] `SubArrowStyled` nhận `ownerColorScheme`, áp dụng `secondaryColor`
- [ ] `PopoverSubContentStyled` nhận `ownerColorScheme`, áp dụng `popoverBg` + `popoverBorderColor`
- [ ] `npx nx build menu` pass successfully
- [ ] Tests pass
- [ ] File moved to `plan/tasks/done/`
