# @thanh-libs — Component Tier Roadmap

## Tầm nhìn tổng thể

```mermaid
graph TB
    subgraph "Tier 3 — Complex"
        TreeView
        DataGrid["DataGrid / Table"]
        DatePicker
        TransferList
    end

    subgraph "Tier 2 — Foundation"
        Input["@thanh-libs/input"]
        Select["@thanh-libs/select"]
        Autocomplete["@thanh-libs/autocomplete"]
        Chip["@thanh-libs/chip"]
        Tabs["@thanh-libs/tabs"]
        Card["@thanh-libs/card"]
        Accordion["@thanh-libs/accordion"]
        Switch["@thanh-libs/switch"]
        Slider["@thanh-libs/slider"]
        Avatar["@thanh-libs/avatar"]
        Badge["@thanh-libs/badge"]
        Menu["@thanh-libs/menu"]
        Breadcrumb["@thanh-libs/breadcrumb"]
        Toast["@thanh-libs/toast"]
    end

    subgraph "Tier 1 — Core ✅"
        Theme["theme ✅"]
        Utils["utils ✅"]
        Button["button ✅"]
        Typography["typography ✅"]
        Layout["layout ✅"]
        Dialog["dialog ✅ (modal + popover + tooltip)"]
    end

    DataGrid --> Input
    DataGrid --> Select
    DataGrid --> Chip
    DataGrid --> Tabs
    TreeView --> Chip
    DatePicker --> Input
    DatePicker --> Dialog
    TransferList --> Input
    TransferList --> Chip

    Select --> Input
    Select --> Dialog
    Select --> Chip
    Autocomplete --> Input
    Autocomplete --> Dialog
    Autocomplete --> Chip

    Input --> Theme
    Input --> Utils
    Chip --> Theme
    Tabs --> Theme
    Card --> Theme
    Accordion --> Theme
    Switch --> Theme
    Slider --> Theme
    Avatar --> Theme
    Badge --> Theme
    Menu --> Theme
    Menu --> Dialog
    Breadcrumb --> Theme
    Toast --> Theme
    Toast --> Dialog
```

---

## Tier 1 — Core ✅

| Lib | Version | Mô tả |
|-----|---------|-------|
| `theme` | v0.0.4 | Design tokens, ThemeProvider, palettes |
| `utils` | v0.0.6 | Pure TS utilities |
| `button` | v0.0.4 | Button component |
| `typography` | v0.0.3 | Text components |
| `layout` | v0.0.3 | Layout primitives |
| `dialog` | v0.0.1 | Modal, Popover, Tooltip |

---

## Tier 2 — Foundation (14 libs)

### 1. `@thanh-libs/input`

Theo pattern **MUI InputBase**: tạo base input → các variant extends từ base.

```
src/lib/
├── InputBase/           ← Low-level base (style reset, state logic)
├── TextField/           ← InputBase + label + helper text + adornments
├── Checkbox/            ← Checkbox + CheckboxGroup
├── Radio/               ← Radio + RadioGroup
├── shared/              ← FormControl, FormLabel, FormHelperText, InputAdornment
└── index.ts
```

| Component | Props chính |
|-----------|-----|
| **InputBase** | `value`, `onChange`, `disabled`, `readOnly`, `placeholder`, `type`, `startAdornment`, `endAdornment`, `error`, `inputRef` |
| **TextField** | Extends InputBase + `label`, `helperText`, `error`, `required`, `variant` (outlined/filled), `multiline`, `rows`, `fullWidth` |
| **Checkbox** | `checked`, `onChange`, `disabled`, `indeterminate`, `label` |
| **CheckboxGroup** | `options`, `value`, `onChange`, `direction` (row/column) |
| **Radio** | `checked`, `onChange`, `disabled`, `label` |
| **RadioGroup** | `options`, `value`, `onChange`, `direction` |

**Phụ thuộc:** `theme`, `utils`

---

### 2. `@thanh-libs/select`

Dùng **Popover** từ `dialog` cho dropdown. Có **single** và **multi** mode.

| Feature | MUI | AntD | Thanh-libs |
|---------|-----|------|-----------|
| Single select | ✅ | ✅ | ✅ |
| Multi select | ✅ | ✅ `mode="multiple"` | ✅ `mode="multiple"` |
| Multi → render chips | ✅ Chip | ✅ Tag | ✅ **Chip** (peer dep) |
| Search/filter | ❌ | ✅ `showSearch` | ✅ `showSearch` |
| Option groups | ✅ | ✅ `OptGroup` | ✅ `OptionGroup` |
| Clear button | ✅ | ✅ `allowClear` | ✅ `allowClear` |

**Phụ thuộc:** `input` (InputBase), `dialog` (Popover), `chip` (multi-select render)

---

### 3. `@thanh-libs/autocomplete`

Input với **suggestions**. Cho phép nhập tự do, hỗ trợ async.

| Feature | MUI | AntD | Thanh-libs |
|---------|-----|------|-----------|
| Single / Multi | ✅ | ✅ (single only) | ✅ cả hai |
| Multi → chips | ✅ | — | ✅ **Chip** |
| Free typing | ✅ `freeSolo` | ✅ (default) | ✅ `freeSolo` |
| Async options | ✅ `loading` | ✅ | ✅ `loading` + `onSearch` |
| Filter client | ✅ `filterOptions` | ✅ `filterOption` | ✅ `filterOptions` |
| Group / Custom render | ✅ | ✅ | ✅ |

**Phụ thuộc:** `input` (TextField), `dialog` (Popover), `chip` (multi render)

---

### 4. `@thanh-libs/chip`

Tags, badges, filter chips.

| Component | Props chính |
|-----------|-----|
| **Chip** | `label`, `variant` (filled/outlined), `color`, `size`, `onDelete`, `icon`, `avatar`, `clickable`, `disabled` |
| **ChipGroup** | `children`, `spacing`, `direction` |

**Phụ thuộc:** `theme`

---

### 5. `@thanh-libs/tabs`

| Component | Props chính |
|-----------|-----|
| **Tabs** | `value`, `onChange`, `variant` (default/contained), `orientation` |
| **Tab** | `label`, `value`, `icon`, `disabled` |
| **TabPanel** | `value`, `children` |

**Phụ thuộc:** `theme`

---

### 6. `@thanh-libs/card`

| Sub-component | Mô tả |
|---------------|-------|
| **Card** | Main container, `variant` (elevated/outlined), `hoverable` |
| **CardHeader** | Title + subtitle + avatar + action |
| **CardContent** | Body content |
| **CardMedia** | Cover image/video |
| **CardActions** | Footer buttons |

**Phụ thuộc:** `theme`

---

### 7. `@thanh-libs/accordion`

Collapsible panels (MUI: Accordion, AntD: Collapse).

| Sub-component | Mô tả |
|---------------|-------|
| **Accordion** | Single collapsible panel |
| **AccordionSummary** | Click trigger (header) |
| **AccordionDetails** | Collapsible content |
| **AccordionGroup** | Multiple panels, `exclusive` mode (1 at a time) |

**Phụ thuộc:** `theme`

---

### 8. `@thanh-libs/switch`

Toggle on/off.

| Component | Props chính |
|-----------|-----|
| **Switch** | `checked`, `onChange`, `disabled`, `size`, `label`, `color` |

**Phụ thuộc:** `theme`

---

### 9. `@thanh-libs/slider`

Range / value slider.

| Component | Props chính |
|-----------|-----|
| **Slider** | `value`, `onChange`, `min`, `max`, `step`, `marks`, `disabled`, `orientation`, `range` (dual thumb) |

**Phụ thuộc:** `theme`

---

### 10. `@thanh-libs/avatar`

| Component | Props chính |
|-----------|-----|
| **Avatar** | `src`, `alt`, `size`, `variant` (circular/rounded/square), `fallback` (icon/text), `color` |
| **AvatarGroup** | `max`, `total`, `spacing`, `size` |

**Phụ thuộc:** `theme`

---

### 11. `@thanh-libs/badge`

| Component | Props chính |
|-----------|-----|
| **Badge** | `count`, `dot`, `color`, `max`, `showZero`, `overflowCount`, `offset`, `placement` |

**Phụ thuộc:** `theme`

---

### 12. `@thanh-libs/menu`

Dropdown menu — dùng **Popover** từ `dialog`.

| Component | Props chính |
|-----------|-----|
| **Menu** | `open`, `onClose`, `anchorEl`, `placement` |
| **MenuItem** | `onClick`, `disabled`, `icon`, `shortcut`, `danger` |
| **MenuDivider** | — |
| **SubMenu** | `label`, `children` (nested menu) |

**Phụ thuộc:** `theme`, `dialog` (Popover)

---

### 13. `@thanh-libs/breadcrumb`

| Component | Props chính |
|-----------|-----|
| **Breadcrumb** | `separator`, `maxItems`, `itemsBeforeCollapse`, `itemsAfterCollapse` |
| **BreadcrumbItem** | `href`, `onClick`, `icon`, `active` |

**Phụ thuộc:** `theme`

---

### 14. `@thanh-libs/toast`

Snackbar / Toast notification system.

| Component | Props chính |
|-----------|-----|
| **ToastProvider** | `placement`, `maxToasts`, `duration` |
| **Toast** | `message`, `description`, `type` (success/error/warning/info), `duration`, `closable`, `action` |
| **useToast()** | Hook: `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()` |

**Phụ thuộc:** `theme`, `dialog` (Portal/overlay)

---

## Tier 3 — Complex (tương lai)

| Component | Cần Foundation nào | Mô tả |
|---|---|---|
| **DataGrid / Table** | input, select, chip, tabs | Sortable, filterable, editable data table |
| **TreeView** | chip | Hierarchical tree với expand/collapse |
| **DatePicker** | input, dialog | Calendar picker |
| **TransferList** | input, chip | Dual-list transfer |

---

## Thứ tự build đề xuất

| # | Lib | Lý do |
|---|-----|-------|
| 🔥 | **theme (refactor palette + shadows)** | Fix semantic colors + shadows. **Ưu tiên cao nhất** |
| 1 | **avatar** | Cần cho header, card, menu, profile |
| 2 | **menu** (multi-level) | Sidebar nav, dropdown, phụ thuộc dialog (Popover) |
| 3 | **breadcrumb** | Navigation cơ bản, header |
| ✅ | **chip** | Đã scaffold, cần publish |
| 4 | **switch** | Độc lập, đơn giản |
| 5 | **badge** | Độc lập, dùng với avatar/menu |
| 6 | **slider** | Độc lập |
| 7 | **card** | Độc lập, dùng được ngay |
| 8 | **accordion** | Độc lập |
| 9 | **tabs** | Độc lập |
| 10 | **toast / snackbar** | Feedback system, phụ thuộc dialog |
| 11 | **input** | Cần cho select/autocomplete |
| 12 | **select** | Phụ thuộc input + chip + dialog |
| 13 | **autocomplete** | Phụ thuộc input + chip + dialog, phức tạp nhất |

