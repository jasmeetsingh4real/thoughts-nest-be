import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EnumUserType } from "../types/commonTypes";
@Entity({ name: "images" })
export class DailyNotesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageName: string;
  @Column()
  url: string;

  @Column()
  userId: string;

  @Column()
  noteId: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
