import {
  FindConditions,
  FindManyOptions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { IPagination, IPaginationOptions } from './interfaces';
import { createPaginationObject } from './create-pagination-object';

export async function paginate<T>(
  repositoryOrQueryBuilder: Repository<T> | SelectQueryBuilder<T>,
  options: IPaginationOptions,
  searchOptions?: FindConditions<T> | FindManyOptions<T>,
) {
  return repositoryOrQueryBuilder instanceof Repository
    ? paginateRepository<T>(repositoryOrQueryBuilder, options, searchOptions)
    : paginateQueryBuilder(repositoryOrQueryBuilder, options);
}

async function paginateRepository<T>(
  repository: Repository<T>,
  options: IPaginationOptions,
  searchOptions?: FindConditions<T> | FindManyOptions<T>,
): Promise<IPagination<T>> {
  const { take, skip, page } = resolveOptions(options);

  if (page < 1) {
    return createPaginationObject([], 0, page, take);
  }

  const [items, total] = await repository.findAndCount({
    take,
    skip,
    ...searchOptions,
  });

  return createPaginationObject<T>(items, total, page, take);
}

async function paginateQueryBuilder<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: IPaginationOptions,
): Promise<IPagination<T>> {
  const { take, skip, page } = resolveOptions(options);

  const [items, total] = await queryBuilder
    .take(take)
    .skip(skip)
    .getManyAndCount();

  return createPaginationObject<T>(items, total, page, take);
}

function resolveOptions(options: IPaginationOptions): {
  take?: number;
  skip?: number;
  page?: number;
} {
  const page = options.page || 1;
  const take = options.perPage || 20;
  const skip = page && take ? take * (page - 1) : 0;

  return {
    page,
    take,
    skip,
  };
}
