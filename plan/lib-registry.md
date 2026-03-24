# Lib Management — Web Registry

## Mục tiêu

Xây dựng một web dashboard để quản lý và theo dõi tất cả libs trong hệ thống `@thanh-libs/*`.
Vừa viết vừa học NestJS + Next.js.

## Kiến trúc

```
┌─────────────┐    schedule    ┌───────────────────┐
│  npm API    │──────────────►│                   │
└─────────────┘               │  NestJS Backend   │──► Database
┌─────────────┐    schedule    │  (cron job)       │
│  GitHub API │──────────────►│                   │
└─────────────┘               └────────┬──────────┘
                                       │ REST API
                                       ▼
                              ┌───────────────────┐
                              │  Next.js Frontend  │
                              │   (Dashboard)      │
                              └───────────────────┘
```

## Backend — NestJS

- **Scheduled job** (NestJS `@Cron`) chạy định kỳ
- Fetch data từ 2 nguồn:
  - **npm**: `scope:thanh-libs` → packages, versions, publish dates
  - **GitHub org**: `system-core-ui` → repos, CI status
- Compare 2 nguồn → xác định lib nào đã publish, lib nào chưa
- Lưu kết quả vào database
- Expose REST API cho frontend

### Database (lightweight & rẻ)

- **SQLite / Turso** — zero cost, đủ cho data nhẹ
- **Supabase** (free tier) — PostgreSQL hosted
- **Prisma** làm ORM

### Hosting

- **Railway / Render** — free tier cho NestJS service
- **Vercel** — cho Next.js frontend

## Frontend — Next.js

- Dashboard hiển thị tất cả libs
- Tính năng:
  - [ ] Danh sách libs với badge: published / unreleased
  - [ ] Latest version, publish date
  - [ ] CI status (pass/fail)
  - [ ] Version history
  - [ ] Download count
- Design tính sau

## Data Sources

### npm Registry API (public)

```
GET https://registry.npmjs.org/-/v1/search?text=scope:thanh-libs&size=100
→ Tất cả libs đã publish

GET https://registry.npmjs.org/@thanh-libs/<lib-name>
→ Chi tiết: versions, publish dates, dist-tags
```

### GitHub Org API

```
GET https://api.github.com/orgs/system-core-ui/repos
→ Tất cả repos (kể cả chưa publish)

GET https://api.github.com/repos/system-core-ui/<lib>/actions/runs?per_page=5
→ CI status
```

### Logic

1. GitHub org repos → danh sách **tất cả** libs
2. npm search → danh sách libs **đã publish**
3. Compare → xác định libs **chưa release**
4. Fetch chi tiết từng lib → versions, dates, CI
5. Lưu DB → FE query hiển thị

## Trạng thái

⏳ Đang lên ý tưởng — chưa bắt đầu implementation
