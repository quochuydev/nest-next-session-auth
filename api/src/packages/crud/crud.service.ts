import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ICrudService } from './ICrudService';
import { IPagination, IPaginationOptions, paginate } from '../pagination';
import { ITryRequest } from './ITryRequest';

export abstract class CrudService<T> implements ICrudService<T> {
  protected constructor(protected readonly repository: Repository<T>) {}

  public async count(filter?: FindManyOptions<T>): Promise<number> {
    return await this.repository.count(filter);
  }

  public paginate(
    paginationOptions: IPaginationOptions,
  ): Promise<IPagination<T>> {
    return paginate<T>(this.repository, paginationOptions);
  }

  public findAll(options): Promise<any> {
    return this.repository.find(options);
  }

  public async findOneOrFail(
    id: string | number | FindOneOptions<T> | FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<ITryRequest> {
    try {
      const record = await this.repository.findOneOrFail(id as any, options);
      return {
        success: true,
        record,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  public async findOne(
    id: string | number | FindOneOptions<T> | FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    const record = await this.repository.findOne(id as any, options);
    if (!record) {
      throw new NotFoundException('The requested record was not found');
    }
    return record;
  }

  public async create(entity: DeepPartial<T>, ...options: any[]): Promise<T> {
    const obj = this.repository.create(entity);
    try {
      return await this.repository.save(obj as any);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async update(
    id: string | number | FindConditions<T>,
    partialEntity: QueryDeepPartialEntity<T>,
    ...options: any[]
  ): Promise<UpdateResult | T> {
    try {
      return await this.repository.update(id, partialEntity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async delete(criteria: any): Promise<DeleteResult> {
    try {
      return await this.repository.softRemove(criteria);
    } catch (err) {
      throw new NotFoundException('The record was not found', err);
    }
  }
}
