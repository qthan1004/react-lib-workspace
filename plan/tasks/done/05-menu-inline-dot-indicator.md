# Inline Dot Indicator for SubContent Children

- **Goal**: Add optional dot bullet indicators (via CSS `::before` pseudo-element) to child items inside inline SubContent. Dots are outlined by default, filled on hover and when selected (`aria-current="page"`).
- **Plan Reference**: `plan/menu/2026-04-01_enhance_v0.2.md` — Section ③C

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/styled.tsx` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/components/MenuSubContentInline.tsx` |

## What to Do

### 1. `styled.tsx` — Add dot pseudo-element CSS to `InlineSubContentStyled`

**Add `ownerShowDot` prop** to `InlineSubContentStyledProps`:
```typescript
interface InlineSubContentStyledProps {
  ownerOpen: boolean;
  ownerColorScheme?: MenuColorScheme;  // added by ticket 03
  ownerShowDot?: boolean;              // NEW
}
```

**Add dot CSS** inside the return object, conditionally based on `ownerShowDot`:

```typescript
// Inline dot bullets for child items
...(ownerShowDot && {
  '& > [role="menuitem"]': {
    '&::before': {
      content: '""',
      display: 'inline-block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      border: `1.5px solid ${ownerColorScheme?.dotColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.4)'}`,
      backgroundColor: 'transparent',
      marginRight: spacing?.small ?? '0.5rem',
      flexShrink: 0,
      transition: 'background-color 150ms, border-color 150ms',
    },

    // Hover → fill dot
    '&:hover::before': {
      backgroundColor: ownerColorScheme?.dotColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.4)',
      borderColor: ownerColorScheme?.dotColor ?? palette?.text?.secondary ?? 'rgba(0,0,0,0.4)',
    },

    // Selected → fill dot with active color
    '&[aria-current="page"]::before': {
      backgroundColor: ownerColorScheme?.dotActiveColor ?? palette?.primary?.main ?? '#1976d2',
      borderColor: ownerColorScheme?.dotActiveColor ?? palette?.primary?.main ?? '#1976d2',
    },
  },
}),
```

**Important**: This dot CSS block needs access to `palette` and `spacing` from `useTheme()`. The `InlineSubContentStyled` currently calls `useTheme()` to get `spacing`. Update to also destructure `palette`:
```typescript
const { spacing, palette }: ThemeSchema = useTheme();
```

**Note on merge with ticket 03**: Ticket 03 adds a `'& > [role="menuitem"]'` block for child hover. The dot CSS here also uses `'& > [role="menuitem"]'`. If ticket 03 is done first, **merge** both into the same `'& > [role="menuitem"]'` block by combining the hover and `::before` rules. Structure:

```typescript
'& > [role="menuitem"]': {
  // From ticket 03: child hover
  '&:hover': { ... },
  // From ticket 05: dot pseudo-element
  ...(ownerShowDot && {
    '&::before': { ... },
    '&:hover::before': { ... },
    '&[aria-current="page"]::before': { ... },
  }),
},
```

### 2. `MenuSubContentInline.tsx` — Pass `showDot` from context

Read `showDot` from context and pass to styled:

```typescript
const { colorScheme, showDot } = useMenuContext();

<InlineSubContentStyled
  ...existing props...
  ownerShowDot={showDot}
>
```

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Dot is OPTIONAL — only rendered when `showDot` is true from Menu context
- Dot uses `::before` pseudo-element — do NOT create a separate React component for dots
- Dot size: `width: 6, height: 6, borderRadius: '50%', border: 1.5px`
- Use `ownerColorScheme?.dotColor` for border, `ownerColorScheme?.dotActiveColor` for selected fill
- Only apply to direct children (`& >`)

## Dependencies

- **02-menu-extend-colorscheme-props** must be done first (adds `dotColor`, `dotActiveColor`, `showDot`)
- **03-menu-child-hover-differentiation** should ideally be done first (to merge CSS blocks cleanly)

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

## Done Criteria

- [ ] `InlineSubContentStyled` has `ownerShowDot` prop
- [ ] Dot `::before` pseudo-element renders when `ownerShowDot` is true
- [ ] Dot is outlined by default, filled on hover, filled with active color when `aria-current="page"`
- [ ] `MenuSubContentInline.tsx` reads `showDot` from context
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
