import type { HttpContext } from '@adonisjs/core/http'

import Cart from '#models/cart'
import CartItem from '#models/cart_item'

export default class CartController {
  async show({ params, response }: HttpContext) {
    const userId = Number(params.userId)

    if (!userId || isNaN(userId)) {
      return response.badRequest({ message: 'Invalid userId' })
    }

    let cart = await Cart.query()
      .where('user_id', userId)
      .preload('items', (query) => {
        query.preload('product')
      })
      .first()

    if (!cart) {
      cart = await Cart.create({ userId })
    }

    return cart
  }

  async add({ request, params, response }: HttpContext) {
    const userId = Number(params.userId)

    if (!userId || isNaN(userId)) {
      return response.badRequest({ message: 'Invalid userId' })
    }

    const productId = Number(request.input('productId'))
    const quantity = Number(request.input('quantity', 1))

    if (!productId || quantity < 1) {
      return response.badRequest({ message: 'Invalid productId or quantity' })
    }

    let cart = await Cart.query().where('user_id', userId).first()
    if (!cart) {
      cart = await Cart.create({ userId })
    }

    let cartItem = await CartItem.query()
      .where('cart_id', cart.id)
      .where('product_id', productId)
      .first()

    if (cartItem) {
      cartItem.quantity += quantity
      await cartItem.save()
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
      })
    }

    await cartItem.load('product')

    return response.created(cartItem)
  }

  async update({ params, request, response }: HttpContext) {
    const userId = Number(params.userId)

    if (!userId || isNaN(userId)) {
      return response.badRequest({ message: 'Invalid userId' })
    }

    const quantity = Number(request.input('quantity'))

    if (quantity < 1) {
      return response.badRequest({ message: 'Quantity at least 1 honi chahiye' })
    }

    const cart = await Cart.query().where('user_id', userId).firstOrFail()

    const cartItem = await CartItem.query()
      .where('cart_id', cart.id)
      .where('id', params.id)
      .firstOrFail()

    cartItem.quantity = quantity
    await cartItem.save()

    await cartItem.load('product')

    return cartItem
  }

  async remove({ params, response }: HttpContext) {
    const userId = Number(params.userId)

    if (!userId || isNaN(userId)) {
      return response.badRequest({ message: 'Invalid userId' })
    }

    const cart = await Cart.query().where('user_id', userId).firstOrFail()

    const cartItem = await CartItem.query()
      .where('cart_id', cart.id)
      .where('id', params.id)
      .firstOrFail()

    await cartItem.delete()

    return response.noContent()
  }
}