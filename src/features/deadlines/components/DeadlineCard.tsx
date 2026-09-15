'use client';

import React, { useState } from 'react';
import { Calendar, Trash2, CheckCircle2, Circle, BookOpen, AlertTriangle, Clock, Pencil } from 'lucide-react';
import type { Deadline } from '@/features/deadlines/types/deadline.types';
import { useAppDispatch } from '@/store/hooks';
import { toggleDeadline, deleteDeadline } from '@/features/deadlines/deadlinesSlice';
import { useDeadlineStatus } from '@/features/deadlines/hooks/useDeadlineStatus';
import { formatDeadlineDate } from '@/features/deadlines/utils/deadline.utils';

interface DeadlineCardProps {
  deadline: Deadline;
  onEdit: (deadline: Deadline) => void;
}

const priorityConfig = {
  high:   { label: 'CAO',    dot: 'bg-red-500',    text: 'text-red-600 dark:text-red-400' },
  medium: { label: 'TB',     dot: 'bg-amber-400',  text: 'text-amber-600 dark:text-amber-400' },
  low:    { label: 'THẤP',  dot: 'bg-indigo-400',  text: 'text-indigo-600 dark:text-indigo-400' },
} as const;

const statusStyle = {
  completed: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-400', Icon: CheckCircle2 },
  overdue:   { bg: 'bg-red-50 dark:bg-red-950/40',         text: 'text-red-700 dark:text-red-400',         Icon: AlertTriangle },
  today:     { bg: 'bg-orange-50 dark:bg-orange-950/40',   text: 'text-orange-700 dark:text-orange-400',   Icon: AlertTriangle },
  pending:   { bg: 'bg-slate-50 dark:bg-slate-900/40',     text: 'text-slate-600 dark:text-slate-400',     Icon: Clock },
} as const;

export function DeadlineCard({ deadline, onEdit }: DeadlineCardProps) {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const { label, status } = useDeadlineStatus(deadline.dueDate, deadline.completed);
  const p = priorityConfig[deadline.priority];
  const s = statusStyle[status];
  const StatusIcon = s.Icon;

  return (
    <div
      className="dl-card group"
      data-priority={deadline.priority}
      data-completed={String(deadline.completed)}
    >
      {showConfirm && (
        <div
          className="absolute inset-0 z-20 rounded-2xl flex flex-col items-center justify-center gap-3 p-5 animate-fade-in"
          style={{ background: 'var(--bg-surface)' }}
        >
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
            <Trash2 size={18} className="text-red-500" />
          </div>
          <p className="text-sm font-medium text-center" style={{ color: 'var(--text-secondary)' }}>
            Xóa deadline này?
          </p>
          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-2 text-xs font-semibold rounded-xl transition-colors"
              style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
            >Hủy</button>
            <button
              type="button"
              onClick={() => dispatch(deleteDeadline(deadline.id))}
              className="flex-1 py-2 text-xs font-semibold rounded-xl text-white bg-red-500 hover:bg-red-600 transition-colors"
            >Xóa</button>
          </div>
        </div>
      )}

      <div className="p-4 pt-5 flex flex-col h-full">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full shrink-0 ${p.dot}`} />
            <span className={`text-[10px] font-bold tracking-widest uppercase ${p.text}`}>
              {p.label}
            </span>
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <BookOpen size={11} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span
              className="text-[11px] font-medium truncate max-w-[120px]"
              style={{ color: 'var(--text-muted)' }}
            >
              {deadline.subject}
            </span>
          </div>
        </div>

        <h3
          className={`text-sm font-semibold leading-snug mb-auto pb-3 ${deadline.completed ? 'line-through' : ''}`}
          style={{ color: deadline.completed ? 'var(--text-muted)' : 'var(--text-primary)' }}
        >
          {deadline.title}
        </h3>

        <div className="flex items-center gap-2 mt-1 mb-3">
          <div className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={11} />
            <span>{formatDeadlineDate(deadline.dueDate)}</span>
          </div>
          <div
            className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}
          >
            <StatusIcon size={10} />
            <span>{label}</span>
          </div>
        </div>

        <div className="border-t mb-3" style={{ borderColor: 'var(--border-subtle)' }} />

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => dispatch(toggleDeadline(deadline.id))}
            aria-label={deadline.completed ? 'Bỏ hoàn thành' : 'Đánh dấu hoàn thành'}
            className={`
              flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all
              ${deadline.completed
                ? 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-950 border border-emerald-200 dark:border-emerald-800/50'}
            `}
            style={deadline.completed ? { background: 'var(--bg-elevated)' } : {}}
          >
            {deadline.completed ? <Circle size={12} /> : <CheckCircle2 size={12} />}
            {deadline.completed ? 'Bỏ xong' : 'Hoàn thành'}
          </button>

          {!deadline.completed && (
            <button
              type="button"
              onClick={() => onEdit(deadline)}
              aria-label="Chỉnh sửa"
              className="p-1.5 rounded-xl transition-all"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elevated)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              <Pencil size={13} />
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            aria-label="Xóa"
            className="p-1.5 rounded-xl transition-all"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#ef4444'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-elevated)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
