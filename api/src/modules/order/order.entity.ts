import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Base } from "../../core/entities/base";
// import { Address } from "../address/address.entity";
import { User } from "../user/entities";
import { OrderLineItem } from "./order-line-item.entity";

@Entity()
export class Order extends Base<Order> {
  // @ManyToOne(() => Address, { onDelete: "SET NULL" })
  // @JoinColumn()
  // address: Address;

  @Column({ nullable: true })
  addressId: string;

  @Column("simple-json", { nullable: true })
  shippingAddress: any;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  userId: string;

  @Column("simple-json", { nullable: true })
  customer: any;

  @OneToMany(() => OrderLineItem, (lineItem) => lineItem.order)
  lineItems: OrderLineItem[];

  @Column("float8", { default: 0 })
  amount: number;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  fulfillmentStatus: string;

  @Column({ nullable: true })
  note: string;
}
