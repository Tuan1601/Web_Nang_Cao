function SearchBar({ value, onChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;