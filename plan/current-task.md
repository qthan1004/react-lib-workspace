# Current Task: Dropdown Library Setup

## 1. Recently Completed (Handoff Context)
- **Library:** `@thanh-libs/menu`
- **Features Completed:**
  - Refactored away from floating popovers to a **persistent list** (sidebar-style).
  - Implemented `MenuItem`, `MenuSub` (inline collapse/expand mode).
  - Added **Auto-expand**: `MenuItem` with `selected={true}` automatically expands parent sub-menus via context registration.
  - Added **Soft-select**: Parent `MenuSubTrigger` displays a subtle highlight when any child is active.
  - Reorganized Storybook stories under `Menu/Menu`.
- **Note:** The floating/popover behavior (e.g., e-commerce navbar) has been deferred to a new dedicated library (`@thanh-libs/dropdown`).

## 2. Immediate Next Steps
- [ ] Scaffold the new `@thanh-libs/dropdown` library.
- [ ] Implement `Dropdown` component utilizing `@floating-ui/react` (for positioning, auto-flip, roving focus).
- [ ] Ensure the Dropdown supports nested popovers, click/hover triggers, and portaled rendering.
- [ ] Write Storybook variants (Basic, Nested, Context Menu).
