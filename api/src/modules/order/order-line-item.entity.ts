import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../core/entities/base';
import { Order } from './order.entity';

@Entity()
export class OrderLineItem extends Base<OrderLineItem> {
  @Column({ nullable: true })
  productId: string;

  @Column('float8', { default: 0 })
  quantity: number;

  @Column('float8', { default: 0 })
  price: number;

  @Column('float8', { default: 0 })
  priceOriginal: number;

  @Column({ nullable: true })
  public orderId: string;

  @ManyToOne(() => Order, (order) => order.lineItems)
  public order: Order;
}
