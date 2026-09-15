export type Priority = 'low' | 'medium' | 'high';

export type DeadlineStatus = 'all' | 'pending' | 'overdue' | 'completed';

export interface Deadline {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

export type CreateDeadlineInput = Omit<Deadline, 'id' | 'createdAt' | 'completed'>;

export type UpdateDeadlineInput = Partial<Pick<Deadline, 'title' | 'dueDate' | 'priority'>>;

export type DeadlineFormValues = {
  subject: string;
  title: string;
  dueDate: string;
  priority: Priority;
};

export type DeadlineFormErrors = Partial<Record<keyof DeadlineFormValues, string>>;

export interface DeadlineStatusInfo {
  label: string;
  daysRemaining: number | null;
  status: 'completed' | 'overdue' | 'today' | 'pending';
  isOverdue: boolean;
}

export interface DeadlineStats {
  total: number;
  pending: number;
  overdue: number;
  completed: number;
}
