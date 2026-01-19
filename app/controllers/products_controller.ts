import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
    async index({params}:HttpContext){
        const product = await Product.query()
        .where('category_id',params.id)
        // .select('id','name','description','price','ImageUrl','is_available')
        .orderBy('id','asc')

        return product;
    }

    async searchproduct({ request, response }: HttpContext) {
    const searchTerm = request.input('search')                               
    if (!searchTerm.trim()) {
      return response.json({ message: 'Search term is required' })
    }

    const results = await Product.query()
      .where('name', 'like', `%${searchTerm}%`)        
      .select('id', 'name', 'description', 'price', 'ImageUrl', 'is_available')
      .orderBy('name', 'asc')                       

    return response.json({
      data: results,
      count: results.length,
      search: searchTerm,
    })
  }
}