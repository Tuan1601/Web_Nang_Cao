import type { ProductPreview } from './product.types';

export interface OrderItem {
  id: string;
  productId: string;
  product: ProductPreview;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type CreateOrderItemDto = Pick<OrderItem, 'productId' | 'quantity'>;
