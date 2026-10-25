import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trang chủ",
  description:
    "Khám phá nền tảng Fullstack: trải nghiệm Next.js hiện đại, bảo mật và dễ mở rộng.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Fullstack | Ứng dụng Next.js",
    description:
      "Khám phá nền tảng Fullstack: trải nghiệm Next.js hiện đại, bảo mật và dễ mở rộng.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fullstack",
  description:
    "Nền tảng Fullstack với Next.js, xác thực an toàn và phân quyền theo vai trò.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link className="text-lg font-bold tracking-tight" href="/">
          Fullstack
        </Link>
        <nav aria-label="Điều hướng chính" className="flex items-center gap-6">
          <Link
            className="text-sm text-slate-600 hover:text-slate-950"
            href="/about"
          >
            Giới thiệu
          </Link>
          <Link
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            href="/sign-in"
          >
            Đăng nhập
          </Link>
        </nav>
      </header>
      <section className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-20">
        <div className="max-w-3xl">
          <p className="font-semibold text-blue-700">
            Bảo mật. Hiện đại. Sẵn sàng mở rộng.
          </p>
          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Nền tảng Fullstack cho sản phẩm của bạn.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Trải nghiệm ứng dụng Next.js được xây dựng với xác thực nhiều
            phương thức, kiểm soát quyền truy cập và nền tảng SEO tốt.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
              href="/sign-in"
            >
              Bắt đầu ngay
            </Link>
            <Link
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-50"
              href="/about"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>
      <footer className="border-t border-slate-200 px-6 py-6 text-center text-sm text-slate-500">
        Next.js · Bảo mật theo vai trò · Tối ưu cho tìm kiếm
      </footer>
    </main>
  );
}
