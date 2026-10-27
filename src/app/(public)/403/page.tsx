import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="mx-auto flex min-h-[62vh] max-w-7xl flex-col items-center justify-center px-5 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><ShieldAlert size={28} /></span>
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-600">403 · Không đủ quyền</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Khu vực dành cho lớp trưởng</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">Tài khoản của bạn không có quyền truy cập trang quản trị.</p>
      <Link href="/dashboard" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"><ArrowLeft size={16} /> Về trang cá nhân</Link>
    </div>
  );
}
