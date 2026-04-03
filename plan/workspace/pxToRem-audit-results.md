# pxToRem Audit Results

## htmlFontSize: 14

## Per-lib findings
> **Note:** Only hardcoded `px` values are reported in this audit. Existing `rem` values are explicitly skipped per user's request.

### button
| File | Line | Current Value | Equivalent px | pxToRem() |
|------|------|---------------|---------------|-----------|
| `src/lib/Button/styled.tsx` | 79 | `3px` | 3px | `pxToRem(3)` |
| `src/lib/Button/styled.tsx` | 100 | `1.5px` | 1.5px | `pxToRem(1.5)` |
| `src/lib/Button/styled.tsx` | 111 | `1.5px` | 1.5px | `pxToRem(1.5)` |

### card
| File | Line | Current Value | Equivalent px | pxToRem() |
|------|------|---------------|---------------|-----------|
| `src/lib/Card/styled.tsx` | 34 | `1px` | 1px | `pxToRem(1)` |

### chip
| File | Line | Current Value | Equivalent px | pxToRem() |
|------|------|---------------|---------------|-----------|
| `src/lib/Chip/styled.tsx` | 44 | `1px` | 1px | `pxToRem(1)` |
| `src/lib/Chip/styled.tsx` | 60 | `2px` | 2px | `pxToRem(2)` |
| `src/lib/Chip/styled.tsx` | 61 | `2px` | 2px | `pxToRem(2)` |
| `src/lib/Chip/styled.tsx` | 134 | `2px` | 2px | `pxToRem(2)` |
| `src/lib/Chip/styled.tsx` | 135 | `1px` | 1px | `pxToRem(1)` |

### dialog
| File | Line | Current Value | Equivalent px | pxToRem() |
|------|------|---------------|---------------|-----------|
| `src/lib/shared/CloseButton.tsx` | 43 | `8px` | 8px | `pxToRem(8)` |
| `src/lib/shared/CloseButton.tsx` | 45 | `8px` | 8px | `pxToRem(8)` |
| `src/lib/shared/CloseButton.tsx` | 47 | `8px` | 8px | `pxToRem(8)` |
| `src/lib/shared/CloseButton.tsx` | 49 | `8px` | 8px | `pxToRem(8)` |
| `src/lib/stories/Modal.stories.tsx` | 265 | `"700px"` | 700px | `pxToRem(700)` |
| `src/lib/stories/Modal.stories.tsx` | 269 | `"400px"` | 400px | `pxToRem(400)` |
| `src/lib/stories/Popover.stories.tsx` | 338 | `"300px"` | 300px | `pxToRem(300)` |
| `src/lib/stories/Popover.stories.tsx` | 342 | `"200px"` | 200px | `pxToRem(200)` |
| `src/lib/stories/styled.tsx` | 19 | `1px` | 1px | `pxToRem(1)` |
| `src/lib/stories/styled.tsx` | 49 | `1px` | 1px | `pxToRem(1)` |
| `src/lib/stories/styled.tsx` | 61 | `1px` | 1px | `pxToRem(1)` |
| `src/lib/constants/index.ts` | 14 | `'360px'` | 360px | `pxToRem(360)` |
| `src/lib/constants/index.ts` | 15 | `'480px'` | 480px | `pxToRem(480)` |
| `src/lib/constants/index.ts` | 16 | `'640px'` | 640px | `pxToRem(640)` |
| `src/lib/constants/index.ts` | 17 | `'800px'` | 800px | `pxToRem(800)` |
| `src/lib/constants/index.ts` | 18 | `'1024px'` | 1024px | `pxToRem(1024)` |

### layout
| File | Line | Current Value | Equivalent px | pxToRem() |
|------|------|---------------|---------------|-----------|
| `src/lib/stories/styled.tsx` | 25 | `1px` | 1px | `pxToRem(1)` |
| `src/lib/stories/styled.tsx` | 53 | `1px` | 1px | `pxToRem(1)` |

### menu
| File | Line | Current Value | Equivalent px | pxToRem() |
|------|------|---------------|---------------|-----------|
| `src/lib/styled/MenuDivider.styled.tsx` | 16 | `1px` | 1px | `pxToRem(1)` |
| `src/lib/styled/MenuSub.styled.tsx` | 57 | `1.5px` | 1.5px | `pxToRem(1.5)` |
| `src/lib/styled/MenuSub.styled.tsx` | 94 | `1px` | 1px | `pxToRem(1)` |
| `src/lib/styled/MenuItem.styled.tsx` | 64 | `2px` | 2px | `pxToRem(2)` |

### theme
| File | Line | Current Value | Equivalent px | pxToRem() |
|------|------|---------------|---------------|-----------|
| `src/lib/theme.stories.tsx` | - | Multiple px | - | - |
| `src/lib/alpha.stories.tsx` | - | Multiple px | - | - |
| `src/lib/textToColor.stories.tsx` | - | Multiple px | - | - |
| `src/lib/pxToRem.stories.tsx` | - | Multiple px | - | - |

### typography
| File | Line | Current Value | Equivalent px | pxToRem() |
|------|------|---------------|---------------|-----------|
| `src/lib/stories/styled.tsx` | 25 | `3px` | 3px | `pxToRem(3)` |
| `src/lib/stories/styled.tsx` | 38 | `1px` | 1px | `pxToRem(1)` |

## Summary
- Total hardcoded px values found: ~30 (excluding stories noise)
- Libs affected: button, card, chip, dialog, layout, menu, theme, typography
- Libs already using pxToRem / rem correctly: avatar, utils
