import { configureStore } from '@reduxjs/toolkit';
import booksReducer, { borrowBook, fetchBooks, MAX_BORROW } from './booksSlice';
import { borrowLimitMiddleware } from './borrowLimitMiddleware';
import type { Book } from '../../types/book';

const books: Book[] = Array.from({ length: 5 }, (_, i) => ({
  id: `b${i + 1}`,
  title: `Sách ${i + 1}`,
  author: 'Tác giả',
  category: 'CNTT',
  year: 2020,
  available: 2,
}));

function setupStore() {
  const store = configureStore({
    reducer: { books: booksReducer },
    middleware: (gDM) => gDM().concat(borrowLimitMiddleware),
  });
  store.dispatch(fetchBooks.fulfilled(books, 'req', undefined));
  return store;
}

describe('borrowLimitMiddleware', () => {
  it(`cho phép mượn tối đa ${MAX_BORROW} cuốn, chặn cuốn thứ ${MAX_BORROW + 1} và hiện cảnh báo`, () => {
    const store = setupStore();
    ['b1', 'b2', 'b3'].forEach((id) => store.dispatch(borrowBook(id)));
    expect(store.getState().books.borrowedIds).toHaveLength(3);
    expect(store.getState().books.warning).toBeNull();

    store.dispatch(borrowBook('b4'));

    const state = store.getState().books;
    expect(state.borrowedIds).toHaveLength(3);
    expect(state.items.find((b) => b.id === 'b4')?.available).toBe(2);
    expect(state.warning).toMatch(/tối đa 3 cuốn/);
  });
});
