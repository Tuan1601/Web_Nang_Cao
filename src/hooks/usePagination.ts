// ==================== usePagination<T> ====================
// Kiến thức Buổi 2 – Custom Hook:
//   - Bắt đầu bằng "use"
//   - Kết hợp các hook cơ bản (useState, useMemo)
//   - Single Responsibility: chỉ xử lý logic phân trang
//   - Không phụ thuộc UI: không có JSX, không import React component nào
//   - Generic TypeScript: T extends object để type-safe với mọi loại dữ liệu
//   - Không dùng any
//
// Cách dùng với dữ liệu từ Buoi1:
//   const pagination = usePagination<Product>(products, 5);
//   const pagination = usePagination<Order>(orders, 10);

import { useState, useMemo } from 'react';

// ==================== RETURN TYPE ====================
// Interface trả về rõ ràng – như đã học trong slide "Interface trả về rõ ràng"
// Generic T để currentItems biết đúng kiểu dữ liệu
interface UsePaginationReturn<T> {
  currentPage: number;       // Trang hiện tại (bắt đầu từ 1)
  totalPages: number;        // Tổng số trang
  currentItems: T[];         // Danh sách items của trang hiện tại
  hasNextPage: boolean;      // Còn trang tiếp theo không?
  hasPreviousPage: boolean;  // Có trang trước không?
  next: () => void;          // Chuyển sang trang kế
  prev: () => void;          // Quay về trang trước
  goToPage: (page: number) => void; // Nhảy đến trang bất kỳ
}

// ==================== HOOK ====================
// Generic <T> – T đại diện cho kiểu của mỗi item trong mảng
// T extends object: tương tự Buoi1, tránh truyền primitive
export function usePagination<T extends object>(
  items: T[],      // Toàn bộ danh sách dữ liệu (Product[], Order[], ...)
  pageSize: number // Số item trên mỗi trang
): UsePaginationReturn<T> {

  // State duy nhất: đang ở trang nào? (bắt đầu từ 1)
  const [currentPage, setCurrentPage] = useState<number>(1);

  // useMemo: tính totalPages chỉ khi items.length hoặc pageSize thay đổi
  // Math.ceil để xử lý trường hợp không chia hết: 11 items / 5 = 3 trang
  const totalPages = useMemo(
    () => Math.ceil(items.length / pageSize),
    [items.length, pageSize]
  );

  // useMemo: tính items của trang hiện tại
  // Ví dụ: trang 2, pageSize 5 → items.slice(5, 10)
  const currentItems = useMemo<T[]>(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, pageSize]);

  // ==================== FUNCTIONS ====================

  // next(): chuyển sang trang kế, không vượt quá totalPages
  function next(): void {
    setCurrentPage((prev) => {
      if (prev >= totalPages) return prev; // Edge case: đã ở trang cuối
      return prev + 1;
    });
  }

  // prev(): quay về trang trước, không xuống dưới 1
  function prev(): void {
    setCurrentPage((prev) => {
      if (prev <= 1) return prev; // Edge case: đã ở trang đầu
      return prev - 1;
    });
  }

  // goToPage(): nhảy đến trang bất kỳ, validate trước khi set
  function goToPage(page: number): void {
    // Edge case: page không hợp lệ
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    next,
    prev,
    goToPage,
  };
}
