import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Đăng nhập",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link className="text-sm font-semibold text-blue-700" href="/">
          ← Fullstack
        </Link>
        <h1 className="mt-8 text-3xl font-bold tracking-tight">Đăng nhập</h1>
        <p className="mt-2 text-slate-600">
          Đăng nhập để truy cập khu vực dành cho thành viên.
        </p>
        <SignInForm />
      </section>
    </main>
  );
}
