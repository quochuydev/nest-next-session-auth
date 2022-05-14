import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '../../core/entities/base';
import { User } from '../user/entities/index';

@Entity()
export class File extends Base<File> {
  @Column({ nullable: true })
  public url: string;

  @Column({ nullable: true })
  public key: string;

  @Column({ nullable: true })
  public contentType: string;

  @Column({ default: 0 })
  public size: number;

  @Column({ nullable: true })
  public type: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn()
  public user: User;

  @Column({ nullable: true })
  public userId: string;
}
