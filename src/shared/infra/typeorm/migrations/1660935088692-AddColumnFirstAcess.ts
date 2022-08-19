import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnFirstAcess1660935088692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'first_acess',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'first_acess');
  }
}
