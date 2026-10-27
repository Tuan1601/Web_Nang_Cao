import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập Deadline Hub để quản lý tiến độ học tập của bạn.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <Suspense fallback={<div className="mx-auto min-h-[70vh] max-w-7xl animate-pulse px-5 py-20"><div className="mx-auto h-96 max-w-md rounded-3xl bg-slate-200" /></div>}><LoginForm /></Suspense>;
}
