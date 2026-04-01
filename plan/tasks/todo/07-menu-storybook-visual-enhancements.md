# Storybook Stories for Visual Enhancements

- **Goal**: Add Storybook stories showcasing all new visual enhancement features: child hover differentiation, select intensity, inline dot indicator, and active icon indicator.
- **Plan Reference**: `plan/menu/2026-04-01_enhance_v0.2.md` — All of Section ③

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/stories/Menu.stories.tsx` |

## What to Do

Add the following stories to the existing `Menu.stories.tsx` file. Place them after the existing stories.

### Story 1: `ActiveIndicatorDot`

Shows the default dot indicator on selected items:

```tsx
export const ActiveIndicatorDot: Story = {
  name: 'Active Indicator — Dot (Default)',
  render: () => (
    <Menu style={{ width: 260 }}>
      <MenuItem icon={<span>🏠</span>} selected>Dashboard</MenuItem>
      <MenuItem icon={<span>👤</span>}>Profile</MenuItem>
      <MenuItem icon={<span>⚙</span>}>Settings</MenuItem>
    </Menu>
  ),
};
```

### Story 2: `ActiveIndicatorBar`

Shows the bar variant:

```tsx
export const ActiveIndicatorBar: Story = {
  name: 'Active Indicator — Bar',
  render: () => (
    <Menu activeIndicator="bar" style={{ width: 260 }}>
      <MenuItem icon={<span>🏠</span>} selected>Dashboard</MenuItem>
      <MenuItem icon={<span>👤</span>}>Profile</MenuItem>
      <MenuItem icon={<span>⚙</span>}>Settings</MenuItem>
    </Menu>
  ),
};
```

### Story 3: `ActiveIndicatorOff`

Shows indicator disabled:

```tsx
export const ActiveIndicatorOff: Story = {
  name: 'Active Indicator — Off',
  render: () => (
    <Menu activeIndicator={false} style={{ width: 260 }}>
      <MenuItem icon={<span>🏠</span>} selected>Dashboard</MenuItem>
      <MenuItem icon={<span>👤</span>}>Profile</MenuItem>
    </Menu>
  ),
};
```

### Story 4: `InlineDotIndicator`

Shows inline dot bullets on SubContent children:

```tsx
export const InlineDotIndicator: Story = {
  name: 'Inline Dot Indicator',
  render: () => (
    <Menu showDot style={{ width: 280 }}>
      <MenuItem icon={<span>🏠</span>} selected>Dashboard</MenuItem>
      <MenuSub defaultOpen>
        <MenuSubTrigger icon={<span>📊</span>}>Analytics</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem>Overview</MenuItem>
          <MenuItem selected>Reports</MenuItem>
          <MenuItem>Exports</MenuItem>
        </MenuSubContent>
      </MenuSub>
      <MenuSub defaultOpen>
        <MenuSubTrigger icon={<span>⚙</span>}>Settings</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem>General</MenuItem>
          <MenuItem>Security</MenuItem>
        </MenuSubContent>
      </MenuSub>
    </Menu>
  ),
};
```

### Story 5: `VisualHierarchy`

Comprehensive story showing all visual enhancements together — hover differentiation, select intensity, dots, and active indicator:

```tsx
export const VisualHierarchy: Story = {
  name: 'Visual Hierarchy (All Enhancements)',
  render: () => (
    <Menu showDot style={{ width: 300 }}>
      <MenuItem icon={<span>🏠</span>} selected>Dashboard</MenuItem>
      <MenuItem icon={<span>📧</span>}>Messages</MenuItem>
      <MenuDivider />
      <MenuSub defaultOpen>
        <MenuSubTrigger icon={<span>📊</span>}>Analytics</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem>Overview</MenuItem>
          <MenuItem selected>Reports</MenuItem>
          <MenuItem>Exports</MenuItem>
        </MenuSubContent>
      </MenuSub>
      <MenuSub>
        <MenuSubTrigger icon={<span>⚙</span>}>Settings</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem>General</MenuItem>
          <MenuItem>Security</MenuItem>
          <MenuItem>Notifications</MenuItem>
        </MenuSubContent>
      </MenuSub>
      <MenuDivider />
      <MenuItem icon={<span>👤</span>}>Profile</MenuItem>
      <MenuItem icon={<span>🚪</span>} danger>Logout</MenuItem>
    </Menu>
  ),
};
```

### Story 6: `ActiveIndicatorBarWithDots`

Bar variant combined with inline dots:

```tsx
export const ActiveIndicatorBarWithDots: Story = {
  name: 'Bar Indicator + Inline Dots',
  render: () => (
    <Menu activeIndicator="bar" showDot style={{ width: 280 }}>
      <MenuItem icon={<span>🏠</span>} selected>Dashboard</MenuItem>
      <MenuSub defaultOpen>
        <MenuSubTrigger icon={<span>📊</span>}>Analytics</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem>Overview</MenuItem>
          <MenuItem selected>Reports</MenuItem>
        </MenuSubContent>
      </MenuSub>
    </Menu>
  ),
};
```

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Follow existing story patterns in the file
- Import any newly needed components (MenuDivider, MenuSub, etc.) — check what's already imported
- Use simple emoji icons for demo (keep consistent with existing stories)
- All story names should be descriptive and grouped logically

## Dependencies

- **03-menu-child-hover-differentiation** — hover styles must be implemented
- **04-menu-select-intensity-tuning** — select contrast must be tuned
- **05-menu-inline-dot-indicator** — dot indicator must be implemented
- **06-menu-active-icon-indicator** — active indicator must be implemented

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Optionally run Storybook to visually verify:
```bash
cd d:/workspace/react-lib-workspace && npx nx storybook menu
```

## Done Criteria

- [ ] 6 new stories added to `Menu.stories.tsx`
- [ ] Stories cover: dot indicator, bar indicator, indicator off, inline dots, visual hierarchy, combined features
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
