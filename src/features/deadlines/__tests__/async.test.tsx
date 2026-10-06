import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import deadlinesReducer, { fetchDeadlines } from '../deadlinesSlice';
import { DeadlineList } from '../components/DeadlineList';
import type { Deadline } from '../types/deadline.types';

function createMockStore(status: 'idle' | 'loading' | 'succeeded' | 'failed', items: Deadline[] = [], error: string | null = null) {
  return configureStore({
    reducer: {
      deadlines: deadlinesReducer,
    },
    preloadedState: {
      deadlines: {
        items,
        status,
        error,
        filter: 'all' as const,
      },
    },
  });
}

describe('Async Tests: DeadlineList with API State & Mocking', () => {
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('displays loading skeleton state when status is loading', () => {
    const store = createMockStore('loading', []);
    render(
      <Provider store={store}>
        <DeadlineList onEdit={mockOnEdit} />
      </Provider>
    );

    // Skeletons are rendered during loading state
    const skeletons = document.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('displays list of deadlines when fetch succeeds', () => {
    const items: Deadline[] = [
      {
        id: '101',
        title: 'Async Loaded Assignment 1',
        subject: 'Mạng máy tính',
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        priority: 'high',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '102',
        title: 'Async Loaded Assignment 2',
        subject: 'Hệ điều hành',
        dueDate: new Date(Date.now() + 172800000).toISOString(),
        priority: 'medium',
        completed: true,
        createdAt: new Date().toISOString(),
      },
    ];

    const store = createMockStore('succeeded', items);
    render(
      <Provider store={store}>
        <DeadlineList onEdit={mockOnEdit} />
      </Provider>
    );

    expect(screen.getByText('Async Loaded Assignment 1')).toBeInTheDocument();
    expect(screen.getByText('Async Loaded Assignment 2')).toBeInTheDocument();
    expect(screen.getByText('Mạng máy tính')).toBeInTheDocument();
  });

  it('displays error message and retry button when status is failed', async () => {
    const user = userEvent.setup();
    const store = createMockStore('failed', [], 'Network connection failed: 500');

    render(
      <Provider store={store}>
        <DeadlineList onEdit={mockOnEdit} />
      </Provider>
    );

    expect(screen.getByText('Không tải được dữ liệu')).toBeInTheDocument();
    expect(screen.getByText('Network connection failed: 500')).toBeInTheDocument();

    const retryBtn = screen.getByRole('button', { name: /Thử lại/i });
    expect(retryBtn).toBeInTheDocument();

    await user.click(retryBtn);
  });

  it('handles fetchDeadlines thunk success and rejected states with fetch mock', async () => {
    const mockData: Deadline[] = [
      {
        id: 'fetch-1',
        title: 'Fetched Title',
        subject: 'Web Dev',
        dueDate: new Date().toISOString(),
        priority: 'low',
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ];

    // Mock global fetch for success
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true, data: mockData }),
    } as Response);

    const store = configureStore({
      reducer: { deadlines: deadlinesReducer },
    });

    await store.dispatch(fetchDeadlines());
    expect(store.getState().deadlines.status).toBe('succeeded');
    expect(store.getState().deadlines.items).toHaveLength(1);
    expect(store.getState().deadlines.items[0].title).toBe('Fetched Title');

    // Mock global fetch for error
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const errorStore = configureStore({
      reducer: { deadlines: deadlinesReducer },
    });

    await errorStore.dispatch(fetchDeadlines());
    expect(errorStore.getState().deadlines.status).toBe('failed');
    expect(errorStore.getState().deadlines.error).toContain('HTTP 500');
  });
});
