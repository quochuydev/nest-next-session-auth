import { Column, Entity, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Base } from "../../core/entities/base";

@Entity()
export class Product extends Base<Product> {
  @Column({ nullable: true })
  public title: string;

  @Column({ nullable: true })
  public body: string;
}
