import {
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class BlogDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  handle: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  options: string[];

  @IsOptional()
  @IsString()
  blogType: string;

  @IsOptional()
  @IsString()
  vendor: string;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants: VariantDto[];

  @IsOptional()
  @IsString()
  userId: string;
}

export class VariantDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  barcode: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  imageId: string;

  @IsOptional()
  @IsArray()
  options: string;
}
