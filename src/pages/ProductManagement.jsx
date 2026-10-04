import { useCallback, useMemo, useState } from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import products from "../data/products";

function ProductManagement() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");

  const categories = useMemo(() => {
    return ["Tất cả", ...new Set(products.map((product) => product.category))];
  }, []);

  const filteredProducts = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(keyword);

      const matchCategory =
        category === "Tất cả" ||
        product.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  return (
    <div className="container">
      <Header />

      <div className="toolbar">
        <SearchBar
          value={search}
          onChange={handleSearch}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="statistics">
        <div>
          <strong>10.000</strong>
          <span>Tổng sản phẩm</span>
        </div>

        <div>
          <strong>{filteredProducts.length}</strong>
          <span>Kết quả</span>
        </div>
      </div>

      <ProductList products={filteredProducts} />
    </div>
  );
}

export default ProductManagement;