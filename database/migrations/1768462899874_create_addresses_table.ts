import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')                     
        .unsigned()                                 
        .notNullable()                              
        .references('id')                           
        .inTable('users')  

      table.integer('house_no')
      table.string('street')
      table.string('city')
      table.integer('pincode')
      table.integer('phone_no')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}