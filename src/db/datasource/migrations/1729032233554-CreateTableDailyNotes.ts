import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableExclusion,
} from "typeorm";

export class CreateTableDailyNotes1729032233554 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "daily_notes",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            generationStrategy: "increment",
            isGenerated: true,
          },
          {
            name: "note",
            type: "text",
          },
          {
            name: "userId",
            type: "varchar",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "isCanonEvent",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("daily_notes");
  }
}
