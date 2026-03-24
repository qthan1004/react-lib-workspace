# Avatar Component Specification (V2 — Updated)

Dựa trên requirements thực tế, `@thanh-libs/avatar` được thiết kế tập trung vào 2 dạng chính, tối giản, chuẩn accessibility.

## 1. Props API

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `src` | `string` | `undefined` | URL hình ảnh. |
| `alt` | `string` | `name \|\| 'avatar'` | Alternative text cho `<img>`, screen reader đọc được. |
| `name` | `string` | `undefined` | Họ tên đầy đủ. Cắt 2 chữ cái đầu (VD: "Quốc Thanh" → "QT"). |
| `color` | `string` | `undefined` | Màu nền manual cho initials/icon (hex, rgb, hsl). |
| `autoColor` | `boolean` | `false` | Khi `true`, dùng `textToColor(name)` để tự sinh màu nền từ tên. Bị ignore nếu đã truyền `color`. |
| `fallbackIcon` | `ReactNode` | `<DefaultUserIcon />` | Icon mặc định khi không có `src` và `name`. |
| `size` | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | Kích thước avatar. |
| `variant` | `'circular' \| 'rounded' \| 'square'` | `'circular'` | Hình dáng avatar. |
| `bordered` | `boolean` | `false` | Viền neutral (trắng/xám), hữu ích khi avatar overlap trong group. |
| `imgProps` | `ImgHTMLAttributes` | `undefined` | Props truyền thẳng vào `<img>` (`srcSet`, `loading`, etc.). |
| `className` | `string` | `undefined` | CSS class name cho wrapper. |

## 2. Logic hiển thị

### Dạng 1: Ảnh hoặc Icon default
- Có `src` → render `<img>`. Nếu ảnh lỗi tải → fallback.
- Không có `src` và không có `name` → Render **fallbackIcon**.

### Dạng 2: Initials (từ tên)
- Có `name`, không có `src` (hoặc `src` lỗi).
- Cắt 2 chữ cái đầu: "Quốc Thanh" → "QT".
- **Màu nền logic:**
  1. Nếu truyền `color` → dùng luôn.
  2. Nếu `autoColor={true}` (và không có `color`) → gọi `textToColor(name)` tự sinh màu.
  3. Nếu không có cả hai → dùng màu mặc định từ theme (`palette?.action?.hover` hoặc neutral grey).
- Text color tự động contrast (trắng/đen) dựa trên background.

## 3. Requirement cho `@thanh-libs/utils`

Thêm hàm `textToColor` vào `libs/utils/src/lib/functions/`:
- `textToColor(str: string): string` — băm chuỗi → mã màu HSL dễ nhìn.
- Nằm trong folder `functions/` (giữ nhất quán: utils chỉ có `functions/` và `hooks/`).

## 4. Accessibility (WCAG 2.2)

- `forwardRef` + `displayName`.
- `<img>`: `alt={alt || name || 'avatar'}`.
- Initials/Icon wrapper: `role="img"` + `aria-label={name}`.
- Spread `...rest` cho phép passthrough `aria-*` props.

## 5. Về Status Border (viền trạng thái)

**Viền trạng thái (success=xanh, warning=cam, error=đỏ) → KHÔNG nằm trong Avatar.**
- Avatar chỉ lo render hình tròn (Single Responsibility).
- Status là thông tin trạng thái bên ngoài, thuộc về `<Badge>` bọc ngoài.
- Pattern chuẩn:
```tsx
<Badge variant="dot" color="success" overlap="circular">
  <Avatar src="..." />
</Badge>
```
- `bordered` prop trong Avatar chỉ là viền neutral (trắng) cho mục đích visual khi overlap, không liên quan status.

## 6. Cấu trúc file

```text
libs/utils/src/lib/functions/
└── textToColor.ts              # Hàm băm string → color (Tạo mới)

libs/avatar/src/lib/
├── Avatar.tsx                  # Logic chính
├── styled.tsx                  # CSS (size, auto-color, bordered, etc.)
├── models/
│   └── index.ts                # Props types + related interfaces
├── constants/
│   └── index.ts                # SIZE_MAP, defaults
├── helpers/
│   └── index.ts                # getInitials(), getContrastText()
├── stories/
│   └── Avatar.stories.tsx
└── index.ts

libs/avatar/src/
└── index.ts                    # Public exports
```

## 7. Nice-to-have (sau v1)

| Feature | Mô tả |
|---------|-------|
| `AvatarGroup` | Hiển thị overlap nhiều avatars, tự động `bordered`, "+N" overflow |
