import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'order_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('order_id').unsigned().notNullable()
        .references('id').inTable('orders').onDelete('CASCADE').index()

      table.integer('product_id').unsigned().notNullable()
        .references('id').inTable('products').onDelete('RESTRICT')

      table.integer('quantity').unsigned().notNullable()

      table.decimal('price_at_purchase', 12, 2).notNullable()  

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}