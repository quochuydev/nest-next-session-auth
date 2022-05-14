import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Base } from "../../core/entities/base";
import { User } from "../user/entities/user.entity";
import { CartLineItem } from "./cart-line-item.entity";

@Entity()
export class Cart extends Base<Cart> {
  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn()
  customer: User;

  @Column({ nullable: true })
  customerId: string;

  @OneToMany(() => CartLineItem, (lineItem) => lineItem.cart)
  lineItems: CartLineItem[];
}
