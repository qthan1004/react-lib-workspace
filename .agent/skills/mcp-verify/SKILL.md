---
name: MCP Browser Verify
description: Protocol for using Chrome DevTools MCP tools to inspect and verify React component stories in Storybook. Used by /verify-lib workflow.
---

# MCP Browser Verify — Protocol

Skill này cung cấp protocol cho agent dùng **Chrome DevTools MCP tools** trực tiếp để verify component libs qua Storybook.

## Sub-tools (đọc khi cần)

| File | Nội dung |
|------|----------|
| `story-url.md` | URL patterns & story ID conversion rules |
| `interaction-map.md` | MCP tool quick ref + interactions theo component type |
| `checklist.md` | Per-story 8-step checklist + screenshot naming + console severity |
| `bug-report-template.md` | Bug report file template + severity guide |

---

## Browser Session Setup

Thực hiện **1 lần duy nhất** mỗi session:

```
1. list_pages()
   → Không có Storybook page? → new_page(url: "http://localhost:6006")
   → Đã có? → select_page(pageId)

2. take_snapshot()
   → Xác nhận Storybook UI load (có sidebar "Stories")
```

Điều hướng sang story mới:
```
navigate_page(type: "url", url: "<story-url>&full=1")
→ Luôn gọi take_snapshot() sau để confirm load
```

---

## Snapshot & UID

- `take_snapshot()` trả về a11y tree — mỗi element có `[uid]`
- Lấy `uid` trước mọi `click`, `fill`, `hover`
- Gọi `take_snapshot()` **sau mỗi interaction** để verify state change
- Component nằm trong `<iframe>` — bỏ qua elements của Storybook sidebar/toolbar

---

## Console Monitoring

```
list_console_messages(types: ["error", "warn"])
```

Khi phát hiện error/warn:
1. `get_console_message(msgid)` → lấy full stack trace
2. **Tự động** ghi vào bug report — không hỏi user
→ Chi tiết severity: xem `checklist.md`

---

## Network Check (nếu có async)

```
list_network_requests(resourceTypes: ["fetch", "xhr"])
```

Chú ý: status `4xx`/`5xx`, request pending, `404` missing assets.

---

## Lưu ý quan trọng

- **KHÔNG modify source code** — chỉ observe & report
- **Snapshot thường xuyên** — mỗi action cần verify qua snapshot
- **Iframe issue**: Nếu không thấy component elements, dùng `evaluate_script` để inspect iframe
- **Animations**: Dùng `wait_for(text, timeout: 3000)` trước khi snapshot
