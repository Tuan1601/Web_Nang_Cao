import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[62vh] max-w-7xl flex-col items-center justify-center px-5 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-brand"><SearchX size={29} /></span>
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand">404 · Không tìm thấy</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Trang này chưa có trong lịch học</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">Đường dẫn có thể đã thay đổi hoặc deadline không còn tồn tại.</p>
      <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"><ArrowLeft size={16} /> Về trang chủ</Link>
    </div>
  );
}
