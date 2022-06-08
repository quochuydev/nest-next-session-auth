import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IPagination, PaginationQueryDto } from '../pagination';
import { ICrudService } from './ICrudService';
import { AuthUser } from '../../core/decorators';

export abstract class CrudController<T extends any> {
  protected constructor(private readonly crudService: ICrudService<T>) {}

  @Get()
  paginate(
    @Query() paginationParams?: PaginationQueryDto,
  ): Promise<IPagination<T>> {
    return this.crudService.paginate(paginationParams);
  }

  @Get()
  findAll(
    @Query() paginationParams?: PaginationQueryDto,
  ): Promise<IPagination<T>> {
    return this.crudService.findAll(paginationParams);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    return this.crudService.findOne(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @AuthUser('id') userId: string,
    @Body() body: DeepPartial<T>,
    ...options: any[]
  ): Promise<T> {
    return this.crudService.create({ userId, ...body });
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() entity: QueryDeepPartialEntity<T>,
    ...options: any[]
  ): Promise<any> {
    return this.crudService.update(id, entity);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async delete(@Param('id') id: string, ...options: any[]): Promise<any> {
    return this.crudService.delete(id);
  }
}
