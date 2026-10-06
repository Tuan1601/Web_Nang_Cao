import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import deadlinesReducer from '../deadlinesSlice';
import { DeadlineCard, AssignmentCard } from '../components/DeadlineCard';
import { DeadlineForm } from '../components/DeadlineForm';
import { DeadlineStats, DeadlineStatsMobile } from '../components/DeadlineStats';
import { DeadlineFilters } from '../components/DeadlineFilters';
import DeadlineStatisticsDashboard from '../components/DeadlineStatisticsDashboard';
import { usePinStore } from '../store/usePinStore';
import type { Deadline } from '../types/deadline.types';

function renderWithStore(ui: React.ReactElement, initialItems: Deadline[] = []) {
  const store = configureStore({
    reducer: {
      deadlines: deadlinesReducer,
    },
    preloadedState: {
      deadlines: {
        items: initialItems,
        status: 'succeeded' as const,
        error: null,
        filter: 'all' as const,
      },
    },
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('Component Tests: AssignmentCard & DeadlineCard', () => {
  const mockDeadline: Deadline = {
    id: 'test-1',
    subject: 'Lập trình Web nâng cao',
    title: 'Nộp bài tập lớn Redux & Zustand',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'high',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    usePinStore.getState().clearPins();
  });

  it('renders assignment title, subject, priority badge, and formatted date properly', () => {
    renderWithStore(<DeadlineCard deadline={mockDeadline} />);

    expect(screen.getByText('Nộp bài tập lớn Redux & Zustand')).toBeInTheDocument();
    expect(screen.getByText('Lập trình Web nâng cao')).toBeInTheDocument();
    expect(screen.getByText('CAO')).toBeInTheDocument();
    expect(screen.getByText(/Còn \d+ ngày/i)).toBeInTheDocument();
  });

  it('handles clicking complete button and triggers onToggle callback', async () => {
    const user = userEvent.setup();
    const handleToggle = jest.fn();

    renderWithStore(<AssignmentCard deadline={mockDeadline} onToggle={handleToggle} />);

    const completeBtn = screen.getByTestId('toggle-complete-btn');
    expect(completeBtn).toHaveTextContent('Hoàn thành');

    await user.click(completeBtn);
    expect(handleToggle).toHaveBeenCalledWith('test-1');
  });

  it('handles clicking pin button and updates pin status in Zustand usePinStore', async () => {
    const user = userEvent.setup();

    renderWithStore(<DeadlineCard deadline={mockDeadline} />);

    const pinBtn = screen.getByTestId('toggle-pin-btn');
    expect(usePinStore.getState().isPinned('test-1')).toBe(false);

    await user.click(pinBtn);
    expect(usePinStore.getState().isPinned('test-1')).toBe(true);

    await user.click(pinBtn);
    expect(usePinStore.getState().isPinned('test-1')).toBe(false);
  });

  it('handles edit and delete actions', async () => {
    const user = userEvent.setup();
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();

    renderWithStore(
      <DeadlineCard
        deadline={mockDeadline}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );

    const editBtn = screen.getByTestId('edit-deadline-btn');
    await user.click(editBtn);
    expect(handleEdit).toHaveBeenCalledWith(mockDeadline);

    const deleteBtn = screen.getByTestId('delete-deadline-btn');
    await user.click(deleteBtn);

    expect(screen.getByText('Xóa deadline này?')).toBeInTheDocument();
    const confirmDeleteBtn = screen.getByTestId('confirm-delete-btn');
    await user.click(confirmDeleteBtn);
    expect(handleDelete).toHaveBeenCalledWith('test-1');
  });
});

describe('Component Tests: DeadlineForm (Validation & Submission)', () => {
  it('validates required fields and shows validation error messages on empty submit', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    renderWithStore(<DeadlineForm onClose={handleClose} />);

    const submitBtn = screen.getByRole('button', { name: /Thêm deadline/i });
    await user.click(submitBtn);

    expect(screen.getByText('Vui lòng nhập tên môn học')).toBeInTheDocument();
    expect(screen.getByText('Vui lòng nhập tên bài tập')).toBeInTheDocument();
    expect(screen.getByText('Vui lòng chọn hạn nộp')).toBeInTheDocument();
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('submits form successfully and dispatches addDeadline when valid input is filled', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    const { store } = renderWithStore(<DeadlineForm onClose={handleClose} />);

    const subjectInput = screen.getByPlaceholderText(/Ví dụ: Lập trình Web/i);
    const titleInput = screen.getByPlaceholderText(/Ví dụ: Xây dựng ứng dụng/i);
    const dateInput = document.getElementById('form-dueDate') as HTMLInputElement;

    await user.type(subjectInput, 'Cơ sở dữ liệu');
    await user.type(titleInput, 'Bài tập SQL Server');
    await user.type(dateInput, '2026-11-20');

    const submitBtn = screen.getByRole('button', { name: /Thêm deadline/i });
    await user.click(submitBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
    const state = store.getState().deadlines;
    expect(state.items).toHaveLength(1);
    expect(state.items[0].subject).toBe('Cơ sở dữ liệu');
    expect(state.items[0].title).toBe('Bài tập SQL Server');
  });
});

describe('Component Tests: DeadlineStats & DeadlineStatsMobile', () => {
  const sampleDeadlines: Deadline[] = [
    {
      id: '1',
      title: 'D1',
      subject: 'Math',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      priority: 'high',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'D2',
      subject: 'Math',
      dueDate: new Date(Date.now() - 86400000).toISOString(),
      priority: 'medium',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'D3',
      subject: 'Math',
      dueDate: new Date().toISOString(),
      priority: 'low',
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ];

  it('renders desktop and mobile statistics accurately', () => {
    renderWithStore(<DeadlineStats />, sampleDeadlines);
    expect(screen.getByText('Thống kê')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    renderWithStore(<DeadlineStatsMobile />, sampleDeadlines);
    expect(screen.getByText('Tổng')).toBeInTheDocument();
  });
});

describe('Component Tests: DeadlineFilters & DeadlineStatisticsDashboard', () => {
  const sampleDeadlines: Deadline[] = [
    {
      id: '1',
      title: 'D1',
      subject: 'Web',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      priority: 'high',
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'D2',
      subject: 'AI',
      dueDate: new Date(Date.now() - 86400000).toISOString(),
      priority: 'medium',
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ];

  it('renders DeadlineFilters and handles switching filter tabs', async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(
      <DeadlineFilters direction="horizontal">
        <DeadlineFilters.List>
          <DeadlineFilters.Item value="all">Tất cả</DeadlineFilters.Item>
          <DeadlineFilters.Item value="pending">Chờ</DeadlineFilters.Item>
          <DeadlineFilters.Item value="completed">Xong</DeadlineFilters.Item>
        </DeadlineFilters.List>
      </DeadlineFilters>,
      sampleDeadlines
    );

    const pendingTab = screen.getByRole('tab', { name: /Chờ/i });
    await user.click(pendingTab);
    expect(store.getState().deadlines.filter).toBe('pending');
  });

  it('renders DeadlineStatisticsDashboard with metrics and subject breakdown', () => {
    renderWithStore(<DeadlineStatisticsDashboard />, sampleDeadlines);

    expect(screen.getByText(/Tiến độ hoàn thành tổng thể/i)).toBeInTheDocument();
    expect(screen.getByText(/Phân bố theo độ ưu tiên/i)).toBeInTheDocument();
    expect(screen.getByText(/Web/i)).toBeInTheDocument();
    expect(screen.getByText(/AI/i)).toBeInTheDocument();
  });
});
