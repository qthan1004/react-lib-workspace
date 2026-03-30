# Remove Dropdown References

- **Goal**: Xóa tất cả comment và note trong code + docs còn nhắc đến `@thanh-libs/dropdown` hoặc dropdown context không còn liên quan.
- **Plan Reference**: `plan/2026-03-30_menu_v0.1.md` — Section 4: Cleanup: Remove dropdown references

## Files

| Action | Path |
|--------|------|
| MODIFY | `/home/administrator/back up/Personal lib/libs/menu/src/lib/components/Menu.tsx` |
| MODIFY | `/home/administrator/back up/Personal lib/plan/menu-analysis.md` |

## What to Do

### 1. `Menu.tsx` — Sửa comment JSDoc

Tại dòng 11 (trong JSDoc block của component `Menu`), tìm:

```ts
 * Always rendered (not a dropdown). Supports inline collapsible sub-menus,
```

Thay bằng:

```ts
 * Always rendered — persistent visible list. Supports inline collapsible sub-menus,
```

### 2. `menu-analysis.md` — Xóa/sửa dropdown references

Mở file và tìm tất cả đoạn nhắc đến `@thanh-libs/dropdown` hoặc "dropdown", xử lý theo từng vị trí:

- **L8**: Xóa/sửa note về `@thanh-libs/dropdown`
- **L304**: Xóa note về dropdown
- **L339**: Sửa reference
- **L367**: Xóa context menu reference đến dropdown
- **L413**: Sửa Section 11 reference
- **L420**: Sửa todo reference

Thêm vào **Section 11** (Nhật ký / Changelog) một entry mới:

```markdown
### 2026-03-30
- Removed all references to `@thanh-libs/dropdown` — Menu is a standalone persistent list component, not related to dropdown pattern.
```

> **Cách tiếp cận**: Đọc toàn bộ file trước, xác định chính xác từng đoạn cần sửa, không xóa sai nội dung. Nếu một dòng chỉ chứa nội dung về dropdown thì xóa dòng đó. Nếu mixed thì chỉ sửa phần dropdown.

## Constraints

- Đọc skill: `.agent/skills/strict-scope/SKILL.md`
- Chỉ sửa 2 file trong danh sách
- Không thay đổi logic hay component code — chỉ sửa comment/documentation

## Dependencies

- None (ticket này độc lập, có thể chạy song song với 01/02/03 nhưng nên để cuối cùng cho rõ ràng)

## Verification

Kiểm tra không còn reference đến dropdown trong codebase menu:

```bash
grep -ri "dropdown" "/home/administrator/back up/Personal lib/libs/menu/src"
```

Kết quả mong đợi: **không có output**.

```bash
cd "/home/administrator/back up/Personal lib/libs/menu" && npx vitest run
```

Tests vẫn pass (không có thay đổi logic).

## Done Criteria

- [ ] `Menu.tsx` L11 comment đã được cập nhật
- [ ] `menu-analysis.md` không còn reference không phù hợp đến `@thanh-libs/dropdown`
- [ ] `menu-analysis.md` Section 11 có entry changelog ngày 2026-03-30
- [ ] `grep -ri "dropdown" libs/menu/src` trả về rỗng
- [ ] Tất cả tests pass
- [ ] File moved to `plan/tasks/done/`
