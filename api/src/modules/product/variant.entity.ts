import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../../core/entities/base';
import { Product } from './product.entity';

@Entity()
export class Variant extends Base<Variant> {
  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('float8', { default: 0 })
  price: number;

  @Column({ nullable: true })
  productId: string;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  product: Product;
}
