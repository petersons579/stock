import { MigrationInterface, QueryRunner } from 'typeorm';

export class FunctionCountStock1660770782885 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE FUNCTION count_stock(product_id VARCHAR(36))
      RETURNS int
      BEGIN
        DECLARE TOTAL_ENTRANCE INT DEFAULT 0;
        DECLARE TOTAL_EXIT INT DEFAULT 0;

        SELECT SUM(quantity) INTO TOTAL_ENTRANCE FROM stocks WHERE type = "entrance" AND product_id = id_product;
        SELECT SUM(quantity) INTO TOTAL_EXIT FROM stocks WHERE type = "exit" AND product_id = id_product;

        IF TOTAL_ENTRANCE IS NOT NULL AND TOTAL_EXIT IS NOT NULL THEN
          RETURN TOTAL_ENTRANCE - TOTAL_EXIT;

        ELSEIF TOTAL_EXIT IS NULL THEN
          RETURN TOTAL_ENTRANCE;
        ELSE
          RETURN 0;
        END IF;
      END`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP FUNCTION [IF EXISTS] count_stock');
  }
}
