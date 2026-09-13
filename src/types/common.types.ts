export interface ApiResponse<T extends object> {
  statusCode: number;
  message: string;
  data: T | null;
  timestamp: string;
}

export interface Paginated<T extends object> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
