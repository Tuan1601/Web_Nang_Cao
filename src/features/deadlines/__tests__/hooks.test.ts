import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../hooks/useDebounce';
import { useCountdown } from '../hooks/useCountdown';
import { useDeadlineStatus } from '../hooks/useDeadlineStatus';
import { useDeadlineForm } from '../hooks/useDeadlineForm';
import { usePinStore } from '../store/usePinStore';

describe('Hook Tests: useDebounce with fake timers', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns initial value immediately and only updates after specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial query', delay: 300 } }
    );

    expect(result.current).toBe('initial query');

    // Rerender with new value
    rerender({ value: 'updated query', delay: 300 });

    // Should still have old value before timer fires
    expect(result.current).toBe('initial query');

    // Advance by 150ms (not yet 300ms)
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('initial query');

    // Advance remaining 150ms
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('updated query');
  });

  it('cancels previous timer if value changes rapidly before delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 300 } }
    );

    rerender({ value: 'second', delay: 300 });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    rerender({ value: 'third', delay: 300 });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    // Total 300ms passed from start, but only 200ms from 'third' change
    expect(result.current).toBe('first');

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('third');
  });
});

describe('Hook Tests: useCountdown with fake timers', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('decrements seconds left every second and calls onComplete at 0', () => {
    const onComplete = jest.fn();
    const { result } = renderHook(() => useCountdown(3, onComplete));

    expect(result.current.secondsLeft).toBe(3);
    expect(result.current.isRunning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.secondsLeft).toBe(2);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.secondsLeft).toBe(0);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('supports pause, resume, and reset', () => {
    const { result } = renderHook(() => useCountdown(5));

    act(() => {
      result.current.pause();
    });
    expect(result.current.isRunning).toBe(false);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.secondsLeft).toBe(5); // Did not decrease

    act(() => {
      result.current.resume();
    });
    expect(result.current.isRunning).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.secondsLeft).toBe(4);

    act(() => {
      result.current.reset(10);
    });
    expect(result.current.secondsLeft).toBe(10);
  });
});

describe('Hook Tests: usePinStore (Zustand Pin State)', () => {
  beforeEach(() => {
    usePinStore.getState().clearPins();
  });

  it('manages pinned IDs, toggling pins, and checking isPinned', () => {
    const { result } = renderHook(() => usePinStore());

    expect(result.current.pinnedIds).toEqual([]);
    expect(result.current.isPinned('dl-100')).toBe(false);

    act(() => {
      result.current.togglePin('dl-100');
    });

    expect(result.current.pinnedIds).toContain('dl-100');
    expect(result.current.isPinned('dl-100')).toBe(true);

    act(() => {
      result.current.togglePin('dl-200');
    });
    expect(result.current.pinnedIds).toEqual(['dl-200', 'dl-100']);

    // Toggle off
    act(() => {
      result.current.togglePin('dl-100');
    });
    expect(result.current.pinnedIds).toEqual(['dl-200']);

    // Clear all
    act(() => {
      result.current.clearPins();
    });
    expect(result.current.pinnedIds).toEqual([]);
  });
});

describe('Hook Tests: useDeadlineStatus & useDeadlineForm', () => {
  it('useDeadlineStatus computes overdue, today, pending, completed status correctly', () => {
    const future = new Date(Date.now() + 86400000 * 2).toISOString();
    const past = new Date(Date.now() - 86400000 * 2).toISOString();

    const { result: r1 } = renderHook(() => useDeadlineStatus(future, false));
    expect(r1.current.status).toBe('pending');

    const { result: r2 } = renderHook(() => useDeadlineStatus(past, false));
    expect(r2.current.status).toBe('overdue');

    const { result: r3 } = renderHook(() => useDeadlineStatus(past, true));
    expect(r3.current.status).toBe('completed');
  });

  it('useDeadlineForm manages input changes and resetting form', () => {
    const { result } = renderHook(() => useDeadlineForm());

    act(() => {
      result.current.handleChange('subject', 'Nhập môn AI');
      result.current.handleChange('title', 'Assignment 1');
      result.current.handleChange('dueDate', '2026-12-01');
      result.current.handleChange('priority', 'high');
    });

    expect(result.current.values.subject).toBe('Nhập môn AI');
    expect(result.current.values.title).toBe('Assignment 1');

    act(() => {
      result.current.resetForm();
    });
    expect(result.current.values.subject).toBe('');
    expect(result.current.values.title).toBe('');
  });
});
