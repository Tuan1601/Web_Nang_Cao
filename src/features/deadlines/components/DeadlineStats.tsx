'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectDeadlineStats } from '@/features/deadlines/deadlinesSlice';

interface StatRowProps {
  label: string;
  value: number;
  color: string;
  barColor: string;
  total: number;
}

function StatRow({ label, value, color, barColor, total }: StatRowProps) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs" style={{ color: 'var(--text-sidebar)' }}>{label}</span>
        <span className={`text-sm font-bold tabular-nums ${color}`}>{value}</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function DeadlineStats() {
  const stats = useAppSelector(selectDeadlineStats);

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
        Thống kê
      </p>

      <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-3xl font-bold text-white tabular-nums">{stats.total}</p>
        <p className="text-xs" style={{ color: 'var(--text-sidebar)' }}>bài tập</p>
      </div>

      <StatRow label="Chưa hoàn thành" value={stats.pending}   total={stats.total} color="text-amber-400"   barColor="bg-amber-400" />
      <StatRow label="Quá hạn"         value={stats.overdue}   total={stats.total} color="text-red-400"     barColor="bg-red-400" />
      <StatRow label="Hoàn thành"      value={stats.completed} total={stats.total} color="text-emerald-400" barColor="bg-emerald-400" />
    </div>
  );
}

export function DeadlineStatsMobile() {
  const stats = useAppSelector(selectDeadlineStats);
  const items = [
    { label: 'Tổng', value: stats.total,     cls: 'text-[var(--text-primary)]' },
    { label: 'Chờ',  value: stats.pending,   cls: 'text-amber-600 dark:text-amber-400' },
    { label: 'Trễ',  value: stats.overdue,   cls: 'text-red-600 dark:text-red-400' },
    { label: 'Xong', value: stats.completed, cls: 'text-emerald-600 dark:text-emerald-400' },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-xl p-3 text-center"
          style={{ background: 'var(--bg-surface)', border: '1.5px solid var(--border-subtle)' }}
        >
          <p className={`text-xl font-bold tabular-nums ${s.cls}`}>{s.value}</p>
          <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}
