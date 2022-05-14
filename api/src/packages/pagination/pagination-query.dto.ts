import {
  IsNumber,
  IsString,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IPaginationOptions } from './interfaces';

export class PaginationQueryDto implements IPaginationOptions {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number; // If page === undefined, get all

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  perPage = 10;
}

export class PaginationSearchQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  q?: string;

  @IsOptional()
  @IsString()
  all?: string;
}
