import { memo } from "react";

function ProductItem({ product }) {
  return (
    <div className="product-item">
      <div className="product-id">
        #{product.id}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <span className="category-badge">
          {product.category}
        </span>
      </div>

      <div className="product-price">
        {product.price.toLocaleString("vi-VN")} ₫
      </div>

      <div className="product-stock">
        <span className="stock-number">
          {product.stock}
        </span>
        <span className="stock-label">
           sản phẩm
        </span>
      </div>
    </div>
  );
}

export default memo(ProductItem);