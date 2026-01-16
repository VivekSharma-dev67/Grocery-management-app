import type { HttpContext } from '@adonisjs/core/http'

import Order from '#models/order'
import OrderItem from '#models/order_item'
import Cart from '#models/cart'
import Address from '#models/address'

export default class OrderController {
  async store({ params, request, response }: HttpContext) {
    const userId = Number(params.userId)

    if (!userId || isNaN(userId)) {
      return response.badRequest({ message: 'Invalid userId' })
    }

    const addressId = Number(request.input('addressId'))

    if (!addressId) {
      return response.badRequest({ message: 'addressId required' })
    }

    const address = await Address.query()
      .where('id', addressId)
      .where('user_id', userId)
      .first()

    if (!address) {
      return response.badRequest({ message: 'Invalid or unauthorized address' })
    }

    const cart = await Cart.query()
      .where('user_id', userId)
      .preload('items', (query) => query.preload('product'))
      .first()

    if (!cart || !cart.items || cart.items.length === 0) {
      return response.badRequest({ message: 'Cart is empty' })
    }

    let totalAmount = 0
    for (const item of cart.items) {
      const product = item.product
      if (product) {
        totalAmount += item.quantity * product.price
      }
    }

    if (totalAmount <= 0) {
      return response.badRequest({ message: 'Total amount cannot be zero or negative' })
    }

    const order = await Order.create({
      userId: userId,
      cartId: cart.id,
      AddressId: address.id,
      TotalAmount: totalAmount,
      status: 'pending',
    })

    for (const cartItem of cart.items) {
      const product = cartItem.product
      if (product) {
        await OrderItem.create({
          orderId: order.id,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          priceAtPurchase: product.price,
        })
      }
    }

    await cart.related('items').query().delete()

    await order.load('items', (q) => q.preload('product'))
    await order.load('address')

    return response.created({
      message: 'Order successfully placed',
      order,
    })
  }
 //ALL orders
  async Allorder({ params, response }: HttpContext) {
    const userId = Number(params.userId)

    if (!userId || isNaN(userId)) {
      return response.badRequest({ message: 'Invalid userId' })
    }

    const orders = await Order.query()
      .where('user_id', userId)
      .preload('items', (q) => q.preload('product'))
      .preload('address')
      .orderBy('created_at', 'desc')

    return orders
  }
  async show({ params, response }: HttpContext) {
    const userId = Number(params.userId)
    const orderId = Number(params.id)

    if (!userId || isNaN(userId)) {
      return response.badRequest({ message: 'Invalid userId' })
    }

    if (!orderId || isNaN(orderId)) {
      return response.badRequest({ message: 'Invalid order id' })
    }

    const order = await Order.query()
      .where('id', orderId)
      .where('user_id', userId)
      .preload('items', (q) => q.preload('product'))
      .preload('address')
      .first()

    if (!order) {
      return response.notFound({ message: 'Order not found' })
    }

    return order
  }
}