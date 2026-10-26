import { memo, useState } from 'react';
import type { BookId, Category, ReadonlyBook } from '../../../types/book';
import { createSvgBookCover } from '../../../utils/bookCovers';
import { formatYear } from '../../../utils/formatYear';

export interface BookItemProps {
  book: ReadonlyBook;
  isBorrowed: boolean;
  onBorrow: (id: BookId) => void;
  onReturn: (id: BookId) => void;
}

const CATEGORY_HUE: Record<Category, number> = {
  CNTT: 252,
  'Kinh tế': 28,
  'Ngoại ngữ': 168,
  'Văn học': 330,
  'Tâm lý': 280,
  'Khoa học': 200,
  'Lịch sử': 15,
  'Triết học': 230,
  'Kỹ năng sống': 140,
  'Y học': 355,
  'Du lịch': 185,
  'Nghệ thuật': 300,
  'Pháp luật': 215,
  'Giáo dục': 45,
  'Thiếu nhi': 95,
};

function BookItemBase({ book, isBorrowed, onBorrow, onReturn }: BookItemProps) {
  const outOfStock = book.available <= 0;
  const hue = CATEGORY_HUE[book.category];
  const [hasError, setHasError] = useState(false);

  const coverUrl = hasError || !book.coverImage
    ? createSvgBookCover(book.title, book.author, book.category, book.year)
    : book.coverImage;

  return (
    <article className="book-card" data-testid={`book-${book.id}`}>
      <div className="book-card__cover-wrap">
        <img
          src={coverUrl}
          alt={`Bìa sách ${book.title}`}
          className="book-card__cover-img"
          loading="lazy"
          onError={() => setHasError(true)}
        />
        <span
          className="tag book-card__badge"
          style={{ color: `hsl(${hue} 70% 48%)`, background: `hsl(${hue} 70% 50% / 0.16)` }}
        >
          {book.category}
        </span>
      </div>

      <div className="book-card__top">
        <span className="book-card__year">{formatYear(book.year)}</span>
        <span className={`stock ${outOfStock ? 'stock--empty' : ''}`}>
          {outOfStock ? 'Hết sách' : `Còn ${book.available} bản`}
        </span>
      </div>

      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">{book.author}</p>

      <div className="book-card__bottom">
        {isBorrowed ? (
          <button
            type="button"
            id={`return-${book.id}`}
            className="btn btn--ghost btn--full"
            onClick={() => onReturn(book.id)}
          >
            Trả
          </button>
        ) : (
          <button
            type="button"
            id={`borrow-${book.id}`}
            className="btn btn--primary btn--full"
            disabled={outOfStock}
            onClick={() => onBorrow(book.id)}
          >
            Mượn
          </button>
        )}
      </div>
    </article>
  );
}

export const BookItem = memo(BookItemBase);
export default BookItem;
