import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddChargeAndPurchaseFields1603736714861
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'purchases',
      new TableColumn({
        name: 'charge_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'purchase_payments',
      new TableColumn({
        name: 'payment_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('purchases', 'charge_id');
    await queryRunner.dropColumn('purchase_payments', 'payment_id');
  }
}
