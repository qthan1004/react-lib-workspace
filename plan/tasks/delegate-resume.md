# Resume Delegation Plan

**Context**: Đang thực hiện phân rã (delegate) file plan `plan/2026-03-30_menu_sub-flying_v0.1.md` (Tính năng Sub Flying / Popover và display="icon" cho Menu). Quá trình bị tạm dừng. File này dùng để agent tiếp theo biết chính xác cần làm gì để hoàn tất việc tạo ticket.

## Trạng thái hiện tại

**Đã tạo các ticket (sẵn sàng cho Worker):**
1. `plan/tasks/todo/01-menu-deps-types-constants.md` (Thêm dependencies, types, constants)
2. `plan/tasks/todo/02-menu-context-mode-display.md` (Mở rộng MenuContext để truyền mode, display, trigger)
3. `plan/tasks/todo/03-menu-sub-resolve-mode-floating.md` (MenuSub resolve mode/trigger và setup `@floating-ui/react` state cho popover)

## Các ticket CẦN TẠO TIẾP THEO (Planner):

Agent khi đọc file này cần tiếp tục phân tích plan `plan/2026-03-30_menu_sub-flying_v0.1.md` và sinh ra các ticket sau vào thư mục `plan/tasks/todo/`:

### 04. Split `MenuSubContent`
- **Mục tiêu**: Tách `MenuSubContent` hành `InlineSubContent` (giữ nguyên logic cũ) và `PopoverSubContent` (sử dụng `useFloatingPosition` context, `FloatingPortal`, `safePolygon()`, có floating style container).
- **Dependency**: Ticket 03 (cần `MenuSubContext` có chứa các floating ui helpers và `resolvedMode`).

### 05. `MenuSubTrigger` Dual Mode
- **Mục tiêu**: Cập nhật `MenuSubTrigger` để hỗ trợ hiển thị icon theo mode (`▾`/`▴` cho inline, `▸` cho popover). Setup reference element cho popover mode bằng `setReference`, cấu hình keydown (ArrowRight mở popover, Enter/Space).
- **Dependency**: Ticket 03 (cần context reference setter).

### 06. Style Popover & `display="icon"` mode
- **Mục tiêu**: 
  - Tạo `PopoverSubContentStyled` (background, shadow, borders) trong `styled.tsx`.
  - Implement `display="icon"` trong `MenuItem` (rút gọn thành dạng icon-only, dùng `Tooltip` của `@thanh-libs/dialog` hiển thị text khi hover).
  - Implement `display="icon"` trong `MenuSubTrigger` (icon-only, ép mở dạng popover khi click/hover).
- **Dependency**: Ticket 04, 05 (cần các sub components đã setup xong context / state).

### 07. Finalize & Tests (Tùy chọn gom hoặc tách)
- **Mục tiêu**: Viết tests cho Popover sub-menu mode, `display="icon"` mode. Export đầy đủ types ra `index.ts`. Cập nhật tài liệu nếu cần.
- **Dependency**: Tất cả các ticket trên.

## Hướng dẫn cho Agent mới
Nếu bạn nhận được yêu cầu "tiếp tục delegate", hãy đọc file plan gốc (`plan/2026-03-30_menu_sub-flying_v0.1.md`) và tạo tiếp tuần tự các file markdown từ `04-*` đến `07-*` như mô tả ở trên vào thư mục `plan/tasks/todo/`, tuân thủ đúng template delegation (`.agent/skills/task-delegation/template.md`). Sau khi tạo xong, có thể xóa file `delegate-resume.md` này.
