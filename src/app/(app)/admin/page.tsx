import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import { DeadlineCreateForm } from "@/components/deadline-create-form";
import { getDeadlines } from "@/lib/deadlines";
import { getSession } from "@/lib/session";
import { can } from "@/lib/permissions";
import { subjects } from "@/lib/subjects";
import { DeleteDeadlineButton } from "@/components/delete-deadline-button";

export const metadata: Metadata = { title: "Quản trị deadline", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ deleted?: string }> }) {
  const session = await getSession();
  if (!session?.user || !can(session.user.role, "add_deadline")) redirect("/403");
  const [deadlines, query] = await Promise.all([getDeadlines(), searchParams]);
  deadlines.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 lg:flex-row lg:gap-7 lg:px-8 lg:py-9">
      <AppSidebar isAdmin />
      <div className="min-w-0 flex-1">
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Quyền lớp trưởng</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Quản trị deadline</h1>
          <p className="mt-2 text-sm text-slate-500">Thêm hoặc gỡ deadline để lịch học của lớp luôn chính xác.</p>
        </div>
        {query.deleted === "1" && <p role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700"><CheckCircle2 size={16} /> Đã xóa deadline và cập nhật trang chia sẻ.</p>}
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand"><CalendarDays size={18} /></span><div><p className="text-xs text-slate-500">Tổng deadline</p><p className="mt-0.5 text-xl font-bold text-ink">{deadlines.length}</p></div></div></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600"><ArrowUpRight size={18} /></span><div><p className="text-xs text-slate-500">Số môn học</p><p className="mt-0.5 text-xl font-bold text-ink">{subjects.length}</p></div></div></div>
        </div>
        <DeadlineCreateForm />
        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between"><div><h2 className="font-bold text-ink">Deadline hiện có</h2><p className="mt-1 text-xs text-slate-500">Danh sách công khai với tất cả thành viên lớp.</p></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">{deadlines.length} mục</span></div>
          <div className="divide-y divide-slate-100">
            {deadlines.map((deadline) => {
              const subject = subjects.find((item) => item.slug === deadline.subjectSlug);
              return <div key={deadline.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0"><Link href={`/deadlines/${deadline.id}`} className="text-sm font-bold text-ink hover:text-brand">{deadline.title}</Link><p className="mt-1 text-xs text-slate-500">{subject?.name} · {deadline.type} · {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(deadline.dueDate))}</p></div>
                <DeleteDeadlineButton deadlineId={deadline.id} title={deadline.title} />
              </div>;
            })}
            {!deadlines.length && <p className="py-10 text-center text-sm text-slate-500">Chưa có deadline nào.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
