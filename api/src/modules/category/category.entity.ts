import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '../../core/entities/base';
import { User } from '../user/entities/index';

@Entity()
export class Category extends Base<Category> {
  @Column({ nullable: true })
  public name: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @Column({ nullable: true })
  public userId: string;
}
