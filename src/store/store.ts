import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import deadlinesReducer from '@/features/deadlines/deadlinesSlice';
import { localStorageMiddleware } from './localStorageMiddleware';

export const store = configureStore({
  reducer: {
    deadlines: deadlinesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppStore    = typeof store;
export type RootState   = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, Action>;
