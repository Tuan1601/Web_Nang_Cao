Xây dựng Class Deadline Hub, cổng web deadline của lớp:

· Ai cũng xem được deadline công khai. Link chia sẻ phải có ảnh xem trước và Google tìm được.

· Sinh viên đăng nhập để đánh dấu deadline đã xong.

· Lớp trưởng (admin) thêm và xoá deadline.

Dữ liệu lưu bằng file JSON phía server (4 môn học, khoảng 12 deadline). Hai tài khoản bắt buộc có:

Email Mật khẩu Vai trò

admin@ptit.edu.vn admin123 admin

sv@ptit.edu.vn sv123456 user

Yêu cầu

A. Rendering (Buổi 7)

1. Xây dựng các route sau, mỗi route dùng đúng chiến lược render:

Route Truy cập Chiến lược

/ Mọi người SSG (Static Site Generation)

/subjects/[slug] Mọi người SSG

/deadlines Mọi người ISR (Incremental Static Regeneration), làm mới sau 60 giây

/deadlines/[id] Mọi người ISR, làm mới ngay khi admin thêm hoặc xoá

/dashboard Đã đăng nhập SSR (Server-Side Rendering)

/admin Chỉ admin SSR

2. Id không tồn tại thì hiện trang 404 của dự án.

B. Routing và component (Buổi 7)

3. Chia route group (public) và (app), mỗi nhóm có layout riêng.

4. /dashboard có layout lồng nhau (sidebar). Menu tô sáng trang hiện tại.

5. Có loading, error (nút “Thử lại”) và not-found.

6. Mặc định dùng Server Component. Chỉ dùng 'use client' ở các component cần tương tác (hiển thị đếm ngược “Còn X ngày / Quá hạn Y ngày”, bộ lọc).

C. Xác thực (Buổi 8)

7. Đăng nhập bằng NextAuth (Auth.js) với Credentials, session kiểu JWT.

8. id và role có trong session, khai báo kiểu TypeScript đầy đủ (không dùng string cho role).

9. Header hiển thị tên, vai trò và nút Đăng nhập hoặc Đăng xuất.

D. Middleware và phân quyền (Buổi 8)

10. Ma trận phân quyền được viết thành một nơi duy nhất, dùng hàm can(role, action):

Hành động guest user admin

Xem deadline ✓ ✓ ✓

Đánh dấu đã xong ✗ ✓ ✓

Thêm deadline ✗ ✗ ✓

Xoá deadline ✗ ✗ ✓

11. Middleware bảo vệ /dashboard và /admin. Chưa đăng nhập thì chuyển /login (giữ đường dẫn quay lại). User vào /admin thì chuyển /403.

12. Phân quyền không chỉ dựa vào Middleware: trang /admin và mọi Server Action đều tự kiểm tra quyền; dữ liệu đầu vào được kiểm tra hợp lệ.

E. SEO và tối ưu (Buổi 8)

13. Metadata động cho /deadlines/[id], kèm ảnh chia sẻ sinh động cho từng deadline.

14. Có sitemap (gồm mọi deadline) và robots (chặn /dashboard, /admin). /login và /dashboard không được lập chỉ mục.

15. Có structured data (JSON-LD) kiểu BreadcrumbList ở trang chi tiết.

16. Dùng next/font (hỗ trợ tiếng Việt) và next/image.

17. Đo Lighthouse trên bản production cho / và /deadlines/[id].

Sản phẩm nộp

· Mã nguồn (không kèm node_modules, .next).

· README.md gồm:

o cách chạy;

o ảnh kết quả npm run build và lý do chọn chiến lược cho từng route;

o điểm Lighthouse;

o ảnh view-source của /deadlines/1;

o trả lời 2 câu hỏi:

§ (1) Vì sao /deadlines/[id] dùng ISR?

§ (2) Nếu chỉ dùng Middleware để bảo vệ /admin thì có rủi ro gì?

Điểm cộng (tối đa +1, tổng không quá 10)

Đăng nhập GitHub (OAuth); deploy lên Vercel; test Jest cho can()