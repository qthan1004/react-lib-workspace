---
description: Verify & tìm bug trong libs qua Chrome DevTools MCP tools + Storybook — hỗ trợ single / many / all lib modes
---

# Verify Lib (MCP-Powered Bug Detection)

Dùng **Chrome DevTools MCP tools trực tiếp** để inspect stories, monitor console, capture bug evidence, và tự động ghi bug report.

**Cú pháp:**
```
/verify-lib <lib-name>              ← single lib
/verify-lib <lib1>,<lib2>,<lib3>   ← many libs
/verify-lib --all                   ← tất cả libs
```

---

## Bước 0 — Đọc Skill

**BẮT BUỘC** đọc trước khi chạy:
```
.agent/skills/mcp-verify/SKILL.md
```

---

## Step 1 — Parse mode & lib list

**1a. Xác định mode:**
- `--all` → scan toàn bộ `libs/` folder
- Có dấu phẩy → MANY mode
- Tên đơn → SINGLE mode

**1b. Lấy danh sách libs (ALL mode):**

// turbo
```powershell
Get-ChildItem -Path "d:\workspace\react-lib-workspace\libs" -Directory | Select-Object -ExpandProperty Name
```

**1c. Hiển thị scope trước khi bắt đầu:**
```
🔍 Verify scope: <SINGLE/MANY/ALL> — <lib1>, <lib2>, ... (X libs)
Bắt đầu...
```

---

## Step 2 — Đọc stories từng lib

**2a. Tìm story files:**

// turbo
```powershell
Get-ChildItem -Path "d:\workspace\react-lib-workspace\libs\<lib-name>\src" -Recurse -Include "*.stories.tsx","*.stories.ts" | Select-Object -ExpandProperty FullName
```

**2b.** Đọc từng story file — extract `title`, tên exports, args/props.

**2c.** Build danh sách story URLs → xem `story-url.md` để convert đúng.

---

## Step 3 — Kiểm tra Storybook

// turbo
```powershell
try { (Invoke-WebRequest -Uri "http://localhost:6006" -TimeoutSec 3 -UseBasicParsing).StatusCode } catch { "OFFLINE" }
```

- `200` → tiếp tục
- `OFFLINE` → báo user chạy Storybook rồi DỪNG

---

## Step 4 — Khởi tạo MCP Browser Session

→ Xem **"Browser Session Setup"** trong `SKILL.md`

---

## Step 5 — Verify Loop: Từng Story

Với mỗi lib → mỗi story — chạy **Per-Story 8-Step Checklist**:

→ Xem **`checklist.md`** để biết đầy đủ 8 bước

→ Xem **`interaction-map.md`** để biết interactions cần test theo từng component type

---

## Step 6 — Auto Bug Report

Khi story có ❌ FAIL hoặc ⚠️ WARN — **tự động, không hỏi user:**

**6a.** Chụp screenshot bug evidence:
```powershell
# Tạo thư mục nếu chưa có
New-Item -ItemType Directory -Force -Path "d:\workspace\react-lib-workspace\plan\test-logs\screenshots"
```
```
take_screenshot(filePath: ".../<lib>-<story>-bug.png")
```

**6b.** Lấy stack trace: `get_console_message(msgid)` cho từng error/warn

**6c.** Xác định file bug report:
```
plan/bugs/<YYYY-MM-DD>_<lib-name>_v<major>.<minor>.md
```

**6d.** Tạo hoặc append bug → xem **`bug-report-template.md`**

---

## Step 7 — Report cho User

```
## 🔍 Verify Report

📦 Libs: <X> | 📖 Stories: <Y>

| Lib   | Stories | ✅ Pass | ⚠️ Warn | ❌ Fail |
|-------|---------|---------|---------|---------|
| toast | 5       | 4       | 1       | 0       |

### Failed Stories:
| Lib   | Story       | Issue                      | Severity |
|-------|-------------|----------------------------|----------|
| badge | WithCounter | TypeError in click handler | 🔴       |

📄 Bug reports: plan/bugs/...
📸 Screenshots: plan/test-logs/screenshots/...

💡 Fix bugs? Dùng /execute-task hoặc gọi tôi với bug file path.
```

---

## Lưu ý

- **KHÔNG sửa code** — chỉ observe & report
- **KHÔNG dùng browser_subagent** — dùng MCP tools trực tiếp
- Lib không có stories → log warning, skip, tiếp tục lib tiếp theo
