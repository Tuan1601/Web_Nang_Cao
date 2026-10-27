"use client";

import { useActionState } from "react";
import { Plus, Save } from "lucide-react";
import { addDeadlineAction, type AddDeadlineState } from "@/app/actions";
import { subjects } from "@/lib/subjects";

const initialState: AddDeadlineState = {};

export function DeadlineCreateForm() {
  const [state, action, pending] = useActionState(addDeadlineAction, initialState);

  return (
    <form action={action} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-pale text-brand"><Plus size={19} /></span>
        <div><h2 className="font-bold text-ink">Thêm deadline mới</h2><p className="mt-0.5 text-xs text-slate-500">Thông tin sẽ hiển thị công khai cho cả lớp.</p></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-slate-700">Tên deadline</span><input name="title" required minLength={5} maxLength={120} placeholder="Ví dụ: Bài tập lớn — Giao diện trang chủ" className="form-input" /></label>
        <label><span className="mb-1.5 block text-xs font-semibold text-slate-700">Môn học</span><select name="subjectSlug" required defaultValue="" className="form-input"><option value="" disabled>Chọn môn học</option>{subjects.map((subject) => <option key={subject.slug} value={subject.slug}>{subject.name}</option>)}</select></label>
        <label><span className="mb-1.5 block text-xs font-semibold text-slate-700">Loại deadline</span><select name="type" required defaultValue="Bài tập" className="form-input"><option>Bài tập</option><option>Bài tập lớn</option><option>Thực hành</option><option>Quiz</option><option>Kiểm tra</option><option>Báo cáo</option><option>Đồ án</option><option>Khác</option></select></label>
        <label><span className="mb-1.5 block text-xs font-semibold text-slate-700">Hạn nộp</span><input name="dueDate" type="datetime-local" required className="form-input" /></label>
        <label className="sm:col-span-2"><span className="mb-1.5 block text-xs font-semibold text-slate-700">Mô tả</span><textarea name="description" rows={3} required minLength={10} maxLength={1000} placeholder="Mô tả ngắn gọn yêu cầu và cách nộp bài..." className="form-input resize-y py-3" /></label>
      </div>
      {state.error && <p role="alert" className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-3 text-xs text-rose-700">{state.error}</p>}
      {state.success && <p role="status" className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-3.5 py-3 text-xs text-emerald-700">Đã thêm deadline thành công. Danh sách đã được cập nhật.</p>}
      <button type="submit" disabled={pending} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-dark disabled:opacity-60"><Save size={16} />{pending ? "Đang lưu..." : "Thêm deadline"}</button>
    </form>
  );
}
