# Add Dependencies, Types & Constants for Popover Sub-menu

- **Goal**: Thêm dependencies (`@thanh-libs/dialog`, `@floating-ui/react`), các type mới (`MenuSubMode`, `MenuDisplay`, `MenuSubTriggerType`), và constants cho popover sub-menu.
- **Plan Reference**: `plan/2026-03-30_menu_sub-flying_v0.1.md` — Sections 1, 2, 9

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/package.json` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/models/index.ts` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/constants/index.ts` |
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/index.ts` |

## What to Do

### 1. package.json — thêm dependencies

Thêm vào `peerDependencies`:
```json
"@thanh-libs/dialog": "*",
"@floating-ui/react": ">=0.27.0"
```

Thêm vào `devDependencies`:
```json
"@thanh-libs/dialog": "*",
"@floating-ui/react": "^0.27.0"
```

### 2. models/index.ts — thêm types

Thêm các type aliases VÀ cập nhật interfaces:

```ts
/** Sub-menu display mode */
export type MenuSubMode = 'inline' | 'popover';

/** Menu display mode */
export type MenuDisplay = 'default' | 'icon';

/** Popover sub-menu trigger type */
export type MenuSubTriggerType = 'hover' | 'click';
```

Cập nhật `MenuProps`:
- Thêm `mode?: MenuSubMode` — default sub-menu mode cho tất cả MenuSub con
- Thêm `display?: MenuDisplay` — icon-only mode

Cập nhật `MenuSubProps`:
- Thêm `mode?: MenuSubMode` — override parent, priority con > cha
- Thêm `trigger?: MenuSubTriggerType` — chỉ cho popover mode, 'click' = bấm mới mở

Cập nhật `MenuSubContentProps`:
- Thêm `placement?: import('@floating-ui/react').Placement` — chỉ popover mode, default 'right-start'
- Thêm `offset?: number` — chỉ popover mode, default 4

### 3. constants/index.ts — thêm constants

Thêm các constants mới (giữ nguyên `SUB_OPEN_DELAY` đã có):

```ts
/** Close delay for popover sub-menu (ms) */
export const SUB_CLOSE_DELAY = 150;

/** Min width for popover sub-menu content (px) */
export const POPOVER_MIN_WIDTH = 160;

/** Z-index for popover sub-menu */
export const POPOVER_Z_INDEX = 1300;
```

### 4. index.ts (src root) — thêm exports

Thêm export các type mới:
```ts
export type {
  // ... existing ...
  MenuSubMode,
  MenuDisplay,
  MenuSubTriggerType,
} from './lib/models';
```

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- KHÔNG thay đổi logic hay component code — chỉ types, constants, và package.json
- Import Placement type dùng `import type` (type-only import)

## Dependencies

- None — đây là ticket đầu tiên

## Verification

```bash
cd "/home/administrator/back up/Personal lib" && npm install
cd "/home/administrator/back up/Personal lib/libs/menu" && npx tsc --noEmit
```

## Done Criteria

- [ ] package.json có `@thanh-libs/dialog` và `@floating-ui/react` trong peer + dev deps
- [ ] models/index.ts có 3 type aliases mới + updated interfaces
- [ ] constants/index.ts có 3 constants mới
- [ ] index.ts export 3 type aliases mới
- [ ] TypeScript compiles without errors
- [ ] File moved to `plan/tasks/done/`
