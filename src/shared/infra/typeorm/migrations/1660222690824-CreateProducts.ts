import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1660222690824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
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
            name: 'minimum',
            type: 'float',
          },
          {
            name: 'barcode',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'unity',
            type: 'varchar(80)',
            isNullable: true,
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
    await queryRunner.dropTable('products');
  }
}
