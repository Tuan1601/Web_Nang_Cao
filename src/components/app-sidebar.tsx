"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListChecks, Settings2 } from "lucide-react";

const navigation = [
  { href: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/deadlines", label: "Deadline lớp", icon: ListChecks },
];

export function AppSidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const items = isAdmin ? [...navigation, { href: "/admin", label: "Quản trị deadline", icon: Settings2 }] : navigation;
  return (
    <aside className="w-full shrink-0 lg:w-60">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 lg:sticky lg:top-24">
        <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Không gian lớp</p>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Điều hướng cá nhân">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/dashboard" && href !== "/admin" && pathname.startsWith(href));
            return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition lg:text-sm ${active ? "bg-brand-pale text-brand" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`}><Icon size={17} />{label}</Link>;
          })}
        </nav>
        <div className="mt-4 hidden rounded-xl bg-slate-50 p-3 lg:block">
          <p className="text-[11px] font-semibold text-slate-700">Một tuần hiệu quả</p><p className="mt-1 text-[10px] leading-4 text-slate-500">Chia nhỏ mục tiêu để hoàn thành từng deadline nhé.</p>
        </div>
      </div>
    </aside>
  );
}
