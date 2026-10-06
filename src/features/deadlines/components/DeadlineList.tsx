'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  RefreshCw,
  AlertCircle,
  Search,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectFilteredDeadlines,
  selectStatus,
  selectError,
  selectFilter,
  fetchDeadlines,
  toggleDeadline,
  deleteDeadline,
} from '@/features/deadlines/deadlinesSlice';
import type { Deadline } from '@/features/deadlines/types/deadline.types';
import { DeadlineCard } from './DeadlineCard';
import { DeadlineEmpty } from './DeadlineEmpty';
import { DeadlineSkeletonGrid } from './DeadlineSkeleton';
import { usePinStore } from '@/features/deadlines/store/usePinStore';
import { useDebounce } from '@/features/deadlines/hooks/useDebounce';
import { List, type RowComponentProps } from 'react-window';

interface DeadlineListProps {
  onEdit: (d: Deadline) => void;
}

interface VirtualRowData {
  items: Deadline[];
  onEdit: (d: Deadline) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  pinnedIds: string[];
}

function VirtualizedItemRow({
  index,
  style,
  items,
  onEdit,
  onToggle,
  onDelete,
  pinnedIds,
}: RowComponentProps<VirtualRowData>) {
  const item = items[index];
  if (!item) return null;
  return (
    <div style={{ ...style, paddingBottom: 16 }}>
      <DeadlineCard
        deadline={item}
        onEdit={onEdit}
        onToggle={onToggle}
        onDelete={onDelete}
        isPinned={pinnedIds.includes(item.id)}
      />
    </div>
  );
}

export function DeadlineList({ onEdit }: DeadlineListProps) {
  const dispatch = useAppDispatch();
  const rawFilteredDeadlines = useAppSelector(selectFilteredDeadlines);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const filter = useAppSelector(selectFilter);

  const pinnedIds = usePinStore((s) => s.pinnedIds);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [useVirtualization, setUseVirtualization] = useState(false);

  // Handlers with useCallback for React.memo performance optimization
  const handleToggle = useCallback(
    (id: string) => {
      dispatch(toggleDeadline(id));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteDeadline(id));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (deadline: Deadline) => {
      onEdit(deadline);
    },
    [onEdit]
  );

  // useMemo for filtering by search query & sorting pinned items to the top
  const processedDeadlines = useMemo(() => {
    let list = rawFilteredDeadlines;

    // Filter by debounced search keyword (title or subject)
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.subject.toLowerCase().includes(q)
      );
    }

    // Sort: Pinned items always on top, then by due date
    const pinnedSet = new Set(pinnedIds);
    return [...list].sort((a, b) => {
      const aPinned = pinnedSet.has(a.id);
      const bPinned = pinnedSet.has(b.id);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [rawFilteredDeadlines, debouncedSearch, pinnedIds]);

  // Auto-enable virtualization suggestion for large datasets (> 100 items)
  const isLargeDataset = processedDeadlines.length > 100;
  const isVirtualizedActive = useVirtualization || isLargeDataset;

  const rowProps = useMemo<VirtualRowData>(
    () => ({
      items: processedDeadlines,
      onEdit: handleEdit,
      onToggle: handleToggle,
      onDelete: handleDelete,
      pinnedIds,
    }),
    [processedDeadlines, handleEdit, handleToggle, handleDelete, pinnedIds]
  );

  if (status === 'loading') return <DeadlineSkeletonGrid />;

  if (status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 p-5 rounded-2xl" style={{ background: 'var(--bg-surface)' }}>
          <AlertCircle size={36} className="text-red-400" />
        </div>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          Không tải được dữ liệu
        </p>
        <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
          {error}
        </p>
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

  return (
    <div className="space-y-4">
      {/* Search Bar and Virtualization Mode Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input with useDebounce */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            id="search-deadline-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài tập, môn học... (Debounce 300ms)"
            className="w-full pl-10 pr-10 py-2 text-sm rounded-xl border bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            style={{ borderColor: 'var(--border-default)' }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Xóa tìm kiếm"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Dataset Counter & Virtualization Toggle */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] tabular-nums">
            {processedDeadlines.length.toLocaleString()} kết quả
          </span>

          <button
            type="button"
            onClick={() => setUseVirtualization((prev) => !prev)}
            title="Bật/Tắt Virtualization (react-window) để kiểm tra hiệu năng 10.000 bài tập"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isVirtualizedActive
                ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-default)]'
            }`}
          >
            <Layers size={13} />
            <span>Virtualize: {isVirtualizedActive ? 'BẬT' : 'TẮT'}</span>
          </button>
        </div>
      </div>

      {/* Main List Rendering */}
      {processedDeadlines.length === 0 ? (
        <DeadlineEmpty filter={filter} />
      ) : isVirtualizedActive ? (
        /* Virtualized List using react-window */
        <div
          className="rounded-2xl border p-2 bg-[var(--bg-card)]"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="p-2 mb-2 text-xs font-medium text-indigo-500 bg-indigo-500/10 rounded-xl flex items-center gap-2">
            <Sparkles size={14} />
            <span>
              Đang áp dụng <strong>react-window Virtualization</strong> ({processedDeadlines.length.toLocaleString()} bài tập). Chỉ render các thẻ nhìn thấy trên màn hình để đạt 60 FPS mượt mà.
            </span>
          </div>

          <List<VirtualRowData>
            rowCount={processedDeadlines.length}
            rowHeight={195}
            rowComponent={VirtualizedItemRow}
            rowProps={rowProps}
            style={{ height: 600, width: '100%' }}
          />
        </div>
      ) : (
        /* Normal Grid with React.memo DeadlineCard items */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 card-grid">
          {processedDeadlines.map((d) => (
            <DeadlineCard
              key={d.id}
              deadline={d}
              onEdit={handleEdit}
              onToggle={handleToggle}
              onDelete={handleDelete}
              isPinned={pinnedIds.includes(d.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
