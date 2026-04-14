# Per-Story Verification Checklist

Chạy checklist này cho **mỗi story**. Điền kết quả vào cột Status.

---

## 8-Step Checklist

```
[ ] 1. NAVIGATE    navigate_page(url: "<story-url>&full=1")
[ ] 2. LOAD CHECK  take_snapshot() — xác nhận component render, không blank/error
[ ] 3. SCREENSHOT  take_screenshot(filePath: ".../<lib>-<story>-initial.png")
[ ] 4. CONSOLE ①  list_console_messages(types: ["error","warn"]) — ghi nhận lúc load
[ ] 5. INTERACT    Thực hiện interactions → xem interaction-map.md
[ ] 6. CONSOLE ②  list_console_messages(types: ["error","warn"]) — ghi nhận sau interact
[ ] 7. NETWORK     list_network_requests(resourceTypes: ["fetch","xhr"]) — nếu có async
[ ] 8. RESULT      ✅ PASS / ⚠️ WARN / ❌ FAIL
```

---

## Result Criteria

| Result | Điều kiện |
|--------|-----------|
| ✅ **PASS** | Render đúng + interactions hoạt động + không có console errors |
| ⚠️ **WARN** | Render đúng + có console warns (non-critical) |
| ❌ **FAIL** | Crash / blank render / interaction broken / console errors |

---

## Screenshot Naming

```
<lib>-<story-name>-initial.png    ← Step 3: trạng thái ban đầu
<lib>-<story-name>-<action>.png   ← sau interaction quan trọng
<lib>-<story-name>-bug.png        ← bug evidence (auto-capture khi FAIL/WARN)
```

**Save path:** `d:/workspace/react-lib-workspace/plan/test-logs/screenshots/`

---

## Console Severity Classification

| Message | Severity |
|---------|----------|
| `error` (any) | 🔴 Critical |
| `warn` — "Each child in a list" | 🟡 Major — missing key |
| `warn` — "An update to" | 🟡 Major — setState unmounted |
| `warn` — "validateDOMNesting" | 🟢 Minor — HTML nesting |
| `warn` — deprecation notice | 🟢 Minor |
