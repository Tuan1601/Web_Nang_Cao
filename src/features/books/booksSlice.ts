import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchBooksApi, type FetchBooksOptions } from '../../api/booksApi';
import { isApiSuccess, type Book, type BookId } from '../../types/book';

export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface BooksState {
  items: Book[];
  borrowedIds: BookId[];
  status: LoadingStatus;
  error: string | null;
  warning: string | null;
}

export const MAX_BORROW = 3;

export const initialState: BooksState = {
  items: [],
  borrowedIds: [],
  status: 'idle',
  error: null,
  warning: null,
};

export const fetchBooks = createAsyncThunk<
  Book[],
  Partial<FetchBooksOptions> | undefined,
  { state: { books: BooksState }; rejectValue: string }
>(
  'books/fetchBooks',
  async (options, { rejectWithValue }) => {
    const result = await fetchBooksApi(options);
    if (isApiSuccess(result)) {
      return result.data;
    }
    return rejectWithValue(result.error);
  },
  {
    condition: (_options, { getState }) => getState().books.status !== 'loading',
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<BookId>) {
      const book = state.items.find((b) => b.id === action.payload);
      if (!book || book.available <= 0 || state.borrowedIds.includes(book.id)) return;
      book.available -= 1;
      state.borrowedIds.push(book.id);
      state.warning = null;
    },
    returnBook(state, action: PayloadAction<BookId>) {
      const book = state.items.find((b) => b.id === action.payload);
      if (!book || !state.borrowedIds.includes(book.id)) return;
      book.available += 1;
      state.borrowedIds = state.borrowedIds.filter((id) => id !== book.id);
      state.warning = null;
    },
    setWarning(state, action: PayloadAction<string>) {
      state.warning = action.payload;
    },
    clearWarning(state) {
      state.warning = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.borrowedIds = [];
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Đã có lỗi xảy ra';
      });
  },
});

export const { borrowBook, returnBook, setWarning, clearWarning } = booksSlice.actions;
export default booksSlice.reducer;
