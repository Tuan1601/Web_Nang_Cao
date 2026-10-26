import { useAppSelector } from '../../app/hooks';
import { CATEGORIES } from '../../types/book';
import { selectBooks, selectBooksStatus, selectBorrowedIds, selectCategoryStats } from '../books/booksSelectors';
import { MAX_BORROW } from '../books/booksSlice';

export default function StatsPage() {
  const stats = useAppSelector(selectCategoryStats);
  const books = useAppSelector(selectBooks);
  const borrowedCount = useAppSelector(selectBorrowedIds).length;
  const status = useAppSelector(selectBooksStatus);

  const total = books.length;
  const max = Math.max(1, ...CATEGORIES.map((c) => stats[c]));

  if (status === 'loading') {
    return (
      <div className="state" role="status">
        <span className="spinner" aria-hidden="true" />
        Đang tải...
      </div>
    );
  }

  return (
    <div className="stats">
      <section className="hero">
        <h1>
          <span className="gradient-text">Thống kê</span> thư viện
        </h1>
        <p className="muted">Tổng quan số đầu sách theo thể loại và tình trạng mượn của bạn.</p>
      </section>

      <div className="stat-cards">
        <div className="stat-card">
          <span className="stat-card__label">Tổng đầu sách</span>
          <strong className="stat-card__value" data-testid="stat-total">{total}</strong>
        </div>
        <div className="stat-card stat-card--accent">
          <span className="stat-card__label">Đang mượn</span>
          <strong className="stat-card__value" data-testid="stat-borrowed">
            {borrowedCount}
            <small>/{MAX_BORROW}</small>
          </strong>
        </div>
        {CATEGORIES.map((c) => (
          <div className="stat-card" key={c}>
            <span className="stat-card__label">{c}</span>
            <strong className="stat-card__value">{stats[c]}</strong>
          </div>
        ))}
      </div>

      <section className="panel">
        <h2>Số đầu sách theo thể loại</h2>
        <div className="bars">
          {CATEGORIES.map((c) => (
            <div className="bar-row" key={c}>
              <span className="bar-row__label">{c}</span>
              <div className="bar-row__track">
                <div className="bar-row__fill" style={{ width: `${(stats[c] / max) * 100}%` }} />
              </div>
              <span className="bar-row__value">{stats[c]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
