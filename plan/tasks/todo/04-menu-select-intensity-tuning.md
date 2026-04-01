# Select Intensity Tuning

- **Goal**: Increase contrast between hover, softSelected, and selected background states so the visual hierarchy is clearly: `hover < softSelected < selected`.
- **Plan Reference**: `plan/menu/2026-04-01_enhance_v0.2.md` — Section ③B

## Files

| Action | Path |
|--------|------|
| MODIFY | `d:/workspace/react-lib-workspace/libs/menu/src/lib/styled.tsx` |

## What to Do

### `styled.tsx` — Adjust fallback colors in `MenuItemStyled`

**Current values** (line 53-54):
```typescript
const selectedBg = ownerColorScheme?.activeBg ?? palette?.action?.selected ?? 'rgba(25,118,210,0.08)';
const softSelectedBg = ownerColorScheme?.softSelectedBg ?? palette?.action?.hover ?? 'rgba(0,0,0,0.04)';
```

**Change the hardcoded fallback values** (the last fallback string in each line):

```typescript
const selectedBg = ownerColorScheme?.activeBg ?? palette?.action?.selected ?? 'rgba(25,118,210,0.16)';
const softSelectedBg = ownerColorScheme?.softSelectedBg ?? palette?.action?.hover ?? 'rgba(25,118,210,0.06)';
```

**Summary of visual hierarchy** (fallback values):
```
hover:        rgba(0,0,0,0.04)          — lightest (unchanged, line 86)
softSelected: rgba(25,118,210,0.06)     — subtle blue tint (was rgba(0,0,0,0.04))
selected:     rgba(25,118,210,0.16)     — clearly visible blue (was rgba(25,118,210,0.08))
```

Key changes:
- `selectedBg` fallback: `0.08 → 0.16` — double the opacity for clear visibility
- `softSelectedBg` fallback: neutral gray `rgba(0,0,0,0.04)` → blue-tinted `rgba(25,118,210,0.06)` — subtle but consistent with selected color family

## Constraints

- Đọc skill: `.agent/skills/component-patterns/SKILL.md`
- Only change the **last fallback** string values — do NOT change the colorScheme/palette resolution chain
- This only affects cases where no theme or colorScheme is provided
- Ensure the ordering: hover bg < softSelected bg < selected bg in opacity

## Dependencies

- None (independent of other tickets)

## Verification

```bash
cd d:/workspace/react-lib-workspace && npx nx build menu
```

## Done Criteria

- [ ] `selectedBg` fallback changed to `rgba(25,118,210,0.16)`
- [ ] `softSelectedBg` fallback changed to `rgba(25,118,210,0.06)`
- [ ] Hover bg fallback remains `rgba(0,0,0,0.04)` (unchanged)
- [ ] Build passes
- [ ] File moved to `plan/tasks/done/`
