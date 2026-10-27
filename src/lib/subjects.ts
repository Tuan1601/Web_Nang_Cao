export type Subject = {
  slug: string;
  code: string;
  name: string;
  lecturer: string;
  term: string;
  color: string;
  description: string;
};

export const subjects: Subject[] = [
  {
    slug: "lap-trinh-web",
    code: "INT3306",
    name: "Lập trình Web",
    lecturer: "ThS. Nguyễn Minh Anh",
    term: "Học kỳ 1 · 2025–2026",
    color: "blue",
    description: "Xây dựng ứng dụng web hiện đại với HTML, CSS, JavaScript và các framework phổ biến.",
  },
  {
    slug: "co-so-du-lieu",
    code: "INT1306",
    name: "Cơ sở dữ liệu",
    lecturer: "ThS. Trần Hoàng Nam",
    term: "Học kỳ 1 · 2025–2026",
    color: "violet",
    description: "Mô hình hóa dữ liệu, thiết kế cơ sở dữ liệu quan hệ và tối ưu truy vấn SQL.",
  },
  {
    slug: "cong-nghe-phan-mem",
    code: "INT2208",
    name: "Công nghệ phần mềm",
    lecturer: "TS. Phạm Thu Hà",
    term: "Học kỳ 1 · 2025–2026",
    color: "mint",
    description: "Quy trình phát triển phần mềm, phân tích yêu cầu, thiết kế và đảm bảo chất lượng.",
  },
  {
    slug: "an-toan-thong-tin",
    code: "INT1341",
    name: "An toàn thông tin",
    lecturer: "ThS. Lê Quốc Bảo",
    term: "Học kỳ 1 · 2025–2026",
    color: "amber",
    description: "Các nguyên lý bảo mật, mã hóa và phương pháp bảo vệ hệ thống thông tin.",
  },
];
