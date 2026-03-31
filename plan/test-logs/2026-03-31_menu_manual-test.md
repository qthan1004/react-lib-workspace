# Manual Test Log: Menu

**Date:** 2026-03-31
**Lib:** `@thanh-libs/menu`
**Version:** `0.0.1`
**Storybook:** http://localhost:6006
**Tester:** AI Agent

## Summary

| Total | ✅ Pass | ❌ Fail | ⚠️ Warning |
|-------|---------|---------|------------|
| 35    | 27      | 4       | 4          |

## Test Results

### 1. Basic
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Render 3 items       | ✅     | Home, Profile, Settings visible |
| 2 | Click handler fires  | ✅     | Console logs confirmed |
| 3 | Hover effects        | ✅     | Visual feedback on hover |

### 2. States
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Selected highlight   | ✅     | "Users" has ✓ checkmark and highlight |
| 2 | Disabled no-click    | ✅     | "Admin (restricted)" dimmed, doesn't respond |
| 3 | Danger style         | ✅     | "Logout" renders in red/danger |
| 4 | Divider visible      | ✅     | Between active and restricted sections |

### 3. Grouped
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Group labels render  | ✅     | "NAVIGATION" and "ACCOUNT" visible |
| 2 | Items grouped        | ✅     | Correct items in each group |
| 3 | Divider between groups | ✅   |                    |

### 4. Sub-menus (Inline)
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Expand/collapse toggle | ✅   | Click triggers toggle |
| 2 | Selected state in sub-menu | ✅ | ✓ Reports selected |
| 3 | Multiple sub-menus   | ✅     | Analytics + Settings both work |

### 5. Nested Sub-menus
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | 3-level nesting      | ✅     | Projects > By Team > Frontend/Backend/DevOps |
| 2 | Expand/collapse all levels | ✅ |                    |

### 6. Auto-expand (selected)
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Parent auto-expands  | ✅     | "Backend" selected → Projects & By Team auto-expand |
| 2 | Collapsed sub stays collapsed | ✅ | Settings wasn't opened |
| 3 | Sub doesn't auto-collapse on deselect | ⚠️ | By design — auto-expand only opens, doesn't close |

### 7. Dense
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Compact spacing      | ✅     | Noticeably tighter vertical spacing |
| 2 | Sub-menu works       | ✅     | Settings > General/Security works |

### 8. Max Height
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Scroll container     | ✅     | Scrollbar visible, maxHeight=250 constrains |
| 2 | All 20 items accessible | ✅  | Scrolled to Items 10-16 |

### 9. Keyboard Navigation
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | ArrowDown            | ✅     | Focus moves down sequentially |
| 2 | ArrowUp              | ✅     | Focus moves up |
| 3 | Home key             | ✅     | Jumps to Apple (first) |
| 4 | End key              | ✅     | Jumps to Watermelon (last) |
| 5 | Typeahead "b"        | ✅     | Jumps to Banana |
| 6 | Typeahead "s"        | ✅     | Jumps to Strawberry |

### 10. Popover Sub-menus
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Left (Inline) mode   | ✅     | Works perfectly, same as story 4 |
| 2 | Right (Popover) first-level | ✅ | Popover appears with Overview, Reports, More Data |
| 3 | Nested popover (More Data) | ❌ | **BUG #1**: Clicking "More Data" closes the first-level popover. |
| 4 | Popover hover trigger | ⚠️ | Hover trigger is finicky — sometimes requires precise positioning |

### 11. Icon-Only Display (Mini Sidebar)
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Icons render         | ✅     | 🏠, 👤, 📊, ⚙, 🚪 icons visible |
| 2 | Popover on icon hover | ❌ | **BUG #2**: No popover appeared when hovering icons |
| 3 | Popover content      | ❌ | **BUG #2**: When clicked, empty floating popover box appears with no content |

### 12. Shortcuts & Labels
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Custom React Node Label | ✅ | Blue "File" label renders correctly |
| 2 | Keyboard shortcuts   | ✅     | ⌘N, ⇧⌘V etc. align properly to the right edge |

### 13. Popover Triggers & Settings
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | Hover trigger        | ⚠️     | Intermittent issue, similar to Bug #1 and #4 above |
| 2 | Click trigger        | ✅     | Works perfectly on click |
| 3 | Custom placement & offset | ✅ | `bottom-start` and `offset: 12` rendered accurately below trigger |

### 14. Controlled Sub-menus
| # | Test Case            | Result | Notes              |
|---|----------------------|--------|--------------------|
| 1 | defaultOpen (uncontrolled) | ✅ | "Analytics" menu is open on mount |
| 2 | open (controlled)    | ✅     | "Settings" toggle button successfully opens/closes the menu via React state |

## Console Errors

1. `Cannot update a component ('MenuSubInline') while rendering a different component ('MenuSubInline')` — **BUG #3**: React state update warning in MenuSub.tsx `registerSelected` callback
2. Storybook-specific: `The 'ariaLabel' prop on 'PopoverProvider' will become mandatory in Storybook 11` (unrelated)

## Recordings

- [test_menu_basic_states](/home/administrator/.gemini/antigravity/brain/004cc37c-d059-4f99-818d-f28c31a1d8ff/test_menu_basic_states_1774942890060.webp)
- [test_menu_grouped_subs](/home/administrator/.gemini/antigravity/brain/004cc37c-d059-4f99-818d-f28c31a1d8ff/test_menu_grouped_subs_1774943039218.webp)
- [test_menu_autoexp_dense](/home/administrator/.gemini/antigravity/brain/004cc37c-d059-4f99-818d-f28c31a1d8ff/test_menu_autoexp_dense_1774943225846.webp)
- [test_menu_keyboard](/home/administrator/.gemini/antigravity/brain/004cc37c-d059-4f99-818d-f28c31a1d8ff/test_menu_keyboard_1774943449416.webp)
- [test_menu_popover](/home/administrator/.gemini/antigravity/brain/004cc37c-d059-4f99-818d-f28c31a1d8ff/test_menu_popover_1774943590620.webp)
- [test_menu_popover_click](/home/administrator/.gemini/antigravity/brain/004cc37c-d059-4f99-818d-f28c31a1d8ff/test_menu_popover_click_1774943874249.webp)
