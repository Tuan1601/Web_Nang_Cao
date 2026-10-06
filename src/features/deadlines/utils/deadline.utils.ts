import type { Deadline, DeadlineStatusInfo, Priority, DeadlineStats } from '../types/deadline.types';

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isPriority(value: unknown): value is Priority {
  return value === 'low' || value === 'medium' || value === 'high';
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

export function getDaysRemaining(dueDate: string): number {
  const today = normalizeDate(new Date());
  const due = normalizeDate(new Date(dueDate));
  const diffMs = due.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/** Alias for getDaysRemaining to satisfy test specs */
export const calcDaysLeft = getDaysRemaining;

export function isDeadlineOverdue(deadline: Deadline): boolean {
  if (deadline.completed) return false;
  return getDaysRemaining(deadline.dueDate) < 0;
}

/** Function checking if a due date is overdue */
export function isOverdue(dueDate: string, completed: boolean = false): boolean {
  if (completed) return false;
  return getDaysRemaining(dueDate) < 0;
}

export function formatDeadlineDate(dueDate: string): string {
  const date = new Date(dueDate);
  if (isNaN(date.getTime())) return 'N/A';
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

/** Calculate overall stats for deadlines */
export function calcStats(items: Deadline[]): DeadlineStats {
  if (!items || items.length === 0) {
    return { total: 0, pending: 0, overdue: 0, completed: 0 };
  }
  let pending = 0;
  let overdue = 0;
  let completed = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.completed) {
      completed++;
    } else if (getDaysRemaining(item.dueDate) < 0) {
      overdue++;
    } else {
      pending++;
    }
  }

  return {
    total: items.length,
    pending,
    overdue,
    completed,
  };
}

export interface SubjectStat {
  subject: string;
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}

/** Calculate stats grouped by subject */
export function calcSubjectStats(items: Deadline[]): SubjectStat[] {
  const map: Record<string, SubjectStat> = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const sub = item.subject || 'Khác';
    if (!map[sub]) {
      map[sub] = { subject: sub, total: 0, completed: 0, pending: 0, overdue: 0 };
    }
    map[sub].total++;
    if (item.completed) {
      map[sub].completed++;
    } else if (getDaysRemaining(item.dueDate) < 0) {
      map[sub].overdue++;
    } else {
      map[sub].pending++;
    }
  }

  return Object.values(map).sort((a, b) => b.total - a.total);
}

const SAMPLE_SUBJECTS = [
  'Lập trình Web nâng cao',
  'Cơ sở dữ liệu nâng cao',
  'Kiến trúc phần mềm',
  'Trí tuệ nhân tạo',
  'An toàn thông tin',
  'Hệ điều hành',
  'Phát triển ứng dụng di động',
  'Mạng máy tính',
  'Thiết kế giao diện UI/UX',
  'Điện toán đám mây',
];

const SAMPLE_TITLES = [
  'Xây dựng Redux Toolkit & Zustand State Management',
  'Tối ưu hoá hiệu năng với Virtualization và Memo',
  'Thiết kế Schema cơ sở dữ liệu PostgreSQL',
  'Huấn luyện mô hình phân loại với PyTorch',
  'Triển khai OAuth 2.0 & JWT Authentication',
  'Xây dựng RESTful API và GraphQL endpoint',
  'Viết Unit Test & Component Test với Jest RTL',
  'Thiết lập CI/CD pipeline với GitHub Actions',
  'Viết báo cáo phân tích kiến trúc Microservices',
  'Thiết kế prototype Figma ứng dụng quản lý học tập',
  'Thực hành lập trình Socket mạng máy tính',
  'Tối ưu hóa truy vấn SQL và Indexing',
];

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

/** Generate sample deadlines for stress testing (e.g., 10,000 items) */
export function generateSampleDeadlines(count: number = 10000): Deadline[] {
  const result: Deadline[] = new Array(count);
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  for (let i = 0; i < count; i++) {
    const subject = SAMPLE_SUBJECTS[i % SAMPLE_SUBJECTS.length];
    const titleTemplate = SAMPLE_TITLES[i % SAMPLE_TITLES.length];
    const title = `${titleTemplate} #${i + 1}`;
    
    // Distribute due dates: -15 days to +30 days
    const dayOffset = (i % 45) - 15;
    const dueDate = new Date(now + dayOffset * oneDayMs).toISOString();
    const priority = PRIORITIES[i % PRIORITIES.length];
    const completed = i % 5 === 0; // 20% completed

    result[i] = {
      id: `sample-${i + 1}`,
      subject,
      title,
      dueDate,
      priority,
      completed,
      createdAt: new Date(now - (i % 30) * oneDayMs).toISOString(),
    };
  }

  return result;
}
