import type { Metadata } from "next";
import { getDeadlines } from "@/lib/deadlines";
import { DeadlineBrowser } from "@/components/deadline-browser";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tất cả deadline",
  description: "Tìm kiếm, lọc và theo dõi deadline của tất cả môn học trong lớp.",
};

export default async function DeadlinesPage() {
  const deadlines = await getDeadlines();
  deadlines.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:py-14 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Tất cả trong tầm mắt</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Lịch deadline</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Tìm nhanh bài tập, quiz và lịch kiểm tra theo môn học hoặc loại deadline.</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> {deadlines.length} deadline đang được theo dõi
        </div>
      </div>
      <DeadlineBrowser deadlines={deadlines} />
    </div>
  );
}
