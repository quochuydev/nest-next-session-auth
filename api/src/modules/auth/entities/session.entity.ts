import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public ip: string;

  @Column({ nullable: true })
  public userAgent: string;

  @Column({ nullable: true })
  public userId: string;

  constructor(params: Partial<Session>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
