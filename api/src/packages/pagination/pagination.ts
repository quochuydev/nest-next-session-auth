import { IPaginationMeta } from './interfaces';

export class Pagination<T> {
  constructor(
    public readonly items: T[],
    public readonly meta: IPaginationMeta,
  ) {}
}
