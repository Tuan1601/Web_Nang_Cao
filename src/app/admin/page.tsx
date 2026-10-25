import Link from "next/link";
import { AdminActionButton } from "./admin-action-button";
import { requireRole } from "@/lib/auth/guards";

export const instant = false;

export default async function AdminPage() {
  const user = await requireRole("admin");

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-20">
      <Link className="text-sm font-semibold text-blue-700" href="/dashboard">
        ← Khu vực thành viên
      </Link>
      <h1 className="mt-8 text-4xl font-bold tracking-tight">Quản trị</h1>
      <p className="mt-4 text-slate-600">
        Trang này yêu cầu vai trò <strong>admin</strong>. Tài khoản: {user.email}
      </p>
      <AdminActionButton />
    </main>
  );
}
