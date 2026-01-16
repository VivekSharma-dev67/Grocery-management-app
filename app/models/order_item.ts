import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo} from '@adonisjs/lucid/orm'
import type{ BelongsTo } from '@adonisjs/lucid/types/relations'
import Order from './order.js'
import Product from './product.js'  

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @column()
  declare priceAtPurchase: number 

  @belongsTo(() => Order,{
    foreignKey: 'order_id'
  })
  declare order: BelongsTo<typeof Order>

  @belongsTo(() => Product,{
    foreignKey: 'product_id'
  })
  declare product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}