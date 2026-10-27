"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, KeyRound, LockKeyhole, Mail } from "lucide-react";
import { Brand } from "@/components/brand";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false, callbackUrl });
    setLoading(false);
    if (result?.error) {
      setError("Email hoặc mật khẩu chưa chính xác. Vui lòng kiểm tra lại.");
      return;
    }
    router.push(result?.url ?? "/dashboard");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-[calc(100vh-145px)] items-center justify-center overflow-hidden px-5 py-12">
      <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-100/60 blur-3xl" />
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft md:grid-cols-[.9fr_1.1fr]">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#2453c6] via-[#3268e8] to-[#6388f2] p-9 text-white md:flex">
          <div className="absolute -right-24 top-24 h-72 w-72 rounded-full border-[44px] border-white/10" />
          <div><Brand /><span className="sr-only">Deadline Hub</span></div>
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100">Học kỳ 1 · 2025–2026</p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight">Một khởi đầu<br />chủ động hơn.</h1>
            <p className="mt-4 text-sm leading-6 text-blue-100">Đăng nhập để đánh dấu tiến độ và cùng lớp chinh phục từng deadline.</p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><KeyRound size={19} /></span>
              <div><p className="text-xs font-bold">Tài khoản lớp học</p><p className="mt-1 text-[10px] text-blue-100">Dùng email được cấp để truy cập</p></div>
            </div>
          </div>
          <p className="text-[10px] text-blue-100/80">© 2026 Deadline Hub · PTIT</p>
        </div>
        <div className="px-6 py-9 sm:px-10 sm:py-11">
          <Link href="/" className="mb-7 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand md:hidden"><ArrowLeft size={14} /> Trang chủ</Link>
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">Chào mừng trở lại</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Đăng nhập tài khoản</h2>
            <p className="mt-2 text-sm text-slate-500">Nhập thông tin tài khoản lớp học của bạn.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-700">Email</span>
              <span className="relative block"><Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input autoComplete="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ban@ptit.edu.vn" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10" /></span>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-700">Mật khẩu</span>
              <span className="relative block"><LockKeyhole size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input autoComplete="current-password" type={showPassword ? "text" : "password"} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span>
            </label>
            {error && <p role="alert" className="rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-3 text-xs leading-5 text-rose-700">{error}</p>}
            <button type="submit" disabled={loading} className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70">{loading ? "Đang đăng nhập..." : "Đăng nhập"}</button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Hoặc</span></div>
          </div>
          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl })}
            className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Đăng nhập bằng GitHub (OAuth)
          </button>
          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tài khoản demo</p>
            <div className="mt-2 space-y-1 text-[11px] text-slate-600">
              <p><span className="font-semibold">Lớp trưởng:</span> admin@ptit.edu.vn / admin123</p>
              <p><span className="font-semibold">Sinh viên:</span> sv@ptit.edu.vn / sv123456</p>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">Chỉ dành cho thành viên lớp · <Link href="/" className="font-semibold text-brand hover:underline">Về trang chủ</Link></p>
        </div>
      </div>
    </div>
  );
}
