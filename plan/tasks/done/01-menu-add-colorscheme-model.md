# Add MenuColorScheme Interface & Model Integration

- **Goal**: Define the `MenuColorScheme` interface trong models, thêm prop `colorScheme` vào `MenuProps`, thêm vào `MenuContextValue`, và export type từ public barrel.
- **Plan Reference**: `plan/2026-03-31_menu_v0.2.md` — sections "Interface", "Models", "Context", "Exports"

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/models/index.ts` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/hooks/useMenuContext.ts` |
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/index.ts` |

## What to Do

### 1. `models/index.ts` — Thêm interface + prop

Thêm interface `MenuColorScheme` **trước** block `MenuProps`:

```typescript
/** Color scheme for customizing menu appearance via raw CSS color strings */
export interface MenuColorScheme {
  /** Menu container background */
  background?: string;
  /** Default text color */
  color?: string;

  /** Hover state */
  hoverBg?: string;
  hoverColor?: string;

  /** Active/selected item */
  activeBg?: string;
  activeColor?: string;

  /** Soft-selected (parent trigger of active child) */
  softSelectedBg?: string;

  /** Danger item */
  dangerColor?: string;
  dangerHoverBg?: string;

  /** Disabled text */
  disabledColor?: string;

  /** Secondary text (labels, shortcuts, arrows) */
  secondaryColor?: string;

  /** Divider line */
  dividerColor?: string;

  /** Focus ring color */
  focusRingColor?: string;

  /** Popover sub-menu background (nếu mode='popover') */
  popoverBg?: string;
  /** Popover border color */
  popoverBorderColor?: string;
}
```

Thêm prop vào `MenuProps`:

```typescript
/** Custom color scheme — raw CSS color strings, partial fill */
colorScheme?: MenuColorScheme;
```

### 2. `hooks/useMenuContext.ts` — Thêm vào context value

- Import `MenuColorScheme` from `'../models'`
- Thêm field `colorScheme?: MenuColorScheme` vào `MenuContextValue` interface

### 3. `src/index.ts` — Export type

Thêm `MenuColorScheme` vào block `export type { ... } from './lib/models'`

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- **KHÔNG** sửa bất kỳ component nào — chỉ types/models/context/exports
- Giữ nguyên tất cả code hiện tại, chỉ thêm mới
- Dùng `export interface` (không dùng `type alias`)

## Dependencies

- None — đây là ticket đầu tiên

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

## Done Criteria

- [ ] `MenuColorScheme` interface tồn tại trong `models/index.ts` với đầy đủ 15 optional fields
- [ ] `MenuProps` có prop `colorScheme?: MenuColorScheme`
- [ ] `MenuContextValue` có field `colorScheme?: MenuColorScheme`
- [ ] `MenuColorScheme` được export từ `src/index.ts`
- [ ] Build pass
- [ ] File moved to `plan/tasks/done/`
