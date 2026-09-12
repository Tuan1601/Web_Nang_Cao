// ==================== COMMON TYPES ====================
// Copy từ Buoi1 – Generic wrapper dùng chung cho toàn bộ module

// Generic constraint: T extends object để tránh truyền primitive vào data
export interface ApiResponse<T extends object> {
  statusCode: number;
  message: string;
  data: T | null; // null khi xảy ra lỗi
  timestamp: string;
}

// Tách riêng Paginated vì phân trang chỉ cần khi trả về danh sách
export interface Paginated<T extends object> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
