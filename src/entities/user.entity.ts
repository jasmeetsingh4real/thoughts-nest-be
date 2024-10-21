import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EnumUserType } from "../types/commonTypes";
@Entity({ name: "users" })
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;
  @Column()
  password: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({
    type: "enum",
    enum: EnumUserType,
    default: EnumUserType.USER, // default value for new users is USER
  })
  role: string;
}
