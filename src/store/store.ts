import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit';
import deadlinesReducer from '@/features/deadlines/deadlinesSlice';
import { localStorageMiddleware } from './localStorageMiddleware';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    deadlines: deadlinesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware().concat(localStorageMiddleware);
    if (process.env.NODE_ENV !== 'production') {
      return middleware.concat(logger);
    }
    return middleware;
  },
});

export type AppStore    = typeof store;
export type RootState   = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<R = void> = ThunkAction<R, RootState, unknown, Action>;
