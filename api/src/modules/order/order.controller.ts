import { Controller, HttpCode, Post, HttpStatus, Body } from '@nestjs/common';

import { AuthUser } from '../../core/decorators';
import { CrudController } from '../../packages/crud';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController extends CrudController<Order> {
  constructor(private readonly orderService: OrderService) {
    super(orderService);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@AuthUser('id') userId: string, @Body() body: any): Promise<Order> {
    return this.orderService.create({ userId, ...body });
  }
}
