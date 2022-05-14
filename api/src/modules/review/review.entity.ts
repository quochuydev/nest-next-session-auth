import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "../../core/entities/base";
import { User } from "../user/entities/user.entity";

@Entity()
export class Review extends Base<Review> {
  @Column({ nullable: true })
  public score: number;

  @Column({ nullable: true })
  public note: string;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  userId: string;
}
