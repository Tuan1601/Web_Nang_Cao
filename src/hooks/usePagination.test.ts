import { getPageNumbers, paginate } from './usePagination';

const items = Array.from({ length: 25 }, (_, i) => i + 1);

describe('paginate', () => {
  it('cắt đúng phần tử của trang 1 và trang cuối', () => {
    const first = paginate(items, 1, 10);
    expect(first.pageItems).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(first.totalPages).toBe(3);
    expect(first.from).toBe(1);
    expect(first.to).toBe(10);

    const last = paginate(items, 3, 10);
    expect(last.pageItems).toEqual([21, 22, 23, 24, 25]);
    expect(last.from).toBe(21);
    expect(last.to).toBe(25);
  });

  it('kẹp page vượt phạm vi về trang hợp lệ', () => {
    expect(paginate(items, 99, 10).currentPage).toBe(3);
    expect(paginate(items, 0, 10).currentPage).toBe(1);
  });

  it('danh sách rỗng vẫn có 1 trang, from/to = 0', () => {
    const result = paginate([], 1, 10);
    expect(result.totalPages).toBe(1);
    expect(result.pageItems).toEqual([]);
    expect(result.from).toBe(0);
  });
});

describe('getPageNumbers', () => {
  it('ít trang => hiện tất cả', () => {
    expect(getPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('nhiều trang => có dấu … hai bên trang hiện tại', () => {
    expect(getPageNumbers(5, 10)).toEqual([1, 'dots-left', 4, 5, 6, 'dots-right', 10]);
    expect(getPageNumbers(1, 10)).toEqual([1, 2, 'dots-right', 10]);
    expect(getPageNumbers(10, 10)).toEqual([1, 'dots-left', 9, 10]);
  });
});
