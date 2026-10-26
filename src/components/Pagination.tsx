import { memo } from 'react';
import { getPageNumbers } from '../hooks/usePagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationBase({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Phân trang">
      <button
        type="button"
        id="page-prev"
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Trang trước"
      >
        ‹
      </button>

      {pages.map((p) =>
        typeof p === 'string' ? (
          <span key={p} className="page-dots">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            id={`page-${p}`}
            className={`page-btn ${p === currentPage ? 'page-btn--active' : ''}`}
            aria-current={p === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        id="page-next"
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Trang sau"
      >
        ›
      </button>
    </nav>
  );
}

export const Pagination = memo(PaginationBase);
