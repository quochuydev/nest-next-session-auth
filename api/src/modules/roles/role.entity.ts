import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: true })
  public name: string;

  @Column({ type: "simple-array", default: [] })
  public permissions: string[];

  constructor(params?: Partial<Role>) {
    super();
    if (params) {
      Object.assign(this, params);
    }
  }
}
