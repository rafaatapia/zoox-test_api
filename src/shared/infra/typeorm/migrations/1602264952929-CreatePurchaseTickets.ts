import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePurchaseTickets1602264952929
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchase_tickets',
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
            name: 'passenger_name',
            type: 'varchar',
          },
          {
            name: 'passenger_document_type',
            type: 'varchar',
          },
          {
            name: 'passenger_document',
            type: 'varchar',
          },
          {
            name: 'passenger_phone',
            type: 'varchar',
          },
          {
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: 'departure_place',
            type: 'varchar',
          },
          {
            name: 'arrival_place',
            type: 'varchar',
          },
          {
            name: 'departure_date',
            type: 'timestamp',
          },
          {
            name: 'arrival_date',
            type: 'timestamp',
          },
          {
            name: 'seat_number',
            type: 'varchar',
          },
          {
            name: 'ticket_number',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'integer',
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
            name: 'FK-purchase_tickets-purchases',
            referencedTableName: 'purchases',
            referencedColumnNames: ['id'],
            columnNames: ['purchase_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK-purchase_tickets-companies',
            referencedTableName: 'companies',
            referencedColumnNames: ['id'],
            columnNames: ['company_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchase_tickets');
  }
}
