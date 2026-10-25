import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import { signOutAction } from "./actions";

export const instant = false;

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-20">
      <Link className="text-sm font-semibold text-blue-700" href="/">
        ← Trang chủ
      </Link>
      <h1 className="mt-8 text-4xl font-bold tracking-tight">Khu vực thành viên</h1>
      <p className="mt-4 text-slate-600">
        Đã đăng nhập với vai trò <strong>{user.role}</strong>.
      </p>
      <form action={signOutAction} className="mt-8">
        <button
          className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-50"
          type="submit"
        >
          Đăng xuất
        </button>
      </form>
      {user.role === "admin" ? (
        <Link
          className="mt-4 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white"
          href="/admin"
        >
          Mở trang quản trị
        </Link>
      ) : null}
    </main>
  );
}
