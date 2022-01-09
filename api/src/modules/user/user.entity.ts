import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true })
  public firstName: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public phoneNumber: string;

  @Column({ nullable: true })
  public salt: string;

  @Column({})
  public username: string;

  @Column({})
  public password: string;

  constructor(params?: Partial<User>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
