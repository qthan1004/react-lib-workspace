# CI/CD Pipeline Plan

## Goal

Tích hợp CI/CD pipeline cho mỗi lib repo trong `system-core-ui` org.

## Scope

### 1. GitHub Actions — Build & Test
- Trigger on PR và push to `master`
- Steps: install → lint → build → test
- Áp dụng cho tất cả 4 repos: `theme`, `utils`, `dialog`, `typography`

### 2. Standard Version — Auto Versioning
- Tích hợp `standard-version` vào mỗi lib repo
- Auto bump version dựa trên Conventional Commits:
  - `feat` → minor
  - `fix` → patch
  - `BREAKING CHANGE` → major
- Auto generate `CHANGELOG.md`

### 3. Auto Publish (optional)
- Publish to npm khi merge vào `master` (nếu cần)
- Hoặc manual trigger via workflow_dispatch

## Status
- [ ] Chưa bắt đầu — plan cho ngày mai
