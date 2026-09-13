import type { CustomerPreview } from './customer.types';
import type { CreateOrderItemDto, OrderItem } from './order-item.types';

export enum OrderStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Shipping = 'SHIPPING',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED',
  Refunded = 'REFUNDED',
}

export interface Order {
  id: string;
  customerId: string;
  customer: CustomerPreview;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDto {
  customerId: string;
  items: CreateOrderItemDto[];
  note?: string;
}

export type UpdateOrderStatusDto = Pick<Order, 'status'>;
export type OrderSummary = Pick<Order, 'id' | 'customerId' | 'status' | 'totalAmount' | 'createdAt'>;
export type ReadonlyOrder = Readonly<Order>;
