import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../core/entities/base';
import { Cart } from './cart.entity';

@Entity()
export class CartLineItem extends Base<CartLineItem> {
  @Column({ nullable: true })
  productId: string;

  @Column('float8', { default: 0 })
  quantity: number;

  @Column('float8', { default: 0 })
  price: number;

  @Column('float8', { default: 0 })
  priceOriginal: number;

  @Column({ nullable: true })
  cartId: string;

  @ManyToOne(() => Cart, (cart) => cart.lineItems)
  cart: Cart;
}
