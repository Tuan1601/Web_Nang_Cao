import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import ProductItem from "./ProductItem";

function ProductList({ products }) {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 76,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="product-list">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const product = products[virtualRow.index];

          return (
            <div
              key={product.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <ProductItem product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;