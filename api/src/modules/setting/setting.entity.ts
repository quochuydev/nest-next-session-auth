import { Column, Entity } from 'typeorm';
import { Base } from '../../core/entities/base';

@Entity()
export class Setting extends Base<Setting> {
  @Column({ nullable: true })
  key: string;

  @Column({ nullable: true })
  value: string;

  @Column({ default: 'string' })
  type: string;
}
