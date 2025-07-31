export type Pagination<T> = {
  results: T;
  totalItems: number;
  next: number | null;
  previous: number | null;
  currentPage: number;
}