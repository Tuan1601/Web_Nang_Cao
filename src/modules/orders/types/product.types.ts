// ==================== ENUM ====================

export enum ProductStatus {
  InStock = 'IN_STOCK',
  OutOfStock = 'OUT_OF_STOCK',
  Discontinued = 'DISCONTINUED',
}

// ==================== INTERFACE ====================

export interface Product {
  id: string;
  name: string;
  price: number;  // đơn vị VNĐ
  stock: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== UTILITY TYPES ====================

// Omit: loại bỏ field server tự sinh khi tạo mới
export type CreateProductDto = Omit<Product, 'id' | 'status' | 'createdAt' | 'updatedAt'>;

// Partial<Pick<>>: chỉ cho phép sửa field hợp lệ, tất cả đều optional
export type UpdateProductDto = Partial<Pick<Product, 'name' | 'price' | 'stock' | 'status'>>;

// Pick: thông tin tóm tắt dùng khi nhúng vào OrderItem (snapshot giá lịch sử)
export type ProductPreview = Pick<Product, 'id' | 'name' | 'price'>;

// Record: lookup table tra cứu sản phẩm theo ID – type-safe, không cần any
export type ProductCatalog = Record<string, ProductPreview>;
