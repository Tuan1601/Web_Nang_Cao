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

import { CustomerPreview } from './customer.types';
import { CreateOrderItemDto, OrderItem } from './order-item.types';

export interface Order {
  id: string;
  customerId: string;               // foreign key → Customer.id
  customer: CustomerPreview;        // snapshot thông tin khách, không cần full Customer
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;              // = sum(item.subtotal), lưu sẵn để tránh tính lại
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== UTILITY TYPES ====================

// Interface riêng vì items khi tạo (CreateOrderItemDto[]) khác với Order.items (OrderItem[])
export interface CreateOrderDto {
  customerId: string;
  items: CreateOrderItemDto[];
  note?: string;
}

// Pick: cập nhật đơn hàng = chỉ đổi trạng thái, không cho sửa items hay totalAmount
export type UpdateOrderStatusDto = Pick<Order, 'status'>;

// Pick: dùng cho list view – không cần items chi tiết tránh payload nặng
export type OrderSummary = Pick<Order, 'id' | 'customerId' | 'status' | 'totalAmount' | 'createdAt'>;

// Readonly: đơn hàng đã DELIVERED không được mutate (dùng khi tạo invoice, gửi email)
export type ReadonlyOrder = Readonly<Order>;
