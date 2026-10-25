import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
        403
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Không đủ quyền</h1>
      <p className="mt-4 text-slate-600">
        Tài khoản hiện tại không được phép truy cập trang này.
      </p>
      <Link className="mt-8 font-semibold text-blue-700" href="/dashboard">
        Quay lại khu vực thành viên
      </Link>
    </main>
  );
}
