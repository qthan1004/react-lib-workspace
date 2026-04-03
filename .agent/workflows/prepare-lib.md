---
description: Prepare a lib before publishing (Check dependencies and generate docs)
---

// turbo-all

# Prepare Lib

## 1. Dependency Check (bắt buộc)

```bash
cd libs/<lib-name> && node check-deps.mjs
```

- ✅ PASS → tiếp Step 2.
- ❌ FAIL → đọc output, fix `package.json` (thêm missing deps vào `peerDependencies` + `devDependencies` với `"*"`) → chạy lại `node check-deps.mjs` → **loop cho đến khi PASS**.

## 2. Doc Check

- Review nội dung tệp `src/index.ts` và các tệp trong `src/lib/models/`.
- Nếu thông tin component/interface có export mà trong `README.md` bị thiếu/sai -> Cập nhật lại README.
- Lưu lại thay đổi, commit và push lên.
