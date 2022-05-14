import { IPagination, IPaginationMeta } from './interfaces';
import { Pagination } from './pagination';

export function createPaginationObject<T>(
  items: T[],
  total: number,
  currentPage: number,
  limit: number,
): IPagination<T> {
  const meta: IPaginationMeta = {
    total,
    totalPage: Math.ceil(total / limit),
    perPage: limit ?? 20,
    currentPage: currentPage ?? 1,
  };

  return new Pagination(items, meta);
}
