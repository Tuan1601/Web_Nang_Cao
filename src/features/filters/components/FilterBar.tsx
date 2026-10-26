import type { ChangeEvent } from 'react';
import { CATEGORIES, isCategory, type CategoryFilter } from '../../../types/book';
import { useFilterStore } from '../filterStore';

const OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  ...CATEGORIES.map((c) => ({ value: c, label: c })),
];

export function FilterBar() {
  const keyword = useFilterStore((s) => s.keyword);
  const category = useFilterStore((s) => s.category);
  const setKeyword = useFilterStore((s) => s.setKeyword);
  const setCategory = useFilterStore((s) => s.setCategory);

  const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

  const handleCategory = (value: string) => {
    setCategory(isCategory(value) ? value : 'all');
  };

  return (
    <div className="filter-bar">
      <label className="search">
        <span className="search__icon" aria-hidden="true">🔍</span>
        <input
          id="search-input"
          type="search"
          placeholder="Tìm theo tên sách hoặc tác giả..."
          value={keyword}
          onChange={handleKeyword}
          aria-label="Tìm kiếm sách"
        />
      </label>

      <div className="chips" role="group" aria-label="Lọc theo thể loại">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            id={`filter-${opt.value}`}
            className={`chip ${category === opt.value ? 'chip--active' : ''}`}
            aria-pressed={category === opt.value}
            onClick={() => handleCategory(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
