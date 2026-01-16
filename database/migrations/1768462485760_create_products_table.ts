import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('category_id')                     
        .unsigned()                                 
        .notNullable()                              
        .references('categories.id')                          
        // .inTable('categories') 
      table.decimal('price', 10, 2)  
      table.integer('stock').defaultTo(0)               
      table.string('name').notNullable()
      table.string('description').nullable()
      table.string('quantity').nullable()
      table.string('unit').notNullable()
      table.string('ImageUrl').nullable();
      table.boolean('is_available').nullable();
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}