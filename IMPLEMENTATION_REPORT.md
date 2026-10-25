# Báo cáo tích hợp

## Sơ đồ lớp bảo vệ

```text
Request
  └─ Next.js Proxy (`src/proxy.ts`)
       ├─ Chưa đăng nhập → `/sign-in`
       └─ `/admin` không phải admin → `/forbidden`
            ↓
       Server Page (`requireUser` / `requireRole`)
            ↓
       Server Action (`requireRole("admin")` trước xử lý)
            ↓
       Quyền truy cập dữ liệu/thao tác
```

Proxy dùng để chặn sớm; page và Server Action vẫn xác minh session/role độc lập. Next.js 16 đổi tên convention Middleware thành Proxy.

## Lighthouse / PageSpeed

Đo bằng Lighthouse **13.5.0**, Chrome **155 headless**, mobile emulation và simulated throttling trên production build local (`next start`). Baseline được dựng từ commit ban đầu `903d15f`; bản sau là source hiện tại. Một lần chạy cho mỗi trang, cùng máy và cấu hình:

| Trang | Trạng thái trước | Performance trước → sau | Accessibility trước → sau | Best Practices trước → sau | SEO trước → sau |

| `/` | Có ở baseline | 98 → 98 | 100 → 100 | 100 → 100 | 100 → 100 |
| `/about` | Không tồn tại (404), không có điểm hợp lệ | N/A → 97 | N/A → 100 | N/A → 100 | N/A → 100 |

Chỉ số phụ của trang chủ: LCP `2.4 s` → `2.4 s`, CLS `0` → `0`, TBT `70 ms` → `70 ms`. `/about` bản sau: LCP `1.5 s`, CLS `0`, TBT `180 ms`.
Trang	Chỉ số	Trước → Sau
/	   Performance	98 → 98
        Accessibility	100 → 100
        Best Practices	100 → 100
         SEO	100 → 100
/about  Các chỉ số Lighthouse	 Trước: không có trang (404) → Sau: 97 / 100 / 100 / 100

Đây là số đo Lighthouse local để so sánh trong cùng môi trường, không phải PageSpeed Insights trên URL Internet công khai. Điểm Performance có thể dao động giữa các lượt chạy; nếu báo cáo cần PageSpeed Insights hoặc production RUM, cần deploy lên domain công khai và chạy lại trên URL đó.

## Xác minh triển khai

- `npm run lint`: đạt.
- `npm run build`: đạt; `/` và `/about` được prerender, các trang cần session render theo request.
- Smoke test local: hai trang SEO trả `200`, hai ảnh OG trả `image/png`, route bảo vệ redirect khi chưa đăng nhập; Credentials `admin`/`user` đăng nhập được, user bị chặn khỏi `/admin`, và Server Action chỉ xác nhận quyền admin.
- OAuth đã được đăng ký trong NextAuth; cần thông tin Google OAuth thật trong `.env.local` để kiểm tra callback với Google.
