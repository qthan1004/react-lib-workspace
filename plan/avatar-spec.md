# Avatar Component Specification (V2)

Dựa trên requirements thực tế của bạn, `@thanh-libs/avatar` sẽ được thiết kế tập trung vào 2 dạng chính và tối giản, chuẩn chỉ accessibility.

## 1. Yêu cầu & Tính năng cốt lõi

### Props API

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `src` | `string` | `undefined` | *(Optional)* URL hình ảnh. |
| `name` | `string` | `undefined` | *(Optional)* Họ tên đầy đủ. Dùng để cắt 2 chữ cái đầu (VD: "Quốc Thành" $\rightarrow$ "QT") và tính toán màu nền tự động. |
| `fallbackIcon` | `ReactNode` | `<DefaultUserIcon />` | Icon mặc định hiển thị nếu không có `src` và không có `name`. |
| `size` | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | Kích thước avatar. |
| `variant` | `'circular' \| 'rounded' \| 'square'` | `'circular'` | Hình dáng avatar. |

### Logic hiển thị (2 Dạng chính)

**Dạng 1: Ảnh hoặc Icon default**
- Nhận vào `src`. Nếu có ảnh hợp lệ $\rightarrow$ hiển thị thẻ `<img>`.
- Nếu không truyền `src` (hoặc ảnh lỗi tải), và cũng không có `name` $\rightarrow$ Render **fallback icon** (người dùng pass qua prop `fallbackIcon` hoặc dùng icon mặc định của lib).

**Dạng 2: Auto-Color Initials (Sinh từ Tên)**
- Truyền vào `name="Quốc Thành"`, không truyền `src` (hoặc `src` bị lỗi).
- Lib tự động:
  1. Cắt lấy 2 chữ cái đầu tiên: "QT".
  2. Dọi hàm `textToColor(name)` từ thư viện `@thanh-libs/utils` để convert string thành một mã màu nhất quán.
  3. Render background màu đó + text "QT" màu trắng/đen tương phản.

### Requirement cho `@thanh-libs/utils`
- Cần viết thêm hàm `textToColor(str: string): string` (băm chuỗi ra mã hash, sau đó map vào dải màu trong `theme.palette` hoặc custom hsl array cho dễ nhìn, tránh ra màu mù mắt).

### Accessibility (Tương tự Typography)
- Luôn `forwardRef`.
- Thẻ `<img>` sẽ lấy `alt={name || 'avatar'}` để screen reader đọc được.
- Nếu render Initials hoặc Icon, sẽ có `aria-label={name}` trên wrapper để báo cho accessibility tool biết avatar này của ai.

---

## 2. Giải đáp Design Questions

### C1: Avatar có nên có text (tên/profile) kế bên không?
**Không nên đưa thẳng vào lõi component Avatar.**
Avatar đúng chuẩn chỉ nên chịu trách nhiệm render ra "cái hình tròn" đó (Single Responsibility).
Để làm cái profile card (Avatar + Text tên + Subtext chức vụ kế bên), ta nên:
1. Wrap nó lại bằng Component khác (e.g. `CardHeader` hay `UserCard` sau này).
2. Hoặc user tự wrap lại bằng `Flex` / `Stack` của Layout:
   ```tsx
   <Flex align="center" gap="sm">
     <Avatar name="Quốc Thành" />
     <Typography variant="body1">Quốc Thành</Typography>
   </Flex>
   ```
*(Giữ thẻ Avatar "sạch sẽ" giúp dễ tái sử dụng ở mọi nơi)*.

### C2: Avatar có nên có viền (boder) biểu thị status không?
Status (Online/Offline/Busy) là tính năng rất hay dùng, nhưng **không nên sửa trực tiếp viền avatar**. Lý do:
- Nếu đổ màu trực tiếp vào viền của ảnh, với size ảnh nhỏ nhìn sẽ rất lem nhem.
- Pattern chuẩn nhất của các UI lib lớn: **Dùng thẻ `<Badge>` bọc cái `<Avatar>` lại**.

Khi đó, lib Badge (`@thanh-libs/badge` - xây sau này) sẽ chịu trách nhiệm chấm cái status nhỏ gọn nằm ở góc dưới bên phải avatar (hoặc trên cùng bên trái tùy ý).
Ví dụ:
```tsx
<Badge variant="dot" color="success" overlap="circular">
  <Avatar src="..." />
</Badge>
```
*(Hiện tại với Avatar v1, mình cứ làm form chuẩn trước, sau này xây Badge thì ghép lại là xong vòng tròn tuyệt đẹp).*

---

## 3. Cấu trúc file cần làm

```text
libs/utils/src/lib/string/
└── textToColor.ts           # Hàm băm string -> color (Tạo mới)

libs/avatar/src/lib/
├── Avatar.tsx               # Logic chính
├── styled.tsx               # CSS (size, auto-color, etc)
├── models.ts                # Typings
└── index.ts
```
