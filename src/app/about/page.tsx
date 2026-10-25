import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Tìm hiểu về Fullstack, nền tảng mẫu Next.js tích hợp xác thực, phân quyền và tối ưu SEO.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "article",
    url: "/about",
    title: "Giới thiệu | Fullstack",
    description:
      "Tìm hiểu về Fullstack, nền tảng mẫu Next.js tích hợp xác thực, phân quyền và tối ưu SEO.",
    images: [{ url: "/about/opengraph-image", width: 1200, height: 630 }],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Giới thiệu về Fullstack",
  description:
    "Nền tảng Next.js mẫu tích hợp xác thực, phân quyền và các thực hành SEO.",
  url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/about`,
  isPartOf: {
    "@type": "WebSite",
    name: "Fullstack",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Link className="text-sm font-semibold text-blue-700" href="/">
        ← Trang chủ
      </Link>
      <article className="mt-16">
        <p className="font-semibold text-blue-700">Giới thiệu</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Một nền tảng vững chắc để bắt đầu.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Fullstack là ứng dụng Next.js mẫu kết hợp đăng nhập Google và email,
          phân quyền admin/user nhiều lớp, cùng metadata có cấu trúc cho các
          trang công khai.
        </p>
        <Link
          className="mt-8 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
          href="/sign-in"
        >
          Đăng nhập
        </Link>
      </article>
    </main>
  );
}
