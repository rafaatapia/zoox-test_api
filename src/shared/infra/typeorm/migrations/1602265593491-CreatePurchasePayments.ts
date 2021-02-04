import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePurchasePayments1602265593491
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchase_payments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'purchase_id',
            type: 'uuid',
          },
          {
            name: 'payment_method',
            type: 'varchar',
          },
          {
            name: 'card_id',
            type: 'uuid',
          },
          {
            name: 'amount',
            type: 'numeric',
          },
          {
            name: 'tax',
            type: 'numeric',
          },
          {
            name: 'installments',
            type: 'integer',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK-purchase_payments-purchases',
            referencedTableName: 'purchases',
            referencedColumnNames: ['id'],
            columnNames: ['purchase_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK-purchase_payments-user_cards',
            referencedTableName: 'user_cards',
            referencedColumnNames: ['id'],
            columnNames: ['card_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchase_payments');
  }
}
