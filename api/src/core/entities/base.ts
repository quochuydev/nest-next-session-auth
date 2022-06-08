import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  DeleteDateColumn,
} from 'typeorm';

export abstract class Base<T> extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  constructor(params?: Partial<T>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
