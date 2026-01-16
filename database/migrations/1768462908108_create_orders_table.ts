import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.integer('cart_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('carts')
        .onDelete('SET NULL')

      table.integer('address_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('addresses')
        .onDelete('RESTRICT')

      table.decimal('total_amount', 12, 2)
        .notNullable()
        .defaultTo(0)

      table.enum('status', ['pending', 'confirmed', 'delivered', 'cancelled'])
        .notNullable()
        .defaultTo('pending')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}