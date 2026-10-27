# Deadline Hub

Ứng dụng web theo dõi deadline cho lớp học, xây dựng bằng Next.js App Router, TypeScript, Tailwind CSS và Auth.js Credentials.

## Chạy dự án

Yêu cầu Node.js 20.9 trở lên.

```bash
npm install
Copy-Item .env.example .env.local
```

Tạo giá trị bí mật cho Auth.js trong `.env.local` (PowerShell):

```powershell
Set-Content .env.local "NEXTAUTH_URL=http://localhost:3000`nNEXTAUTH_SECRET=$([guid]::NewGuid().ToString('N'))"
```

Chạy môi trường phát triển:

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Tài khoản demo:

Dev server dùng thư mục `.next-dev`, tách biệt với `.next` của production build để có thể chạy build mà không làm hỏng chunk dev.

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Lớp trưởng | `admin@ptit.edu.vn` | `admin123` |
| Sinh viên | `sv@ptit.edu.vn` | `sv123456` |

Build và chạy production:

```bash
npm test
npm run lint
npm run build
npm start
```

Các tài khoản trong bài là tài khoản demo được định nghĩa trong mã nguồn. Không dùng cấu hình Credentials này như hệ thống xác thực production; cần thay bằng kho tài khoản và cơ chế lưu mật khẩu an toàn trước khi triển khai thật.

## Các route và chiến lược rendering

| Route | Truy cập | Chiến lược | Lý do |
|---|---|---|---|
| `/` | Công khai | SSG (`force-static`) | Nội dung giới thiệu và môn học ít thay đổi, được dựng sẵn để tải nhanh và dễ lập chỉ mục. |
| `/subjects/[slug]` | Công khai | SSG (`force-static`, `generateStaticParams`) | Có bốn môn học đã biết; dựng sẵn từng trang môn học khi build. |
| `/deadlines` | Công khai | ISR (`revalidate = 60`) | Danh sách deadline được dựng sẵn và tự làm mới tối đa sau 60 giây. |
| `/deadlines/[id]` | Công khai | ISR (`revalidate = 60`, `generateStaticParams`) | Trang chi tiết có thể cache, đồng thời làm mới theo chu kỳ và được invalidation khi admin thêm/xóa deadline. ID lạ gọi `notFound()`. |
| `/dashboard` | Đã đăng nhập | SSR (`force-dynamic`) | Tiến độ và danh sách đã hoàn thành khác nhau theo tài khoản, cần lấy session/dữ liệu mới mỗi request. |
| `/admin` | Chỉ admin | SSR (`force-dynamic`) | Giao diện quản trị cần session hiện tại và dữ liệu deadline mới nhất. |

Phân quyền được định nghĩa tập trung bởi `can(role, action)` tại `src/lib/permissions.ts`; Middleware chỉ là lớp bảo vệ sớm. Trang admin và các Server Action cũng xác thực session/quyền phía server. Dữ liệu deadline và tiến độ được lưu trong `data/deadlines.json` và `data/completions.json`.

## Kiểm thử

`npm test` chạy Jest cho ma trận `can()` với ba vai trò và bốn hành động. `npm run lint` chạy ESLint. Chạy `npm run build` để kiểm tra TypeScript, render và tạo các route production.

## Bằng chứng build và Lighthouse

Đã xác nhận `npm run build` thành công với Next.js 15.5.28: compile, lint/type-check, thu thập dữ liệu, tạo 25 trang tĩnh và tạo build traces hoàn tất.

```text
Route (app)                                    Size  First Load JS  Revalidate  Expire
┌ ○ /                                       5.86 kB         112 kB
├ ○ /_not-found                               137 B         103 kB
├ ○ /403                                      165 B         106 kB
├ ƒ /admin                                   4.1 kB         110 kB
├ ƒ /api/auth/[...nextauth]                   137 B         103 kB
├ ƒ /dashboard                                656 B         107 kB
├ ○ /deadlines                              3.56 kB         110 kB          1m      1y
├ ● /deadlines/[id]                         2.15 kB         117 kB          1m      1y
├   ├ /deadlines/1                                                          1m      1y
├   ├ /deadlines/2                                                          1m      1y
├   ├ /deadlines/3                                                          1m      1y
├   └ [+9 more paths]
├ ƒ /deadlines/[id]/opengraph-image-104vc5    137 B         103 kB
├ ○ /login                                  4.29 kB         119 kB
├ ○ /robots.txt                               137 B         103 kB
├ ○ /sitemap.xml                              137 B         103 kB
└ ● /subjects/[slug]                          656 B         107 kB
    ├ /subjects/lap-trinh-web
    ├ /subjects/co-so-du-lieu
    ├ /subjects/cong-nghe-phan-mem
    └ /subjects/an-toan-thong-tin
+ First Load JS shared by all                103 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

Bảng route của build đánh dấu `/` và `/subjects/[slug]` là Static/SSG, `/deadlines` và `/deadlines/[id]` có thời hạn revalidate 1 phút (ISR), còn `/dashboard` và `/admin` là Dynamic (SSR).

Để chụp ảnh kết quả terminal cho bài nộp, chạy `npm run build` và lưu ảnh tại `docs/evidence/build.png`. Lighthouse cần được đo trên bản production, không chạy dev:

1. `npm run build`
2. `npm start`
3. Mở Chrome DevTools → Lighthouse, chọn Mobile (hoặc Desktop, ghi rõ preset), chạy riêng `/` và `/deadlines/1`.
4. Lưu báo cáo/ảnh chụp cùng điểm Performance, Accessibility, Best Practices và SEO tại `docs/evidence/lighthouse-home.png` và `docs/evidence/lighthouse-deadline.png`.

## Ảnh kiểm tra view-source

Sau khi chạy production, mở `view-source:http://localhost:3000/deadlines/1` và chụp ảnh kết quả tại `docs/evidence/view-source-deadline.png`. HTML máy chủ có tiêu đề/mô tả Open Graph, JSON-LD BreadcrumbList và nội dung deadline đã render đầy đủ. Hình chia sẻ được tạo theo từng deadline bởi route `opengraph-image`.

## Điểm cộng (Bonus Features)

Dự án đã triển khai đầy đủ 3 hạng mục điểm cộng theo yêu cầu:

1. **Test Jest cho hàm phân quyền `can()`**:
   - File test: `src/lib/permissions.test.ts`.
   - Kiểm thử toàn diện 3 vai trò (`guest`, `user`, `admin`) với 4 hành động (`view_deadlines`, `complete_deadline`, `add_deadline`, `delete_deadline`).
   - Chạy lệnh: `npm test`.

2. **Đăng nhập bằng GitHub (OAuth)**:
   - Đã tích hợp `GithubProvider` trong `src/lib/auth.ts` và nút bấm trực quan tại trang `/login`.
   - Để kích hoạt, chỉ cần thêm `GITHUB_ID` và `GITHUB_SECRET` vào file `.env.local` (tạo OAuth App trên GitHub với callback URL: `http://localhost:3000/api/auth/callback/github` hoặc domain production).
   - Khi đăng nhập bằng GitHub, tài khoản được cấp quyền sinh viên (`user`), tự động lưu session JWT và có đầy đủ quyền đánh dấu tiến độ deadline.

3. **Deploy lên Vercel**:
   - Dự án tương thích hoàn toàn với Vercel (Next.js App Router chuẩn).
   - Thiết lập các biến môi trường trên Vercel:
     - `NEXTAUTH_URL`: Domain Vercel của bạn (ví dụ: `https://class-deadline-hub.vercel.app`).
     - `NEXTAUTH_SECRET`: Khóa bí mật JWT ngẫu nhiên.
     - `GITHUB_ID` & `GITHUB_SECRET`: (Tuỳ chọn cho OAuth).
   - Lưu ý môi trường Serverless: Vercel sử dụng Serverless Functions với filesystem ephemeral (read-only sau build). Dữ liệu JSON tĩnh đọc bình thường; nếu muốn lưu deadline bền vững sau khi thêm/xóa trong môi trường serverless, cần tích hợp Vercel KV, Upstash Redis hoặc cơ sở dữ liệu (PostgreSQL/MongoDB).

## Câu hỏi

### (1) Vì sao `/deadlines/[id]` dùng ISR?

Trang chi tiết là nội dung công khai, phần lớn ổn định giữa các request, nên có thể phục vụ HTML đã render sẵn với độ trễ thấp và cho crawler đọc được. Deadline vẫn có thể được lớp trưởng thêm/xóa, vì vậy ISR cho phép tạo/làm mới nội dung mà không phải dựng lại toàn bộ ứng dụng. Route này tự revalidate sau 60 giây; Server Action thêm/xóa chủ động gọi `revalidatePath` để cập nhật ngay các đường dẫn liên quan.

### (2) Nếu chỉ dùng Middleware để bảo vệ `/admin` thì có rủi ro gì?

Middleware là lớp điều hướng sớm, không thay thế kiểm tra quyền tại nơi thực hiện thao tác. Server Action hoặc endpoint có thể bị gọi trực tiếp mà không đi theo luồng UI mong đợi; nếu chỉ dựa Middleware, yêu cầu giả mạo có thể thao tác thêm/xóa dữ liệu. Vì vậy trang admin và **từng Server Action** phải tự lấy session, kiểm tra role/action qua `can()` và xác thực dữ liệu đầu vào phía server.

## Giới hạn lưu trữ file JSON

Đây là cách lưu dữ liệu theo yêu cầu bài thực hành, phù hợp chạy một tiến trình Node.js có quyền ghi vào thư mục dự án. Một số nền tảng serverless (bao gồm môi trường triển khai có filesystem chỉ đọc/ephemeral) không bảo đảm ghi dữ liệu bền vững vào JSON; khi deploy thật cần chuyển dữ liệu sang database hoặc storage phù hợp.
