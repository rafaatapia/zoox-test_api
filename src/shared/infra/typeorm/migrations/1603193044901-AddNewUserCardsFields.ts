import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNewUserCardsFields1603193044901
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_cards', 'credit_card_id');
    await queryRunner.dropColumn('user_cards', 'expiration_month');
    await queryRunner.dropColumn('user_cards', 'expiration_year');
    await queryRunner.addColumns('user_cards', [
      new TableColumn({
        name: 'credit_card_id',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'expiration_month',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'expiration_year',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({ name: 'zip_code', type: 'varchar' }),
      new TableColumn({ name: 'street', type: 'varchar' }),
      new TableColumn({ name: 'house_number', type: 'varchar' }),
      new TableColumn({
        name: 'neighborhood',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({ name: 'city', type: 'varchar' }),
      new TableColumn({ name: 'state', type: 'varchar' }),
      new TableColumn({
        name: 'save_card',
        type: 'boolean',
        default: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_cards', 'credit_card_id');
    await queryRunner.dropColumn('user_cards', 'expiration_month');
    await queryRunner.dropColumn('user_cards', 'expiration_year');
    await queryRunner.dropColumn('user_cards', 'zip_code');
    await queryRunner.dropColumn('user_cards', 'street');
    await queryRunner.dropColumn('user_cards', 'house_number');
    await queryRunner.dropColumn('user_cards', 'neighborhood');
    await queryRunner.dropColumn('user_cards', 'city');
    await queryRunner.dropColumn('user_cards', 'state');
    await queryRunner.dropColumn('user_cards', 'save_card');

    await queryRunner.addColumns('user_cards', [
      new TableColumn({
        name: 'credit_card_id',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'expiration_month',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'expiration_year',
        type: 'varchar',
      }),
    ]);
  }
}
