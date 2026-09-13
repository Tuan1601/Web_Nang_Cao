import { useState, useMemo } from 'react';

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentItems: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  next: () => void;
  prev: () => void;
  goToPage: (page: number) => void;
}

export function usePagination<T extends object>(
  items: T[],
  pageSize: number
): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo(
    () => Math.ceil(items.length / pageSize),
    [items.length, pageSize]
  );

  const currentItems = useMemo<T[]>(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }, [items, currentPage, pageSize]);

  function next(): void {
    setCurrentPage((prev) => (prev >= totalPages ? prev : prev + 1));
  }

  function prev(): void {
    setCurrentPage((prev) => (prev <= 1 ? prev : prev - 1));
  }

  function goToPage(page: number): void {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    next,
    prev,
    goToPage,
  };
}
