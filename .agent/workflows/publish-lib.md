---
description: Publish a lib to npm via release branch and standard-version
---

// turbo-all

# Publish Lib

## 0. Doc Check (bắt buộc trước khi publish)
- Đọc `src/index.ts` + `src/lib/models/` → liệt kê tất cả exported components, types, props.
- So sánh với `README.md` hiện tại → nếu thiếu/sai/cũ → regenerate/update README.
- Nếu có thay đổi README → commit vào master + push trước khi chạy alpha.

**Pre-checks**: `bash tools/check-lib-deps.sh <lib-name>` → fix nếu thiếu. Commit master.

## 1. Alpha
```bash
bash tools/publish-lib.sh alpha <lib-name>
```

## 2. Tạo PR + Check CI
- `mcp_github_create_pull_request(owner="system-core-ui", repo=<lib-name>, title="release: <version>", head="release", base="master")` → ghi `pull_number`.
- Poll `mcp_github_get_pull_request_status` mỗi 60s, max 5 phút.
- ✅ PASS → Step 3. ❌ FAIL → đọc lỗi, fix, push lại, re-check. ⏳ Timeout → hỏi user.

## 3. Official Release
```bash
bash tools/publish-lib.sh release <lib-name>
```
Poll lại PR status tương tự Step 2. PASS → Step 4.

## 4. Merge
- `mcp_github_merge_pull_request(owner="system-core-ui", repo=<lib-name>, pull_number=<N>, merge_method="merge")`
- Sync local:
```bash
cd libs/<lib-name> && git checkout master && git pull origin master && git branch -d release
```

## 5. Update Workspace
```bash
bash tools/publish-lib.sh update <lib-name>
```
