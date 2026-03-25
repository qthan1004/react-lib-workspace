# Hướng Dẫn: Mô Hình Phân Việc Cho Micro-Agents

Để làm một dự án lớn hoặc tính năng phức tạp với AI (Agent) mà không bị "hụt hơi", mất ngữ cảnh (context window) hay tốn nhiều thẻ hạn mức (quota), dự án này áp dụng mô hình "Planner - Worker" (Người Lập Kế Hoạch - Thợ Lập Trình).

## 1. Quy trình tổng quan 

Thay vì sử dụng 1 luồng chat (1 cửa sổ Agent) code toàn bộ tính năng từ A đến Z, hệ thống chia làm 2 giai đoạn:
1. Agent đầu tiên đóng vai Kiến Trúc Sư (**Planner**), chỉ nhận việc rồi tạo các "Tấm phiếu giao việc" siêu nhỏ, sau đó kết thúc luồng.
2. Bạn (User) liên tục mở các tab chat hoàn toàn mới gọi là các Thợ Lập Trình (**Worker Agent**). Đưa từng tấm phiếu cho từng Thợ đọc và làm.

Thư mục lưu trữ thẻ giao việc:
- `plan/tasks/todo/`: Việc cần làm.
- `plan/tasks/done/`: Việc đã hoàn tất.

---

## Bước 1: Dùng Planner Agent để lên lịch và lập phiếu (Tạo Task)

- Mở 1 Chat mới, ra lệnh: *"Tôi muốn làm form đăng ký người dùng gồm thư viện avatar và thư viện checkbox, bạn chia task ra cho tôi."*
- Agent sẽ KHÔNG lao vào viết code. Nó sẽ phân tích và sinh ra các file `.md` chứa nhiệm vụ (vd: `01-create-avatar.md`, `02-create-checkbox.md`) ném vào mục `plan/tasks/todo`.
- Xong bước này nó sẽ báo bạn. Bạn **vui lòng tắt / xóa luôn màn hình chat này đi**.

---

## Bước 2: Dùng Worker Agent để Từng Bước Xây Dựng (Code)

- Bạn bấm dấu cộng (+) mở 1 Chat HOÀN TOÀN MỚI.
- Gửi đúng 1 câu lệnh sắc lẹm: *"Tự động đọc nội dung file `plan/tasks/todo/01-create-avatar.md` và code cho tôi"*.
- Mọi Agent mới đều tự động truy cập `.agent/context.md` để "thấm" văn hoá của Project (như tsconfig, build tools...), cộng thêm Phiếu số 01 mới cung cấp. Nó sẽ cắm mặt vào code.
- Chạy test, npm run, storybook mượt mà xong xuôi; Agent sẽ tự **move file 01 qua mục /done/**.
- Bạn nghiệm thu xong thì lại tắt tab chat đó đi, gọi con Chat khác giải quyết file số 02.

---

## Tại sao phải làm cồng kềnh thêm vài bước click chuột?

1. **AI Luôn Tươi Mới (Fresh Context)**: Bất kỳ lập trình viên nào nhồi nhét code suốt 5 tiếng đồng hồ cũng sinh ra mệt mỏi quên trước quên sau. Mở Chat mới làm AI chỉ tập trung đúng file duy nhất -> Code siêu thông minh, không "ngáo".
2. **Siêu Tiết Kiệm Quota**: Bạn không phải tải/load lại toàn bộ những tin nhắn lịch sử (lên đến 30,000 ký tự rác) vào yêu cầu tiếp theo. Agent đọc xong cái là trả lời đúng trọng tâm. Ở các thư viện to, cách này dễ dàng cứu bạn tới 50% số credit.
