# Add Storybook Story — Custom Color Scheme

- **Goal**: Tạo Storybook story mới để demo và manually verify `colorScheme` prop với đầy đủ các states (normal, hover, active/selected, disabled, danger, soft-selected, sub-menu, divider, label).
- **Plan Reference**: `plan/2026-03-31_menu_v0.2.md` — section "Verification Plan → Manual Verification"

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/stories/Menu.stories.tsx` |

## What to Do

Thêm **1 story mới** vào cuối file `Menu.stories.tsx`:

### Story: `CustomColorScheme`

```tsx
export const CustomColorScheme: Story = {
  name: 'Custom Color Scheme',
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', backgroundColor: '#f5f5f5' }}>
      {/* Blue sidebar */}
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Blue Sidebar</h3>
        <Menu
          colorScheme={{
            background: '#1565c0',
            color: '#fff',
            hoverBg: 'rgba(255,255,255,0.12)',
            hoverColor: '#fff',
            activeBg: 'rgba(255,255,255,0.24)',
            activeColor: '#fff',
            softSelectedBg: 'rgba(255,255,255,0.08)',
            secondaryColor: 'rgba(255,255,255,0.7)',
            dividerColor: 'rgba(255,255,255,0.2)',
            focusRingColor: '#fff',
            dangerColor: '#ff8a80',
            dangerHoverBg: 'rgba(255,138,128,0.16)',
            disabledColor: 'rgba(255,255,255,0.38)',
          }}
          style={{ width: 260, borderRadius: 8 }}
        >
          <MenuLabel>Navigation</MenuLabel>
          <MenuItem icon={<span>🏠</span>}>Home</MenuItem>
          <MenuItem icon={<span>👤</span>} selected>Users</MenuItem>
          <MenuSub>
            <MenuSubTrigger icon={<span>⚙️</span>}>Settings</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>General</MenuItem>
              <MenuItem>Security</MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuDivider />
          <MenuItem disabled>Archived</MenuItem>
          <MenuItem danger>Delete Account</MenuItem>
        </Menu>
      </div>

      {/* Dark sidebar */}
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Dark Sidebar</h3>
        <Menu
          colorScheme={{
            background: '#1e1e2e',
            color: '#cdd6f4',
            hoverBg: 'rgba(205,214,244,0.08)',
            activeBg: 'rgba(137,180,250,0.2)',
            activeColor: '#89b4fa',
            softSelectedBg: 'rgba(137,180,250,0.08)',
            secondaryColor: 'rgba(205,214,244,0.5)',
            dividerColor: 'rgba(205,214,244,0.12)',
            focusRingColor: '#89b4fa',
            dangerColor: '#f38ba8',
            dangerHoverBg: 'rgba(243,139,168,0.12)',
            disabledColor: 'rgba(205,214,244,0.3)',
          }}
          style={{ width: 260, borderRadius: 8 }}
        >
          <MenuLabel>Workspace</MenuLabel>
          <MenuItem icon={<span>📁</span>}>Projects</MenuItem>
          <MenuItem icon={<span>📊</span>} selected>Analytics</MenuItem>
          <MenuSub>
            <MenuSubTrigger icon={<span>🔧</span>}>Tools</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Debugger</MenuItem>
              <MenuItem>Profiler</MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuDivider />
          <MenuItem disabled>Legacy Module</MenuItem>
          <MenuItem danger>Reset Workspace</MenuItem>
        </Menu>
      </div>

      {/* No colorScheme — default behavior */}
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Default (no colorScheme)</h3>
        <Menu style={{ width: 260, borderRadius: 8, border: '1px solid #e0e0e0' }}>
          <MenuLabel>Account</MenuLabel>
          <MenuItem icon={<span>👤</span>}>Profile</MenuItem>
          <MenuItem icon={<span>🔔</span>} selected>Notifications</MenuItem>
          <MenuSub>
            <MenuSubTrigger icon={<span>🎨</span>}>Theme</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>Light</MenuItem>
              <MenuItem>Dark</MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuDivider />
          <MenuItem disabled>Billing</MenuItem>
          <MenuItem danger>Log Out</MenuItem>
        </Menu>
      </div>
    </div>
  ),
};
```

### Lưu ý khi thêm story

- Đảm bảo các import cần thiết đã có ở đầu file: `Menu`, `MenuItem`, `MenuLabel`, `MenuDivider`, `MenuSub`, `MenuSubTrigger`, `MenuSubContent` (thường đã import sẵn từ các story khác)
- Story type `Story` thường đã được define ở đầu file (`type Story = StoryObj<typeof meta>` hoặc tương tự)
- Đặt story **SAU** tất cả story hiện tại

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- **KHÔNG** sửa bất kỳ story nào khác
- **KHÔNG** sửa source code — chỉ thêm story mới
- Sử dụng emoji icons thay vì import icon components (giữ story self-contained)

## Dependencies

- **01-menu-add-colorscheme-model** phải xong
- **02-menu-wire-colorscheme-context** phải xong
- **03-menu-apply-colorscheme-styled** phải xong
- (Tất cả 3 ticket trên phải xong thì story mới render đúng)

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

Manual: Mở Storybook, navigate tới story "Custom Color Scheme", verify:
- Sidebar xanh hiển thị đúng colors
- Sidebar tối hiển thị đúng colors
- Default menu hiển thị y hệt trước khi có feature
- Hover, selected, disabled, danger states hoạt động đúng trên cả 3 menus

## Done Criteria

- [ ] Story `CustomColorScheme` tồn tại trong `Menu.stories.tsx`
- [ ] Story render 3 menus cạnh nhau: Blue, Dark, Default
- [ ] Mỗi menu demo đầy đủ states: normal, selected, disabled, danger, sub-menu, divider, label
- [ ] Build pass
- [ ] File moved to `plan/tasks/done/`
