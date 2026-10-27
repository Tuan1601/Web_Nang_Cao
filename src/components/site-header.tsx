"use client";

import Link from "next/link";
import { ArrowRight, CircleUserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { Brand } from "@/components/brand";
import { SignOutButton } from "@/components/sign-out-button";

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Điều hướng chính">
          <Link href="/" className="text-sm font-medium text-slate-600 transition hover:text-brand">Trang chủ</Link>
          <Link href="/deadlines" className="text-sm font-medium text-slate-600 transition hover:text-brand">Tất cả deadline</Link>
          <Link href="/#subjects" className="text-sm font-medium text-slate-600 transition hover:text-brand">Môn học</Link>
        </nav>
        {session?.user ? (
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden items-center gap-2 text-sm font-semibold text-slate-700 sm:flex">
              <CircleUserRound size={17} className="text-brand" />
              <span>{session.user.name}</span>
              <span className="rounded-full bg-brand-pale px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand">
                {session.user.role === "admin" ? "Admin" : "Sinh viên"}
              </span>
            </Link>
            <SignOutButton className="px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-ink" />
          </div>
        ) : (
          <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark">
            Đăng nhập <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </header>
  );
}
