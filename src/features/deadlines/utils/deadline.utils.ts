import type { Deadline, DeadlineStatusInfo, Priority } from '../types/deadline.types';

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isDeadline(value: unknown): value is Deadline {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.subject === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.dueDate === 'string' &&
    typeof obj.completed === 'boolean' &&
    typeof obj.createdAt === 'string' &&
    isPriority(obj.priority)
  );
}

function isPriority(value: unknown): value is Priority {
  return value === 'low' || value === 'medium' || value === 'high';
}

export function getDaysRemaining(dueDate: string): number {
  const today = normalizeDate(new Date());
  const due = normalizeDate(new Date(dueDate));
  const diffMs = due.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function isDeadlineOverdue(deadline: Deadline): boolean {
  if (deadline.completed) return false;
  return getDaysRemaining(deadline.dueDate) < 0;
}

export function formatDeadlineDate(dueDate: string): string {
  const date = new Date(dueDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getDeadlineStatus(dueDate: string, completed: boolean): DeadlineStatusInfo {
  if (completed) {
    return {
      label: 'Đã hoàn thành',
      daysRemaining: null,
      status: 'completed',
      isOverdue: false,
    };
  }

  const days = getDaysRemaining(dueDate);

  if (days < 0) {
    return {
      label: `Quá hạn ${Math.abs(days)} ngày`,
      daysRemaining: days,
      status: 'overdue',
      isOverdue: true,
    };
  }

  if (days === 0) {
    return {
      label: 'Hạn hôm nay',
      daysRemaining: 0,
      status: 'today',
      isOverdue: false,
    };
  }

  return {
    label: `Còn ${days} ngày`,
    daysRemaining: days,
    status: 'pending',
    isOverdue: false,
  };
}
