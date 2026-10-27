import Link from "next/link";
import { ArrowUpRight, BookOpen, GraduationCap } from "lucide-react";
import type { Subject } from "@/lib/subjects";

const tones: Record<string, { icon: string; code: string }> = {
  blue: { icon: "bg-blue-50 text-blue-600", code: "text-blue-700 bg-blue-50" },
  violet: { icon: "bg-violet-50 text-violet-600", code: "text-violet-700 bg-violet-50" },
  mint: { icon: "bg-emerald-50 text-emerald-600", code: "text-emerald-700 bg-emerald-50" },
  amber: { icon: "bg-amber-50 text-amber-600", code: "text-amber-700 bg-amber-50" },
};

export function SubjectCard({ subject, count }: { subject: Subject; count: number }) {
  const tone = tones[subject.color];
  return (
    <Link href={`/subjects/${subject.slug}`} className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft">
      <div className="flex items-start justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone.icon}`}><BookOpen size={20} /></span>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${tone.code}`}>{subject.code}</span>
      </div>
      <h3 className="mt-5 text-base font-bold text-ink group-hover:text-brand">{subject.name}</h3>
      <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">{subject.description}</p>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><GraduationCap size={15} />{count} deadline</span>
        <ArrowUpRight size={16} className="text-slate-400 transition group-hover:text-brand" />
      </div>
    </Link>
  );
}
