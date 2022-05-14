export interface IPaginationOptions {
  perPage?: number;
  page?: number;
  q?: string;
}

export interface IPaginationMeta {
  total: number;
  totalPage: number;
  perPage: number;
  currentPage: number;
}

export interface IPagination<T> {
  items: T[];
  meta?: IPaginationMeta;
}
