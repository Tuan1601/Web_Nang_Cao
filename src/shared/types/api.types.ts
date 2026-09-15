// BUỔI 1: Generic ApiResponse<T>
// Sử dụng Generic để tạo wrapper response type an toàn về mặt kiểu dữ liệu.
// Thay vì dùng ApiResponse<any>, ta ràng buộc kiểu T cụ thể tại mỗi điểm gọi.

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
