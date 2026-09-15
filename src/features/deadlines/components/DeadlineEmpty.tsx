'use client';

import React from 'react';
import { ClipboardCheck, PartyPopper, Clock, AlertCircle } from 'lucide-react';
import type { DeadlineStatus } from '@/features/deadlines/types/deadline.types';

interface DeadlineEmptyProps { filter: DeadlineStatus; }

const config: Record<DeadlineStatus, { icon: React.ReactNode; title: string; desc: string }> = {
  all: {
    icon: <ClipboardCheck size={44} className="text-indigo-300 dark:text-indigo-600" />,
    title: 'Chưa có deadline nào',
    desc: 'Nhấn "+ Thêm deadline" để bắt đầu theo dõi bài tập của bạn.',
  },
  pending: {
    icon: <Clock size={44} className="text-amber-300 dark:text-amber-600" />,
    title: 'Không có deadline đang chờ',
    desc: 'Tất cả deadline đều đã được xử lý. Tuyệt vời!',
  },
  overdue: {
    icon: <PartyPopper size={44} className="text-emerald-400 dark:text-emerald-500" />,
    title: 'Không có deadline quá hạn ',
    desc: 'Bạn đang quản lý rất tốt! Tiếp tục phát huy nhé.',
  },
  completed: {
    icon: <AlertCircle size={44} className="text-slate-300 dark:text-slate-600" />,
    title: 'Chưa hoàn thành deadline nào',
    desc: 'Hãy đánh dấu hoàn thành khi bạn nộp bài xong nhé.',
  },
};

export function DeadlineEmpty({ filter }: DeadlineEmptyProps) {
  const { icon, title, desc } = config[filter];
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="mb-5 p-6 rounded-2xl"
        style={{ background: 'var(--bg-elevated)' }}
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {desc}
      </p>
    </div>
  );
}
