import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { SignOutButton } from "@/components/sign-out-button";
import { getSession } from "@/lib/session";

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");

  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-5"><Brand /><span className="hidden items-center gap-1 text-xs text-slate-400 sm:inline-flex"><ChevronRight size={13} /> Không gian học tập</span></div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-right">
              <span className="block text-xs font-bold text-ink">{session.user.name}</span>
              <span className="mt-0.5 block text-[10px] text-slate-500">{session.user.role === "admin" ? "Lớp trưởng" : "Sinh viên"}</span>
            </Link>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pale text-xs font-bold text-brand">{session.user.name?.slice(0, 1) ?? "B"}</span>
            <SignOutButton className="hidden rounded-lg px-2.5 py-2 text-xs text-slate-500 hover:bg-slate-100 hover:text-ink sm:inline-flex" />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
