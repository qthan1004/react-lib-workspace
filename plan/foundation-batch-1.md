# Foundation Batch 1 — badge, slider, accordion

> Phụ thuộc: chỉ `theme` — độc lập, build song song được.

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
