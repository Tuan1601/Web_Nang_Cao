import { usePagination } from '../hooks/usePagination';
import type { Product } from '../types/product.types';
import { ProductStatus } from '../types/product.types';

const PRODUCTS: Product[] = [
  { id: 'prod-001', name: 'Laptop Dell XPS 15', price: 32_000_000, stock: 50, status: ProductStatus.InStock, createdAt: new Date('2024-01-01'), updatedAt: new Date('2024-06-01') },
  { id: 'prod-002', name: 'Chuột Logitech MX Master 3', price: 2_500_000, stock: 200, status: ProductStatus.InStock, createdAt: new Date('2024-01-02'), updatedAt: new Date('2024-06-02') },
  { id: 'prod-003', name: 'Bàn phím cơ Keychron K2', price: 1_800_000, stock: 100, status: ProductStatus.InStock, createdAt: new Date('2024-01-03'), updatedAt: new Date('2024-06-03') },
  { id: 'prod-004', name: 'Màn hình LG 27 inch 4K', price: 15_000_000, stock: 30, status: ProductStatus.InStock, createdAt: new Date('2024-01-04'), updatedAt: new Date('2024-06-04') },
  { id: 'prod-005', name: 'Tai nghe Sony WH-1000XM5', price: 8_500_000, stock: 80, status: ProductStatus.InStock, createdAt: new Date('2024-01-05'), updatedAt: new Date('2024-06-05') },
  { id: 'prod-006', name: 'iPad Pro M4 11 inch', price: 25_000_000, stock: 0, status: ProductStatus.OutOfStock, createdAt: new Date('2024-01-06'), updatedAt: new Date('2024-06-06') },
  { id: 'prod-007', name: 'MacBook Air M3', price: 29_000_000, stock: 15, status: ProductStatus.InStock, createdAt: new Date('2024-01-07'), updatedAt: new Date('2024-06-07') },
  { id: 'prod-008', name: 'Samsung Galaxy S24 Ultra', price: 31_000_000, stock: 40, status: ProductStatus.InStock, createdAt: new Date('2024-01-08'), updatedAt: new Date('2024-06-08') },
  { id: 'prod-009', name: 'Webcam Logitech C920', price: 1_200_000, stock: 150, status: ProductStatus.InStock, createdAt: new Date('2024-01-09'), updatedAt: new Date('2024-06-09') },
  { id: 'prod-010', name: 'USB Hub Anker 7-in-1', price: 850_000, stock: 200, status: ProductStatus.InStock, createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-06-10') },
  { id: 'prod-011', name: 'SSD Samsung 990 Pro 1TB', price: 3_200_000, stock: 60, status: ProductStatus.InStock, createdAt: new Date('2024-01-11'), updatedAt: new Date('2024-06-11') },
  { id: 'prod-012', name: 'Nokia 3310 (Cổ điển)', price: 500_000, stock: 0, status: ProductStatus.Discontinued, createdAt: new Date('2024-01-12'), updatedAt: new Date('2024-06-12') },
];

const STATUS_LABEL: Record<ProductStatus, string> = {
  [ProductStatus.InStock]: 'Còn hàng',
  [ProductStatus.OutOfStock]: 'Hết hàng',
  [ProductStatus.Discontinued]: 'Ngừng KD',
};

const STATUS_CLASS: Record<ProductStatus, string> = {
  [ProductStatus.InStock]: 'badge--green',
  [ProductStatus.OutOfStock]: 'badge--red',
  [ProductStatus.Discontinued]: 'badge--gray',
};

export function ProductsPage() {
  const {
    currentPage,
    totalPages,
    currentItems,
    hasNextPage,
    hasPreviousPage,
    next,
    prev,
    goToPage,
  } = usePagination<Product>(PRODUCTS, 5);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Bài 2 — usePagination&lt;T&gt;</h1>
        <p className="page-subtitle">Custom Hook + Generic TypeScript </p>
        <span className="page-meta">
          Tổng: {PRODUCTS.length} sản phẩm · {totalPages} trang
        </span>
      </div>

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={product.id}>
                <td className="td-index">{(currentPage - 1) * 5 + index + 1}</td>
                <td className="td-name">{product.name}</td>
                <td className="td-price">{product.price.toLocaleString('vi-VN')} ₫</td>
                <td className="td-stock">{product.stock}</td>
                <td>
                  <span className={`badge ${STATUS_CLASS[product.status]}`}>
                    {STATUS_LABEL[product.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="pagination-btn" onClick={prev} disabled={!hasPreviousPage}>
          ← Trước
        </button>
        <div className="pagination-pages">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-page ${page === currentPage ? 'pagination-page--active' : ''}`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="pagination-btn" onClick={next} disabled={!hasNextPage}>
          Sau →
        </button>
      </div>

      <p className="pagination-info">Trang {currentPage} / {totalPages}</p>
    </div>
  );
}
