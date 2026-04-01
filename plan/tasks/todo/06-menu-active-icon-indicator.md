# Active Icon Indicator (Trailing)

- **Goal**: Add a trailing indicator (dot or bar) on selected `MenuItem` components. 2 built-in variants (`'dot'` default, `'bar'`), custom ReactNode override supported. Only shown when `selected={true}`.
- **Plan Reference**: `plan/menu/2026-04-01_enhance_v0.2.md` — Section ③D

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/styled.tsx` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/components/MenuItem.tsx` |

## What to Do

### 1. `styled.tsx` — Add indicator styled components

**Add at the bottom of the file** (after `PopoverSubContentStyled`):

```typescript
/* ─── Active Indicator (trailing) ─────────────────────────── */

interface ActiveIndicatorStyledProps {
  ownerColorScheme?: MenuColorScheme;
}

export const MenuItemIndicatorStyled = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: '0.5rem',
  flexShrink: 0,
});

export const DotIndicatorStyled = styled.span<ActiveIndicatorStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();
    const indicatorColor = ownerColorScheme?.activeIconColor
      ?? palette?.primary?.main ?? '#1976d2';

    return {
      display: 'inline-block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: indicatorColor,
      transition: 'background-color 150ms',
    };
  },
);

export const BarIndicatorStyled = styled.span<ActiveIndicatorStyledProps>(
  ({ ownerColorScheme }): CSSObject => {
    const { palette }: ThemeSchema = useTheme();
    const indicatorColor = ownerColorScheme?.activeIconColor
      ?? palette?.primary?.main ?? '#1976d2';

    return {
      display: 'inline-block',
      width: 3,
      height: 16,
      borderRadius: 1.5,
      backgroundColor: indicatorColor,
      transition: 'background-color 150ms',
    };
  },
);
```

**Design note**: Since the indicator ONLY renders when `selected={true}`, it's always in "filled" state — no need for outlined/empty state. This simplifies the styled component significantly (no `ownerActive` prop needed).

### 2. `MenuItem.tsx` — Render trailing indicator

**Add imports:**
```typescript
import {
  MenuItemStyled,
  MenuItemIconStyled,
  MenuItemLabelStyled,
  MenuItemShortcutStyled,
  MenuItemCheckStyled,
  MenuItemIndicatorStyled,     // NEW
  DotIndicatorStyled,          // NEW
  BarIndicatorStyled,          // NEW
} from '../styled';
```

**Read `activeIndicator` from context** (line 34):
```typescript
const { dense, display, colorScheme, activeIndicator } = useMenuContext();
```

**Add render helper** (inside the component, before the return):
```typescript
const renderIndicator = () => {
  if (!selected || activeIndicator === false || isIconOnly) return null;

  // Custom ReactNode
  if (
    activeIndicator !== 'dot' &&
    activeIndicator !== 'bar' &&
    activeIndicator !== undefined
  ) {
    return (
      <MenuItemIndicatorStyled>{activeIndicator}</MenuItemIndicatorStyled>
    );
  }

  // Built-in variants
  const variant = activeIndicator ?? 'dot';
  const IndicatorComponent = variant === 'bar' ? BarIndicatorStyled : DotIndicatorStyled;

  return (
    <MenuItemIndicatorStyled>
      <IndicatorComponent ownerColorScheme={colorScheme} />
    </MenuItemIndicatorStyled>
  );
};
```

**Remove the existing check mark** (line 80-82):
```tsx
// REMOVE this:
{selected && !isIconOnly && (
  <MenuItemCheckStyled aria-hidden="true">✓</MenuItemCheckStyled>
)}
```

**Add indicator at the END** of MenuItem's children (after shortcut, before closing `</MenuItemStyled>`):
```tsx
{icon && <MenuItemIconStyled aria-hidden="true">{icon}</MenuItemIconStyled>}
<MenuItemLabelStyled ownerIconOnly={isIconOnly}>{children}</MenuItemLabelStyled>
{shortcut && !isIconOnly && <MenuItemShortcutStyled ownerColorScheme={colorScheme}>{shortcut}</MenuItemShortcutStyled>}
{renderIndicator()}
```

**Note**: The existing check mark (`✓`) on the LEFT is replaced by the indicator on the RIGHT. The `MenuItemCheckStyled` import and usage can be removed (or kept for backward compat, but plan says to replace with trailing indicator).

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Indicator is TRAILING (right side) — not leading
- Only renders when `selected={true}` AND `activeIndicator !== false` AND `!isIconOnly`
- `MenuSubTrigger` is a separate component and does NOT use `MenuItem` — so this naturally doesn't affect sub-triggers
- Default `activeIndicator` is `'dot'` (set in Menu.tsx by ticket 02)
- Dot: `6×6, borderRadius: 50%, filled`
- Bar: `3×16, borderRadius: 1.5, filled`
- Color resolves: `colorScheme.activeIconColor → palette.primary.main → '#1976d2'`

## Dependencies

- **02-menu-extend-colorscheme-props** must be done first (adds `activeIndicator` to context, `activeIconColor` to colorScheme)

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

## Done Criteria

- [ ] `DotIndicatorStyled`, `BarIndicatorStyled`, `MenuItemIndicatorStyled` exist in `styled.tsx`
- [ ] `MenuItem` renders trailing indicator when `selected={true}`
- [ ] Old check mark (`✓`) is removed from MenuItem
- [ ] Supports `'dot'`, `'bar'`, `false`, and custom `ReactNode`
- [ ] Indicator does not render on icon-only mode
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
