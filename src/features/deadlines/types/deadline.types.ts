// BUỔI 1: Type System – Union Types, Interface, Utility Types

// Union type cho độ ưu tiên
export type Priority = 'low' | 'medium' | 'high';

// Union type cho trạng thái filter
export type DeadlineStatus = 'all' | 'pending' | 'overdue' | 'completed';

// Interface chính cho một deadline
export interface Deadline {
  id: string;
  subject: string;
  title: string;
  dueDate: string; // ISO 8601: "2026-09-20T23:59:59.000Z"
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

// BUỔI 1: Utility Types – Omit
// Khi tạo deadline mới, người dùng không cần cung cấp id, createdAt, completed
// vì những field này được tự động sinh ra phía server/store.
export type CreateDeadlineInput = Omit<Deadline, 'id' | 'createdAt' | 'completed'>;

// BUỔI 1: Utility Types – Partial + Pick
// Khi cập nhật, chỉ cho phép sửa một số field nhất định, và không bắt buộc phải sửa tất cả.
export type UpdateDeadlineInput = Partial<Pick<Deadline, 'title' | 'dueDate' | 'priority'>>;

// Type cho form values (sử dụng trong useDeadlineForm)
export type DeadlineFormValues = {
  subject: string;
  title: string;
  dueDate: string;
  priority: Priority;
};

// Type cho validation errors của form
export type DeadlineFormErrors = Partial<Record<keyof DeadlineFormValues, string>>;

// Type cho trạng thái computed của một deadline (dùng trong useDeadlineStatus)
export interface DeadlineStatusInfo {
  label: string;
  daysRemaining: number | null;
  status: 'completed' | 'overdue' | 'today' | 'pending';
  isOverdue: boolean;
}

// Type cho thống kê dashboard
export interface DeadlineStats {
  total: number;
  pending: number;
  overdue: number;
  completed: number;
}
