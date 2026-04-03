# QA/TESTER CHEATSHEET FOR DEVELOPERS

> Hướng dẫn viết Test Case chuẩn chỉ dành cho Developer — Từ góc nhìn QA chuyên nghiệp

---

## 1. TƯ DUY CỐT LÕI (Dev vs QA Mindset)

```
Developer Mindset              QA Mindset
────────────────────           ────────────────────
"Làm sao để nó chạy?"         "Làm sao để nó sập?"
"User sẽ dùng đúng"           "User sẽ dùng sai mọi cách có thể"
"Code đúng logic"              "Logic có cover hết edge case chưa?"
"Happy path works"             "Unhappy path có crash không?"
```

**Nguyên tắc #1:** Bạn không test để chứng minh code đúng. Bạn test để **chứng minh code SAI** mà không sai được → lúc đó mới tin là đúng.

---

## 2. TEST DESIGN TECHNIQUES — "Nghĩ ra test case bằng cách nào?"

> Phần quan trọng nhất. Không có kỹ thuật → test bằng cảm tính → bỏ sót bug.

### 2.1. Equivalence Partitioning (EP) — Phân vùng tương đương

**Nguyên lý:** Chia dữ liệu đầu vào thành các nhóm (partition). Mỗi nhóm chỉ cần test **1 giá trị đại diện** là đủ.

```
Ví dụ: Ô nhập "Tuổi" (chấp nhận 18-60)

Partition 1 (Invalid):  ..., -1, 0, 1, ... 17     → Test: 10
Partition 2 (Valid):    18, 19, ... 59, 60          → Test: 35
Partition 3 (Invalid):  61, 62, ... 100, ...        → Test: 75
Partition 4 (Invalid):  "abc", "!@#", "", null      → Test: "abc"

→ Chỉ cần 4 test case thay vì test từng số!
```

### 2.2. Boundary Value Analysis (BVA) — Phân tích giá trị biên

**Nguyên lý:** Bug thường nằm ở **ranh giới** các partition. Test giá trị ngay tại biên, trước biên, và sau biên.

```
Ví dụ: Ô nhập "Tuổi" (chấp nhận 18-60)

Biên dưới: 17 (reject) | 18 (accept) | 19 (accept)
Biên trên: 59 (accept) | 60 (accept) | 61 (reject)

→ 6 test case kiểm soát hoàn toàn 2 biên
```

> **Tip:** Combo EP + BVA là kỹ thuật mạnh nhất cho mọi input field. Áp dụng cho: text length, number range, date range, file size, array length, pagination size...

### 2.3. Decision Table — Bảng quyết định

**Nguyên lý:** Khi có **nhiều điều kiện kết hợp** ảnh hưởng đến kết quả. Liệt kê TẤT CẢ tổ hợp.

```
Ví dụ: Nút "Submit" form đăng ký

| # | Email valid? | Password valid? | Agree Terms? | → Kết quả                        |
|---|-------------|----------------|-------------|----------------------------------|
| 1 | ✅           | ✅              | ✅           | → Đăng ký thành công              |
| 2 | ✅           | ✅              | ❌           | → Lỗi: "Phải đồng ý điều khoản"  |
| 3 | ✅           | ❌              | ✅           | → Lỗi: "Mật khẩu không hợp lệ"   |
| 4 | ✅           | ❌              | ❌           | → Lỗi: "Mật khẩu" + "Điều khoản" |
| 5 | ❌           | ✅              | ✅           | → Lỗi: "Email không hợp lệ"      |
| 6 | ❌           | ✅              | ❌           | → Lỗi: "Email" + "Điều khoản"    |
| 7 | ❌           | ❌              | ✅           | → Lỗi: "Email" + "Mật khẩu"     |
| 8 | ❌           | ❌              | ❌           | → Lỗi: cả 3 trường               |
```

> Mỗi dòng trong bảng = 1 test case. Với N điều kiện boolean → tối đa 2^N dòng. Nếu quá nhiều, dùng **Pairwise Testing** để giảm xuống.

### 2.4. State Transition — Chuyển trạng thái

**Nguyên lý:** Khi entity có **vòng đời trạng thái** (lifecycle), test mọi transition hợp lệ VÀ bất hợp lệ.

```
Ví dụ: Leave Request

                    ┌──────────┐
         submit     │          │  approve
    ───────────────▸│ PENDING  │──────────────▸ APPROVED
                    │          │
                    └────┬─────┘
                         │ reject
                         ▼
                    ┌──────────┐
                    │ REJECTED │
                    └────┬─────┘
                         │ re-submit
                         ▼
                    ┌──────────┐
                    │ PENDING  │ (quay về)
                    └──────────┘

Test cases từ diagram:
✅ Valid:   DRAFT → PENDING → APPROVED
✅ Valid:   DRAFT → PENDING → REJECTED → PENDING (re-submit)
❌ Invalid: APPROVED → PENDING (không được quay lại!)
❌ Invalid: REJECTED → APPROVED (phải qua PENDING!)
```

---

## 3. CHIẾN LƯỢC TEST THEO TỪNG GIAI ĐOẠN (Test Strategy)

### Kịch bản A: Chỉ có Design (Figma) và Luồng (Specs) → Shift-Left Testing

*Mục tiêu: Bắt bug của Designer và BA trước khi gõ dòng code đầu tiên.*

**Checklist:**
- [ ] **Review Figma — Missing States:** Design đã vẽ đủ trạng thái Loading, Empty (0 kết quả), Disabled, Hover chưa? Error screen (404, network error, toast)?
- [ ] **Review Flow — Nhánh rẽ:** Có Role/Permission nào bị bỏ sót? Các state dữ liệu (VD: Pending → Approved → Rejected) có thiếu luồng quay xe không?
- [ ] **Review Boundary:** Text dài quá layout có bị vỡ không? (Cần text-overflow).
- [ ] **Đối chiếu API Docs (Swagger):** Các trường `required`/`optional` khớp giữa UI và API? Data type UI (Select Box) match API (Array hay String)?
- [ ] **Viết test cases trên giấy** trước khi code → phát hiện spec thiếu sót sớm.

### Kịch bản B: Đã có UI và API sẵn sàng trên môi trường Test

*Mục tiêu: Thực thi test (Execution) và rà soát mọi ngóc ngách của tính năng.*

**Checklist:**
- [ ] **Happy Path (Positive):** Đi đúng luồng chuẩn, đảm bảo tính năng chính hoạt động.
- [ ] **Negative & Edge Cases:**
  - Cố tình nhập sai data format (chữ vào ô số, email thiếu `@`).
  - Spam click liên tục xem có gọi trùng API không (cần debounce/disable).
  - Race Conditions: Chuyển trang/tab khi API chưa trả về → state có đè nhau không.
  - Ngắt kết nối: Submit form rồi tắt wifi, F5 giữa chừng.
- [ ] **Integration & API Test (Mở Network Tab):**
  - API trả 400/500: Giao diện có crash trắng không, hay báo lỗi thân thiện?
  - API Timeout/Chậm: Có loading skeleton không?
  - Payload gửi đi có dính data thừa không?
- [ ] **Responsive:** Desktop → Tablet → Mobile viewport.
- [ ] **Cross-browser:** Chrome, Firefox, Safari (nếu cần).

---

## 4. PHÂN LOẠI TEST — "Chạy loại test nào, khi nào?"

| Loại Test | Khi nào? | Scope | Thời gian |
|-----------|----------|-------|-----------|
| **Smoke Test** | Sau deploy, sau mỗi build | Chỉ P0: Login, trang chính load được | 5-10 phút |
| **Sanity Test** | Sau fix bug cụ thể | Module liên quan đến bug đó | 15-30 phút |
| **Regression Test** | Trước release, sau merge feature | Toàn bộ test suite P0-P2 | 1-4 giờ |
| **Exploratory Test** | Feature mới, chưa có spec rõ | Tự do khám phá, không theo script | 30-60 phút |

---

## 5. CÁCH ĐÁNH ĐỘ ƯU TIÊN TEST CASE (Priority)

Những thứ "đập vào mặt user" và luồng tiền/dữ liệu chính luôn ưu tiên cao nhất.

| Priority | Tên | Định nghĩa | Ví dụ | Khi nào chạy? |
|----------|-----|-------------|-------|----------------|
| **P0** | Blocker / Sanity | Lỗi khiến hệ thống không dùng được | Login crash, trang trắng, API chính sập 500 | **MỌI lúc** (Smoke) |
| **P1** | Critical | Lỗi luồng nghiệp vụ chính (Happy Path) | Submit form không qua, data lưu sai, tính toán lệch | **Mỗi build** |
| **P2** | Major | Lỗi Edge case, Negative path, có workaround | Spam click gửi trùng request, filter kết hợp sai logic | **Mỗi release** |
| **P3** | Minor | Lỗi thẩm mỹ, UX không critical | Lệch 2px padding, sai font weight, hover color lệch Figma | **Khi rảnh** |

> **Quy tắc 80/20:** Viết test P0 + P1 trước — cover 80% rủi ro. P2 + P3 viết bổ sung khi có thời gian.

---

## 6. HƯỚNG DẪN VIẾT 1 TEST CASE CHUẨN (Test Case Template)

Một Test Case chuẩn phải đủ chi tiết để *một người mới vào team, chưa biết gì về dự án* cũng có thể đọc và thao tác y hệt bạn, cho ra cùng kết quả.

### 6.1. Các trường bắt buộc

| # | Trường | Mô tả | Bắt buộc? |
|---|--------|-------|-----------|
| 1 | **Test Case ID** | Mã định danh duy nhất | ✅ |
| 2 | **Module** | Thuộc module/feature nào | ✅ |
| 3 | **Title** | Mô tả ngắn gọn mục đích test | ✅ |
| 4 | **Priority** | P0 / P1 / P2 / P3 | ✅ |
| 5 | **Type** | Positive / Negative / Boundary / Edge / Security | ✅ |
| 6 | **Pre-conditions** | Điều kiện tiên quyết trước khi test | ✅ |
| 7 | **Test Data** | Dữ liệu cụ thể dùng để test | ✅ |
| 8 | **Steps** | Từng bước thao tác, rõ ràng, đánh số | ✅ |
| 9 | **Expected Result** | Hệ thống phản hồi ra sao (UI + API + DB) | ✅ |
| 10 | **Actual Result** | Kết quả thực tế khi chạy test | ✅ (khi execute) |
| 11 | **Status** | Pass / Fail / Blocked / Skipped | ✅ (khi execute) |
| 12 | **Notes / Attachments** | Screenshot, video, log, ghi chú | ⬜ Optional |

### 6.2. Quy tắc đặt tên Test Case ID (Naming Convention)

```
Format:  {MODULE}_{FEATURE}_{TYPE}_{SEQ}

MODULE:   Viết tắt module (AUTH, TS, USR, LEAVE, DASH...)
FEATURE:  Viết tắt tính năng (LOGIN, CREATE, DELETE, FILTER, EXPORT...)
TYPE:     P = Positive, N = Negative, B = Boundary, S = Security, E = Edge case
SEQ:      Số thứ tự (001, 002, ...)

Ví dụ:
  AUTH_LOGIN_P_001    → Login thành công với email/pass hợp lệ
  AUTH_LOGIN_N_001    → Login với password sai
  AUTH_LOGIN_B_001    → Login với password đúng 8 ký tự (biên dưới)
  AUTH_LOGIN_S_001    → Login với SQL injection trong ô email
  TS_ATTENDANCE_P_001 → Chấm công thành công ngày hiện tại
  LEAVE_CREATE_E_001  → Tạo đơn nghỉ khi đã hết phép năm
```

---

## 7. VÍ DỤ MẪU TEST CASE HOÀN CHỈNH

### Ví dụ 1: Positive Test — Login thành công

```yaml
Test Case ID:    AUTH_LOGIN_P_001
Module:          Authentication
Title:           Verify user can login successfully with valid credentials
Priority:        P0
Type:            Positive
Pre-conditions:
  - Trang login đã load hoàn tất
  - Account test đã tồn tại: user@test.com / Pass@1234
  - Account ở trạng thái Active, chưa bị lock
Test Data:
  - Email: user@test.com
  - Password: Pass@1234
Steps:
  1. Mở trang /login
  2. Nhập "user@test.com" vào ô Email
  3. Nhập "Pass@1234" vào ô Password
  4. Click nút "Đăng nhập"
Expected Result:
  - UI: Redirect sang trang Dashboard (/dashboard) trong vòng 3 giây
  - UI: Hiển thị tên user ở góc phải header
  - API: POST /api/auth/login trả về status 200, body chứa access_token
  - Storage: access_token được lưu vào localStorage/cookie
Actual Result:   [Điền khi execute]
Status:          [Pass/Fail/Blocked/Skipped]
```

### Ví dụ 2: Negative Test — Login sai password

```yaml
Test Case ID:    AUTH_LOGIN_N_001
Module:          Authentication
Title:           Verify system shows error when user enters wrong password
Priority:        P1
Type:            Negative
Pre-conditions:
  - Trang login đã load hoàn tất
  - Account test: user@test.com / Pass@1234
Test Data:
  - Email: user@test.com
  - Password: WrongPass@999
Steps:
  1. Mở trang /login
  2. Nhập "user@test.com" vào ô Email
  3. Nhập "WrongPass@999" vào ô Password
  4. Click nút "Đăng nhập"
Expected Result:
  - UI: Hiển thị inline error message: "Email hoặc mật khẩu không đúng"
  - UI: Ô password được clear, focus trở về ô password
  - UI: KHÔNG redirect sang trang khác
  - API: POST /api/auth/login trả về status 401
  - Security: Error message KHÔNG tiết lộ "password sai" mà dùng generic message
Actual Result:   [Điền khi execute]
Status:          [Pass/Fail/Blocked/Skipped]
```

### Ví dụ 3: Boundary Test — Password ở biên dưới

```yaml
Test Case ID:    AUTH_LOGIN_B_001
Module:          Authentication
Title:           Verify system accepts password with exactly minimum length (8 chars)
Priority:        P2
Type:            Boundary
Pre-conditions:
  - Đã tạo account với password đúng 8 ký tự: "Abcd@123"
Test Data:
  - Email: boundary@test.com
  - Password: Abcd@123 (8 ký tự — biên dưới)
Steps:
  1. Mở trang /login
  2. Nhập "boundary@test.com" vào ô Email
  3. Nhập "Abcd@123" vào ô Password
  4. Click nút "Đăng nhập"
Expected Result:
  - UI: Login thành công, redirect sang Dashboard
  - API: POST /api/auth/login trả về status 200
Actual Result:   [Điền khi execute]
Status:          [Pass/Fail/Blocked/Skipped]
```

### Ví dụ 4: Edge Case — Spam click Delete

```yaml
Test Case ID:    USR_DELETE_E_001
Module:          User Management
Title:           Verify system prevents duplicate API calls when user spam-clicks Delete
Priority:        P2
Type:            Edge Case
Pre-conditions:
  - User đã login với role Admin
  - Trang User List (/admin/users) đã load hoàn tất
  - Bảng dữ liệu có ít nhất 2 dòng user hợp lệ
  - Mở DevTools > Network tab để monitor requests
Test Data:
  - Target user: Dòng đầu tiên trong bảng
Steps:
  1. Xác nhận dòng đầu tiên hiển thị tên user và nút "Xoá" ở trạng thái enabled
  2. Click chuột trái liên tục 5 lần vào nút "Xoá" thật nhanh (< 1 giây)
  3. Quan sát trạng thái nút "Xoá" ngay lập tức
  4. Kiểm tra Network tab xem có bao nhiêu request được gửi đi
  5. Đợi API response trả về
  6. Kiểm tra bảng dữ liệu sau khi xoá
Expected Result:
  1. Sau click đầu tiên: Nút "Xoá" chuyển sang Disabled + Loading spinner
  2. Network tab: CHỈ có DUY NHẤT 1 request DELETE /api/users/{id}
  3. Sau khi API trả 200: Dòng dữ liệu biến mất (hoặc fade-out animation)
  4. Toast message: "Xoá user thành công"
  5. Nếu bảng còn 0 dòng → hiển thị Empty State: "Chưa có dữ liệu"
  6. Tổng số record ở footer table giảm đi 1
Actual Result:   [Điền khi execute]
Status:          [Pass/Fail/Blocked/Skipped]
Notes:           Kiểm tra bằng cả click thường + double-click
```

---

## 8. CHECKLIST THEO LOẠI COMPONENT

### 8.1. 📝 Form (Input, Select, DatePicker, Checkbox, Radio...)

```
## Positive
- [ ] Submit với tất cả trường hợp lệ → thành công
- [ ] Từng trường required để trống → hiện validation error tương ứng
- [ ] Tab key di chuyển focus đúng thứ tự giữa các trường
- [ ] Enter key submit form (nếu design cho phép)

## Negative
- [ ] Nhập HTML/Script tags → không render raw HTML (XSS prevention)
- [ ] Nhập toàn spaces → validation báo "không được để trống"
- [ ] Copy-paste text có ký tự đặc biệt (emoji, unicode) → xử lý đúng
- [ ] Paste text rất dài (> limit) → truncate hoặc báo lỗi

## Boundary
- [ ] Từng trường text: nhập đúng min length → accept
- [ ] Từng trường text: nhập đúng max length → accept
- [ ] Từng trường text: nhập min-1 → reject
- [ ] Từng trường text: nhập max+1 → reject hoặc truncate
- [ ] Number fields: giá trị min, max, min-1, max+1
- [ ] Date fields: ngày quá khứ, tương lai, hôm nay, 29/02 năm nhuận

## UX
- [ ] Loading state khi submit (button disabled + spinner)
- [ ] Error state: inline errors hiện đúng chỗ, đúng message
- [ ] Success state: toast/redirect/clear form
- [ ] Network error: hiện thông báo thân thiện, KHÔNG crash trắng trang
```

### 8.2. 📊 Data Table (List, Grid, Pagination...)

```
## Display
- [ ] Load data thành công, hiển thị đúng số dòng theo page size
- [ ] Empty state khi không có data
- [ ] Loading skeleton khi đang fetch
- [ ] Text dài bị truncate + tooltip, không vỡ layout

## Pagination
- [ ] Page 1 mặc định, nút Previous disabled
- [ ] Chuyển trang cuối, nút Next disabled
- [ ] Thay đổi page size → reset về page 1
- [ ] URL params sync với pagination state (refresh giữ trang)

## Sort & Filter
- [ ] Sort ASC/DESC từng cột sortable
- [ ] Filter kết hợp nhiều điều kiện cùng lúc
- [ ] Clear filter → về trạng thái ban đầu
- [ ] Filter không có kết quả → Empty state + message rõ ràng

## Actions (CRUD)
- [ ] Create mới → thêm vào đầu/cuối bảng (tùy design)
- [ ] Edit inline hoặc modal → data update real-time
- [ ] Delete → Confirm dialog → xoá → refresh list
- [ ] Bulk actions (select all, delete nhiều) nếu có
```

### 8.3. 🔲 Modal / Dialog

```
## Open/Close
- [ ] Mở bằng trigger button → modal hiện với animation
- [ ] Đóng bằng nút X → modal ẩn
- [ ] Đóng bằng click overlay (backdrop) → modal ẩn
- [ ] Đóng bằng phím ESC → modal ẩn
- [ ] Body scroll bị lock khi modal mở

## Content
- [ ] Content dài → modal có scroll nội bộ, không vượt viewport
- [ ] Focus trap: Tab key chỉ di chuyển trong modal
- [ ] Sau khi đóng: focus trở về trigger button (accessibility)

## Form trong Modal
- [ ] Submit thành công → đóng modal + refresh data nền
- [ ] Submit lỗi → giữ modal mở + hiện error
- [ ] Đóng modal khi có unsaved changes → Confirm dialog "Bạn có chắc?"
```

### 8.4. 🧭 Navigation (Menu, Tabs, Sidebar...)

```
## Routing
- [ ] Click menu item → navigate đúng route
- [ ] Active state highlight đúng item hiện tại
- [ ] Deep link (paste URL trực tiếp) → đúng trang + đúng active state
- [ ] Browser Back/Forward hoạt động đúng

## Permissions
- [ ] Menu items ẩn/hiện đúng theo role user
- [ ] Truy cập URL trực tiếp khi không có quyền → redirect hoặc 403

## Responsive
- [ ] Desktop: sidebar/menu đầy đủ
- [ ] Tablet: sidebar collapse thành icon
- [ ] Mobile: hamburger menu
```

---

## 9. TEST COVERAGE MATRIX — "Đã test đủ chưa?"

Dùng bảng Requirement Traceability Matrix (RTM) để tracking:

```
| Requirement ID | Test Case IDs                                    | Coverage |
|---------------|--------------------------------------------------|----------|
| REQ_AUTH_001   | AUTH_LOGIN_P_001, N_001, N_002, B_001, S_001      | ✅ 5/5   |
| REQ_AUTH_002   | AUTH_LOGOUT_P_001                                 | ⚠️ 1/3   |
| REQ_LEAVE_001  | LEAVE_CREATE_P_001, P_002, N_001, E_001           | ✅ 4/4   |
| REQ_TS_001     | (chưa viết)                                       | ❌ 0/4   |
```

> **Cảnh báo:** Nếu một Requirement chưa có test case → đó là **blind spot**. Bug ở đây sẽ lọt ra production.

---

## 10. TỪ TEST CASE THỦ CÔNG → AUTOMATION

Khi đã viết test case manual chuẩn, việc chuyển sang automation rất tự nhiên:

| Manual Test Case | Automation Equivalent |
|--|--|
| **Pre-conditions** | `beforeEach()` / `beforeAll()` / `test.use()` |
| **Steps** | `await page.click()`, `await page.fill()`, `await page.goto()` |
| **Expected Result** | `expect(...)` assertions |
| **Test Data** | Parameterized tests / fixtures / test data files |
| **Test Case ID** | `test('AUTH_LOGIN_P_001: Verify login success', ...)` |

### Mapping ví dụ (Playwright):

```typescript
// AUTH_LOGIN_P_001 → Playwright automation
test.describe('Authentication - Login', () => {
  test('AUTH_LOGIN_P_001: Verify user can login with valid credentials', async ({ page }) => {
    // Pre-conditions
    await page.goto('/login');

    // Steps
    await page.fill('[data-testid="email-input"]', 'user@test.com');
    await page.fill('[data-testid="password-input"]', 'Pass@1234');
    await page.click('[data-testid="login-button"]');

    // Expected Results
    await expect(page).toHaveURL('/dashboard', { timeout: 3000 });
    await expect(page.locator('[data-testid="user-name"]')).toBeVisible();
  });

  test('AUTH_LOGIN_N_001: Verify error on wrong password', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[data-testid="email-input"]', 'user@test.com');
    await page.fill('[data-testid="password-input"]', 'WrongPass@999');
    await page.click('[data-testid="login-button"]');

    await expect(page.locator('[data-testid="login-error"]'))
      .toHaveText('Email hoặc mật khẩu không đúng');
    await expect(page).toHaveURL('/login');
  });
});
```

---

## 11. ANTI-PATTERNS — Những sai lầm phổ biến khi Dev viết test

| ❌ Sai | ✅ Đúng | Giải thích |
|--------|---------|------------|
| Title: "Test login" | Title: "Verify login fails when password is empty" | Phải cụ thể mục đích test |
| Steps: "Nhập data và submit" | Steps: "1. Nhập 'abc@test.com' vào ô Email..." | Từng bước phải đủ chi tiết để reproduce |
| Expected: "Hiện lỗi" | Expected: "Hiện inline error 'Mật khẩu không được để trống' dưới ô Password" | Phải mô tả chính xác nội dung + vị trí |
| Chỉ test Happy Path | Test cả Happy + Negative + Boundary + Edge | Dev thường chỉ test đường vui, QA test đường buồn |
| Test data hardcode trong step | Tách Test Data riêng biệt | Dễ maintain, dễ parameterize cho automation |
| Không ghi Pre-conditions | Ghi rõ: account nào, data gì, trang nào | Người khác không reproduce được nếu thiếu |

---

## 12. QUICK REFERENCE — Nhận feature mới, bắt đầu từ đâu?

```
 1. Đọc hiểu specs/design
    ↓
 2. Identify entities & states (State Transition)
    ↓
 3. Identify inputs & validations (EP + BVA)
    ↓
 4. Identify business rules & conditions (Decision Table)
    ↓
 5. Viết test cases P0 trước
    ↓
 6. Viết test cases P1 (Happy Path)
    ↓
 7. Viết test cases P2 (Negative + Edge)
    ↓
 8. Review lại bằng Checklist theo Component Type (Section 8)
    ↓
 9. Map vào RTM matrix → kiểm tra coverage (Section 9)
    ↓
10. (Optional) Convert sang automation test (Section 10)
```

> **Lưu ý cuối cùng:** Đừng viết test case SAU khi code xong. Viết TRƯỚC hoặc SONG SONG khi code → bạn sẽ phát hiện spec thiếu sớm hơn, code chuẩn hơn, và tốn ít thời gian fix bug hơn.
