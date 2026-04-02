# All Libs: Publish Updated Libraries to npm

- **Goal**: Publish tất cả libs đã thay đổi trong plan này lên npm theo workflow `/publish-lib`.
- **Plan Reference**: `plan/workspace/2026-04-02_pxToRem-and-dep-audit.md` — Final step sau Part 1-3

## Libs cần publish

> [!IMPORTANT]
> Thứ tự publish phải theo dependency graph — **leaf dependencies trước, consumers sau**.

| Order | Library | Lý do publish |
|:-----:|---------|---------------|
| 1 | **utils** | check-deps.mjs + prerelease hook mới |
| 2 | **theme** | peerDeps fix + check-deps.mjs + prerelease hook |
| 3 | **typography** | peerDeps fix + check-deps.mjs + prerelease hook |
| 4 | **button** | pxToRem convert + peerDeps fix + check-deps.mjs |
| 5 | **layout** | pxToRem convert + check-deps.mjs |
| 6 | **card** | pxToRem convert + prerelease hook (nếu thay đổi) |
| 7 | **avatar** | prerelease hook update |
| 8 | **chip** | prerelease hook update |
| 9 | **dialog** | pxToRem convert + check-deps.mjs + prerelease hook |
| 10 | **menu** | pxToRem convert + peerDeps normalize |

> [!NOTE]
> Nếu một lib **không có thay đổi source code** (chỉ thay đổi `check-deps.mjs` hoặc `package.json` scripts), vẫn publish để đảm bảo `package.json` mới nhất lên npm.
> Bỏ qua lib nào không có bất kỳ thay đổi nào.

## What to Do

### Với mỗi lib (theo thứ tự trên), chạy workflow `/publish-lib`:

1. **Dep check**: `cd libs/<lib-name> && node check-deps.mjs`
2. **Doc check**: Đọc exports, so sánh README, update nếu cần
3. **Alpha**: `bash tools/publish-lib.sh alpha <lib-name>`
4. **PR + CI**: Tạo PR, poll status
5. **Release**: `bash tools/publish-lib.sh release <lib-name>`
6. **Merge**: Merge PR, sync local
7. **Update workspace**: `bash tools/publish-lib.sh update <lib-name>`

### Lặp lại cho từng lib.

### Sau khi publish xong tất cả:

```bash
# Git push workspace
cd "/home/administrator/back up/Personal lib"
git add -A && git commit -m "chore: update submodule refs after pxToRem + dep audit release" && git push
```

## Constraints

- Đọc workflow: `.agent/workflows/publish-lib.md`
- Đọc skill: `.agent/skills/strict-scope/SKILL.md`
- Publish theo đúng dependency order — nếu lib A depend on lib B, B phải publish trước
- KHÔNG skip dep check hay doc check
- Nếu CI fail → fix + re-push trước khi tiếp lib tiếp theo

## Dependencies

- **04-all-deps-check-integrate** phải xong trước (tất cả changes phải hoàn tất)

## Verification

```bash
# Verify tất cả libs đã publish
for lib in utils theme typography button layout card avatar chip dialog menu; do
  echo "=== $lib ==="
  npm view @thanh-libs/$lib version
done
```

## Done Criteria

- [ ] Tất cả libs có thay đổi đã publish lên npm
- [ ] Tất cả PRs đã merge
- [ ] Local master synced với remote
- [ ] Workspace submodule refs updated và pushed
- [ ] File moved to `plan/tasks/done/`
