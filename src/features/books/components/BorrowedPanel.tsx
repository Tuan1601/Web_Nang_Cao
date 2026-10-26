import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { BookId } from '../../../types/book';
import { selectBorrowedBooks } from '../booksSelectors';
import { MAX_BORROW, returnBook } from '../booksSlice';

export function BorrowedPanel() {
  const dispatch = useAppDispatch();
  const borrowed = useAppSelector(selectBorrowedBooks);
  const handleReturn = useCallback((id: BookId) => dispatch(returnBook(id)), [dispatch]);

  return (
    <aside className="panel borrowed">
      <div className="borrowed__head">
        <h2>Sách đang mượn</h2>
        <span className="borrowed__count">
          {borrowed.length}/{MAX_BORROW}
        </span>
      </div>
      <div className="progress">
        <div className="progress__bar" style={{ width: `${(borrowed.length / MAX_BORROW) * 100}%` }} />
      </div>

      {borrowed.length === 0 ? (
        <p className="muted">Bạn chưa mượn cuốn nào.</p>
      ) : (
        <ul className="borrowed__list">
          {borrowed.map((b) => (
            <li key={b.id} className="borrowed__item">
              {b.coverImage && (
                <img
                  src={b.coverImage}
                  alt={`Bìa ${b.title}`}
                  className="borrowed__thumb"
                  loading="lazy"
                />
              )}
              <div className="borrowed__info">
                <strong>{b.title}</strong>
                <span className="muted">{b.author}</span>
              </div>
              <button type="button" id={`panel-return-${b.id}`} className="btn btn--ghost btn--sm" onClick={() => handleReturn(b.id)}>
                Trả
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
