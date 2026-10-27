import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { getDeadlines } from "@/lib/deadlines";
import { subjects } from "@/lib/subjects";
import { DeadlineCard } from "@/components/deadline-card";
import { SubjectCard } from "@/components/subject-card";

export const dynamic = "force-static";

export default async function HomePage() {
  const deadlines = await getDeadlines();
  const upcoming = deadlines
    .filter((deadline) => new Date(deadline.dueDate).getTime() >= Date.now())
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 grid-dots opacity-60" />
        <div className="absolute -right-36 -top-48 -z-10 h-[520px] w-[520px] rounded-full bg-blue-100/70 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-14 md:grid-cols-[1.05fr_.95fr] md:gap-10 md:pb-24 md:pt-20 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand shadow-sm">
              <Sparkles size={14} /> Không bỏ lỡ bất kỳ hạn nộp nào
            </div>
            <h1 className="mt-6 text-[clamp(2.6rem,6vw,4.35rem)] font-bold leading-[1.11] tracking-[-0.055em] text-ink">
              Deadline gọn gàng.<br />
              <span className="text-brand">Học tập nhẹ nhàng.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Một góc nhỏ giúp lớp mình theo dõi bài tập, lịch kiểm tra và mọi cột mốc học tập — tất cả trong một nơi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/deadlines" className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(50,104,232,.23)] transition hover:-translate-y-0.5 hover:bg-brand-dark">
                Khám phá deadline <ArrowRight size={17} />
              </Link>
              <Link href="/#subjects" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-ink transition hover:border-blue-200 hover:text-brand">
                Xem môn học <ChevronRight size={16} />
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-mint" /> Cập nhật liên tục</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-mint" /> Theo dõi tiến độ cá nhân</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-mint" /> Chia sẻ dễ dàng</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[530px]">
            <div className="absolute -left-5 top-16 z-10 hidden rounded-2xl border border-slate-100 bg-white p-3.5 shadow-soft sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-mint"><ShieldCheck size={18} /></span>
                <div><p className="text-xs font-bold text-ink">Tiến độ của bạn</p><p className="mt-0.5 text-[10px] text-slate-500">Từng bước hoàn thành</p></div>
              </div>
            </div>
            <div className="absolute -right-3 bottom-14 z-10 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-soft sm:block">
              <div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600"><Clock3 size={16} /></span><span className="text-xs font-bold text-ink">Còn 3 ngày</span></div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-blue-100/70 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 shadow-[0_26px_80px_rgba(44,82,150,.13)] sm:p-6">
              <Image src="/study-planner.svg" alt="Minh họa bảng theo dõi deadline học tập" width={560} height={390} priority className="h-auto w-full rounded-2xl" />
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white bg-white/90 p-4 shadow-sm">
                <div><p className="text-[11px] font-semibold text-slate-500">HỌC KỲ 1 · 2025–2026</p><p className="mt-1 text-sm font-bold text-ink">Học kỳ chủ động hơn</p></div>
                <div className="flex -space-x-2">
                  {["bg-blue-200", "bg-violet-200", "bg-emerald-200", "bg-amber-200"].map((tone, index) => <span key={index} className={`h-8 w-8 rounded-full border-2 border-white ${tone}`} />)}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[9px] font-bold text-slate-600">+8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Đừng để sát hạn</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Deadline sắp tới</h2></div>
          <Link href="/deadlines" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-dark">Tất cả deadline <ArrowUpRight size={16} /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((deadline) => <DeadlineCard key={deadline.id} deadline={deadline} />)}
        </div>
      </section>

      <section id="subjects" className="border-y border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Học kỳ 1 · 2025–2026</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Môn học của lớp</h2></div>
            <span className="text-sm text-slate-500">{subjects.length} môn học · {deadlines.length} deadline</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject) => <SubjectCard key={subject.slug} subject={subject} count={deadlines.filter((item) => item.subjectSlug === subject.slug).length} />)}
          </div>
        </div>
      </section>
    </>
  );
}
