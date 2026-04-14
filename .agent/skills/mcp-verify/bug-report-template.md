# Bug Report Template

Dùng template này khi tạo file bug report mới tại:
```
d:/workspace/react-lib-workspace/plan/bugs/<YYYY-MM-DD>_<lib-name>_v<major>.<minor>.md
```

---

## Template — File mới

```markdown
# <Lib Name> Library Bug Report

**Date:** <YYYY-MM-DD>
**Module:** `<lib-name>`
**Version:** `<version>`
**Tested via:** MCP Browser Verify + Storybook

---

## 🔴 Critical (Feature hoàn toàn hỏng)

### 1. <Bug Title>
* **Status:** Open
* **Story:** `<story-name>` — <story-url>
* **Screenshot:** `plan/test-logs/screenshots/<filename>.png`
* **Description:** <mô tả chi tiết>
* **Console Error:**
  ```
  <stack trace từ get_console_message>
  ```
* **Steps to reproduce:**
  1. Navigate tới <story-url>
  2. <action>
* **Expected:** <behavior mong muốn>
* **Actual:** <behavior thực tế>

---

## 🟡 Major (Hành vi sai / thiếu kết nối)

---

## 🟢 Minor (Edge case / polish)

---

*(Append new findings for the day below)*
```

---

## Severity Guide

| Level | Dấu hiệu |
|-------|----------|
| 🔴 **Critical** | Crash, uncaught exception, blank render, data loss |
| 🟡 **Major** | Interaction broken, wrong state, missing connection |
| 🟢 **Minor** | Console warn, visual glitch, edge case, cosmetic |

---

## Append về file đã tồn tại

Nếu file đã có → append bug mới **trước dòng** `*(Append new findings...)*`:
- Tăng số thứ tự bug (`### 2.`, `### 3.`, ...)
- Đặt vào đúng section severity (🔴 / 🟡 / 🟢)

---

## Lấy version từ package.json

```powershell
Get-Content "d:\workspace\react-lib-workspace\libs\<lib-name>\package.json" | ConvertFrom-Json | Select-Object -ExpandProperty version
```
