import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPagination, IPaginationOptions } from '../pagination';

export interface ICrudService<T> {
  count(filter?: FindManyOptions<T>): Promise<number>;
  paginate(filter?: IPaginationOptions): Promise<IPagination<T>>;
  findAll(filter?: IPaginationOptions): Promise<IPagination<T>>;
  findOne(
    id: string | number | FindOneOptions<T> | FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T>;
  create(entity: DeepPartial<T>, ...options: any[]): Promise<T>;
  update(
    id: any,
    entity: QueryDeepPartialEntity<T>,
    ...options: any[]
  ): Promise<UpdateResult | T>;
  delete(id: any, ...options: any[]): Promise<DeleteResult>;
}
