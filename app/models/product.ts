import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import Category from '#models/category'  
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description?: string  

  @column()
  declare price: number         

  @column()
  declare stock: number         

  @column()
  declare unit: string          

  @column()
  declare quantity?: number     

  @column()
  declare Imageurl:string

  @column()
  declare categoryId: number    

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}