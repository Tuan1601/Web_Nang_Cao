'use client';

import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectFilteredDeadlines, selectStatus, selectError, selectFilter, fetchDeadlines,
} from '@/features/deadlines/deadlinesSlice';
import type { Deadline } from '@/features/deadlines/types/deadline.types';
import { DeadlineCard }        from './DeadlineCard';
import { DeadlineEmpty }       from './DeadlineEmpty';
import { DeadlineSkeletonGrid } from './DeadlineSkeleton';

interface DeadlineListProps { onEdit: (d: Deadline) => void; }

export function DeadlineList({ onEdit }: DeadlineListProps) {
  const dispatch  = useAppDispatch();
  const deadlines = useAppSelector(selectFilteredDeadlines);
  const status    = useAppSelector(selectStatus);
  const error     = useAppSelector(selectError);
  const filter    = useAppSelector(selectFilter);

  if (status === 'loading') return <DeadlineSkeletonGrid />;

  if (status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 p-5 rounded-2xl" style={{ background: 'var(--bg-surface)' }}>
          <AlertCircle size={36} className="text-red-400" />
        </div>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Không tải được dữ liệu</p>
        <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>{error}</p>
        <button
          type="button"
          onClick={() => dispatch(fetchDeadlines())}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors"
          style={{ background: 'var(--accent)' }}
        >
          <RefreshCw size={14} /> Thử lại
        </button>
      </div>
    );
  }

  if (deadlines.length === 0) return <DeadlineEmpty filter={filter} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 card-grid">
      {deadlines.map((d) => (
        <DeadlineCard key={d.id} deadline={d} onEdit={onEdit} />
      ))}
    </div>
  );
}
