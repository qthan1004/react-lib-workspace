---
description: Publish a lib to npm via release branch and standard-version
---

// turbo-all

# Publish Lib

## 1. Check Dependencies
```bash
cd libs/<lib-name> && node ../../tools/check-and-fix-deps.js
```
Công cụ `check-and-fix-deps.js` sẽ tự động quét dự án.
- ✅ PASS → Sang Step 2
- ❌ FAILED (Có thông báo đã tự fix file package) → Lệnh cho Agent: hãy chạy lại đoạn code trên một lần nữa (loop) để nó check ra PASSED mới thôi. 

## 2. Update Doc (LLM + Scan Tool)
Sử dụng công cụ quét mã nguồn để sinh ra bảng tóm tắt cấu trúc API. Tránh cho LLM (Agent) phải đọc dồn toàn bộ mã nguồn `src/*`.
```bash
cd libs/<lib-name> && node ../../tools/update-doc.js
```
- Gọi tool đọc file `doc-report.md` vừa được sinh ra. File này liệt kê các component, models đã bị thay đổi...
- Dựa vào bản báo cáo đó + trí thông minh diễn đạt của mình, Agent hãy Cập nhật/Bổ sung thông tin vào file `README.md` của lib cho thật chỉnh chu.
- Cập nhật xong tài liệu, hãy thực thi **XÓA SẠCH** tệp doc rác:
```bash
rm -f doc-report.md
```

## 3. Build Alpha & Check CI
Chạy lệnh xuất bản nhánh dev:
```bash
bash tools/publish-lib.sh alpha <lib-name>
```

Tạo Pull Request. Lấy biến SHA của branch mới. Gọi script CI watch tool:
```bash
GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_PERSONAL_ACCESS_TOKEN" bash tools/check-ci-status.sh system-core-ui <lib-name> <head-sha> 10 30
```

- Đọc file tạm báo cáo CI `ci-result.md` (Ngắn gọn).
- Ngay lập tức giải phóng Context Window bằng việc hủy temp file:
```bash
rm -f ci-result.md
```
- ✅ PASS → Mọi thứ Xanh, Next step.
- ❌ FAILED → Phân tích báo cáo -> Sửa Code -> Upload nhánh cũ -> Loop lại Check CI.

## 4. Build Official & Check CI
Hợp thức hóa tên miền:
```bash
bash tools/publish-lib.sh release <lib-name>
```

Tương tự Bước 3, lấy SHA mới và gắn tool vào Watch CI Actions:
```bash
GITHUB_PERSONAL_ACCESS_TOKEN="$GITHUB_PERSONAL_ACCESS_TOKEN" bash tools/check-ci-status.sh system-core-ui <lib-name> <new-head-sha> 10 30
```
- Đọc nội dung file báo cáo tạm `ci-result.md`.
- Vẫn lập tức xóa file tạm:
```bash
rm -f ci-result.md
```
- ✅ PASS → Thực hiện tool Github Merge PR, sync master và lưu update: `bash tools/publish-lib.sh update <lib-name>`.

## 5. Clear
Thủ tục xóa rác phát sinh.
```bash
rm -f ci_logs.txt ci2.log package-lock.json ci-result.md doc-report.md
```
