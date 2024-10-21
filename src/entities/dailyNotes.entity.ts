import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EnumUserType } from "../types/commonTypes";
@Entity({ name: "daily_notes" })
export class DailyNotesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  note: string;

  @Column()
  title: string;

  @Column({ type: "text" })
  userId: string;

  @Column()
  isCanonEvent: Boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
