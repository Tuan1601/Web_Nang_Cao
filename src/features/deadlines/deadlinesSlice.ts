import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { Deadline, DeadlineStatus, CreateDeadlineInput } from './types/deadline.types';
import type { ApiResponse } from '@/shared/types/api.types';
import { isDeadline, getDaysRemaining, calcStats } from './utils/deadline.utils';
import { STORAGE_KEY } from '@/store/localStorageMiddleware';

export interface DeadlinesState {
  items: Deadline[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filter: DeadlineStatus;
}

export const initialState: DeadlinesState = {
  items: [],
  status: 'idle',
  error: null,
  filter: 'all',
};

export const fetchDeadlines = createAsyncThunk<Deadline[], void>(
  'deadlines/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (saved) {
        const parsed: unknown[] = JSON.parse(saved);
        const valid = parsed.filter(isDeadline);
        if (valid.length > 0) return valid;
      }

      const response = await fetch('/api/deadlines');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const json: ApiResponse<Deadline[]> = await response.json();
      const validDeadlines = json.data.filter(isDeadline);

      return validDeadlines;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Lỗi không xác định');
    }
  }
);

export const deadlinesSlice = createSlice({
  name: 'deadlines',
  initialState,
  reducers: {
    addDeadline(state, action: PayloadAction<CreateDeadlineInput>) {
      const newDeadline: Deadline = {
        ...action.payload,
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.items.unshift(newDeadline);
    },

    toggleDeadline(state, action: PayloadAction<string>) {
      const item = state.items.find((d) => d.id === action.payload);
      if (item) item.completed = !item.completed;
    },

    deleteDeadline(state, action: PayloadAction<string>) {
      state.items = state.items.filter((d) => d.id !== action.payload);
    },

    updateDeadline(state, action: PayloadAction<Partial<Deadline> & { id: string }>) {
      const idx = state.items.findIndex((d) => d.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload };
      }
    },

    setFilter(state, action: PayloadAction<DeadlineStatus>) {
      state.filter = action.payload;
    },

    setDeadlines(state, action: PayloadAction<Deadline[]>) {
      state.items = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },

    clearAllDeadlines(state) {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDeadlines.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDeadlines.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchDeadlines.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) ?? 'Lỗi tải dữ liệu';
      });
  },
});

export const {
  addDeadline,
  toggleDeadline,
  deleteDeadline,
  updateDeadline,
  setFilter,
  setDeadlines,
  clearAllDeadlines,
} = deadlinesSlice.actions;

export interface StateWithDeadlines {
  deadlines: DeadlinesState;
}

export const selectAllDeadlines = (state: StateWithDeadlines) => state.deadlines.items;
export const selectFilter = (state: StateWithDeadlines) => state.deadlines.filter;
export const selectStatus = (state: StateWithDeadlines) => state.deadlines.status;
export const selectError = (state: StateWithDeadlines) => state.deadlines.error;

export const selectFilteredDeadlines = createSelector(
  [selectAllDeadlines, selectFilter],
  (items, filter) => {
    switch (filter) {
      case 'pending':
        return items.filter((d: Deadline) => !d.completed && getDaysRemaining(d.dueDate) >= 0);
      case 'overdue':
        return items.filter((d: Deadline) => !d.completed && getDaysRemaining(d.dueDate) < 0);
      case 'completed':
        return items.filter((d: Deadline) => d.completed);
      default:
        return items;
    }
  }
);

export const selectDeadlineStats = createSelector(
  [selectAllDeadlines],
  (items) => calcStats(items)
);

export default deadlinesSlice.reducer;
