'use client';

import React, { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectAllDeadlines } from '@/features/deadlines/deadlinesSlice';
import { calcStats, calcSubjectStats } from '@/features/deadlines/utils/deadline.utils';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  PieChart,
  BarChart3,
  TrendingUp,
  Award,
} from 'lucide-react';

export default function DeadlineStatisticsDashboard() {
  const allItems = useAppSelector(selectAllDeadlines);

  const stats = useMemo(() => calcStats(allItems), [allItems]);
  const subjectStats = useMemo(() => calcSubjectStats(allItems), [allItems]);

  const completionRate = useMemo(() => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  }, [stats]);

  const priorityBreakdown = useMemo(() => {
    const high = allItems.filter((i) => i.priority === 'high').length;
    const medium = allItems.filter((i) => i.priority === 'medium').length;
    const low = allItems.filter((i) => i.priority === 'low').length;
    return { high, medium, low };
  }, [allItems]);

  return (
    <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
      {/* Header Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          className="p-4 rounded-2xl border"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Tổng số</span>
            <BookOpen size={16} className="text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold tabular-nums text-[var(--text-primary)]">
            {stats.total.toLocaleString()}
          </p>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">Bài tập được giao</p>
        </div>

        <div
          className="p-4 rounded-2xl border bg-emerald-500/5"
          style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}
        >
          <div className="flex items-center justify-between text-emerald-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Hoàn thành</span>
            <CheckCircle2 size={16} />
          </div>
          <p className="text-2xl sm:text-3xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
            {stats.completed.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-1">
            Đạt tỉ lệ {completionRate}%
          </p>
        </div>

        <div
          className="p-4 rounded-2xl border bg-amber-500/5"
          style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}
        >
          <div className="flex items-center justify-between text-amber-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Chờ xử lý</span>
            <Clock size={16} />
          </div>
          <p className="text-2xl sm:text-3xl font-bold tabular-nums text-amber-600 dark:text-amber-400">
            {stats.pending.toLocaleString()}
          </p>
          <p className="text-[11px] text-amber-600/80 dark:text-amber-400/80 mt-1">
            Còn trong hạn
          </p>
        </div>

        <div
          className="p-4 rounded-2xl border bg-red-500/5"
          style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}
        >
          <div className="flex items-center justify-between text-red-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Quá hạn</span>
            <AlertTriangle size={16} />
          </div>
          <p className="text-2xl sm:text-3xl font-bold tabular-nums text-red-600 dark:text-red-400">
            {stats.overdue.toLocaleString()}
          </p>
          <p className="text-[11px] text-red-600/80 dark:text-red-400/80 mt-1">Cần ưu tiên gấp</p>
        </div>
      </div>

      {/* Progress Bar & Overall Completion */}
      <div
        className="p-4 sm:p-5 rounded-2xl border"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-indigo-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Tiến độ hoàn thành tổng thể
            </h4>
          </div>
          <span className="text-sm font-bold tabular-nums text-indigo-500">{completionRate}%</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Distribution by Priority */}
      <div
        className="p-4 sm:p-5 rounded-2xl border"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <PieChart size={16} className="text-amber-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
            Phân bố theo độ ưu tiên
          </h4>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
            <span className="text-xs font-semibold text-red-500">Ưu tiên Cao</span>
            <p className="text-xl font-bold text-red-600 dark:text-red-400 mt-1 tabular-nums">
              {priorityBreakdown.high.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
            <span className="text-xs font-semibold text-amber-500">Ưu tiên Vừa</span>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
              {priorityBreakdown.medium.toLocaleString()}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
            <span className="text-xs font-semibold text-indigo-500">Ưu tiên Thấp</span>
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
              {priorityBreakdown.low.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown by Subject */}
      <div
        className="p-4 sm:p-5 rounded-2xl border"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-purple-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Thống kê chi tiết theo môn học ({subjectStats.length} môn)
            </h4>
          </div>
          <Award size={16} className="text-amber-400" />
        </div>

        {subjectStats.length === 0 ? (
          <p className="text-xs text-center py-6 text-[var(--text-muted)]">Chưa có dữ liệu môn học.</p>
        ) : (
          <div className="space-y-3">
            {subjectStats.map((item) => {
              const subjRate = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
              return (
                <div
                  key={item.subject}
                  className="p-3 rounded-xl border transition-colors"
                  style={{
                    background: 'var(--bg-elevated)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                      {item.subject}
                    </span>
                    <span className="text-xs font-semibold tabular-nums text-indigo-500">
                      {item.completed}/{item.total} ({subjRate}%)
                    </span>
                  </div>

                  <div className="h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700/60 mb-2">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${subjRate}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ {item.completed} xong
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      ⏳ {item.pending} chờ
                    </span>
                    {item.overdue > 0 && (
                      <span className="text-red-500 font-bold">
                        ⚠️ {item.overdue} trễ
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
