# Interaction Map — By Component Type

Dùng bảng này ở **Step 5e** khi thực hiện interactions cho từng story.
Lấy `uid` từ `take_snapshot()` trước khi gọi bất kỳ tool nào.

---

## MCP Tool Quick Reference

| Mục đích | Tool |
|----------|------|
| Click element | `click(uid)` |
| Hover element | `hover(uid)` |
| Fill input | `fill(uid, value)` |
| Nhấn phím | `press_key(key)` |
| Verify state | `take_snapshot()` |
| Chờ element | `wait_for(text, timeout)` |

**Phím hay dùng:** `Tab`, `Enter`, `Escape`, `ArrowDown`, `ArrowUp`, `Home`, `End`, `Space`

---

## Interactions Theo Component Type

| Component Type | Interactions cần test |
|---|---|
| **Button / Clickable** | `click(uid)` → verify callback / state change qua snapshot |
| **Input / Form** | `fill(uid, "test value")` → verify value update |
| **Checkbox / Toggle** | `click(uid)` → verify checked state change |
| **Dropdown / Select** | `click(trigger-uid)` → snapshot → `click(option-uid)` → verify selection |
| **Menu** | `click(trigger)` → snapshot open → `press_key("ArrowDown")` → `press_key("Enter")` |
| **Modal / Dialog** | `click(open-btn)` → snapshot → verify visible → `press_key("Escape")` → verify closed |
| **Toast / Notification** | trigger → `wait_for(toast-text, 3000)` → snapshot → verify auto-dismiss |
| **Tab / Navigation** | `click(each-tab)` → snapshot → verify content changes |
| **Accordion** | `click(header)` → snapshot → verify expand → `click(header)` → verify collapse |
| **Slider / Range** | `click(track)` → `press_key("ArrowRight")` → verify value change |
| **Keyboard Nav** | Sequence: `click(first-item)` → `Tab` → `ArrowDown` → `Enter` → `Escape` |

---

## Keyboard Navigation Sequence
```
1. click(uid: "<first-focusable>")   ← đặt focus vào component
2. press_key("Tab")   → take_snapshot ← focus moved?
3. press_key("ArrowDown") → take_snapshot ← selection changed?
4. press_key("Enter") → take_snapshot ← action fired?
5. press_key("Escape") → take_snapshot ← dismissed/closed?
```

---

## Race Conditions & Animations

Sau transitions/animations, dùng `wait_for` trước khi snapshot:
```
wait_for(text: ["<expected-text>"], timeout: 3000)
```
