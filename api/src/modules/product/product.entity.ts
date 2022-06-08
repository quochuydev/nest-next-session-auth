import { Column, Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Base } from '../../core/entities/base';
import { Review } from '../review/review.entity';
import { Variant } from './variant.entity';

@Entity()
export class Product extends Base<Product> {
  @Column({ nullable: true })
  public title: string;

  @Column({ nullable: true })
  public description: string;

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];

  @ManyToMany(() => Review)
  @JoinTable()
  reviews: Review[];
}
