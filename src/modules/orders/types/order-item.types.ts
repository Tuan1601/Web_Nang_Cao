// ==================== INTERFACE ====================

import { ProductPreview } from './product.types';

export interface OrderItem {
  id: string;
  productId: string;                // foreign key → Product.id
  product: ProductPreview;          // snapshot giá tại thời điểm đặt, không đổi khi Product thay đổi
  quantity: number;
  unitPrice: number;                // snapshot giá lúc mua (độc lập với Product.price hiện tại)
  subtotal: number;                 // = quantity × unitPrice
}

// ==================== UTILITY TYPES ====================

// Pick: client chỉ cần gửi 2 field, server tự tính unitPrice và subtotal
export type CreateOrderItemDto = Pick<OrderItem, 'productId' | 'quantity'>;
