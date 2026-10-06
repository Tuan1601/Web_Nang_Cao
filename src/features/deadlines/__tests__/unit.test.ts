import {
  getDaysRemaining,
  calcDaysLeft,
  isDeadlineOverdue,
  isOverdue,
  formatDeadlineDate,
  getDeadlineStatus,
  calcStats,
  calcSubjectStats,
  generateSampleDeadlines,
  isDeadline,
  isPriority,
} from '../utils/deadline.utils';
import deadlinesReducer, {
  addDeadline,
  toggleDeadline,
  deleteDeadline,
  updateDeadline,
  setFilter,
  setDeadlines,
  clearAllDeadlines,
  selectAllDeadlines,
  selectFilter,
  selectStatus,
  selectError,
  selectFilteredDeadlines,
  selectDeadlineStats,
  initialState,
} from '../deadlinesSlice';
import type { Deadline } from '../types/deadline.types';

describe('Unit Tests: deadline.utils', () => {
  const todayStr = new Date().toISOString();
  const futureDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
  const pastDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();

  describe('calcDaysLeft & getDaysRemaining', () => {
    it('calculates remaining days for future, today, and past dates', () => {
      expect(getDaysRemaining(todayStr)).toBe(0);
      expect(calcDaysLeft(todayStr)).toBe(0);
      expect(calcDaysLeft(futureDate)).toBeGreaterThanOrEqual(4);
      expect(calcDaysLeft(pastDate)).toBeLessThanOrEqual(-4);
    });
  });

  describe('isOverdue & isDeadlineOverdue', () => {
    it('returns true for past deadlines that are not completed', () => {
      expect(isOverdue(pastDate, false)).toBe(true);
      expect(isDeadlineOverdue({
        id: '1',
        title: 'Test',
        subject: 'Math',
        dueDate: pastDate,
        priority: 'high',
        completed: false,
        createdAt: pastDate,
      })).toBe(true);
    });

    it('returns false for completed deadlines even if past due', () => {
      expect(isOverdue(pastDate, true)).toBe(false);
      expect(isDeadlineOverdue({
        id: '1',
        title: 'Test',
        subject: 'Math',
        dueDate: pastDate,
        priority: 'high',
        completed: true,
        createdAt: pastDate,
      })).toBe(false);
    });

    it('returns false for future deadlines', () => {
      expect(isOverdue(futureDate, false)).toBe(false);
    });
  });

  describe('formatDeadlineDate & getDeadlineStatus', () => {
    it('formats ISO date to DD/MM/YYYY format correctly', () => {
      const formatted = formatDeadlineDate('2026-12-25T00:00:00.000Z');
      expect(formatted).toMatch(/25\/12\/2026/);
      expect(formatDeadlineDate('invalid-date')).toBe('N/A');
    });

    it('returns correct deadline status info for completed, overdue, today, and pending', () => {
      const completedStatus = getDeadlineStatus(pastDate, true);
      expect(completedStatus.status).toBe('completed');
      expect(completedStatus.isOverdue).toBe(false);

      const overdueStatus = getDeadlineStatus(pastDate, false);
      expect(overdueStatus.status).toBe('overdue');
      expect(overdueStatus.isOverdue).toBe(true);

      const todayStatus = getDeadlineStatus(todayStr, false);
      expect(todayStatus.status).toBe('today');

      const pendingStatus = getDeadlineStatus(futureDate, false);
      expect(pendingStatus.status).toBe('pending');
      expect(pendingStatus.isOverdue).toBe(false);
    });
  });

  describe('calcStats & calcSubjectStats (edge cases included)', () => {
    it('returns zero stats for empty list', () => {
      expect(calcStats([])).toEqual({
        total: 0,
        pending: 0,
        overdue: 0,
        completed: 0,
      });
    });

    it('correctly aggregates stats across multiple items', () => {
      const items: Deadline[] = [
        { id: '1', title: 'Task 1', subject: 'Web', dueDate: futureDate, priority: 'high', completed: false, createdAt: todayStr },
        { id: '2', title: 'Task 2', subject: 'Web', dueDate: pastDate, priority: 'medium', completed: false, createdAt: todayStr },
        { id: '3', title: 'Task 3', subject: 'DB', dueDate: pastDate, priority: 'low', completed: true, createdAt: todayStr },
      ];

      const stats = calcStats(items);
      expect(stats.total).toBe(3);
      expect(stats.pending).toBe(1);
      expect(stats.overdue).toBe(1);
      expect(stats.completed).toBe(1);

      const subjectStats = calcSubjectStats(items);
      expect(subjectStats).toHaveLength(2);
      expect(subjectStats[0].subject).toBe('Web');
      expect(subjectStats[0].total).toBe(2);
      expect(subjectStats[1].subject).toBe('DB');
      expect(subjectStats[1].completed).toBe(1);
    });
  });

  describe('generateSampleDeadlines (stress test helper)', () => {
    it('generates the specified number of valid deadline objects', () => {
      const count = 100;
      const samples = generateSampleDeadlines(count);
      expect(samples).toHaveLength(count);
      expect(isDeadline(samples[0])).toBe(true);
      expect(isPriority(samples[0].priority)).toBe(true);
    });
  });

  describe('isDeadline & isPriority type guards', () => {
    it('validates priority correctly', () => {
      expect(isPriority('low')).toBe(true);
      expect(isPriority('medium')).toBe(true);
      expect(isPriority('high')).toBe(true);
      expect(isPriority('urgent')).toBe(false);
      expect(isPriority(null)).toBe(false);
    });

    it('validates deadline objects correctly', () => {
      expect(isDeadline(null)).toBe(false);
      expect(isDeadline('string')).toBe(false);
      expect(isDeadline({ id: '1' })).toBe(false);
      expect(
        isDeadline({
          id: '1',
          subject: 'Math',
          title: 'Ex 1',
          dueDate: todayStr,
          priority: 'high',
          completed: false,
          createdAt: todayStr,
        })
      ).toBe(true);
    });
  });
});

describe('Unit Tests: deadlinesSlice Reducer & Selectors', () => {
  it('should return initial state when passed undefined', () => {
    expect(deadlinesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('handles addDeadline', () => {
    const prevState = { ...initialState, items: [] };
    const action = addDeadline({
      subject: 'React',
      title: 'Lab 2 Assignment',
      dueDate: '2026-10-10T00:00:00.000Z',
      priority: 'high',
    });
    const state = deadlinesReducer(prevState, action);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].title).toBe('Lab 2 Assignment');
    expect(state.items[0].completed).toBe(false);
  });

  it('handles toggleDeadline', () => {
    const prevState = {
      ...initialState,
      items: [
        {
          id: 'd-1',
          subject: 'AI',
          title: 'Project 1',
          dueDate: '2026-10-10T00:00:00.000Z',
          priority: 'medium' as const,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    // Toggle to true
    let state = deadlinesReducer(prevState, toggleDeadline('d-1'));
    expect(state.items[0].completed).toBe(true);

    // Toggle back to false
    state = deadlinesReducer(state, toggleDeadline('d-1'));
    expect(state.items[0].completed).toBe(false);

    // Edge case: toggle non-existent id
    const edgeState = deadlinesReducer(state, toggleDeadline('non-existent'));
    expect(edgeState.items).toEqual(state.items);
  });

  it('handles deleteDeadline', () => {
    const prevState = {
      ...initialState,
      items: [
        {
          id: 'd-1',
          subject: 'AI',
          title: 'Project 1',
          dueDate: '2026-10-10T00:00:00.000Z',
          priority: 'medium' as const,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    const state = deadlinesReducer(prevState, deleteDeadline('d-1'));
    expect(state.items).toHaveLength(0);

    // Edge case: delete from empty list or nonexistent id
    const edgeState = deadlinesReducer(state, deleteDeadline('non-existent'));
    expect(edgeState.items).toHaveLength(0);
  });

  it('handles updateDeadline', () => {
    const prevState = {
      ...initialState,
      items: [
        {
          id: 'd-1',
          subject: 'AI',
          title: 'Project 1',
          dueDate: '2026-10-10T00:00:00.000Z',
          priority: 'medium' as const,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    };

    const state = deadlinesReducer(
      prevState,
      updateDeadline({ id: 'd-1', title: 'Updated Title', priority: 'high' })
    );
    expect(state.items[0].title).toBe('Updated Title');
    expect(state.items[0].priority).toBe('high');

    // Edge case: update non-existent id
    const edgeState = deadlinesReducer(
      state,
      updateDeadline({ id: 'non-existent', title: 'Ghost' })
    );
    expect(edgeState.items[0].title).toBe('Updated Title');
  });

  it('handles setFilter, setDeadlines, and clearAllDeadlines', () => {
    let state = deadlinesReducer(initialState, setFilter('overdue'));
    expect(state.filter).toBe('overdue');

    const sampleData = generateSampleDeadlines(10);
    state = deadlinesReducer(state, setDeadlines(sampleData));
    expect(state.items).toHaveLength(10);
    expect(state.status).toBe('succeeded');

    state = deadlinesReducer(state, clearAllDeadlines());
    expect(state.items).toHaveLength(0);
  });

  describe('Selectors', () => {
    const futureDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
    const pastDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();

    const mockRootState = {
      deadlines: {
        items: [
          { id: '1', title: 'Task 1', subject: 'Web', dueDate: futureDate, priority: 'high' as const, completed: false, createdAt: futureDate },
          { id: '2', title: 'Task 2', subject: 'Web', dueDate: pastDate, priority: 'medium' as const, completed: false, createdAt: pastDate },
          { id: '3', title: 'Task 3', subject: 'DB', dueDate: pastDate, priority: 'low' as const, completed: true, createdAt: pastDate },
        ],
        status: 'succeeded' as const,
        error: null,
        filter: 'all' as const,
      },
    };

    it('selects basic state fields', () => {
      expect(selectAllDeadlines(mockRootState)).toHaveLength(3);
      expect(selectStatus(mockRootState)).toBe('succeeded');
      expect(selectError(mockRootState)).toBeNull();
      expect(selectFilter(mockRootState)).toBe('all');
    });

    it('selects filtered deadlines accurately based on filter status', () => {
      expect(selectFilteredDeadlines({ deadlines: { ...mockRootState.deadlines, filter: 'all' } })).toHaveLength(3);
      expect(selectFilteredDeadlines({ deadlines: { ...mockRootState.deadlines, filter: 'pending' } })).toHaveLength(1);
      expect(selectFilteredDeadlines({ deadlines: { ...mockRootState.deadlines, filter: 'overdue' } })).toHaveLength(1);
      expect(selectFilteredDeadlines({ deadlines: { ...mockRootState.deadlines, filter: 'completed' } })).toHaveLength(1);
    });

    it('selectDeadlineStats calculates summary stats accurately', () => {
      const stats = selectDeadlineStats(mockRootState);
      expect(stats.total).toBe(3);
      expect(stats.pending).toBe(1);
      expect(stats.overdue).toBe(1);
      expect(stats.completed).toBe(1);
    });
  });
});
