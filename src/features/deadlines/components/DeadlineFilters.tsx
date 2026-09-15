'use client';

import React, { createContext, useContext, useCallback } from 'react';
import type { DeadlineStatus } from '@/features/deadlines/types/deadline.types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilter, selectFilter } from '@/features/deadlines/deadlinesSlice';

interface FiltersContextValue {
  currentFilter: DeadlineStatus;
  onFilterChange: (f: DeadlineStatus) => void;
  direction: 'horizontal' | 'vertical';
}

const FiltersContext = createContext<FiltersContextValue | null>(null);

function useFiltersCtx() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error('Must be inside DeadlineFilters');
  return ctx;
}

interface ListProps { children: React.ReactNode; direction?: 'horizontal' | 'vertical'; }

function FilterList({ children }: ListProps) {
  const { direction } = useFiltersCtx();
  return (
    <div
      role="tablist"
      aria-label="Bộ lọc"
      className={direction === 'vertical' ? 'flex flex-col gap-1' : 'flex flex-wrap gap-2'}
    >
      {children}
    </div>
  );
}

interface ItemProps { value: DeadlineStatus; children: React.ReactNode; count?: number; icon?: React.ReactNode; }

function FilterItem({ value, children, count, icon }: ItemProps) {
  const { currentFilter, onFilterChange, direction } = useFiltersCtx();
  const active = currentFilter === value;

  if (direction === 'vertical') {
    return (
      <button
        type="button"
        role="tab"
        aria-selected={active}
        onClick={() => onFilterChange(value)}
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
        style={
          active
            ? { background: 'var(--bg-sidebar-active)', color: 'var(--text-sidebar-active)' }
            : { color: 'var(--text-sidebar)' }
        }
        onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--bg-sidebar-hover)'; }}
        onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
      >
        <div className="flex items-center gap-2.5">
          {icon && <span className="opacity-70">{icon}</span>}
          <span>{children}</span>
        </div>
        {count !== undefined && (
          <span
            className="text-xs font-bold px-1.5 py-0.5 rounded-md tabular-nums"
            style={active
              ? { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }
              : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }
            }
          >{count}</span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onFilterChange(value)}
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-150 whitespace-nowrap"
      style={
        active
          ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 2px 8px var(--accent-ring)' }
          : { background: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1.5px solid var(--border-default)' }
      }
    >
      {children}
      {count !== undefined && (
        <span
          className="text-xs font-bold px-1.5 rounded-md tabular-nums"
          style={active
            ? { background: 'rgba(255,255,255,0.2)', color: '#fff' }
            : { background: 'var(--bg-elevated)', color: 'var(--text-muted)' }
          }
        >{count}</span>
      )}
    </button>
  );
}

interface RootProps { children: React.ReactNode; direction?: 'horizontal' | 'vertical'; }

function DeadlineFiltersRoot({ children, direction = 'horizontal' }: RootProps) {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter);
  const onFilterChange = useCallback(
    (f: DeadlineStatus) => dispatch(setFilter(f)),
    [dispatch]
  );
  return (
    <FiltersContext.Provider value={{ currentFilter, onFilterChange, direction }}>
      {children}
    </FiltersContext.Provider>
  );
}

export const DeadlineFilters = Object.assign(DeadlineFiltersRoot, {
  List: FilterList,
  Item: FilterItem,
});
