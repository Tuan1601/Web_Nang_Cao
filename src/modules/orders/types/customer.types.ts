// ==================== ENUM ====================

// String enum: dễ đọc khi log/debug, dễ serialize JSON
export enum CustomerStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Banned = 'BANNED',
}

// ==================== INTERFACE ====================

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;  // có thể chưa điền khi đăng ký
  address: string | null;
  status: CustomerStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== UTILITY TYPES ====================

// Omit: loại bỏ field server tự sinh khi tạo mới
export type CreateCustomerDto = Omit<Customer, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

// Partial<Pick<>>: chỉ cho phép sửa field hợp lệ, tất cả đều optional
export type UpdateCustomerDto = Partial<Pick<Customer, 'name' | 'phone' | 'address' | 'status'>>;

// Pick: lấy đúng field cần thiết cho UI danh sách / dropdown
export type CustomerPreview = Pick<Customer, 'id' | 'name' | 'email' | 'status'>;
