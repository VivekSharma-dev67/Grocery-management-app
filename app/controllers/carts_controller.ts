import type { HttpContext } from '@adonisjs/core/http'
import CartService from '../services/Cart_service.js'  
import { inject } from '@adonisjs/core'

@inject()
export default class CartController {
  constructor(protected cartService: CartService) {}

  async show({ params, response }: HttpContext) {
    const userId = Number(params.userId)
    if (isNaN(userId)) {
      return response.badRequest({ error: 'Invalid userId' })
    }

    try {
      const cart = await this.cartService.getOrCreateCart(userId)
      return response.ok(cart)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
      return response.internalServerError({ error: 'Something went wrong' })
    }
  }

  async add({ params, request, response }: HttpContext) {
    const userId = Number(params.userId)
    if (isNaN(userId)) {
      return response.badRequest({ error: 'Invalid userId' })
    }

    try {
      const cartItem = await this.cartService.addItem({ request } as any, userId)  
      return response.created(cartItem)
    } catch (error: any) {
      console.error('Failed to add to cart:', error)
      return response.internalServerError({ error: 'Something went wrong' })
    }
  }

  async update({ params, request, response }: HttpContext) {
  const userId = Number(params.userId)
  const itemId = Number(params.id)

  if (isNaN(userId) || isNaN(itemId)) {
    return response.badRequest({ error: 'Invalid userId or itemId' })
  }

  try {
    const quantity = Number(request.input('quantity'))

    if (isNaN(quantity) || quantity < 1) {
      return response.badRequest({ error: 'Quantity must be at least 1' })
    }

    const updatedItem = await this.cartService.updateItem(userId, itemId, quantity)

    return response.ok(updatedItem)
  } catch (error: any) {
    console.error('Cart update error:', error)

    if (error.message?.includes('firstOrFail')) {
      return response.notFound({ error: 'Cart or item not found' })
    }

    return response.internalServerError({ error: 'Something went wrong' })
  }
}
  async remove({ params, response }: HttpContext) {
    const userId = Number(params.userId)
    const itemId = Number(params.id)

    if (isNaN(userId) || isNaN(itemId)) {
      return response.badRequest({ error: 'Invalid userId or itemId' })
    }

    try {
      await this.cartService.removeItem(userId, itemId)
      return response.noContent()
    } catch (error: any) {
      console.error('Failed to remove cart item:', error)
      return response.internalServerError({ error: 'Something went wrong' })
    }
  }
}