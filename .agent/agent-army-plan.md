# Agent Army — Quota Optimization Plan

Tổng hợp chiến lược tối ưu quota khi làm việc với nhiều libs (20+).

## Nguyên tắc cốt lõi

> **1 tool call = tất cả libs**, không phải 1 tool call × N libs.

## Bộ vũ khí Agent

### Context (đọc đầu mỗi conversation)
- `.agent/context.md` — cấu trúc project, conventions, tools available

### Skills (kiến thức chuyên môn)
- `git-commit-convention` — ✅ đã có
- `styled-theme-convention` — ✅ đã có
- `component-patterns` — ❌ cần tạo: cách viết React component chuẩn
- `testing-patterns` — ❌ cần tạo: cách viết test
- `task-delegation` — ✅ đã có: Planner/Worker protocol, ticket template

### Workflows (quy trình step-by-step)
- `/publish-lib` — ✅ đã có: release branch → alpha → official → merge
- `/push-lib` — ✅ đã có: push 1 lib submodule
- `/push-all-libs` — ✅ đã có: push tất cả libs
- `/create-lib` — ❌ cần tạo: scaffold lib mới từ templates
- `/delegate` — ✅ đã có: Planner mode, tạo atomic task tickets
- `/save-plan` — ✅ đã có: lưu plan vào `plan/` theo format chuẩn

### Tools (scripts tự động hóa)

| Script | Mục đích | Status |
|--------|----------|--------|
| `push-all-libs.sh` | Commit + push tất cả libs + workspace | ✅ |
| `apply-all-libs.sh` | Chạy 1 command cho tất cả libs | ✅ |
| `sync-config.sh` | Copy template file vào tất cả libs | ✅ |
| `check-all-libs.sh` | Kiểm tra/inspect file ở tất cả libs | ✅ |
| `gen-lib.sh` | Scaffold lib mới | ⚠️ cần update templates |

### Templates (cần tạo)
- `tools/templates/package.json` — template chuẩn với devDeps
- `tools/templates/tsconfig.json` — standalone, không extends
- `tools/templates/tsconfig.lib.json` — standalone
- `tools/templates/tsconfig.spec.json` — standalone
- `tools/templates/tsconfig.storybook.json` — standalone
- `tools/templates/publish.yml` — CI/CD with alpha + cleanup
- `tools/templates/vite.config.mts` — vite build config

## Flow lý tưởng

```
User: "tạo lib button"
  │
  ├─ Agent đọc context.md → biết tools + structure
  ├─ Agent tìm workflow /create-lib
  ├─ Agent đọc skills liên quan
  ├─ Hỏi nếu thiếu info
  ├─ Tạo plan + task
  ├─ Thực thi (dùng tools/ scripts)
  └─ Báo user check ✅
```

## Mẹo dùng Agent tiết kiệm quota

1. **Chia conversation theo task** — 1 conv = 1 việc, tránh context phình
2. **Gom request** — nói hết 1 lần thay vì nhiều message
3. **Dùng tools thay tool calls** — 1 script = N libs
4. **Templates > manual edit** — sync-config thay vì edit từng file
5. **Workflows** — agent follow steps, ít suy nghĩ hơn

## TODO

- [x] Tạo templates folder (`tools/templates/`)
- [x] Update `gen-lib.sh` dùng templates mới
- [x] Tạo workflow `/create-lib`
- [x] Tạo skill `component-patterns`
- [ ] Tạo skill `testing-patterns`
