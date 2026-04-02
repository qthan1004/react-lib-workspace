# pxToRem Standardization + Dependency Graph Audit

## Workspace Paths

| Env | Root |
|-----|------|
| **Windows** | `d:/workspace/react-lib-workspace` |
| **Ubuntu** | `/home/administrator/back up/Personal lib` |

> Tất cả file paths trong plan dùng dạng relative từ root: `libs/*/src/...`, `libs/*/package.json`

## Tổng quan

Plan này giải quyết 2 vấn đề infrastructure nền tảng, ảnh hưởng **tất cả libs** (không giới hạn scope utils):

1. **pxToRem standardization** — chuẩn hóa tất cả hardcoded px/rem sang `pxToRem()` 
2. **Dependency graph audit** — fix missing dependency declarations + integrate check vào build

**Thứ tự**: pxToRem **trước**, dependency fixes **sau** (vì pxToRem có thể thêm import `@thanh-libs/utils` vào libs chưa dùng → dep audit cần chạy sau).

---

## Part 1: pxToRem Standardization

### Vấn đề hiện tại

**htmlFontSize mismatch**: `pxToRem` dùng base **14**, nhưng các rem string cứng trong code dùng base **16**:

```
pxToRem(14)  = 14/14 = "1rem"       // base 14
'0.875rem'   = 14/16                 // base 16 (browser default)
```

### Quyết định cần đưa ra

> [!IMPORTANT]
> **htmlFontSize nên standardize ở 14 hay 16?**
>
> - **14** (hiện tại trong `pxToRem`): Phù hợp nếu app set `html { font-size: 14px }`
> - **16** (browser default): Phù hợp nếu không override html font-size
>
> Cần quyết định trước khi implement.

### Scope cần audit

| Library | Có hardcoded rem/px? | Dùng `pxToRem` chưa? |
|---------|:--:|:--:|
| **menu** | ✅ Constants: font sizes, icon sizes, border radius | ❌ Chưa |
| **theme** | ✅ GlobalStyles, theme constants | ✅ Đã dùng `pxToRem` |
| **typography** | ✅ styled.tsx | ✅ Đã dùng `pxToRem` |
| **avatar** | Cần check | ✅ Đã dùng `pxToRem` |
| **chip** | Cần check | ✅ Đã dùng `pxToRem` |
| **button** | Cần check | ❌ Chưa |
| **card** | Cần check | ❌ Chưa |
| **layout** | Cần check | ❌ Chưa |
| **dialog** | Cần check | ❌ Chưa |

### Tasks (high-level — cần detail sau khi quyết định htmlFontSize)

- [ ] Quyết định htmlFontSize standard
- [ ] Full audit hardcoded px/rem trong tất cả libs
- [ ] Convert tất cả sang `pxToRem(px)`
- [ ] Visual regression test qua Storybook

---

## Part 2: Dependency Graph Audit

### Vấn đề hiện tại

Một số libs import `@thanh-libs/*` nhưng không khai báo trong `package.json`:

| Library | Import `utils`? | Declared? | Import `theme`? | Declared? |
|---------|:--:|:--:|:--:|:--:|
| **theme** | ✅ `pxToRem`, `alpha` | ❌ **MISSING** | — | — |
| **typography** | ✅ `pxToRem` | ❌ **MISSING** | ✅ `ThemeSchema` | ❌ **MISSING** |
| **button** | ❌ | — | ✅ `ThemeSchema` | ❌ **MISSING** |
| **menu** | ❌ (sẽ dùng) | ✅ `"^0.0.8"` → cần `"*"` | ✅ | ✅ |

> Root cause build lỗi theme: consumer install `@thanh-libs/theme` nhưng utils không được kéo theo.

### Tasks

- [ ] Fix theme: add `peerDependencies: { "@thanh-libs/utils": "*" }`
- [ ] Fix typography: add `peerDependencies: { "@thanh-libs/theme": "*", "@thanh-libs/utils": "*" }`
- [ ] Fix button: add `peerDependencies: { "@thanh-libs/theme": "*" }`
- [ ] Normalize menu: `dependencies: "^0.0.8"` → `peerDependencies: "*"`
- [ ] Verify build tất cả libs

---

## Part 3: Integrate `check-deps` vào Build Pipeline

### Hiện trạng

Đã có `check-deps.mjs` per-lib (file 143 dòng, đầy đủ) — nhưng **chưa tích hợp đồng bộ**:

| Library | Có `check-deps.mjs`? | Tích hợp vào `prerelease`? |
|---------|:--:|:--:|
| **menu** | ✅ | ✅ `node check-deps.mjs && yarn vitest run` |
| **card** | ✅ | ✅ `node check-deps.mjs && yarn vitest run` |
| **avatar** | ✅ | ❌ Có file, chưa hook |
| **chip** | ✅ | ❌ Có file, chưa hook |
| **dialog** | ✅ | ❌ Có file, chưa hook |
| **button** | ❌ | ❌ |
| **layout** | ❌ | ❌ |
| **theme** | ❌ | ❌ |
| **typography** | ❌ | ❌ |
| **utils** | ❌ | ❌ |

### Tasks

**3A. Copy `check-deps.mjs` vào libs chưa có** (5 libs):

- [ ] `button/check-deps.mjs` — copy từ menu (same script)
- [ ] `layout/check-deps.mjs`
- [ ] `theme/check-deps.mjs`
- [ ] `typography/check-deps.mjs`
- [ ] `utils/check-deps.mjs`

**3B. Hook vào `prerelease` trong `standard-version.scripts`** (tất cả libs):

Pattern thống nhất:
```json
"prerelease": "node check-deps.mjs && yarn vitest run --passWithNoTests"
```

| Library | Current `prerelease` | Change needed |
|---------|---------------------|---------------|
| **menu** | `node check-deps.mjs && yarn vitest run` | ✅ Đã ok |
| **card** | `node check-deps.mjs && yarn vitest run` | ✅ Đã ok |
| **avatar** | `node ../../node_modules/vitest/vitest.mjs run` | Thêm `node check-deps.mjs &&` prefix |
| **chip** | `node ../../node_modules/vitest/vitest.mjs run` | Thêm `node check-deps.mjs &&` prefix |
| **dialog** | `npx vitest run` | Thêm `node check-deps.mjs &&` prefix |
| **button** | `npx vitest run` | Thêm `node check-deps.mjs &&` prefix |
| **layout** | `npx vitest run` | Thêm `node check-deps.mjs &&` prefix |
| **theme** | `npx vitest run` | Thêm `node check-deps.mjs &&` prefix |
| **typography** | `npx vitest run` | Thêm `node check-deps.mjs &&` prefix |
| **utils** | `node ../../node_modules/vitest/vitest.mjs run` | Thêm `node check-deps.mjs &&` prefix |

> [!NOTE]
> Vitest command style cũng chưa thống nhất (`npx vitest` vs `node ../../node_modules/vitest/vitest.mjs` vs `yarn vitest`). Có thể chuẩn hóa luôn trong task này.

### Automation Tools

| Tool | Scope | Usage |
|------|-------|-------|
| `check-deps.mjs` (per-lib) | Single lib — chạy lúc release | `node check-deps.mjs` trong mỗi lib |
| `check-deps.sh` (workspace) | Tất cả libs — chạy on demand | `/check-deps` workflow hoặc `bash .agent/skills/check-deps/check-deps.sh` |

Hai tool bổ trợ nhau:
- **Per-lib** (`.mjs`): Gate trước build/release — **fail fast, tự động**
- **Workspace** (`.sh`): Scan toàn bộ — **on demand, overview**

---

## Execution Order

```
Part 1 (pxToRem)  →  Part 2 (fix deps)  →  Part 3 (integrate check-deps)
```

Part 1 có thể thêm import `utils` vào libs mới → Part 2 cần chạy sau để catch all mismatches → Part 3 đảm bảo không tái phát.

---

## Complexity & Risk

| Aspect | Part 1 (pxToRem) | Part 2 (Deps) | Part 3 (Build gate) |
|--------|-------------------|----------------|---------------------|
| Complexity | **Medium** — audit + visual | **Low** — package.json | **Low** — copy + hook |
| Risk | **Medium** — visual regression | **Very low** | **None** |
| Scope | Tất cả libs | 4 libs | 10 libs |
