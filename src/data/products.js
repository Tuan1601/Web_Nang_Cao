const categories = [
  "Điện thoại",
  "Laptop",
  "Tai nghe",
  "Bàn phím",
  "Chuột",
  "Màn hình",
  "Tablet",
  "Phụ kiện",
];

export const products = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  name: `Sản phẩm ${index + 1}`,
  category: categories[index % categories.length],
  price: Math.floor(Math.random() * 20000000) + 500000,
  stock: Math.floor(Math.random() * 200),
}));

export default products;