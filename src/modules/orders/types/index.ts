/**
 * index.ts – Barrel file cho types module.
 *
 * Mục đích: Export tất cả type từ một điểm duy nhất.
 *
 * Lợi ích:
 *   1. Import gọn hơn từ bên ngoài:
 *      import { Order, Customer, ApiResponse } from './types';
 *      thay vì:
 *      import { Order } from './types/order.types';
 *      import { Customer } from './types/customer.types';
 *
 *   2. Dễ refactor: nếu di chuyển file, chỉ cần sửa ở đây.
 *
 *   3. Phù hợp với pattern module của NestJS.
 */

export * from './common.types';
export * from './customer.types';
export * from './product.types';
export * from './order-item.types';
export * from './order.types';
