import { useCallback, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Pagination } from '../components/Pagination';
import { selectBooks, selectBooksError, selectBooksStatus } from '../features/books/booksSelectors';
import { fetchBooks } from '../features/books/booksSlice';
import { BookList } from '../features/books/components/BookList';
import { BorrowedPanel } from '../features/books/components/BorrowedPanel';
import { FilterBar } from '../features/filters/components/FilterBar';
import { useFilterStore } from '../features/filters/filterStore';
import { useDebounce } from '../hooks/useDebounce';
import { usePagination } from '../hooks/usePagination';
import { normalizeText } from '../utils/normalizeText';

const PAGE_SIZE = 12;

export default function HomePage() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);

  const keyword = useFilterStore((s) => s.keyword);
  const category = useFilterStore((s) => s.category);
  const debouncedKeyword = useDebounce(keyword, 300);

  const filteredBooks = useMemo(() => {
    const q = normalizeText(debouncedKeyword);
    return books.filter((b) => {
      const matchCategory = category === 'all' || b.category === category;
      const matchKeyword = !q || normalizeText(b.title).includes(q) || normalizeText(b.author).includes(q);
      return matchCategory && matchKeyword;
    });
  }, [books, debouncedKeyword, category]);

  const page = useFilterStore((s) => s.page);
  const setPage = useFilterStore((s) => s.setPage);
  const { pageItems, currentPage, totalPages, totalItems, from, to } = usePagination(filteredBooks, page, PAGE_SIZE);

  const listTopRef = useRef<HTMLDivElement>(null);
  const handlePageChange = useCallback(
    (next: number) => {
      setPage(next);
      listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [setPage],
  );

  return (
    <div className="home">
      <section className="hero">
        <h1>
          Tra cứu &amp; mượn sách <span className="gradient-text">thư viện khoa</span>
        </h1>
        <p className="muted">Tìm nhanh sách chuyên ngành, xem số bản còn lại và quản lý những cuốn bạn đang mượn.</p>
      </section>

      <div className="layout">
        <section className="panel">
          <div ref={listTopRef} className="scroll-anchor" />
          <FilterBar />

          {status === 'loading' && (
            <div className="state" role="status">
              <span className="spinner" aria-hidden="true" />
              Đang tải...
            </div>
          )}

          {status === 'failed' && (
            <div className="state state--error" role="alert">
              <p>{error}</p>
              <button type="button" id="retry-btn" className="btn btn--primary" onClick={() => dispatch(fetchBooks())}>
                Thử lại
              </button>
            </div>
          )}

          {status === 'succeeded' && (
            <>
              <p className="result-count muted">
                {totalItems > 0
                  ? `Hiển thị ${from}–${to} trong ${totalItems} đầu sách`
                  : 'Tìm thấy 0 đầu sách'}
              </p>
              <BookList books={pageItems} />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}

          <div className="dev-tools">
            <button
              type="button"
              id="simulate-error-btn"
              className="link-btn"
              onClick={() => dispatch(fetchBooks({ shouldFail: true }))}
            >
              Giả lập lỗi API
            </button>
            <button type="button" id="reload-btn" className="link-btn" onClick={() => dispatch(fetchBooks())}>
              Tải lại dữ liệu
            </button>
          </div>
        </section>

        <BorrowedPanel />
      </div>
    </div>
  );
}
