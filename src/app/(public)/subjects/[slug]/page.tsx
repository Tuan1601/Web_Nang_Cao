import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import { subjects } from "@/lib/subjects";
import { getDeadlines } from "@/lib/deadlines";
import { DeadlineCard } from "@/components/deadline-card";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return subjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const subject = subjects.find((item) => item.slug === slug);
  if (!subject) return { title: "Không tìm thấy môn học" };
  return {
    title: subject.name,
    description: `${subject.description} Theo dõi deadline môn ${subject.name}.`,
  };
}

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = subjects.find((item) => item.slug === slug);
  if (!subject) notFound();

  const deadlines = (await getDeadlines())
    .filter((deadline) => deadline.subjectSlug === slug)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:py-14 lg:px-8">
      <Link href="/#subjects" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand"><ArrowLeft size={16} /> Tất cả môn học</Link>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-pale px-3 py-1.5 text-xs font-bold text-brand"><BookOpen size={14} /> {subject.code}</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{subject.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">{subject.description}</p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-brand"><GraduationCap size={26} /></span>
        </div>
        <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-100 pt-5 text-xs text-slate-500">
          <span><strong className="font-semibold text-slate-700">Giảng viên:</strong> {subject.lecturer}</span>
          <span><strong className="font-semibold text-slate-700">Thời gian:</strong> {subject.term}</span>
          <span><strong className="font-semibold text-slate-700">Deadline:</strong> {deadlines.length}</span>
        </div>
      </div>
      <div className="mb-5 mt-10"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Kế hoạch môn học</p><h2 className="mt-2 text-2xl font-bold text-ink">Deadline môn {subject.name}</h2></div>
      {deadlines.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{deadlines.map((deadline) => <DeadlineCard key={deadline.id} deadline={deadline} />)}</div> : <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">Môn học này chưa có deadline.</p>}
    </div>
  );
}
