export type PaginatedQuery<T> = {
  results: T;
  totalItems: number;
  next: number | null;
  previous: number | null;
  currentPage: number;
  totalPages: number,
}