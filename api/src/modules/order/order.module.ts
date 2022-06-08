import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from './order.service';
import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { OrderLineItem } from './order-line-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderLineItem])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
