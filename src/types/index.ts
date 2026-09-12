// ==================== BARREL FILE ====================
// Export tất cả types từ một điểm duy nhất
// verbatimModuleSyntax: dùng export type * để re-export types
// → Vite biết đây là type-only exports, không cần runtime module

export type * from './common.types';
export type * from './customer.types';
export type * from './product.types';
export type * from './order-item.types';
export type * from './order.types';

// Enum là giá trị runtime → phải export thường (không phải export type)
export { CustomerStatus } from './customer.types';
export { ProductStatus } from './product.types';
export { OrderStatus } from './order.types';
