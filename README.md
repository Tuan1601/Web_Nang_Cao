# Fullstack

Ứng dụng Next.js với NextAuth v5, đăng nhập Google và email/mật khẩu, phân quyền `admin`/`user`, cùng metadata SEO cho các trang công khai.

## Cấu hình chạy local

1. Sao chép `.env.example` thành `.env.local`.
2. Tạo secret phiên bằng `openssl rand -base64 32` và đặt vào `AUTH_SECRET`.
3. Trong Google Cloud Console, tạo OAuth client kiểu Web và thêm callback URI `http://localhost:3000/api/auth/callback/google`. Điền `AUTH_GOOGLE_ID` và `AUTH_GOOGLE_SECRET`.
4. Điền địa chỉ email và **bcrypt hash** mật khẩu cho hai tài khoản vào `AUTH_ADMIN_EMAIL`, `AUTH_ADMIN_PASSWORD_HASH`, `AUTH_USER_EMAIL`, `AUTH_USER_PASSWORD_HASH`. Hash mật khẩu bằng bcrypt với cost ít nhất 12 qua công cụ nội bộ được tin cậy; không lưu mật khẩu thô vào biến môi trường. Vì Next.js nội suy `$` trong file env, phải escape mọi dấu `$` trong bcrypt hash thành `\$` (ví dụ `\$2b\$12\$...`) trong `.env.local`, nếu không hash có thể bị biến đổi và đăng nhập thất bại.
5. Chạy `npm run dev`.

Đăng nhập Credentials chỉ chấp nhận hai tài khoản được cấu hình; ứng dụng chưa có đăng ký tài khoản hoặc lưu user trong database. Tài khoản Google được gán `user`, ngoại trừ email trùng `AUTH_ADMIN_EMAIL` thì được gán `admin`. Không dùng chung email admin/user. Cần đặt `NEXT_PUBLIC_SITE_URL` thành URL canonical production khi deploy và chỉ tin cậy URL HTTPS đã kiểm soát.

`AUTH_TRUST_HOST=true` dùng được khi chạy local hoặc khi production đặt sau reverse proxy/platform đáng tin cậy đã xác thực host. Không bật tùy chọn này nếu deployment nhận trực tiếp `Host` tùy ý từ Internet.

## Bảo vệ route

- `src/proxy.ts`: kiểm tra cookie phiên sớm cho `/dashboard` và `/admin`, chuyển người chưa đăng nhập tới trang đăng nhập và role sai tới trang 403.
- Server page: `requireUser()` và `requireRole()` kiểm tra lại phiên/role trước khi render.
- Server Action: `verifyAdminAccess()` kiểm tra role `admin` ngay trong action; proxy không được xem là ranh giới bảo mật duy nhất.
- NextAuth dùng JWT session; mật khẩu Credentials được kiểm tra bằng bcrypt, không đưa hash vào session.

## SEO

Trang `/` và `/about` có canonical, metadata Open Graph với ảnh route-specific và JSON-LD (`WebSite`/`AboutPage`). Trang đăng nhập không được index. Đặt `NEXT_PUBLIC_SITE_URL` thành domain chuẩn để canonical và structured data không trỏ tới localhost.

## Kiểm tra

Chạy `npm run lint` và `npm run build`. Bản ghi triển khai và tình trạng Lighthouse nằm trong [IMPLEMENTATION_REPORT.md](./IMPLEMENTATION_REPORT.md).
## Lưu ý đăng nhập local

`admin@example.com` và `user@example.com` trong `.env.example` chỉ là email mẫu, không có mật khẩu mặc định. Credentials login chỉ hoạt động sau khi điền `AUTH_ADMIN_PASSWORD_HASH` và `AUTH_USER_PASSWORD_HASH` bằng bcrypt hash cho mật khẩu bạn tự chọn trong `.env.local`. Không dùng mật khẩu smoke-test hoặc mật khẩu ví dụ cho tài khoản thật. Sau khi thay đổi `.env.local`, khởi động lại `npm run dev`.