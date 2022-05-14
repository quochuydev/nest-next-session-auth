import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '../../packages/crud';
import { OrderLineItem } from './order-line-item.entity';
import { Order } from './order.entity';

@Injectable()
export class OrderService extends CrudService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderLineItem)
    private readonly lineItemRepository: Repository<OrderLineItem>,
  ) {
    super(orderRepository);
  }

  async create(data: Partial<Order>): Promise<Order> {
    const lineItems = [];

    for (let i = 0; i < data.lineItems.length; i++) {
      const item = data.lineItems[i];
      const newLineItem = new OrderLineItem(item);
      const lineItem = await newLineItem.save();
      lineItems.push(lineItem);
    }

    const newOrder = new Order({
      ...data,
      lineItems,
    });

    const order = await newOrder.save();
    // TODO send notify admin
    // TODO send notify user
    return order;
  }
}
