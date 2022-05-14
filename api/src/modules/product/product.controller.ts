import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';

import { AuthUser } from '../../core/decorators';
import { CrudController } from '../../packages/crud';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController extends CrudController<Product> {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @AuthUser('id') userId: string,
    @Body() body: ProductDto,
  ): Promise<Product> {
    return this.productService.create({ userId, ...body });
  }

  @Post('/:id/review')
  review(
    @AuthUser('id') userId: string,
    @Body() body: any,
    @Param() id: string,
  ): Promise<Product> {
    return this.productService.review(id, userId, body);
  }
}
