import { Column, Entity, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Base } from "../../core/entities/base";

@Entity()
export class Blog extends Base<Blog> {
  @Column({ nullable: true })
  public title: string;

  @Column({ nullable: true })
  public body: string;
}
