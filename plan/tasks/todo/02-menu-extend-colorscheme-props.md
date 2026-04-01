# Extend ColorScheme Model & Menu Props

- **Goal**: Add new color fields to `MenuColorScheme` and new props (`activeIndicator`, `showDot`) to `MenuProps`/`MenuContextValue` to support upcoming visual enhancements (dot indicator, child hover, active icon).
- **Plan Reference**: `plan/menu/2026-04-01_enhance_v0.2.md` — Section ③ ColorScheme Extension + Section ③D API Design

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/models/index.ts` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/hooks/useMenuContext.ts` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/components/Menu.tsx` |

## What to Do

### 1. `models/index.ts` — Add new types and fields

**Add new type** (before `MenuProps`):
```typescript
/** Active indicator variant for selected menu items */
export type MenuActiveIndicator = 'dot' | 'bar' | false | ReactNode;
```

**Extend `MenuColorScheme`** — add these fields at the end of the interface:
```typescript
/** Dot indicator color for inline sub-content children (border color) */
dotColor?: string;
/** Dot indicator active/filled color */
dotActiveColor?: string;
/** Child item hover text color (items inside SubContent) */
childHoverColor?: string;
/** Child item hover background color (items inside SubContent) */
childHoverBg?: string;
/** Active indicator icon color (parent items — dot/bar border + fill) */
activeIconColor?: string;
```

**Extend `MenuProps`** — add these props:
```typescript
/**
 * Active indicator on selected items.
 * - 'dot' (default): filled dot beside selected item
 * - 'bar': vertical bar beside selected item
 * - false: disable indicator
 * - ReactNode: custom indicator element
 */
activeIndicator?: MenuActiveIndicator;
/** Show inline dot bullets on child items inside SubContent. Default: false */
showDot?: boolean;
```

### 2. `hooks/useMenuContext.ts` — Add to context

**Extend `MenuContextValue`** interface — add:
```typescript
/** Active indicator configuration */
activeIndicator?: MenuActiveIndicator;
/** Show inline dot for SubContent children */
showDot?: boolean;
```

Import `MenuActiveIndicator` from `'../models'`.

### 3. `components/Menu.tsx` — Wire props to context

**Destructure new props** in component signature (line 31):
Add `activeIndicator = 'dot'` and `showDot = false` to destructured props.

**Pass to context** in `useMemo` (line 45-47):
```typescript
() => ({ dense, mode, display, trigger, floatingSettings, colorScheme, activeIndicator, showDot }),
[dense, mode, display, trigger, floatingSettings, colorScheme, activeIndicator, showDot],
```

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- This is MODEL-ONLY — do NOT implement any visual rendering or CSS changes
- All new fields are optional — existing behavior is preserved
- `activeIndicator` defaults to `'dot'` (plan says mặc định BẬT)
- `showDot` defaults to `false`

## Dependencies

- None

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

## Done Criteria

- [ ] `MenuActiveIndicator` type exported from `models/index.ts`
- [ ] `MenuColorScheme` has 5 new optional fields
- [ ] `MenuProps` has `activeIndicator` and `showDot` props
- [ ] `MenuContextValue` has `activeIndicator` and `showDot`
- [ ] `Menu.tsx` destructures and passes new props to context with correct defaults
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
