import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany} from '@adonisjs/lucid/orm'
import type{ HasMany } from '@adonisjs/lucid/types/relations'
import type { BelongsTo as BelongsToType } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Cart from './cart.js'
import Address from './address.js'  
import OrderItem from './order_item.js'  

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare cartId: number  

  @column()
  declare AddressId: number

  @column()
  declare TotalAmount: number

  @column()
  declare status: string

  @belongsTo(() => Address,{
    foreignKey: 'AddressId'   
  })
  declare address: BelongsToType<typeof Address>

  @belongsTo(() => Cart)
  declare cart: BelongsToType<typeof Cart>

  @belongsTo(() => User)
  declare user: BelongsToType<typeof User>

  @hasMany(() => OrderItem)
  declare items: HasMany<typeof OrderItem>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}