import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, CheckCircle2, Circle, Clock3, ListTodo } from "lucide-react";
import { DeadlineCard } from "@/components/deadline-card";
import { getCompletions, getDeadlines } from "@/lib/deadlines";
import { getSession } from "@/lib/session";
import { can } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Tổng quan",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user || !can(session.user.role, "view_deadlines")) redirect("/login?callbackUrl=/dashboard");

  const [deadlines, completionMap] = await Promise.all([getDeadlines(), getCompletions()]);
  const completedIds = new Set(completionMap[session.user.id] ?? []);
  const pending = deadlines.filter((deadline) => !completedIds.has(deadline.id) && new Date(deadline.dueDate).getTime() >= Date.now());
  const upcoming = pending.sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 3);
  const completionRate = deadlines.length ? Math.round((completedIds.size / deadlines.length) * 100) : 0;

  return (
    <div>
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Không gian của bạn</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Chào {session.user.name?.split(" ")[0] ?? "bạn"} 👋</h1>
        <p className="mt-2 text-sm text-slate-500">Cùng xem những việc cần hoàn thành trong học kỳ này nhé.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Deadline trong lớp" value={String(deadlines.length)} icon={<ListTodo size={18} />} tone="blue" detail="Được lớp trưởng cập nhật" />
        <StatCard label="Chưa hoàn thành" value={String(pending.length)} icon={<Clock3 size={18} />} tone="amber" detail="Deadline còn hạn" />
        <StatCard label="Tiến độ cá nhân" value={`${completionRate}%`} icon={<CheckCircle2 size={18} />} tone="green" detail={`${completedIds.size} deadline đã đánh dấu`} />
      </div>
      <div className="mb-4 mt-9 flex items-end justify-between gap-3">
        <div><h2 className="text-lg font-bold text-ink">Sắp đến hạn</h2><p className="mt-1 text-xs text-slate-500">Ưu tiên những việc cần hoàn thành trước.</p></div>
        <Link href="/deadlines" className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline">Xem tất cả <ArrowRight size={14} /></Link>
      </div>
      {upcoming.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{upcoming.map((deadline) => <DeadlineCard key={deadline.id} deadline={deadline} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><Circle className="mx-auto text-emerald-500" size={24} /><p className="mt-3 text-sm font-bold text-ink">Tuyệt vời, bạn đã bắt kịp tiến độ!</p><p className="mt-1 text-xs text-slate-500">Không còn deadline sắp tới nào chưa hoàn thành.</p></div>}
      <div className="mt-7 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-wider text-brand">Giữ nhịp học tập</p><h2 className="mt-1 font-bold text-ink">Đánh dấu khi bạn hoàn thành deadline</h2><p className="mt-1 text-xs text-slate-500">Tiến độ này chỉ hiển thị với tài khoản của bạn.</p></div><Link href="/deadlines" className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-brand shadow-sm ring-1 ring-blue-100 hover:bg-brand-pale">Xem deadline <ArrowRight size={14} /></Link></div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, tone, detail }: { label: string; value: string; icon: React.ReactNode; tone: "blue" | "amber" | "green"; detail: string }) {
  const styles = { blue: "bg-blue-50 text-brand", amber: "bg-amber-50 text-amber-600", green: "bg-emerald-50 text-mint" };
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-slate-500">{label}</p><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${styles[tone]}`}>{icon}</span></div><p className="mt-4 text-3xl font-bold tracking-tight text-ink">{value}</p><p className="mt-1 text-[10px] text-slate-400">{detail}</p></div>;
}
