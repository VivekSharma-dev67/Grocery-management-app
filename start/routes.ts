/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import CategoriesController from '#controllers/categories_controller';
import ProductsController from '#controllers/products_controller'
import AuthController from '#controllers/auth_controller'
import CartController from '#controllers/carts_controller';
import OrderController from '#controllers/orders_controller';
import AddressController from '#controllers/addresses_controller';
router.group(() => {
  router.get('/', [CategoriesController,'index'])
  router.get('/:id', [CategoriesController,'show'])
}).prefix('categories')

router.group(()=>{
  router.get('/:id',[ProductsController,'index'])
  router.post('/search',[ProductsController,'searchproduct'])
}).prefix('product')

router.group(()=>{
  router.post('/login',[AuthController,'login'])
  router.post('/signup',[AuthController,'register'])
  router.get('/logout',[AuthController,'logout']).use(middleware.auth({ guards: ['api'] }))
  router.get('/me',[AuthController,'me']).use(middleware.auth({ guards: ['api'] }))
}).prefix('auth')

router.group(() => {
  router.get('/:userId', [CartController, 'show'])
  router.post('/:userId/add', [CartController, 'add'])
  router.patch('/:userId/:id', [CartController, 'update'])
  router.delete('/:userId/:id', [CartController, 'remove'])
}).prefix('/cart')

router.group(() => {
  router.post('/:userId', [OrderController, 'store'])
  router.get('/:userId', [OrderController, 'Allorder'])
  router.get('/:userId/:id', [OrderController, 'show'])
}).prefix('orders')

router.group(() => {
  router.post('/addresses/:userId', [AddressController, 'store'])
}).prefix('/api')
