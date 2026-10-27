import Link from "next/link";
import { Brand } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <Brand />
          <span className="hidden h-5 w-px bg-slate-200 sm:block" />
          <p className="text-xs text-slate-500">Một nơi cho mọi deadline của lớp.</p>
        </div>
        <div className="flex items-center gap-5 text-xs font-medium text-slate-500">
          <Link href="/deadlines" className="hover:text-brand">Deadline</Link>
          <Link href="/login" className="hover:text-brand">Đăng nhập</Link>
          <span>© 2026 Deadline Hub</span>
        </div>
      </div>
    </footer>
  );
}
