import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { CATEGORIES, type BookSummary, type CategoryStats } from '../../types/book';

export const selectBooks = (state: RootState) => state.books.items;
export const selectBorrowedIds = (state: RootState) => state.books.borrowedIds;
export const selectBooksStatus = (state: RootState) => state.books.status;
export const selectBooksError = (state: RootState) => state.books.error;
export const selectWarning = (state: RootState) => state.books.warning;

export const selectBorrowedBooks = createSelector(
  [selectBooks, selectBorrowedIds],
  (books, ids): BookSummary[] =>
    books
      .filter((b) => ids.includes(b.id))
      .map(({ id, title, author, coverImage }) => ({ id, title, author, coverImage })),
);

export const selectCategoryStats = createSelector([selectBooks], (books): CategoryStats => {
  const stats = Object.fromEntries(CATEGORIES.map((c) => [c, 0])) as CategoryStats;
  for (const book of books) stats[book.category] += 1;
  return stats;
});
