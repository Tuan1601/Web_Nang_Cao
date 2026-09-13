export enum ProductStatus {
  InStock = 'IN_STOCK',
  OutOfStock = 'OUT_OF_STOCK',
  Discontinued = 'DISCONTINUED',
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductDto = Omit<Product, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
export type UpdateProductDto = Partial<Pick<Product, 'name' | 'price' | 'stock' | 'status'>>;
export type ProductPreview = Pick<Product, 'id' | 'name' | 'price'>;
export type ProductCatalog = Record<string, ProductPreview>;
