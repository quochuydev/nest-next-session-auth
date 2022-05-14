import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '../../core/entities/base';
import { User } from '../user/entities';

@Entity()
export class Device extends Base<Device> {
  @Column({ nullable: true })
  public os: string;

  @Column({ nullable: true })
  public token: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn()
  public user: User;

  @Column({ nullable: true })
  public userId: string;
}
