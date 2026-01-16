// app/services/category_service.ts
import Category from '#models/category'

export default class CategoryService {
  async getAllCategories() {
    return Category
      .query()
      .select('id', 'name', 'description')
      .orderBy('id', 'asc')
  }

  async getPaginatedCategories(page: number = 1, perPage: number = 10) {
    return Category
      .query()
      .select('id', 'name', 'description')
      .orderBy('id', 'asc')
      .paginate(page, perPage)
  }
  async show(params:any){
    return Category.query()
    .where("id",params.id)
    .select('id','name','description')
    .firstOrFail()
  }

}