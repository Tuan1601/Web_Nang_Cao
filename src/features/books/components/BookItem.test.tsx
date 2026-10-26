import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookItem } from './BookItem';
import type { Book } from '../../../types/book';

const book: Book = {
  id: 'b42',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  year: 2008,
  available: 3,
};

function renderItem(overrides: Partial<Book> = {}, isBorrowed = false) {
  const onBorrow = jest.fn();
  const onReturn = jest.fn();
  render(
    <BookItem book={{ ...book, ...overrides }} isBorrowed={isBorrowed} onBorrow={onBorrow} onReturn={onReturn} />,
  );
  return { onBorrow, onReturn };
}

describe('<BookItem />', () => {
  it('hiển thị đúng tên sách, tác giả, thể loại, năm xuất bản và số bản còn lại', () => {
    renderItem();
    expect(screen.getByRole('heading', { name: 'Clean Code' })).toBeInTheDocument();
    expect(screen.getByText('Robert C. Martin')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText('2008')).toBeInTheDocument();
    expect(screen.getByText('Còn 3 bản')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Bìa sách Clean Code' })).toBeInTheDocument();
  });

  it('click "Mượn" gọi onBorrow đúng 1 lần với đúng id', async () => {
    const user = userEvent.setup();
    const { onBorrow, onReturn } = renderItem();

    await user.click(screen.getByRole('button', { name: 'Mượn' }));

    expect(onBorrow).toHaveBeenCalledTimes(1);
    expect(onBorrow).toHaveBeenCalledWith('b42');
    expect(onReturn).not.toHaveBeenCalled();
  });

  it('nút "Mượn" bị vô hiệu hoá khi hết bản và click không gọi hàm', async () => {
    const user = userEvent.setup();
    const { onBorrow } = renderItem({ available: 0 });

    const button = screen.getByRole('button', { name: 'Mượn' });
    expect(button).toBeDisabled();
    expect(screen.getByText('Hết sách')).toBeInTheDocument();

    await user.click(button);
    expect(onBorrow).not.toHaveBeenCalled();
  });

  it('sách đang mượn hiển thị nút "Trả", click gọi onReturn với đúng id', async () => {
    const user = userEvent.setup();
    const { onReturn } = renderItem({}, true);

    expect(screen.queryByRole('button', { name: 'Mượn' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Trả' }));
    expect(onReturn).toHaveBeenCalledWith('b42');
  });
});
