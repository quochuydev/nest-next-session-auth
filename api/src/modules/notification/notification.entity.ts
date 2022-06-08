import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "../../core/entities/base";
import { User } from "../user/entities/user.entity";

@Entity()
export class Notification extends Base<Notification> {
  @Column({ nullable: true })
  public title: string;

  @Column({ nullable: true })
  public body: string;

  @Column({ nullable: true })
  public icon: string;

  @Column("timestamp with time zone", { default: () => "now()" })
  public sentAt: Date;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn()
  public user: User;

  @Column({ nullable: true })
  public userId: string;
}
