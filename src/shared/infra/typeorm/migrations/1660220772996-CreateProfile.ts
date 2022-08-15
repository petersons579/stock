import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProfile1660220772996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'active',
            type: 'boolean',
            default: false,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'admin',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'manager',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'employee',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'plataform',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'app',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiles');
  }
}
