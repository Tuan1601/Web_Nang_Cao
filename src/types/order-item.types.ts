// ==================== ORDER ITEM TYPES ====================
// Copy từ Buoi1

import type { ProductPreview } from './product.types';


export interface OrderItem {
  id: string;
  productId: string;       // foreign key → Product.id
  product: ProductPreview; // snapshot giá tại thời điểm đặt
  quantity: number;
  unitPrice: number;       // snapshot giá lúc mua
  subtotal: number;        // = quantity × unitPrice
}

// ==================== UTILITY TYPES ====================
// Pick: client chỉ cần gửi 2 field, server tự tính unitPrice và subtotal
export type CreateOrderItemDto = Pick<OrderItem, 'productId' | 'quantity'>;
