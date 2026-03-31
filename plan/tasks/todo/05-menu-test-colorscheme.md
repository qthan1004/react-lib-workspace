# Unit Tests — ColorScheme Feature

- **Goal**: Viết Vitest unit tests để verify các styled components render đúng color khi có/không `ownerColorScheme`, đảm bảo priority chain `colorScheme → palette → fallback` hoạt động chính xác.
- **Plan Reference**: `plan/2026-03-31_menu_v0.2.md` — section "Verification Plan → Automated Tests"

## Files

| Action | Path |
|--------|------|
| NEW | `d:/workspace/react-lib-workspace/libs/menu/tests/ColorScheme.spec.tsx` |

## What to Do

### 1. Test `MenuContainerStyled` với colorScheme

- Render `<Menu colorScheme={{ background: '#1565c0', color: '#fff' }}>` → verify container có đúng backgroundColor và color
- Render `<Menu>` (không truyền colorScheme) → verify giữ nguyên default palette/fallback

### 2. Test `MenuItemStyled` với các token

Test các case:
- **Normal item** với `colorScheme.color` → text color đúng
- **Hover state** với `colorScheme.hoverBg` + `colorScheme.hoverColor` → hover styles đúng
- **Selected item** với `colorScheme.activeBg` + `colorScheme.activeColor` → selected styles đúng
- **Disabled item** với `colorScheme.disabledColor` → disabled color đúng
- **Danger item** với `colorScheme.dangerColor` + `colorScheme.dangerHoverBg` → danger styles đúng
- **Soft-selected** (parent trigger) với `colorScheme.softSelectedBg` → background đúng
- **Focus ring** với `colorScheme.focusRingColor` → box-shadow chứa đúng color

### 3. Test secondary styled components

- `MenuItemShortcutStyled` → `colorScheme.secondaryColor` applied
- `MenuLabelStyled` → `colorScheme.secondaryColor` applied
- `SubArrowStyled` → `colorScheme.secondaryColor` applied
- `MenuDividerStyled` → `colorScheme.dividerColor` applied

### 4. Test `PopoverSubContentStyled`

- `colorScheme.popoverBg` → backgroundColor đúng
- `colorScheme.popoverBorderColor` → border color đúng

### 5. Test partial colorScheme

- Truyền colorScheme chỉ có 1-2 fields → các field không set phải fallback về palette/hardcoded
- Truyền `colorScheme={}` (empty) → hoạt động y hệt không truyền

## Constraints

- Đọc skill: `.agent/skills/testing-patterns/SKILL.md`
- Dùng `@testing-library/react` + `vitest`
- Test rendered CSS properties (dùng `getComputedStyle` hoặc check class/style attributes tùy setup)
- KHÔNG test visual appearance — chỉ test CSS values được apply đúng
- Pattern cho testing styled-components: render component → query DOM → check style

## Dependencies

- **01-menu-add-colorscheme-model** phải xong
- **02-menu-wire-colorscheme-context** phải xong
- **03-menu-apply-colorscheme-styled** phải xong
- **04-menu-storybook-colorscheme** phải xong + reviewed

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx test menu
```

## Done Criteria

- [ ] File `ColorScheme.spec.tsx` tồn tại
- [ ] Test cover `MenuContainerStyled` với/không colorScheme
- [ ] Test cover `MenuItemStyled` đầy đủ 10 tokens
- [ ] Test cover secondary styled components (Shortcut, Label, Arrow, Divider)
- [ ] Test cover `PopoverSubContentStyled` (popoverBg, popoverBorderColor)
- [ ] Test cover partial colorScheme (fallback behavior)
- [ ] All tests pass
- [ ] File moved to `plan/tasks/done/`
