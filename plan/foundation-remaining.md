# @thanh-libs — Foundation Remaining (7 libs)

> Trích từ `foundation-roadmap.md` — chỉ giữ các lib chưa làm.
> Thứ tự: depend ít → depend nhiều.

---

## Tổng quan

| # | Lib | Phụ thuộc | Độ phức tạp |
|---|-----|-----------|-------------|
| ✅ | `badge` | `theme` | ⭐ |
| ✅ | `slider` | `theme` | ⭐⭐ |
| ✅ | `accordion` | `theme` | ⭐⭐ |
| ✅ | `tabs` | `theme` | ⭐⭐ |
| 5 | `toast` | `theme`, `dialog` | ⭐⭐⭐ |
| 6 | `input` | `theme`, `utils` | ⭐⭐⭐⭐ |
| 7 | `select` | `input`, `dialog`, `chip` | ⭐⭐⭐⭐ |
| 8 | `autocomplete` | `input`, `dialog`, `chip` | ⭐⭐⭐⭐⭐ |

---

## 1. `@thanh-libs/badge`

| Component | Props chính |
|-----------|-------------|
| **Badge** | `count`, `dot`, `color`, `max`, `showZero`, `overflowCount`, `offset`, `placement` |

**Phụ thuộc:** `theme`

---

## 2. `@thanh-libs/slider`

Range / value slider.

| Component | Props chính |
|-----------|-------------|
| **Slider** | `value`, `onChange`, `min`, `max`, `step`, `marks`, `disabled`, `orientation`, `range` (dual thumb) |

**Phụ thuộc:** `theme`

---

## 3. `@thanh-libs/accordion`

Collapsible panels (MUI: Accordion, AntD: Collapse).

| Sub-component | Mô tả |
|---------------|-------|
| **Accordion** | Single collapsible panel |
| **AccordionSummary** | Click trigger (header) |
| **AccordionDetails** | Collapsible content |
| **AccordionGroup** | Multiple panels, `exclusive` mode (1 at a time) |

**Phụ thuộc:** `theme`

---

## 4. `@thanh-libs/tabs`

| Component | Props chính |
|-----------|-------------|
| **Tabs** | `value`, `onChange`, `variant` (default/contained), `orientation` |
| **Tab** | `label`, `value`, `icon`, `disabled` |
| **TabPanel** | `value`, `children` |

**Phụ thuộc:** `theme`

---

## 5. `@thanh-libs/toast`

Snackbar / Toast notification system.

| Component | Props chính |
|-----------|-------------|
| **ToastProvider** | `placement`, `maxToasts`, `duration` |
| **Toast** | `message`, `description`, `type` (success/error/warning/info), `duration`, `closable`, `action` |
| **useToast()** | Hook: `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()` |

**Phụ thuộc:** `theme`, `dialog` (Portal/overlay)

---

## 6. `@thanh-libs/input`

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
|-----------|-------------|
| **InputBase** | `value`, `onChange`, `disabled`, `readOnly`, `placeholder`, `type`, `startAdornment`, `endAdornment`, `error`, `inputRef` |
| **TextField** | Extends InputBase + `label`, `helperText`, `error`, `required`, `variant` (outlined/filled), `multiline`, `rows`, `fullWidth` |
| **Checkbox** | `checked`, `onChange`, `disabled`, `indeterminate`, `label` |
| **CheckboxGroup** | `options`, `value`, `onChange`, `direction` (row/column) |
| **Radio** | `checked`, `onChange`, `disabled`, `label` |
| **RadioGroup** | `options`, `value`, `onChange`, `direction` |

**Phụ thuộc:** `theme`, `utils`

---

## 7. `@thanh-libs/select`

Dùng **Popover** từ `dialog` cho dropdown. Có **single** và **multi** mode.

| Feature | MUI | AntD | Thanh-libs |
|---------|-----|------|------------|
| Single select | ✅ | ✅ | ✅ |
| Multi select | ✅ | ✅ `mode="multiple"` | ✅ `mode="multiple"` |
| Multi → render chips | ✅ Chip | ✅ Tag | ✅ **Chip** (peer dep) |
| Search/filter | ❌ | ✅ `showSearch` | ✅ `showSearch` |
| Option groups | ✅ | ✅ `OptGroup` | ✅ `OptionGroup` |
| Clear button | ✅ | ✅ `allowClear` | ✅ `allowClear` |

**Phụ thuộc:** `input` (InputBase), `dialog` (Popover), `chip` (multi-select render)

---

## 8. `@thanh-libs/autocomplete`

Input với **suggestions**. Cho phép nhập tự do, hỗ trợ async.

| Feature | MUI | AntD | Thanh-libs |
|---------|-----|------|------------|
| Single / Multi | ✅ | ✅ (single only) | ✅ cả hai |
| Multi → chips | ✅ | — | ✅ **Chip** |
| Free typing | ✅ `freeSolo` | ✅ (default) | ✅ `freeSolo` |
| Async options | ✅ `loading` | ✅ | ✅ `loading` + `onSearch` |
| Filter client | ✅ `filterOptions` | ✅ `filterOption` | ✅ `filterOptions` |
| Group / Custom render | ✅ | ✅ | ✅ |

**Phụ thuộc:** `input` (TextField), `dialog` (Popover), `chip` (multi render)
