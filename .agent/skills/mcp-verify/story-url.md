# Story URL Builder

## URL Format
```
http://localhost:6006/?path=/story/<story-id>
```

Dùng `&full=1` để ẩn Storybook sidebar/panels:
```
http://localhost:6006/?path=/story/<story-id>&full=1
```

---

## Story ID Conversion

Story ID được derive từ `title` + export name trong CSF file.

### Quy tắc
| Source | Rule |
|--------|------|
| `title` field | lowercase, `/` → `-`, spaces → `-` |
| Export name | PascalCase/camelCase → kebab-case |

### Ví dụ

| title | export | Story URL |
|-------|--------|-----------|
| `"Toast"` | `Default` | `.../story/toast--default` |
| `"Toast"` | `WithActions` | `.../story/toast--with-actions` |
| `"Components/Toast"` | `DangerVariant` | `.../story/components-toast--danger-variant` |
| `"Menu/Menu"` | `WithSubMenus` | `.../story/menu-menu--with-sub-menus` |

### Cách xác nhận nếu không chắc
```
1. navigate_page → "http://localhost:6006"
2. take_snapshot() → đọc sidebar tree
3. Tìm link/button có text là tên story → lấy href hoặc data-id
```
