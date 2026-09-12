// ==================== ORDER TYPES ====================
// Copy từ Buoi1

import type { CustomerPreview } from './customer.types';
import type { CreateOrderItemDto, OrderItem } from './order-item.types';


// ==================== ENUM ====================
// Lifecycle: PENDING → CONFIRMED → SHIPPING → DELIVERED
//            PENDING / CONFIRMED → CANCELLED
//            DELIVERED → REFUNDED
export enum OrderStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Shipping = 'SHIPPING',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED',
  Refunded = 'REFUNDED',
}

// ==================== INTERFACE ====================
export interface Order {
  id: string;
  customerId: string;        // foreign key → Customer.id
  customer: CustomerPreview; // snapshot thông tin khách
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;       // = sum(item.subtotal)
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== UTILITY TYPES ====================
// Interface riêng vì items khi tạo khác với Order.items
export interface CreateOrderDto {
  customerId: string;
  items: CreateOrderItemDto[];
  note?: string;
}

// Pick: cập nhật = chỉ đổi trạng thái
export type UpdateOrderStatusDto = Pick<Order, 'status'>;

// Pick: dùng cho list view – không cần items chi tiết
export type OrderSummary = Pick<Order, 'id' | 'customerId' | 'status' | 'totalAmount' | 'createdAt'>;

// Readonly: đơn hàng đã DELIVERED không được mutate
export type ReadonlyOrder = Readonly<Order>;
