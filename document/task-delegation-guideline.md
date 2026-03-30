# Hướng Dẫn: Mô Hình Phân Việc Planner → Worker

## Ý tưởng cốt lõi

Thay vì dùng 1 Agent code toàn bộ feature từ đầu đến cuối (tốn quota, dễ "ngáo"), hệ thống chia thành 2 vai:

- **Planner** — phân tích, lên kế hoạch, tạo ticket. Không code.
- **Worker** — nhận 1 ticket, code đúng phạm vi, báo xong.

---

## Bước 1: Chạy Planner

Mở Chat mới, gõ:

```
/delegate [mô tả feature/việc cần làm]
```

Ví dụ:
```
/delegate Fix và cleanup menu lib theo plan 2026-03-30_menu_v0.1
```

Agent sẽ **không code** — chỉ tạo các file ticket vào `plan/tasks/todo/`, ví dụ:

```
plan/tasks/todo/
├── 01-menu-fix-keyboard-nav.md
├── 02-menu-cleanup-constants.md
├── 03-menu-remove-dropdown-refs.md
└── 04-menu-style-polish.md
```

Xong → tắt Chat Planner đi.

---

## Bước 2: Chạy Worker (lần lượt từng ticket)

Mở **Chat hoàn toàn mới**, paste đúng 1 câu:

```
Tự động đọc nội dung file plan/tasks/todo/01-menu-fix-keyboard-nav.md và thực thi cho tôi
```

Worker sẽ:
1. Đọc ticket → đọc skills liên quan → code
2. Chạy test, verify
3. Move ticket sang `plan/tasks/done/`
4. Báo bạn kết quả

Xong → tắt Chat Worker đó, mở Chat mới cho ticket tiếp theo.

---

## Trạng thái ticket

| Thư mục | Ý nghĩa |
|---------|---------|
| `plan/tasks/todo/` | Chưa làm |
| `plan/tasks/done/` | Đã hoàn thành |
| `plan/tasks/blocked/` | Bị chặn, cần review |

---

## Lưu ý

- **Trước khi `/delegate`**: Cần có plan file trong `plan/` (dùng `/save-plan` để lưu).
- **Thứ tự ticket**: Làm theo số `NN` — ticket sau có thể phụ thuộc ticket trước.
- **Worker bị chặn**: Ticket sẽ move sang `blocked/`, Worker ghi lý do → bạn cần điều chỉnh plan rồi tạo lại.

---

## Tại sao phải chia nhỏ?

1. **Fresh context** — Mỗi Worker chỉ đọc 1 ticket, không bị nhiễu bởi lịch sử dài → code chính xác hơn
2. **Tiết kiệm quota** — Không load lại toàn bộ conversation cũ mỗi lần
3. **Dễ debug** — Nếu 1 task sai, chỉ cần chạy lại Worker đó
