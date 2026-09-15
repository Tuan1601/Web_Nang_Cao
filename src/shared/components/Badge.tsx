'use client';

import React from 'react';
import type { Priority } from '@/features/deadlines/types/deadline.types';

interface PriorityBadgeProps {
  variant: 'priority';
  value: Priority;
}

interface StatusBadgeProps {
  variant: 'status';
  value: 'completed' | 'overdue' | 'today' | 'pending';
}

type BadgeProps = (PriorityBadgeProps | StatusBadgeProps) & { className?: string };

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low: {
    label: 'Thấp',
    className: 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
  },
  medium: {
    label: 'Trung bình',
    className: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50',
  },
  high: {
    label: 'Cao',
    className: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50',
  },
};

const statusConfig: Record<string, { className: string }> = {
  completed: { className: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50' },
  overdue:   { className: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700/50' },
  today:     { className: 'text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700/50' },
  pending:   { className: 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/50' },
};

export function Badge({ variant, value, className = '' }: BadgeProps) {
  const { label, cls } = variant === 'priority'
    ? { label: priorityConfig[value as Priority].label, cls: priorityConfig[value as Priority].className }
    : { label: value, cls: statusConfig[value]?.className ?? statusConfig.pending.className };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${cls} ${className}`}>
      {label}
    </span>
  );
}
