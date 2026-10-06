'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Trash2,
  CheckCircle2,
  Circle,
  BookOpen,
  AlertTriangle,
  Clock,
  Pencil,
  Pin,
  PinOff,
} from 'lucide-react';
import type { Deadline } from '@/features/deadlines/types/deadline.types';
import { useDeadlineStatus } from '@/features/deadlines/hooks/useDeadlineStatus';
import { formatDeadlineDate } from '@/features/deadlines/utils/deadline.utils';
import { usePinStore } from '@/features/deadlines/store/usePinStore';

export interface DeadlineCardProps {
  deadline: Deadline;
  onEdit?: (deadline: Deadline) => void;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  isPinned?: boolean;
}

const priorityConfig = {
  high:   { label: 'CAO',    dot: 'bg-red-500',    text: 'text-red-600 dark:text-red-400',   badge: 'bg-red-500/10 text-red-500 border-red-500/20' },
  medium: { label: 'TB',     dot: 'bg-amber-400',  text: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  low:    { label: 'THẤP',  dot: 'bg-indigo-400',  text: 'text-indigo-600 dark:text-indigo-400', badge: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
} as const;

const statusStyle = {
  completed: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-400', Icon: CheckCircle2 },
  overdue:   { bg: 'bg-red-50 dark:bg-red-950/40',         text: 'text-red-700 dark:text-red-400',         Icon: AlertTriangle },
  today:     { bg: 'bg-orange-50 dark:bg-orange-950/40',   text: 'text-orange-700 dark:text-orange-400',   Icon: AlertTriangle },
  pending:   { bg: 'bg-slate-50 dark:bg-slate-900/40',     text: 'text-slate-600 dark:text-slate-400',     Icon: Clock },
} as const;

function DeadlineCardComponent({
  deadline,
  onEdit,
  onToggle,
  onDelete,
  isPinned: isPinnedProp,
}: DeadlineCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const pinnedInStore = usePinStore((s) => s.isPinned(deadline.id));
  const togglePin = usePinStore((s) => s.togglePin);
  const pinned = isPinnedProp !== undefined ? isPinnedProp : pinnedInStore;

  const { label, status } = useDeadlineStatus(deadline.dueDate, deadline.completed);
  const p = priorityConfig[deadline.priority] || priorityConfig.medium;
  const s = statusStyle[status] || statusStyle.pending;
  const StatusIcon = s.Icon;

  const handleToggle = () => {
    if (onToggle) {
      onToggle(deadline.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(deadline.id);
    }
    setShowConfirm(false);
  };

  const handlePinToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePin(deadline.id);
  };

  return (
    <div
      className={`dl-card group relative transition-all duration-200 ${
        pinned ? 'ring-2 ring-amber-500/50 dark:ring-amber-400/40 bg-amber-500/5' : ''
      }`}
      data-priority={deadline.priority}
      data-completed={String(deadline.completed)}
      data-pinned={String(pinned)}
      data-testid={`deadline-card-${deadline.id}`}
    >
      {pinned && (
        <div className="absolute top-2.5 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
          <Pin size={10} className="fill-amber-500" />
          <span>Đã ghim</span>
        </div>
      )}

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
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleDelete}
              data-testid="confirm-delete-btn"
              className="flex-1 py-2 text-xs font-semibold rounded-xl text-white bg-red-500 hover:bg-red-600 transition-colors"
            >
              Xóa
            </button>
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
          <div className="flex items-center gap-1 min-w-0 pr-16">
            <BookOpen size={11} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <span
              className="text-[11px] font-medium truncate max-w-[120px]"
              style={{ color: 'var(--text-muted)' }}
              title={deadline.subject}
            >
              {deadline.subject}
            </span>
          </div>
        </div>

        <h3
          className={`text-sm font-semibold leading-snug mb-auto pb-3 ${
            deadline.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
          }`}
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
            onClick={handleToggle}
            aria-label={deadline.completed ? 'Bỏ hoàn thành' : 'Đánh dấu hoàn thành'}
            data-testid="toggle-complete-btn"
            className={`
              flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all
              ${
                deadline.completed
                  ? 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] bg-[var(--bg-elevated)]'
                  : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-950 border border-emerald-200 dark:border-emerald-800/50'
              }
            `}
          >
            {deadline.completed ? <Circle size={12} /> : <CheckCircle2 size={12} />}
            <span>{deadline.completed ? 'Bỏ xong' : 'Hoàn thành'}</span>
          </button>

          <button
            type="button"
            onClick={handlePinToggle}
            aria-label={pinned ? 'Bỏ ghim' : 'Ghim bài tập'}
            data-testid="toggle-pin-btn"
            title={pinned ? 'Bỏ ghim' : 'Ghim lên đầu'}
            className={`p-1.5 rounded-xl transition-all ${
              pinned
                ? 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20'
                : 'text-[var(--text-muted)] hover:text-amber-500 hover:bg-[var(--bg-elevated)]'
            }`}
          >
            {pinned ? <PinOff size={13} /> : <Pin size={13} />}
          </button>

          {!deadline.completed && onEdit && (
            <button
              type="button"
              onClick={() => onEdit(deadline)}
              aria-label="Chỉnh sửa"
              data-testid="edit-deadline-btn"
              className="p-1.5 rounded-xl transition-all text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--bg-elevated)]"
            >
              <Pencil size={13} />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              aria-label="Xóa"
              data-testid="delete-deadline-btn"
              className="p-1.5 rounded-xl transition-all text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--bg-elevated)]"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// React.memo optimization to avoid re-rendering untouched assignment cards
export const DeadlineCard = React.memo(DeadlineCardComponent);
export const AssignmentCard = DeadlineCard;
