import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateStocks1660222969052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stocks',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'quantity',
            type: 'float',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['entrance', 'exit'],
          },
          {
            name: 'id_user',
            type: 'varchar(36)',
          },
          {
            name: 'id_product',
            type: 'varchar(36)',
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

    await queryRunner.createForeignKey(
      'stocks',
      new TableForeignKey({
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createForeignKey(
      'stocks',
      new TableForeignKey({
        columnNames: ['id_product'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stocks');
  }
}
