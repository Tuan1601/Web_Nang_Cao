import Link from "next/link";
import { CalendarClock } from "lucide-react";
import type { Deadline } from "@/lib/deadlines";
import { subjects } from "@/lib/subjects";
import { Countdown } from "@/components/countdown";

const subjectStyles: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700",
  violet: "bg-violet-50 text-violet-700",
  mint: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
};

export function DeadlineCard({ deadline }: { deadline: Deadline }) {
  const subject = subjects.find((item) => item.slug === deadline.subjectSlug);
  const date = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(deadline.dueDate));

  return (
    <Link
      href={`/deadlines/${deadline.id}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_8px_rgba(29,48,77,.025)] transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${subjectStyles[subject?.color ?? "blue"]}`}>
          {subject?.code ?? "Môn học"}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{deadline.type}</span>
      </div>
      <h3 className="min-h-[52px] text-[15px] font-bold leading-6 text-ink transition group-hover:text-brand">{deadline.title}</h3>
      <p className="mt-1 text-xs font-medium text-slate-500">{subject?.name ?? "Môn học"}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 mt-5">
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarClock size={14} /> {date}
        </span>
        <Countdown dueDate={deadline.dueDate} compact />
      </div>
    </Link>
  );
}
