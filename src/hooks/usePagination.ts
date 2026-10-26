import { useMemo } from 'react';

export interface PaginationResult<T> {
  pageItems: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  from: number;
  to: number;
}

export function paginate<T>(items: readonly T[], page: number, pageSize: number): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return {
    pageItems,
    currentPage,
    totalPages,
    totalItems,
    from: totalItems === 0 ? 0 : start + 1,
    to: start + pageItems.length,
  };
}

export function usePagination<T>(items: readonly T[], page: number, pageSize: number): PaginationResult<T> {
  return useMemo(() => paginate(items, page, pageSize), [items, page, pageSize]);
}

export type PageToken = number | 'dots-left' | 'dots-right';

export function getPageNumbers(current: number, total: number, siblings = 1): PageToken[] {
  if (total <= 5 + siblings * 2) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);
  const pages: PageToken[] = [1];
  if (left > 2) pages.push('dots-left');
  for (let p = left; p <= right; p++) pages.push(p);
  if (right < total - 1) pages.push('dots-right');
  pages.push(total);
  return pages;
}
