import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import type{ BelongsTo } from '@adonisjs/lucid/types/relations';
import { belongsTo } from '@adonisjs/lucid/orm';
import User from './user.js';

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId:number

  @column()
  declare houseNo:string

  @column()
  declare street:string

  @column()
  declare city:string

  @column()
  declare pincode:string

  @column()
  declare phoneNo:string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}