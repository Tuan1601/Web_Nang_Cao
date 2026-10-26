import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { Book, BookId } from '../../../types/book';
import { selectBorrowedIds } from '../booksSelectors';
import { borrowBook, returnBook } from '../booksSlice';
import { BookItem } from './BookItem';

interface BookListProps {
  books: Book[];
}

export function BookList({ books }: BookListProps) {
  const dispatch = useAppDispatch();
  const borrowedIds = useAppSelector(selectBorrowedIds);

  const handleBorrow = useCallback((id: BookId) => dispatch(borrowBook(id)), [dispatch]);
  const handleReturn = useCallback((id: BookId) => dispatch(returnBook(id)), [dispatch]);

  if (books.length === 0) {
    return <p className="empty">Không tìm thấy sách phù hợp.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          isBorrowed={borrowedIds.includes(book.id)}
          onBorrow={handleBorrow}
          onReturn={handleReturn}
        />
      ))}
    </div>
  );
}
