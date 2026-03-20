# Dialog Library — Roadmap

## Phase 1: Modal ✅

Implement Modal component **không dùng 3rd party** (floating-ui).

- [x] Portal — `createPortal` wrapper
- [x] Modal — overlay, backdrop click, ESC key, focus trap, scroll lock, `keepMounted`
- [x] Size presets (xs/sm/md/lg/xl/fullscreen) + custom width/height
- [x] Storybook stories

## Phase 2: Popover & Tooltip (Floating UI)

Implement **positioning hook** dùng `@floating-ui/react` để tính vị trí cho Popover và Tooltip.

- [x] Tích hợp `@floating-ui/react`
- [x] Hook `useFloatingPosition` — placement, offset, flip, shift, arrow, fixed size
- [ ] Popover component — click-triggered floating panel
- [ ] Tooltip component — hover-triggered floating label
- [ ] Storybook stories
