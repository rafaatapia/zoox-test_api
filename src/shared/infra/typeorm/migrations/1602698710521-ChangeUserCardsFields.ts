import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeUserCardsFields1602698710521
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_cards', 'number');
    await queryRunner.dropColumn('user_cards', 'token');

    await queryRunner.addColumn(
      'user_cards',
      new TableColumn({
        name: 'credit_card_id',
        type: 'varchar',
      }),
    );
    await queryRunner.addColumn(
      'user_cards',
      new TableColumn({
        name: 'last_4_card_number',
        type: 'varchar',
      }),
    );
    await queryRunner.addColumn(
      'user_cards',
      new TableColumn({
        name: 'expiration_month',
        type: 'varchar',
      }),
    );
    await queryRunner.addColumn(
      'user_cards',
      new TableColumn({
        name: 'expiration_year',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user_cards', [
      new TableColumn({ name: 'number', type: 'varchar' }),
      new TableColumn({ name: 'token', type: 'varchar' }),
    ]);
    await queryRunner.dropColumn('user_cards', 'credit_card_id');
    await queryRunner.dropColumn('user_cards', 'last_4_card_number');
    await queryRunner.dropColumn('user_cards', 'expiration_month');
    await queryRunner.dropColumn('user_cards', 'expiration_year');
  }
}
