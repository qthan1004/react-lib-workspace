---
description: Publish a lib to npm via release branch and standard-version
---

// turbo-all

# Publish Lib

## 0. Dependency Check (bắt buộc — chạy trước tất cả)

```bash
cd libs/<lib-name> && node check-deps.mjs
```

- ✅ PASS → tiếp Step 1.
- ❌ FAIL → đọc output, fix `package.json` (thêm missing deps vào `peerDependencies` + `devDependencies` với `"*"`) → chạy lại `node check-deps.mjs` → **loop cho đến khi PASS**.
- Nếu lib chưa có `check-deps.mjs` → copy từ lib khác (e.g. `libs/menu/check-deps.mjs`), rồi chạy.
- Nếu có thay đổi → commit vào master + push trước khi tiếp.

## 1. Doc Check (bắt buộc trước khi publish)
- Đọc `src/index.ts` + `src/lib/models/` → liệt kê tất cả exported components, types, props.
- So sánh với `README.md` hiện tại → nếu thiếu/sai/cũ → regenerate/update README.
- Nếu có thay đổi README → commit vào master + push trước khi chạy alpha.

## 2. Alpha
```bash
bash tools/publish-lib.sh alpha <lib-name>
```

## 3. Tạo PR + Check CI
- `mcp_github_create_pull_request(owner="system-core-ui", repo=<lib-name>, title="release: <version>", head="release", base="master")` → ghi `pull_number`.
- Poll `mcp_github_get_pull_request_status` mỗi 60s, max 5 phút.
- ✅ PASS → Step 4. ❌ FAIL → đọc lỗi, fix, push lại, re-check. ⏳ Timeout → hỏi user.

## 4. Official Release
```bash
bash tools/publish-lib.sh release <lib-name>
```
Poll lại PR status tương tự Step 3. PASS → Step 5.

## 5. Merge
- `mcp_github_merge_pull_request(owner="system-core-ui", repo=<lib-name>, pull_number=<N>, merge_method="merge")`
- Sync local:
```bash
cd libs/<lib-name> && git checkout master && git pull origin master && git branch -d release
```

## 6. Update Workspace
```bash
bash tools/publish-lib.sh update <lib-name>
```
