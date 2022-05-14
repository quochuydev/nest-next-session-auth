import { Controller, HttpCode, Post, HttpStatus, Body } from '@nestjs/common';

import { AuthUser } from '../../core/decorators';
import { CrudController } from '../../packages/crud';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Controller('carts')
export class CartController extends CrudController<Cart> {
  constructor(private readonly cartService: CartService) {
    super(cartService);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@AuthUser('id') userId: string, @Body() body: any): Promise<Cart> {
    return this.cartService.create({ userId, ...body });
  }
}
