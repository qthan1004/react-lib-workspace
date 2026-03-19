# Dialog Modal — Size Presets & Custom Dimensions

## Review Summary

The dialog lib currently has a clean architecture:
- **Modal** — portal-based overlay with backdrop click, ESC key, focus trap, scroll lock, `keepMounted`
- **Portal** — `createPortal` wrapper
- **Styled** — `ModalBackdrop` (fixed fullscreen overlay) + `ModalContent` (centered, no size constraints)

**Current gap:** Modal has no built-in size control. Width/height is entirely determined by children content.

> **Note:** All viewport units use `dvh`/`dvw` (dynamic viewport) for correct behavior on mobile browsers where the address bar resizes the viewport.

---

## Proposed Changes

### Models

#### [MODIFY] [index.ts](file:///c:/Users/qthanh/Desktop/Workspace/react-lib-workspace/libs/dialog/src/lib/models/index.ts)

Add `size` and custom dimension props to `ModalProps`:

```diff
+export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

 export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
+  /** Preset size (default: 'sm') */
+  size?: ModalSize;
+  /** Custom width — overrides size preset width */
+  width?: string | number;
+  /** Custom height — overrides size preset height */
+  height?: string | number;
   // ...existing props
 }
```

---

### Constants

#### [MODIFY] [index.ts](file:///c:/Users/qthanh/Desktop/Workspace/react-lib-workspace/libs/dialog/src/lib/constants/index.ts)

Add size preset map using **dvh/dvw** units:

```typescript
export const MODAL_SIZES: Record<ModalSize, { width: string; maxHeight: string }> = {
  xs:         { width: '360px',   maxHeight: '80dvh' },
  sm:         { width: '480px',   maxHeight: '80dvh' },
  md:         { width: '640px',   maxHeight: '85dvh' },
  lg:         { width: '800px',   maxHeight: '90dvh' },
  xl:         { width: '1024px',  maxHeight: '90dvh' },
  fullscreen: { width: '100dvw',  maxHeight: '100dvh' },
};
```

---

### Styled Components

#### [MODIFY] [styled.tsx](file:///c:/Users/qthanh/Desktop/Workspace/react-lib-workspace/libs/dialog/src/lib/Modal/styled.tsx)

Update `ModalContent` to accept size/width/height props:

```diff
 interface ModalContentProps {
   ownerOpen: boolean;
+  ownerSize: ModalSize;
+  ownerWidth?: string | number;
+  ownerHeight?: string | number;
 }
```

- Apply `MODAL_SIZES[ownerSize].width` as `width` and `MODAL_SIZES[ownerSize].maxHeight` as `max-height`
- If `ownerWidth` provided → override `width`
- If `ownerHeight` provided → override `height` and remove `max-height`
- Special case `fullscreen`: `borderRadius: 0`, `width: 100dvw`, `height: 100dvh`
- Add `overflow-y: auto` for scrollable content

---

### Modal Component

#### [MODIFY] [index.tsx](file:///c:/Users/qthanh/Desktop/Workspace/react-lib-workspace/libs/dialog/src/lib/Modal/index.tsx)

- Destructure `size = 'sm'`, `width`, `height` from props
- Pass them to `ModalContent` as `ownerSize`, `ownerWidth`, `ownerHeight`

---

### Public Exports

#### [MODIFY] [index.ts](file:///c:/Users/qthanh/Desktop/Workspace/react-lib-workspace/libs/dialog/src/index.ts)

```diff
-export type { ModalProps, PortalProps } from './lib/models';
+export type { ModalProps, ModalSize, PortalProps } from './lib/models';
```

---

### Stories

#### [MODIFY] [Modal.stories.tsx](file:///c:/Users/qthanh/Desktop/Workspace/react-lib-workspace/libs/dialog/src/lib/stories/Modal.stories.tsx)

- Add **"Sizes"** story showing all preset sizes
- Update **Playground** story with `size`, `width`, `height` controls

---

## Verification Plan

### Visual Verification via Storybook (`localhost:6006`)
1. Story **"Dialog/Modal/Sizes"** — verify preset sizes display correct widths
2. Story **"Dialog/Modal/Playground"** — test:
   - Each size preset via controls
   - Custom `width` / `height` override
   - `fullscreen` fills entire viewport
