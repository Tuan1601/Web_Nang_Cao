"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Deadline } from "@/lib/deadlines";
import { subjects } from "@/lib/subjects";
import { DeadlineCard } from "@/components/deadline-card";

export function DeadlineBrowser({ deadlines }: { deadlines: Deadline[] }) {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("all");
  const [type, setType] = useState("all");
  const types = useMemo(() => [...new Set(deadlines.map((deadline) => deadline.type))], [deadlines]);
  const filtered = deadlines.filter((deadline) => {
    const searchText = `${deadline.title} ${deadline.description} ${subjects.find((item) => item.slug === deadline.subjectSlug)?.name ?? ""}`.toLocaleLowerCase("vi");
    return searchText.includes(query.toLocaleLowerCase("vi"))
      && (subject === "all" || deadline.subjectSlug === subject)
      && (type === "all" || deadline.type === type);
  });

  return (
    <>
      <div className="mb-7 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_220px_190px]">
          <label className="relative block">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <span className="sr-only">Tìm deadline</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm tên deadline, môn học..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
            />
          </label>
          <label className="relative">
            <SlidersHorizontal size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <span className="sr-only">Lọc theo môn học</span>
            <select value={subject} onChange={(event) => setSubject(event.target.value)} className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10">
              <option value="all">Tất cả môn học</option>
              {subjects.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Lọc theo loại</span>
            <select value={type} onChange={(event) => setType(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10">
              <option value="all">Tất cả loại deadline</option>
              {types.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </div>
      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((deadline) => <DeadlineCard key={deadline.id} deadline={deadline} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500"><Search size={21} /></div>
          <h2 className="font-bold text-ink">Không tìm thấy deadline</h2>
          <p className="mt-1 text-sm text-slate-500">Thử đổi từ khóa hoặc bộ lọc của bạn nhé.</p>
        </div>
      )}
      <p className="mt-5 text-center text-xs text-slate-500">Hiển thị {filtered.length} / {deadlines.length} deadline</p>
    </>
  );
}
