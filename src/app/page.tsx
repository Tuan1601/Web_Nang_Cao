'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Plus, LayoutGrid, BookMarked,
  AlertTriangle, CheckCircle2, Menu,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchDeadlines, selectDeadlineStats, selectFilter,
} from '@/features/deadlines/deadlinesSlice';
import type { Deadline } from '@/features/deadlines/types/deadline.types';

import { DeadlineStats, DeadlineStatsMobile } from '@/features/deadlines/components/DeadlineStats';
import { DeadlineFilters }  from '@/features/deadlines/components/DeadlineFilters';
import { DeadlineList }     from '@/features/deadlines/components/DeadlineList';
import { DeadlineForm }     from '@/features/deadlines/components/DeadlineForm';
import { Modal }            from '@/shared/components/Modal';
import { ThemeToggle }      from '@/shared/components/ThemeToggle';

const FILTER_LABELS: Record<string, string> = {
  all:       'Tất cả deadline',
  pending:   'Chưa hoàn thành',
  overdue:   'Quá hạn',
  completed: 'Đã hoàn thành',
};

export default function HomePage() {
  const dispatch    = useAppDispatch();
  const stats       = useAppSelector(selectDeadlineStats);
  const filter      = useAppSelector(selectFilter);

  const [addOpen,    setAddOpen]    = useState(false);
  const [editTarget, setEditTarget] = useState<Deadline | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { dispatch(fetchDeadlines()); }, [dispatch]);

  return (
    <div className="app-shell">
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-lg shadow-indigo-500/40 shrink-0">
            <Image
              src="/logo.png"
              alt="Student Deadline Tracker"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white leading-tight truncate">Deadline Tracker</p>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Nơi bạn có thể không bị trễ deadline</p>
          </div>
        </div>

        <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <DeadlineStats />
        </div>

        <nav className="px-3 py-4 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 px-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Bộ lọc
          </p>
          <DeadlineFilters direction="vertical">
            <DeadlineFilters.List>
              <DeadlineFilters.Item value="all"       count={stats.total}     icon={<LayoutGrid size={14} />}>Tất cả</DeadlineFilters.Item>
              <DeadlineFilters.Item value="pending"   count={stats.pending}   icon={<BookMarked size={14} />}>Chưa xong</DeadlineFilters.Item>
              <DeadlineFilters.Item value="overdue"   count={stats.overdue}   icon={<AlertTriangle size={14} />}>Quá hạn</DeadlineFilters.Item>
              <DeadlineFilters.Item value="completed" count={stats.completed} icon={<CheckCircle2 size={14} />}>Hoàn thành</DeadlineFilters.Item>
            </DeadlineFilters.List>
          </DeadlineFilters>
        </nav>

        <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <ThemeToggle />
        </div>
      </aside>

      <div className="main-panel">
        <header className="topbar px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Mở menu"
                className="lg:hidden p-2 rounded-xl transition-colors shrink-0"
                style={{ color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}
              >
                <Menu size={18} />
              </button>

              <Image
                src="/logo.png"
                alt="Student Deadline Tracker"
                width={32}
                height={32}
                className="lg:hidden w-8 h-8 rounded-lg object-cover shrink-0"
                priority
              />

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest truncate" style={{ color: 'var(--text-muted)' }}>
                  {FILTER_LABELS[filter]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setAddOpen(true)}
                aria-label="Thêm deadline"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: 'var(--accent)', boxShadow: '0 2px 10px var(--accent-ring)' }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Thêm deadline</span>
                <span className="sm:hidden">Thêm</span>
              </button>
            </div>
          </div>

          <div className="lg:hidden pb-3 overflow-x-auto">
            <DeadlineFilters direction="horizontal">
              <DeadlineFilters.List>
                <DeadlineFilters.Item value="all"       count={stats.total}>Tất cả</DeadlineFilters.Item>
                <DeadlineFilters.Item value="pending"   count={stats.pending}>Chưa xong</DeadlineFilters.Item>
                <DeadlineFilters.Item value="overdue"   count={stats.overdue}>Quá hạn</DeadlineFilters.Item>
                <DeadlineFilters.Item value="completed" count={stats.completed}>Hoàn thành</DeadlineFilters.Item>
              </DeadlineFilters.List>
            </DeadlineFilters>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 py-6 space-y-5">
          <div className="lg:hidden">
            <DeadlineStatsMobile />
          </div>

          <DeadlineList onEdit={(d) => setEditTarget(d)} />
        </main>

        <footer className="px-6 py-4 border-t text-center" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            Anh Tuấn Aka Tuấn Dophin - 2026
          </p>
        </footer>
      </div>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Thêm deadline mới">
        <DeadlineForm onClose={() => setAddOpen(false)} />
      </Modal>

      <Modal isOpen={editTarget !== null} onClose={() => setEditTarget(null)} title="Chỉnh sửa deadline">
        {editTarget && (
          <DeadlineForm onClose={() => setEditTarget(null)} editTarget={editTarget} />
        )}
      </Modal>
    </div>
  );
}
