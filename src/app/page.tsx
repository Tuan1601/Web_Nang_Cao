'use client';

import React, { useEffect, useState, Suspense, lazy } from 'react';
import Image from 'next/image';
import {
  Plus,
  LayoutGrid,
  BookMarked,
  AlertTriangle,
  CheckCircle2,
  Menu,
  Zap,
  BarChart2,
  RotateCcw,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchDeadlines,
  selectDeadlineStats,
  selectFilter,
  setDeadlines,
  clearAllDeadlines,
} from '@/features/deadlines/deadlinesSlice';
import type { Deadline } from '@/features/deadlines/types/deadline.types';
import { generateSampleDeadlines } from '@/features/deadlines/utils/deadline.utils';
import { usePinStore } from '@/features/deadlines/store/usePinStore';

import { DeadlineStats, DeadlineStatsMobile } from '@/features/deadlines/components/DeadlineStats';
import { DeadlineFilters } from '@/features/deadlines/components/DeadlineFilters';
import { DeadlineList } from '@/features/deadlines/components/DeadlineList';
import { DeadlineForm } from '@/features/deadlines/components/DeadlineForm';
import { Modal } from '@/shared/components/Modal';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

// React.lazy for Statistics Dashboard component (Phần B: Tối ưu hiệu năng)
const DeadlineStatisticsDashboard = lazy(
  () => import('@/features/deadlines/components/DeadlineStatisticsDashboard')
);

const FILTER_LABELS: Record<string, string> = {
  all: 'Tất cả deadline',
  pending: 'Chưa hoàn thành',
  overdue: 'Quá hạn',
  completed: 'Đã hoàn thành',
};

export default function HomePage() {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectDeadlineStats);
  const filter = useAppSelector(selectFilter);
  const pinnedIds = usePinStore((s) => s.pinnedIds);

  const [addOpen, setAddOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Deadline | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    dispatch(fetchDeadlines());
  }, [dispatch]);

  // Stress test handler: generate 10,000 sample assignments
  const handleGenerate10k = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const sample10k = generateSampleDeadlines(10000);
      dispatch(setDeadlines(sample10k));
      setIsGenerating(false);
    }, 50);
  };

  const handleResetData = () => {
    dispatch(fetchDeadlines());
  };

  return (
    <div className="app-shell">
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div
          className="px-5 py-5 flex items-center gap-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
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
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Lab 2: Quản lý State & Tối ưu
            </p>
          </div>
        </div>

        <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <DeadlineStats />
        </div>

        <nav className="px-3 py-4 flex-1">
          <p
            className="text-[10px] font-semibold uppercase tracking-widest mb-2 px-2"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Bộ lọc & Ghim ({mounted ? pinnedIds.length : 0} đã ghim)
          </p>
          <DeadlineFilters direction="vertical">
            <DeadlineFilters.List>
              <DeadlineFilters.Item value="all" count={stats.total} icon={<LayoutGrid size={14} />}>
                Tất cả
              </DeadlineFilters.Item>
              <DeadlineFilters.Item
                value="pending"
                count={stats.pending}
                icon={<BookMarked size={14} />}
              >
                Chưa xong
              </DeadlineFilters.Item>
              <DeadlineFilters.Item
                value="overdue"
                count={stats.overdue}
                icon={<AlertTriangle size={14} />}
              >
                Quá hạn
              </DeadlineFilters.Item>
              <DeadlineFilters.Item
                value="completed"
                count={stats.completed}
                icon={<CheckCircle2 size={14} />}
              >
                Hoàn thành
              </DeadlineFilters.Item>
            </DeadlineFilters.List>
          </DeadlineFilters>

          {/* Sidebar Action for Statistics */}
          <div className="mt-4 px-2">
            <button
              type="button"
              onClick={() => setStatsOpen(true)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BarChart2 size={14} className="text-indigo-400" />
                <span>Thống kê chi tiết</span>
              </div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">
                Lazy
              </span>
            </button>
          </div>
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
                <p
                  className="text-xs font-semibold uppercase tracking-widest truncate"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {FILTER_LABELS[filter]}
                </p>
              </div>
            </div>

            {/* Top Toolbar: Stress Test Button, Stats Button, Add Button */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Stress Test 10,000 items button */}
              <button
                type="button"
                onClick={handleGenerate10k}
                disabled={isGenerating}
                data-testid="stress-test-btn"
                title="Tạo 10.000 bài tập mẫu để thực hiện stress test và đo hiệu năng"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20"
              >
                {isGenerating ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Zap size={14} className="text-amber-500 fill-amber-500" />
                )}
                <span className="hidden sm:inline">Tạo 10.000 bài tập</span>
                <span className="sm:hidden">10k Mẫu</span>
              </button>

              {/* Reset Data button if large dataset */}
              {stats.total > 50 && (
                <button
                  type="button"
                  onClick={handleResetData}
                  title="Khôi phục lại dữ liệu mặc định ban đầu"
                  className="p-2 rounded-xl text-xs font-semibold border bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-[var(--bg-elevated)] transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
              )}

              {/* View Statistics with Suspense / Lazy */}
              <button
                type="button"
                onClick={() => setStatsOpen(true)}
                title="Xem thống kê theo môn học và tiến độ hoàn thành"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-default)] hover:border-indigo-500/50 transition-all"
              >
                <BarChart2 size={14} className="text-indigo-500" />
                <span className="hidden md:inline">Thống kê</span>
              </button>

              {/* Add Deadline Button */}
              <button
                type="button"
                onClick={() => setAddOpen(true)}
                aria-label="Thêm deadline"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all"
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
                <DeadlineFilters.Item value="all" count={stats.total}>
                  Tất cả
                </DeadlineFilters.Item>
                <DeadlineFilters.Item value="pending" count={stats.pending}>
                  Chưa xong
                </DeadlineFilters.Item>
                <DeadlineFilters.Item value="overdue" count={stats.overdue}>
                  Quá hạn
                </DeadlineFilters.Item>
                <DeadlineFilters.Item value="completed" count={stats.completed}>
                  Hoàn thành
                </DeadlineFilters.Item>
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

        <footer
          className="px-6 py-4 border-t text-center"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            Student Deadline Tracker • Lab 2: Zustand, Advanced ThemeContext, Redux Logger,
            Performance & Jest Tests
          </p>
        </footer>
      </div>

      {/* Add Deadline Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Thêm deadline mới">
        <DeadlineForm onClose={() => setAddOpen(false)} />
      </Modal>

      {/* Edit Deadline Modal */}
      <Modal
        isOpen={editTarget !== null}
        onClose={() => setEditTarget(null)}
        title="Chỉnh sửa deadline"
      >
        {editTarget && (
          <DeadlineForm onClose={() => setEditTarget(null)} editTarget={editTarget} />
        )}
      </Modal>

      {/* Statistics Modal with React.lazy and Suspense */}
      <Modal
        isOpen={statsOpen}
        onClose={() => setStatsOpen(false)}
        title="Báo cáo & Thống kê tiến độ học tập"
      >
        <Suspense
          fallback={
            <div className="py-16 flex flex-col items-center justify-center gap-3">
              <Loader2 size={32} className="animate-spin text-indigo-500" />
              <p className="text-xs text-[var(--text-muted)]">Đang tải biểu đồ thống kê...</p>
            </div>
          }
        >
          <DeadlineStatisticsDashboard />
        </Suspense>
      </Modal>
    </div>
  );
}
