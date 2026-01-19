// app/Services/CartService.ts
import Cart from '#models/cart'
import CartItem from '#models/cart_item'
import type { HttpContext } from '@adonisjs/core/http'

export default class CartService {
  async getOrCreateCart(userId: number) {
    let cart = await Cart.query()
      .where('user_id', userId)
      .preload('items', (q) => q.preload('product'))
      .first()

    if (!cart) {
      cart = await Cart.create({ userId: userId })  
      await cart.load('items', (q) => q.preload('product'))
    }

    return cart
  }

  async addItem(ctx: HttpContext, userId: number) {
    const productId = Number(ctx.request.input('productId'))
    const quantity = Number(ctx.request.input('quantity', 1))

    if (!productId || isNaN(productId) || quantity < 1) {
      throw new Error('Invalid productId or quantity')  
    }

    const cart = await this.getOrCreateCart(userId)

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
        productId: productId,
        quantity,
      })
    }

    await cartItem.load('product')

    return cartItem
  }

async updateItem(userId: number, itemId: number, quantity: number) {
  if (isNaN(quantity) || quantity < 1) {
    throw new Error('Quantity must be at least 1')
  }

  const cart = await Cart.query().where('user_id', userId).firstOrFail()

  const cartItem = await CartItem.query()
    .where('cart_id', cart.id)
    .where('id', itemId)
    .firstOrFail()

  cartItem.quantity = quantity
  await cartItem.save()

  await cartItem.load('product')

  return cartItem
}

  async removeItem(userId: number, itemId: number) {
    const cart = await Cart.query().where('user_id', userId).firstOrFail()

    const cartItem = await CartItem.query()
      .where('cart_id', cart.id)
      .where('id', itemId)
      .firstOrFail()

    await cartItem.delete()

    return true  
  }
}