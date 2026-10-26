export const CATEGORIES = [
  'CNTT',
  'Kinh tế',
  'Ngoại ngữ',
  'Văn học',
  'Tâm lý',
  'Khoa học',
  'Lịch sử',
  'Triết học',
  'Kỹ năng sống',
  'Y học',
  'Du lịch',
  'Nghệ thuật',
  'Pháp luật',
  'Giáo dục',
  'Thiếu nhi',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  available: number;
  coverImage?: string;
}

export type BookId = Book['id'];

export type ReadonlyBook = Readonly<Book>;

export type NewBook = Omit<Book, 'id'>;

export type BookSummary = Pick<Book, 'id' | 'title' | 'author' | 'coverImage'>;

export type CategoryStats = Record<Category, number>;

export type CategoryFilter = Category | 'all';

export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

export interface ApiFailure {
  ok: false;
  error: string;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export function isApiSuccess<T>(result: ApiResult<T>): result is ApiSuccess<T> {
  return result.ok;
}

export function isApiFailure<T>(result: ApiResult<T>): result is ApiFailure {
  return !result.ok;
}

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}
