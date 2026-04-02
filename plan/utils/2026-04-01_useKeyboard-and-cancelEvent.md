# Utils Enhancement — `useKeyboard` Hook & `cancelEvent` Utility

## Workspace Paths

| Env | Root |
|-----|------|
| **Windows** | `d:/workspace/react-lib-workspace` |
| **Ubuntu** | `/home/administrator/back up/Personal lib` |

> Tất cả file paths trong plan dùng dạng relative từ root: `libs/utils/src/...`, `libs/menu/src/...`

## Tổng quan

Plan này triển khai phần **① Extract Keyboard Logic → `libs/utils`** từ [menu enhance v0.2](file:///d:/workspace/react-lib-workspace/plan/menu/2026-04-01_enhance_v0.2.md#L9-L78).

Chia thành **2 phase**:
- **Phase 1**: Pure move — chuyển code sang utils, không thay đổi behavior
- **Phase 2**: Enhance với Command Pattern + refactor consuming libs

### Decisions ✅

| Question | Decision |
|----------|----------|
| React peerDep cho utils | **Yes** — utils dành cho React libs |
| cancelEvent type | **`React.SyntheticEvent \| Event`** — dùng React types |
| Execution | **2 phases** — move trước, enhance sau |

---

## Phase 1: Pure Move

> Mục tiêu: Move `cancelEvent` + `useKeyboard` (as-is) sang `libs/utils`. Không thay đổi behavior, không refactor consumer.

---

### 1.1 `cancelEvent` → `libs/utils/functions`

#### [NEW] [cancelEvent.ts](file:///d:/workspace/react-lib-workspace/libs/utils/src/lib/functions/cancelEvent.ts)

Copy nguyên từ `libs/menu/helpers/index.ts`:

```typescript
import React from 'react';

/**
 * Stop event propagation and prevent default action.
 * Works with both React SyntheticEvent and native DOM Event.
 */
export const cancelEvent = (e: React.SyntheticEvent | Event): void => {
  e.stopPropagation();
  e.preventDefault();
};
```

#### [MODIFY] [functions/index.ts](file:///d:/workspace/react-lib-workspace/libs/utils/src/lib/functions/index.ts)

```diff
 export { pxToRem } from './pxToRem.js';
 export { alpha } from './alpha.js';
 export { textToColor } from './textToColor.js';
+export { cancelEvent } from './cancelEvent.js';
```

#### [NEW] [cancelEvent.spec.ts](file:///d:/workspace/react-lib-workspace/libs/utils/src/lib/functions/cancelEvent.spec.ts)

```typescript
import { describe, it, expect, vi } from 'vitest';
import { cancelEvent } from './cancelEvent';

describe('cancelEvent', () => {
  it('should call stopPropagation and preventDefault', () => {
    const event = { stopPropagation: vi.fn(), preventDefault: vi.fn() };
    cancelEvent(event as unknown as Event);
    expect(event.stopPropagation).toHaveBeenCalledOnce();
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });
});
```

---

### 1.2 `useKeyboard` → `libs/utils/hooks` (As-Is Move)

#### [NEW] [useKeyboard.ts](file:///d:/workspace/react-lib-workspace/libs/utils/src/lib/hooks/useKeyboard.ts)

Move logic từ `useMenuKeyboard.ts` — **giữ nguyên behavior**, chỉ generalize tên và bỏ menu-specific parts (typeahead):

```typescript
import { useEffect, useCallback } from 'react';

/** Options for useKeyboard hook */
export interface UseKeyboardOptions {
  /** Ref to the container element */
  containerRef: React.RefObject<HTMLElement>;
  /** Function to get focusable items */
  getItems: () => HTMLElement[];
  /** Custom keydown handler — receives items, currentIndex, and focus helper */
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLElement>,
    ctx: {
      items: HTMLElement[];
      currentIndex: number;
      focus: (item: HTMLElement) => void;
    }
  ) => void;
}

/**
 * Generic keyboard navigation hook with roving tabIndex.
 *
 * Handles:
 * - ArrowDown/ArrowUp — focus next/prev (wrapping)
 * - Home/End — focus first/last
 * - Focus delegation from container to active item
 * - Roving tabIndex management
 *
 * @param options - Configuration options
 * @returns { onKeyDown } handler to attach to container
 */
export const useKeyboard = (options: UseKeyboardOptions) => {
  const { containerRef, getItems, onKeyDown: customKeyDown } = options;

  const focus = useCallback((item: HTMLElement) => {
    getItems().forEach((el) => { el.tabIndex = -1; });
    item.tabIndex = 0;
    item.focus();
  }, [getItems]);

  // Initialization: set first item's tabIndex to 0
  useEffect(() => {
    const items = getItems();
    if (items.length > 0) {
      const activeItem = items.find((el) => el.tabIndex === 0) || items[0];
      activeItem.tabIndex = 0;
    }
  }, [getItems]);

  // Handle focus delegation from container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleFocusIn = (e: FocusEvent) => {
      if (e.target === container) {
        const items = getItems();
        if (items.length > 0) {
          const focusTarget = items.find((el) => el.tabIndex === 0) || items[0];
          focus(focusTarget);
        }
      }
    };

    container.addEventListener('focusin', handleFocusIn);
    return () => container.removeEventListener('focusin', handleFocusIn);
  }, [containerRef, getItems, focus]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (!containerRef.current?.contains(e.target as Node)) return;

    const items = getItems();
    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        focus(items[(currentIndex + 1) % items.length]);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focus(items[(currentIndex - 1 + items.length) % items.length]);
        break;
      case 'Home':
        e.preventDefault();
        focus(items[0]);
        break;
      case 'End':
        e.preventDefault();
        focus(items[items.length - 1]);
        break;
      default:
        // Delegate to custom handler for unmatched keys
        if (customKeyDown) {
          customKeyDown(e, { items, currentIndex, focus });
        }
        break;
    }
  }, [containerRef, getItems, focus, customKeyDown]);

  return { onKeyDown, focus };
};
```

#### [MODIFY] [hooks/index.ts](file:///d:/workspace/react-lib-workspace/libs/utils/src/lib/hooks/index.ts)

```diff
-export {};
+export { useKeyboard } from './useKeyboard.js';
+export type { UseKeyboardOptions } from './useKeyboard.js';
```

---

### 1.3 Package Config

#### [MODIFY] [utils/package.json](file:///d:/workspace/react-lib-workspace/libs/utils/package.json)

```diff
+  "peerDependencies": {
+    "react": ">=18"
+  },
   "devDependencies": {
+    "react": "^19.2.0",
     "@types/node": "20.19.9",
```

---

### 1.4 Phase 1 — File Summary

| Action | File | Description |
|--------|------|-------------|
| **NEW** | `libs/utils/src/lib/functions/cancelEvent.ts` | Event cancel utility |
| **NEW** | `libs/utils/src/lib/functions/cancelEvent.spec.ts` | Unit test |
| **NEW** | `libs/utils/src/lib/hooks/useKeyboard.ts` | Generic keyboard nav (as-is move) |
| **MODIFY** | `libs/utils/src/lib/functions/index.ts` | Add cancelEvent export |
| **MODIFY** | `libs/utils/src/lib/hooks/index.ts` | Add useKeyboard export + type |
| **MODIFY** | `libs/utils/package.json` | Add react peerDep + devDep |

### 1.5 Phase 1 — Verification

```bash
# Build utils
cd libs/utils && npx vite build

# Run utils tests
cd libs/utils && npx vitest run
```

> [!IMPORTANT]
> Phase 1 **KHÔNG** sửa `libs/menu`. Menu vẫn dùng `useMenuKeyboard` nội bộ, `cancelEvent` nội bộ. Không break gì.

---

## Phase 2: Enhance + Refactor Consumers

> Mục tiêu: Upgrade `useKeyboard` lên Command Pattern, refactor `useMenuKeyboard` thành thin wrapper, move `cancelEvent` import sources.

---

### 2.1 Enhance `useKeyboard` → Command Pattern

#### [MODIFY] [useKeyboard.ts](file:///d:/workspace/react-lib-workspace/libs/utils/src/lib/hooks/useKeyboard.ts)

Thêm types & refactor sang Command Pattern:

```typescript
// ─── Types ───────────────────────────────────────────────────

/** Context passed to each command's execute function */
export interface KeyboardContext {
  event: React.KeyboardEvent<HTMLElement>;
  items: HTMLElement[];
  currentIndex: number;
  focus: (item: HTMLElement) => void;
  focusRelative: (offset: number) => void;
  focusFirst: () => void;
  focusLast: () => void;
}

/** A single keyboard command definition */
export interface KeyboardCommand {
  key: string | string[];
  modifiers?: { ctrl?: boolean; shift?: boolean; alt?: boolean; meta?: boolean };
  execute: (ctx: KeyboardContext) => void;
  enabled?: boolean | (() => boolean);
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

/** Configuration for useKeyboard */
export interface UseKeyboardOptions {
  containerRef: React.RefObject<HTMLElement>;
  getItems: () => HTMLElement[];
  rovingTabIndex?: boolean;           // default: true
  fallback?: (ctx: KeyboardContext) => void;
}

// ─── Hook ────────────────────────────────────────────────────

export const useKeyboard = (
  commands: KeyboardCommand[],
  options: UseKeyboardOptions
) => { /* Command matching + context building */ };
```

> [!NOTE]
> API signature thay đổi: `useKeyboard(options)` → `useKeyboard(commands, options)`. Vì Phase 1 chưa có consumer ngoài utils test, breaking change limited.

---

### 2.2 Menu Refactor

#### [NEW] [useMenuTypeahead.ts](file:///d:/workspace/react-lib-workspace/libs/menu/src/lib/hooks/useMenuTypeahead.ts)

Extract typeahead logic (menu-specific).

#### [MODIFY] [useMenuKeyboard.ts](file:///d:/workspace/react-lib-workspace/libs/menu/src/lib/hooks/useMenuKeyboard.ts)

Thin wrapper composing `useKeyboard` + typeahead:

```typescript
import { useKeyboard, KeyboardCommand } from '@thanh-libs/utils';
import { getVisibleMenuItems } from '../helpers';
import { useMenuTypeahead } from './useMenuTypeahead';

const menuCommands: KeyboardCommand[] = [
  { key: 'ArrowDown', execute: (ctx) => ctx.focusRelative(+1) },
  { key: 'ArrowUp',   execute: (ctx) => ctx.focusRelative(-1) },
  { key: 'Home',      execute: (ctx) => ctx.focusFirst() },
  { key: 'End',       execute: (ctx) => ctx.focusLast() },
];

export const useMenuKeyboard = (containerRef: React.RefObject<HTMLDivElement>) => {
  const typeaheadFallback = useMenuTypeahead();
  // ... compose useKeyboard(menuCommands, { containerRef, getItems, fallback: typeaheadFallback })
};
```

#### [MODIFY] [menu/helpers/index.ts](file:///d:/workspace/react-lib-workspace/libs/menu/src/lib/helpers/index.ts)

```diff
-export const cancelEvent = (e: React.SyntheticEvent | Event) => { ... };
+// Re-export from utils
+export { cancelEvent } from '@thanh-libs/utils';
```

#### [MODIFY] [menu/package.json](file:///d:/workspace/react-lib-workspace/libs/menu/package.json)

```diff
   "peerDependencies": {
+    "@thanh-libs/utils": "*",
   },
   "devDependencies": {
+    "@thanh-libs/utils": "*",
```

---

### 2.3 Phase 2 — File Summary

| Action | File | Description |
|--------|------|-------------|
| **MODIFY** | `libs/utils/src/lib/hooks/useKeyboard.ts` | Upgrade to Command Pattern |
| **MODIFY** | `libs/utils/src/lib/hooks/index.ts` | Export new types |
| **NEW** | `libs/utils/src/lib/hooks/useKeyboard.spec.ts` | Full test suite |
| **NEW** | `libs/menu/src/lib/hooks/useMenuTypeahead.ts` | Extract typeahead |
| **MODIFY** | `libs/menu/src/lib/hooks/useMenuKeyboard.ts` | Thin wrapper |
| **MODIFY** | `libs/menu/src/lib/helpers/index.ts` | Re-export cancelEvent |
| **MODIFY** | `libs/menu/package.json` | Add @thanh-libs/utils dep |

### 2.4 Phase 2 — Verification

```bash
# Build + test both
cd libs/utils && npx vite build && npx vitest run
cd libs/menu && npx vite build && npx vitest run
```

Storybook manual test:
- Keyboard nav (ArrowDown/Up/Home/End)
- Typeahead search
- Popover sub-menu keyboard
- Focus delegation

---

## Complexity & Risk

| Aspect | Phase 1 | Phase 2 |
|--------|---------|---------|
| Complexity | **Low** — pure copy | **Medium** — Command Pattern + refactor |
| Breaking change | **None** — additive only | **None** — `useMenuKeyboard` API giữ nguyên |
| Risk | **None** | **Low** — pure refactoring |
| Scope | utils only | utils + menu |
