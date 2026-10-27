import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, GraduationCap } from "lucide-react";
import { getDeadline, getDeadlines } from "@/lib/deadlines";
import { subjects } from "@/lib/subjects";
import { DeadlineCard } from "@/components/deadline-card";
import { Countdown } from "@/components/countdown";
import { DeadlineCompletion } from "@/components/deadline-completion";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };
const siteUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export async function generateStaticParams() {
  return (await getDeadlines()).map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const deadline = await getDeadline(id);
  if (!deadline) return { title: "Không tìm thấy deadline" };
  const subject = subjects.find((item) => item.slug === deadline.subjectSlug);
  return {
    title: deadline.title,
    description: deadline.description,
    openGraph: {
      title: deadline.title,
      description: `${subject?.name ?? "Môn học"} · Hạn nộp ${new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(deadline.dueDate))}`,
      images: [{ url: `/deadlines/${deadline.id}/opengraph-image`, width: 1200, height: 630, alt: deadline.title }],
    },
    twitter: { card: "summary_large_image", title: deadline.title, description: deadline.description, images: [`/deadlines/${deadline.id}/opengraph-image`] },
  };
}

export default async function DeadlineDetailsPage({ params }: Props) {
  const { id } = await params;
  const [deadline, allDeadlines] = await Promise.all([getDeadline(id), getDeadlines()]);
  if (!deadline) notFound();
  const subject = subjects.find((item) => item.slug === deadline.subjectSlug);
  const date = new Intl.DateTimeFormat("vi-VN", { dateStyle: "full", timeStyle: "short" }).format(new Date(deadline.dueDate));
  const related = allDeadlines.filter((item) => item.subjectSlug === deadline.subjectSlug && item.id !== deadline.id).slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:py-14 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand">Trang chủ</Link><span>/</span>
        <Link href="/deadlines" className="hover:text-brand">Deadline</Link><span>/</span>
        <span className="max-w-[220px] truncate font-medium text-slate-700">{deadline.title}</span>
      </nav>
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-pale px-3 py-1.5 text-[11px] font-bold text-brand">{subject?.code} · {subject?.name}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-600">{deadline.type}</span>
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[38px]">{deadline.title}</h1>
          <p className="mt-5 text-sm leading-7 text-slate-600">{deadline.description}</p>
          <div className="mt-7 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2 sm:p-5">
            <div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm"><CalendarDays size={17} /></span><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hạn hoàn thành</p><p className="mt-1 text-sm font-semibold capitalize text-slate-700">{date}</p></div></div>
            <div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm"><GraduationCap size={18} /></span><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Môn học</p><p className="mt-1 text-sm font-semibold text-slate-700">{subject?.name}</p></div></div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 p-4">
            <span className="text-sm font-semibold text-slate-700">Tiến độ thời gian</span><Countdown dueDate={deadline.dueDate} />
          </div>
          <DeadlineCompletion deadlineId={deadline.id} />
        </article>
        <aside className="space-y-5">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brand">Mẹo nhỏ</p>
            <h2 className="mt-2 font-bold text-ink">Bắt đầu sớm, nhẹ đầu hơn</h2>
            <p className="mt-2 text-xs leading-5 text-slate-600">Chia bài tập thành các bước nhỏ và dành thời gian kiểm tra lại trước khi nộp nhé.</p>
          </div>
          {related.length > 0 && <div><h2 className="mb-3 text-sm font-bold text-ink">Deadline cùng môn</h2><div className="space-y-3">{related.map((item) => <DeadlineCard key={item.id} deadline={item} />)}</div></div>}
        </aside>
      </div>
      <div className="mt-7"><Link href="/deadlines" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand"><ArrowLeft size={16} /> Trở lại danh sách deadline</Link></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Trang chủ", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Deadline", item: `${siteUrl}/deadlines` },
          { "@type": "ListItem", position: 3, name: deadline.title, item: `${siteUrl}/deadlines/${deadline.id}` },
        ],
      }).replace(/</g, "\\u003c") }} />
    </div>
  );
}
