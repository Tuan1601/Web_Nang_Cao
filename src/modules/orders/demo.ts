// ==================== DEMO ====================
// Chứng minh type system hoạt động: compile được, không có any, không có @ts-ignore
// Chạy: npx ts-node src/modules/orders/demo.ts

import {
  ApiResponse, Paginated,
  Customer, CustomerStatus, CustomerPreview, CreateCustomerDto, UpdateCustomerDto,
  Product, ProductStatus, ProductPreview, ProductCatalog, CreateProductDto, UpdateProductDto,
  OrderItem, CreateOrderItemDto,
  Order, OrderStatus, OrderSummary, ReadonlyOrder, CreateOrderDto, UpdateOrderStatusDto,
} from './types';

// ==================== 1. CUSTOMER ====================

const customer: Customer = {
  id: 'cust-001',
  name: 'Nguyễn Văn An',
  email: 'an.nguyen@email.com',
  phone: '0901234567',
  address: '123 Đường Láng, Đống Đa, Hà Nội',
  status: CustomerStatus.Active,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-06-10'),
};

// Omit<Customer, 'id' | 'status' | 'createdAt' | 'updatedAt'>
const createCustomerPayload: CreateCustomerDto = {
  name: 'Trần Thị Bình',
  email: 'binh.tran@email.com',
  phone: '0912345678',
  address: '456 Lê Văn Sỹ, Quận 3, TP.HCM',
};

// Partial<Pick<Customer, 'name' | 'phone' | 'address' | 'status'>> – chỉ gửi field muốn đổi
const updateCustomerPayload: UpdateCustomerDto = { phone: '0999888777' };

// Pick<Customer, 'id' | 'name' | 'email' | 'status'>
const customerPreview: CustomerPreview = {
  id: customer.id,
  name: customer.name,
  email: customer.email,
  status: customer.status,
};

console.log('Customer:', customer.name, '|', customer.status);
console.log('CreateCustomerDto:', createCustomerPayload.email);
console.log('UpdateCustomerDto:', updateCustomerPayload);

// ==================== 2. PRODUCT ====================

const product1: Product = {
  id: 'prod-001',
  name: 'Laptop Dell XPS 15',
  price: 32_000_000,
  stock: 50,
  status: ProductStatus.InStock,
  createdAt: new Date('2024-02-01'),
  updatedAt: new Date('2024-07-01'),
};

const product2: Product = {
  id: 'prod-002',
  name: 'Chuột Logitech MX Master 3',
  price: 2_500_000,
  stock: 200,
  status: ProductStatus.InStock,
  createdAt: new Date('2024-03-01'),
  updatedAt: new Date('2024-07-15'),
};

// Omit<Product, 'id' | 'status' | 'createdAt' | 'updatedAt'>
const createProductPayload: CreateProductDto = {
  name: 'Bàn phím cơ Keychron K2',
  price: 1_800_000,
  stock: 100,
};

// Partial<Pick<Product, 'name' | 'price' | 'stock' | 'status'>>
const updateProductPayload: UpdateProductDto = { price: 30_000_000, stock: 45 };

// Pick<Product, 'id' | 'name' | 'price'> – snapshot giá lịch sử
const product1Preview: ProductPreview = { id: product1.id, name: product1.name, price: product1.price };
const product2Preview: ProductPreview = { id: product2.id, name: product2.name, price: product2.price };

// Record<string, ProductPreview> – tra cứu sản phẩm theo ID, không cần any
const catalog: ProductCatalog = {
  [product1.id]: product1Preview,
  [product2.id]: product2Preview,
};

console.log('\nProduct 1:', product1.name, '|', product1.price.toLocaleString('vi-VN'), 'VNĐ');
console.log('Product 2:', product2.name, '|', product2.price.toLocaleString('vi-VN'), 'VNĐ');
console.log('CreateProductDto:', createProductPayload.name);
console.log('UpdateProductDto:', updateProductPayload);
console.log('Catalog lookup:', catalog['prod-001'].name);

// ==================== 3. ORDER ITEM ====================

// Pick<OrderItem, 'productId' | 'quantity'> – client chỉ gửi 2 field, server tự tính phần còn lại
const createItem1Dto: CreateOrderItemDto = { productId: 'prod-001', quantity: 1 };
const createItem2Dto: CreateOrderItemDto = { productId: 'prod-002', quantity: 2 };

// Giả lập server tính toán OrderItem từ CreateOrderItemDto + ProductCatalog
const resolveOrderItem = (
  dto: CreateOrderItemDto,
  productCatalog: ProductCatalog,
  itemId: string,
): OrderItem => {
  const found = productCatalog[dto.productId];
  if (!found) throw new Error(`Product ${dto.productId} không tồn tại`);
  return {
    id: itemId,
    productId: dto.productId,
    product: found,                  // snapshot – bất biến sau khi lưu
    quantity: dto.quantity,
    unitPrice: found.price,
    subtotal: dto.quantity * found.price,
  };
};

const orderItem1: OrderItem = resolveOrderItem(createItem1Dto, catalog, 'item-001');
const orderItem2: OrderItem = resolveOrderItem(createItem2Dto, catalog, 'item-002');

console.log(`\nOrderItem 1: ${orderItem1.product.name} × ${orderItem1.quantity} = ${orderItem1.subtotal.toLocaleString('vi-VN')} VNĐ`);
console.log(`OrderItem 2: ${orderItem2.product.name} × ${orderItem2.quantity} = ${orderItem2.subtotal.toLocaleString('vi-VN')} VNĐ`);

// ==================== 4. ORDER ====================

// Interface riêng vì items lúc tạo là CreateOrderItemDto[], khác với Order.items (OrderItem[])
const createOrderPayload: CreateOrderDto = {
  customerId: 'cust-001',
  items: [createItem1Dto, createItem2Dto],
  note: 'Giao hàng giờ hành chính, gọi trước 30 phút',
};

const order: Order = {
  id: 'ord-001',
  customerId: customer.id,
  customer: customerPreview,         // nhúng CustomerPreview, không phải full Customer
  items: [orderItem1, orderItem2],
  status: OrderStatus.Pending,
  totalAmount: orderItem1.subtotal + orderItem2.subtotal,
  note: createOrderPayload.note ?? null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Pick<Order, 'status'> – cập nhật đơn = chỉ đổi trạng thái
const updateStatusPayload: UpdateOrderStatusDto = { status: OrderStatus.Confirmed };

// Pick<Order, 'id' | 'customerId' | 'status' | 'totalAmount' | 'createdAt'> – dùng cho list view
const orderSummary: OrderSummary = {
  id: order.id,
  customerId: order.customerId,
  status: order.status,
  totalAmount: order.totalAmount,
  createdAt: order.createdAt,
};

// Readonly<Order> – đơn hàng đã DELIVERED không được mutate
const deliveredOrder: Order = { ...order, status: OrderStatus.Delivered };
const frozenOrder: ReadonlyOrder = deliveredOrder;
// frozenOrder.status = OrderStatus.Cancelled; // ← uncomment để thấy lỗi compile

console.log(`\nOrder: ${order.id} | ${order.customer.name} | ${order.totalAmount.toLocaleString('vi-VN')} VNĐ | ${order.status}`);
console.log('UpdateOrderStatusDto:', updateStatusPayload);
console.log('OrderSummary:', orderSummary);
console.log('ReadonlyOrder status:', frozenOrder.status, '(không thể mutate)');

// ==================== 5. GENERIC ====================

// Helper tạo ApiResponse<T> – dùng được cho mọi loại T
const makeResponse = <T extends object>(
  statusCode: number,
  message: string,
  data: T | null,
): ApiResponse<T> => ({ statusCode, message, data, timestamp: new Date().toISOString() });

// Helper tạo Paginated<T>
const makePaginated = <T extends object>(
  items: T[], total: number, page: number, limit: number,
): Paginated<T> => ({
  items, total, page, limit,
  totalPages: Math.ceil(total / limit),
  hasNextPage: page < Math.ceil(total / limit),
  hasPreviousPage: page > 1,
});

// ApiResponse<Order> – response trả về 1 đơn hàng
const singleOrderRes: ApiResponse<Order> = makeResponse(200, 'Lấy đơn hàng thành công', order);

// Paginated<Order>
const paginatedOrders: Paginated<Order> = makePaginated([order], 42, 1, 10);

// ApiResponse<Paginated<Order>> – nested generic, chứng minh generic có thể compose
const orderListRes: ApiResponse<Paginated<Order>> = makeResponse(200, 'Danh sách đơn hàng', paginatedOrders);

// ApiResponse<Paginated<Product>> – cùng generic, khác T → tái sử dụng hoàn toàn
const paginatedProducts: Paginated<Product> = makePaginated([product1, product2], 150, 1, 20);
const productListRes: ApiResponse<Paginated<Product>> = makeResponse(200, 'Danh sách sản phẩm', paginatedProducts);

// ApiResponse khi lỗi – data = null
const errorRes: ApiResponse<Order> = makeResponse<Order>(404, 'Không tìm thấy đơn hàng', null);

console.log(`\nApiResponse<Order>: ${singleOrderRes.statusCode} – ${singleOrderRes.message}`);
console.log(`ApiResponse<Paginated<Order>>: total=${orderListRes.data?.total}, pages=${orderListRes.data?.totalPages}`);
console.log(`ApiResponse<Paginated<Product>>: total=${productListRes.data?.total}`);
console.log(`ApiResponse (error): ${errorRes.statusCode}, data=${errorRes.data}`);

// ==================== KẾT QUẢ ====================

console.log('\n✅ Demo hoàn thành – 0 lỗi TypeScript');

/*
==================== GIẢI THÍCH THIẾT KẾ ====================

1. Interface:
   Mỗi entity (Customer, Product, OrderItem, Order) có 1 interface
   gốc đầy đủ – source of truth. Tất cả DTO dẫn xuất từ đây
   bằng Utility Types → chỉ sửa 1 chỗ khi cần thêm field.

2. Enum:
   String enum cho CustomerStatus, ProductStatus, OrderStatus.
   Giá trị rõ nghĩa ("ACTIVE", "PENDING"...) thay vì số,
   dễ đọc khi log/debug, dễ serialize JSON.

3. Generic:
   ApiResponse<T extends object> và Paginated<T extends object>
   dùng constraint T extends object để tránh truyền primitive.
   Hai generic compose được: ApiResponse<Paginated<Order>>.

4. Utility Types:
   - Omit: CreateDto bỏ field server tự sinh (id, timestamps)
   - Partial<Pick<>>: UpdateDto cho sửa từng field, tránh sửa field hệ thống
   - Pick: Preview/Summary lấy đúng field theo ngữ cảnh
   - Record: ProductCatalog – lookup table type-safe theo ID
   - Readonly: ReadonlyOrder – bảo vệ đơn đã hoàn thành khỏi mutation

5. Module/Export:
   Barrel file index.ts → import gọn từ 1 điểm duy nhất.
==============================================================
*/
