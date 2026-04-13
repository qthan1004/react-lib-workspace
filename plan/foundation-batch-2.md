# Foundation Batch 2 — tabs, toast

> Độc lập hoặc phụ thuộc nhẹ vào `dialog`.

---

## 1. `@thanh-libs/tabs`

| Component | Props chính |
|-----------|-------------|
| **Tabs** | `value`, `onChange`, `variant` (default/contained), `orientation` |
| **Tab** | `label`, `value`, `icon`, `disabled` |
| **TabPanel** | `value`, `children` |

**Phụ thuộc:** `theme`

---

## 2. `@thanh-libs/toast`

Snackbar / Toast notification system.

| Component | Props chính |
|-----------|-------------|
| **ToastProvider** | `placement`, `maxToasts`, `duration` |
| **Toast** | `message`, `description`, `type` (success/error/warning/info), `duration`, `closable`, `action` |
| **useToast()** | Hook: `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()` |

**Phụ thuộc:** `theme`, `dialog` (Portal/overlay)
