import reducer, {
  borrowBook,
  clearWarning,
  fetchBooks,
  initialState,
  returnBook,
  setWarning,
  type BooksState,
} from './booksSlice';
import type { Book } from '../../types/book';

const books: Book[] = [
  { id: 'b1', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, available: 2 },
  { id: 'b2', title: 'Kinh tế học', author: 'Mankiw', category: 'Kinh tế', year: 2018, available: 0 },
];

const loadedState = (overrides: Partial<BooksState> = {}): BooksState => ({
  ...initialState,
  status: 'succeeded',
  items: books.map((b) => ({ ...b })),
  ...overrides,
});

describe('booksSlice reducer', () => {
  it('trả về initial state khi action không xác định', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchBooks.pending: chuyển status sang loading và xoá lỗi cũ', () => {
    const state = reducer({ ...initialState, error: 'old' }, fetchBooks.pending('req1', undefined));
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('fetchBooks.fulfilled: lưu danh sách sách, status succeeded', () => {
    const state = reducer(
      { ...initialState, status: 'loading' },
      fetchBooks.fulfilled(books, 'req1', undefined),
    );
    expect(state.status).toBe('succeeded');
    expect(state.items).toHaveLength(2);
    expect(state.items[0].title).toBe('Clean Code');
  });

  it('fetchBooks.rejected: lưu thông báo lỗi, status failed', () => {
    const action = fetchBooks.rejected(null, 'req1', undefined, 'API lỗi');
    const state = reducer({ ...initialState, status: 'loading' }, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('API lỗi');
  });

  it('borrowBook: giảm số bản còn lại 1 và thêm vào danh sách đang mượn', () => {
    const state = reducer(loadedState(), borrowBook('b1'));
    expect(state.items.find((b) => b.id === 'b1')?.available).toBe(1);
    expect(state.borrowedIds).toEqual(['b1']);
  });

  it('borrowBook: không làm gì khi sách đã hết bản', () => {
    const before = loadedState();
    const state = reducer(before, borrowBook('b2'));
    expect(state.items.find((b) => b.id === 'b2')?.available).toBe(0);
    expect(state.borrowedIds).toEqual([]);
  });

  it('borrowBook: không mượn trùng 1 cuốn 2 lần', () => {
    const state = reducer(loadedState({ borrowedIds: ['b1'] }), borrowBook('b1'));
    expect(state.items.find((b) => b.id === 'b1')?.available).toBe(2);
    expect(state.borrowedIds).toEqual(['b1']);
  });

  it('returnBook: tăng số bản còn lại 1 và xoá khỏi danh sách đang mượn', () => {
    const afterBorrow = reducer(loadedState(), borrowBook('b1'));
    const state = reducer(afterBorrow, returnBook('b1'));
    expect(state.items.find((b) => b.id === 'b1')?.available).toBe(2);
    expect(state.borrowedIds).toEqual([]);
  });

  it('returnBook: bỏ qua nếu sách không nằm trong danh sách đang mượn', () => {
    const state = reducer(loadedState(), returnBook('b1'));
    expect(state.items.find((b) => b.id === 'b1')?.available).toBe(2);
  });

  it('setWarning / clearWarning: cập nhật cảnh báo', () => {
    const withWarning = reducer(initialState, setWarning('Quá giới hạn'));
    expect(withWarning.warning).toBe('Quá giới hạn');
    expect(reducer(withWarning, clearWarning()).warning).toBeNull();
  });
});
