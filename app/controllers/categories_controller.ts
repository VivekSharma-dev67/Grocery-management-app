// app/controllers/categories_controller.ts
import { inject } from '@adonisjs/core';
import CategoryService from '../services/category_service.js';
import { HttpContext } from '@adonisjs/core/http';

@inject()
export default class CategoriesController {
    constructor(protected categoryService:CategoryService){}

    async index() {
    const categories = this.categoryService.getAllCategories()
    return categories;
    }

    async show({params}:HttpContext){
    const Category = await this.categoryService.show(params)
    return Category;
    }

  
}