import { NextResponse } from 'next/server';
import type { Deadline } from '@/features/deadlines/types/deadline.types';
import type { ApiResponse } from '@/shared/types/api.types';

const now = new Date();
const addDays = (days: number): string => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(23, 59, 59, 0);
  return d.toISOString();
};

const MOCK_DEADLINES: Deadline[] = [
  {
    id: '1',
    subject: 'Lập trình Web nâng cao',
    title: 'Xây dựng ứng dụng Redux Toolkit',
    dueDate: addDays(5),
    priority: 'high',
    completed: false,
    createdAt: addDays(-7),
  },
  {
    id: '2',
    subject: 'Cơ sở dữ liệu',
    title: 'Thiết kế ERD và viết stored procedure',
    dueDate: addDays(1),
    priority: 'high',
    completed: false,
    createdAt: addDays(-10),
  },
  {
    id: '3',
    subject: 'Công nghệ phần mềm',
    title: 'Viết tài liệu SRS cho dự án nhóm',
    dueDate: addDays(0),
    priority: 'medium',
    completed: false,
    createdAt: addDays(-5),
  },
  {
    id: '4',
    subject: 'Trí tuệ nhân tạo',
    title: 'Cài đặt thuật toán A* và báo cáo',
    dueDate: addDays(-3),
    priority: 'medium',
    completed: false,
    createdAt: addDays(-14),
  },
  {
    id: '5',
    subject: 'Mạng máy tính',
    title: 'Mô phỏng mạng LAN bằng Packet Tracer',
    dueDate: addDays(-7),
    priority: 'low',
    completed: false,
    createdAt: addDays(-21),
  },
  {
    id: '6',
    subject: 'Phát triển ứng dụng di động',
    title: 'Bài tập Flutter – UI màn hình chính',
    dueDate: addDays(10),
    priority: 'medium',
    completed: true,
    createdAt: addDays(-3),
  },
  {
    id: '7',
    subject: 'Lập trình Web nâng cao',
    title: 'Bài tập TypeScript nâng cao – Generic & Utility Types',
    dueDate: addDays(14),
    priority: 'high',
    completed: true,
    createdAt: addDays(-7),
  },
  {
    id: '8',
    subject: 'Cơ sở dữ liệu',
    title: 'Lab 3 – Truy vấn SQL nâng cao',
    dueDate: addDays(7),
    priority: 'low',
    completed: false,
    createdAt: addDays(-2),
  },
];

export async function GET(): Promise<NextResponse<ApiResponse<Deadline[]>>> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const response: ApiResponse<Deadline[]> = {
    statusCode: 200,
    message: 'Lấy danh sách deadline thành công',
    data: MOCK_DEADLINES,
  };

  return NextResponse.json(response);
}
